/**
 * Stylesheet for the reasoning-effort slider and the composer model seat.
 *
 * The slider visualizes whatever effort levels the current model exposes, so
 * the "peak intensity" effects key off the `[data-top]` existence flag the
 * component stamps on the highest level rather than any hardcoded effort id.
 *
 * @module dsh-reasoning-effort/client/styles
 */

export const CSS = `
.fairy-mc-effort {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 32px;
  color: var(--dsw-alias-label-secondary);
  user-select: none;
  box-sizing: border-box;
}
.fairy-mc-effort-slider {
  --fairy-mc-progress: 50%;
  position: relative;
  width: 100%;
  height: 30px;
  flex: 1 1 auto;
  border-radius: 999px;
  isolation: isolate;
  transition: filter 180ms ease;
}
.fairy-mc-effort-track {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(100deg, #03040a 0%, #071126 22%, #101d4c 45%, #302262 70%, #5d35a0 100%);
  box-shadow:
    inset 0 1px 0 rgba(189, 199, 255, .15),
    inset 0 -1px 0 rgba(0, 0, 0, .55),
    0 3px 10px rgba(12, 17, 55, .34);
}
.fairy-mc-effort-track::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 45%, rgba(82, 130, 255, .12), transparent 24%),
    linear-gradient(90deg, rgba(0, 0, 0, .28), transparent 42%, rgba(168, 113, 255, .12));
  pointer-events: none;
}
.fairy-mc-effort-fx {
  position: absolute;
  z-index: 1;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}
.fairy-mc-effort-canvas {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  image-rendering: pixelated;
  mix-blend-mode: screen;
  transition: filter 140ms ease;
}
.fairy-mc-effort-flare {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: var(--fairy-mc-progress);
  width: 78px;
  height: 46px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 100% 50%, rgba(255,255,255,.96) 0 4%, rgba(188,189,255,.8) 11%, rgba(106,87,255,.5) 28%, rgba(105,31,255,.2) 49%, transparent 74%);
  filter: blur(2px) saturate(1.25);
  mix-blend-mode: screen;
  transform: translate(-100%, -50%);
  transition: filter 140ms ease;
  pointer-events: none;
}
.fairy-mc-effort-flare::before,
.fairy-mc-effort-flare::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 100%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
}
.fairy-mc-effort-flare::before {
  width: 52px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100,160,255,.42), #f1ecff, rgba(193,82,255,.65), transparent);
  box-shadow: 0 0 7px #9b7cff, 0 0 13px rgba(72,132,255,.64);
}
.fairy-mc-effort-flare::after {
  width: 1px;
  height: 20px;
  background: linear-gradient(180deg, transparent, rgba(196,190,255,.84), transparent);
  box-shadow: 0 0 7px #9c7cff;
}
.fairy-mc-effort-knob {
  position: absolute;
  z-index: 4;
  top: 50%;
  left: clamp(14px, var(--fairy-mc-progress), calc(100% - 14px));
  width: 28px;
  height: 28px;
  border: 1px solid rgba(255,255,255,.94);
  border-radius: 50%;
  background: #fff;
  box-shadow:
    0 0 0 2px rgba(92,105,255,.12),
    0 0 14px rgba(121,82,255,.48),
    0 2px 7px rgba(0,0,0,.3);
  transform: translate(-50%, -50%);
  transition: transform 160ms ease, box-shadow 180ms ease;
  pointer-events: none;
}



.fairy-mc-effort-input {
  position: absolute;
  z-index: 5;
  inset: -5px 0;
  width: 100%;
  height: calc(100% + 10px);
  margin: 0;
  opacity: 0;
  cursor: grab;
  touch-action: none;
}
.fairy-mc-effort-input:active { cursor: grabbing; }
.fairy-mc-effort-input:focus-visible + .fairy-mc-effort-knob {
  outline: 2px solid var(--dsw-static-blue-400);
  outline-offset: 2px;
}
.fairy-mc-effort.is-dragging .fairy-mc-effort-canvas {
  filter: saturate(1.45) brightness(1.28) contrast(1.06);
}
.fairy-mc-effort.is-dragging .fairy-mc-effort-flare {
  filter: blur(1.5px) saturate(1.6) brightness(1.42);
  transition: none;
}
.fairy-mc-effort.is-dragging .fairy-mc-effort-knob {
  transform: translate(-50%, -50%) scale(1.07);
  transition: none;
  box-shadow:
    0 0 0 3px rgba(113,115,255,.25),
    0 0 20px rgba(74,145,255,.86),
    0 0 31px rgba(171,53,255,.66),
    0 3px 8px rgba(0,0,0,.32);
}
.fairy-mc-effort-slider[data-top] .fairy-mc-effort-track {
  animation: fairy-mc-effort-dark-breathe 1.9s ease-in-out infinite;
}
.fairy-mc-effort-slider[data-top] .fairy-mc-effort-knob {
  box-shadow:
    0 0 0 3px rgba(119,99,255,.18),
    0 0 22px rgba(135,78,255,.76),
    0 0 34px rgba(53,121,255,.34),
    0 3px 8px rgba(0,0,0,.3);
}
.fairy-mc-effort.is-error .fairy-mc-effort-slider {
  outline: 1px solid var(--dsw-alias-state-error-secondary);
  outline-offset: 2px;
}
.fairy-mc-effort.is-busy { opacity: .72; }
.fairy-mc-effort-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.fairy-mc-model-root {
  position: relative;
  display: inline-flex;
  min-width: 0;
}
.fairy-mc-model-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  max-width: 230px;
  height: 28px;
  padding: 0 8px 0 10px;
  border: 0;
  border-radius: 9px;
  color: var(--dsw-alias-label-primary, #15171b);
  background: transparent;
  font: inherit;
  cursor: pointer;
  transition: background 140ms ease;
}
.fairy-mc-model-trigger:hover,
.fairy-mc-model-trigger[aria-expanded="true"] {
  background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.1));
}
.fairy-mc-model-trigger:disabled { cursor: not-allowed; opacity: .5; }
.fairy-mc-model-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1;
}
.fairy-mc-model-effort {
  flex: 0 0 auto;
  color: var(--dsw-static-deepseek-500, #4d70ff);
  font-size: 12px;
  line-height: 1;
}
.fairy-mc-model-chevron {
  display: block;
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  margin: 0 0 0 2px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: .55;
  pointer-events: none;
}
.fairy-mc-model-menu {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  z-index: 1200;
  box-sizing: border-box;
  width: min(312px, var(--fairy-mc-menu-width, calc(100vw - 24px)));
  max-height: var(--fairy-mc-menu-height, calc(100dvh - 24px));
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  translate: var(--fairy-mc-menu-x, 0px) var(--fairy-mc-menu-y, 0px);
  border: 0;
  border-radius: 16px;
  color: var(--dsw-alias-label-primary, #15171b);
  /* DSH's menu fill is translucent: pair it with the theme's backdrop material. */
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-3, #fff));
  -webkit-backdrop-filter: var(--dsw-menu-backdrop-filter, blur(40px) saturate(150%));
  backdrop-filter: var(--dsw-menu-backdrop-filter, blur(40px) saturate(150%));
  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1, rgba(121,126,145,.2));
  box-shadow: var(--dsw-elevation-prominent, 0 14px 42px rgba(18, 24, 42, .18), 0 3px 10px rgba(18, 24, 42, .08));
  animation: fairy-mc-menu-in 150ms cubic-bezier(.22,1,.36,1);
}
.fairy-mc-advanced {
  padding: 14px;
}
.fairy-mc-menu-separator {
  height: 1px;
  background: var(--dsw-alias-stroke-secondary, rgba(121,126,145,.16));
}
.fairy-mc-model-row,
.fairy-mc-model-option,
.fairy-mc-model-back {
  width: 100%;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  cursor: pointer;
}
.fairy-mc-model-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 8px;
  min-height: 45px;
  padding: 0 14px;
  text-align: left;
}
.fairy-mc-model-row:hover,
.fairy-mc-model-option:hover,
.fairy-mc-model-back:hover { background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.09)); }
.fairy-mc-model-row-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
.fairy-mc-model-row-effort { color: var(--dsw-static-deepseek-500, #4d70ff); font-size: 12px; }
.fairy-mc-row-chevron { font-size: 20px; line-height: 1; opacity: .42; }
.fairy-mc-model-pane { max-height: min(390px, 60vh); overflow-y: auto; padding: 7px; }
.fairy-mc-model-back {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 8px;
  border-radius: 8px;
  text-align: left;
  color: var(--dsw-alias-label-secondary, #686c75);
  font-size: 12px;
}
.fairy-mc-model-group-title { padding: 10px 9px 5px; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 11px; }
.fairy-mc-model-option {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20px;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 7px 9px;
  border-radius: 9px;
  text-align: left;
}
.fairy-mc-model-option-copy { min-width: 0; }
.fairy-mc-model-option-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.fairy-mc-model-option-desc { display: block; margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 10px; }
.fairy-mc-model-check { color: var(--dsw-static-deepseek-500, #4d70ff); font-size: 15px; text-align: center; }
.fairy-mc-model-status { padding: 14px; color: var(--dsw-alias-label-tertiary, #9296a0); font-size: 12px; text-align: center; }
.fairy-mc-model-error { margin: 8px; padding: 8px 10px; border-radius: 8px; color: var(--dsw-alias-state-error-primary, #c83e4d); background: var(--dsw-alias-state-error-tertiary, rgba(220,55,70,.08)); font-size: 11px; }
:is(body[data-ds-dark-theme],html[data-dsh-fairy-theme="dark"]) .fairy-mc-model-menu {
  color: var(--dsw-alias-label-primary, #f2f4f8);
  background: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-3, #202126));
  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1, rgba(136, 145, 180, .2));
  box-shadow: var(--dsw-elevation-prominent, 0 18px 46px rgba(0,0,0,.48), 0 3px 12px rgba(0,0,0,.32));
}
:is(body[data-ds-dark-theme],html[data-dsh-fairy-theme="dark"]) .fairy-mc-model-trigger { color: var(--dsw-alias-label-primary, #f2f4f8); }
@keyframes fairy-mc-menu-in {
  from { opacity: 0; transform: translateY(5px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-slider {
  filter: none;
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-track {
  background: var(--dsw-static-blue-75, #e5f0ff);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.9),
    inset 0 0 0 1px rgba(80,133,194,.14),
    0 3px 10px rgba(48,101,165,.13);
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-track::before {
  content: "";
  position: absolute;
  z-index: 0;
  inset: 0 auto 0 0;
  width: var(--fairy-mc-progress);
  border-radius: inherit;
  background: linear-gradient(90deg, #fff 0%, #e2f0ff 20%, #a8d0fb 57%, #438fdf 100%);
  transition: none;
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-slider[data-top] .fairy-mc-effort-track::before {
  background: linear-gradient(90deg, #fff 0%, #d7eaff 18%, #75afea 54%, #0751ad 100%);
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort.is-dragging .fairy-mc-effort-track::before {
  transition: none;
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-track::after {
  z-index: 1;
  background: linear-gradient(90deg, rgba(255,255,255,.48), transparent 34%, rgba(23,101,201,.07));
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-canvas {
  opacity: .78;
  mix-blend-mode: multiply;
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-flare {
  background: radial-gradient(ellipse at 100% 50%, rgba(255,255,255,.98) 0 5%, rgba(204,231,255,.88) 13%, rgba(91,162,241,.48) 31%, rgba(37,111,207,.16) 53%, transparent 75%);
  filter: blur(2px) saturate(1.12);
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-flare::before {
  background: linear-gradient(90deg, transparent, rgba(116,177,244,.34), #fff, rgba(66,139,225,.58), transparent);
  box-shadow: 0 0 7px rgba(58,133,222,.5), 0 0 13px rgba(104,176,255,.38);
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-flare::after {
  background: linear-gradient(180deg, transparent, rgba(255,255,255,.94), transparent);
  box-shadow: 0 0 7px rgba(64,137,224,.44);
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-knob {
  border-color: rgba(126,160,197,.32);
  box-shadow:
    0 0 0 2px rgba(58,124,207,.09),
    0 0 13px rgba(48,118,207,.3),
    0 3px 8px rgba(39,77,119,.18);
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-slider[data-top] .fairy-mc-effort-track {
  animation-name: fairy-mc-effort-light-breathe;
}
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-slider[data-top] .fairy-mc-effort-knob,
html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort.is-dragging .fairy-mc-effort-knob {
  box-shadow:
    0 0 0 3px rgba(36,105,192,.15),
    0 0 20px rgba(25,100,201,.45),
    0 3px 8px rgba(39,77,119,.18);
}
@keyframes fairy-mc-effort-dark-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(196,204,255,.16), 0 3px 10px rgba(18,25,72,.4); }
  50% { box-shadow: inset 0 1px 0 rgba(220,214,255,.24), 0 0 21px rgba(111,66,255,.5); }
}
@keyframes fairy-mc-effort-light-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 0 0 0 1px rgba(67,124,193,.16), 0 3px 10px rgba(48,101,165,.13); }
  50% { box-shadow: inset 0 1px 0 rgba(255,255,255,.96), inset 0 0 0 1px rgba(31,102,190,.22), 0 0 19px rgba(31,105,201,.24); }
}

@media (max-width: 600px) {
  .fairy-mc-model-trigger { max-width: 180px; }
}
@media (prefers-reduced-motion: reduce) {
  .fairy-mc-effort-slider[data-top] .fairy-mc-effort-track { animation: none; }
  .fairy-mc-effort-knob,
  .fairy-mc-effort-flare,
  html:not([data-dsh-fairy-theme="dark"]) body:not([data-ds-dark-theme]) .fairy-mc-effort-track::before { transition: none; }
  .fairy-mc-model-menu { animation: none; }

}

.fairy-mc-model-trigger { max-width: 100%; justify-content: flex-end; }
.fairy-mc-model-menu { width: min(312px, var(--fairy-mc-menu-width, calc(100vw - 24px))); outline: 1px solid rgba(93,135,187,.15); }
.fairy-mc-model-trigger:focus-visible, .fairy-mc-model-menu button:focus-visible { outline: 2px solid #5c8df5; outline-offset: -2px; }
.fairy-mc-model-name, .fairy-mc-model-row-name { font-weight: 650; }
.fairy-mc-model-effort, .fairy-mc-model-row-effort { color: #4680ee; font-weight: 650; }
.fairy-mc-model-search { display: block; width: calc(100% - 8px); box-sizing: border-box; margin: 4px; padding: 9px 10px; background: transparent; color: inherit; border: 1px solid rgba(120,145,180,.3); border-radius: 8px; font: inherit; font-size: 12px; }
.fairy-mc-effort { position: relative; }
.fairy-mc-effort:has(.fairy-mc-effort-error) { flex-wrap: wrap; height: auto; }
.fairy-mc-effort-error { display: block; flex: 1 0 100%; margin-top: 6px; color: #c83e4d; font-size: 11px; }
.fairy-mc-model-option:disabled, .fairy-mc-model-row:disabled { opacity: .55; cursor: wait; }
html[data-dsh-fairy-theme="dark"] .fairy-mc-model-menu { background: #0e243d; color: #e8f2fa; box-shadow: 0 12px 32px #0006; }
html[data-dsh-fairy-theme="dark"] .fairy-mc-model-trigger { color: #e8f2fa; }

`

// Fairy-only refinements: same screenshot layout, isolated from other model plugins.
