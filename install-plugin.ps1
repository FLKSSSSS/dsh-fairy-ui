[CmdletBinding()]
param(
  [string]$DshRoot = 'F:\Fairy测试\DSH原版对照',
  [ValidateSet('Install', 'Remove', 'RestoreNative')][string]$Action = 'Install',
  [string]$Profile = 'desktop',
  [string]$DshHome
)
$ErrorActionPreference = 'Stop'
if ($Profile -notmatch '^[A-Za-z0-9_-]+$') { throw 'Invalid profile name.' }
$root = (Resolve-Path -LiteralPath $DshRoot).Path
$exe = Join-Path $root 'DeepSeek Harness.exe'
$cli = Join-Path $root 'resources\runtime\cli\bin\dsh.cmd'
$node = Join-Path $root 'resources\runtime\primary-runtime\dependencies\node\bin\node.exe'
$patcher = Join-Path $PSScriptRoot 'desktop-patch.cjs'
if (!(Test-Path -LiteralPath $exe -PathType Leaf) -or !(Test-Path -LiteralPath $cli -PathType Leaf) -or !(Test-Path -LiteralPath $node -PathType Leaf)) { throw "Not a supported DSH Desktop directory: $root" }
if (!(Test-Path -LiteralPath $patcher -PathType Leaf)) { throw "Missing patcher: $patcher" }
$running = @(Get-CimInstance Win32_Process -Filter "Name='DeepSeek Harness.exe'" | Where-Object { $_.ExecutablePath -and [string]::Equals($_.ExecutablePath, $exe, [StringComparison]::OrdinalIgnoreCase) })
if ($running.Count -gt 0) { throw '请先完全退出 DSH（包括系统托盘），再安装或卸载。当前运行中的 DSH 未被修改。' }
# Validate every distributed file before any change (checksums are not a signature).
if ($Action -eq 'Install') {
  $checksums = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'checksums.json') -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($entry in $checksums.PSObject.Properties) {
    $file = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot $entry.Name))
    if (!$file.StartsWith($PSScriptRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Invalid checksum path.' }
    if (!(Test-Path -LiteralPath $file -PathType Leaf) -or (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.Value) { throw "Delivery checksum mismatch: $($entry.Name)" }
  }
}
$nativeCheck = & $node $patcher check $root 2>&1
if ($LASTEXITCODE -ne 0) { throw "Unsupported or changed desktop host: $nativeCheck" }
$nativeWasInstalled = ($nativeCheck | Out-String | ConvertFrom-Json).installed
if ($Action -eq 'RestoreNative') {
  & $node $patcher restore $root
  if ($LASTEXITCODE -ne 0) { throw 'Native startup restore failed.' }
  Write-Host 'Original desktop startup restored. The UI plugin and voice settings are unchanged.'
  return
}
$previousHome = $env:DSH_HOME
$previousOffline = $env:npm_config_offline
$previousUpdateNotifier = $env:npm_config_update_notifier
$patchInstalled = $false
try {
  $env:npm_config_offline = 'true'
  $env:npm_config_update_notifier = 'false'
  if ($DshHome) { $env:DSH_HOME = [IO.Path]::GetFullPath($DshHome) }
  $dshDataHome = if (![string]::IsNullOrWhiteSpace($env:DSH_HOME)) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE '.dsh' }
  $manifestPath = Join-Path $dshDataHome "profiles\$Profile\package.json"
  if (!(Test-Path -LiteralPath $manifestPath)) { throw "Profile is not initialized: $manifestPath . Open DSH once, fully quit it, then retry." }
  $version = ((& $cli --version) | Out-String).Trim()
  if ($LASTEXITCODE -ne 0 -or $version -ne '0.2.0-rc.2') { throw "Tested DSH version is 0.2.0-rc.2. Found: $version . Installation stopped without changing this profile." }
  $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($Action -eq 'Install') {
    if (@($manifest.dsh.profile.bundles) -contains 'dsh-fairy-visual') { throw 'An older dsh-fairy-visual bundle is enabled. Disable that old visual bundle first; this installer preserves existing presets and settings.' }
    $patchResult = & $node $patcher install $root 2>&1
    if ($LASTEXITCODE -ne 0) { throw "Native Fairy startup install failed: $patchResult" }
    $patchInstalled = !$nativeWasInstalled
    $package = Join-Path $PSScriptRoot 'dsh-fairy-ui-1.4.0.tgz'
    $checksumsPath = Join-Path $PSScriptRoot 'checksums.json'
    $checksums = Get-Content -LiteralPath $checksumsPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $expected = $checksums.'dsh-fairy-ui-1.4.0.tgz'
    if (!$expected -or (Get-FileHash -LiteralPath $package -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) { throw 'Plugin package checksum mismatch. Do not install a modified or incomplete archive.' }
    & $cli plugin --profile $Profile add $package --offline
    if ($LASTEXITCODE -ne 0) { throw "DSH plugin command failed (exit $LASTEXITCODE)." }
    Write-Host "Done: Install dsh-fairy-ui 1.4.0; profile=$Profile; DSH_HOME=$dshDataHome"
    Write-Host 'Native startup is backed up and hash-locked. The host loads visibly beneath its owned overlay. Selected startup runs once; the final visual state is held until DSH is ready. The new HDD/Fairy screen is interactive and video-free.'
    Write-Host 'Fairy is added as an optional Agent preset; existing presets and the default selection are preserved.'
    Write-Host 'Voice model settings are preserved; the model is not bundled or downloaded automatically.'
  } else {
    & $cli plugin --profile $Profile remove dsh-fairy-ui --config.offline=true --config.update-notifier=false
    if ($LASTEXITCODE -ne 0) { throw "DSH plugin command failed (exit $LASTEXITCODE)." }
    $restoreResult = & $node $patcher restore $root 2>&1
    if ($LASTEXITCODE -ne 0) { throw "Native Fairy startup restore failed: $restoreResult" }
    Write-Host "Done: Remove dsh-fairy-ui and restore original DSH startup; profile=$Profile"
  }
} catch {
  if ($Action -eq 'Install' -and $patchInstalled) {
    try { & $node $patcher restore $root *> $null; if ($LASTEXITCODE -ne 0) { throw 'Native rollback returned an error; use RestoreNative after inspecting the host.' } } catch { Write-Warning "Automatic native startup rollback failed: $($_.Exception.Message)" }
  }
  throw
} finally {
  $env:DSH_HOME = $previousHome
  $env:npm_config_offline = $previousOffline
  $env:npm_config_update_notifier = $previousUpdateNotifier
}
