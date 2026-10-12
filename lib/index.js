import { apply as applyVoice } from './voice/index.js';
import { applyStartupAsset } from './startup-asset.js';
import { seedReferenceAudio } from './seed-reference.js';
import z from '@deepseek-ai/schemastery';
import {
  FAIRY_VISUAL_SETTINGS_NAMESPACE,
  FAIRY_VISUAL_SETTINGS_VERSION,
} from './contracts/index.js';
import { createFairyDiagnostics } from './contracts/diagnostics.js';

const diagnostics = createFairyDiagnostics('dsh-fairy-ui');

export const FairyVisualSettings = z.object({
  version: z.number().step(1).default(FAIRY_VISUAL_SETTINGS_VERSION).volatile(),
  enabled: z.boolean().default(true).volatile(),
  theme: z.union(['dark', 'light']).default('dark').volatile(),
  mascotVisible: z.boolean().default(true).volatile(),
  mascotScale: z.number().step(0.01).min(0.55).max(1).default(1).volatile(),
  mascotAnimationSpeed: z.union([z.const(0.7), z.const(1), z.const(1.5)]).default(1).volatile(),
  powerMode: z.union(['normal', 'low-power']).default('normal').volatile(),
  composerDockHeight: z.number().step(1).min(132).max(420).default(132).volatile(),
});

export const name = 'dsh-fairy-ui';

export const Config = FairyVisualSettings;

export function apply(ctx) {
  return diagnostics.guard('apply', () => {
    seedReferenceAudio();
    applyVoice(ctx);
    applyStartupAsset(ctx);
    ctx.inject(['settings'], child => {
      child.effect(() => child.settings.configure({ auto: false }, ctx.fiber));
    });
  }, { surface: 'host' });
}
