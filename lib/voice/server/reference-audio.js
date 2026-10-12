import { readFile, writeFile, mkdir, rename, unlink, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { randomUUID } from 'node:crypto';
export const MAX_REFERENCE_BYTES = 10 * 1024 * 1024;
function invalid(message) { return Object.assign(new Error(message), { code: 'invalid-reference' }); }
export function validateReferenceWav(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 44 || buffer.length > MAX_REFERENCE_BYTES || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE' || buffer.readUInt32LE(4) + 8 !== buffer.length) throw invalid('请选择完整、未损坏的 WAV 文件（不超过 10 MB）。');
  let format = null, dataBytes = 0;
  for (let offset = 12; offset < buffer.length;) {
    if (offset + 8 > buffer.length) throw invalid('WAV 文件结构不完整。');
    const size = buffer.readUInt32LE(offset + 4), begin = offset + 8;
    if (begin + size > buffer.length) throw invalid('WAV 音频数据不完整。');
    const id = buffer.toString('ascii', offset, offset + 4);
    if (id === 'fmt ') {
      if (format || size < 16) throw invalid('WAV 音频格式无效。');
      format = { codec: buffer.readUInt16LE(begin), channels: buffer.readUInt16LE(begin + 2), rate: buffer.readUInt32LE(begin + 4), byteRate: buffer.readUInt32LE(begin + 8), align: buffer.readUInt16LE(begin + 12), bits: buffer.readUInt16LE(begin + 14) };
    }
    if (id === 'data') { if (dataBytes || !size) throw invalid('WAV 音频数据无效。'); dataBytes = size; }
    offset = begin + size + (size % 2);
    if (offset > buffer.length) throw invalid('WAV 文件填充不完整。');
  }
  if (!format || !dataBytes || format.codec !== 1 || format.bits !== 16 || ![1, 2].includes(format.channels) || format.rate < 16000 || format.rate > 96000 || format.align !== format.channels * 2 || format.byteRate !== format.rate * format.align || dataBytes % format.align) throw invalid('参考音频须为 16-bit PCM WAV，单声道或双声道，采样率 16000–96000 Hz。');
  const duration = dataBytes / format.byteRate;
  if (duration < 3 || duration > 10) throw invalid('参考 WAV 的时长须为 3–10 秒。');
  return { duration: Math.round(duration * 1000) / 1000, sampleRate: format.rate, channels: format.channels };
}
export function createReferenceAudioStore({ directory, defaultAudioPath, defaultPrompt }) {
  const configPath = join(directory, 'reference-settings.json');
  let busy = false;
  const fallback = () => ({ custom: false, name: 'Fairy 默认参考语音', prompt: defaultPrompt(), audioPath: defaultAudioPath });
  async function get() {
    try {
      const raw = JSON.parse(await readFile(configPath, 'utf8'));
      if (!/^[a-f0-9-]{36}\.wav$/.test(raw.file) || typeof raw.prompt !== 'string' || !raw.prompt.trim() || raw.prompt.length > 1000) return fallback();
      const audioPath = join(directory, 'custom', raw.file);
      const file = await stat(audioPath); if (!file.isFile() || file.size < 44 || file.size > MAX_REFERENCE_BYTES) return fallback();
      const metadata = validateReferenceWav(await readFile(audioPath));
      return { custom: true, ...metadata, name: basename(String(raw.name || '自定义参考语音')).slice(0, 120), prompt: raw.prompt, audioPath };
    } catch { return fallback(); }
  }
  function publicValue(value) { const { audioPath, ...publicFields } = value; return publicFields; }
  async function status() { return publicValue(await get()); }
  async function update(body) {
    if (busy) throw Object.assign(new Error('正在保存参考语音，请稍候。'), { code: 'reference-busy' });
    busy = true;
    let newAudio = null, temp = null;
    try {
      if (!body || typeof body !== 'object' || Array.isArray(body)) throw invalid('无效的参考语音设置。');
      if (body.reset === true) {
        try { await unlink(configPath); } catch (error) { if (error.code !== 'ENOENT') throw error; }
        return status();
      }
      if (typeof body.prompt !== 'string' || !body.prompt.trim() || body.prompt.trim().length > 1000) throw invalid('请填写与 WAV 内容一致的中文参考文本（1–1000 字符）。');
      if (typeof body.filename !== 'string' || !/\.wav$/i.test(body.filename)) throw invalid('请选择 .wav 文件。');
      if (typeof body.audioBase64 !== 'string' || body.audioBase64.length > Math.ceil(MAX_REFERENCE_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(body.audioBase64)) throw invalid('WAV 文件内容无效或超过 10 MB。');
      const audio = Buffer.from(body.audioBase64, 'base64');
      if (audio.toString('base64') !== body.audioBase64) throw invalid('WAV 文件编码无效。');
      const metadata = validateReferenceWav(audio);
      await mkdir(join(directory, 'custom'), { recursive: true });
      const file = randomUUID() + '.wav'; newAudio = join(directory, 'custom', file);
      await writeFile(newAudio, audio, { flag: 'wx', mode: 0o600 });
      temp = configPath + '.' + randomUUID() + '.tmp';
      await writeFile(temp, JSON.stringify({ version: 1, file, name: basename(body.filename.replaceAll('\\', '/')).slice(0, 120), prompt: body.prompt.trim(), ...metadata }, null, 2), { flag: 'wx', mode: 0o600 });
      await rename(temp, configPath); temp = null; newAudio = null;
      // Immutable audio paths also keep any synthesis already in flight consistent.
      return status();
    } finally {
      if (temp) await unlink(temp).catch(() => {});
      if (newAudio) await unlink(newAudio).catch(() => {});
      busy = false;
    }
  }
  return { get, status, update };
}
