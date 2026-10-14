[CmdletBinding()]
param(
  [string]$DshRoot = 'F:\Fairy测试\DSH原版对照',
  [ValidateSet('Install', 'Remove', 'RestoreNative')][string]$Action = 'Install',
  [string]$Profile = 'desktop',
  [string]$DshHome
)
$ErrorActionPreference = 'Stop'
try {
  # A PowerShell 7 parent may leak incompatible module paths into Windows PowerShell 5.1.
  # Load the system Utility module explicitly before Get-FileHash / JSON conversion.
  if ($PSVersionTable.PSEdition -eq 'Desktop') {
    Import-Module (Join-Path $PSHOME 'Modules\Microsoft.PowerShell.Utility\Microsoft.PowerShell.Utility.psd1') -Force -ErrorAction Stop
  }
  if ($Profile -notmatch '^[A-Za-z0-9_-]+$') { throw '无效的配置名称。' }
  $checksums = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'checksums.json') -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($entry in $checksums.PSObject.Properties) {
    # Removal does not depend on a still-present plugin archive, UI source or documentation.
    if ($Action -ne 'Install' -and $entry.Name -notin @('remove-plugin.cjs','yaml.cjs','desktop-patch.cjs') -and !$entry.Name.StartsWith('desktop-startup/')) { continue }
    $file = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot $entry.Name))
    if (!$file.StartsWith($PSScriptRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw '无效的校验路径。' }
    if (!(Test-Path -LiteralPath $file -PathType Leaf) -or (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.Value) { throw "文件校验失败：$($entry.Name)。请重新解压完整安装包。" }
  }
  $root = (Resolve-Path -LiteralPath $DshRoot).Path
  $exe = Join-Path $root 'DeepSeek Harness.exe'
  $node = Join-Path $root 'resources\runtime\primary-runtime\dependencies\node\bin\node.exe'
  $patcher = Join-Path $PSScriptRoot 'desktop-patch.cjs'
  if (!(Test-Path -LiteralPath $exe -PathType Leaf) -or !(Test-Path -LiteralPath $node -PathType Leaf)) { throw '没有找到受支持的 DSH 目录。' }
  $running = @(Get-CimInstance Win32_Process -Filter "Name='DeepSeek Harness.exe'" | Where-Object { !$_.ExecutablePath -or [string]::Equals($_.ExecutablePath, $exe, [StringComparison]::OrdinalIgnoreCase) })
  if ($running.Count) { throw '请先保存工作并完全退出 DSH（包括系统托盘），再安装或卸载。工具不会强制结束进程。' }
  $dataHome = if ($DshHome) { [IO.Path]::GetFullPath($DshHome) } elseif ($env:DSH_HOME) { [IO.Path]::GetFullPath($env:DSH_HOME) } else { Join-Path $env:USERPROFILE '.dsh' }
  $profileDir = Join-Path $dataHome "profiles\$Profile"
  $archive = Join-Path $PSScriptRoot 'dsh-fairy-ui-1.4.2.tgz'
  Write-Host "DSH 目录：$root"
  Write-Host "配置目录：$profileDir"
  if ($Action -eq 'Install') {
    & $node (Join-Path $PSScriptRoot 'install-plugin.cjs') check $profileDir $archive
    if ($LASTEXITCODE -ne 0) { throw '配置或插件包预检查失败，尚未修改。' }
  } elseif ($Action -eq 'Remove') {
    & $node (Join-Path $PSScriptRoot 'remove-plugin.cjs') check $profileDir
    if ($LASTEXITCODE -ne 0) { throw '配置预检查失败，尚未修改。' }
  }
  & $node $patcher check $root
  if ($LASTEXITCODE -ne 0) { throw '宿主或原版备份预检查失败，尚未修改。本工具仅支持已验证的 DSH 0.2.0-rc.2；不会覆盖未知程序文件。' }
  if ($Action -eq 'Install') {
    $result = & $node (Join-Path $PSScriptRoot 'install-plugin.cjs') install $profileDir $archive $root
    if ($LASTEXITCODE -ne 0) { throw '安装未完成，请保留上方报错；工具已尝试回滚。' }
    $report = ($result | Out-String) | ConvertFrom-Json
    Write-Host '完成：Fairy 1.4.2 已离线安装，启动动画和界面插件已启用。' -ForegroundColor Green
    if ($report.alreadyInstalled) { Write-Host '已安装相同内容，逐文件校验通过。' }
    Write-Host '保留 Fairy 可选 Agent 预设、单次覆盖启动、旧新版切换及语音模型设置。'
  } else {
    & $node $patcher restore $root
    if ($LASTEXITCODE -ne 0) { throw '原版启动恢复失败，插件配置未被修改。' }
    if ($Action -eq 'RestoreNative') {
      Write-Host '原版启动已恢复；Fairy 界面插件与语音设置保持不变。' -ForegroundColor Green
      exit 0
    }
    $result = & $node (Join-Path $PSScriptRoot 'remove-plugin.cjs') remove $profileDir
    if ($LASTEXITCODE -ne 0) { throw '插件移除失败。原版启动已恢复；请保留报错，配置备份见上方信息。可再次执行卸载。' }
    $report = ($result | Out-String) | ConvertFrom-Json
    Write-Host '完成：Fairy 插件已移除，原版启动已恢复。' -ForegroundColor Green
    if ($report.alreadyRemoved) { Write-Host '这份配置已无 Fairy 插件；重复执行不会再次改动。' }
  }
  if ($report.backup) { Write-Host "修改前的配置与插件文件已备份：$($report.backup)" }
  Write-Host '未联网，未调用 pnpm，未改动其他插件版本，未删除语音、模型或对话数据。'
  if ($Action -eq 'Install') { Write-Host '其他插件的 npm 版本缺失问题仍需单独处理；本工具仅避免 Fairy 安装时重解析整个配置。' }
  exit 0
} catch {
  Write-Host ''
  Write-Host ('操作未完成：' + $_.Exception.Message) -ForegroundColor Red
  exit 1
}
