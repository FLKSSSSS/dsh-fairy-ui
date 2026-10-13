import { readFileSync } from 'node:fs';
const ASSETS = new URL('../agent-presets/fairy/', import.meta.url);

/** Adapt only package paths/platform switches; source persona/corpus stays unchanged. */
export function fairyPresetDefinition(platform = process.platform) {
  const definition = JSON.parse(readFileSync(new URL('definition.json', ASSETS), 'utf8'));
  const adapt = rows => {
    for (const row of rows) {
      if (row.name?.startsWith('./runtime/')) row.name = new URL(row.name, ASSETS).href;
      if (row.disabled?.fairyExpression) {
        if (row.id === 'tool-bash') row.disabled = platform === 'win32';
        else if (row.id === 'tool-pwsh') row.disabled = platform !== 'win32';
        else throw new Error('Unsupported Fairy preset platform expression');
      }
      if (Array.isArray(row.config)) adapt(row.config);
    }
  };
  adapt(definition.plugins);
  return definition;
}

/** Register in-memory, owned by this plugin; never edit host presets/defaults/settings. */
export async function registerFairyPreset(registry, warn = console.warn) {
  try { return await registry.register(fairyPresetDefinition()); }
  catch (error) {
    if (error.message === 'Duplicate agent preset: fairy') {
      warn('[dsh-fairy-ui] Existing Fairy preset retained; bundled preset was not substituted.');
      return () => {};
    }
    throw error;
  }
}

export function applyFairyPreset(ctx) {
  ctx.inject(['agentPresets'], child => {
    child.effect(() => registerFairyPreset(child.agentPresets));
  });
}
