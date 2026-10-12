/* Local TTS transport and PCM forwarding have no route or settings ownership. */
export function createPcmStreamHandler() {
  return {
    async pipe(response, res, signal) {
      if (!response.body) throw Object.assign(new Error('local synthesis returned no audio'), { code: 'local-service-failed' });
      try {
        for await (const chunk of response.body) {
          if (signal.aborted) break;
          if (!res.write(Buffer.from(chunk))) {
            await new Promise((resolve) => {
              let settled = false;
              const finish = () => {
                if (settled) return;
                settled = true;
                res.removeListener('drain', finish);
                res.removeListener('close', finish);
                signal.removeEventListener('abort', finish);
                resolve();
              };
              res.once('drain', finish);
              res.once('close', finish);
              signal.addEventListener('abort', finish, { once: true });
            });
          }
        }
      } finally {
        // Breaking an async iterator does not close every fetch implementation's
        // body immediately. Explicitly cancel an aborted stream so session
        // switches, reloads, and client disconnects release the socket now.
        if (signal.aborted && typeof response.body.cancel === 'function') {
          await response.body.cancel().catch((error) => {
            if (!signal.aborted && error?.name !== 'AbortError') throw error;
          });
        }
      }
    },
  };
}

async function localFetch(url, options, timeoutMs, parentSignal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);
  const onAbort = () => controller.abort(parentSignal?.reason || 'client-aborted');
  if (parentSignal?.aborted) onAbort();
  else parentSignal?.addEventListener('abort', onAbort, { once: true });
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (controller.signal.aborted) throw Object.assign(new Error(String(controller.signal.reason)), { code: controller.signal.reason });
    throw Object.assign(new Error('local service unavailable'), { code: 'local-service-unavailable' });
  } finally {
    clearTimeout(timer);
    parentSignal?.removeEventListener('abort', onAbort);
  }
}

/* A streaming response is active after fetch() resolves, so release() owns
 * the parent abort bridge until its consumer has finished with the PCM body. */
function openLocalStream(url, options, timeoutMs, parentSignal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);
  const onAbort = () => controller.abort(parentSignal?.reason || 'client-aborted');
  if (parentSignal?.aborted) onAbort();
  else parentSignal?.addEventListener('abort', onAbort, { once: true });
  const release = () => {
    clearTimeout(timer);
    parentSignal?.removeEventListener('abort', onAbort);
  };
  return fetch(url, { ...options, signal: controller.signal }).catch((error) => {
    release();
    if (controller.signal.aborted) throw Object.assign(new Error(String(controller.signal.reason)), { code: controller.signal.reason });
    throw Object.assign(new Error('local service unavailable'), { code: 'local-service-unavailable' });
  }).then((response) => ({ response, release }));
}

export function createLocalTtsTransport({
  fetchImpl = fetch,
  ttsUrl,
  docsUrl,
  referenceAudioPath,
  referencePrompt,
  ttsTimeoutMs,
  statusTimeoutMs,
} = {}) {
  const fetchStatus = (url, options, timeoutMs, signal) => fetchImpl === fetch
    ? localFetch(url, options, timeoutMs, signal)
    : fetchImpl(url, options);
  const stream = (url, options, timeoutMs, signal) => fetchImpl === fetch
    ? openLocalStream(url, options, timeoutMs, signal)
    : fetchImpl(url, { ...options, signal }).then((response) => ({ response, release: null }));
  const localTtsRequest = (text) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, text_lang: 'zh', ref_audio_path: referenceAudioPath, prompt_text: referencePrompt, prompt_lang: 'zh', text_split_method: 'cut5', batch_size: 1, media_type: 'raw', streaming_mode: 1, fragment_interval: 0.14, parallel_infer: false }),
  });
  return {
    status(signal) {
      return fetchStatus(docsUrl, { method: 'GET' }, statusTimeoutMs, signal).then((response) => {
        if (!response.ok) throw new Error(`Fairy status returned ${response.status}`);
        return { available: true, reason: null };
      });
    },
    stream(text, signal) {
      return stream(ttsUrl, localTtsRequest(text), ttsTimeoutMs, signal);
    },
  };
}
