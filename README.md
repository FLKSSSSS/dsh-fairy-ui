# dsh-fairy-ui

适用于 **DeepSeek Harness (DSH) 0.2.0-rc.2 / Windows** 的 Fairy / HDD 视觉界面插件。

只移植视觉及语音设置，不替换原版 `app.asar`、exe，不迁移人格、Agent 预设、聊天模型、API Key、权限或历史会话。

## 安装

1. 从本仓库 [Releases](../../releases) 下载 `DSH-Fairy界面插件-1.0.0.zip` 并完整解压。
2. 如已启用旧 `dsh-fairy-visual`，先在 DSH 中禁用；其他冲突皮肤也建议先禁用。
3. 完全退出 DSH，包括托盘，然后双击解压目录的 `安装插件.cmd`。
4. 重启原版 DSH。设置 → 语音模型设置 → **安装语音模型**。

安装脚本默认定位 `F:\Fairy测试\DSH原版对照`。可传参指定自己的原版目录：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\install-plugin.ps1 -DshRoot "你的DSH目录"
```

保留完整解压目录及 tgz 文件：原版 profile 的插件依赖会引用此本地包。

## 功能

- Fairy / HDD 主视觉、侧栏、输入区、深浅色、低功耗和动画设置。
- 保留自动朗读、参考音频与文本、语音状态及可选云端摘要。
- “安装语音模型”通过 DSH 的真实输入状态填入安装提示词，追加保留已有文本草稿，并防止重复插入。**不会自动发送**；关闭设置、审阅后发送，由 DSH 遵循当前审批规则执行。
- 启动视频保持比例、完整播放，可跳过。它是页面加载后的覆盖层，不替换 Electron 原生启动窗口，不改原版窗口尺寸。

## 语音模型说明

插件不包含 Python、GPT-SoVITS 或语音模型权重。参考 WAV 不是模型。Fairy 专用音色需提供有权使用的 `.ckpt/.pth` 文件或可信授权来源。

安装提示词要求只在 DSH_HOME 下的插件语音目录部署，核验来源、保留原版配置、仅监听 `127.0.0.1:9880`，真实检查后才报告安装完成。UI 测试通过不代表语音模型已安装。

## 卸载

退出 DSH 后运行 `卸载插件.cmd`。语音数据、参考音频及本机偏好不自动删除；另行部署的语音服务需用其自身脚本停止。

## 源码与验证

- `lib/`：插件前后端代码。
- `cordis.patch.yml`：单项附加插件注册。
- `test/`：14 项自动测试。
- `验证/`：原版客户端实测截图及隔离安装/卸载结果。
- `PROVENANCE.json`、`对比与验证说明.md`：来源及移植边界。
- `checksums.json`、`SHA256.txt`：Release 安装文件校验。

仓库不提交 `node_modules`。Release tgz 已捆绑运行依赖，可离线安装插件。源码测试需先安装依赖：

```sh
npm install
npm test
```

本次测试未对真实用户 profile 安装、未下载语音权重、未执行真实 TTS 合成。仅适配已验证的 DSH 版本。

来源代码、媒体和依赖的权利与许可保持原状；此仓库上传不代表对第三方素材授予新的授权。
