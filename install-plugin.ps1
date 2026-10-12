[CmdletBinding()]
param(
  [string]$DshRoot = 'F:\Fairy测试\DSH原版对照',
  [ValidateSet('Install', 'Remove')][string]$Action = 'Install',
  [string]$Profile = 'desktop',
  [string]$DshHome
)
$ErrorActionPreference = 'Stop'
if ($Profile -notmatch '^[A-Za-z0-9_-]+$') { throw 'Invalid profile name.' }
$root = (Resolve-Path -LiteralPath $DshRoot).Path
$exe = Join-Path $root 'DeepSeek Harness.exe'
$cli = Join-Path $root 'resources\runtime\cli\bin\dsh.cmd'
if (!(Test-Path -LiteralPath $exe -PathType Leaf) -or !(Test-Path -LiteralPath $cli -PathType Leaf)) { throw "Not a supported DSH Desktop directory: $root" }
$running = @(Get-CimInstance Win32_Process -Filter "Name='DeepSeek Harness.exe'" | Where-Object { $_.ExecutablePath -and [string]::Equals($_.ExecutablePath, $exe, [StringComparison]::OrdinalIgnoreCase) })
if ($running.Count -gt 0) { throw 'Please fully quit DSH (including its system tray) before installing or removing this plugin.' }
$previousHome = $env:DSH_HOME
try {
  if ($DshHome) { $env:DSH_HOME = [IO.Path]::GetFullPath($DshHome) }
  $dshDataHome = if (![string]::IsNullOrWhiteSpace($env:DSH_HOME)) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE '.dsh' }
  $manifestPath = Join-Path $dshDataHome "profiles\$Profile\package.json"
  if (!(Test-Path -LiteralPath $manifestPath)) { throw "Profile is not initialized: $manifestPath . Open DSH once, fully quit it, then retry." }
  $version = ((& $cli --version) | Out-String).Trim()
  if ($LASTEXITCODE -ne 0 -or $version -ne '0.2.0-rc.2') { throw "Tested DSH version is 0.2.0-rc.2. Found: $version . Installation stopped without changing this profile." }
  $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($Action -eq 'Install') {
    if (@($manifest.dsh.profile.bundles) -contains 'dsh-fairy-visual') { throw 'An older dsh-fairy-visual bundle is enabled. Disable that old visual bundle in DSH first; this installer will not change its persona or settings for you.' }
    $package = Join-Path $PSScriptRoot 'dsh-fairy-ui-1.0.0.tgz'
    $checksums = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'checksums.json') -Raw -Encoding UTF8 | ConvertFrom-Json
    $expected = $checksums.'dsh-fairy-ui-1.0.0.tgz'
    if (!$expected -or (Get-FileHash -LiteralPath $package -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) { throw 'Plugin package checksum mismatch. Do not install a modified or incomplete archive.' }
    & $cli plugin --profile $Profile add $package --offline
  } else {
    & $cli plugin --profile $Profile remove dsh-fairy-ui
  }
  if ($LASTEXITCODE -ne 0) { throw "DSH plugin command failed (exit $LASTEXITCODE). Read its diagnostic log; this script does not bypass checks or patch app.asar." }
  Write-Host "Done: $Action dsh-fairy-ui; profile=$Profile; DSH_HOME=$dshDataHome"
  Write-Host 'Restart DSH. Voice models are not included and are not downloaded by this installer.'
} finally {
  $env:DSH_HOME = $previousHome
}
