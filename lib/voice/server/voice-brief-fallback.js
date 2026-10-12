export function createVoiceBriefFallback({
  markdownToSpeechText,
  maxInputLength,
  maxOutputLength,
  timeoutMs,
  model,
  endpoint,
}) {
  const voiceBriefPrompt = (markdown) => [
    '你是 Fairy 的语音简报模块。保持克制、自然、让人安心的 Fairy 语气，把用户已经看到的最终回答压缩为适合中文语音播报的简报。',
    '只保留一到三个最重要的信息：最终结论、必要数字或风险、明确下一步。删去背景、过程、重复说明、例子、补充解释和客套。',
    '不要添加原文没有的信息，不要解释压缩过程，不要使用 Markdown、标题、列表标记、引用、代码、链接或寒暄。',
    `默认控制在 80 到 180 个中文字符；仅在关键信息无法省略时延长，绝不超过 ${maxOutputLength} 个中文字符。中文自然口语，单段输出。`,
    '最终回答：',
    markdown,
  ].join('\n');

  return async function createVoiceBrief(markdown, apiKey, fetchImpl = fetch, signal) {
    // Only speech-worthy prose crosses the optional cloud boundary.
    const source = markdownToSpeechText(markdown) || String(markdown || '').trim();
    if (!source) return '';
    if (Array.from(source).length > maxInputLength) {
      throw Object.assign(new Error('voice-brief-input-too-large'), { code: 'voice-brief-input-too-large' });
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('voice-brief-timeout'), timeoutMs);
    const abort = () => controller.abort(signal?.reason || 'client-aborted');
    if (signal?.aborted) abort();
    else signal?.addEventListener('abort', abort, { once: true });
    try {
      const response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: '严格按用户要求输出可直接朗读的中文简报。' },
            { role: 'user', content: voiceBriefPrompt(source) },
          ],
          temperature: 0.2,
          max_tokens: 400,
          thinking: { type: 'disabled' },
        }),
        signal: controller.signal,
      });
      const value = await response.json().catch(() => ({}));
      if (!response.ok) throw Object.assign(new Error('voice-brief-request-failed'), { code: 'voice-brief-request-failed' });
      const brief = markdownToSpeechText(value?.choices?.[0]?.message?.content);
      if (!brief) throw Object.assign(new Error('voice-brief-empty'), { code: 'voice-brief-empty' });
      return Array.from(brief).slice(0, maxOutputLength).join('');
    } catch (error) {
      if (controller.signal.aborted) throw Object.assign(new Error(String(controller.signal.reason)), { code: controller.signal.reason || 'client-aborted' });
      throw error;
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
    }
  };
}

export function createVoiceBrainServerBoundary({ createBrief, fetchImpl, readConfig, writeConfig, clearConfig, configuredApiKey, model }) {
  return {
    async status() {
      const config = await readConfig();
      return { configured: Boolean(configuredApiKey(config?.apiKey)), model };
    },
    async configure(payload) {
      if (payload?.clear === true) {
        await clearConfig();
        return { configured: false, model };
      }
      const apiKey = configuredApiKey(payload?.apiKey);
      if (!apiKey) throw Object.assign(new Error('voice-brief-unconfigured'), { code: 'voice-brief-unconfigured' });
      await writeConfig(apiKey);
      return { configured: true, model };
    },
    brief(markdown, signal) {
      return readConfig().then((config) => {
        const apiKey = configuredApiKey(config?.apiKey);
        if (!apiKey) throw Object.assign(new Error('voice-brief-unconfigured'), { code: 'voice-brief-unconfigured' });
        return createBrief(markdown, apiKey, fetchImpl, signal).then((brief) => ({ brief, model }));
      });
    },
  };
}
