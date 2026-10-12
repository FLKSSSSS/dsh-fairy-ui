'use strict';
const INSTALL_PROMPT = `请在当前 Windows 电脑为 DSH 的 Fairy 朗读功能安装并配置本地 GPT-SoVITS 语音服务。这是一项实际安装任务，不是修改聊天人格或大语言模型。

【不允许改动的边界】
保留 DSH 原版、app.asar、聊天模型/API Key、系统提示词、角色预设、会话历史、权限与审批设置。不安装 Fairy 独立启动壳，不改用 Fairy 便携版，不复制他人的账号或密钥。不关闭已有进程、不占用其他服务端口、不开放公网监听。遵守当前 DSH 的审批策略；没有权限时说明需要用户操作，不能绕过。

【先检测，再安装】
1. 检查当前 DSH_HOME（未设置时为用户目录的 .dsh）、可用磁盘空间、NVIDIA/CUDA 与 CPU 条件，以及 127.0.0.1:9880 是否已有兼容服务。已有可用服务时复用，先避免重复安装。选择适合本机的版本，不强制使用最新大模型。
2. 仅在 DSH_HOME/fairy-voice-data/voice-runtime 内建立隔离环境和下载缓存；优先复用可核验来源、版本兼容的本地 GPT-SoVITS、Python、基础预训练权重及用户已获授权的 Fairy 专用 GPT/SoVITS 权重。扫描范围仅限当前工作区、DSH_HOME 和用户明确给出的路径，不扫描全盘、不读取其他项目的凭据。
3. 缺少运行程序或基础权重时，从 RVC-Boss/GPT-SoVITS 官方仓库及其官方文档指定的分发源核验并下载；记录版本、来源、体积与校验信息，显示实际进度。先告知预计下载量和安装位置，按当前审批规则取得所需确认。不使用来路不明的一键脚本，不改系统 Python/PATH，不提升管理员权限。
4. Fairy 专用音色权重并非 GPT-SoVITS 官方基础模型；若未找到授权权重且没有可信下载来源，明确请我提供 .ckpt/.pth 权重文件或授权链接，不伪造地址、不把通用音色冒充 Fairy。可先完成基础环境，音色缺失时必须报告尚未就绪。

【与插件对接】
5. 保留并使用 DSH_HOME/fairy-voice-data/runtime/reference/fairy_ref.wav 与 fairy_ref.txt；优先使用设置页已保存的参考语音，不覆盖我的已有参考文件。若不存在，请让我在“语音模型设置”上传有权使用的 3–10 秒中文 PCM WAV 及对应文本。保留 voice-brain.json 等已有语音设置，不读取或打印密钥。
6. 启动兼容 api_v2.py 的本地服务，仅监听 127.0.0.1:9880，提供 GET /docs 与 POST /tts；支持 text、text_lang、ref_audio_path、prompt_text、prompt_lang、media_type=raw、streaming_mode=true 等字段。插件按 32000 Hz、单声道、16-bit little-endian PCM 播放，必须实测采样率；若所选模型输出并非 32000 Hz，使用仅绑定本机的轻量适配层进行可靠重采样，不能只改响应头或直接误播。路径使用 DSH_HOME 下的绝对路径。
7. 生成可重复执行的启动、停止和状态检查脚本，Windows 子进程隐藏启动且日志写入该安装目录。脚本只管理自己记录且验证过命令行的服务进程，端口冲突时报告，禁止按端口强杀。启动失败不得报告安装成功。
8. 实际执行 /docs 健康检查以及一段短中文 /tts 流式朗读测试，验证非空、偶数字节长度、32000 Hz 单声道 PCM 和错误响应。报告实际执行过的命令、模型与音色是否就绪、安装位置、服务 PID、启动/停止方法和测试结果。只有环境、权重、服务与合成测试均通过才说“安装完成”；缺少音色或下载失败时给出准确的未完成项目。

完成后提示我回到“设置 → 语音模型设置”点击“刷新语音状态”。不要修改任何其他 DSH 功能。`;

function findActiveSessionId(sessions) {
  const list = sessions?.list?.getSnapshot?.();
  if (list?.byId) return Object.values(list.byId).find(row => (row?.retainedBy?.mainView ?? 0) > 0)?.id;
  return list?.current;
}
function fillInstallPrompt(ctx, prompt = INSTALL_PROMPT) {
  const id = findActiveSessionId(ctx.sessions);
  if (!id) throw new Error('请先关闭设置并选择一个工作区，打开或新建对话，再点击“安装语音模型”。不会自动切换或清空已有对话。');
  const input = ctx.conversation?.input?.shell?.(id);
  if (!input || typeof input.setDraft !== 'function') throw new Error('此 DSH 版本未提供兼容的对话输入接口。可点击“复制安装提示词”后手动粘贴。');
  const old = input.snapshot?.draft ?? input.state?.getSnapshot?.()?.draft ?? '';
  if (old.includes(prompt)) return { sessionId: id, inserted: false, preservedDraft: old.length > prompt.length };
  input.setDraft(old.trim() ? old + '\n\n' + prompt : prompt);
  return { sessionId: id, inserted: true, preservedDraft: Boolean(old.trim()) };
}
module.exports = { INSTALL_PROMPT, findActiveSessionId, fillInstallPrompt };
