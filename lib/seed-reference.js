import { mkdirSync, copyFileSync, constants } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
export function seedReferenceAudio() {
  const dir = join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'fairy-voice-data/runtime/reference');
  mkdirSync(dir, { recursive: true });
  for (const file of ['fairy_ref.wav', 'fairy_ref.txt']) {
    try { copyFileSync(fileURLToPath(new URL('../reference/' + file, import.meta.url)), join(dir, file), constants.COPYFILE_EXCL); }
    catch (error) { if (error.code !== 'EEXIST') console.warn('[dsh-fairy-ui] Reference seed failed:', error.code); }
  }
}
