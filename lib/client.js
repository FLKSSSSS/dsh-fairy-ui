// Generated from the supplied 2026-10-11 Fairy visual and voice modules.
// No automatic model, system-prompt or permission changes. Model/effort selection remains user initiated.
window.__ModuleLoader__.load({ id: 'dsh-fairy-ui', factory: require => {
// #region fairy-model-control
// Generated from src/model-control.tsx; MIT attribution in THIRD-PARTY-NOTICES.txt.
const fairyModelControl = (() => { const module = { exports: {} };
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/model-control.tsx
var model_control_exports = {};
__export(model_control_exports, {
  apply: () => apply,
  clampIndex: () => clampIndex,
  currentModel: () => currentModel,
  effectiveEffortIndex: () => effectiveEffortIndex,
  makeModelSelection: () => makeModelSelection,
  sameRoute: () => sameRoute,
  sliderLevels: () => sliderLevels
});
module.exports = __toCommonJS(model_control_exports);
var import_react = __toESM(require("react"), 1);

// src/model-control-styles.ts
var CSS = `
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
  transition: left 70ms linear, filter 140ms ease;
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
  transition: left 190ms cubic-bezier(.22,1,.36,1), transform 160ms ease, box-shadow 180ms ease;
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
  flex: 0 0 auto;
  width: 7px;
  height: 7px;
  margin: -3px 1px 0 3px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  opacity: .55;
  transform: rotate(45deg);
  transition: transform 150ms ease, margin 150ms ease;
}
.fairy-mc-model-trigger[aria-expanded="true"] .fairy-mc-model-chevron {
  margin-top: 3px;
  transform: rotate(225deg);
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
  transition: width 190ms cubic-bezier(.22,1,.36,1);
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

`;

// src/model-menu-position.ts
function positionModelMenu(root, menu) {
  const viewport = window.visualViewport;
  const update = () => {
    const margin = 12;
    const left = (viewport?.offsetLeft ?? 0) + margin;
    const top = (viewport?.offsetTop ?? 0) + margin;
    const width = Math.max(0, (viewport?.width ?? document.documentElement.clientWidth) - margin * 2);
    const height = Math.max(0, (viewport?.height ?? window.innerHeight) - margin * 2);
    const anchor = root.getBoundingClientRect();
    const bottom = anchor.top - 8;
    const above = bottom - top;
    menu.style.setProperty("--fairy-mc-menu-width", `${width}px`);
    menu.style.setProperty("--fairy-mc-menu-height", `${Math.min(480, above >= 120 ? Math.min(above, height) : height)}px`);
    const baseLeft = anchor.right - menu.offsetWidth;
    const baseTop = bottom - menu.offsetHeight;
    const x = Math.max(left, Math.min(baseLeft, left + width - menu.offsetWidth));
    const y = Math.max(top, Math.min(baseTop, top + height - menu.offsetHeight));
    menu.style.setProperty("--fairy-mc-menu-x", `${x - baseLeft}px`);
    menu.style.setProperty("--fairy-mc-menu-y", `${y - baseTop}px`);
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(root);
  observer.observe(menu);
  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, true);
  viewport?.addEventListener("resize", update);
  viewport?.addEventListener("scroll", update);
  return () => {
    observer.disconnect();
    window.removeEventListener("resize", update);
    window.removeEventListener("scroll", update, true);
    viewport?.removeEventListener("resize", update);
    viewport?.removeEventListener("scroll", update);
  };
}

// src/model-control.tsx
function sameRoute(a, b) {
  return a != null && b != null && a.provider === b.provider && a.model === b.model;
}
function makeModelSelection(provider, model) {
  return { provider, model: model.id, ...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort } };
}
var TEXT = {
  "model.select": "选择模型",
  "model.defaultEffort": "默认",
  "model.loading": "正在读取模型…",
  "effort.label": "推理强度",
  "effort.title": "推理强度：{effort}",
  "effort.failed": "调整失败：{error}",
  "effort.unavailable": "当前模型不支持此强度，请重新选择。",
  "effort.changed": "模型已变化，请重新调整强度。"
};
var t = (key, vars = {}) => (TEXT[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ""));
function currentModel(state) {
  if (state.current === null) return void 0;
  const group = state.groups.find((candidate) => candidate.id === state.current?.provider);
  return group?.models.find((candidate) => candidate.id === state.current?.model);
}
function sliderLevels(state) {
  const efforts = currentModel(state)?.reasoning?.efforts;
  return efforts !== void 0 && efforts.length >= 2 ? efforts : [];
}
function effortIndex(levels, id) {
  return levels.findIndex((level) => level.id === id);
}
function clampIndex(value, count) {
  return Math.max(0, Math.min(count - 1, Math.round(value)));
}
function effectiveEffortIndex(levels, state) {
  const reasoning = currentModel(state)?.reasoning;
  const current = effortIndex(levels, state.current?.reasoningEffort);
  if (current >= 0) return current;
  const fallback = effortIndex(levels, reasoning?.defaultEffort);
  if (fallback >= 0) return fallback;
  return Math.floor((levels.length - 1) / 2);
}
function drawRadiation(context, width, height, time, state) {
  const origin = state.progress * width;
  const isDark = document.body.hasAttribute("data-ds-dark-theme") || document.documentElement.dataset.dshFairyTheme === "dark";
  const cell = 4;
  const speed = state.dragging ? 2.8 : 1;
  context.clearRect(0, 0, width, height);
  if (origin <= 0) return;
  context.save();
  context.beginPath();
  context.rect(0, 0, origin, height);
  context.clip();
  for (let x = 0; x < origin; x += cell) {
    const delta = x + cell * 0.5 - origin;
    const distance = Math.abs(delta);
    const phaseA = distance / 10 - time * 74e-4 * speed;
    const phaseB = distance / 23 - time * 41e-4 * speed + 1.7;
    const phaseC = distance / 40 - time * 22e-4 * speed + 3.4;
    const sinA = Math.max(0, Math.sin(phaseA));
    const sinB = Math.max(0, Math.sin(phaseB));
    const sinC = Math.max(0, Math.sin(phaseC));
    const waveA = Math.pow(sinA, 2.6);
    const waveB = Math.pow(sinB, 3.2);
    const waveC = Math.pow(sinC, 4);
    const crest = Math.pow(sinA, 15) + Math.pow(sinB, 18) * 0.78;
    const wave = Math.min(1, waveA * 0.76 + waveB * 0.58 + waveC * 0.32);
    const trail = 0.38 + 0.62 * Math.exp(-distance / Math.max(55, width * 0.72));
    const pillar = Math.pow(Math.max(0, Math.sin(x / 20 + time * 16e-4)), 3) * 0.27;
    const columnEnergy = trail * (wave * 1.04 + pillar + crest * 0.32);
    if (columnEnergy > 0.012) {
      const nearness = Math.max(0, 1 - distance / Math.max(1, width * 0.78));
      const red = isDark ? Math.round(42 + 124 * nearness + 75 * wave) : Math.round(28 + 58 * nearness + 15 * wave);
      const green = isDark ? Math.round(56 + 58 * nearness + 44 * crest) : Math.round(88 + 72 * nearness + 30 * crest);
      const blue = isDark ? Math.round(175 + 72 * nearness + 8 * wave) : Math.round(182 + 62 * nearness);
      const alpha = isDark ? Math.min(0.88, columnEnergy * 0.72) : Math.min(0.62, columnEnergy * 0.54);
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      context.fillRect(x, 0, cell - 1, height);
    }
    for (let y = 0; y < height; y += cell) {
      const deltaY = y + cell * 0.5 - height * 0.5;
      const radial = Math.hypot(delta / 38, deltaY / 11);
      const halo = Math.exp(-radial * 0.96) * 1.08;
      const verticalShape = 0.58 + 0.42 * Math.cos(deltaY / height * Math.PI);
      const grain = 0.72 + 0.28 * Math.sin(x * 0.73 + y * 1.31 + time * 6e-3);
      const alpha = Math.min(0.96, (columnEnergy * 0.88 + halo + crest * 0.19) * verticalShape * grain);
      if (alpha < 0.035) continue;
      const hot = Math.max(0, 1 - radial / 2.4);
      const red = isDark ? Math.round(54 + 148 * hot + 42 * wave + 35 * crest) : Math.round(25 + 72 * hot + 12 * wave);
      const green = isDark ? Math.round(68 + 78 * hot + 46 * crest) : Math.round(98 + 72 * hot + 24 * crest);
      const blue = isDark ? Math.round(186 + 64 * hot) : Math.round(194 + 56 * hot);
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${isDark ? alpha : alpha * 0.72})`;
      context.fillRect(x, y, cell - 1, cell - 1);
    }
  }
  for (let i = 0; i < 14; i += 1) {
    const travel = (time * (state.dragging ? 0.16 : 0.065) * (0.78 + i % 5 * 0.09) + i * 23) % Math.max(30, origin + 64);
    const particleX = origin - travel;
    if (particleX < -24 || particleX > width + 16) continue;
    const particleY = 3 + (i * 13 + Math.sin(time * 3e-3 + i) * 5) % Math.max(7, height - 6);
    const length = 4 + i % 4 * 4 + (state.dragging ? 6 : 0);
    const alpha = 0.28 + i % 5 * 0.1;
    const streak = context.createLinearGradient(particleX, 0, particleX + length, 0);
    streak.addColorStop(0, isDark ? "rgba(72,118,255,0)" : "rgba(24,94,184,0)");
    streak.addColorStop(0.68, isDark ? `rgba(112,135,255,${alpha})` : `rgba(36,108,202,${alpha * 0.72})`);
    streak.addColorStop(1, isDark ? `rgba(236,222,255,${Math.min(1, alpha + 0.26)})` : `rgba(103,175,248,${Math.min(0.82, alpha + 0.18)})`);
    context.fillStyle = streak;
    context.fillRect(particleX, particleY, length, i % 3 === 0 ? 2 : 1);
  }
  const glow = context.createRadialGradient(origin, height / 2, 0, origin, height / 2, 24);
  glow.addColorStop(0, isDark ? "rgba(255,255,255,.82)" : "rgba(255,255,255,.86)");
  glow.addColorStop(0.14, isDark ? "rgba(183,190,255,.54)" : "rgba(162,210,255,.48)");
  glow.addColorStop(0.44, isDark ? "rgba(103,74,255,.28)" : "rgba(37,112,207,.22)");
  glow.addColorStop(1, isDark ? "rgba(86,31,210,0)" : "rgba(25,91,181,0)");
  context.fillStyle = glow;
  context.fillRect(origin - 26, 0, 52, height);
  context.restore();
}
function EffortSlider({ directory, t: t2, locked }) {
  const directoryState = (0, import_react.useSyncExternalStore)(
    (notify) => directory.store.subscribe(notify),
    () => directory.store.getSnapshot()
  );
  const levels = sliderLevels(directoryState);
  const [effort, setEffort] = (0, import_react.useState)("");
  const [preview, setPreview] = (0, import_react.useState)(0);
  const [committing, setCommitting] = (0, import_react.useState)(false);
  const [dragging, setDragging] = (0, import_react.useState)(false);
  const [localError, setLocalError] = (0, import_react.useState)(null);
  const canvasRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const committedRef = (0, import_react.useRef)("");
  const committingRef = (0, import_react.useRef)(false);
  const previewRef = (0, import_react.useRef)(0);
  const draggingRef = (0, import_react.useRef)(false);
  const pointerActiveRef = (0, import_react.useRef)(false);
  const activePointerIdRef = (0, import_react.useRef)(null);
  const globalPointerMoveRef = (0, import_react.useRef)(null);
  const globalPointerEndRef = (0, import_react.useRef)(null);
  const globalPointerCancelRef = (0, import_react.useRef)(null);
  const radiationRef = (0, import_react.useRef)({ progress: 0.5, dragging: false });
  const redrawRef = (0, import_react.useRef)(null);
  const available = directoryState.current !== null && levels.length >= 2;
  const busy = locked || committing || directoryState.status === "selecting" || directoryState.status === "loading";
  const error = localError ?? directoryState.error;
  (0, import_react.useEffect)(() => {
    if (!available || committingRef.current || draggingRef.current) return;
    const index = effectiveEffortIndex(levels, directoryState);
    const next = levels[index]?.id ?? "";
    committedRef.current = next;
    previewRef.current = index;
    setEffort(next);
    setPreview(index);
    setLocalError(null);
  }, [available, levels, directoryState]);
  (0, import_react.useEffect)(() => {
    directory.load().catch(() => void 0);
  }, [directory]);
  (0, import_react.useEffect)(() => {
    previewRef.current = preview;
    radiationRef.current.progress = levels.length >= 2 ? preview / (levels.length - 1) : 0.5;
    redrawRef.current?.();
  }, [preview, levels.length]);
  (0, import_react.useEffect)(() => {
    radiationRef.current.dragging = dragging;
    redrawRef.current?.();
  }, [dragging]);
  (0, import_react.useEffect)(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let frame = 0;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time = performance.now()) => {
      drawRadiation(context, width, height, time, radiationRef.current);
    };
    const loop = (time) => {
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };
    const redraw = () => {
      if (reducedMotion.matches) draw();
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const themeObserver = new MutationObserver(() => draw());
    resizeObserver.observe(canvas);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-dsh-fairy-theme"] });
    redrawRef.current = redraw;
    resize();
    draw();
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      redrawRef.current = null;
    };
  }, []);
  const rollback = (0, import_react.useCallback)(() => {
    const previous = committedRef.current;
    previewRef.current = Math.max(0, effortIndex(levels, previous));
    pointerActiveRef.current = false;
    activePointerIdRef.current = null;
    draggingRef.current = false;
    setEffort(previous);
    setPreview(Math.max(0, effortIndex(levels, previous)));
    setDragging(false);
  }, [levels]);
  const commit = (0, import_react.useCallback)(async (raw) => {
    if (locked || committingRef.current) return;
    const route = directory.store.getSnapshot().current;
    committingRef.current = true;
    const previous = committedRef.current;
    setDragging(false);
    setCommitting(true);
    setLocalError(null);
    const optimisticIndex = clampIndex(raw, levels.length);
    const optimistic = levels[optimisticIndex]?.id;
    if (optimistic !== void 0) {
      previewRef.current = optimisticIndex;
      setPreview(optimisticIndex);
      setEffort(optimistic);
    }
    try {
      const fresh = await directory.load();
      const freshLevels = sliderLevels(fresh);
      if (!sameRoute(route, fresh.current)) throw new Error(t2("effort.changed"));
      const index = effortIndex(freshLevels, optimistic);
      const next = freshLevels[index]?.id;
      if (next === void 0) throw new Error(t2("effort.unavailable"));
      previewRef.current = index;
      setPreview(index);
      setEffort(next);
      if (fresh.current === null) throw new Error(t2("effort.unavailable"));
      const result = await directory.select({
        provider: fresh.current.provider,
        model: fresh.current.model,
        reasoningEffort: next
      });
      if (!result.ok) throw result.error;
      const snapshot = directory.store.getSnapshot();
      const accepted = effortIndex(freshLevels, snapshot.current?.reasoningEffort);
      const settled = accepted >= 0 ? accepted : index;
      const settledId = freshLevels[settled]?.id ?? next;
      committedRef.current = settledId;
      previewRef.current = settled;
      setEffort(settledId);
      setPreview(settled);
    } catch (cause) {
      const restore = Math.max(0, effortIndex(levels, previous));
      committedRef.current = previous;
      previewRef.current = restore;
      setEffort(previous);
      setPreview(restore);
      setLocalError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      committingRef.current = false;
      setCommitting(false);
    }
  }, [directory, levels, locked]);
  const rawFromPointer = (input, clientX) => {
    const bounds = input.getBoundingClientRect();
    if (bounds.width <= 0 || levels.length < 2) return previewRef.current;
    return Math.max(
      0,
      Math.min(levels.length - 1, (clientX - bounds.left) / bounds.width * (levels.length - 1))
    );
  };
  const showPointerPreview = (raw) => {
    previewRef.current = raw;
    setPreview(raw);
    setEffort(levels[clampIndex(raw, levels.length)]?.id ?? "");
  };
  const beginDragging = (input, pointerId, clientX) => {
    pointerActiveRef.current = true;
    activePointerIdRef.current = pointerId;
    draggingRef.current = true;
    setDragging(true);
    showPointerPreview(rawFromPointer(input, clientX));
    try {
      if (!input.hasPointerCapture(pointerId)) input.setPointerCapture(pointerId);
    } catch {
    }
  };
  const moveDragging = (input, pointerId, clientX) => {
    if (!pointerActiveRef.current || activePointerIdRef.current !== pointerId) return;
    showPointerPreview(rawFromPointer(input, clientX));
  };
  const stopDragging = (input, pointerId, clientX) => {
    if (!pointerActiveRef.current) return;
    if (pointerId !== void 0 && activePointerIdRef.current !== pointerId) return;
    const raw = clientX === void 0 ? previewRef.current : rawFromPointer(input, clientX);
    pointerActiveRef.current = false;
    activePointerIdRef.current = null;
    draggingRef.current = false;
    if (pointerId !== void 0 && input.hasPointerCapture(pointerId)) {
      input.releasePointerCapture(pointerId);
    }
    showPointerPreview(raw);
    void commit(raw);
  };
  globalPointerMoveRef.current = (event) => {
    const input = inputRef.current;
    if (input !== null) moveDragging(input, event.pointerId, event.clientX);
  };
  globalPointerEndRef.current = (event) => {
    const input = inputRef.current;
    if (input !== null) stopDragging(input, event.pointerId, event.clientX);
  };
  globalPointerCancelRef.current = (event) => {
    if (activePointerIdRef.current !== event.pointerId) return;
    rollback();
  };
  (0, import_react.useEffect)(() => {
    const move = (event) => globalPointerMoveRef.current?.(event);
    const end = (event) => globalPointerEndRef.current?.(event);
    const cancel = (event) => globalPointerCancelRef.current?.(event);
    window.addEventListener("pointermove", move, true);
    window.addEventListener("pointerup", end, true);
    window.addEventListener("pointercancel", cancel, true);
    return () => {
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerup", end, true);
      window.removeEventListener("pointercancel", cancel, true);
    };
  }, []);
  const onKeyDown = (event) => {
    if (busy) {
      event.preventDefault();
      return;
    }
    const current = clampIndex(Number(event.currentTarget.value), levels.length);
    let target;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "PageDown") {
      target = Math.max(0, current - 1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "PageUp") {
      target = Math.min(levels.length - 1, current + 1);
    } else if (event.key === "Home") {
      target = 0;
    } else if (event.key === "End") {
      target = levels.length - 1;
    }
    if (target === void 0) return;
    event.preventDefault();
    void commit(target);
  };
  if (!available) return null;
  const count = levels.length;
  const effortName = levels[effortIndex(levels, effort)]?.name ?? effort;
  const isTop = effortIndex(levels, effort) === count - 1;
  const progress = preview / (count - 1) * 100;
  const style = { "--fairy-mc-progress": `${progress}%` };
  const title = error === null ? t2("effort.title", { effort: effortName }) : t2("effort.failed", { error });
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: `fairy-mc-effort${dragging ? " is-dragging" : ""}${busy ? " is-busy" : ""}${error === null ? "" : " is-error"}`,
      title
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: "fairy-mc-effort-slider",
        "data-top": isTop ? "true" : void 0,
        style
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-effort-track", "aria-hidden": "true" }),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-effort-fx", "aria-hidden": "true" }, /* @__PURE__ */ import_react.default.createElement("canvas", { ref: canvasRef, className: "fairy-mc-effort-canvas" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-effort-flare" })),
      /* @__PURE__ */ import_react.default.createElement(
        "input",
        {
          ref: inputRef,
          className: "fairy-mc-effort-input",
          type: "range",
          min: "0",
          max: count - 1,
          step: "0.01",
          value: preview,
          disabled: locked,
          "aria-disabled": busy,
          "aria-label": t2("effort.label"),
          "aria-valuetext": effortName,
          onChange: (event) => {
            if (busy) return;
            const raw = Number(event.currentTarget.value);
            showPointerPreview(raw);
          },
          onPointerDown: (event) => {
            event.preventDefault();
            if (busy) return;
            event.currentTarget.focus();
            beginDragging(event.currentTarget, event.pointerId, event.clientX);
          },
          onPointerMove: (event) => moveDragging(event.currentTarget, event.pointerId, event.clientX),
          onPointerUp: (event) => stopDragging(event.currentTarget, event.pointerId, event.clientX),
          onPointerCancel: (event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
            rollback();
          },
          onBlur: (event) => {
            stopDragging(event.currentTarget);
          },
          onKeyDown
        }
      ),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-effort-knob", "aria-hidden": "true" })
    ),
    error === null ? null : /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-effort-error", role: "alert" }, error)
  );
}
function ModelControl({ locked = false, available, controller }) {
  const state = (0, import_react.useSyncExternalStore)(
    (notify) => controller.store.subscribe(notify),
    () => controller.store.getSnapshot()
  );
  const [open, setOpen] = (0, import_react.useState)(false);
  const [modelsOpen, setModelsOpen] = (0, import_react.useState)(false);
  const [query, setQuery] = (0, import_react.useState)("");
  const [pending, setPending] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const selecting = (0, import_react.useRef)(false);
  const mounted = (0, import_react.useRef)(true);
  const root = (0, import_react.useRef)(null);
  const menu = (0, import_react.useRef)(null);
  const trigger = (0, import_react.useRef)(null);
  const search = (0, import_react.useRef)(null);
  const row = (0, import_react.useRef)(null);
  const choice = currentModel(state);
  const levels = sliderLevels(state);
  const effort = levels[effectiveEffortIndex(levels, state)]?.name ?? choice?.reasoning?.efforts?.[0]?.name ?? t("model.defaultEffort");
  const label = choice?.name ?? state.current?.model ?? t("model.select");
  const busy = pending || state.status === "loading" || state.status === "selecting";
  const close = (focus = false) => {
    setOpen(false);
    setModelsOpen(false);
    setQuery("");
    if (focus) queueMicrotask(() => trigger.current?.focus());
  };
  (0, import_react.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (available) controller.load().catch(() => void 0);
  }, [available, controller]);
  (0, import_react.useEffect)(() => {
    if (locked || !available) close();
  }, [locked, available]);
  (0, import_react.useLayoutEffect)(() => {
    if (!open || !root.current || !menu.current) return;
    return positionModelMenu(root.current, menu.current);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const outside = (event) => {
      if (!root.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", outside, true);
    return () => document.removeEventListener("pointerdown", outside, true);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (open && modelsOpen) search.current?.focus();
  }, [open, modelsOpen]);
  const choose = async (provider, model) => {
    if (locked || busy || selecting.current) return;
    if (sameRoute(state.current, { provider, model: model.id })) {
      setModelsOpen(false);
      return;
    }
    selecting.current = true;
    setPending(true);
    setError(null);
    try {
      const result = await controller.select(makeModelSelection(provider, model));
      if (!result.ok) throw result.error;
      if (mounted.current) {
        setModelsOpen(false);
        setQuery("");
        queueMicrotask(() => row.current?.focus());
      }
    } catch (cause) {
      if (mounted.current) setError(cause instanceof Error ? cause.message : cause?.message ?? "模型切换失败，请重试。");
    } finally {
      selecting.current = false;
      if (mounted.current) setPending(false);
    }
  };
  const keyboard = (event) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (modelsOpen) {
        setModelsOpen(false);
        setQuery("");
        queueMicrotask(() => row.current?.focus());
      } else close(true);
      return;
    }
    if (event.key === "Tab") {
      close();
      return;
    }
    if (event.target.matches("input")) return;
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const options = [...menu.current?.querySelectorAll("button:not(:disabled)") ?? []];
    if (!options.length) return;
    event.preventDefault();
    const index = options.indexOf(document.activeElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (index + (event.key === "ArrowUp" ? -1 : 1) + options.length) % options.length;
    options[next]?.focus();
  };
  if (!available) return null;
  const groups = state.groups.map((group) => ({ ...group, models: group.models.filter((model) => `${group.name} ${model.name} ${model.id}`.toLowerCase().includes(query.trim().toLowerCase())) })).filter((group) => group.models.length);
  return /* @__PURE__ */ import_react.default.createElement("div", { ref: root, className: "fairy-mc-model-root", "data-fairy-model-control": "true", onKeyDown: keyboard }, /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      ref: trigger,
      type: "button",
      className: "fairy-mc-model-trigger",
      "data-fairy-model-trigger": "true",
      "aria-label": `模型 ${label}，推理强度 ${effort}`,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      title: `${label} · ${effort}`,
      disabled: locked,
      onKeyDown: (event) => {
        if (event.key === "ArrowDown" && !open) {
          event.preventDefault();
          setOpen(true);
          queueMicrotask(() => row.current?.focus());
        }
      },
      onClick: () => {
        if (open) close();
        else {
          setOpen(true);
          setModelsOpen(false);
          setError(null);
          controller.load().catch(() => void 0);
        }
      }
    },
    /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-name" }, label),
    /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-effort" }, effort),
    /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-chevron", "aria-hidden": "true" })
  ), open && /* @__PURE__ */ import_react.default.createElement("div", { ref: menu, className: "fairy-mc-model-menu", role: "menu", "aria-label": "模型与推理强度", "aria-busy": busy }, modelsOpen ? /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-model-pane" }, /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "fairy-mc-model-back", onClick: () => {
    setModelsOpen(false);
    setQuery("");
    queueMicrotask(() => row.current?.focus());
  } }, /* @__PURE__ */ import_react.default.createElement("span", { "aria-hidden": "true" }, "‹"), "选择模型"), /* @__PURE__ */ import_react.default.createElement("input", { ref: search, type: "search", className: "fairy-mc-model-search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "搜索模型", "aria-label": "搜索模型" }), groups.map((group) => /* @__PURE__ */ import_react.default.createElement("section", { key: group.id }, /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-model-group-title" }, group.name), group.models.map((model) => {
    const selected = sameRoute(state.current, { provider: group.id, model: model.id });
    return /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: model.id,
        type: "button",
        role: "menuitemradio",
        "aria-checked": selected,
        className: "fairy-mc-model-option",
        disabled: locked || busy,
        onClick: () => void choose(group.id, model)
      },
      /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-option-copy" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-option-name" }, model.name), model.description && /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-option-desc" }, model.description)),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-check", "aria-hidden": "true" }, selected ? "✓" : "")
    );
  }))), groups.length === 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-model-status" }, busy ? t("model.loading") : "没有匹配的模型")) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, levels.length >= 2 ? /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-advanced" }, /* @__PURE__ */ import_react.default.createElement(EffortSlider, { key: `${state.current?.provider}/${state.current?.model}`, directory: controller, t, locked: locked || pending })) : /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-model-status" }, busy ? t("model.loading") : "此模型未提供可调推理强度"), /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-menu-separator" }), /* @__PURE__ */ import_react.default.createElement("button", { ref: row, type: "button", role: "menuitem", className: "fairy-mc-model-row", disabled: busy || locked, onClick: () => setModelsOpen(true) }, /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-row-name" }, label), /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-model-row-effort" }, effort), /* @__PURE__ */ import_react.default.createElement("span", { className: "fairy-mc-row-chevron", "aria-hidden": "true" }, "›"))), (error ?? state.error) && /* @__PURE__ */ import_react.default.createElement("div", { className: "fairy-mc-model-error", role: "alert" }, String(error ?? state.error))));
}
function apply(ctx) {
  const directories = ctx.get("modelDirectories");
  if (!directories) return;
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "dsh-fairy-ui-model-control";
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, "Fairy model control styles");
  ctx.slots.inject("conversation.input.model", () => {
    let dispose;
    const sync = () => {
      if (!document.documentElement.hasAttribute("data-dsh-fairy-visual")) {
        dispose?.();
        dispose = void 0;
        return;
      }
      if (dispose) return;
      dispose = ctx.slots.register({
        name: "conversation.input.model",
        id: "fairy-model-control",
        priority: -100,
        inject: (sessionId) => ({
          available: ctx.sessions.subagentAddress(sessionId) === void 0,
          controller: directories.directoryFor(sessionId)
        })
      }, ModelControl);
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-dsh-fairy-visual"] });
    sync();
    return () => {
      observer.disconnect();
      dispose?.();
    };
  });
}

return module.exports; })();
// #endregion fairy-model-control
const visual = (() => { 
    const module = { exports: {} };
    return void 0, 
(function() {

//#region \0rolldown/runtime.js
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __esmMin = (fn, res, err) => () => {
		if (err) throw err[0];
		try {
			return fn && (res = fn(fn = 0)), res;
		} catch (e) {
			throw err = [e], e;
		}
	};
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) {
			__defProp(target, name, {
				get: all[name],
				enumerable: true
			});
		}
		if (!no_symbols) {
			__defProp(target, Symbol.toStringTag, { value: "Module" });
		}
		return target;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) {
					__defProp(to, key, {
						get: ((k) => from[k]).bind(null, key),
						enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
					});
				}
			}
		}
		return to;
	};
	var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);

//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/typeof.js
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var init_typeof = __esmMin((() => {}));

//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/toPrimitive.js
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var init_toPrimitive = __esmMin((() => {
		init_typeof();
	}));

//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/toPropertyKey.js
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	var init_toPropertyKey = __esmMin((() => {
		init_typeof();
		init_toPrimitive();
	}));

//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/defineProperty.js
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	var init_defineProperty = __esmMin((() => {
		init_toPropertyKey();
	}));

//#endregion
//#region ../../fairy-contracts/client-diagnostics.cjs
	var require_client_diagnostics = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const FAIRY_LOG_PREFIX = "DSH_FAIRY_LOG";
		const SENSITIVE_KEY = /authorization|credential|password|secret|token|api[_-]?key|cookie/i;
		function sanitize(value, key = "", depth = 0) {
			if (SENSITIVE_KEY.test(key)) return "[redacted]";
			if (value == null || typeof value === "boolean" || typeof value === "number") return value;
			if (typeof value === "string") return value.length > 320 ? `${value.slice(0, 320)}…` : value;
			if (depth >= 2) return "[truncated]";
			if (Array.isArray(value)) return value.slice(0, 12).map((item) => sanitize(item, "", depth + 1));
			if (typeof value === "object") return Object.fromEntries(Object.entries(value).slice(0, 24).map(([name, item]) => [name, sanitize(item, name, depth + 1)]));
			return String(value);
		}
		function createFairyDiagnostics(moduleName, sink = console) {
			const recentErrors = /* @__PURE__ */ new Map();
			const clock = () => typeof performance === "object" && performance?.now ? performance.now() : Date.now();
			const emit = (level, operation, event, context = {}, error, durationMs) => {
				const normalizedError = error ? {
					name: String(error.name || "Error"),
					code: error.code == null ? void 0 : String(error.code),
					message: String(error.message || error).slice(0, 320)
				} : void 0;
				if (normalizedError) {
					const signature = `${operation}:${normalizedError.code || normalizedError.message}`;
					const now = Date.now();
					if (now - (recentErrors.get(signature) || 0) < 6e4) return null;
					recentErrors.set(signature, now);
				}
				const record = {
					schema: 1,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					level,
					module: moduleName,
					operation,
					event,
					context: sanitize(context),
					...normalizedError ? { error: normalizedError } : {},
					...Number.isFinite(durationMs) ? { duration_ms: Number(durationMs.toFixed(3)) } : {}
				};
				(level === "error" ? sink.error : level === "warn" ? sink.warn : sink.info || sink.log).call(sink, `${FAIRY_LOG_PREFIX} ${JSON.stringify(record)}`);
				return record;
			};
			const start = () => clock();
			const metric = (operation, startedAt, context = {}, options = {}) => {
				const duration = clock() - startedAt;
				return duration < (options.thresholdMs || 0) ? null : emit("info", operation, "metric", context, void 0, duration);
			};
			const guard = (operation, callback, context = {}) => {
				const startedAt = start();
				try {
					const result = callback();
					metric(operation, startedAt, {
						...context,
						outcome: "success"
					});
					return result;
				} catch (error) {
					emit("error", operation, "failure", context, error);
					metric(operation, startedAt, {
						...context,
						outcome: "failure"
					});
					throw error;
				}
			};
			return {
				start,
				metric,
				guard,
				info: (operation, context) => emit("info", operation, "event", context),
				warn: (operation, context, error) => emit("warn", operation, "failure", context, error),
				error: (operation, error, context) => emit("error", operation, "failure", context, error)
			};
		}
		module.exports = {
			FAIRY_LOG_PREFIX,
			createFairyDiagnostics
		};
	}));

//#endregion
//#region src/client/constants.js
	var constants_exports = /* @__PURE__ */ __exportAll({
		DEFAULT: () => DEFAULT,
		HERO_PLACEHOLDERS: () => HERO_PLACEHOLDERS,
		MODE_ATTR: () => MODE_ATTR,
		POWER_MODE_ATTR: () => POWER_MODE_ATTR,
		POWER_TOGGLE_HEIGHT: () => 22,
		POWER_TOGGLE_WIDTH: () => 82,
		SETTINGS_NAMESPACE: () => SETTINGS_NAMESPACE,
		STYLE_ID: () => STYLE_ID,
		THEME_ATTR: () => THEME_ATTR
	});
	var SETTINGS_NAMESPACE, STYLE_ID, MODE_ATTR, POWER_MODE_ATTR, THEME_ATTR, POWER_TOGGLE_WIDTH, POWER_TOGGLE_HEIGHT, DEFAULT, HERO_PLACEHOLDERS;
	var init_constants = __esmMin((() => {
		SETTINGS_NAMESPACE = "fairy-visual";
		STYLE_ID = "dsh-fairy-visual-style";
		MODE_ATTR = "data-dsh-fairy-mode";
		POWER_MODE_ATTR = "data-dsh-fairy-power-mode";
		THEME_ATTR = "data-dsh-fairy-theme";
		POWER_TOGGLE_WIDTH = 82;
		POWER_TOGGLE_HEIGHT = 22;
		DEFAULT = {
			version: 2,
			enabled: true,
			theme: "dark",
			mascotVisible: true,
			mascotScale: 1,
			mascotAnimationSpeed: 1,
			powerMode: "normal",
			composerDockHeight: 132
		};
		HERO_PLACEHOLDERS = [
			"您拨打的用户正在空洞中。",
			"不要进入空洞。",
			"至少，不要\"独自\"进入空洞。",
			"世界全剧终，欢迎来到新艾利都。",
			"新艾利都永不落幕。",
			"遇到困难，请联系新艾利都治安局。",
			"我们能斩断罪恶，我们能劈开天空。",
			"我们能走出迷雾，我们能迈向真理……",
			"奇迹的起点",
			"新·艾利都日落时",
			"祝你好运。",
			"英雄不死于往昔",
			"拜托了，艾莲大人！",
			"目标确认，开始行动。",
			"Random Play营业中",
			"切勿独行",
			"内有恶犬",
			"早安，罗斯凯利法",
			"认真「记仇」中！",
			"骑士登场！（典藏版）"
		];
	}));

//#endregion
//#region src/client/comfort-detector.js
	function normalize(text) {
		return String(text || "").replace(/\s+/g, " ").trim();
	}
	function hasCue(text, cues) {
		return cues.some((cue) => cue.test(text));
	}
	function classifyComfortMessage(text) {
		const normalized = normalize(text);
		if (!normalized) return "hold";
		if (hasCue(normalized, COMFORT_SUPPRESS_CUES)) return "exit";
		if (hasCue(normalized, COMFORT_CUES)) return "trigger";
		if (hasCue(normalized, COMFORT_EXIT_CUES)) return "exit";
		return "hold";
	}
	function valueText(value) {
		if (typeof value === "string") return value;
		if (Array.isArray(value)) return value.map(valueText).filter(Boolean).join(" ");
		if (!value || typeof value !== "object") return "";
		return [
			value.text,
			value.content,
			value.value,
			value.message
		].map(valueText).filter(Boolean).join(" ");
	}
	function nodeText(node) {
		return (Array.isArray(node?.data?.blocks) ? node.data.blocks : []).map(valueText).concat(valueText(node?.data?.text), valueText(node?.data?.content), valueText(node?.data?.message), valueText(node?.data?.input)).join(" ");
	}
	function chatNode(nodes, key) {
		return nodes?.get?.(key) || nodes?.[key] || null;
	}
	function isUserNode(node) {
		return node?.kind === "user" || node?.data?.role === "user";
	}
	function deriveSessionComfort(snapshot) {
		const order = Array.from(snapshot?.chat?.order || []);
		const nodes = snapshot?.chat?.nodes;
		for (let index = order.length - 1; index >= 0; index -= 1) {
			const node = chatNode(nodes, order[index]);
			if (!isUserNode(node)) continue;
			const result = classifyComfortMessage(nodeText(node));
			if (result === "trigger") return true;
			if (result === "exit") return false;
		}
		return false;
	}
	var COMFORT_CUES, COMFORT_SUPPRESS_CUES, COMFORT_EXIT_CUES;
	var init_comfort_detector = __esmMin((() => {
		COMFORT_CUES = [
			/求安慰|安慰我|哄哄我|温柔一点|对我温柔|许愿精灵/,
			/难受|难过|伤心|委屈|孤独|寂寞|害怕|恐慌|焦虑|崩溃|绝望|失望|痛苦|心累|好累|疲惫|精疲力竭|压力好大|撑不住|受不了了|想哭|哭了|睡不着|不想活|想关闭自己|想把自己关机|想消失|被否定|否定我|被拒绝|被抛下/,
			/我不好|我很糟|我好糟|我被.*伤害|没人理解我|没有人理解我/,
			/\b(?:sad|upset|lonely|scared|afraid|anxious|panic(?:ked)?|depressed|overwhelmed|stressed|hurt|crying|cry|comfort me|be gentle)\b/i
		];
		COMFORT_SUPPRESS_CUES = [
			/(?:不用|不要|别|无需|不必).{0,8}(?:安慰|哄|温柔对待)/,
			/(?:只要|请).{0,8}(?:分析|方案|结论|下一步).{0,8}(?:不用|不要|别).{0,8}(?:安慰|哄)/,
			/\b(?:don't|do not|no need to)\s+(?:comfort|coddle|reassure)\b/i
		];
		COMFORT_EXIT_CUES = [
			/我好多了|好多了|没事了|没关系了|已经好了|不用安慰了|不需要安慰了|可以了|结束这个话题|换个话题|说点别的|回到正题|继续工作|切换会话|切换页面|打开新会话|新建会话/,
			/\b(?:i(?:'m| am) better|feel better|all good|no worries|never mind|change the subject|let's move on|back to work)\b/i,
			/帮我(?:写|改|查|解释|翻译|总结|实现)|我们聊聊代码|开始工作|下一个问题|换个问题|打开设置|怎么实现/,
			/\b(?:help me write|debug|explain|translate|summarize|next question|change topics?|let's work on|how do I implement)\b/i
		];
	}));

//#endregion
//#region src/client/utils.js
	var utils_exports = /* @__PURE__ */ __exportAll({
		deriveSessionActivity: () => deriveSessionActivity,
		syncDocumentMode: () => syncDocumentMode
	});
	function deriveSessionActivity(snapshot) {
		if (deriveSessionComfort(snapshot)) return "comforting";
		return snapshot?.running === true ? "thinking" : "normal";
	}
	function syncDocumentMode(snapshot) {
		const value = snapshot?.value || snapshot || {};
		if (snapshot?.status === "loading") return;
		const enabled = Boolean(value.enabled);
		const theme = value.theme === "light" ? "light" : "dark";
		const powerMode = value.powerMode === "low-power" ? "low-power" : "normal";
		const root = document.documentElement;
		if (enabled) {
			root.setAttribute("data-dsh-fairy-visual", "");
			root.setAttribute(THEME_ATTR, theme);
			root.setAttribute(MODE_ATTR, "hdd");
			root.setAttribute(POWER_MODE_ATTR, powerMode);
		} else {
			root.removeAttribute("data-dsh-fairy-visual");
			root.removeAttribute(THEME_ATTR);
			root.removeAttribute(MODE_ATTR);
			root.removeAttribute(POWER_MODE_ATTR);
		}
	}
	var init_utils = __esmMin((() => {
		init_constants();
		init_comfort_detector();
	}));

//#endregion
//#region src/client/style.js
	var style_exports = /* @__PURE__ */ __exportAll({ injectStyles: () => injectStyles });
	function injectStyles() {
		if (document.getElementById("dsh-fairy-visual-style")) return;
		const el = document.createElement("style");
		el.id = STYLE_ID;
		el.setAttribute("data-plugin", "dsh-fairy-visual");
		const cssSections = [];
		const appendSection = (section, css) => cssSections.push({
			section,
			css
		});
		appendSection("stage-and-mascot", `
html[data-dsh-fairy-visual],html[data-dsh-fairy-visual] body{color-scheme:dark}html[data-dsh-fairy-visual] body{background:#07101c!important;--dsw-alias-bg-base:#07101c!important;--dsw-alias-bg-layer-1:#0a1828!important;--dsw-alias-bg-layer-2:#0e243d!important;--dsw-alias-bg-layer-3:#143553!important;--dsw-alias-bg-module-platform:#0b1e34!important;--dsw-alias-bg-overlay:#102944!important;--dsw-alias-label-primary:#e8f2fa!important;--dsw-alias-label-secondary:#a8bac9!important;--dsw-alias-label-tertiary:#7f93a5!important;--dsw-alias-icon-primary:#d7e7f3!important;--dsw-alias-border-l1:rgba(126,220,255,.3)!important;--dsw-alias-border-l2:rgba(126,220,255,.2)!important;--dsw-alias-brand-primary:#62d4ff!important;--dsw-alias-button-primary-fill:#1688ce!important;--dsw-alias-button-primary-hover:#2aa9e8!important}
.dsh-hdd-background-host{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}.dsh-hdd-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden}.dsh-hdd-fx:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(100,210,255,.042) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(100,210,255,.042) 1.5px,transparent 1.5px);background-size:48px 48px;opacity:.7}.dsh-hdd-glow{position:absolute;height:85vh}.dsh-hdd-glow-a{width:219vmax;right:-114vmax;top:-28vh;background:radial-gradient(ellipse 56vmax 29vh at 46% 48%,rgba(96,212,255,.15),rgba(54,184,255,.075) 52%,transparent 100%)}.dsh-hdd-glow-b{width:207vmax;right:-86vmax;bottom:-14vh;background:radial-gradient(ellipse 53vmax 37vh at 55% 52%,rgba(157,132,255,.12),rgba(119,91,255,.06) 53%,transparent 100%)}.dsh-hdd-glow-c{width:210vmax;left:-108vmax;top:-24vh;background:radial-gradient(ellipse 50vmax 26vh at 54% 49%,rgba(174,112,255,.13),rgba(143,94,255,.065) 53%,transparent 100%)}
.dsh-fairy-stage{position:fixed;left:var(--dsh-fairy-left,280px);width:var(--dsh-fairy-width,calc(100vw - 280px));top:56px;height:48vh;z-index:10;pointer-events:none;display:flex;justify-content:center;align-items:flex-start;padding-top:10px;opacity:0;visibility:hidden;transform:scale(.94);transform-origin:center top;transition:opacity 280ms cubic-bezier(.7,0,.84,0),transform 340ms cubic-bezier(.7,0,.84,0),visibility 0s linear 340ms}.dsh-fairy-stage[data-visible=true]{opacity:1;visibility:visible;transform:scale(1);transition:opacity 460ms cubic-bezier(.16,1,.3,1),transform 520ms cubic-bezier(.16,1,.3,1),visibility 0s}.dsh-fairy-stage[hidden]{display:none}
@property --dsh-fairy-mask{syntax:"<number>";inherits:false;initial-value:0}.dsh-fairy-content-mask{--dsh-fairy-mask:0;-webkit-mask-image:radial-gradient(ellipse var(--dsh-fade-rx,165px) var(--dsh-fade-ry,155px) at var(--dsh-fade-x,50%) var(--dsh-fade-y,50%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .995)) 0%,rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .995)) var(--dsh-fade-core,75%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .88)) var(--dsh-fade-soft-1,82%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .62)) var(--dsh-fade-soft-2,90%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .28)) var(--dsh-fade-soft-3,96%),#000 100%);mask-image:radial-gradient(ellipse var(--dsh-fade-rx,165px) var(--dsh-fade-ry,155px) at var(--dsh-fade-x,50%) var(--dsh-fade-y,50%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .995)) 0%,rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .995)) var(--dsh-fade-core,75%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .88)) var(--dsh-fade-soft-1,82%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .62)) var(--dsh-fade-soft-2,90%),rgba(0,0,0,calc(1 - var(--dsh-fairy-mask) * .28)) var(--dsh-fade-soft-3,96%),#000 100%);transition:--dsh-fairy-mask 340ms cubic-bezier(.16,1,.3,1)}.dsh-fairy-content-fade{--dsh-fairy-mask:1}.dsh-fairy-toggle{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2);background:transparent;border-radius:999px;color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xs-strong-13,12px system-ui);cursor:pointer}.dsh-fairy-dot{width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-label-tertiary)}.dsh-fairy-toggle[data-on=true] .dsh-fairy-dot{background:#38bdf8;box-shadow:0 0 6px #38bdf8}.dsh-fairy-mark{display:none;align-items:center;gap:10px;border:0;background:transparent;color:inherit;cursor:pointer;padding:2px}.dsh-fairy-mark[data-enabled=true]{display:inline-flex}.dsh-fairy-mark:focus-visible{outline:2px solid #f4f7fb;outline-offset:3px;border-radius:4px}.dsh-fairy-mark[data-on=true] .dsh-fairy-mark-eye{filter:grayscale(1) brightness(.55)}.dsh-fairy-mark[data-on=true] .dsh-fairy-mark-copy{opacity:.55}.dsh-fairy-mark-eye{position:relative;isolation:isolate;width:38px;height:38px;flex:none;border:2px solid #c7cfdb;border-radius:50%;background:#2d45ee;box-sizing:border-box;transform-origin:center;transition:transform 260ms cubic-bezier(.16,1,.3,1)}@media (hover:hover){.dsh-fairy-mark:hover>.dsh-fairy-mark-eye{transform:scale(1.11)}}.dsh-fairy-mark:focus-visible>.dsh-fairy-mark-eye{transform:scale(1.11)}.dsh-fairy-mark-eye:before{content:'';position:absolute;z-index:1;inset:3px;border-radius:50%;background:radial-gradient(circle at 64% 66%,#f4f7fb 0 4px,transparent 4.5px),radial-gradient(circle at 50% 50%,#080b14 0 7px,transparent 7.5px),radial-gradient(circle at 50% 50%,#c7cfdb 0 10px,transparent 10.5px),radial-gradient(circle at 50% 50%,#0b1025 0 13px,transparent 13.5px)}.dsh-fairy-mark-brow{position:absolute;z-index:0;width:0;height:0;border-style:solid}.dsh-fairy-mark-brow[data-side=top]{top:1px;left:50%;border-width:0 7px 7px;border-color:transparent transparent #0b1025;transform:translateX(-50%)}.dsh-fairy-mark-brow[data-side=right]{top:50%;right:1px;border-width:7px 0 7px 7px;border-color:transparent transparent transparent #0b1025;transform:translateY(-50%)}.dsh-fairy-mark-brow[data-side=bottom]{bottom:1px;left:50%;border-width:7px 7px 0;border-color:#0b1025 transparent transparent;transform:translateX(-50%)}.dsh-fairy-mark-brow[data-side=left]{top:50%;left:1px;border-width:7px 7px 7px 0;border-color:transparent #0b1025 transparent transparent;transform:translateY(-50%)}.dsh-fairy-mark-copy{display:flex;flex-direction:column;align-items:flex-start;gap:5px;min-width:0;transform:translateY(1px)}.dsh-fairy-mark-title{color:#e8edf5;font-family:"Avenir Next","Arial Narrow","DIN Condensed","Microsoft YaHei",sans-serif;font-size:17px;font-weight:750;line-height:1;letter-spacing:.08em}.dsh-fairy-mark-sub{color:#93a2b6;font-family:var(--dsw-font-family);font-size:9px;font-weight:500;line-height:1;letter-spacing:.06em}@media(max-width:520px){.dsh-fairy-mark-copy{display:none}}`);
		appendSection("shared-surfaces", `.dsh-fairy-toggle-group{display:inline-flex;align-items:center;height:28px;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 72%,transparent);color:var(--dsw-alias-label-secondary);overflow:hidden}.dsh-fairy-toggle{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 9px 0 10px;border:0;background:transparent;color:inherit;font:var(--dsw-font-xs-strong-13,12px system-ui);cursor:pointer}.dsh-fairy-toggle:hover,.dsh-fairy-theme-toggle:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-fairy-toggle:active,.dsh-fairy-theme-toggle:active:not(:disabled){background:var(--dsw-alias-interactive-bg-active)}.dsh-fairy-toggle:focus-visible,.dsh-fairy-theme-toggle:focus-visible{position:relative;z-index:1;outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.dsh-fairy-theme-toggle{display:grid;place-items:center;width:30px;height:18px;padding:0;border:0;border-left:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}.dsh-fairy-theme-toggle:disabled{cursor:not-allowed;opacity:.35}.dsh-fairy-theme-icon{position:relative;display:block;width:13px;height:13px;box-sizing:border-box}.dsh-fairy-theme-toggle[data-theme="dark"] .dsh-fairy-theme-icon{width:11px;height:11px;border:1.7px solid currentColor;border-top-color:transparent;border-radius:50%;transform:rotate(-38deg)}.dsh-fairy-theme-toggle[data-theme="light"] .dsh-fairy-theme-icon{background:linear-gradient(currentColor,currentColor) center/13px 1px no-repeat,linear-gradient(currentColor,currentColor) center/1px 13px no-repeat,linear-gradient(45deg,transparent 46%,currentColor 46% 54%,transparent 54%),linear-gradient(-45deg,transparent 46%,currentColor 46% 54%,transparent 54%)}.dsh-fairy-theme-toggle[data-theme="light"] .dsh-fairy-theme-icon:before{content:'';position:absolute;left:3px;top:3px;width:7px;height:7px;border:1.5px solid currentColor;border-radius:50%;background:var(--dsw-alias-bg-layer-1);box-sizing:border-box}.dsh-fairy-dot{width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-label-tertiary)}.dsh-fairy-toggle[data-on=true] .dsh-fairy-dot{background:#38bdf8;box-shadow:0 0 6px #38bdf8}`);

		// Native deliverables use static light neutrals unless the host dark flag is set.
		// Scope to semantic presented-file markers; do not mutate host theme or file actions.
		appendSection("shared-surfaces", `html[data-dsh-fairy-visual] [data-presented-file]{--deliverable-fill:var(--dsw-alias-bg-layer-1,#0a1828);--deliverable-hover:var(--dsw-alias-bg-layer-2,#0e243d);background:var(--deliverable-fill)!important;color:var(--dsw-alias-label-primary,#e8f2fa)!important;border-color:var(--dsw-alias-border-l1,rgba(126,220,255,.3))!important}html[data-dsh-fairy-visual] [data-presented-file]:hover{background:var(--deliverable-hover)!important}html[data-dsh-fairy-visual] [data-presented-file]>span{background:var(--dsw-alias-bg-layer-2,#0e243d)!important}html[data-dsh-fairy-visual] [data-presented-file] [data-presented-description]:not([data-error=true]){color:var(--dsw-alias-label-secondary,#a8bac9)!important}html[data-dsh-fairy-visual] [data-presented-file] [data-open-target]{background:var(--dsw-alias-bg-layer-2,#0e243d)!important;border-color:var(--dsw-alias-border-l1,rgba(126,220,255,.3))!important}html[data-dsh-fairy-visual] [data-presented-file] [data-open-target] button{color:var(--dsw-alias-label-primary,#e8f2fa)!important;border-color:var(--dsw-alias-border-l1,rgba(126,220,255,.3))!important}html[data-dsh-fairy-visual] [data-presented-file] [data-open-target] button:hover:not(:disabled){background:var(--dsw-alias-bg-layer-3,#143553)!important}html[data-dsh-fairy-visual] [data-presented-file] button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#62d4ff)!important;outline-offset:-2px}html[data-dsh-fairy-visual] [data-presented-file] [data-open-target] button:disabled{opacity:.5}`);
		appendSection("shared-surfaces", `html[data-dsh-fairy-visual] .dsh-fairy-chat-content-anchored{display:flex!important;flex-direction:column!important;justify-content:flex-end!important;min-height:var(--dsh-fairy-chat-anchor-min-height)!important}`);
		// Command and option menus use native portal surfaces. Keep their dark
		// mode readable even when the host menu inherits a light translucent fill.
		appendSection("themes", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="listbox"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="menu"]{background:#0e243d!important;background-color:#0e243d!important;color:#e8f2fa!important;border-color:rgba(126,220,255,.24)!important;opacity:1!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="listbox"] [role="option"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="listbox"] button,html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="menu"] [role^="menuitem"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="menu"] button{color:#e8f2fa!important;opacity:1!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="listbox"] [role="option"]:hover,html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="listbox"] button:hover,html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="menu"] [role^="menuitem"]:hover,html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [role="menu"] button:hover{background:rgba(255,255,255,.10)!important;color:#ffffff!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] body{--dsw-specific-sidebar-fill:transparent!important;--dsw-specific-sidebar-nav-item-hover:#0e243d!important;--dsw-specific-sidebar-nav-item-active:#143553!important;--dsw-specific-sidebar-nav-item-active-accent:#267fc4!important;--dsw-specific-input-major:#0a1c30!important;--dsw-specific-menu:#0e243d!important;--dsw-specific-selector:#0e243d!important;--dsw-specific-bubble:#103052!important;--dsw-specific-tip:#0e243d!important;--dsw-alias-button-elevated-fill:#103052!important;--dsw-alias-button-floating-fill:#103052!important;--dsw-alias-button-floating-hover:#17456f!important;--dsw-alias-button-ghost-active-fill:#17456f!important;--dsw-alias-markdown-citation:#103052!important;--dsw-alias-markdown-code-block:#0a1c30!important;--dsw-alias-markdown-code-block-banner:#0a1c30!important;--dsw-alias-markdown-inline-code:#103052!important;--dsw-alias-markdown-tag:#103052!important;--dsw-alias-markdown-code-segment-selected:#103052!important;--dsw-alias-markdown-code-segment-unselected:#0a1c30!important;--dsw-alias-markdown-placeholder:#0e243d!important;--dsw-alias-scrollbar-bg-l2:#143553!important;--dsw-alias-scrollbar-hover-l2:#267fc4!important}html[data-dsh-fairy-visual] [data-composer-card="true"]{background:#0a1c30!important;border-color:rgba(126,220,255,.28)!important}html[data-dsh-fairy-visual] [data-composer-card="true"] textarea{color:#e8f8ff!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-seat="true"]{background:transparent!important;background-color:transparent!important;background-image:none!important}`);
		// Preserve the native composer layer (7), above Markdown sticky banners (6).
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{position:fixed!important;bottom:0!important;box-sizing:border-box!important;z-index:7!important;display:flex!important;flex-direction:column!important;min-width:0!important;max-width:none!important;padding:0!important;background:transparent!important;pointer-events:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-slot="conversation.composer.dock"]{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-bar-root="true"]{box-sizing:border-box!important;width:100%!important;max-width:none!important;height:100%!important;min-height:0!important;padding:0!important;align-items:stretch!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(176px,max-content) minmax(0,1fr) minmax(176px,max-content)!important;grid-template-rows:auto minmax(0,1fr)!important;align-items:stretch!important;gap:0 12px!important;width:100%!important;max-width:none!important;height:100%!important;min-height:0!important;margin:0!important;padding:10px 12px!important;border-radius:0!important;pointer-events:auto!important;overflow:hidden!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{grid-column:2!important;grid-row:2!important;min-width:0!important;min-height:0!important;height:auto!important;max-height:none!important;overflow-y:auto!important;overflow-x:hidden!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-accessory="true"]{grid-column:1 / -1!important;grid-row:1!important;min-width:0!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-row="true"]{display:contents!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-tools="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-trailing="true"]{display:contents!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-tools="true"]>*{grid-column:1!important;grid-row:2!important;align-self:end!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{grid-column:3!important;grid-row:2!important;align-self:end!important;justify-self:end!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-output-control="true"]{grid-column:3!important;grid-row:2!important;align-self:end!important;justify-self:end!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{grid-column:2!important;grid-row:2!important;align-self:end!important;justify-self:end!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] .dsh-fairy-composer-resizer{position:absolute;z-index:20;inset:0 0 auto;height:12px;cursor:ns-resize;pointer-events:auto;touch-action:none}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] .dsh-fairy-composer-resizer:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] .dsh-fairy-composer-resizer[data-dragging="true"]{cursor:grabbing}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] textarea{max-height:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"] *{min-width:0}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{grid-template-columns:minmax(132px,max-content) minmax(0,1fr) minmax(132px,max-content)!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{grid-template-columns:minmax(0,1fr)!important;grid-template-rows:minmax(0,1fr)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-accessory="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-tools="true"]>*:not([data-dsh-fairy-composer-send-control="true"]):not([data-dsh-fairy-composer-command-control="true"]),html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-output-control="true"]{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{grid-column:1!important;grid-row:1!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{justify-self:end!important;align-self:end!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{--dsh-composer-top-highlight:rgba(255,255,255,.13);--dsh-composer-top-face:rgba(255,255,255,.045);--dsh-composer-top-shade:rgba(0,0,0,.20);box-shadow:0 -7px 15px -11px rgba(0,0,0,.32),0 -22px 46px -20px rgba(0,0,0,.17)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]::before{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]::before{content:'';position:absolute;z-index:3;top:0;right:0;left:0;height:9px;pointer-events:none;background:linear-gradient(180deg,var(--dsh-composer-top-highlight) 0 .7px,var(--dsh-composer-top-face) 1.4px,var(--dsh-composer-top-shade) 2.6px,rgba(0,0,0,.07) 4px,transparent 9px)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"]{--dsh-composer-top-highlight:rgba(255,255,255,.62);--dsh-composer-top-face:rgba(255,255,255,.20);--dsh-composer-top-shade:rgba(58,68,78,.18);box-shadow:0 -7px 15px -11px rgba(49,58,67,.21),0 -24px 50px -20px rgba(58,68,78,.12)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]::before{background:linear-gradient(180deg,var(--dsh-composer-top-highlight) 0 .7px,var(--dsh-composer-top-face) 1.4px,var(--dsh-composer-top-shade) 2.6px,rgba(58,68,78,.055) 4px,transparent 9px)}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-stack="true"]{position:relative!important;display:block!important;width:100%!important;height:100%!important;min-height:0!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-chrome="true"]{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]{position:absolute!important;z-index:4!important;left:12px!important;top:8px!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;gap:1px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-bar-root="true"]{position:absolute!important;inset:0!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{min-height:0!important;max-height:100dvh!important;overflow:hidden!important;box-sizing:border-box!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-stack="true"]{overflow:hidden!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-bar-host="true"]{position:absolute!important;inset:0!important;display:block!important;width:auto!important;height:auto!important;min-width:0!important;min-height:0!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-bar-root="true"]{position:static!important;width:100%!important;height:100%!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]{width:max-content!important;height:auto!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-to-bottom-slot="true"]{bottom:var(--dsh-fairy-to-bottom-offset,12px)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-to-bottom-control="true"]:not([hidden]){position:fixed!important;top:auto!important;bottom:var(--dsh-fairy-to-bottom-bottom,12px)!important;z-index:30!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] [data-slot="sidebar.brand.mark"]{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-brand-anchor="true"]>svg{visibility:hidden!important}.dsh-fairy-brand-host{position:fixed;z-index:20;display:flex;align-items:center;height:42px;pointer-events:auto}.dsh-fairy-brand-host[hidden],.dsh-fairy-brand-host[data-positioned=false]{visibility:hidden;pointer-events:none}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-open-control="true"]{position:relative;isolation:isolate}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-open-control="true"]>svg,html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-open-control="true"] [data-slot="sidebar.brand.mark"]{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-open-control="true"]:before{content:'';position:absolute;z-index:1;left:50%;top:50%;width:22px;height:22px;border:1.5px solid currentColor;border-radius:50%;box-sizing:border-box;background:radial-gradient(circle at 64% 66%,currentColor 0 2.1px,transparent 2.5px),radial-gradient(circle at 50% 50%,#07101c 0 4.4px,transparent 4.8px),radial-gradient(circle at 50% 50%,currentColor 0 7px,transparent 7.4px),radial-gradient(circle at 50% 50%,#07101c 0 10px,transparent 10.4px);transform:translate(-50%,-50%);pointer-events:none}`);
		appendSection("shared-surfaces", `.dsh-fairy-mark{position:relative}.dsh-fairy-mark[data-glitch]{will-change:transform;transform:translate3d(var(--dsh-fairy-mark-g-x,0),0,0)}.dsh-fairy-mark-glitch-slice{position:absolute;inset:0;display:flex;align-items:center;gap:10px;pointer-events:none;opacity:0}.dsh-fairy-mark-glitch-slice .dsh-fairy-mark-eye,.dsh-fairy-mark-glitch-slice .dsh-fairy-mark-copy{flex:none}.dsh-fairy-mark[data-glitch=blocks] .dsh-fairy-mark-glitch-slice{will-change:transform,opacity;opacity:.62}.dsh-fairy-mark[data-glitch=blocks] .dsh-fairy-mark-glitch-slice[data-slice="1"]{transform:translate3d(var(--dsh-fairy-mark-s1-x,0),0,0);clip-path:inset(0 0 72% 0)}.dsh-fairy-mark[data-glitch=blocks] .dsh-fairy-mark-glitch-slice[data-slice="2"]{transform:translate3d(var(--dsh-fairy-mark-s2-x,0),0,0);clip-path:inset(35% 0 37% 0)}.dsh-fairy-mark[data-glitch=blocks] .dsh-fairy-mark-glitch-slice[data-slice="3"]{transform:translate3d(var(--dsh-fairy-mark-s3-x,0),0,0);clip-path:inset(74% 0 0 0)}.dsh-fairy-mark[data-glitch=threads] .dsh-fairy-mark-glitch-slice{will-change:transform,opacity;opacity:.5}.dsh-fairy-mark[data-glitch=threads] .dsh-fairy-mark-glitch-slice[data-slice="1"]{transform:translate3d(var(--dsh-fairy-mark-thread-x,0),0,0);clip-path:inset(13% 0 79% 0)}.dsh-fairy-mark[data-glitch=threads] .dsh-fairy-mark-glitch-slice[data-slice="2"]{transform:translate3d(var(--dsh-fairy-mark-thread-2-x,0),0,0);clip-path:inset(47% 0 46% 0)}.dsh-fairy-mark[data-glitch=threads] .dsh-fairy-mark-glitch-slice[data-slice="3"]{transform:translate3d(var(--dsh-fairy-mark-thread-3-x,0),0,0);clip-path:inset(80% 0 13% 0)}`);
		appendSection("hero", `.dsh-fairy-toggle{font-family:"Avenir Next","Arial Narrow","DIN Condensed","Microsoft YaHei",sans-serif;font-weight:750}.dsh-fairy-hero-toggle-host{position:fixed;z-index:20;pointer-events:auto}.dsh-fairy-hero-toggle-host[hidden]{display:none}html[data-dsh-fairy-visual] [data-phase="hero"] [data-conversation-scroll]{overflow:clip!important;overscroll-behavior:none}html[data-dsh-fairy-visual] [data-dsh-fairy-hero-native-copy="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-hero-native-copy="true"] *{visibility:hidden!important}`);
		appendSection("power", `.dsh-fairy-power-host{position:fixed;z-index:25;pointer-events:auto}.dsh-fairy-power-host[hidden]{display:none}.dsh-fairy-power-toggle{display:inline-flex;align-items:center;justify-content:center;gap:5px;width:82px;height:22px;padding:0;border:1px solid var(--dsw-alias-border-l2);background:transparent;border-radius:999px;color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xs-strong-13,11px system-ui);font-size:11px!important;line-height:14px!important;letter-spacing:.12em!important;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s}.dsh-fairy-power-toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsh-fairy-power-toggle:active{background:var(--dsw-alias-interactive-bg-active)}.dsh-fairy-power-toggle:focus-visible{outline:2px solid #38bdf8;outline-offset:2px}.dsh-fairy-power-dot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-label-tertiary);flex:none;transition:background .2s,box-shadow .2s}.dsh-fairy-power-toggle[data-on=true]{color:var(--dsw-alias-label-primary)}.dsh-fairy-power-toggle[data-on=true] .dsh-fairy-power-dot{background:#38bdf8;box-shadow:0 0 6px rgba(56,189,248,.85)}`);
		appendSection("transitions", `.dsh-hdd-mode-transition,.dsh-hdd-session-transition{position:fixed;inset:0;z-index:2147483000;overflow:hidden;pointer-events:none;contain:strict}.dsh-hdd-mode-transition>[data-dsh-transition-layer]{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;will-change:transform,clip-path,opacity}.dsh-hdd-mode-transition [data-dsh-transition-frame],.dsh-hdd-session-transition [data-dsh-transition-frame]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;pointer-events:none!important;user-select:none!important}.dsh-hdd-mode-transition [data-dsh-transition-frame] *,.dsh-hdd-session-transition [data-dsh-transition-frame] *{pointer-events:none!important}`);
		appendSection("shared-surfaces", `html[data-dsh-fairy-visual] [data-dsh-fairy-version-navigation="true"]{display:none!important}.dsh-fairy-session-metrics{position:relative;display:inline-flex;align-items:center;order:3;margin-left:16px}.dsh-fairy-session-metrics-button{height:28px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xs-strong-13,12px system-ui);cursor:pointer}.dsh-fairy-session-metrics-button:hover,.dsh-fairy-session-metrics-button[aria-expanded="true"]{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.dsh-fairy-session-metrics-button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.dsh-fairy-session-metrics-panel{position:absolute;z-index:30;right:0;top:calc(100% + 8px);width:min(280px,calc(100vw - 32px));padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,.18));color:var(--dsw-alias-label-secondary);font-size:12px;line-height:20px;white-space:normal;overflow-wrap:anywhere}.dsh-fairy-session-metrics-item{display:block;padding:3px 0}.dsh-fairy-session-metrics-item+.dsh-fairy-session-metrics-item{border-top:1px solid var(--dsw-alias-border-l2)}html[data-dsh-fairy-mode="hdd"] [data-dsh-fairy-header-session-agent-preset="true"]{display:none!important}@media(min-width:900px){html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"]>header{box-sizing:border-box;display:flex;align-items:center;height:44px;padding:8px 28px 8px 20px}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"]>header>[data-dsh-fairy-header-title-row="true"]{display:contents!important}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"] [data-dsh-fairy-header-title-cluster="true"]{flex:0 1 auto!important;min-width:0}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"] [data-dsh-fairy-header-utilities-shell="true"]{display:contents!important}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"] [data-dsh-fairy-header-actions-cluster="true"]{order:1;flex:0 1 auto;min-width:0;align-self:center}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"]>header>[role="tablist"]{order:2;flex:0 0 auto;width:auto;height:28px;margin:0 0 0 18px;padding:0;gap:18px;align-items:center;align-self:center}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"]>header>[role="tablist"]>[role="tab"]{height:28px;padding:0;line-height:28px}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"] [data-dsh-fairy-header-utilities-cluster="true"]{display:contents!important}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"] [data-dsh-fairy-header-session-log="true"]{order:4;flex:0 0 auto;margin-left:18px;align-self:center}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header"] .dsh-fairy-toggle-group{order:5;flex:0 0 auto;margin-left:auto;align-self:center}html[data-dsh-fairy-visual] body>#root>[data-slot="root"] [data-phase="active"] [data-slot="conversation.session.header.utilities"] button{box-sizing:border-box;height:28px;padding-top:4px;padding-bottom:4px}}`);
		appendSection("hero", `.dsh-fairy-hero-projection-svg{position:absolute;left:0;top:0;width:100%;height:220px;overflow:visible;pointer-events:none;font:inherit;letter-spacing:0}.dsh-fairy-hero-projection-text,.dsh-fairy-hero-mask-text{font:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;text-anchor:middle;dominant-baseline:alphabetic}.dsh-fairy-hero-mask-text{fill:#000!important;opacity:1!important}.dsh-fairy-hero-projection-text-1{fill:#c9dce9;opacity:.20}.dsh-fairy-hero-projection-text-2{fill:#a7c2d4;opacity:.14}.dsh-fairy-hero-projection-text-3{fill:#7f9fb8;opacity:.085}.dsh-fairy-hero-projection-text-4{fill:#5d82a0;opacity:.045}@media(max-width:520px){.dsh-fairy-hero-projection-svg{height:120px}.dsh-fairy-hero-projection-text{transform-origin:0 0}.dsh-fairy-hero-projection-text-1{y:38px;transform:matrix(1,0,0,-1,0,76)}.dsh-fairy-hero-projection-text-2{y:50px;transform:matrix(1,0,0,-1,0,100)}.dsh-fairy-hero-projection-text-3{y:66px;transform:matrix(1,0,0,-1,0,132)}.dsh-fairy-hero-projection-text-4{y:86px;transform:matrix(1,0,0,-1,0,172)}.dsh-fairy-hero-mask-text-1-for-2{y:62px}.dsh-fairy-hero-mask-text-1-for-3{y:94px}.dsh-fairy-hero-mask-text-2-for-3{y:82px}.dsh-fairy-hero-mask-text-1-for-4{y:134px}.dsh-fairy-hero-mask-text-2-for-4{y:122px}.dsh-fairy-hero-mask-text-3-for-4{y:106px}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-1{fill:#4f6d83}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-2{fill:#607f96}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-3{fill:#7895a9}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-4{fill:#93abb9}}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-1{fill:#4f6d83;opacity:.16}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-2{fill:#607f96;opacity:.105}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-3{fill:#7895a9;opacity:.065}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-projection-text-4{fill:#93abb9;opacity:.038}`);
		appendSection("hero", `.dsh-fairy-hero-native-headline{min-height:74px;visibility:visible!important;opacity:1;transition:opacity 460ms cubic-bezier(.16,1,.3,1),visibility 0s}.dsh-fairy-hero-native-headline.dsh-fairy-hero-native-headline-hidden{visibility:hidden!important;opacity:0;transition:opacity 280ms cubic-bezier(.7,0,.84,0),visibility 0s linear 280ms}.dsh-fairy-hero-host{position:fixed;z-index:0!important;top:clamp(96px,calc(90px + min(36vh,450px)),calc(100dvh - 220px));display:flex;flex-direction:column;align-items:center;gap:2px;width:max-content;max-width:none;pointer-events:none;transform:translateX(-50%);white-space:nowrap;opacity:0;visibility:hidden;transition:none!important}.dsh-fairy-hero-host[data-active=true]{opacity:1;visibility:visible;transition:none!important}.dsh-fairy-hero-main{position:relative;z-index:0;isolation:isolate;color:#f4f7fb;font-family:"Avenir Next","Arial Narrow","DIN Condensed","Microsoft YaHei",sans-serif;font-size:52px;font-weight:750;line-height:1;letter-spacing:0}.dsh-fairy-hero-sub{position:relative;display:flex;align-items:center;gap:44px;color:#aebbc9;font-family:var(--dsw-font-family);font-size:15px;font-weight:500;line-height:1}.dsh-fairy-hero-sub::before,.dsh-fairy-hero-sub::after{content:'';position:absolute;top:50%;width:240px;height:1px;background:currentColor;transform:translateY(-50%);pointer-events:none}.dsh-fairy-hero-sub::before{right:calc(100% + 12px)}.dsh-fairy-hero-sub::after{left:calc(100% + 12px)}.dsh-fairy-hero-sub-char{display:block}@media(max-width:520px){.dsh-fairy-hero-native-headline{min-height:45px}.dsh-fairy-hero-host{top:clamp(86px,calc(90px + min(31vh,324px)),calc(100dvh - 190px));gap:2px}.dsh-fairy-hero-main{font-size:30px}.dsh-fairy-hero-sub{gap:18px;font-size:12px}.dsh-fairy-hero-sub::before,.dsh-fairy-hero-sub::after{width:84px}.dsh-fairy-hero-sub::before{right:calc(100% + 7px)}.dsh-fairy-hero-sub::after{left:calc(100% + 7px)}}@media(prefers-reduced-motion:reduce){.dsh-fairy-hero-native-headline,.dsh-fairy-hero-host{transition:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] body{color-scheme:light}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] body{background:#f7fafc!important;--dsw-alias-bg-base:#f7fafc!important;--dsw-alias-bg-layer-1:#fff!important;--dsw-alias-bg-layer-2:#edf4f8!important;--dsw-alias-bg-layer-3:#dfebf3!important;--dsw-alias-bg-module-platform:#f3f7fa!important;--dsw-alias-bg-overlay:#fff!important;--dsw-alias-label-primary:#172531!important;--dsw-alias-label-secondary:#526675!important;--dsw-alias-label-tertiary:#748694!important;--dsw-alias-icon-primary:#263b4b!important;--dsw-alias-border-l1:rgba(32,111,149,.24)!important;--dsw-alias-border-l2:rgba(32,91,122,.14)!important;--dsw-alias-brand-primary:#1688ce!important;--dsw-alias-button-primary-fill:#1688ce!important;--dsw-alias-button-primary-hover:#0f78b8!important;--dsw-specific-sidebar-fill:#f3f7fa!important;--dsw-specific-sidebar-nav-item-hover:#e9f1f6!important;--dsw-specific-sidebar-nav-item-active:#dcebf5!important;--dsw-specific-sidebar-nav-item-active-accent:#1688ce!important;--dsw-specific-input-major:#fff!important;--dsw-specific-menu:#fff!important;--dsw-specific-selector:#fff!important;--dsw-specific-bubble:#e7f2f9!important;--dsw-specific-tip:#fff!important;--dsw-alias-button-elevated-fill:#fff!important;--dsw-alias-button-floating-fill:#fff!important;--dsw-alias-button-floating-hover:#e5f0f7!important;--dsw-alias-button-ghost-active-fill:#dcebf5!important;--dsw-alias-markdown-citation:#e7f2f9!important;--dsw-alias-markdown-code-block:#f0f5f8!important;--dsw-alias-markdown-code-block-banner:#e8f0f5!important;--dsw-alias-markdown-inline-code:#e7f2f9!important;--dsw-alias-markdown-tag:#e7f2f9!important;--dsw-alias-markdown-code-segment-selected:#e1edf5!important;--dsw-alias-markdown-code-segment-unselected:#f0f5f8!important;--dsw-alias-markdown-placeholder:#eaf1f5!important;--dsw-alias-scrollbar-bg-l2:#d2e0e9!important;--dsw-alias-scrollbar-hover-l2:#a8bfce!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-composer-card="true"]{background:#fff!important;border-color:rgba(32,111,149,.22)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-composer-card="true"] textarea{color:#172531!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-fx:before{background-image:linear-gradient(rgba(34,126,166,.055) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(34,126,166,.055) 1.5px,transparent 1.5px)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-a{background:radial-gradient(ellipse 56vmax 29vh at 46% 48%,rgba(48,180,229,.12),rgba(54,184,255,.055) 52%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-b{background:radial-gradient(ellipse 53vmax 37vh at 55% 52%,rgba(139,115,241,.09),rgba(119,91,255,.04) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-c{background:radial-gradient(ellipse 50vmax 26vh at 54% 49%,rgba(154,91,233,.085),rgba(143,94,255,.035) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-main{color:#172531}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-hero-sub{color:#607585}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-mark-title{color:#1b2b38}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-mark-sub{color:#667b8b}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-sidebar-open-control="true"]:before{background:radial-gradient(circle at 64% 66%,currentColor 0 2.1px,transparent 2.5px),radial-gradient(circle at 50% 50%,#f7fafc 0 4.4px,transparent 4.8px),radial-gradient(circle at 50% 50%,currentColor 0 7px,transparent 7.4px),radial-gradient(circle at 50% 50%,#f7fafc 0 10px,transparent 10.4px)}`);
		appendSection("shared-surfaces", `.dsh-fairy-toggle-group{box-sizing:border-box}`);
		appendSection("themes", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-fairy-mark[data-on=true] .dsh-fairy-mark-eye{filter:grayscale(1) brightness(.82) contrast(.9)}`);
		appendSection("themes", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .dsh-hdd-glow-a{background:radial-gradient(ellipse 56vmax 29vh at 46% 48%,rgba(96,212,255,.21),rgba(54,184,255,.105) 52%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .dsh-hdd-glow-b{background:radial-gradient(ellipse 53vmax 37vh at 55% 52%,rgba(157,132,255,.18),rgba(119,91,255,.09) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .dsh-hdd-glow-c{background:radial-gradient(ellipse 50vmax 26vh at 54% 49%,rgba(174,112,255,.19),rgba(143,94,255,.095) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-a{background:radial-gradient(ellipse 56vmax 29vh at 46% 48%,rgba(48,180,229,.17),rgba(54,184,255,.078) 52%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-b{background:radial-gradient(ellipse 53vmax 37vh at 55% 52%,rgba(139,115,241,.135),rgba(119,91,255,.062) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-c{background:radial-gradient(ellipse 50vmax 26vh at 54% 49%,rgba(154,91,233,.13),rgba(143,94,255,.058) 53%,transparent 100%)}`);
		appendSection("shared-surfaces", `.dsh-fairy-toggle-group .dsh-fairy-toggle{appearance:none;border-radius:999px 0 0 999px;box-shadow:none}.dsh-fairy-toggle-group .dsh-fairy-theme-toggle{position:relative;appearance:none;height:26px;border-left:0;border-radius:0 999px 999px 0;box-shadow:none}.dsh-fairy-toggle-group .dsh-fairy-theme-toggle:before{content:'';position:absolute;left:0;top:4px;bottom:4px;width:1px;background:var(--dsw-alias-border-l2);pointer-events:none}.dsh-fairy-toggle-group .dsh-fairy-toggle:active,.dsh-fairy-toggle-group .dsh-fairy-theme-toggle:active:not(:disabled){box-shadow:inset 0 1px 3px color-mix(in srgb,var(--dsw-alias-label-primary) 18%,transparent)}.dsh-fairy-toggle-group .dsh-fairy-toggle:focus-visible,.dsh-fairy-toggle-group .dsh-fairy-theme-toggle:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--dsw-alias-brand-primary)}`);
		appendSection("themes", `html[data-dsh-fairy-theme-transition]{view-transition-name:dsh-fairy-theme}@keyframes dsh-fairy-theme-out{to{opacity:0}}@keyframes dsh-fairy-theme-in{from{opacity:0}}::view-transition-group(dsh-fairy-theme){animation-duration:480ms}::view-transition-old(dsh-fairy-theme){animation:dsh-fairy-theme-out 400ms cubic-bezier(.4,0,1,1) both;mix-blend-mode:normal}::view-transition-new(dsh-fairy-theme){animation:dsh-fairy-theme-in 480ms cubic-bezier(0,0,.2,1) both;mix-blend-mode:normal}@media(prefers-reduced-motion:reduce){::view-transition-old(dsh-fairy-theme),::view-transition-new(dsh-fairy-theme){animation:none}}`);
		appendSection("transitions", `.dsh-fairy-theme-fade-transition{position:fixed;inset:0;z-index:2147482999;overflow:hidden;pointer-events:none;contain:strict}.dsh-fairy-theme-fade-transition>[data-dsh-transition-frame]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;pointer-events:none!important;user-select:none!important}.dsh-fairy-theme-fade-transition>[data-dsh-transition-frame] *{pointer-events:none!important;animation-play-state:paused!important}`);
		appendSection("stage-and-mascot", `.dsh-fairy-stage>[data-dsh-fairy-mascot-root="true"]{top:-20px}`);
		appendSection("hero", `html[data-dsh-fairy-visual] body,html[data-dsh-fairy-visual] body :where(*){font-weight:800!important}html[data-dsh-fairy-visual] body :where(pre,code,kbd,samp),html[data-dsh-fairy-visual] body :where(pre,code,kbd,samp) *{font-weight:400!important}html[data-dsh-fairy-visual] body :where(.dsh-fairy-hero-main,.dsh-fairy-mark-title,.dsh-fairy-toggle){font-weight:750!important}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar{width:12px!important;transition:opacity 180ms cubic-bezier(.22,.61,.36,1)}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar-thumb{width:6px!important}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar[data-idle="true"]{opacity:0;pointer-events:none;transition-timing-function:cubic-bezier(.4,0,.2,1)}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] body>#root{position:relative!important;z-index:1!important}html[data-dsh-fairy-visual] [data-dsh-fairy-background-surface="true"],html[data-dsh-fairy-visual] [data-slot="conversation"]>[data-phase],html[data-dsh-fairy-visual] [data-phase="hero"]{background:transparent!important;background-color:transparent!important;background-image:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-layer="true"]{position:relative!important;z-index:2!important;isolation:isolate!important;overflow:visible!important;width:100%!important;min-width:0!important;height:100%!important;border-right:0!important;background:transparent!important;background-color:transparent!important;background-image:none!important;--dsh-sidebar-ridge-width:10px;--dsh-sidebar-board-color:#3b4148;--dsh-sidebar-board-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.022) 0 .75px,transparent 1px),radial-gradient(circle at 2px 3px,rgba(0,0,0,.028) 0 .8px,transparent 1.1px),radial-gradient(ellipse 115% 48% at 18% 4%,rgba(255,255,255,.022),transparent 64%),linear-gradient(180deg,#3d434b 0%,#3a4047 52%,#373d44 100%);--dsh-sidebar-elevation-contact:rgba(0,0,0,.58);--dsh-sidebar-elevation-ambient:rgba(0,0,0,.48);--dsh-sidebar-ridge-contact:#3b434b;--dsh-sidebar-ridge-highlight:#5e6973;--dsh-sidebar-ridge-face:#4d5660;--dsh-sidebar-ridge-shade:#424b54;--dsh-sidebar-ridge-edge:#353d45;--dsh-sidebar-ridge-cast-left:rgba(0,0,0,.18);--dsh-sidebar-ridge-cast-right-contact:rgba(0,0,0,.44);--dsh-sidebar-ridge-cast-right-ambient:rgba(0,0,0,.24)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-sidebar-layer="true"]{--dsh-sidebar-board-color:#d9dde1;--dsh-sidebar-board-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.22) 0 .75px,transparent 1.1px),radial-gradient(circle at 2px 3px,rgba(64,74,84,.055) 0 .8px,transparent 1.1px),radial-gradient(ellipse 115% 48% at 18% 4%,rgba(255,255,255,.18),transparent 64%),linear-gradient(180deg,#dde1e5 0%,#d9dde1 52%,#d4d8dc 100%);--dsh-sidebar-elevation-contact:rgba(49,58,67,.28);--dsh-sidebar-elevation-ambient:rgba(58,68,78,.24);--dsh-sidebar-ridge-contact:#cbd1d6;--dsh-sidebar-ridge-highlight:#f8fafb;--dsh-sidebar-ridge-face:#d7dde1;--dsh-sidebar-ridge-edge:#bec5cb;--dsh-sidebar-ridge-cast-left:rgba(64,74,84,.10);--dsh-sidebar-ridge-cast-right-contact:rgba(49,58,67,.28);--dsh-sidebar-ridge-cast-right-ambient:rgba(49,58,67,.14)}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-layer="true"]::before{content:'';position:absolute;z-index:0;inset:0;pointer-events:none;background-color:var(--dsh-sidebar-board-color);background-image:var(--dsh-sidebar-board-image);background-size:5px 5px,9px 9px,100% 100%,100% 100%;background-position:0 0,1px 2px,0 0,0 0;background-repeat:repeat,repeat,no-repeat,no-repeat;clip-path:var(--dsh-sidebar-board-clip,inset(0));box-shadow:4px 0 10px -7px var(--dsh-sidebar-elevation-contact),16px 0 36px -22px var(--dsh-sidebar-elevation-ambient)}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-layer="true"]::after{content:'';position:absolute;z-index:5;top:0;right:0;bottom:0;width:var(--dsh-sidebar-ridge-width);pointer-events:none;border-radius:0;background:linear-gradient(90deg,var(--dsh-sidebar-ridge-contact) 0 1px,var(--dsh-sidebar-ridge-highlight) 1px 2px,var(--dsh-sidebar-ridge-face) 2px 8px,var(--dsh-sidebar-ridge-shade) 8px 9px,var(--dsh-sidebar-ridge-edge) 9px 10px);background-size:var(--dsh-sidebar-ridge-width) 100%;background-repeat:no-repeat;box-shadow:-2px 0 4px -1px var(--dsh-sidebar-ridge-cast-left),3px 0 6px -1px var(--dsh-sidebar-ridge-cast-right-contact),20px 0 52px -16px var(--dsh-sidebar-ridge-cast-right-ambient)}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]{position:relative!important;z-index:1!important;isolation:isolate!important;width:calc(100% - var(--dsh-sidebar-ridge-width))!important;background:transparent!important;background-color:transparent!important;background-image:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-collapsed-content="true"]{padding-left:5px!important;padding-right:5px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]>*{background:transparent!important;background-color:transparent!important;background-image:none!important}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-sidebar-layer="true"]{--dsh-sidebar-board-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.22) 0 .75px,transparent 1px),radial-gradient(circle at 2px 3px,rgba(64,74,84,.055) 0 .8px,transparent 1.1px),radial-gradient(ellipse 115% 48% at 18% 4%,rgba(255,255,255,.18),transparent 64%),linear-gradient(180deg,#dde1e5 0%,#d9dde1 52%,#d4d8dc 100%);--dsh-sidebar-ridge-face:#e6eaed;--dsh-sidebar-ridge-shade:#d7dde1}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] [data-dsh-fairy-history-surface="true"]{position:relative;box-sizing:border-box;margin-left:-4px!important;margin-right:-4px!important;border-radius:10px;overflow:hidden;isolation:isolate;background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-history-surface="true"]::after{content:'';position:absolute;z-index:3;inset:0;pointer-events:none;border-radius:10px;box-shadow:inset 0 0 7px -2px var(--dsh-history-cutout-contact),inset 7px 7px 16px -10px var(--dsh-history-cutout-shadow),inset -4px -4px 10px -7px var(--dsh-history-cutout-ambient)}html[data-dsh-fairy-visual] [data-dsh-fairy-history-fade="true"]{background:none!important;background-image:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-history-surface="true"] [role="tree"]{padding-left:8px!important;padding-right:6px!important;box-sizing:border-box!important;scrollbar-width:none!important;scrollbar-color:transparent transparent!important}html[data-dsh-fairy-visual] [data-slot="conversation"] [data-conversation-scroll],html[data-dsh-fairy-visual] [data-slot="conversation"] [data-input-scroll]{scrollbar-width:none!important;scrollbar-color:transparent transparent!important}html[data-dsh-fairy-visual] [data-dsh-fairy-history-surface="true"] [role="tree"]::-webkit-scrollbar,html[data-dsh-fairy-visual] [data-slot="conversation"] [data-conversation-scroll]::-webkit-scrollbar,html[data-dsh-fairy-visual] [data-slot="conversation"] [data-input-scroll]::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}html[data-dsh-fairy-visual] .dsh-hdd-scrollbar-layer{position:fixed;inset:0;z-index:4;pointer-events:none;overflow:visible}html[data-dsh-fairy-visual] .dsh-hdd-scrollbar-layer[hidden]{display:none!important}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar{position:fixed;z-index:4;width:10px;min-height:24px;opacity:.4;pointer-events:auto;cursor:default;touch-action:none;transition:opacity 140ms ease}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar[data-visible="false"]{display:none}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar[data-active="true"],html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar:hover{opacity:.68}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar-thumb{position:absolute;top:0;right:2px;width:5px;min-height:20px;border-radius:999px;background:rgba(225,232,238,.24);box-shadow:0 0 0 1px rgba(0,0,0,.06);cursor:grab}html[data-dsh-fairy-visual] .dsh-history-overlay-scrollbar-thumb:active{cursor:grabbing}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-history-overlay-scrollbar-thumb{background:rgba(52,63,73,.18);box-shadow:0 0 0 1px rgba(255,255,255,.16)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-history-surface="true"]{--dsh-history-cutout-contact:rgba(0,0,0,.52);--dsh-history-cutout-shadow:rgba(0,0,0,.84);--dsh-history-cutout-ambient:rgba(0,0,0,.36)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-history-surface="true"]{--dsh-history-cutout-contact:rgba(58,68,78,.26);--dsh-history-cutout-shadow:rgba(58,68,78,.56);--dsh-history-cutout-ambient:rgba(58,68,78,.20)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-history-surface="true"] [role="treeitem"]:hover:not([data-dsh-fairy-selected-session="true"]){background-color:rgba(255,255,255,.07)!important;box-shadow:0 2px 10px -7px rgba(255,255,255,.72),inset 0 0 0 1px rgba(255,255,255,.06)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-selected-session="true"]{background-color:var(--dsh-selected-fill)!important;background-image:none!important;border:0!important;box-shadow:none!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"]{--dsh-selected-fill:rgba(81,90,100,.58);--dsh-selected-text:#f4f7fb}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"]{--dsh-selected-fill:rgba(198,204,210,.58);--dsh-selected-text:#25313b}html[data-dsh-fairy-visual] [data-dsh-fairy-selected-session="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-selected-session="true"] *{color:var(--dsh-selected-text)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-active-folder="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-active-folder="true"] :is(svg,path){color:#c3c8cd!important}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] [data-dsh-fairy-native-new-session="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-brand-anchor="true"]{box-sizing:border-box!important;border-style:solid!important;border-width:2px!important;border-color:transparent!important;border-radius:8px!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%) border-box!important;color:#f4f7fb!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-brand-anchor="true"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-native-new-session="true"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-brand-anchor="true"]{background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;border-color:transparent!important;color:#293139!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-brand-anchor="true"]{background:transparent!important;border-color:transparent!important;box-shadow:none!important;visibility:hidden!important}html[data-dsh-fairy-visual] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{box-sizing:border-box!important;border-style:solid!important;border-width:2px!important;border-color:transparent!important;border-radius:8px!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#4b555e 0%,#454f58 48%,#30363b 100%) border-box!important;color:#eef1f4!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;border-color:transparent!important;color:#293139!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}html[data-dsh-fairy-visual] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"] *{background:transparent!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{margin-top:10px!important;margin-bottom:6px!important}`);
		appendSection("shared-surfaces", `html[data-dsh-fairy-visual] [data-dsh-fairy-active-folder="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-active-folder="true"] :is(svg,path){color:inherit!important}`);
		appendSection("themes", `html[data-dsh-fairy-visual] [data-dsh-fairy-native-new-session="true"],html[data-dsh-fairy-visual] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{--dsh-card-fill:#30353a;--dsh-card-grain-light:rgba(255,255,255,.055);--dsh-card-grain-dark:rgba(0,0,0,.038);--dsh-card-sheen-light:rgba(255,255,255,.028);--dsh-card-sheen-dark:rgba(0,0,0,.024);--dsh-card-border:linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%);background-image:radial-gradient(circle at 1px 1px,var(--dsh-card-grain-light) 0 .34px,transparent .68px),radial-gradient(circle at 2px 3px,var(--dsh-card-grain-dark) 0 .34px,transparent .72px),linear-gradient(135deg,var(--dsh-card-sheen-light),transparent 48%,var(--dsh-card-sheen-dark)),linear-gradient(var(--dsh-card-fill),var(--dsh-card-fill)),var(--dsh-card-border)!important;background-size:4px 4px,7px 7px,100% 100%,100% 100%,100% 100%;background-position:0 0,1px 2px,0 0,0 0,0 0;background-repeat:repeat,repeat,no-repeat,no-repeat,no-repeat;background-clip:padding-box,padding-box,padding-box,padding-box,border-box!important;background-origin:padding-box,padding-box,padding-box,padding-box,border-box!important;overflow:hidden!important}html[data-dsh-fairy-visual] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{--dsh-card-border:linear-gradient(135deg,#4b555e 0%,#454f58 48%,#30363b 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-native-new-session="true"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{--dsh-card-fill:#f4f5f6;--dsh-card-grain-light:rgba(255,255,255,.12);--dsh-card-grain-dark:rgba(74,87,98,.048);--dsh-card-sheen-light:rgba(255,255,255,.085);--dsh-card-sheen-dark:rgba(74,87,98,.032);--dsh-card-border:linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-native-new-session="true"]:is(:hover,:focus-visible),html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]:is(:hover,:focus-visible){--dsh-card-sheen-light:rgba(255,255,255,.13)}`);
		appendSection("themes", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .re-model-menu{color:#e8f2fa!important;background:#0e243d!important;border-color:rgba(126,220,255,.24)!important;box-shadow:0 12px 32px rgba(0,0,0,.42)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .re-model-menu :is(.re-model-row,.re-model-option,.re-model-back){color:#e8f2fa!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .re-model-menu :is(.re-model-row,.re-model-option,.re-model-back):hover{background:rgba(255,255,255,.10)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .re-model-menu :is(.re-model-group-title,.re-model-option-desc,.re-model-status){color:#a8bac9!important}`);
		appendSection("themes", `html[data-dsh-fairy-visual] [data-dsh-fairy-native-new-session="true"],html[data-dsh-fairy-visual] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{background-image:radial-gradient(circle at 1px 1px,var(--dsh-card-grain-light) 0 .34px,transparent .68px),radial-gradient(circle at 2px 3px,var(--dsh-card-grain-dark) 0 .34px,transparent .72px),linear-gradient(135deg,var(--dsh-card-sheen-light),transparent 48%,var(--dsh-card-sheen-dark)),linear-gradient(var(--dsh-card-fill),var(--dsh-card-fill)),var(--dsh-card-border)!important;background-size:4px 4px,7px 7px,100% 100%,100% 100%,100% 100%!important;background-position:0 0,1px 2px,0 0,0 0,0 0!important;background-repeat:repeat,repeat,no-repeat,no-repeat,no-repeat!important;background-clip:padding-box,padding-box,padding-box,padding-box,border-box!important;background-origin:padding-box,padding-box,padding-box,padding-box,border-box!important;overflow:hidden!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-native-new-session="true"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{background-image:radial-gradient(circle at 1px 1px,var(--dsh-card-grain-light) 0 .34px,transparent .68px),radial-gradient(circle at 2px 3px,var(--dsh-card-grain-dark) 0 .34px,transparent .72px),linear-gradient(135deg,var(--dsh-card-sheen-light),transparent 48%,var(--dsh-card-sheen-dark)),linear-gradient(var(--dsh-card-fill),var(--dsh-card-fill)),var(--dsh-card-border)!important;background-size:4px 4px,7px 7px,100% 100%,100% 100%,100% 100%!important;background-position:0 0,1px 2px,0 0,0 0,0 0!important;background-repeat:repeat,repeat,no-repeat,no-repeat,no-repeat!important;background-clip:padding-box,padding-box,padding-box,padding-box,border-box!important;background-origin:padding-box,padding-box,padding-box,padding-box,border-box!important;overflow:hidden!important}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]{width:calc(100% - 4px)!important;min-width:0!important;height:62px!important;min-height:62px!important;margin:10px 2px 6px!important;padding:6px 10px 7px!important;display:grid!important;grid-template-columns:max-content max-content max-content max-content!important;grid-template-rows:1fr 1fr!important;column-gap:0!important;row-gap:2px!important;justify-content:space-between!important;align-items:center!important;clip-path:none!important;-webkit-mask-image:none!important;mask-image:none!important;border-radius:8px!important;position:relative!important;top:4px!important;z-index:3!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div{min-width:0!important;box-sizing:border-box!important;align-items:baseline!important;white-space:nowrap!important;line-height:15px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(1),html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(2){display:contents!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(1)>:first-child{grid-column:1!important;grid-row:1!important;justify-self:start!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(1)>:last-child{grid-column:2!important;grid-row:1!important;justify-self:start!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(2)>:first-child{grid-column:3!important;grid-row:1!important;justify-self:start!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(2)>:last-child{grid-column:4!important;grid-row:1!important;justify-self:start!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(3){display:grid!important;grid-template-columns:max-content max-content!important;column-gap:0!important;justify-content:space-between!important;grid-column:1 / span 2!important;grid-row:2!important;width:100%!important;max-width:100%!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(3)> :last-child{justify-self:end!important;text-align:right!important}`);
		appendSection("sidebar", `html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-content="true"]:not([data-dsh-fairy-sidebar-collapsed-content="true"]) [data-slot="sidebar.footer.action"] [aria-label^="DeepSeek 余额"]>div:nth-child(3){contain:inline-size!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{box-sizing:border-box!important;margin-left:-20px!important;margin-right:-20px!important;border:0!important;border-color:transparent!important;border-radius:10px!important;background:transparent!important;background-color:transparent!important;background-image:none!important;overflow-x:hidden!important;overflow-y:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"][data-dragging="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"][data-dragging="true"] *{transition:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-workspace="true"]{pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-workspace="true"] button{pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-workspace-projection="true"]{opacity:.46!important;filter:grayscale(1)!important;pointer-events:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-workspace-projection="true"] button{pointer-events:none!important;cursor:not-allowed!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-mode-pending="true"]{visibility:hidden!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-tools="true"]>*:nth-child(1){justify-self:start!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-tools="true"]>*:nth-child(2){justify-self:end!important;margin-right:16px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-stack="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{overflow:visible!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{border-color:transparent!important;background:transparent!important;background-color:transparent!important;background-image:none!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{background:transparent!important;border-color:transparent!important;isolation:isolate!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{position:absolute!important;z-index:0!important;top:-10px!important;right:-12px!important;bottom:-10px!important;left:-12px!important;width:calc(100% + 24px)!important;height:calc(100% + 20px)!important;pointer-events:none!important;overflow:visible!important;--dsh-composer-polymer:#30363d;--dsh-composer-polymer-light:rgba(255,255,255,.045);--dsh-composer-polymer-dark:rgba(0,0,0,.11);--dsh-composer-edge-light:rgba(255,255,255,.18);--dsh-composer-edge-dark:rgba(0,0,0,.42);--dsh-composer-hole-radius:10px}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{--dsh-composer-polymer:#c9cfd4;--dsh-composer-polymer-light:rgba(255,255,255,.42);--dsh-composer-polymer-dark:rgba(70,80,90,.12);--dsh-composer-edge-light:rgba(255,255,255,.78);--dsh-composer-edge-dark:rgba(70,80,90,.27)}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material-face]{position:absolute!important;box-sizing:border-box!important;background-color:var(--dsh-composer-polymer)!important;background-image:radial-gradient(circle at 1px 1px,var(--dsh-composer-polymer-light) 0 .32px,transparent .72px),radial-gradient(circle at 2px 3px,var(--dsh-composer-polymer-dark) 0 .34px,transparent .76px),linear-gradient(135deg,rgba(255,255,255,.035),transparent 46%,rgba(0,0,0,.055))!important;background-size:5px 5px,7px 7px,100% 100%!important;background-position:0 0,1px 2px,0 0!important;background-repeat:repeat,repeat,no-repeat!important;overflow:hidden!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material-face="top"]{left:0!important;right:0!important;top:0!important;height:var(--dsh-fairy-composer-hole-top)!important;border-bottom-left-radius:var(--dsh-composer-hole-radius)!important;border-bottom-right-radius:var(--dsh-composer-hole-radius)!important;box-shadow:0 -8px 18px -13px var(--dsh-composer-edge-light),0 5px 12px -9px var(--dsh-composer-edge-dark),inset 0 1px 0 var(--dsh-composer-edge-light)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material-face="left"]{left:0!important;top:var(--dsh-fairy-composer-hole-top)!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-bottom))!important;width:var(--dsh-fairy-composer-hole-left)!important;border-top-right-radius:var(--dsh-composer-hole-radius)!important;border-bottom-right-radius:var(--dsh-composer-hole-radius)!important;box-shadow:inset 0 1px 0 var(--dsh-composer-edge-light),inset -7px 0 13px -11px var(--dsh-composer-edge-dark)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material-face="right"]{right:0!important;top:var(--dsh-fairy-composer-hole-top)!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-bottom))!important;left:var(--dsh-fairy-composer-hole-right)!important;border-top-left-radius:var(--dsh-composer-hole-radius)!important;border-bottom-left-radius:var(--dsh-composer-hole-radius)!important;box-shadow:inset 1px 0 0 var(--dsh-composer-edge-light),inset 7px 0 13px -11px var(--dsh-composer-edge-dark)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material-face="bottom"]{left:0!important;right:0!important;bottom:0!important;top:var(--dsh-fairy-composer-hole-bottom)!important;border-top-left-radius:var(--dsh-composer-hole-radius)!important;border-top-right-radius:var(--dsh-composer-hole-radius)!important;box-shadow:inset 0 -1px 0 var(--dsh-composer-edge-dark),0 8px 20px -13px var(--dsh-composer-edge-dark)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]>:not([data-dsh-fairy-composer-material="true"]){z-index:1!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{position:relative!important;z-index:2!important;border:0!important;background:transparent!important;border-radius:10px!important;box-shadow:none!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{display:block!important;overflow:visible!important;filter:none!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{filter:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material-face="continuous"]{position:static!important;width:100%!important;height:100%!important;display:block!important;stroke:none!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{--dsh-composer-polymer:#3b4148!important;--dsh-composer-polymer-light:rgba(255,255,255,.06)!important;--dsh-composer-polymer-dark:rgba(0,0,0,.07)!important;--dsh-composer-polymer-stripe:rgba(0,0,0,.16)!important;--dsh-composer-sheen-light:rgba(255,255,255,.07)!important;--dsh-composer-sheen-dark:rgba(0,0,0,.09)!important;--dsh-composer-ambient-light:rgba(255,255,255,.055)!important;--dsh-composer-ambient-dark:rgba(0,0,0,.045)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{--dsh-composer-polymer:#d9dde1!important;--dsh-composer-polymer-light:rgba(255,255,255,.18)!important;--dsh-composer-polymer-dark:rgba(64,74,84,.065)!important;--dsh-composer-polymer-stripe:rgba(255,255,255,.42)!important;--dsh-composer-sheen-light:rgba(255,255,255,.18)!important;--dsh-composer-sheen-dark:rgba(64,74,84,.09)!important;--dsh-composer-ambient-light:rgba(255,255,255,.20)!important;--dsh-composer-ambient-dark:rgba(64,74,84,.055)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{position:relative!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-control="true"]{position:absolute!important;z-index:6!important;left:12px!important;top:35px!important;width:176px!important;min-width:0!important;display:flex!important;align-items:stretch!important;margin:0!important;padding:0!important;pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-control="true"]>*{pointer-events:auto!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-control="true"]{width:132px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-control="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-native-model-control="true"]{display:none!important;position:absolute!important;grid-column:auto!important;grid-row:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{position:absolute!important;z-index:30!important;left:auto!important;right:242px!important;top:auto!important;bottom:13px!important;width:176px!important;min-width:0!important;max-width:176px!important;height:28px!important;min-height:0!important;max-height:28px!important;margin:0!important;padding:0!important;display:block!important;grid-column:auto!important;grid-row:auto!important;align-self:auto!important;justify-self:auto!important;pointer-events:auto!important;overflow:visible!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] *{pointer-events:auto!important;min-width:0!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{right:198px!important;width:132px!important;max-width:132px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]{left:0!important;top:0!important;width:176px!important;height:122px!important;display:block!important;pointer-events:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"]{position:absolute!important;left:12px!important;width:max-content!important;max-width:152px!important;margin:0!important;pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace-control="true"]{top:10px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"]{top:52px!important;height:28px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"]>button{width:max-content!important;max-width:152px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-access-control="true"]{position:absolute!important;z-index:6!important;grid-column:1 / -1!important;grid-row:1 / -1!important;left:-1px!important;top:83px!important;margin:0!important;align-self:auto!important;justify-self:auto!important;pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"]{position:absolute!important;z-index:9!important;grid-column:1 / -1!important;grid-row:1 / -1!important;left:179px!important;top:auto!important;bottom:3px!important;margin:0!important;align-self:auto!important;justify-self:auto!important;pointer-events:auto!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]{width:132px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"]>button{max-width:108px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"]{left:135px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-access-control="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{position:absolute!important;z-index:10!important;grid-column:1 / -1!important;grid-row:1 / -1!important;left:auto!important;right:176px!important;top:auto!important;bottom:6px!important;width:28px!important;min-width:28px!important;max-width:28px!important;height:28px!important;min-height:28px!important;max-height:28px!important;margin:0!important;padding:0!important;align-self:auto!important;justify-self:auto!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{right:132px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{margin-left:-8px!important;margin-right:-8px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{right:0!important}}`);
		appendSection("shared-surfaces", `html[data-dsh-fairy-selection-lock="true"],html[data-dsh-fairy-selection-lock="true"] *{user-select:none!important;-webkit-user-select:none!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-input-side:176px;--dsh-fairy-input-control-size:28px;--dsh-fairy-input-control-inset:8px;--dsh-fairy-input-control-gap:4px;--dsh-fairy-reasoning-gap:4px}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-context-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{position:absolute!important;z-index:9!important;grid-column:1 / -1!important;grid-row:1 / -1!important;top:auto!important;bottom:6px!important;height:var(--dsh-fairy-input-control-size)!important;min-height:var(--dsh-fairy-input-control-size)!important;max-height:var(--dsh-fairy-input-control-size)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"]{left:var(--dsh-fairy-input-side)!important;right:auto!important;width:var(--dsh-fairy-input-control-size)!important;min-width:var(--dsh-fairy-input-control-size)!important;max-width:var(--dsh-fairy-input-control-size)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{left:auto!important;right:var(--dsh-fairy-input-side)!important;width:var(--dsh-fairy-input-control-size)!important;min-width:var(--dsh-fairy-input-control-size)!important;max-width:var(--dsh-fairy-input-control-size)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-context-control="true"]{left:auto!important;right:calc(var(--dsh-fairy-input-side) + var(--dsh-fairy-input-control-size) + var(--dsh-fairy-input-control-gap))!important;width:var(--dsh-fairy-input-control-size)!important;min-width:var(--dsh-fairy-input-control-size)!important;max-width:var(--dsh-fairy-input-control-size)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{left:auto!important;right:calc(var(--dsh-fairy-input-side) + (var(--dsh-fairy-input-control-size) * 2) + var(--dsh-fairy-input-control-gap) + var(--dsh-fairy-reasoning-gap))!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-input-side:132px}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-input-side:0px}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{bottom:var(--dsh-fairy-input-control-inset)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{bottom:calc(var(--dsh-fairy-input-control-inset) - 2px)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{right:calc(var(--dsh-fairy-input-side) + (var(--dsh-fairy-input-control-size) * 2) + var(--dsh-fairy-input-control-gap) + var(--dsh-fairy-reasoning-gap))!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{z-index:30!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-stack="true"][data-dsh-fairy-model-menu-open="true"]{z-index:21!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"][data-dsh-fairy-model-menu-open="true"]{z-index:21!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-input-control-gap:4px;--dsh-fairy-reasoning-gap:4px}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-name,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-effort,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-chevron{opacity:.72!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-trigger{width:100%!important;max-width:none!important;justify-content:flex-end!important;text-align:right!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-trigger{gap:8px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-chevron{margin-left:0!important;margin-right:0!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{width:220px!important;max-width:220px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"] .re-model-name{min-width:0!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{width:200px!important;max-width:200px!important}}@media(max-width:760px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{width:176px!important;max-width:176px!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{box-shadow:inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13),-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{position:absolute!important;z-index:12!important;left:0!important;right:0!important;top:25px!important;width:100%!important;height:20px!important;min-width:0!important;box-sizing:border-box!important;display:block!important;padding:2px 7px!important;border:2px solid transparent!important;border-radius:999px!important;background:linear-gradient(var(--dsh-card-fill,#30353a),var(--dsh-card-fill,#30353a)) padding-box,var(--dsh-card-border,linear-gradient(135deg,#555f68,#3d444b)) border-box!important;box-shadow:inset 1px 1px 0 var(--dsh-card-sheen-light,rgba(255,255,255,.04)),inset -1px -1px 0 var(--dsh-card-sheen-dark,rgba(0,0,0,.14)),2px 3px 8px rgba(0,0,0,.18)!important;pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]{--dsh-fairy-scale:100%;appearance:none!important;-webkit-appearance:none!important;display:block!important;width:100%!important;height:12px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;cursor:pointer!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-runnable-track{height:3px;border-radius:999px;background:linear-gradient(to right,var(--dsw-alias-label-secondary) 0 var(--dsh-fairy-scale),var(--dsw-alias-border-l2) var(--dsh-fairy-scale) 100%)}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;margin-top:-3.5px;border:2px solid var(--dsh-card-fill,#30353a);border-radius:50%;background:var(--dsw-alias-label-secondary);box-shadow:0 0 0 1px var(--dsw-alias-border-l2)}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]:focus-visible{outline:none}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 2px var(--dsw-alias-brand-primary)}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-track{height:3px;border:0;border-radius:999px;background:var(--dsw-alias-border-l2)}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-progress{height:3px;border-radius:999px;background:var(--dsw-alias-label-secondary)}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-thumb{width:8px;height:8px;border:2px solid var(--dsh-card-fill,#30353a);border-radius:50%;background:var(--dsw-alias-label-secondary);box-shadow:0 0 0 1px var(--dsw-alias-border-l2)}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-control="true"]:focus-within{box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary) 35%,transparent),inset 1px 1px 0 var(--dsh-card-sheen-light,rgba(255,255,255,.04)),inset -1px -1px 0 var(--dsh-card-sheen-dark,rgba(0,0,0,.14)),2px 3px 8px rgba(0,0,0,.18)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-mascot-scale-control="true"]{box-shadow:inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08),2px 3px 8px rgba(52,63,73,.10)!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{top:25px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-control="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{position:absolute!important;z-index:11!important;right:0!important;top:33px!important;bottom:auto!important;left:auto!important;width:152px!important;height:28px!important;min-width:152px!important;max-width:152px!important;min-height:28px!important;max-height:28px!important;box-sizing:border-box!important;border:2px solid transparent!important;border-radius:999px!important;pointer-events:none!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{right:-2px!important;width:108px!important;min-width:108px!important;max-width:108px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-base="true"]{position:absolute!important;z-index:11!important;right:0!important;top:65px!important;bottom:auto!important;left:auto!important;width:152px!important;height:28px!important;min-width:152px!important;max-width:152px!important;min-height:28px!important;max-height:28px!important;box-sizing:border-box!important;padding:0!important;border:2px solid transparent!important;border-radius:999px!important;pointer-events:none!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-base="true"]{background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{position:absolute!important;inset:5px!important;box-sizing:border-box!important;border-radius:999px!important;background:linear-gradient(#30353a,#30353a)!important;box-shadow:inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{background:linear-gradient(#f4f5f6,#f4f5f6)!important;box-shadow:inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-base="true"]{right:-2px!important;width:108px!important;min-width:108px!important;max-width:108px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-animation-speed-base="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-animation-speed-control="true"]{display:block!important;overflow:visible!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-tick]{position:absolute!important;top:50%!important;width:5px!important;height:5px!important;margin:0!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:50%!important;background:#69747c!important;box-shadow:inset 0 1px 1px rgba(0,0,0,.32),0 1px 1px rgba(255,255,255,.04)!important;transform:translate(-50%,-50%)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-tick="0.5"]{left:6px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-tick="1"]{left:50%!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-tick="2"]{left:calc(100% - 6px)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{position:absolute!important;z-index:2!important;top:50%!important;left:50%!important;width:12px!important;height:12px!important;margin:0!important;border:2px solid rgba(255,255,255,.72)!important;border-radius:50%!important;background:radial-gradient(circle at 28% 28%,rgba(255,255,255,.78) 0 9%,transparent 30%),radial-gradient(circle at 72% 68%,rgba(196,113,231,.96) 0 13%,transparent 48%),radial-gradient(circle at 28% 70%,rgba(103,176,243,.96) 0 15%,transparent 52%),radial-gradient(circle at 66% 25%,rgba(247,142,194,.94) 0 16%,transparent 54%),linear-gradient(135deg,#8fcfff 0%,#b997ed 48%,#efa5cc 100%)!important;box-shadow:0 0 0 1px rgba(95,80,150,.30),0 1px 3px rgba(44,49,74,.28),inset 0 1px 1px rgba(255,255,255,.48),inset 0 -1px 1px rgba(70,49,105,.22)!important;transform:translate(-50%,-50%)!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{inset:5px!important}}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-tick]{border-color:rgba(52,63,73,.20)!important;background:#aeb6bc!important;box-shadow:inset 0 1px 1px rgba(255,255,255,.58),0 1px 1px rgba(52,63,73,.10)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{border-color:rgba(255,255,255,.82)!important;background:radial-gradient(circle at 28% 28%,rgba(255,255,255,.68) 0 9%,transparent 30%),radial-gradient(circle at 72% 68%,rgba(190,104,224,.98) 0 13%,transparent 48%),radial-gradient(circle at 28% 70%,rgba(88,157,231,.96) 0 15%,transparent 52%),radial-gradient(circle at 66% 25%,rgba(241,126,187,.96) 0 16%,transparent 54%),linear-gradient(135deg,#8bc9f4 0%,#ae91e2 48%,#eca3c9 100%)!important;box-shadow:0 0 0 1px rgba(95,80,150,.24),0 1px 3px rgba(52,63,73,.18),inset 0 1px 1px rgba(255,255,255,.48),inset 0 -1px 1px rgba(70,49,105,.16)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{position:absolute!important;z-index:11!important;right:12px!important;top:var(--dsh-fairy-composer-hole-contact-top,10px)!important;bottom:auto!important;left:auto!important;width:152px!important;height:28px!important;min-width:152px!important;max-width:152px!important;min-height:28px!important;max-height:28px!important;margin:0!important;padding:2px 6px!important;display:flex!important;align-items:center!important;gap:3px!important;box-sizing:border-box!important;border:1px solid rgba(30,39,48,.16)!important;border-radius:999px!important;background:#fff!important;color:#25313b!important;box-shadow:inset 1px 1px 0 rgba(255,255,255,.78),inset -1px -1px 0 rgba(30,39,48,.10),2px 3px 8px rgba(30,39,48,.12)!important;overflow:visible!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-auto-control="true"]{position:relative!important;z-index:3!important;width:16px!important;height:16px!important;min-width:16px!important;padding:0!important;border:0!important;border-radius:50%!important;background:transparent!important;color:inherit!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-auto-dot="true"]{display:block!important;width:8px!important;height:8px!important;border-radius:50%!important;background:#d4d8dc!important;box-shadow:inset 0 1px 1px rgba(0,0,0,.12)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-auto-control="true"][data-on="true"] [data-dsh-fairy-auto-dot="true"]{background:#e24b4b!important;box-shadow:0 0 0 2px rgba(226,75,75,.12),inset 0 1px 1px rgba(255,255,255,.24)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-waveform="true"]{display:flex!important;position:relative!important;z-index:1!important;height:18px!important;padding:0 3px!important;gap:1px!important;color:#26343e!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-wave-bar="true"]{width:2px!important;min-width:2px!important;background:currentColor!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-volume-input="true"]{position:absolute!important;z-index:2!important;left:22px!important;right:3px!important;top:0!important;width:auto!important;height:100%!important;margin:0!important;opacity:0!important;cursor:pointer!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [role="tooltip"]{transform:translateY(11px)!important;font-size:11px!important;font-weight:650!important;line-height:16px!important;padding:2px 6px!important;border:1px solid #c1c8ce!important;border-radius:999px!important;background:#f4f5f6!important;color:#293139!important;box-shadow:-3px -3px 7px rgba(255,255,255,.46),4px 5px 10px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{border-color:transparent!important;background:#30353a!important;color:#f1f6fa!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [role="tooltip"]{border-color:#555f68!important;background:#30353a!important;color:#f1f6fa!important;box-shadow:-3px -3px 7px rgba(255,255,255,.06),4px 5px 10px rgba(0,0,0,.16),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-wave-bar="true"]{--dsh-fairy-wave-opacity:.72!important;color:#f1f6fa!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-wave-bar="true"][data-active="true"]{--dsh-fairy-wave-opacity:1!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-auto-dot="true"]{background:#e9f0f5!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-on="true"] [data-dsh-fairy-auto-dot="true"]{background:#e24b4b!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-voice-control="true"]{right:10px!important;width:108px!important;min-width:108px!important;max-width:108px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-voice-control="true"]{right:8px!important;top:10px!important;bottom:auto!important;width:116px!important;min-width:116px!important;max-width:116px!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{pointer-events:auto!important;touch-action:none!important;cursor:grab!important;user-select:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"][data-dragging="true"]{cursor:grabbing!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{transition:left 180ms cubic-bezier(.2,.8,.2,1),transform 120ms ease,box-shadow 120ms ease!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"][data-dragging="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{transition:left 40ms linear,transform 80ms ease!important;transform:translate(-50%,-50%) scale(1.12)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-position="0"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{left:6px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-position="0.5"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{left:50%!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-position="1"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{left:calc(100% - 6px)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-animation-speed-tick="0.5"],html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-animation-speed-tick="2"]{display:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-animation-speed-tick="0.7"]{left:6px!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-animation-speed-tick="1.5"]{left:calc(100% - 6px)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{background:linear-gradient(#30353a,#30353a)!important;box-shadow:inset 0 1px 2px rgba(255,255,255,.12),inset 0 -1px 2px rgba(0,0,0,.42)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{background:linear-gradient(#f4f5f6,#f4f5f6)!important;box-shadow:inset 0 1px 2px rgba(255,255,255,.52),inset 0 -1px 2px rgba(52,63,73,.22)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-wave-bar="true"]{width:2px!important;min-width:0!important;max-width:2px!important;flex:1 1 2px!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{--dsh-card-fill:#30353a;--dsh-card-grain-light:rgba(255,255,255,.055);--dsh-card-grain-dark:rgba(0,0,0,.038);--dsh-card-sheen-light:rgba(255,255,255,.028);--dsh-card-sheen-dark:rgba(0,0,0,.024);--dsh-card-border:linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%);border-style:solid!important;border-width:2px!important;border-color:transparent!important;background:linear-gradient(var(--dsh-card-fill),var(--dsh-card-fill)) padding-box,var(--dsh-card-border) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{background-image:radial-gradient(circle at 1px 1px,var(--dsh-card-grain-light) 0 .34px,transparent .68px),radial-gradient(circle at 2px 3px,var(--dsh-card-grain-dark) 0 .34px,transparent .72px),linear-gradient(135deg,var(--dsh-card-sheen-light),transparent 48%,var(--dsh-card-sheen-dark)),linear-gradient(var(--dsh-card-fill),var(--dsh-card-fill)),var(--dsh-card-border)!important;background-size:4px 4px,7px 7px,100% 100%,100% 100%,100% 100%!important;background-position:0 0,1px 2px,0 0,0 0,0 0!important;background-repeat:repeat,repeat,no-repeat,no-repeat,no-repeat!important;background-clip:padding-box,padding-box,padding-box,padding-box,border-box!important;background-origin:padding-box,padding-box,padding-box,padding-box,border-box!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{--dsh-card-fill:#f4f5f6;--dsh-card-grain-light:rgba(255,255,255,.12);--dsh-card-grain-dark:rgba(74,87,98,.048);--dsh-card-sheen-light:rgba(255,255,255,.085);--dsh-card-sheen-dark:rgba(74,87,98,.032);--dsh-card-border:linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%);color:#293139!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]:is(:hover,:focus-visible){--dsh-card-sheen-light:rgba(255,255,255,.13)}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-modal-open] [data-dsh-fairy-overlay-layer="true"],html[data-dsh-fairy-visual][data-dsh-fairy-modal-open] [data-dsh-fairy-composer-dock="true"]{z-index:1!important}html[data-dsh-fairy-visual][data-dsh-fairy-modal-open] [data-dsh-fairy-sidebar-layer="true"]::after{z-index:0!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual]{--dsh-input-substrate:#07101c;--dsh-input-grid:rgba(100,210,255,.0294);--dsh-input-glow-a:rgba(96,212,255,.27);--dsh-input-glow-a-fade:rgba(54,184,255,.135);--dsh-input-glow-b:rgba(157,132,255,.23);--dsh-input-glow-b-fade:rgba(119,91,255,.115);--dsh-input-glow-c:rgba(174,112,255,.24);--dsh-input-glow-c-fade:rgba(143,94,255,.12);--dsh-input-substrate-image:radial-gradient(ellipse 50vmax 26vh at 5.4vmax 17.65vh,var(--dsh-input-glow-c),var(--dsh-input-glow-c-fade) 53%,transparent 100%),radial-gradient(ellipse 53vmax 37vh at calc(100vw - 7.15vmax) 73.2vh,var(--dsh-input-glow-b),var(--dsh-input-glow-b-fade) 53%,transparent 100%),radial-gradient(ellipse 56vmax 29vh at calc(100vw - 13.26vmax) 12.8vh,var(--dsh-input-glow-a),var(--dsh-input-glow-a-fade) 52%,transparent 100%),linear-gradient(var(--dsh-input-grid) 1.5px,transparent 1.5px),linear-gradient(90deg,var(--dsh-input-grid) 1.5px,transparent 1.5px)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"]{--dsh-input-substrate:#f7fafc;--dsh-input-grid:rgba(34,126,166,.0385);--dsh-input-glow-a:rgba(48,180,229,.22);--dsh-input-glow-a-fade:rgba(54,184,255,.10);--dsh-input-glow-b:rgba(139,115,241,.17);--dsh-input-glow-b-fade:rgba(119,91,255,.078);--dsh-input-glow-c:rgba(154,91,233,.17);--dsh-input-glow-c-fade:rgba(143,94,233,.075)}html[data-dsh-fairy-visual][data-dsh-fairy-theme] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{background-color:var(--dsh-input-substrate)!important;background-image:var(--dsh-input-substrate-image)!important;background-attachment:fixed!important;background-position:0 0!important;background-repeat:no-repeat,no-repeat,no-repeat,repeat,repeat!important;background-size:auto,auto,auto,48px 48px,48px 48px!important;border-color:transparent!important;box-shadow:inset 0 12px 19px -18px rgba(0,0,0,.82),inset 0 -8px 15px -14px rgba(0,0,0,.58),inset 7px 0 14px -13px rgba(0,0,0,.56),inset -7px 0 14px -13px rgba(0,0,0,.56)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] textarea,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] [contenteditable="true"]{background:transparent!important;background-color:transparent!important;background-image:none!important;border-color:transparent!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-material="true"]{filter:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-history-surface="true"]::after{display:block!important;content:''!important;position:absolute!important;z-index:3!important;inset:0!important;pointer-events:none!important;border-radius:10px!important;background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:inset 0 0 7px -2px var(--dsh-history-cutout-contact),inset 7px 7px 16px -10px var(--dsh-history-cutout-shadow),inset -4px -4px 10px -7px var(--dsh-history-cutout-ambient)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-layer="true"]::before{opacity:0!important}html[data-dsh-fairy-visual] [data-dsh-fairy-sidebar-layer="true"][data-dsh-fairy-sidebar-geometry="ready"]::before{opacity:1!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"] [data-input-scroll]{box-shadow:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"]::after{content:''!important;position:absolute!important;z-index:1!important;left:var(--dsh-fairy-composer-hole-contact-left)!important;top:var(--dsh-fairy-composer-hole-contact-top)!important;width:var(--dsh-fairy-composer-hole-contact-width)!important;height:var(--dsh-fairy-composer-hole-contact-height)!important;box-sizing:border-box!important;pointer-events:none!important;border-radius:10px!important;background:transparent!important;box-shadow:inset 0 12px 19px -18px rgba(0,0,0,.82),inset 0 -8px 15px -14px rgba(0,0,0,.58),inset 7px 0 14px -13px rgba(0,0,0,.56),inset -7px 0 14px -13px rgba(0,0,0,.56)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"]::after{background-color:var(--dsh-input-substrate)!important;background-image:var(--dsh-input-substrate-image)!important;background-attachment:fixed!important;background-position:0 0!important;background-repeat:no-repeat,no-repeat,no-repeat,repeat,repeat!important;background-size:auto,auto,auto,48px 48px,48px 48px!important}`);
		appendSection("themes", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .dsh-hdd-glow-a{background:radial-gradient(ellipse 56vmax 29vh at 46% 48%,rgba(96,212,255,.27),rgba(54,184,255,.135) 52%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .dsh-hdd-glow-b{background:radial-gradient(ellipse 53vmax 37vh at 55% 52%,rgba(157,132,255,.23),rgba(119,91,255,.115) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] .dsh-hdd-glow-c{background:radial-gradient(ellipse 50vmax 26vh at 54% 49%,rgba(174,112,255,.24),rgba(143,94,255,.12) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-a{background:radial-gradient(ellipse 56vmax 29vh at 46% 48%,rgba(48,180,229,.22),rgba(54,184,255,.10) 52%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-b{background:radial-gradient(ellipse 53vmax 37vh at 55% 52%,rgba(139,115,241,.17),rgba(119,91,255,.078) 53%,transparent 100%)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] .dsh-hdd-glow-c{background:radial-gradient(ellipse 50vmax 26vh at 54% 49%,rgba(154,91,233,.17),rgba(143,94,233,.075) 53%,transparent 100%)}`);
		appendSection("shared-surfaces", `html[data-dsh-fairy-visual] [data-dsh-fairy-native-new-session="true"]{transition:filter 90ms ease,transform 90ms ease}html[data-dsh-fairy-visual] [data-dsh-fairy-native-new-session="true"]:active{filter:brightness(.84)!important;transform:translateY(1px)!important}`);
		appendSection("shared-surfaces", `@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-control="true"]{display:block!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{top:31px!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{height:24px!important;padding:2px 6px!important;overflow:hidden!important;--dsh-fairy-scale-track:#8ea6b5;--dsh-fairy-scale-track-rest:rgba(82,112,132,.24)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-track:#a8bac9;--dsh-fairy-scale-track-rest:rgba(168,186,201,.24)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]{position:absolute!important;left:16px!important;right:16px!important;top:50%!important;transform:translateY(-50%)!important;width:auto!important;height:16px!important;margin:0!important;box-sizing:border-box!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-runnable-track{height:5px!important;background:linear-gradient(to right,var(--dsh-fairy-scale-track) 0 var(--dsh-fairy-scale),var(--dsh-fairy-scale-track-rest) var(--dsh-fairy-scale) 100%)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-thumb{margin-top:-2.5px!important;background:var(--dsh-fairy-scale-track)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-track{height:5px!important;background:var(--dsh-fairy-scale-track-rest)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-progress{height:5px!important;background:var(--dsh-fairy-scale-track)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-thumb{background:var(--dsh-fairy-scale-track)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{position:absolute!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]::before{content:''!important;position:absolute!important;z-index:0!important;left:16px!important;right:16px!important;top:50%!important;height:5px!important;transform:translateY(-50%)!important;border-radius:999px!important;background:linear-gradient(to right,var(--dsh-fairy-scale-track) 0 var(--dsh-fairy-scale),var(--dsh-fairy-scale-track-rest) var(--dsh-fairy-scale) 100%)!important;pointer-events:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]{z-index:1!important;background:transparent!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-runnable-track,html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-track,html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-progress{background:transparent!important}`);
		appendSection("themes", `html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-track:#7898aa;--dsh-fairy-scale-track-rest:rgba(82,112,132,.30)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-track:#9eb5c4;--dsh-fairy-scale-track-rest:rgba(158,181,196,.30)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-thumb{background:var(--dsh-fairy-scale-track)!important;border:2px solid var(--dsh-card-fill,#f4f5f6)!important;box-shadow:0 0 0 1px var(--dsh-fairy-scale-track)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-thumb{background:var(--dsh-fairy-scale-track)!important;border:2px solid var(--dsh-card-fill,#f4f5f6)!important;box-shadow:0 0 0 1px var(--dsh-fairy-scale-track)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-runnable-track{background:transparent!important;background-image:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-track,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-progress{background:transparent!important;background-image:none!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-thumb{-webkit-appearance:none!important;width:10px!important;height:10px!important;background-color:#fff!important;background-image:none!important;opacity:1!important;border:2px solid #7898aa!important;box-shadow:0 0 0 1px rgba(82,112,132,.42)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-thumb{width:10px!important;height:10px!important;background-color:#fff!important;background-image:none!important;opacity:1!important;border:2px solid #7898aa!important;box-shadow:0 0 0 1px rgba(82,112,132,.42)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]{position:static!important;display:block!important;width:100%!important;height:16px!important;margin:0!important;transform:none!important;z-index:1!important;background:transparent!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-runnable-track,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-track,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-progress{background:transparent!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-composer-wing:176px;--dsh-fairy-composer-voice-width:152px;--dsh-fairy-composer-voice-inset:12px;--dsh-fairy-composer-voice-right:calc(var(--dsh-fairy-composer-wing) + var(--dsh-fairy-composer-voice-inset) + 5px);--dsh-fairy-input-side:var(--dsh-fairy-composer-wing);--dsh-fairy-input-control-gap:4px;--dsh-fairy-reasoning-gap:4px;--dsh-fairy-composer-reasoning-width:220px;grid-template-columns:minmax(var(--dsh-fairy-composer-wing),max-content) minmax(0,1fr) minmax(var(--dsh-fairy-composer-wing),max-content)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-control="true"]{left:12px!important;width:var(--dsh-fairy-composer-wing)!important;max-width:var(--dsh-fairy-composer-wing)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]{width:var(--dsh-fairy-composer-wing)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"]>button{max-width:calc(var(--dsh-fairy-composer-wing) - 24px)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"]{left:var(--dsh-fairy-composer-wing)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{right:var(--dsh-fairy-composer-wing)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-context-control="true"]{right:calc(var(--dsh-fairy-composer-wing) + var(--dsh-fairy-input-control-size) + var(--dsh-fairy-input-control-gap))!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-reasoning-control="true"]{right:calc(var(--dsh-fairy-composer-wing) + (var(--dsh-fairy-input-control-size) * 2) + var(--dsh-fairy-input-control-gap) + var(--dsh-fairy-reasoning-gap))!important;width:var(--dsh-fairy-composer-reasoning-width)!important;max-width:var(--dsh-fairy-composer-reasoning-width)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{right:var(--dsh-fairy-composer-voice-right)!important;width:var(--dsh-fairy-composer-voice-width)!important;min-width:var(--dsh-fairy-composer-voice-width)!important;max-width:var(--dsh-fairy-composer-voice-width)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"] [data-dsh-fairy-volume-input="true"]{right:3px!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-composer-wing:132px;--dsh-fairy-composer-voice-width:108px;--dsh-fairy-composer-voice-inset:10px;--dsh-fairy-composer-reasoning-width:200px}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-composer-wing:0px;--dsh-fairy-composer-voice-width:0px;--dsh-fairy-composer-voice-inset:8px;--dsh-fairy-composer-reasoning-width:0px;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:minmax(0,1fr)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{display:none!important}}`);
		appendSection("composer", `
/* Native model/effort toolbar: reserve space instead of hiding the controls. */
/* Anchor the complete footer inside the measured input well, not on its outer edge. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-command-control="true"]{left:calc(var(--dsh-fairy-composer-hole-contact-left) + 10px)!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-contact-top) - var(--dsh-fairy-composer-hole-contact-height) + 8px)!important;top:auto!important;transform:none!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{left:calc(var(--dsh-fairy-composer-hole-contact-left) + var(--dsh-fairy-composer-hole-contact-width) - 38px)!important;right:auto!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-contact-top) - var(--dsh-fairy-composer-hole-contact-height) + 8px)!important;top:auto!important;transform:none!important}

html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-row="true"]{position:absolute!important;inset:0!important;display:block!important;z-index:4!important;pointer-events:none!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-access-control="true"]{left:12px!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{--dsh-fairy-composer-wing:176px}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{grid-template-rows:minmax(0,1fr)!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll]{grid-row:1!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] [data-composer-input]{padding-bottom:44px!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-toolbar="true"]{position:absolute!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;top:auto!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-contact-top) - var(--dsh-fairy-composer-hole-contact-height) + 8px)!important;left:auto!important;right:calc(100% - var(--dsh-fairy-composer-hole-contact-left) - var(--dsh-fairy-composer-hole-contact-width) + 46px)!important;width:calc(var(--dsh-fairy-composer-hole-contact-width) - 94px)!important;max-width:calc(var(--dsh-fairy-composer-hole-contact-width) - 94px)!important;height:28px!important;min-width:0!important;margin:0!important;padding:0!important;z-index:30!important;pointer-events:auto!important;grid-column:1 / -1!important;grid-row:1 / -1!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-toolbar="true"] button{max-width:100%!important;min-width:0!important;pointer-events:auto!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-model-toolbar="true"] :is(.re-model-trigger,.fairy-mc-model-trigger){width:auto!important;max-width:100%!important;justify-content:flex-end!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-toolbar-part="model"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-toolbar-part="reasoning"]{max-width:calc((100% - var(--dsh-fairy-composer-wing) * 2 - 32px) / 2)!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-toolbar-part="model"]{left:calc(var(--dsh-fairy-composer-wing) + 12px)!important;right:auto!important;justify-content:flex-start!important}
@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{--dsh-fairy-composer-wing:132px}}
@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"]{--dsh-fairy-composer-wing:0px}}
`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-reasoning-gap:3px!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-composer-voice-right:12px!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-composer-voice-right:10px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]{--dsh-fairy-composer-voice-right:8px!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{position:absolute!important;z-index:11!important;right:0!important;top:33px!important;bottom:auto!important;left:auto!important;width:152px!important;height:28px!important;min-width:152px!important;max-width:152px!important;min-height:28px!important;max-height:28px!important;box-sizing:border-box!important;padding:0!important;border:2px solid transparent!important;border-radius:999px!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important;pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]{position:absolute!important;inset:5px!important;width:auto!important;height:auto!important;min-width:0!important;max-width:none!important;min-height:0!important;max-height:none!important;box-sizing:border-box!important;padding:0!important;border:1px solid rgba(0,0,0,.42)!important;border-radius:999px!important;background:linear-gradient(to right,var(--dsh-fairy-scale-fill,#08090b) 0 var(--dsh-fairy-scale,100%),var(--dsh-fairy-scale-rest,#7d8790) var(--dsh-fairy-scale,100%) 100%)!important;box-shadow:inset 0 1px 2px rgba(255,255,255,.12),inset 0 -1px 2px rgba(0,0,0,.42)!important;overflow:hidden!important;pointer-events:auto!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-input="true"]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-width:0!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;appearance:none!important;-webkit-appearance:none!important;background:transparent!important;opacity:0!important;cursor:pointer!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-runnable-track,html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-track,html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-progress{height:100%!important;background:transparent!important;border:0!important}html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-input="true"]::-webkit-slider-thumb,html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-input="true"]::-moz-range-thumb{width:0!important;height:0!important;border:0!important;background:transparent!important;box-shadow:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]:focus-within{box-shadow:0 0 0 2px rgba(255,255,255,.28),inset 0 1px 2px rgba(255,255,255,.12),inset 0 -1px 2px rgba(0,0,0,.42)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-rest:#aeb6bc;border-color:rgba(52,63,73,.34)!important;box-shadow:inset 0 1px 2px rgba(255,255,255,.52),inset 0 -1px 2px rgba(52,63,73,.22)!important}@media(max-width:900px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{right:-2px!important;width:108px!important;min-width:108px!important;max-width:108px!important}}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-mascot-scale-base="true"]{display:none!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-fill:#000000!important;--dsh-fairy-scale-rest:#cfd2d5!important;border:0!important;box-shadow:none!important;background:linear-gradient(to right,#000000 0 var(--dsh-fairy-scale,100%),#cfd2d5 var(--dsh-fairy-scale,100%) 100%)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]::before,html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]::after{display:none!important;content:none!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-control="true"]:focus-within{box-shadow:none!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-rest:#cfd2d5!important;--dsh-fairy-scale-gradient-start:#8bb9c8;--dsh-fairy-scale-gradient-blue:#36519a;--dsh-fairy-scale-gradient-purple:#624d9f;--dsh-fairy-scale-gradient-end:#b26b99;--dsh-fairy-scale-inset-shadow:inset 0 0 6px rgba(52,63,73,.48);background-image:linear-gradient(to right,transparent 0 var(--dsh-fairy-scale,100%),#cfd2d5 var(--dsh-fairy-scale,100%) 100%),radial-gradient(ellipse 38% 170% at 15% 18%,rgba(255,255,255,.18) 0%,rgba(255,255,255,0) 70%),radial-gradient(ellipse 42% 150% at 40% 90%,rgba(36,82,186,.28) 0%,rgba(36,82,186,0) 72%),radial-gradient(ellipse 36% 150% at 68% 24%,rgba(190,107,232,.25) 0%,rgba(190,107,232,0) 72%),radial-gradient(ellipse 34% 160% at 91% 82%,rgba(255,180,220,.28) 0%,rgba(255,180,220,0) 70%),linear-gradient(to right,var(--dsh-fairy-scale-gradient-start) 0%,var(--dsh-fairy-scale-gradient-blue) 34%,var(--dsh-fairy-scale-gradient-purple) 67%,var(--dsh-fairy-scale-gradient-end) 100%)!important;background-color:#cfd2d5!important;background-repeat:no-repeat!important;box-shadow:var(--dsh-fairy-scale-inset-shadow)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-gradient-start:#d6f5ff;--dsh-fairy-scale-gradient-blue:#7897d8;--dsh-fairy-scale-gradient-purple:#b29be8;--dsh-fairy-scale-gradient-end:#f7bbdc;--dsh-fairy-scale-inset-shadow:inset 0 0 6px rgba(52,63,73,.48)}html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"] [data-dsh-fairy-mascot-scale-control="true"]{--dsh-fairy-scale-gradient-start:#8bb9c8;--dsh-fairy-scale-gradient-blue:#36519a;--dsh-fairy-scale-gradient-purple:#624d9f;--dsh-fairy-scale-gradient-end:#b26b99;--dsh-fairy-scale-inset-shadow:inset 0 0 6px rgba(0,0,0,.68)}`);
		// DSH uses a contenteditable for the real composer. Keep it above the
		// attachment decoration and give it an explicit readable/clickable surface.
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] [data-composer-input="true"],html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] [contenteditable="true"]{position:relative!important;z-index:3!important;display:block!important;min-height:24px!important;color:var(--dsw-alias-label-primary,#e8f2fa)!important;-webkit-text-fill-color:var(--dsw-alias-label-primary,#e8f2fa)!important;caret-color:var(--dsw-alias-brand-primary,#62d4ff)!important;pointer-events:auto!important;user-select:text!important;visibility:visible!important;opacity:1!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] [data-composer-input="true"],html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-input-scroll] [contenteditable="true"]{color:#172531!important;-webkit-text-fill-color:#172531!important;caret-color:#1688ce!important}`);
		// Both side columns share the input well's bounds, without increasing the dock height.
		appendSection("composer", `
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]{top:var(--dsh-fairy-composer-hole-contact-top,10px)!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-contact-top,10px) - var(--dsh-fairy-composer-hole-contact-height,112px))!important;height:auto!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace-control="true"]{top:0!important;height:28px!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-mode-control="true"]{top:calc((100% - 28px) / 2)!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-access-control="true"]{top:auto!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-contact-top,10px) - var(--dsh-fairy-composer-hole-contact-height,112px))!important;height:28px!important;max-width:calc(var(--dsh-fairy-composer-wing) - 24px)!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{right:12px!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"],
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-base="true"]{grid-column:1 / -1!important;grid-row:1 / -1!important;right:0!important;width:var(--dsh-fairy-composer-voice-width)!important;min-width:var(--dsh-fairy-composer-voice-width)!important;max-width:var(--dsh-fairy-composer-voice-width)!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{top:calc((100% - 28px) / 2)!important;bottom:auto!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-base="true"]{top:auto!important;bottom:0!important}
`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{overflow:hidden!important;box-shadow:inset 0 2px 3px rgba(0,0,0,.24),inset 0 -2px 3px rgba(255,255,255,.16)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{box-shadow:inset 0 2px 3px rgba(52,63,73,.18),inset 0 -2px 3px rgba(255,255,255,.65)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{box-shadow:inset 0 2px 3px rgba(0,0,0,.30),inset 0 -1px 2px rgba(0,0,0,.16)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{box-shadow:inset 0 2px 3px rgba(52,63,73,.22),inset 0 -1px 2px rgba(52,63,73,.10)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{border-color:rgba(48,53,58,.94)!important;background:radial-gradient(circle at 28% 28%,rgba(255,255,255,.34) 0 9%,transparent 30%),radial-gradient(circle at 72% 68%,rgba(196,113,231,.96) 0 13%,transparent 48%),radial-gradient(circle at 28% 70%,rgba(103,176,243,.96) 0 15%,transparent 52%),radial-gradient(circle at 66% 25%,rgba(247,142,194,.94) 0 16%,transparent 54%),linear-gradient(135deg,#8fcfff 0%,#b997ed 48%,#efa5cc 100%)!important;box-shadow:0 0 0 1px rgba(15,18,22,.72),0 1px 3px rgba(0,0,0,.46),inset 0 1px 1px rgba(255,255,255,.18),inset 0 -1px 1px rgba(20,16,32,.38)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-control="true"]{overflow:visible!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{z-index:5!important;box-sizing:border-box!important;width:16px!important;height:16px!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-animation-speed-thumb="1"]{border-color:rgba(112,124,137,.72)!important;box-shadow:0 0 0 1px rgba(82,94,107,.28),0 1px 3px rgba(0,0,0,.34),inset 0 1px 1px rgba(255,255,255,.18),inset 0 -1px 1px rgba(20,16,32,.28)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-attachments="true"]>*{position:relative!important;z-index:2!important;grid-column:2!important;grid-row:1!important;min-width:0!important;align-self:start!important;justify-self:stretch!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"]{grid-template-rows:auto minmax(0,1fr)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"] [data-input-scroll]{grid-row:2!important}@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"]{grid-template-rows:auto minmax(0,1fr)!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-attachments="true"]>*{grid-column:1!important;grid-row:1!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"][data-dsh-fairy-composer-attachments-active="true"] [data-input-scroll]{grid-column:1!important;grid-row:2!important}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{border:2px solid transparent!important;border-radius:999px!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}`);
		appendSection("composer", `html[data-dsh-fairy-visual][data-dsh-fairy-theme="dark"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{border:2px solid transparent!important;background:linear-gradient(#30353a,#30353a) padding-box,linear-gradient(135deg,#555f68 0%,#4e5861 48%,#3d444b 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.06),5px 6px 13px rgba(0,0,0,.13),inset 1px 1px 0 rgba(255,255,255,.03),inset -1px -1px 0 rgba(0,0,0,.13)!important}html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-voice-control="true"]{border:2px solid transparent!important;background:linear-gradient(#f4f5f6,#f4f5f6) padding-box,linear-gradient(135deg,#dfe5e9 0%,#dce2e6 48%,#c1c8ce 100%) border-box!important;box-shadow:-4px -4px 9px rgba(255,255,255,.46),5px 6px 13px rgba(52,63,73,.10),inset 1px 1px 0 rgba(255,255,255,.58),inset -1px -1px 0 rgba(52,63,73,.08)!important}`);
		appendSection("hero", `.dsh-fairy-hero-host{width:100vw}.dsh-fairy-hero-projection-svg{top:-2px;transform:translateX(2px)}.dsh-fairy-hero-sub{transform:translateY(-8px)}.dsh-fairy-hero-sub::before,.dsh-fairy-hero-sub::after{width:240px}@media(max-width:520px){.dsh-fairy-hero-projection-svg{top:1px}.dsh-fairy-hero-sub{transform:translateX(2px)}.dsh-fairy-hero-sub::before,.dsh-fairy-hero-sub::after{width:170px}}`);
		appendSection("composer", `html[data-dsh-fairy-visual] [data-composer-seat]:has([data-approval-key]){--dsh-composer-text-max-height:min(336px,max(48px,calc(100dvh - 260px)))!important}`);
		appendSection("composer", `
/* The transparent toolbar row must not swallow native send/stop button hits.
   Re-enable only its marked interactive owner, not the whole input-sized row. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-send-control="true"]{pointer-events:auto!important}
/* Use measured input geometry for the middle right control, including attachments. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-mascot-scale-base="true"]{top:calc(var(--dsh-fairy-composer-hole-contact-top,10px) + (var(--dsh-fairy-composer-hole-contact-height,112px) - 28px) / 2 - 10px)!important}
/* DSH's ContextMeter footer must not shrink the full-height Fairy card or add a bottom strip. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-bar-root="true"]{position:relative!important;display:block!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-native-footer="true"]{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;max-width:none!important;box-sizing:border-box!important;padding:0!important;margin:0!important;pointer-events:none!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-floating-context="true"]{position:absolute!important;left:auto!important;right:calc(100% - var(--dsh-fairy-composer-hole-contact-left) - var(--dsh-fairy-composer-hole-contact-width) + 8px)!important;top:calc(var(--dsh-fairy-composer-hole-contact-top,10px) + 6px)!important;bottom:auto!important;width:auto!important;min-width:0!important;max-width:76px!important;height:24px!important;min-height:24px!important;max-height:24px!important;display:inline-flex!important;align-items:center!important;pointer-events:auto!important;z-index:10!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-floating-context="true"] button{height:24px!important;max-width:76px!important;padding:1px 6px!important;font-size:12px!important;line-height:20px!important;white-space:nowrap!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-bar-root="true"]:has([data-dsh-fairy-composer-floating-context="true"]) [data-composer-input]{padding-right:84px!important}
`);


		appendSection("composer", `
/* 1.4.5: real Git Graph branch chip, inside the input well beside the plus. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-stack="true"]:has([data-dsh-fairy-composer-branch-control="true"]){--dsh-fairy-branch-reserve:calc(min(144px,var(--dsh-fairy-composer-hole-contact-width) * .25) + 10px)}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-branch-control="true"]{position:absolute!important;inset:auto!important;left:var(--dsh-fairy-branch-left,0px)!important;top:var(--dsh-fairy-branch-top,0px)!important;width:var(--dsh-fairy-branch-width,0px)!important;max-width:var(--dsh-fairy-branch-width,0px)!important;height:28px!important;margin:0!important;padding:0!important;display:inline-flex!important;align-items:center!important;pointer-events:auto!important;z-index:32!important;visibility:hidden}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-branch-control="true"][data-dsh-fairy-branch-positioned="true"]{visibility:visible!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-branch-control="true"] [data-gitgraph-chip]{box-sizing:border-box!important;min-width:0!important;max-width:100%!important;height:28px!important;min-height:28px!important;padding:0 8px!important;overflow:hidden!important;pointer-events:auto!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-branch-control="true"] [data-gitgraph-chip]>svg{flex-shrink:0!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-branch-control="true"] [data-gitgraph-chip]>span{min-width:0!important;text-overflow:ellipsis!important;white-space:nowrap!important;overflow:hidden!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-branch-control="true"]>div:has(>[data-gitgraph-chip]){width:100%!important;min-width:0!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-workspace="true"]:has([data-dsh-fairy-composer-branch-control="true"]){z-index:31!important}
/* Keep the original branch ancestor measurable when narrow layouts hide the left wing. */
@media(max-width:620px){html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-workspace="true"]:has([data-dsh-fairy-composer-branch-control="true"]){display:block!important;width:100%!important;overflow:visible!important}html[data-dsh-fairy-visual] [data-dsh-fairy-composer-workspace="true"]:has([data-dsh-fairy-composer-branch-control="true"])>*:not([data-dsh-fairy-composer-branch-control="true"]):not(:has([data-dsh-fairy-composer-branch-control="true"])){display:none!important}}
/* A hero chip originally opens downward; the bottom input needs its native menu upward. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-branch-control="true"] [data-gitgraph-popover]{top:auto!important;bottom:calc(100% + 8px)!important;left:0!important;width:min(280px,calc(var(--dsh-fairy-composer-hole-contact-width) - 60px))!important;max-height:min(360px,60vh)!important;pointer-events:auto!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-stack="true"]:has([data-dsh-fairy-composer-branch-control="true"]) [data-dsh-fairy-composer-model-toolbar="true"]{width:calc(var(--dsh-fairy-composer-hole-contact-width) - 94px - var(--dsh-fairy-branch-reserve))!important;max-width:calc(var(--dsh-fairy-composer-hole-contact-width) - 94px - var(--dsh-fairy-branch-reserve))!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-stack="true"]:has([data-dsh-fairy-composer-branch-control="true"]) [data-dsh-fairy-composer-toolbar-part="model"]{left:calc(var(--dsh-fairy-composer-hole-contact-left) + 48px + var(--dsh-fairy-branch-reserve))!important;max-width:calc((var(--dsh-fairy-composer-hole-contact-width) - 94px - var(--dsh-fairy-branch-reserve)) / 2)!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-stack="true"]:has([data-dsh-fairy-composer-branch-control="true"]) [data-dsh-fairy-composer-toolbar-part="reasoning"]{max-width:calc((var(--dsh-fairy-composer-hole-contact-width) - 94px - var(--dsh-fairy-branch-reserve)) / 2)!important}
`);
		appendSection("composer", `
/* The attachment substrate is card::after; controls must paint above it. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]>[data-input-scroll]{z-index:2!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-composer-card="true"]>[data-dsh-fairy-composer-row="true"]{z-index:4!important}
/* Keep the native interrupt action beside the primary queue/steer action. */
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-dock="true"] [data-dsh-fairy-composer-interrupt-control="true"]{position:absolute!important;z-index:10!important;left:calc(var(--dsh-fairy-composer-hole-contact-left) + var(--dsh-fairy-composer-hole-contact-width) - 70px)!important;right:auto!important;top:auto!important;bottom:calc(100% - var(--dsh-fairy-composer-hole-contact-top) - var(--dsh-fairy-composer-hole-contact-height) + 8px)!important;width:28px!important;min-width:28px!important;max-width:28px!important;height:28px!important;min-height:28px!important;max-height:28px!important;padding:0!important;margin:0!important;transform:none!important;pointer-events:auto!important}
html[data-dsh-fairy-visual] [data-dsh-fairy-composer-interruptible="true"] [data-dsh-fairy-composer-model-toolbar="true"]:not([data-dsh-fairy-composer-toolbar-part="model"]){right:calc(100% - var(--dsh-fairy-composer-hole-contact-left) - var(--dsh-fairy-composer-hole-contact-width) + 78px)!important;width:calc(var(--dsh-fairy-composer-hole-contact-width) - 126px - var(--dsh-fairy-branch-reserve,0px))!important;max-width:calc(var(--dsh-fairy-composer-hole-contact-width) - 126px - var(--dsh-fairy-branch-reserve,0px))!important}
`);
		el.textContent = cssSections.map(({ css }) => css).join("");
		(document.head || document.documentElement).appendChild(el);
	}
	var init_style = __esmMin((() => {
		init_constants();
	}));

//#endregion
//#region ../../fairy-contracts/client-dom.cjs
	var require_client_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const FAIRY_VOICE_CONTROL_ATTRIBUTE = "data-dsh-fairy-voice-control";
		module.exports = { FAIRY_VOICE_CONTROL_ATTRIBUTE };
	}));

//#endregion
//#region src/client/dom-adapter.js
	var require_dom_adapter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { FAIRY_VOICE_CONTROL_ATTRIBUTE } = require_client_dom();
		const diagnostics = { warn(operation, context = {}, error) {
			console.warn(`DSH_FAIRY_LOG ${JSON.stringify({
				schema: 1,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				level: "warn",
				module: "dsh-fairy-visual",
				operation,
				event: error ? "failure" : "event",
				context,
				...error ? { error: {
					name: String(error.name || "Error"),
					message: String(error.message || error).slice(0, 320)
				} } : {}
			})}`);
		} };
		const OFFICIAL_SLOT_VALUES = Object.freeze({ composerAttachments: "conversation.input.attachments" });
		const VOICE_CONTROL_FALLBACK_SELECTOR = "[aria-label=\"Fairy 朗读控制\"],input[aria-label=\"朗读音量\"]";
		const ARIA_LABELS = Object.freeze({
			sessionTree: Object.freeze({
				zh: Object.freeze(["会话"]),
				en: Object.freeze(["Sessions"])
			}),
			newSession: Object.freeze({
				zh: Object.freeze(["新建会话"]),
				en: Object.freeze(["New session", "New Session"])
			}),
			openSidebar: Object.freeze({
				zh: Object.freeze(["打开侧边栏"]),
				en: Object.freeze(["Open sidebar"])
			}),
			collapseSidebar: Object.freeze({
				zh: Object.freeze(["收起侧边栏"]),
				en: Object.freeze(["Collapse sidebar"])
			}),
			send: Object.freeze({
				zh: Object.freeze([
					"发送消息",
					"排队发送",
					"插话发送",
					"停止生成",
					"停止"
				]),
				en: Object.freeze([
					"Send message",
					"Queue message",
					"Steer message",
					"Stop generating",
					"Stop"
				])
			}),
			sendOnly: Object.freeze({
				zh: Object.freeze(["发送消息", "排队发送", "插话发送"]),
				en: Object.freeze(["Send message", "Queue message", "Steer message"])
			}),
			context: Object.freeze({
				zh: Object.freeze(["上下文"]),
				en: Object.freeze(["Context"])
			}),
			command: Object.freeze({
				zh: Object.freeze(["命令", "添加文件或调用指令"]),
				en: Object.freeze(["Commands", "Command", "Add files or invoke commands"])
			}),
			access: Object.freeze({
				zh: Object.freeze(["访问模式"]),
				en: Object.freeze(["Access mode"])
			}),
			model: Object.freeze({
				zh: Object.freeze(["选择模型"]),
				en: Object.freeze(["Select model"])
			}),
			reasoning: Object.freeze({
				zh: Object.freeze(["模型 "]),
				en: Object.freeze(["Model "])
			}),
			workspace: Object.freeze({
				zh: Object.freeze(["选择工作区"]),
				en: Object.freeze(["Choose workspace"])
			}),
			balance: Object.freeze({
				zh: Object.freeze(["DeepSeek 余额"]),
				en: Object.freeze(["DeepSeek balance"])
			}),
			undo: Object.freeze({
				zh: Object.freeze(["撤销当前版本效果"]),
				en: Object.freeze(["Undo current version effect"])
			}),
			redo: Object.freeze({
				zh: Object.freeze(["重施加下一版本效果"]),
				en: Object.freeze(["Redo next version effect"])
			}),
			toBottom: Object.freeze({
				zh: Object.freeze(["回到底部"]),
				en: Object.freeze(["Back to bottom"])
			})
		});
		function labelsFor(key) {
			const labels = ARIA_LABELS[key];
			return labels ? [...new Set(Object.values(labels).flat())] : [];
		}
		const ARIA_FUZZY_KEYWORDS = Object.freeze({ sessionTree: Object.freeze([
			"会话",
			"sessions",
			"session"
		]) });
		function ariaLabelSelector(key, { base = "*", match = "exact", suffix = "" } = {}) {
			const attribute = match === "prefix" ? "aria-label^" : "aria-label";
			return labelsFor(key).map((label) => `${base}[${attribute}="${label}"]${suffix}`).join(",");
		}
		function joinSelectors(...selectors) {
			return selectors.filter(Boolean).join(",");
		}
		function appendSelectorSuffix(selector, suffix) {
			return selector.split(",").map((part) => `${part}${suffix}`).join(",");
		}
		function localeOf(value) {
			const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
			if (normalized.startsWith("zh")) return "zh";
			if (normalized.startsWith("en")) return "en";
			return null;
		}
		function detectCurrentLanguage(doc = document, navigatorRef = typeof navigator === "undefined" ? void 0 : navigator) {
			const treeLabel = query(doc, "[role=\"tree\"]")?.getAttribute?.("aria-label");
			for (const [locale, labels] of Object.entries(ARIA_LABELS.sessionTree)) if (labels.includes(treeLabel)) return locale;
			return localeOf(doc?.documentElement?.lang) || localeOf(navigatorRef?.language) || "zh";
		}
		function onLanguageChange(callback, doc = document, navigatorRef = typeof navigator === "undefined" ? void 0 : navigator) {
			const root = doc?.documentElement;
			if (!root || typeof MutationObserver === "undefined") return () => {};
			let current = detectCurrentLanguage(doc, navigatorRef);
			const observer = new MutationObserver(() => {
				const next = detectCurrentLanguage(doc, navigatorRef);
				if (next === current) return;
				current = next;
				callback(next);
			});
			observer.observe(root, {
				attributes: true,
				attributeFilter: ["lang"]
			});
			return () => observer.disconnect();
		}
		const OFFICIAL_SELECTORS = Object.freeze({
			rootSlot: "body > #root > [data-slot=\"root\"]",
			rootSurface: "[data-slot=\"root\"]",
			sidebar: "[data-slot=\"sidebar\"]",
			sidebarResizeHandle: "[data-side=\"sidebar\"]",
			conversation: "[data-slot=\"main.conversation\"],[data-slot=\"conversation\"]",
			shellOverlay: "[data-slot=\"shell.overlay\"]",
			settingsDialog: "[data-slot=\"sidebar.settings\"] [role=\"dialog\"]",
			phaseHero: "[data-phase=\"hero\"]",
			phaseActive: "[data-phase=\"active\"]",
			phaseAny: "[data-phase]",
			composerSeat: "[data-composer-seat]",
			composerCard: "[data-composer-card=\"true\"]",
			composerTextarea: "[data-composer-input=\"true\"][role=\"textbox\"],textarea",
			composerAttachmentsSlot: `[data-slot="${OFFICIAL_SLOT_VALUES.composerAttachments}"]`,
			conversationScroll: "[data-conversation-scroll]",
			inputScroll: "[data-input-scroll]",
			conversationComposerDock: "[data-slot=\"conversation.composer.dock\"]",
			chatFlow: "[data-chat-flow]",
			sessionTree: ariaLabelSelector("sessionTree", { base: "[role=\"tree\"]" }),
			sessionItem: "[role=\"treeitem\"]",
			expandedSessionItem: "[role=\"treeitem\"][aria-expanded=\"true\"]",
			selectedSessionItem: "[role=\"treeitem\"][aria-selected=\"true\"]",
			sidebarBrandMark: "[data-slot=\"sidebar.brand.mark\"]",
			openSidebar: ariaLabelSelector("openSidebar", { base: "body > #root > [data-slot=\"root\"] button" }),
			collapseSidebar: ariaLabelSelector("collapseSidebar", { base: "body > #root > [data-slot=\"root\"] button" }),
			newSession: ariaLabelSelector("newSession", { base: "button" }),
			sessionHeader: "[data-slot=\"conversation.session.header\"]",
			sessionHeaderActions: "[data-slot=\"conversation.session.header.actions\"]",
			sessionHeaderUtilities: "[data-slot=\"conversation.session.header.utilities\"]",
			send: ariaLabelSelector("send", { base: "button" }),
			sendOnly: ariaLabelSelector("sendOnly", { base: "button" }),
			context: ariaLabelSelector("context", {
				base: "button",
				match: "prefix"
			}),
			voice: `[${FAIRY_VOICE_CONTROL_ATTRIBUTE}],${VOICE_CONTROL_FALLBACK_SELECTOR}`,
			command: ariaLabelSelector("command", { base: "button" }),
			access: ariaLabelSelector("access", {
				base: "button",
				match: "prefix"
			}),
			model: joinSelectors(ariaLabelSelector("model", {
				base: "select",
				match: "prefix"
			}), ariaLabelSelector("model", {
				base: "button",
				match: "prefix"
			})),
			reasoning: ariaLabelSelector("reasoning", {
				base: "button",
				match: "prefix",
				suffix: "[aria-haspopup=\"menu\"]"
			}),
			workspace: ariaLabelSelector("workspace", { base: "button" }),
			balance: ariaLabelSelector("balance", {
				base: "[data-slot=\"sidebar.footer.action\"] *",
				match: "prefix"
			}),
			undo: ariaLabelSelector("undo", { base: "button" }),
			redo: ariaLabelSelector("redo", { base: "button" }),
			toBottom: ariaLabelSelector("toBottom", { base: "button" }),
			headerElement: ":scope > header"
		});
		const OFFICIAL_ATTRIBUTES = Object.freeze({
			slot: "data-slot",
			phase: "data-phase",
			composerSeat: "data-composer-seat",
			composerCard: "data-composer-card",
			conversationScroll: "data-conversation-scroll",
			inputScroll: "data-input-scroll",
			chatFlow: "data-chat-flow"
		});
		const SEMANTIC_SURFACE_SELECTOR = [
			OFFICIAL_SELECTORS.rootSurface,
			OFFICIAL_SELECTORS.sidebar,
			OFFICIAL_SELECTORS.conversation,
			OFFICIAL_SELECTORS.shellOverlay,
			"[data-slot=\"sidebar.settings\"]",
			"[data-phase]",
			"[role=\"dialog\"]",
			"[role=\"tree\"]",
			"[role=\"treeitem\"]",
			OFFICIAL_SELECTORS.composerSeat,
			OFFICIAL_SELECTORS.composerCard,
			OFFICIAL_SELECTORS.openSidebar,
			OFFICIAL_SELECTORS.collapseSidebar,
			OFFICIAL_SELECTORS.sidebarBrandMark,
			OFFICIAL_SELECTORS.newSession
		].join(", ");
		const OFFICIAL_NODE_CONTRACTS = Object.freeze(Object.fromEntries(Object.entries(OFFICIAL_SELECTORS).map(([name, selector]) => [name, Object.freeze({ selector })])));
		const HDD_SCROLL_TARGETS = Object.freeze([
			{
				key: "history",
				selector: `${OFFICIAL_SELECTORS.sidebar} ${OFFICIAL_SELECTORS.sessionTree}`
			},
			{
				key: "conversation",
				selector: `${OFFICIAL_SELECTORS.conversation} ${OFFICIAL_SELECTORS.conversationScroll}`
			},
			{
				key: "input",
				selector: `${OFFICIAL_SELECTORS.conversation} ${OFFICIAL_SELECTORS.inputScroll}`
			}
		]);
		const HDD_SCROLL_TARGET_SELECTOR = HDD_SCROLL_TARGETS.map(({ selector }) => selector).join(",");
		const CAPABILITY_LEVEL = Object.freeze({
			CRITICAL: Object.freeze([
				"rootSlot",
				"shellOverlay",
				"conversation"
			]),
			CORE: Object.freeze([
				"sidebar",
				"composerSeat",
				"composerCard",
				"sessionHeader",
				"phaseSurface",
				"conversationScroll",
				"inputScroll"
			]),
			ENHANCEMENT: Object.freeze([
				"sessionTree",
				"sidebarBrandMark",
				"balanceAction",
				"undoControl",
				"redoControl",
				"composerAttachmentsSlot",
				"modelSelection"
			]),
			OPTIONAL: Object.freeze(["toBottom"])
		});
		const CAPABILITY_LEVEL_BY_NAME = Object.freeze(Object.fromEntries(Object.entries(CAPABILITY_LEVEL).flatMap(([level, names]) => names.map((name) => [name, level]))));
		const CAPABILITY_DEFINITIONS = Object.freeze({
			rootSlot: {
				selector: OFFICIAL_SELECTORS.rootSlot,
				level: CAPABILITY_LEVEL_BY_NAME.rootSlot,
				required: true,
				resolve: rootSlot
			},
			shellOverlay: {
				selector: OFFICIAL_SELECTORS.shellOverlay,
				level: CAPABILITY_LEVEL_BY_NAME.shellOverlay,
				required: true,
				resolve: shellOverlay
			},
			conversation: {
				selector: OFFICIAL_SELECTORS.conversation,
				level: CAPABILITY_LEVEL_BY_NAME.conversation,
				required: true,
				resolve: conversation
			},
			sidebar: {
				selector: OFFICIAL_SELECTORS.sidebar,
				level: CAPABILITY_LEVEL_BY_NAME.sidebar,
				required: true,
				resolve: sidebar
			},
			composerSeat: {
				selector: OFFICIAL_SELECTORS.composerSeat,
				level: CAPABILITY_LEVEL_BY_NAME.composerSeat,
				required: true,
				resolve: (doc) => composerSeat(conversation(doc))
			},
			composerCard: {
				selector: OFFICIAL_SELECTORS.composerCard,
				level: CAPABILITY_LEVEL_BY_NAME.composerCard,
				required: true,
				resolve: (doc) => composerCard(composerSeat(conversation(doc)))
			},
			sessionHeader: {
				selector: OFFICIAL_SELECTORS.sessionHeader,
				level: CAPABILITY_LEVEL_BY_NAME.sessionHeader,
				required: true,
				applicable: (doc) => Boolean(phase(conversation(doc), "active")),
				resolve: sessionHeader
			},
			phaseSurface: {
				selector: `${OFFICIAL_SELECTORS.phaseHero},${OFFICIAL_SELECTORS.phaseActive}`,
				level: CAPABILITY_LEVEL_BY_NAME.phaseSurface,
				required: true,
				resolve: (doc) => anyPhase(conversation(doc))
			},
			conversationScroll: {
				selector: OFFICIAL_SELECTORS.conversationScroll,
				level: CAPABILITY_LEVEL_BY_NAME.conversationScroll,
				required: true,
				applicable: (doc) => Boolean(phase(conversation(doc), "active")),
				resolve: (doc) => conversationScroll(conversation(doc))
			},
			inputScroll: {
				selector: OFFICIAL_SELECTORS.inputScroll,
				level: CAPABILITY_LEVEL_BY_NAME.inputScroll,
				required: true,
				resolve: (doc) => inputScroll(composerCard(composerSeat(conversation(doc))))
			},
			sessionTree: {
				selector: OFFICIAL_SELECTORS.sessionTree,
				level: CAPABILITY_LEVEL_BY_NAME.sessionTree,
				required: false,
				resolve: sessionTree
			},
			sidebarBrandMark: {
				selector: OFFICIAL_SELECTORS.sidebarBrandMark,
				level: CAPABILITY_LEVEL_BY_NAME.sidebarBrandMark,
				required: false,
				resolve: (doc) => officialNode("sidebarBrandMark", doc)
			},
			balanceAction: {
				selector: OFFICIAL_SELECTORS.balance,
				level: CAPABILITY_LEVEL_BY_NAME.balanceAction,
				required: false,
				resolve: balanceAction
			},
			undoControl: {
				selector: OFFICIAL_SELECTORS.undo,
				level: CAPABILITY_LEVEL_BY_NAME.undoControl,
				required: false,
				applicable: (doc) => Boolean(phase(conversation(doc), "active")),
				resolve: undoControl
			},
			redoControl: {
				selector: OFFICIAL_SELECTORS.redo,
				level: CAPABILITY_LEVEL_BY_NAME.redoControl,
				required: false,
				applicable: (doc) => Boolean(phase(conversation(doc), "active")),
				resolve: redoControl
			},
			toBottom: {
				selector: OFFICIAL_SELECTORS.toBottom,
				level: CAPABILITY_LEVEL_BY_NAME.toBottom,
				required: false,
				resolve: toBottomControl
			},
			composerAttachmentsSlot: {
				selector: OFFICIAL_SELECTORS.composerAttachmentsSlot,
				level: CAPABILITY_LEVEL_BY_NAME.composerAttachmentsSlot,
				required: false,
				resolve: (doc) => composerAttachmentsSlot(composerCard(composerSeat(conversation(doc))))
			},
			modelSelection: {
				selector: OFFICIAL_SELECTORS.model,
				level: CAPABILITY_LEVEL_BY_NAME.modelSelection,
				required: false,
				applicable: (doc) => Boolean(phase(conversation(doc), "active")),
				resolve: (doc) => modelControl(composerCard(composerSeat(conversation(doc))))
			}
		});
		const capabilityStatus = {
			missing: /* @__PURE__ */ new Set(),
			degraded: /* @__PURE__ */ new Set(),
			timestamp: null
		};
		const reportedMissing = /* @__PURE__ */ new Set();
		function query(scope, selector) {
			if (!selector) return null;
			return scope?.querySelector?.(selector) || null;
		}
		function queryAll(scope, selector) {
			if (!selector) return [];
			return scope?.querySelectorAll ? [...scope.querySelectorAll(selector)] : [];
		}
		function officialNode(name, scope = document) {
			return query(scope, OFFICIAL_NODE_CONTRACTS[name]?.selector);
		}
		function hasOfficialNode(name, scope = document) {
			return Boolean(officialNode(name, scope));
		}
		function officialNodes(name, scope = document) {
			return queryAll(scope, OFFICIAL_NODE_CONTRACTS[name]?.selector);
		}
		function rootSlot(doc = document) {
			return officialNode("rootSlot", doc);
		}
		function sidebar(doc = document) {
			return officialNode("sidebar", doc);
		}
		function conversation(doc = document) {
			return officialNode("conversation", doc);
		}
		function shellOverlay(doc = document) {
			return officialNode("shellOverlay", doc);
		}
		function settingsDialog(doc = document) {
			return officialNode("settingsDialog", doc);
		}
		function sidebarResizeHandle(scope = document) {
			return officialNode("sidebarResizeHandle", scope);
		}
		function sidebarOpenControl(doc = document) {
			return officialNode("openSidebar", doc);
		}
		function sidebarCollapseControl(doc = document) {
			return officialNode("collapseSidebar", doc);
		}
		const reportedFuzzyMatches = /* @__PURE__ */ new Set();
		function findByAriaLabelFuzzy(scope, { role, labels }) {
			const candidates = queryAll(scope, `[role="${role}"]`);
			const keywords = labels.map((label) => label.toLocaleLowerCase());
			return candidates.find((node) => {
				const label = node.getAttribute?.("aria-label")?.toLocaleLowerCase();
				return label && keywords.some((keyword) => label.includes(keyword));
			}) || null;
		}
		function sessionTree(scope = document, { silent = false } = {}) {
			const exact = officialNode("sessionTree", scope);
			if (exact) return exact;
			const fuzzy = findByAriaLabelFuzzy(scope, {
				role: "tree",
				labels: ARIA_FUZZY_KEYWORDS.sessionTree
			});
			if (fuzzy && !silent && !reportedFuzzyMatches.has("sessionTree")) {
				reportedFuzzyMatches.add("sessionTree");
				diagnostics.warn("capability.fuzzy-fallback", { capability: "sessionTree" });
			}
			return fuzzy;
		}
		function sessionItems(scope) {
			return officialNodes("sessionItem", scope);
		}
		function expandedSessionItems(scope) {
			return officialNodes("expandedSessionItem", scope);
		}
		function selectedSessionItems(scope) {
			return officialNodes("selectedSessionItem", scope);
		}
		function newSessionButtons(scope) {
			return officialNodes("newSession", scope);
		}
		function sidebarBrandButton(scope = document) {
			const explicit = officialNode("sidebarBrandMark", scope)?.closest?.(OFFICIAL_NODE_CONTRACTS.newSession.selector);
			if (explicit) return explicit;
			return newSessionButtons(scope).find((button) => button.firstElementChild?.tagName === "svg") || null;
		}
		function phase(scope = document, name) {
			if (!scope) return null;
			if (name === "hero") return officialNode("phaseHero", scope);
			if (name === "active") return officialNode("phaseActive", scope);
			return officialNode("phaseActive", scope) || officialNode("phaseHero", scope);
		}
		function anyPhase(scope = document) {
			return officialNode("phaseAny", scope);
		}
		function sessionHeader(scope) {
			return officialNode("sessionHeader", scope);
		}
		function sessionHeaderActions(scope) {
			return officialNode("sessionHeaderActions", scope);
		}
		function sessionHeaderUtilities(scope) {
			return officialNode("sessionHeaderUtilities", scope);
		}
		function sessionAgentPresetLabel(scope) {
			return [...sessionHeaderActions(scope)?.children || []].find((node) => node?.getAttribute?.("title") && !node.querySelector?.("button, input, select, textarea, a") && Boolean(node.textContent?.trim())) || null;
		}
		function headerElement(scope) {
			return officialNode("headerElement", scope);
		}
		function composerSeat(scope = document) {
			return officialNode("composerSeat", scope);
		}
		function composerCard(scope) {
			return officialNode("composerCard", scope);
		}
		function composerTextarea(scope) {
			return officialNode("composerTextarea", scope);
		}
		function composerAttachmentsSlot(scope) {
			const selector = OFFICIAL_NODE_CONTRACTS.composerAttachmentsSlot.selector;
			return [...scope?.children || []].find((node) => node?.matches?.(selector) || node?.getAttribute?.(OFFICIAL_ATTRIBUTES.slot) === OFFICIAL_SLOT_VALUES.composerAttachments) || null;
		}
		function conversationScroll(scope) {
			return officialNode("conversationScroll", scope);
		}
		function conversationScrolls(scope) {
			return officialNodes("conversationScroll", scope);
		}
		function inputScroll(scope) {
			return officialNode("inputScroll", scope);
		}
		function conversationComposerDock(scope) {
			return officialNode("conversationComposerDock", scope);
		}
		function chatFlows(doc = document) {
			return officialNodes("chatFlow", doc);
		}
		function sendButton(scope) {
			return sendOnlyButton(scope) || officialNodes("send", scope).at(-1) || null;
		}
		function sendOnlyButton(scope) {
			return officialNodes("sendOnly", scope).at(-1) || null;
		}
		function contextControl(scope) {
			return officialNode("context", scope);
		}
		function voiceControl(scope) {
			return query(scope, `[${FAIRY_VOICE_CONTROL_ATTRIBUTE}]`) || query(scope, VOICE_CONTROL_FALLBACK_SELECTOR);
		}
		function commandControl(scope) {
			return officialNode("command", scope);
		}
		function accessControl(scope) {
			return officialNode("access", scope);
		}
		function modelControl(scope) {
			return query(scope, "[data-fairy-model-trigger]") || officialNode("model", scope);
		}
		function reasoningControl(scope) {
			return query(scope, "[data-fairy-model-trigger]") || officialNode("reasoning", scope);
		}
		function modelAndReasoningShareNode(scope) {
			const model = modelControl(scope);
			const reasoning = reasoningControl(scope);
			return Boolean(model && reasoning && model === reasoning);
		}
		function workspaceControl(scope) {
			return officialNodes("workspace", scope).find((node) => !node.closest("[data-dsh-fairy-composer-workspace-projection]")) || null;
		}
		function balanceAction(doc = document) {
			return officialNode("balance", doc);
		}
		function undoControl(scope) {
			return officialNode("undo", scope);
		}
		function redoControl(scope) {
			return officialNode("redo", scope);
		}
		function toBottomControl(scope) {
			return officialNode("toBottom", scope);
		}
		function hddScrollTargets(scope = document) {
			return HDD_SCROLL_TARGETS.map(({ key, selector }) => ({
				key,
				target: query(scope, selector)
			})).filter(({ target }) => target?.isConnected);
		}
		function capabilityNode(name, doc = document) {
			return CAPABILITY_DEFINITIONS[name]?.resolve?.(doc) || null;
		}
		function hasCapability(name, doc = document) {
			return Boolean(capabilityNode(name, doc));
		}
		function capabilitySnapshot(doc = document) {
			const snapshot = {};
			Object.entries(CAPABILITY_DEFINITIONS).forEach(([name, definition]) => {
				const applicable = definition.applicable?.(doc) ?? true;
				const node = applicable ? capabilityNode(name, doc) : null;
				snapshot[name] = {
					available: !applicable || Boolean(node),
					applicable,
					required: definition.required,
					level: definition.level,
					selector: definition.selector
				};
			});
			return snapshot;
		}
		function syncCapabilityStatus(snapshot, { includeOptional = false } = {}) {
			capabilityStatus.missing.clear();
			capabilityStatus.degraded.clear();
			Object.entries(snapshot).forEach(([name, capability]) => {
				if (capability.available) return;
				if (capability.required) capabilityStatus.missing.add(name);
				else if (includeOptional || capability.level === "ENHANCEMENT") capabilityStatus.degraded.add(name);
			});
			capabilityStatus.timestamp = Date.now();
		}
		function getCapabilityStatus() {
			return {
				missing: [...capabilityStatus.missing].sort(),
				degraded: [...capabilityStatus.degraded].sort(),
				timestamp: capabilityStatus.timestamp
			};
		}
		function resetCapabilityStatus() {
			capabilityStatus.missing.clear();
			capabilityStatus.degraded.clear();
			capabilityStatus.timestamp = null;
			reportedMissing.clear();
			reportedFuzzyMatches.clear();
		}
		function missingCapabilities(doc = document, { includeOptional = false } = {}) {
			const snapshot = capabilitySnapshot(doc);
			return Object.entries(snapshot).filter(([, capability]) => !capability.available && (capability.required || includeOptional || capability.level === "ENHANCEMENT")).map(([name, capability]) => ({
				name,
				...capability
			}));
		}
		function reportMissingCapabilities(doc = document, { report = (message) => diagnostics.warn("capability.missing", { message }), includeOptional = false, allowBeforeMount = false } = {}) {
			if (!allowBeforeMount && (!rootSlot(doc) || !conversation(doc))) return [];
			const snapshot = capabilitySnapshot(doc);
			syncCapabilityStatus(snapshot, { includeOptional });
			const missing = Object.entries(snapshot).filter(([, capability]) => !capability.available && (capability.required || includeOptional || capability.level === "ENHANCEMENT")).map(([name, capability]) => ({
				name,
				...capability
			}));
			missing.forEach(({ name, selector, required, level }) => {
				if (reportedMissing.has(name)) return;
				reportedMissing.add(name);
				report(`[dsh-fairy-visual] ${required ? "missing required" : "degraded"} official capability [${level}]: ${name} (${selector})`);
			});
			return missing;
		}
		if (typeof window !== "undefined" && globalThis.process?.env?.NODE_ENV === "development") window.__fairyVisualCapability = Object.freeze({
			getStatus: getCapabilityStatus,
			reset: resetCapabilityStatus
		});
		module.exports = {
			OFFICIAL_SELECTORS,
			OFFICIAL_SLOT_VALUES,
			FAIRY_VOICE_CONTROL_ATTRIBUTE,
			VOICE_CONTROL_FALLBACK_SELECTOR,
			ARIA_LABELS,
			ARIA_FUZZY_KEYWORDS,
			labelsFor,
			ariaLabelSelector,
			appendSelectorSuffix,
			detectCurrentLanguage,
			onLanguageChange,
			OFFICIAL_ATTRIBUTES,
			SEMANTIC_SURFACE_SELECTOR,
			OFFICIAL_NODE_CONTRACTS,
			HDD_SCROLL_TARGETS,
			HDD_SCROLL_TARGET_SELECTOR,
			CAPABILITY_LEVEL,
			CAPABILITY_LEVEL_BY_NAME,
			CAPABILITY_DEFINITIONS,
			getCapabilityStatus,
			resetCapabilityStatus,
			officialNode,
			hasOfficialNode,
			officialNodes,
			capabilityNode,
			hasCapability,
			rootSlot,
			sidebar,
			conversation,
			shellOverlay,
			settingsDialog,
			sidebarResizeHandle,
			sidebarOpenControl,
			sidebarCollapseControl,
			sessionTree,
			sessionItems,
			expandedSessionItems,
			selectedSessionItems,
			newSessionButtons,
			sidebarBrandButton,
			phase,
			anyPhase,
			sessionHeader,
			sessionHeaderActions,
			sessionHeaderUtilities,
			sessionAgentPresetLabel,
			headerElement,
			composerSeat,
			composerCard,
			composerTextarea,
			composerAttachmentsSlot,
			conversationScroll,
			conversationScrolls,
			inputScroll,
			conversationComposerDock,
			chatFlows,
			sendButton,
			sendOnlyButton,
			contextControl,
			voiceControl,
			commandControl,
			accessControl,
			modelControl,
			reasoningControl,
			modelAndReasoningShareNode,
			workspaceControl,
			balanceAction,
			undoControl,
			redoControl,
			toBottomControl,
			hddScrollTargets,
			capabilitySnapshot,
			missingCapabilities,
			reportMissingCapabilities
		};
	}));

//#endregion
//#region src/client/composer-attachments.js
	var require_composer_attachments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { OFFICIAL_SELECTORS, composerAttachmentsSlot } = require_dom_adapter();
		const ATTACHMENTS_SLOT = OFFICIAL_SELECTORS.composerAttachmentsSlot;
		function attachmentSlot(card) {
			return composerAttachmentsSlot(card);
		}
		function attachmentRail(slot) {
			return slot?.firstElementChild || null;
		}
		function attachmentRailHeight(slot) {
			const height = Number(attachmentRail(slot)?.getBoundingClientRect?.().height);
			return Number.isFinite(height) ? Math.max(0, Math.ceil(height)) : 0;
		}
		function attachmentDockHeight(baseHeight, railHeight, minimum, maximum) {
			return Math.min(maximum, Math.max(minimum, baseHeight + railHeight));
		}
		module.exports = {
			ATTACHMENTS_SLOT,
			attachmentSlot,
			attachmentRail,
			attachmentRailHeight,
			attachmentDockHeight
		};
	}));

//#endregion
//#region src/client/lifecycle.js
	var require_lifecycle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const diagnostics = { error(operation, error, context = {}) {
			console.error(`DSH_FAIRY_LOG ${JSON.stringify({
				schema: 1,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				level: "error",
				module: "dsh-fairy-visual",
				operation,
				event: "failure",
				context,
				error: {
					name: String(error?.name || "Error"),
					message: String(error?.message || error).slice(0, 320)
				}
			})}`);
		} };
		const singletonOwners = /* @__PURE__ */ new WeakMap();
		function createLifecycleScope(name = "fairy-visual") {
			let disposed = false;
			const cleanups = [];
			const cleanupLabels = /* @__PURE__ */ new WeakMap();
			const rafs = /* @__PURE__ */ new Set();
			const timers = /* @__PURE__ */ new Set();
			const intervals = /* @__PURE__ */ new Set();
			const abortControllers = /* @__PURE__ */ new Set();
			const keyedRafs = /* @__PURE__ */ new Map();
			const bindings = /* @__PURE__ */ new Map();
			const removeCleanup = (cleanup) => {
				const index = cleanups.indexOf(cleanup);
				if (index >= 0) cleanups.splice(index, 1);
			};
			const add = (cleanup, label = null) => {
				if (typeof cleanup !== "function") return cleanup;
				if (disposed) {
					cleanup();
					return cleanup;
				}
				if (typeof label === "string" && label.trim()) cleanupLabels.set(cleanup, label.trim());
				cleanups.push(cleanup);
				return cleanup;
			};
			const registrationOptions = (options, explicitLabel = null) => {
				if (!options || typeof options !== "object" || !Object.prototype.hasOwnProperty.call(options, "label")) return {
					nativeOptions: options,
					label: explicitLabel
				};
				const { label, ...nativeOptions } = options;
				return {
					nativeOptions: Object.keys(nativeOptions).length ? nativeOptions : void 0,
					label: explicitLabel ?? label
				};
			};
			const on = (target, type, listener, options, label = null) => {
				if (!target?.addEventListener) return () => {};
				const { nativeOptions, label: registrationLabel } = registrationOptions(options, label);
				target.addEventListener(type, listener, nativeOptions);
				return add(() => target.removeEventListener(type, listener, nativeOptions), registrationLabel || `event:${type}`);
			};
			const observe = (observer, target, options, label = null) => {
				if (!observer || !target) return () => {};
				const { nativeOptions, label: registrationLabel } = registrationOptions(options, label);
				observer.observe(target, nativeOptions);
				return add(() => observer.disconnect(), registrationLabel || "observer");
			};
			const frame = (callback, label = null) => {
				if (disposed) return 0;
				const request = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout;
				const cancel = typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : clearTimeout;
				let cleanup = null;
				const id = request(() => {
					rafs.delete(id);
					removeCleanup(cleanup);
					if (!disposed) callback();
				});
				rafs.add(id);
				cleanup = () => {
					if (!rafs.delete(id)) return;
					cancel(id);
					removeCleanup(cleanup);
				};
				add(cleanup, label || "frame");
				return id;
			};
			const scheduleFrame = (key, callback, label = null) => {
				if (disposed) return 0;
				const pending = keyedRafs.get(key);
				if (pending) {
					pending.callback = callback;
					return pending.id;
				}
				const record = {
					id: 0,
					callback
				};
				const id = frame(() => {
					keyedRafs.delete(key);
					record.callback();
				}, label || `frame:${key}`);
				record.id = id;
				keyedRafs.set(key, record);
				return id;
			};
			const timeout = (callback, delay, label = null) => {
				if (disposed) return 0;
				let cleanup = null;
				const id = setTimeout(() => {
					timers.delete(id);
					removeCleanup(cleanup);
					if (!disposed) callback();
				}, delay);
				timers.add(id);
				cleanup = () => {
					if (!timers.delete(id)) return;
					clearTimeout(id);
					removeCleanup(cleanup);
				};
				add(cleanup, label || "timeout");
				return id;
			};
			const interval = (callback, delay, label = null) => {
				if (disposed) return 0;
				const id = setInterval(() => {
					if (!disposed) callback();
				}, delay);
				intervals.add(id);
				add(() => {
					if (!intervals.delete(id)) return;
					clearInterval(id);
				}, label || "interval");
				return id;
			};
			const abortController = (label = null) => {
				const controller = new AbortController();
				abortControllers.add(controller);
				add(() => {
					if (!abortControllers.delete(controller)) return;
					controller.abort();
				}, label || "abort-controller");
				return controller;
			};
			const replaceBinding = (key, cleanup, label = null) => {
				bindings.get(key)?.();
				bindings.delete(key);
				if (typeof cleanup !== "function") return cleanup;
				if (disposed) {
					let active = true;
					const disposeImmediately = () => {
						if (!active) return;
						active = false;
						cleanup();
					};
					disposeImmediately();
					return disposeImmediately;
				}
				let active = true;
				const binding = () => {
					if (!active) return;
					active = false;
					if (bindings.get(key) === binding) bindings.delete(key);
					removeCleanup(binding);
					cleanup();
				};
				bindings.set(key, binding);
				add(binding, label || `binding:${key}`);
				return binding;
			};
			const inspect = () => cleanups.map((cleanup, index) => ({
				index,
				label: cleanupLabels.get(cleanup) || "(unlabeled)",
				hasCustomName: cleanup.name !== "" && cleanup.name !== "cleanup"
			}));
			const dispose = () => {
				if (disposed) return;
				disposed = true;
				[...rafs].forEach((id) => {
					if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(id);
					else clearTimeout(id);
				});
				[...timers].forEach((id) => clearTimeout(id));
				[...intervals].forEach((id) => clearInterval(id));
				[...abortControllers].forEach((controller) => controller.abort());
				rafs.clear();
				keyedRafs.clear();
				bindings.clear();
				timers.clear();
				intervals.clear();
				abortControllers.clear();
				while (cleanups.length) {
					const cleanup = cleanups.pop();
					try {
						cleanup?.();
					} catch (error) {
						diagnostics.error("lifecycle.cleanup", error, { owner: name });
					}
				}
			};
			return {
				get disposed() {
					return disposed;
				},
				add,
				on,
				observe,
				frame,
				scheduleFrame,
				timeout,
				interval,
				abortController,
				replaceBinding,
				inspect,
				dispose
			};
		}
		function claimSingleton(owner, key, scope) {
			if (!owner || !key || !scope) return scope;
			(singletonOwners.get(owner)?.get(key))?.dispose?.();
			let entries = singletonOwners.get(owner);
			if (!entries) {
				entries = /* @__PURE__ */ new Map();
				singletonOwners.set(owner, entries);
			}
			entries.set(key, scope);
			scope.add(() => {
				if (entries.get(key) === scope) entries.delete(key);
				if (!entries.size) singletonOwners.delete(owner);
			}, `singleton:${key}`);
			return scope;
		}
		module.exports = {
			createLifecycleScope,
			claimSingleton
		};
	}));

//#endregion
//#region src/client/dom-observer-manager.js
	var require_dom_observer_manager = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const managers = /* @__PURE__ */ new WeakMap();
		const diagnostics = {
			start: () => typeof performance === "object" && performance?.now ? performance.now() : Date.now(),
			metric(operation, startedAt, context = {}, thresholdMs = 0) {
				const duration = (typeof performance === "object" && performance?.now ? performance.now() : Date.now()) - startedAt;
				if (duration < thresholdMs) return;
				console.info(`DSH_FAIRY_LOG ${JSON.stringify({
					schema: 1,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					level: "info",
					module: "dsh-fairy-visual",
					operation,
					event: "metric",
					context,
					duration_ms: Number(duration.toFixed(3))
				})}`);
			},
			error(operation, error, context = {}) {
				console.error(`DSH_FAIRY_LOG ${JSON.stringify({
					schema: 1,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					level: "error",
					module: "dsh-fairy-visual",
					operation,
					event: "failure",
					context,
					error: {
						name: String(error?.name || "Error"),
						message: String(error?.message || error).slice(0, 320)
					}
				})}`);
			}
		};
		function containsTarget(root, target, subtree) {
			if (root === target) return true;
			return subtree === true && Boolean(root?.contains?.(target));
		}
		function acceptsRecord(subscription, record) {
			const options = subscription.options;
			if (!containsTarget(subscription.target, record.target, options.subtree)) return false;
			if (record.type === "childList") return options.childList === true;
			if (record.type === "characterData") return options.characterData === true;
			if (record.type !== "attributes" || options.attributes !== true) return false;
			return !options.attributeFilter?.length || options.attributeFilter.includes(record.attributeName);
		}
		function createDomObserverManager(documentRef) {
			const subscriptions = /* @__PURE__ */ new Set();
			const subscriptionsByTarget = /* @__PURE__ */ new WeakMap();
			const frameCallbacks = /* @__PURE__ */ new Map();
			let bodyObserver = null;
			let rootObserver = null;
			let frame = 0;
			let callbackCount = 0;
			let deliveredRecordCount = 0;
			let suspended = false;
			const dispatch = (records, rootOnly) => {
				callbackCount += 1;
				deliveredRecordCount += records.length;
				subscriptions.forEach((subscription) => {
					if (!subscription.active || subscription.rootOnly !== rootOnly) return;
					const accepted = records.filter((record) => acceptsRecord(subscription, record));
					if (!accepted.length) return;
					const startedAt = diagnostics.start();
					try {
						subscription.callback(accepted, subscription.virtualObserver);
					} catch (error) {
						diagnostics.error("observer.callback", error, {
							record_count: accepted.length,
							root_only: rootOnly
						});
						if (typeof reportError === "function") reportError(error);
						else setTimeout(() => {
							throw error;
						}, 0);
					} finally {
						diagnostics.metric("observer.callback", startedAt, {
							record_count: accepted.length,
							root_only: rootOnly
						}, 8);
					}
				});
			};
			const mergedOptions = (entries) => {
				const attributeEntries = entries.filter((entry) => entry.options.attributes);
				const observesAllAttributes = attributeEntries.some((entry) => !entry.options.attributeFilter?.length);
				const filters = new Set(attributeEntries.flatMap((entry) => entry.options.attributeFilter || []));
				return {
					childList: entries.some((entry) => entry.options.childList),
					subtree: entries.some((entry) => entry.options.subtree),
					attributes: attributeEntries.length > 0,
					...!observesAllAttributes && filters.size ? { attributeFilter: [...filters] } : {},
					characterData: entries.some((entry) => entry.options.characterData)
				};
			};
			const rebuildObserver = (rootOnly) => {
				if (!rootOnly && suspended) {
					bodyObserver?.disconnect();
					bodyObserver = null;
					return;
				}
				const entries = [...subscriptions].filter((entry) => entry.active && entry.rootOnly === rootOnly);
				let observer = rootOnly ? rootObserver : bodyObserver;
				observer?.disconnect();
				if (!entries.length || typeof MutationObserver !== "function") {
					if (rootOnly) rootObserver = null;
					else bodyObserver = null;
					return;
				}
				if (!observer) observer = new MutationObserver((records) => dispatch(records, rootOnly));
				const entriesByTarget = /* @__PURE__ */ new Map();
				entries.forEach((entry) => {
					const targetEntries = entriesByTarget.get(entry.target) || [];
					targetEntries.push(entry);
					entriesByTarget.set(entry.target, targetEntries);
				});
				entriesByTarget.forEach((targetEntries, target) => observer.observe(target, mergedOptions(targetEntries)));
				if (rootOnly) rootObserver = observer;
				else bodyObserver = observer;
			};
			const removeSubscription = (subscription) => {
				if (!subscription.active) return;
				subscription.active = false;
				subscriptions.delete(subscription);
				subscriptionsByTarget.get(subscription.target)?.delete(subscription);
				rebuildObserver(subscription.rootOnly);
			};
			const observe = (virtualObserver, target, options = {}) => {
				if (!target || typeof options !== "object") throw new TypeError("MutationObserver target and options are required");
				const normalized = {
					childList: options.childList === true,
					subtree: options.subtree === true,
					attributes: options.attributes === true || Array.isArray(options.attributeFilter),
					attributeFilter: Array.isArray(options.attributeFilter) ? [...new Set(options.attributeFilter)] : null,
					characterData: options.characterData === true
				};
				if (!normalized.childList && !normalized.attributes && !normalized.characterData) throw new TypeError("MutationObserver requires childList, attributes, or characterData");
				const previous = virtualObserver._subscriptions.get(target);
				if (previous) removeSubscription(previous);
				const rootOnly = target === documentRef.documentElement && normalized.subtree !== true;
				const subscription = {
					active: true,
					callback: virtualObserver._callback,
					options: normalized,
					rootOnly,
					target,
					virtualObserver
				};
				virtualObserver._subscriptions.set(target, subscription);
				subscriptions.add(subscription);
				let targetSubscriptions = subscriptionsByTarget.get(target);
				if (!targetSubscriptions) {
					targetSubscriptions = /* @__PURE__ */ new Set();
					subscriptionsByTarget.set(target, targetSubscriptions);
				}
				targetSubscriptions.add(subscription);
				rebuildObserver(rootOnly);
			};
			const disconnect = (virtualObserver) => {
				[...virtualObserver._subscriptions.values()].forEach(removeSubscription);
				virtualObserver._subscriptions.clear();
			};
			const scheduleFrame = (key, callback) => {
				frameCallbacks.set(key, callback);
				if (!frame) frame = requestAnimationFrame(() => {
					frame = 0;
					const callbacks = [...frameCallbacks.values()];
					frameCallbacks.clear();
					callbacks.forEach((run) => run());
				});
				return frame;
			};
			const cancelFrame = (key) => {
				frameCallbacks.delete(key);
				if (!frameCallbacks.size && frame) {
					cancelAnimationFrame(frame);
					frame = 0;
				}
			};
			return {
				observe,
				disconnect,
				scheduleFrame,
				cancelFrame,
				suspend() {
					if (suspended) return;
					suspended = true;
					rebuildObserver(false);
				},
				resume() {
					if (!suspended) return;
					suspended = false;
					rebuildObserver(false);
				},
				inspect() {
					return {
						nativeObserverCount: Number(Boolean(bodyObserver)) + Number(Boolean(rootObserver)),
						bodyObserverCount: Number(Boolean(bodyObserver)),
						rootObserverCount: Number(Boolean(rootObserver)),
						subscriptionCount: subscriptions.size,
						callbackCount,
						deliveredRecordCount,
						pendingFrameCount: frameCallbacks.size,
						suspended
					};
				}
			};
		}
		function getDomObserverManager(documentRef = document) {
			let manager = managers.get(documentRef);
			if (!manager) {
				manager = createDomObserverManager(documentRef);
				managers.set(documentRef, manager);
			}
			return manager;
		}
		function createManagedMutationObserver(callback, documentRef = document) {
			if (typeof callback !== "function") throw new TypeError("MutationObserver callback must be a function");
			const manager = getDomObserverManager(documentRef);
			return {
				_callback: callback,
				_subscriptions: /* @__PURE__ */ new Map(),
				observe(target, options) {
					manager.observe(this, target, options);
				},
				disconnect() {
					manager.disconnect(this);
				},
				takeRecords() {
					return [];
				}
			};
		}
		module.exports = {
			createDomObserverManager,
			getDomObserverManager,
			createManagedMutationObserver
		};
	}));

//#endregion
//#region src/client/composer-marker-projection.js
	var require_composer_marker_projection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES, inputScroll, sendButton, sendOnlyButton, contextControl, voiceControl, commandControl, accessControl, modelControl, reasoningControl, workspaceControl } = require_dom_adapter();
		const { attachmentSlot, attachmentRail } = require_composer_attachments();
		const COMPOSER_ATTR = "data-dsh-fairy-composer-dock";
		const MARKER_ATTRS = [
			COMPOSER_ATTR,
			"data-dsh-fairy-composer-row",
			"data-dsh-fairy-composer-tools",
			"data-dsh-fairy-composer-trailing",
			"data-dsh-fairy-composer-accessory",
			"data-dsh-fairy-composer-attachments",
			"data-dsh-fairy-composer-attachments-active",
			"data-dsh-fairy-composer-bar-root",
			"data-dsh-fairy-composer-bar-host",
			"data-dsh-fairy-composer-stack",
			"data-dsh-fairy-composer-workspace",
			"data-dsh-fairy-composer-chrome",
			"data-dsh-fairy-composer-send-control",
			"data-dsh-fairy-composer-interrupt-control",
			"data-dsh-fairy-composer-interruptible",
			"data-dsh-fairy-composer-context-control",
			"data-dsh-fairy-composer-native-footer",
			"data-dsh-fairy-composer-floating-context",
			"data-dsh-fairy-composer-output-control",
			"data-dsh-fairy-composer-voice-control",
			"data-dsh-fairy-composer-model-control",
			"data-dsh-fairy-composer-native-model-control",
			"data-dsh-fairy-composer-model-toolbar",
			"data-dsh-fairy-composer-toolbar-part",
			"data-dsh-fairy-composer-reasoning-control",
			"data-dsh-fairy-composer-command-control",
			"data-dsh-fairy-composer-branch-control",
			"data-dsh-fairy-composer-access-control",
			"data-dsh-fairy-composer-workspace-control",
			"data-dsh-fairy-composer-mode-control"
		];
		function clearMarker(node, name) {
			if (node?.isConnected) node.removeAttribute(name);
		}
		function directChildUnder(node, ancestor) {
			let current = node;
			while (current?.parentElement && current.parentElement !== ancestor) current = current.parentElement;
			return current?.parentElement === ancestor ? current : null;
		}
		function containsAny(node, candidates) {
			return Boolean(node && candidates.some((candidate) => candidate && (node === candidate || node.contains?.(candidate))));
		}
		function resolveComposerProjection(card) {
			if (!card) return null;
			const scroll = inputScroll(card);
			const send = sendButton(card) || sendOnlyButton(card);
			const barRoot = card.parentElement;
			const contextTarget = contextControl(barRoot);
			const attachments = attachmentSlot(card);
			const semanticTargets = [
				send,
				contextTarget && card.contains(contextTarget) ? contextTarget : null,
				voiceControl(card),
				commandControl(card),
				accessControl(card),
				modelControl(card),
				reasoningControl(card)
			].filter(Boolean);
			// A direct card child is a control, not a row. Reject it so a transient
			// re-mount cannot make that control the new full-screen row.
			const row = semanticTargets.map((target) => {
				const candidate = directChildUnder(target, card);
				return candidate && candidate !== target && !candidate.contains(scroll) && (!send || candidate.contains(send)) ? candidate : null;
			}).find((node) => node && node !== scroll && node !== attachments) || null;
			if (!row) return null;
			const rowChildren = [...row.children];
			const trailingTargets = [send, contextTarget && card.contains(contextTarget) ? contextTarget : null].filter(Boolean);
			const toolTargets = [voiceControl(card), commandControl(card), accessControl(card)].filter(Boolean);
			const trailing = rowChildren.find((node) => containsAny(node, trailingTargets)) || rowChildren[rowChildren.length - 1] || null;
			const tools = rowChildren.find((node) => node !== trailing && containsAny(node, toolTargets)) || rowChildren.find((node) => node !== trailing) || null;
			return { scroll, send, barRoot, contextTarget, attachments, row, tools, trailing };
		}
		function canMarkControls(card) {
			return Boolean(resolveComposerProjection(card));
		}
		function markControls(card) {
			const projection = resolveComposerProjection(card);
			if (!projection) return () => {};
			const owned = [];
			const mark = (node, name) => {
				if (!node) return;
				node.setAttribute(name, "true");
				owned.push([node, name]);
			};
			const { scroll, send, barRoot, contextTarget, attachments, row, tools, trailing } = projection;
			mark(row, "data-dsh-fairy-composer-row");
			mark(tools, "data-dsh-fairy-composer-tools");
			mark(trailing, "data-dsh-fairy-composer-trailing");
			mark(attachments, "data-dsh-fairy-composer-attachments");
			if (attachmentRail(attachments)) mark(card, "data-dsh-fairy-composer-attachments-active");
			[...card.children].filter((node) => node !== scroll && node !== row && node !== attachments).forEach((node) => mark(node, "data-dsh-fairy-composer-accessory"));
			// ContextMeter is a sibling of the card in current DSH, not part of its toolbar.
			// Include the native footer without relocating React-owned DOM nodes.
			const secondaryStops = [...card.querySelectorAll(OFFICIAL_SELECTORS.send)].filter((node) => node !== send && !node.matches(OFFICIAL_SELECTORS.sendOnly));
			mark(send, "data-dsh-fairy-composer-send-control");
			for (const node of secondaryStops) mark(node, "data-dsh-fairy-composer-interrupt-control");
			if (send && trailing && trailing !== send) [...trailing.children].forEach((node) => {
				if (contextTarget && node.contains?.(contextTarget)) return;
				if (node === send || node.contains?.(send) || containsAny(node, secondaryStops)) return;
				if (!modelControl(node) && !voiceControl(node)) mark(node, "data-dsh-fairy-composer-output-control");
			});
			if (secondaryStops.length) mark(card, "data-dsh-fairy-composer-interruptible");
			if (contextTarget) {
				let contextOwner = contextTarget.parentElement;
				while (contextOwner && contextOwner !== trailing && getComputedStyle(contextOwner).display === "contents") contextOwner = contextOwner.parentElement;
				mark(contextOwner || contextTarget, "data-dsh-fairy-composer-context-control");
				if (!card.contains(contextTarget)) mark(contextOwner || contextTarget, "data-dsh-fairy-composer-floating-context");
			}
			const voiceTarget = voiceControl(tools);
			if (voiceTarget && tools) mark(voiceTarget, "data-dsh-fairy-composer-voice-control");
			mark(commandControl(tools), "data-dsh-fairy-composer-command-control");
			let accessOwner = accessControl(tools);
			while (accessOwner?.parentElement && accessOwner.parentElement !== tools) accessOwner = accessOwner.parentElement;
			mark(accessOwner, "data-dsh-fairy-composer-access-control");
			// Fairy supplies the combined model/effort control. DSH can keep its
			// native slot mounted beside it, especially when thinking state swaps
			// the input row; mark those native owners so CSS can hide only the
			// duplicate controls without touching their React handlers.
			const fairyModelControl = card.querySelector("[data-fairy-model-control=\"true\"]");
			if (fairyModelControl) {
				const nativeTargets = [
					...card.querySelectorAll(OFFICIAL_SELECTORS.model),
					...card.querySelectorAll(OFFICIAL_SELECTORS.reasoning)
				].filter((node) => !node.closest("[data-fairy-model-control=\"true\"]"));
				const nativeOwners = new Set();
				for (const target of nativeTargets) {
					let owner = target;
					while (owner.parentElement && owner.parentElement !== row && owner.parentElement !== card) {
						const parent = owner.parentElement;
						if (parent === tools || parent === trailing || parent.contains(send) || parent.contains(scroll) || voiceControl(parent) || accessControl(parent) || commandControl(parent)) break;
						owner = parent;
					}
					nativeOwners.add(owner);
				}
				for (const owner of nativeOwners) mark(owner, "data-dsh-fairy-composer-native-model-control");
			}
			// Keep the native model/effort controls together, including controls supplied by slots.
			// Do not move React-owned nodes or hide their shared parent when the draft changes.
			const modelTarget = modelControl(card);
			const reasoningTarget = reasoningControl(card);
			const toolbarOwners = new Map();
			for (const [target, part] of [[modelTarget, "model"], [reasoningTarget, "reasoning"]]) {
				if (!target) continue;
				let owner = target;
				while (owner.parentElement && owner.parentElement !== row && owner.parentElement !== card) {
					const parent = owner.parentElement;
					if (parent === tools || parent === trailing || parent.contains(send) || parent.contains(scroll) || voiceControl(parent) || accessControl(parent) || commandControl(parent)) break;
					owner = parent;
				}
				toolbarOwners.set(owner, toolbarOwners.has(owner) ? "combined" : part);
			}
			for (const [owner, part] of toolbarOwners) {
				mark(owner, "data-dsh-fairy-composer-model-toolbar");
				owner.setAttribute("data-dsh-fairy-composer-toolbar-part", toolbarOwners.size === 1 ? "combined" : part);
				owned.push([owner, "data-dsh-fairy-composer-toolbar-part"]);
			}
			mark(barRoot, "data-dsh-fairy-composer-bar-root");
			// Take the native bottom row out of flow even while ContextMeter is absent.
			[...barRoot.children].filter((node) => node !== card).forEach((node) => mark(node, "data-dsh-fairy-composer-native-footer"));
			const seat = card.closest("[" + OFFICIAL_ATTRIBUTES.composerSeat + "]");
			// Git Graph supplies stable semantic attributes; never infer branches from text,
			// hashed CSS classes or the first extra workspace button.
			for (const anchor of seat?.querySelectorAll('[data-gitgraph-chip-anchor]') || []) {
				if (!anchor.closest('[data-dsh-fairy-composer-workspace-projection]')) mark(anchor, "data-dsh-fairy-composer-branch-control");
			}
			const workspaceButton = workspaceControl(seat);
			let stack = barRoot?.parentElement || null;
			// Hero rows and active-conversation composers have different numbers of children.
			// Find separate workspace/input branches, never mistake the input branch for a workspace row.
			if (workspaceButton && !barRoot.contains(workspaceButton)) {
				while (stack && stack !== seat && !stack.contains(workspaceButton)) stack = stack.parentElement;
			} else {
				while (stack && stack !== seat && getComputedStyle(stack).display === "contents") stack = stack.parentElement;
			}
			mark(workspaceButton, "data-dsh-fairy-composer-workspace-control");
			if (stack && stack !== seat) {
				mark(stack, "data-dsh-fairy-composer-stack");
				let barHost = barRoot;
				while (barHost.parentElement && barHost.parentElement !== stack) barHost = barHost.parentElement;
				mark(barHost, "data-dsh-fairy-composer-bar-host");
				let workspaceRow = workspaceButton;
				while (workspaceRow?.parentElement && workspaceRow.parentElement !== stack) workspaceRow = workspaceRow.parentElement;
				if (workspaceRow === barHost || !stack.contains(workspaceRow)) workspaceRow = null;
				[...stack.children].filter((node) => node !== barHost && node !== workspaceRow && !node.hasAttribute("data-dsh-fairy-composer-workspace-projection")).forEach((node) => mark(node, "data-dsh-fairy-composer-chrome"));
				mark(workspaceRow, "data-dsh-fairy-composer-workspace");
				const modeButton = workspaceRow ? [...workspaceRow.querySelectorAll("button")].find((button) => button !== workspaceButton && !button.closest("[data-gitgraph-chip-anchor]")) : null;
				let modeOwner = modeButton;
				let modeAncestor = modeButton?.parentElement;
				while (modeAncestor && modeAncestor !== workspaceRow) {
					if (getComputedStyle(modeAncestor).display !== "contents") modeOwner = modeAncestor;
					modeAncestor = modeAncestor.parentElement;
				}
				mark(modeOwner, "data-dsh-fairy-composer-mode-control");
			}
			return () => {
				require_composer_branch_position().clearBranchGeometry(card.closest("[" + OFFICIAL_ATTRIBUTES.composerSeat + "]"));
				owned.forEach(([node, name]) => clearMarker(node, name));
			};
		}
		module.exports = {
			COMPOSER_ATTR,
			MARKER_ATTRS,
			clearMarker,
			canMarkControls,
			markControls
		};
	}));

//#endregion
//#region src/client/composer-branch-position.js
	var require_composer_branch_position = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const SELECTOR = '[data-dsh-fairy-composer-branch-control="true"]';
		const PROPERTIES = ["--dsh-fairy-branch-left", "--dsh-fairy-branch-top", "--dsh-fairy-branch-width"];
		function clearBranchGeometry(scope) {
			for (const anchor of scope?.querySelectorAll(SELECTOR) || []) {
				for (const name of PROPERTIES) anchor.style.removeProperty(name);
				anchor.removeAttribute("data-dsh-fairy-branch-positioned");
			}
		}
		function syncBranchGeometry(scope, card) {
			const command = card?.querySelector('[data-dsh-fairy-composer-command-control="true"]');
			const input = card?.querySelector('[data-input-scroll]');
			if (!command || !input) { clearBranchGeometry(scope); return; }
			const plus = command.getBoundingClientRect(), hole = input.getBoundingClientRect();
			for (const anchor of scope?.querySelectorAll(SELECTOR) || []) {
				const parent = anchor.offsetParent;
				if (!parent || !parent.offsetWidth || !hole.width) continue;
				const origin = parent.getBoundingClientRect();
				// Bounding rectangles include CSS zoom; offsets and CSS lengths do not.
				const scaleX = origin.width / parent.offsetWidth || 1;
				const scaleY = origin.height / parent.offsetHeight || scaleX;
				const values = [
					(plus.right - origin.left) / scaleX - parent.clientLeft + parent.scrollLeft + 8,
					(plus.top - origin.top) / scaleY - parent.clientTop + parent.scrollTop,
					Math.max(0, Math.min(144, hole.width / scaleX * .25))
				];
				PROPERTIES.forEach((name, index) => {
					const value = `${Math.round(values[index] * 100) / 100}px`;
					if (anchor.style.getPropertyValue(name) !== value) anchor.style.setProperty(name, value);
				});
				if (!anchor.hasAttribute("data-dsh-fairy-branch-positioned")) anchor.setAttribute("data-dsh-fairy-branch-positioned", "true");
			}
		}
		module.exports = { clearBranchGeometry, syncBranchGeometry };
	}));

//#endregion
//#region src/client/composer-native-controls.js
	var require_composer_native_controls = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { canMarkControls, markControls } = require_composer_marker_projection();
		function canPlaceNativeControlMarkers(card) {
			return canMarkControls(card);
		}
		function placeNativeControlMarkers(card) {
			return markControls(card);
		}
		module.exports = { canPlaceNativeControlMarkers, placeNativeControlMarkers };
	}));

//#endregion
//#region src/client/composer-material-layer.js
	var require_composer_material_layer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
		let materialLayerSeed = 0;
		function createMaterialLayer(card) {
			if (!card) return null;
			const materialLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			const instanceId = `dsh-fairy-composer-${++materialLayerSeed}`;
			const patternId = `${instanceId}-polymer-pattern`;
			const sheenId = `${instanceId}-polymer-sheen`;
			const ambientId = `${instanceId}-polymer-ambient`;
			materialLayer.setAttribute("data-dsh-fairy-composer-material", "true");
			materialLayer.setAttribute("data-dsh-fairy-composer-material-instance", instanceId);
			materialLayer.setAttribute("preserveAspectRatio", "none");
			const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
			const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
			mask.setAttribute("data-dsh-fairy-composer-material-mask", "true");
			mask.setAttribute("maskUnits", "userSpaceOnUse");
			const outer = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			outer.setAttribute("fill", "white");
			const hole = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			hole.setAttribute("fill", "black");
			mask.append(outer, hole);
			defs.appendChild(mask);
			const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
			pattern.setAttribute("id", patternId);
			pattern.setAttribute("patternUnits", "userSpaceOnUse");
			pattern.setAttribute("width", "12");
			pattern.setAttribute("height", "12");
			const patternBase = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			patternBase.setAttribute("width", "12");
			patternBase.setAttribute("height", "12");
			patternBase.setAttribute("fill", "var(--dsh-composer-polymer)");
			const patternGrainLight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			patternGrainLight.setAttribute("cx", "1.4");
			patternGrainLight.setAttribute("cy", "1.4");
			patternGrainLight.setAttribute("r", ".72");
			patternGrainLight.setAttribute("fill", "var(--dsh-composer-polymer-light)");
			const patternGrainDark = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			patternGrainDark.setAttribute("cx", "6.5");
			patternGrainDark.setAttribute("cy", "8.5");
			patternGrainDark.setAttribute("r", ".78");
			patternGrainDark.setAttribute("fill", "var(--dsh-composer-polymer-dark)");
			const patternLight = document.createElementNS("http://www.w3.org/2000/svg", "path");
			patternLight.setAttribute("d", "M 0 3.5 H 12 M 0 9.5 H 12");
			patternLight.setAttribute("stroke", "var(--dsh-composer-polymer-stripe)");
			patternLight.setAttribute("stroke-width", ".82");
			patternLight.setAttribute("opacity", ".9");
			pattern.append(patternBase, patternGrainLight, patternGrainDark, patternLight);
			defs.appendChild(pattern);
			const sheen = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
			sheen.setAttribute("id", sheenId);
			sheen.setAttribute("gradientUnits", "userSpaceOnUse");
			const sheenLight = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			sheenLight.setAttribute("offset", "0%");
			const sheenMid = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			sheenMid.setAttribute("offset", "46%");
			const sheenDark = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			sheenDark.setAttribute("offset", "100%");
			sheen.append(sheenLight, sheenMid, sheenDark);
			defs.appendChild(sheen);
			const ambient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
			ambient.setAttribute("id", ambientId);
			ambient.setAttribute("gradientUnits", "userSpaceOnUse");
			const ambientLight = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			ambientLight.setAttribute("offset", "0%");
			const ambientFade = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			ambientFade.setAttribute("offset", "68%");
			const ambientEnd = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			ambientEnd.setAttribute("offset", "100%");
			ambient.append(ambientLight, ambientFade, ambientEnd);
			defs.appendChild(ambient);
			const face = document.createElementNS("http://www.w3.org/2000/svg", "path");
			face.setAttribute("data-dsh-fairy-composer-material-face", "continuous");
			face.setAttribute("fill", `url(#${patternId})`);
			face.setAttribute("fill-rule", "evenodd");
			face.setAttribute("clip-rule", "evenodd");
			const sheenFace = document.createElementNS("http://www.w3.org/2000/svg", "path");
			sheenFace.setAttribute("data-dsh-fairy-composer-material-sheen", "true");
			sheenFace.setAttribute("fill", `url(#${sheenId})`);
			sheenFace.setAttribute("fill-rule", "evenodd");
			sheenFace.setAttribute("clip-rule", "evenodd");
			const ambientFace = document.createElementNS("http://www.w3.org/2000/svg", "path");
			ambientFace.setAttribute("data-dsh-fairy-composer-material-ambient", "true");
			ambientFace.setAttribute("fill", `url(#${ambientId})`);
			ambientFace.setAttribute("fill-rule", "evenodd");
			ambientFace.setAttribute("clip-rule", "evenodd");
			materialLayer.append(defs, face, sheenFace, ambientFace);
			materialLayer._dshMaterial = {
				outer,
				hole,
				face,
				sheenFace,
				ambientFace,
				patternBase,
				patternGrainLight,
				patternGrainDark,
				patternLight,
				sheen,
				sheenLight,
				sheenMid,
				sheenDark,
				ambient,
				ambientLight,
				ambientFade,
				ambientEnd
			};
			card.appendChild(materialLayer);
			return materialLayer;
		}
		function unionRect(nodes) {
			const rects = nodes.map((node) => node?.getBoundingClientRect?.()).filter((rect) => rect && Number.isFinite(rect.left) && Number.isFinite(rect.top) && Number.isFinite(rect.right) && Number.isFinite(rect.bottom));
			if (!rects.length) return null;
			return {
				left: Math.min(...rects.map((rect) => rect.left)),
				top: Math.min(...rects.map((rect) => rect.top)),
				right: Math.max(...rects.map((rect) => rect.right)),
				bottom: Math.max(...rects.map((rect) => rect.bottom))
			};
		}
		function syncHoleContactGeometry(card, inputRect, clampValue = clamp) {
			if (!card?.style || !inputRect) return null;
			const cardRect = card.getBoundingClientRect?.();
			if (!cardRect || !Number.isFinite(cardRect.left) || !Number.isFinite(cardRect.top) || !Number.isFinite(cardRect.width) || !Number.isFinite(cardRect.height)) return null;
			const borderLeft = Number(card.clientLeft) || 0;
			const borderTop = Number(card.clientTop) || 0;
			const width = Number(card.clientWidth) || cardRect.width - borderLeft * 2;
			const height = Number(card.clientHeight) || cardRect.height - borderTop * 2;
			const originLeft = cardRect.left + borderLeft;
			const originTop = cardRect.top + borderTop;
			const left = clampValue(inputRect.left - originLeft, 0, width);
			const top = clampValue(inputRect.top - originTop, 0, height);
			const right = clampValue(inputRect.right - originLeft, left, width);
			const bottom = clampValue(inputRect.bottom - originTop, top, height);
			const geometry = {
				left,
				top,
				width: Math.max(0, right - left),
				height: Math.max(0, bottom - top)
			};
			card.style.setProperty("--dsh-fairy-composer-hole-contact-left", geometry.left + "px");
			card.style.setProperty("--dsh-fairy-composer-hole-contact-top", geometry.top + "px");
			card.style.setProperty("--dsh-fairy-composer-hole-contact-width", geometry.width + "px");
			card.style.setProperty("--dsh-fairy-composer-hole-contact-height", geometry.height + "px");
			return geometry;
		}
		function clearHoleContactGeometry(card) {
			[
				"--dsh-fairy-composer-hole-contact-left",
				"--dsh-fairy-composer-hole-contact-top",
				"--dsh-fairy-composer-hole-contact-width",
				"--dsh-fairy-composer-hole-contact-height"
			].forEach((name) => card?.style?.removeProperty(name));
		}
		function syncMaterialLayer(layer, input, relatedInputs = [], clampValue = clamp) {
			if (typeof relatedInputs === "function") {
				clampValue = relatedInputs;
				relatedInputs = [];
			}
			if (!layer || !input) return;
			const layerRect = layer.getBoundingClientRect();
			const inputRect = unionRect([input, ...relatedInputs]);
			if (!inputRect) return;
			const left = clampValue(inputRect.left - layerRect.left, 0, layerRect.width);
			const top = clampValue(inputRect.top - layerRect.top, 0, layerRect.height);
			const right = clampValue(inputRect.right - layerRect.left, left, layerRect.width);
			const bottom = clampValue(inputRect.bottom - layerRect.top, top, layerRect.height);
			const geometry = layer._dshMaterial;
			if (!geometry) return;
			const styles = getComputedStyle(layer);
			const color = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
			geometry.patternBase.setAttribute("fill", color("--dsh-composer-polymer", "#3b4148"));
			geometry.patternGrainLight.setAttribute("fill", color("--dsh-composer-polymer-light", "rgba(255,255,255,.06)"));
			geometry.patternGrainDark.setAttribute("fill", color("--dsh-composer-polymer-dark", "rgba(0,0,0,.06)"));
			geometry.patternLight.setAttribute("stroke", color("--dsh-composer-polymer-stripe", "rgba(255,255,255,.12)"));
			const panelWidth = Math.max(1, layerRect.width);
			const panelHeight = Math.max(1, layerRect.height);
			geometry.sheen.setAttribute("x1", "0");
			geometry.sheen.setAttribute("y1", "0");
			geometry.sheen.setAttribute("x2", String(panelWidth));
			geometry.sheen.setAttribute("y2", String(panelHeight));
			geometry.sheenLight.setAttribute("stop-color", color("--dsh-composer-sheen-light", "rgba(255,255,255,.06)"));
			geometry.sheenMid.setAttribute("stop-color", "rgba(255,255,255,0)");
			geometry.sheenDark.setAttribute("stop-color", color("--dsh-composer-sheen-dark", "rgba(0,0,0,.07)"));
			geometry.ambient.setAttribute("cx", String(panelWidth * .16));
			geometry.ambient.setAttribute("cy", String(panelHeight * .04));
			geometry.ambient.setAttribute("r", String(Math.max(panelWidth, panelHeight) * .72));
			geometry.ambientLight.setAttribute("stop-color", color("--dsh-composer-ambient-light", "rgba(255,255,255,.045)"));
			geometry.ambientFade.setAttribute("stop-color", "rgba(255,255,255,0)");
			geometry.ambientEnd.setAttribute("stop-color", color("--dsh-composer-ambient-dark", "rgba(0,0,0,.035)"));
			layer.setAttribute("viewBox", "0 0 " + layerRect.width + " " + layerRect.height);
			geometry.outer.setAttribute("width", String(layerRect.width));
			geometry.outer.setAttribute("height", String(layerRect.height));
			geometry.hole.setAttribute("x", String(left));
			geometry.hole.setAttribute("y", String(top));
			geometry.hole.setAttribute("width", String(Math.max(0, right - left)));
			geometry.hole.setAttribute("height", String(Math.max(0, bottom - top)));
			geometry.hole.setAttribute("rx", "10");
			geometry.hole.setAttribute("ry", "10");
			const width = Math.max(0, right - left);
			const height = Math.max(0, bottom - top);
			const radius = Math.min(10, width / 2, height / 2);
			const roundedHole = [
				"M " + (left + radius) + " " + top,
				"H " + (right - radius),
				"A " + radius + " " + radius + " 0 0 1 " + right + " " + (top + radius),
				"V " + (bottom - radius),
				"A " + radius + " " + radius + " 0 0 1 " + (right - radius) + " " + bottom,
				"H " + (left + radius),
				"A " + radius + " " + radius + " 0 0 1 " + left + " " + (bottom - radius),
				"V " + (top + radius),
				"A " + radius + " " + radius + " 0 0 1 " + (left + radius) + " " + top,
				"Z"
			].join(" ");
			const facePath = "M 0 0 H " + layerRect.width + " V " + layerRect.height + " H 0 Z " + roundedHole;
			geometry.face.setAttribute("d", facePath);
			geometry.sheenFace.setAttribute("d", facePath);
			geometry.ambientFace.setAttribute("d", facePath);
			syncHoleContactGeometry(layer.parentElement, inputRect, clampValue);
			layer.style.setProperty("--dsh-fairy-composer-hole-left", left + "px");
			layer.style.setProperty("--dsh-fairy-composer-hole-top", top + "px");
			layer.style.setProperty("--dsh-fairy-composer-hole-right", right + "px");
			layer.style.setProperty("--dsh-fairy-composer-hole-bottom", bottom + "px");
		}
		module.exports = {
			createMaterialLayer,
			syncMaterialLayer,
			unionRect,
			syncHoleContactGeometry,
			clearHoleContactGeometry
		};
	}));

//#endregion
//#region src/client/composer-workspace-projection.js
	var require_composer_workspace_projection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function lastVisibleTextNode(node) {
			let textNode = null;
			const visit = (current) => {
				[...current?.childNodes || []].forEach((child) => {
					if (child.nodeType === 3) {
						if (child.nodeValue?.trim()) textNode = child;
						return;
					}
					visit(child);
				});
			};
			visit(node);
			return textNode;
		}
		function syncWorkspaceProjectionMode(projection, sessionLabel) {
			const modeOwner = projection?.querySelector?.("[data-dsh-fairy-composer-mode-control=\"true\"]") || null;
			const button = modeOwner?.querySelector?.("button") || null;
			const text = sessionLabel?.textContent?.trim() || "";
			if (!modeOwner || !button) return false;
			if (!text) {
				modeOwner.setAttribute("data-dsh-fairy-composer-mode-pending", "true");
				return false;
			}
			const textNode = lastVisibleTextNode(button);
			if (!textNode) {
				modeOwner.setAttribute("data-dsh-fairy-composer-mode-pending", "true");
				return false;
			}
			textNode.nodeValue = text;
			button.setAttribute("aria-label", text);
			button.setAttribute("title", sessionLabel.getAttribute?.("title") || text);
			modeOwner.removeAttribute("data-dsh-fairy-composer-mode-pending");
			return true;
		}
		function stripProjectionIdentity(node) {
			if (!node) return;
			node.removeAttribute("id");
			node.querySelectorAll("[id]").forEach((child) => child.removeAttribute("id"));
			node.setAttribute("aria-hidden", "true");
			node.setAttribute("inert", "");
		}
		function captureWorkspaceTemplate(workspaceRow) {
			if (!workspaceRow || workspaceRow.hasAttribute("data-dsh-fairy-composer-workspace-projection")) return null;
			const template = workspaceRow.cloneNode(true);
			template.querySelectorAll("[data-gitgraph-chip-anchor]").forEach((node) => node.remove());
			stripProjectionIdentity(template);
			template.removeAttribute("data-dsh-fairy-composer-workspace");
			template.removeAttribute("data-dsh-fairy-composer-workspace-projection");
			template.querySelectorAll("[data-dsh-fairy-composer-workspace]").forEach((node) => node.removeAttribute("data-dsh-fairy-composer-workspace"));
			return template;
		}
		function ensureWorkspaceProjection(stack, workspaceRow, workspaceTemplate, existingProjection) {
			if (workspaceRow) {
				existingProjection?.remove();
				return null;
			}
			if (!stack || !workspaceTemplate) {
				existingProjection?.remove();
				return null;
			}
			if (existingProjection?.isConnected && existingProjection.parentElement === stack) return existingProjection;
			existingProjection?.remove();
			const projection = workspaceTemplate.cloneNode(true);
			projection.setAttribute("data-dsh-fairy-composer-workspace", "true");
			projection.setAttribute("data-dsh-fairy-composer-workspace-projection", "true");
			stripProjectionIdentity(projection);
			projection.querySelectorAll("button").forEach((button) => {
				button.disabled = true;
				button.setAttribute("aria-disabled", "true");
				button.tabIndex = -1;
			});
			stack.appendChild(projection);
			return projection;
		}
		module.exports = {
			captureWorkspaceTemplate,
			ensureWorkspaceProjection,
			syncWorkspaceProjectionMode
		};
	}));

//#endregion
//#region src/client/composer-inset-synchronizer.js
	var require_composer_inset_synchronizer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function createInsetSynchronizer({ getScrollNodes, getHeight, requestFrame, cancelFrame, isDisposed }) {
			let frame = 0;
			let tracked = /* @__PURE__ */ new Map();
			const restorePadding = ({ node, padding, paddingPriority }) => {
				if (!node?.isConnected) return;
				if (padding === "") node.style.removeProperty("padding-bottom");
				else node.style.setProperty("padding-bottom", padding, paddingPriority);
				node.style.removeProperty("--dsh-fairy-composer-inset");
			};
			const sync = () => {
				frame = 0;
				const height = getHeight();
				const next = /* @__PURE__ */ new Map();
				getScrollNodes().forEach((node) => {
					const existing = tracked.get(node);
					const padding = existing?.padding ?? node.style.getPropertyValue("padding-bottom");
					const paddingPriority = existing?.paddingPriority ?? node.style.getPropertyPriority("padding-bottom");
					const basePadding = existing?.basePadding ?? getComputedStyle(node).paddingBottom;
					next.set(node, {
						node,
						padding,
						paddingPriority,
						basePadding
					});
					const insetValue = String(height) + "px";
					if (node.style.getPropertyValue("--dsh-fairy-composer-inset") !== insetValue) node.style.setProperty("--dsh-fairy-composer-inset", insetValue);
					const nextPadding = "calc(" + basePadding + " + " + height + "px)";
					if (node.style.getPropertyValue("padding-bottom") !== nextPadding || node.style.getPropertyPriority("padding-bottom") !== "important") node.style.setProperty("padding-bottom", nextPadding, "important");
				});
				tracked.forEach((previous, node) => {
					if (next.has(node)) return;
					restorePadding(previous);
				});
				tracked = next;
			};
			const schedule = () => {
				if (!frame && !isDisposed()) frame = requestFrame(sync);
			};
			const flush = () => {
				if (frame) cancelFrame(frame);
				frame = 0;
				sync();
			};
			const clear = () => {
				if (frame) cancelFrame(frame);
				frame = 0;
				tracked.forEach(restorePadding);
				tracked.clear();
			};
			return {
				schedule,
				flush,
				clear
			};
		}
		module.exports = { createInsetSynchronizer };
	}));

//#endregion
//#region src/client/chat-content-anchor.js
	var require_chat_content_anchor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { OFFICIAL_SELECTORS } = require_dom_adapter();
		const ANCHORED_CLASS = "dsh-fairy-chat-content-anchored";
		const ANCHOR_MIN_HEIGHT = "--dsh-fairy-chat-anchor-min-height";
		function createChatContentAnchor({ getFlowNodes, getComposerNode, requestFrame, cancelFrame, isDisposed }) {
			let frame = 0;
			let tracked = /* @__PURE__ */ new Map();
			let resizeObserver = null;
			let resizeNodes = /* @__PURE__ */ new Set();
			const restore = (node, previous) => {
				if (!previous.hadClass) node.classList.remove(ANCHORED_CLASS);
				if (previous.value === "") node.style.removeProperty(ANCHOR_MIN_HEIGHT);
				else node.style.setProperty(ANCHOR_MIN_HEIGHT, previous.value, previous.priority);
			};
			const sync = () => {
				frame = 0;
				if (isDisposed?.()) return;
				const composer = getComposerNode?.();
				const composerRect = composer?.getBoundingClientRect?.();
				const flows = [...getFlowNodes?.() || []].filter((node) => node?.isConnected && !node.parentElement?.closest(OFFICIAL_SELECTORS.chatFlow));
				const observed = new Set([composer, ...flows.map((node) => node.closest(OFFICIAL_SELECTORS.conversationScroll))].filter(Boolean));
				if (typeof ResizeObserver === "function" && (observed.size !== resizeNodes.size || [...observed].some((node) => !resizeNodes.has(node)))) {
					resizeObserver?.disconnect();
					resizeObserver = new ResizeObserver(schedule);
					observed.forEach((node) => resizeObserver.observe(node));
					resizeNodes = observed;
				}
				const next = /* @__PURE__ */ new Map();
				if (composerRect && composerRect.width >= 1 && composerRect.height >= 1) flows.forEach((node) => {
					const scroll = node.closest(OFFICIAL_SELECTORS.conversationScroll);
					if (!scroll) return;
					const rect = node.getBoundingClientRect();
					const scrollRect = scroll.getBoundingClientRect();
					if (rect.width < 1 || scrollRect.height < 1) return;
					const previous = tracked.get(node) || {
						value: node.style.getPropertyValue(ANCHOR_MIN_HEIGHT),
						priority: node.style.getPropertyPriority(ANCHOR_MIN_HEIGHT),
						hadClass: node.classList.contains(ANCHORED_CLASS)
					};
					next.set(node, previous);
					const flowTop = rect.top - scrollRect.top + scroll.scrollTop;
					const available = Math.min(composerRect.top, scrollRect.bottom) - scrollRect.top;
					const value = Math.max(0, Math.floor(available - flowTop)) + "px";
					if (node.style.getPropertyValue(ANCHOR_MIN_HEIGHT) !== value) node.style.setProperty(ANCHOR_MIN_HEIGHT, value);
					if (!node.classList.contains(ANCHORED_CLASS)) node.classList.add(ANCHORED_CLASS);
				});
				tracked.forEach((previous, node) => {
					if (!next.has(node)) restore(node, previous);
				});
				tracked = next;
			};
			function schedule() {
				if (!frame && !isDisposed?.()) frame = requestFrame(sync);
			}
			const flush = () => {
				if (frame) cancelFrame(frame);
				frame = 0;
				sync();
			};
			const clear = () => {
				if (frame) cancelFrame(frame);
				frame = 0;
				resizeObserver?.disconnect();
				resizeObserver = null;
				resizeNodes.clear();
				tracked.forEach((previous, node) => restore(node, previous));
				tracked.clear();
			};
			return {
				schedule,
				flush,
				clear
			};
		}
		module.exports = { createChatContentAnchor };
	}));

//#endregion
//#region src/client/to-bottom-positioner.js
	var require_to_bottom_positioner = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const SLOT_MARKER = "data-dsh-fairy-to-bottom-slot";
		const CONTROL_MARKER = "data-dsh-fairy-to-bottom-control";
		const OFFSET_PROPERTY = "--dsh-fairy-to-bottom-offset";
		const ROOT_BOTTOM_PROPERTY = "--dsh-fairy-to-bottom-bottom";
		const GAP = 12;
		const { toBottomControl } = require_dom_adapter();
		function createToBottomPositioner({ getScrollNodes, getComposerNode, requestFrame, cancelFrame, isDisposed }) {
			let frame = 0;
			let tracked = /* @__PURE__ */ new Map();
			let scrollNodes = /* @__PURE__ */ new Set();
			const controlMarkers = /* @__PURE__ */ new Map();
			let rootProperty = null;
			let rootPriority = "";
			const schedule = () => {
				if (!frame && !isDisposed()) frame = requestFrame(sync);
			};
			const bindScrollNodes = () => {
				const next = new Set((getScrollNodes?.() || []).filter(Boolean));
				scrollNodes.forEach((node) => {
					if (!next.has(node)) node.removeEventListener("scroll", schedule);
				});
				next.forEach((node) => {
					if (!scrollNodes.has(node)) node.addEventListener("scroll", schedule, { passive: true });
				});
				scrollNodes = next;
			};
			const restoreNode = ({ node, slot, property, priority }) => {
				if (slot?.isConnected) slot.removeAttribute(SLOT_MARKER);
				if (!node?.isConnected) return;
				if (property === "") node.style.removeProperty(OFFSET_PROPERTY);
				else node.style.setProperty(OFFSET_PROPERTY, property, priority);
			};
			const syncControlMarkers = (activeControls) => {
				activeControls.forEach((control) => {
					if (!controlMarkers.has(control)) controlMarkers.set(control, control.getAttribute(CONTROL_MARKER));
					control.setAttribute(CONTROL_MARKER, "true");
				});
				controlMarkers.forEach((previousValue, control) => {
					if (activeControls.has(control)) return;
					if (control.isConnected) {
						if (previousValue === null) control.removeAttribute(CONTROL_MARKER);
						else control.setAttribute(CONTROL_MARKER, previousValue);
					}
					controlMarkers.delete(control);
				});
			};
			const restoreRoot = () => {
				const root = document.documentElement;
				if (rootProperty === null) root.style.removeProperty(ROOT_BOTTOM_PROPERTY);
				else root.style.setProperty(ROOT_BOTTOM_PROPERTY, rootProperty, rootPriority);
				rootProperty = null;
				rootPriority = "";
			};
			function sync() {
				frame = 0;
				bindScrollNodes();
				const composerRect = getComposerNode?.()?.getBoundingClientRect?.();
				const next = /* @__PURE__ */ new Map();
				const activeControls = /* @__PURE__ */ new Set();
				let bottom = null;
				scrollNodes.forEach((node) => {
					const previous = tracked.get(node) || {
						node,
						slot: null,
						property: node.style.getPropertyValue(OFFSET_PROPERTY),
						priority: node.style.getPropertyPriority(OFFSET_PROPERTY)
					};
					const button = toBottomControl(node) || toBottomControl(document);
					if (button) activeControls.add(button);
					const slot = button?.closest?.(".toBottomSlot") || button?.parentElement || null;
					if (slot) slot.setAttribute(SLOT_MARKER, "true");
					if (previous.slot && previous.slot !== slot && previous.slot.isConnected) previous.slot.removeAttribute(SLOT_MARKER);
					if (composerRect && composerRect.height > 0) {
						const scrollRect = node.getBoundingClientRect();
						const inset = Math.ceil(Math.max(0, scrollRect.bottom - composerRect.top) + GAP);
						const nextOffset = `${inset}px`;
						if (node.style.getPropertyValue(OFFSET_PROPERTY) !== nextOffset || node.style.getPropertyPriority(OFFSET_PROPERTY) !== "important") node.style.setProperty(OFFSET_PROPERTY, nextOffset, "important");
						bottom = Math.max(bottom ?? 0, inset);
					}
					next.set(node, {
						node,
						slot,
						property: previous.property,
						priority: previous.priority
					});
				});
				syncControlMarkers(activeControls);
				if (bottom !== null) {
					const root = document.documentElement;
					if (rootProperty === null) {
						rootProperty = root.style.getPropertyValue(ROOT_BOTTOM_PROPERTY);
						rootPriority = root.style.getPropertyPriority(ROOT_BOTTOM_PROPERTY);
					}
					root.style.setProperty(ROOT_BOTTOM_PROPERTY, `${bottom}px`, "important");
				} else restoreRoot();
				tracked.forEach((previous, node) => {
					if (!next.has(node) || !node.isConnected) restoreNode(previous);
				});
				tracked = next;
			}
			const flush = () => {
				if (frame) cancelFrame(frame);
				frame = 0;
				sync();
			};
			const clear = () => {
				if (frame) cancelFrame(frame);
				frame = 0;
				scrollNodes.forEach((node) => node.removeEventListener("scroll", schedule));
				scrollNodes.clear();
				tracked.forEach(restoreNode);
				tracked.clear();
				syncControlMarkers(/* @__PURE__ */ new Set());
				restoreRoot();
			};
			return {
				schedule,
				flush,
				clear
			};
		}
		module.exports = { createToBottomPositioner };
	}));

//#endregion
//#region src/client/scroll-position-guard.js
	var require_scroll_position_guard = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
		const BOTTOM_EPSILON = 24;
		function captureScrollPositions(nodes) {
			const snapshots = /* @__PURE__ */ new Map();
			(nodes || []).forEach((node) => {
				if (!node || typeof node.scrollTop !== "number") return;
				const maxScrollTop = Math.max(0, node.scrollHeight - node.clientHeight);
				const distanceFromBottom = Math.max(0, maxScrollTop - node.scrollTop);
				snapshots.set(node, {
					scrollTop: node.scrollTop,
					distanceFromBottom,
					atBottom: distanceFromBottom <= BOTTOM_EPSILON
				});
			});
			return snapshots;
		}
		function restoreScrollPositions(snapshots) {
			snapshots?.forEach(({ scrollTop, atBottom }, node) => {
				if (!node?.isConnected) return;
				const maxScrollTop = Math.max(0, node.scrollHeight - node.clientHeight);
				const nextScrollTop = atBottom ? maxScrollTop : clamp(scrollTop, 0, maxScrollTop);
				if (Math.abs(node.scrollTop - nextScrollTop) > .5) node.scrollTop = nextScrollTop;
			});
		}
		module.exports = {
			captureScrollPositions,
			restoreScrollPositions
		};
	}));

//#endregion
//#region src/client/composer-session-rebinding.js
	var require_composer_session_rebinding = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { conversation, composerSeat, composerCard, anyPhase, conversationScrolls } = require_dom_adapter();
		function createComposerSessionResolver(documentRef = document) {
			const resolve = () => {
				const currentConversation = conversation(documentRef);
				const currentSeat = composerSeat(currentConversation);
				return {
					conversation: currentConversation,
					seat: currentSeat,
					card: composerCard(currentSeat),
					surface: anyPhase(currentConversation) || conversationScrolls(currentConversation)[0] || null
				};
			};
			return { resolve };
		}
		module.exports = { createComposerSessionResolver };
	}));

//#endregion
//#region src/client/pointer-drag.js
	var require_pointer_drag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const diagnostics = { error(operation, error, context = {}) {
			console.error(`DSH_FAIRY_LOG ${JSON.stringify({
				schema: 1,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				level: "error",
				module: "dsh-fairy-visual",
				operation,
				event: "failure",
				context,
				error: {
					name: String(error?.name || "Error"),
					message: String(error?.message || error).slice(0, 320)
				}
			})}`);
		} };
		function createPointerDrag({ getTarget, getLockNodes = () => [], onStart, onMove, onEnd, onCancel }) {
			let active = null;
			let releaseFrame = 0;
			let pendingLockNodes = [];
			const documentRef = typeof document !== "undefined" ? document : null;
			const scheduleFrame = (callback) => {
				if (typeof requestAnimationFrame === "function") return requestAnimationFrame(callback);
				return setTimeout(callback, 0);
			};
			const cancelFrame = (id) => {
				if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(id);
				else clearTimeout(id);
			};
			const cancelRelease = () => {
				if (!releaseFrame) return;
				cancelFrame(releaseFrame);
				releaseFrame = 0;
			};
			const releaseLocks = (nodes) => {
				cancelRelease();
				pendingLockNodes = nodes;
				const release = () => {
					releaseFrame = 0;
					nodes.forEach((node) => node?.removeAttribute("data-dragging"));
					if (pendingLockNodes === nodes) pendingLockNodes = [];
				};
				releaseFrame = scheduleFrame(release);
			};
			const releaseLocksImmediately = (nodes) => {
				nodes.forEach((node) => node?.removeAttribute("data-dragging"));
				if (pendingLockNodes === nodes) pendingLockNodes = [];
			};
			const removeWindowListeners = () => {
				window.removeEventListener("pointermove", onPointerMove, true);
				window.removeEventListener("pointerup", onPointerUp, true);
				window.removeEventListener("pointercancel", onPointerCancel, true);
				window.removeEventListener("blur", onWindowBlur, true);
				documentRef?.removeEventListener("visibilitychange", onDocumentVisibilityChange, true);
				window.removeEventListener("pagehide", onPageHide, true);
			};
			const finish = (event, commit, reason) => {
				if (!active) return false;
				const session = active;
				active = null;
				removeWindowListeners();
				try {
					if (commit) onEnd?.(event, session, reason);
					else onCancel?.(event, session, reason);
				} catch (error) {
					diagnostics.error("pointer-drag.finish", error, {});
				} finally {
					try {
						session.target?.releasePointerCapture?.(event?.pointerId ?? session.pointerId);
					} catch {}
					releaseLocks(session.lockNodes);
				}
				return true;
			};
			const onPointerMove = (event) => {
				if (!active || event.pointerId !== active.pointerId) return;
				event.preventDefault();
				try {
					onMove?.(event, active);
				} catch (error) {
					diagnostics.error("pointer-drag.move", error, {});
					finish(event, false, "error");
				}
			};
			const onPointerUp = (event) => {
				if (!active || event.pointerId !== active.pointerId) return;
				finish(event, true, "pointerup");
			};
			const onPointerCancel = (event) => {
				if (!active || event.pointerId !== active.pointerId) return;
				finish(event, false, "pointercancel");
			};
			const onWindowBlur = () => {
				finish(null, false, "blur");
			};
			const onDocumentVisibilityChange = () => {
				if (documentRef?.visibilityState === "hidden") finish(null, false, "visibilitychange");
			};
			const onPageHide = () => {
				finish(null, false, "pagehide");
			};
			const start = (event, payload) => {
				const target = getTarget();
				if (!target || event.button != null && event.button !== 0) return false;
				if (active) finish(null, false, "replaced");
				cancelRelease();
				event.preventDefault();
				const lockNodes = [.../* @__PURE__ */ new Set([target, ...getLockNodes()])].filter(Boolean);
				active = {
					pointerId: event.pointerId,
					target,
					payload,
					lockNodes
				};
				lockNodes.forEach((node) => node.setAttribute("data-dragging", "true"));
				try {
					target.setPointerCapture?.(event.pointerId);
				} catch {}
				window.addEventListener("pointermove", onPointerMove, true);
				window.addEventListener("pointerup", onPointerUp, true);
				window.addEventListener("pointercancel", onPointerCancel, true);
				window.addEventListener("blur", onWindowBlur, true);
				documentRef?.addEventListener("visibilitychange", onDocumentVisibilityChange, true);
				window.addEventListener("pagehide", onPageHide, true);
				try {
					onStart?.(event, active);
				} catch (error) {
					diagnostics.error("pointer-drag.start", error, {});
					finish(event, false, "error");
					return false;
				}
				return true;
			};
			const dispose = () => {
				const session = active;
				if (session) finish(null, false, "dispose");
				cancelRelease();
				releaseLocksImmediately(session?.lockNodes || pendingLockNodes);
				removeWindowListeners();
			};
			return {
				start,
				finish,
				dispose,
				get active() {
					return active;
				}
			};
		}
		module.exports = { createPointerDrag };
	}));

//#endregion
//#region src/client/composer-resize-controller.js
	var require_composer_resize_controller = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const HEIGHT_MIN = 132;
		const HEIGHT_MAX = 420;
		const CONTENT_MIN = 176;
		const { createPointerDrag } = require_pointer_drag();
		const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
		function createResizeController({ isEnabled, getSeat, getHeight, getRenderedHeight = getHeight, setHeight, schedule, scheduleInsets, flushInsets, persistHeight }) {
			let handle = null;
			let dragging = null;
			let pointerDrag = null;
			const maxHeight = () => {
				const viewportHeight = window.visualViewport?.height || window.innerHeight;
				return Math.max(HEIGHT_MIN, Math.min(HEIGHT_MAX, viewportHeight - CONTENT_MIN));
			};
			const updateHandle = () => {
				if (!handle) return;
				handle.setAttribute("aria-valuemin", String(HEIGHT_MIN));
				handle.setAttribute("aria-valuemax", String(Math.round(maxHeight())));
				handle.setAttribute("aria-valuenow", String(Math.round(getRenderedHeight())));
			};
			const updateHeight = (next, persist = false) => {
				const height = clamp(next, HEIGHT_MIN, maxHeight());
				setHeight(height);
				const seat = getSeat();
				if (seat) {
					const value = String(Math.round(getRenderedHeight())) + "px";
					seat.style.setProperty("height", value);
					seat.style.setProperty("--dsh-fairy-composer-height", value);
				}
				scheduleInsets();
				schedule();
				updateHandle();
				if (persist) {
					flushInsets();
					persistHeight(Math.round(height));
				}
			};
			function onPointerDown(event) {
				if (!isEnabled() || !handle) return;
				const payload = {
					pointerId: event.pointerId,
					startY: event.clientY,
					startHeight: getHeight(),
					handle
				};
				pointerDrag.start(event, payload);
			}
			const finishDragging = (event, persist) => {
				if (!pointerDrag?.active) return;
				pointerDrag.finish(event, persist, persist ? "manual" : "cancel");
			};
			pointerDrag = createPointerDrag({
				getTarget: () => handle,
				getLockNodes: () => [getSeat()],
				onStart: (_event, session) => {
					dragging = session.payload;
				},
				onMove: (event, session) => {
					const drag = session.payload;
					updateHeight(drag.startHeight - (event.clientY - drag.startY));
				},
				onEnd: () => {
					updateHeight(getHeight(), true);
					dragging = null;
				},
				onCancel: (_event, _session, reason) => {
					if (reason === "blur" || reason === "pointercancel") updateHeight(getHeight(), true);
					dragging = null;
				}
			});
			function onKeyDown(event) {
				if (!isEnabled()) return;
				if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Home" || event.key === "End") {
					event.preventDefault();
					const delta = event.key === "ArrowUp" ? 8 : event.key === "ArrowDown" ? -8 : 0;
					const next = event.key === "Home" ? HEIGHT_MIN : event.key === "End" ? HEIGHT_MAX : getHeight() + delta;
					updateHeight(next, true);
				}
			}
			const mount = () => {
				const seat = getSeat();
				if (!seat || handle) return;
				handle = document.createElement("div");
				handle.className = "dsh-fairy-composer-resizer";
				handle.setAttribute("role", "separator");
				handle.setAttribute("aria-orientation", "horizontal");
				handle.setAttribute("aria-label", "调整输入控制台高度");
				handle.tabIndex = 0;
				seat.appendChild(handle);
				handle.addEventListener("pointerdown", onPointerDown);
				handle.addEventListener("keydown", onKeyDown);
				updateHandle();
			};
			const unmount = () => {
				pointerDrag?.dispose();
				dragging = null;
				handle?.removeEventListener("pointerdown", onPointerDown);
				handle?.removeEventListener("keydown", onKeyDown);
				handle?.remove();
				handle = null;
			};
			return {
				mount,
				unmount,
				updateHeight,
				updateHandle,
				finishDragging,
				get handle() {
					return handle;
				},
				get dragging() {
					return dragging;
				}
			};
		}
		module.exports = {
			createResizeController,
			HEIGHT_MIN,
			HEIGHT_MAX,
			CONTENT_MIN
		};
	}));

//#endregion
//#region src/client/settings-write.js
	var require_settings_write = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const diagnostics = { error(operation, error, context = {}) {
			console.error(`DSH_FAIRY_LOG ${JSON.stringify({
				schema: 1,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				level: "error",
				module: "dsh-fairy-visual",
				operation,
				event: "failure",
				context,
				error: {
					name: String(error?.name || "Error"),
					message: String(error?.message || error).slice(0, 320)
				}
			})}`);
		} };
		function settingError(field, error) {
			diagnostics.error("settings.persist", error, { field });
		}
		function setControllerSetting(controller, field, value) {
			try {
				return Promise.resolve(controller.set(field, value));
			} catch (error) {
				return Promise.reject(error);
			}
		}
		function saveControllerSetting(controller, field, value) {
			return setControllerSetting(controller, field, value).catch((error) => {
				settingError(field, error);
			});
		}
		module.exports = {
			setControllerSetting,
			saveControllerSetting,
			settingError
		};
	}));

//#endregion
//#region src/client/mascot-scale-control.js
	var require_mascot_scale_control = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const CONTROL_ATTR = "data-dsh-fairy-mascot-scale-control";
		const BASE_ATTR = "data-dsh-fairy-mascot-scale-base";
		const INPUT_ATTR = "data-dsh-fairy-mascot-scale-input";
		const ROOT_ID = "dsh-fairy-root";
		const MASCOT_SCALE_MIN = .55;
		const MASCOT_SCALE_MAX = 1;
		const MASCOT_SCALE_STEP = .01;
		const MASCOT_SCALE_DEFAULT = 1;
		const MASCOT_GEOMETRY_EVENT = "dsh-fairy-mascot-geometry";
		const { setControllerSetting, settingError } = require_settings_write();
		function scaleProgress(value) {
			return (clampScale(value) - MASCOT_SCALE_MIN) / .44999999999999996 * 100;
		}
		function clampScale(value) {
			const numeric = Number(value);
			if (!Number.isFinite(numeric)) return MASCOT_SCALE_DEFAULT;
			const stepped = Math.round(numeric / MASCOT_SCALE_STEP) * MASCOT_SCALE_STEP;
			return Math.min(MASCOT_SCALE_MAX, Math.max(MASCOT_SCALE_MIN, Number(stepped.toFixed(2))));
		}
		function mascotRoot(documentRef = document) {
			return documentRef?.getElementById(ROOT_ID) || null;
		}
		function notifyMascotGeometry(documentRef = document, scale = MASCOT_SCALE_DEFAULT) {
			const target = documentRef?.defaultView || (typeof window !== "undefined" ? window : null);
			if (!target?.dispatchEvent || typeof CustomEvent !== "function") return;
			target.dispatchEvent(new CustomEvent(MASCOT_GEOMETRY_EVENT, { detail: { scale } }));
		}
		function applyMascotScale(value, documentRef = document) {
			const root = mascotRoot(documentRef);
			const float = root?.querySelector(".dsh-fairy-float");
			const eye = root?.querySelector(".dsh-fairy-outer-disc");
			if (!root || !float || !eye) return false;
			const scale = clampScale(value);
			float.style.transform = "none";
			const floatRect = float.getBoundingClientRect();
			const eyeRect = eye.getBoundingClientRect();
			const layoutWidth = float.offsetWidth || floatRect.width || 1;
			const layoutHeight = float.offsetHeight || floatRect.height || 1;
			const viewportScaleX = floatRect.width / layoutWidth || 1;
			const viewportScaleY = floatRect.height / layoutHeight || 1;
			const originX = (eyeRect.left + eyeRect.width * .5 - floatRect.left) / viewportScaleX;
			const originY = (eyeRect.top - floatRect.top) / viewportScaleY;
			float.style.transformOrigin = `${originX.toFixed(2)}px ${originY.toFixed(2)}px`;
			float.style.transform = `scale(${scale})`;
			root.style.setProperty("--dsh-fairy-mascot-scale", String(scale));
			root.setAttribute("data-dsh-fairy-mascot-scale", String(scale));
			notifyMascotGeometry(documentRef, scale);
			return true;
		}
		function scheduleMascotScale(value, documentRef = document) {
			let frame = 0;
			let attempts = 0;
			const run = () => {
				frame = 0;
				if (applyMascotScale(value, documentRef) || attempts++ >= 24) return;
				frame = requestAnimationFrame(run);
			};
			run();
			return () => {
				if (frame) cancelAnimationFrame(frame);
			};
		}
		function createMascotScaleBase(host, controller, documentRef = document) {
			if (!host) return null;
			const existing = host.querySelector?.(`[${BASE_ATTR}="true"]`);
			if (existing) {
				existing.removeAttribute("aria-hidden");
				const control = controller && !existing.querySelector(`[${CONTROL_ATTR}="true"]`) ? createMascotScaleControl(existing, controller, documentRef) : null;
				return {
					host,
					node: existing,
					dispose() {
						control?.dispose?.();
					}
				};
			}
			const shell = documentRef.createElement("span");
			shell.setAttribute(BASE_ATTR, "true");
			host.appendChild(shell);
			const control = controller ? createMascotScaleControl(shell, controller, documentRef) : null;
			return {
				host,
				node: shell,
				dispose() {
					control?.dispose?.();
					if (shell.parentElement === host) shell.remove();
				}
			};
		}
		function createMascotScaleControl(host, controller, documentRef = document) {
			if (!host || !controller) return null;
			const existing = host.querySelector(`[${CONTROL_ATTR}="true"]`);
			if (existing) return {
				host,
				node: existing,
				dispose() {}
			};
			const shell = documentRef.createElement("span");
			shell.setAttribute(CONTROL_ATTR, "true");
			shell.setAttribute("role", "group");
			shell.setAttribute("aria-label", "Fairy 眼睛大小");
			const input = documentRef.createElement("input");
			input.type = "range";
			input.setAttribute(INPUT_ATTR, "true");
			input.min = String(MASCOT_SCALE_MIN);
			input.max = String(MASCOT_SCALE_MAX);
			input.step = String(MASCOT_SCALE_STEP);
			input.setAttribute("aria-label", "Fairy 眼睛大小");
			shell.appendChild(input);
			host.appendChild(shell);
			let committed = clampScale(controller.getSnapshot?.().settings?.mascotScale);
			let interacting = false;
			let cancelPendingScale = null;
			const updateInput = (value) => {
				const scale = clampScale(value);
				input.value = String(scale);
				const progress = `${scaleProgress(scale).toFixed(2)}%`;
				input.style.setProperty("--dsh-fairy-scale", progress);
				shell.style.setProperty("--dsh-fairy-scale", progress);
				input.setAttribute("aria-valuetext", `${Math.round(scale * 100)}%`);
				input.title = `Fairy 眼睛大小 ${Math.round(scale * 100)}%`;
				cancelPendingScale?.();
				cancelPendingScale = scheduleMascotScale(scale, documentRef);
			};
			const commit = () => {
				const next = clampScale(input.value);
				input.value = String(next);
				if (next === committed) {
					interacting = false;
					return;
				}
				committed = next;
				interacting = false;
				setControllerSetting(controller, "mascotScale", next).catch((error) => {
					settingError("mascotScale", error);
					committed = clampScale(controller.getSnapshot?.().settings?.mascotScale);
					updateInput(committed);
				});
			};
			const onInput = () => updateInput(input.value);
			const onPointerDown = () => {
				interacting = true;
			};
			const onPointerUp = () => commit();
			const onPointerCancel = () => commit();
			const onBlur = () => {
				if (interacting) commit();
			};
			const onKeyDown = () => {
				interacting = true;
			};
			const onKeyUp = () => commit();
			const onChange = () => commit();
			input.addEventListener("input", onInput);
			input.addEventListener("pointerdown", onPointerDown);
			input.addEventListener("pointerup", onPointerUp);
			input.addEventListener("pointercancel", onPointerCancel);
			input.addEventListener("keydown", onKeyDown);
			input.addEventListener("keyup", onKeyUp);
			input.addEventListener("change", onChange);
			input.addEventListener("blur", onBlur);
			const off = controller.subscribe?.(() => {
				if (interacting) return;
				const next = clampScale(controller.getSnapshot?.().settings?.mascotScale);
				committed = next;
				updateInput(next);
			});
			updateInput(committed);
			return {
				host,
				node: shell,
				dispose() {
					cancelPendingScale?.();
					cancelPendingScale = null;
					off?.();
					input.removeEventListener("input", onInput);
					input.removeEventListener("pointerdown", onPointerDown);
					input.removeEventListener("pointerup", onPointerUp);
					input.removeEventListener("pointercancel", onPointerCancel);
					input.removeEventListener("keydown", onKeyDown);
					input.removeEventListener("keyup", onKeyUp);
					input.removeEventListener("change", onChange);
					input.removeEventListener("blur", onBlur);
					shell.remove();
				}
			};
		}
		module.exports = {
			MASCOT_SCALE_MIN,
			MASCOT_SCALE_MAX,
			MASCOT_SCALE_STEP,
			MASCOT_SCALE_DEFAULT,
			MASCOT_GEOMETRY_EVENT,
			applyMascotScale,
			scheduleMascotScale,
			createMascotScaleBase,
			createMascotScaleControl
		};
	}));

//#endregion
//#region src/client/mascot-animation-speed-control.js
	var require_mascot_animation_speed_control = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const BASE_ATTR = "data-dsh-fairy-mascot-animation-speed-base";
		const CONTROL_ATTR = "data-dsh-fairy-mascot-animation-speed-control";
		const TICK_ATTR = "data-dsh-fairy-mascot-animation-speed-tick";
		const THUMB_ATTR = "data-dsh-fairy-mascot-animation-speed-thumb";
		const POSITION_ATTR = "data-dsh-fairy-mascot-animation-speed-position";
		const SPEED_EVENT = "dsh-fairy-mascot-animation-speed";
		const SPEED_STOPS = Object.freeze([
			Object.freeze({
				position: 0,
				rate: .7,
				label: "0.7"
			}),
			Object.freeze({
				position: .5,
				rate: 1,
				label: "1"
			}),
			Object.freeze({
				position: 1,
				rate: 1.5,
				label: "1.5"
			})
		]);
		let selectedPosition = .5;
		function positionForRate(rate) {
			return SPEED_STOPS.find((stop) => stop.rate === rate)?.position ?? .5;
		}
		function bindVisualDrag(control, documentRef, options = {}) {
			if (!control || control.__dshFairySpeedDrag) return () => {};
			const positions = [
				0,
				.5,
				1
			];
			selectedPosition = positionForRate(options.initialRate);
			let dragging = false;
			const emitSpeed = (position) => {
				const stop = SPEED_STOPS.find((candidate) => candidate.position === position) || SPEED_STOPS[1];
				selectedPosition = stop.position;
				options.onChange?.(stop.rate);
				const target = documentRef?.defaultView || (typeof window !== "undefined" ? window : null);
				if (typeof CustomEvent !== "function" || !target?.dispatchEvent) return;
				target.dispatchEvent(new CustomEvent(SPEED_EVENT, { detail: {
					rate: stop.rate,
					position: stop.position
				} }));
			};
			const setPosition = (position, animate = true) => {
				control.setAttribute(POSITION_ATTR, String(position));
				control.setAttribute("data-dragging", animate ? "false" : "true");
			};
			const positionFromEvent = (event) => {
				const rect = control.getBoundingClientRect();
				if (!rect.width) return .5;
				return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
			};
			const snap = (value) => positions.reduce((closest, candidate) => Math.abs(candidate - value) < Math.abs(closest - value) ? candidate : closest, positions[0]);
			const onPointerMove = (event) => {
				if (!dragging) return;
				event.preventDefault();
				setPosition(snap(positionFromEvent(event)), false);
			};
			const onPointerUp = (event) => {
				if (!dragging) return;
				dragging = false;
				control.releasePointerCapture?.(event.pointerId);
				documentRef.removeEventListener("pointermove", onPointerMove);
				documentRef.removeEventListener("pointerup", onPointerUp);
				documentRef.removeEventListener("pointercancel", onPointerUp);
				const position = snap(positionFromEvent(event));
				setPosition(position, true);
				emitSpeed(position);
			};
			const onPointerDown = (event) => {
				if (event.button !== void 0 && event.button !== 0) return;
				dragging = true;
				control.setPointerCapture?.(event.pointerId);
				documentRef.addEventListener("pointermove", onPointerMove, { passive: false });
				documentRef.addEventListener("pointerup", onPointerUp);
				documentRef.addEventListener("pointercancel", onPointerUp);
				const position = snap(positionFromEvent(event));
				setPosition(position, false);
				emitSpeed(position);
				event.preventDefault();
			};
			control.addEventListener("pointerdown", onPointerDown, { passive: false });
			control.__dshFairySpeedDrag = true;
			setPosition(selectedPosition, true);
			return () => {
				control.removeEventListener("pointerdown", onPointerDown);
				documentRef.removeEventListener("pointermove", onPointerMove);
				documentRef.removeEventListener("pointerup", onPointerUp);
				documentRef.removeEventListener("pointercancel", onPointerUp);
				delete control.__dshFairySpeedDrag;
			};
		}
		function createMascotAnimationSpeedBase(host, documentRef = document, options = {}) {
			if (!host) return null;
			const existing = host.querySelector?.(`[${BASE_ATTR}="true"]`);
			if (existing) {
				const disposeDrag = bindVisualDrag(existing.querySelector(`[${CONTROL_ATTR}="true"]`), documentRef, options);
				return {
					host,
					node: existing,
					dispose() {
						disposeDrag();
						if (existing.parentElement === host) existing.remove();
					}
				};
			}
			const base = documentRef.createElement("span");
			base.setAttribute(BASE_ATTR, "true");
			base.setAttribute("aria-hidden", "true");
			const control = documentRef.createElement("span");
			control.setAttribute(CONTROL_ATTR, "true");
			[
				"0.7",
				"1",
				"1.5"
			].forEach((speed) => {
				const tick = documentRef.createElement("span");
				tick.setAttribute(TICK_ATTR, speed);
				tick.setAttribute("aria-hidden", "true");
				control.appendChild(tick);
			});
			const thumb = documentRef.createElement("span");
			thumb.setAttribute(THUMB_ATTR, "1");
			thumb.setAttribute("aria-hidden", "true");
			control.appendChild(thumb);
			base.appendChild(control);
			const disposeDrag = bindVisualDrag(control, documentRef, options);
			host.appendChild(base);
			return {
				host,
				node: base,
				dispose() {
					disposeDrag();
					if (base.parentElement === host) base.remove();
				}
			};
		}
		module.exports = {
			BASE_ATTR,
			CONTROL_ATTR,
			TICK_ATTR,
			THUMB_ATTR,
			POSITION_ATTR,
			SPEED_EVENT,
			SPEED_STOPS,
			createMascotAnimationSpeedBase
		};
	}));

//#endregion
//#region src/client/composer-dock.js
	var require_composer_dock = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const COMPOSER_ATTR = "data-dsh-fairy-composer-dock";
		const { OFFICIAL_ATTRIBUTES, conversationScrolls, chatFlows, inputScroll, sessionAgentPresetLabel, sessionHeaderActions } = require_dom_adapter();
		const { attachmentSlot, attachmentRail, attachmentRailHeight, attachmentDockHeight } = require_composer_attachments();
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		const { createManagedMutationObserver, getDomObserverManager } = require_dom_observer_manager();
		const { canPlaceNativeControlMarkers, placeNativeControlMarkers } = require_composer_native_controls();
		const { createMaterialLayer, syncMaterialLayer: syncMaterialLayerModule, clearHoleContactGeometry } = require_composer_material_layer();
		const { captureWorkspaceTemplate: captureWorkspaceTemplateModule, ensureWorkspaceProjection: ensureWorkspaceProjectionModule, syncWorkspaceProjectionMode: syncWorkspaceProjectionModeModule } = require_composer_workspace_projection();
		const { createInsetSynchronizer } = require_composer_inset_synchronizer();
		const { createChatContentAnchor } = require_chat_content_anchor();
		const { createToBottomPositioner } = require_to_bottom_positioner();
		const { captureScrollPositions, restoreScrollPositions } = require_scroll_position_guard();
		const { createComposerSessionResolver } = require_composer_session_rebinding();
		const { createResizeController, HEIGHT_MIN, HEIGHT_MAX, CONTENT_MIN } = require_composer_resize_controller();
		const { setControllerSetting, settingError } = require_settings_write();
		const { createMascotScaleBase } = require_mascot_scale_control();
		const { createMascotAnimationSpeedBase } = require_mascot_animation_speed_control();
		const MARKER_ATTRS = [
			COMPOSER_ATTR,
			"data-dsh-fairy-composer-row",
			"data-dsh-fairy-composer-tools",
			"data-dsh-fairy-composer-trailing",
			"data-dsh-fairy-composer-accessory",
			"data-dsh-fairy-composer-attachments",
			"data-dsh-fairy-composer-attachments-active",
			"data-dsh-fairy-composer-bar-root",
			"data-dsh-fairy-composer-bar-host",
			"data-dsh-fairy-composer-stack",
			"data-dsh-fairy-composer-workspace",
			"data-dsh-fairy-composer-chrome",
			"data-dsh-fairy-composer-send-control",
			"data-dsh-fairy-composer-context-control",
			"data-dsh-fairy-composer-interrupt-control",
			"data-dsh-fairy-composer-interruptible",
			"data-dsh-fairy-composer-native-footer",
			"data-dsh-fairy-composer-floating-context",
			"data-dsh-fairy-composer-output-control",
			"data-dsh-fairy-composer-voice-control",
			"data-dsh-fairy-composer-model-control",
			"data-dsh-fairy-composer-native-model-control",
			"data-dsh-fairy-composer-model-toolbar",
			"data-dsh-fairy-composer-toolbar-part",
			"data-dsh-fairy-composer-reasoning-control",
			"data-dsh-fairy-composer-command-control",
			"data-dsh-fairy-composer-branch-control",
			"data-dsh-fairy-composer-access-control",
			"data-dsh-fairy-composer-workspace-control",
			"data-dsh-fairy-composer-mode-control",
			"data-dsh-fairy-model-menu-open"
		];
		const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
		function clearMarker(node, name) {
			if (node?.isConnected) node.removeAttribute(name);
		}
		function clearMarkerTree(root, name) {
			clearMarker(root, name);
			root?.querySelectorAll?.(`[${name}]`).forEach((node) => clearMarker(node, name));
		}
		function mountComposerDock(controller) {
			const lifecycle = claimSingleton(document, "composer-dock", createLifecycleScope("composer-dock"));
			const domObserverManager = getDomObserverManager(document);
			let disposed = false;
			let frame = 0;
			let structureFrame = 0;
			let observer = null;
			let headerObserver = null;
			let resizeObserver = null;
			let conversation = null;
			let surface = null;
			let observedHeaderActions = null;
			let seat = null;
			let card = null;
			let clearControls = () => {};
			let mascotScaleBase = null;
			let mascotAnimationSpeedBase = null;
			let previousSeatStyle = null;
			let height = HEIGHT_MIN;
			let workspaceTemplate = null;
			let workspaceProjection = null;
			let materialLayer = null;
			let pendingPersistedHeight = null;
			const layoutFrameKey = {};
			const structureFrameKey = {};
			const sessionResolver = createComposerSessionResolver(document);
			const snapshot = () => controller.getSnapshot?.() || { settings: {} };
			const enabled = () => Boolean(snapshot().settings?.enabled);
			const readHeight = () => clamp(Number(snapshot().settings?.composerDockHeight) || HEIGHT_MIN, HEIGHT_MIN, HEIGHT_MAX);
			const effectiveHeight = () => pendingPersistedHeight ?? readHeight();
			const maximumDockHeight = () => {
				const viewportHeight = window.visualViewport?.height || window.innerHeight;
				return Math.max(HEIGHT_MIN, Math.min(HEIGHT_MAX, viewportHeight - CONTENT_MIN));
			};
			const renderedHeight = () => attachmentDockHeight(height, attachmentRailHeight(attachmentSlot(card)), HEIGHT_MIN, maximumDockHeight());
			const schedule = () => {
				if (!frame && !disposed) frame = domObserverManager.scheduleFrame(layoutFrameKey, sync);
			};
			const scheduleStructure = () => {
				if (!structureFrame && !disposed) structureFrame = domObserverManager.scheduleFrame(structureFrameKey, bind);
			};
			const bindHeaderObserver = () => {
				const nextHeaderActions = sessionHeaderActions(conversation);
				if (nextHeaderActions === observedHeaderActions) return;
				headerObserver?.disconnect();
				observedHeaderActions = nextHeaderActions;
				if (headerObserver && observedHeaderActions) headerObserver.observe(observedHeaderActions, {
					characterData: true,
					subtree: true
				});
			};
			const insetSynchronizer = createInsetSynchronizer({
				getScrollNodes: () => conversationScrolls(conversation),
				getHeight: renderedHeight,
				requestFrame: (callback) => requestAnimationFrame(callback),
				cancelFrame: (id) => cancelAnimationFrame(id),
				isDisposed: () => disposed
			});
			const clearScrollInsets = () => insetSynchronizer.clear();
			const scheduleScrollInsets = () => insetSynchronizer.schedule();
			const flushScrollInsets = () => insetSynchronizer.flush();
			const contentAnchor = createChatContentAnchor({
				getFlowNodes: () => chatFlows(conversation),
				getComposerNode: () => seat,
				requestFrame: (callback) => requestAnimationFrame(callback),
				cancelFrame: (id) => cancelAnimationFrame(id),
				isDisposed: () => disposed
			});
			const toBottomPositioner = createToBottomPositioner({
				getScrollNodes: () => conversationScrolls(conversation),
				getComposerNode: () => seat,
				requestFrame: (callback) => requestAnimationFrame(callback),
				cancelFrame: (id) => cancelAnimationFrame(id),
				isDisposed: () => disposed
			});
			let geometryStack = null;
			const { clearBranchGeometry, syncBranchGeometry } = require_composer_branch_position();
			const clearStackGeometry = () => {
				clearBranchGeometry(seat);
				clearHoleContactGeometry(geometryStack);
				geometryStack = null;
			};
			const removeMaterialLayer = () => {
				clearStackGeometry();
				materialLayer?.remove();
				clearHoleContactGeometry(card);
				materialLayer = null;
			};
			const ensureMaterialLayer = () => {
				if (!card) return null;
				if (materialLayer?.isConnected && materialLayer.parentElement === card) return materialLayer;
				removeMaterialLayer();
				materialLayer = createMaterialLayer(card);
				return materialLayer;
			};
			const syncMaterialLayer = () => {
				const layer = ensureMaterialLayer();
				syncMaterialLayerModule(layer, inputScroll(card), [attachmentRail(attachmentSlot(card))]);
				const nextStack = card?.closest('[data-dsh-fairy-composer-stack="true"]');
				if (geometryStack !== nextStack) clearStackGeometry();
				geometryStack = nextStack;
				if (geometryStack && card) {
					for (const dimension of ["left", "top", "width", "height"]) {
						const name = `--dsh-fairy-composer-hole-contact-${dimension}`;
						const value = card.style.getPropertyValue(name);
						if (geometryStack.style.getPropertyValue(name) !== value) {
							if (value) geometryStack.style.setProperty(name, value);
							else geometryStack.style.removeProperty(name);
						}
					}
				}
				syncBranchGeometry(seat, card);
			};
			const restoreSeat = ({ clearWorkspaceTemplate = false } = {}) => {
				contentAnchor.clear();
				toBottomPositioner.clear();
				clearScrollInsets();
				resizeObserver?.disconnect();
				resizeObserver = null;
				conversation = null;
				surface = null;
				if (clearWorkspaceTemplate) workspaceTemplate = null;
				if (!seat) return;
				workspaceProjection?.remove();
				workspaceProjection = null;
				removeMaterialLayer();
				removeMascotScaleBase();
				removeMascotAnimationSpeedBase();
				removeLegacyVoiceDensityMarker();
				seat.querySelector("[data-dsh-fairy-composer-stack=\"true\"]")?.removeAttribute("data-dsh-fairy-model-menu-open");
				MARKER_ATTRS.forEach((name) => clearMarkerTree(seat, name));
				clearControls();
				if (previousSeatStyle) Object.entries(previousSeatStyle).forEach(([name, { value, priority }]) => {
					if (value) seat.style.setProperty(name, value, priority);
					else seat.style.removeProperty(name);
				});
				else [
					"left",
					"width",
					"height",
					"bottom",
					"top",
					"position",
					"z-index",
					"--dsh-fairy-composer-height"
				].forEach((name) => seat.style.removeProperty(name));
				previousSeatStyle = null;
				removeHandle();
				seat = null;
				card = null;
			};
			const resizeController = createResizeController({
				isEnabled: enabled,
				getSeat: () => seat,
				getHeight: () => height,
				getRenderedHeight: renderedHeight,
				setHeight: (next) => {
					height = next;
				},
				schedule,
				scheduleInsets: scheduleScrollInsets,
				flushInsets: flushScrollInsets,
				persistHeight: (next) => {
					pendingPersistedHeight = next;
					const result = setControllerSetting(controller, "composerDockHeight", next);
					result.then(() => {
						if (readHeight() === next) pendingPersistedHeight = null;
						schedule();
					}).catch((error) => {
						settingError("composerDockHeight", error);
						pendingPersistedHeight = null;
						schedule();
					});
					return result;
				}
			});
			const removeHandle = () => resizeController.unmount();
			const createHandle = () => resizeController.mount();
			const updateHandle = () => resizeController.updateHandle();
			const removeLegacyMascotScaleControl = () => {
				seat?.querySelectorAll?.("[data-dsh-fairy-mascot-scale-control=\"true\"]").forEach((node) => {
					if (!node.closest?.("[data-dsh-fairy-mascot-scale-base=\"true\"]")) node.remove();
				});
			};
			const removeMascotScaleBase = () => {
				mascotScaleBase?.dispose?.();
				mascotScaleBase = null;
				seat?.querySelectorAll?.("[data-dsh-fairy-mascot-scale-base=\"true\"]").forEach((node) => node.remove());
			};
			const removeMascotAnimationSpeedBase = () => {
				mascotAnimationSpeedBase?.dispose?.();
				mascotAnimationSpeedBase = null;
				seat?.querySelectorAll?.("[data-dsh-fairy-mascot-animation-speed-base=\"true\"]").forEach((node) => node.remove());
			};
			const ensureMascotAnimationSpeedBase = () => {
				if (!card) return;
				if (mascotAnimationSpeedBase?.node?.isConnected && mascotAnimationSpeedBase.host === card) return;
				removeMascotAnimationSpeedBase();
				mascotAnimationSpeedBase = createMascotAnimationSpeedBase(card, document, {
					initialRate: Number(snapshot().settings?.mascotAnimationSpeed) || 1,
					onChange: (rate) => {
						const result = setControllerSetting(controller, "mascotAnimationSpeed", rate);
						result.catch((error) => settingError("mascotAnimationSpeed", error));
						return result;
					}
				});
			};
			const ensureMascotScaleBase = () => {
				if (!card) return;
				if (mascotScaleBase?.node?.isConnected && mascotScaleBase.host === card) return;
				removeMascotScaleBase();
				mascotScaleBase = createMascotScaleBase(card, controller);
			};
			const removeLegacyVoiceDensityMarker = (node = card) => {
				node?.removeAttribute?.("data-dsh-fairy-composer-voice-density");
			};
			const syncReasoningMenuLayer = () => {
				const stack = seat?.querySelector("[data-dsh-fairy-composer-stack=\"true\"]");
				if (!stack) return;
				if (Boolean(stack.querySelector("[data-dsh-fairy-composer-model-toolbar=\"true\"] [role=\"menu\"], [data-dsh-fairy-composer-model-toolbar=\"true\"][aria-expanded=\"true\"], [data-dsh-fairy-composer-model-toolbar=\"true\"] [aria-expanded=\"true\"]"))) {
					stack.setAttribute("data-dsh-fairy-model-menu-open", "true");
					seat.setAttribute("data-dsh-fairy-model-menu-open", "true");
				} else {
					stack.removeAttribute("data-dsh-fairy-model-menu-open");
					seat.removeAttribute("data-dsh-fairy-model-menu-open");
				}
			};
			const captureWorkspaceTemplate = (workspaceRow) => {
				const nextTemplate = captureWorkspaceTemplateModule(workspaceRow);
				if (nextTemplate) workspaceTemplate = nextTemplate;
			};
			const ensureWorkspaceProjection = (stack, workspaceRow) => {
				workspaceProjection = ensureWorkspaceProjectionModule(stack, workspaceRow, workspaceTemplate, workspaceProjection);
				syncWorkspaceProjectionModeModule(workspaceProjection, sessionAgentPresetLabel(conversation));
			};
			function sync() {
				frame = 0;
				if (!enabled()) {
					restoreSeat();
					return;
				}
				const resolvedSession = sessionResolver.resolve();
				const currentConversation = resolvedSession.conversation;
				const currentSeat = resolvedSession.seat;
				const currentCard = resolvedSession.card;
				if (currentSeat?.querySelector("[data-conversation-composer-overlay], [data-approval-key], [data-question-key], [data-plan-review-key]")) {
					restoreSeat();
					return;
				}
				if (!currentConversation || !currentSeat || !currentCard) {
					if (seat && (!seat.isConnected || !card?.isConnected)) restoreSeat();
					contentAnchor.clear();
					return;
				}
				const scrollPositionSnapshot = currentConversation === conversation ? captureScrollPositions(conversationScrolls(currentConversation)) : null;
				if (currentConversation !== conversation || currentSeat !== seat) {
					restoreSeat();
					conversation = currentConversation;
					seat = currentSeat;
					card = currentCard;
					removeLegacyVoiceDensityMarker();
					previousSeatStyle = {};
					[
						"left",
						"width",
						"height",
						"bottom",
						"top",
						"position",
						"z-index",
						"--dsh-fairy-composer-height"
					].forEach((name) => {
						previousSeatStyle[name] = {
							value: seat.style.getPropertyValue(name),
							priority: seat.style.getPropertyPriority(name)
						};
					});
					seat.setAttribute(COMPOSER_ATTR, "true");
					clearControls = placeNativeControlMarkers(card);
					createHandle();
				} else if (currentCard !== card) {
					clearControls();
					workspaceProjection?.remove();
					workspaceProjection = null;
					removeMaterialLayer();
					removeMascotScaleBase();
					removeMascotAnimationSpeedBase();
					removeLegacyVoiceDensityMarker(card);
					card = currentCard;
					removeLegacyVoiceDensityMarker();
					clearControls = placeNativeControlMarkers(card);
				}
				removeLegacyMascotScaleControl();
				ensureMascotScaleBase();
				ensureMascotAnimationSpeedBase();
				const workspaceRow = seat?.querySelector("[data-dsh-fairy-composer-workspace=\"true\"]:not([data-dsh-fairy-composer-workspace-projection=\"true\"])");
				if (workspaceRow) captureWorkspaceTemplate(workspaceRow);
				const stack = seat?.querySelector("[data-dsh-fairy-composer-stack=\"true\"]");
				ensureWorkspaceProjection(stack, workspaceRow);
				syncReasoningMenuLayer();
				const currentSurface = resolvedSession.surface;
				if (currentSurface !== surface) {
					resizeObserver?.disconnect();
					surface = currentSurface;
					if (surface && typeof ResizeObserver === "function") {
						resizeObserver = new ResizeObserver(schedule);
						resizeObserver.observe(surface);
					}
				}
				const rect = surface?.getBoundingClientRect();
				if (!rect || rect.width < 1 || rect.height < 1) return;
				if (!resizeController.dragging) height = readHeight();
				if (!resizeController.dragging && pendingPersistedHeight !== null) height = pendingPersistedHeight;
				seat.style.setProperty("left", `${Math.round(rect.left)}px`);
				// A hero surface may retain its preferred column width after resize.
				// Clip the fixed dock to the visible viewport rather than letting it overflow.
				const visibleWidth = Math.max(0, Math.min(rect.width, (window.visualViewport?.width || window.innerWidth) - rect.left));
				seat.style.setProperty("width", `${Math.round(visibleWidth)}px`);
				const displayHeight = renderedHeight();
				seat.style.setProperty("height", `${Math.round(displayHeight)}px`);
				seat.style.setProperty("--dsh-fairy-composer-height", `${Math.round(displayHeight)}px`);
				syncMaterialLayer();
				insetSynchronizer.flush();
				contentAnchor.flush();
				toBottomPositioner.flush();
				restoreScrollPositions(scrollPositionSnapshot);
				updateHandle();
			}
			function bind() {
				structureFrame = 0;
				if (!enabled()) return;
				const nextSession = sessionResolver.resolve();
				const nextConversation = nextSession.conversation;
				const nextSurface = nextSession.surface;
				if (nextConversation !== conversation || nextSurface !== surface) {
					resizeObserver?.disconnect();
					conversation = nextConversation;
					surface = nextSurface;
					if (conversation && typeof ResizeObserver === "function") {
						resizeObserver = new ResizeObserver(schedule);
						if (surface) resizeObserver.observe(surface);
					}
				}
				bindHeaderObserver();
				if (seat && card) {
					// Keep the last valid projection during DSH's transient control swap.
					// Rebinding an incomplete card would otherwise mark its remaining
					// children as accessories and collapse the input controls.
					if (canPlaceNativeControlMarkers(card)) {
						clearControls();
						clearControls = placeNativeControlMarkers(card);
					}
					removeLegacyMascotScaleControl();
				}
				const workspaceRow = seat?.querySelector("[data-dsh-fairy-composer-workspace=\"true\"]:not([data-dsh-fairy-composer-workspace-projection=\"true\"])");
				if (workspaceRow) captureWorkspaceTemplate(workspaceRow);
				ensureWorkspaceProjection(seat?.querySelector("[data-dsh-fairy-composer-stack=\"true\"]"), workspaceRow);
				syncReasoningMenuLayer();
				contentAnchor.schedule();
				toBottomPositioner.schedule();
				schedule();
			}
			const mutationObserver = createManagedMutationObserver((records) => {
				const headerPresetChanged = (record) => {
					const actions = sessionHeaderActions(conversation);
					const target = record.target?.nodeType === 1 ? record.target : record.target?.parentElement;
					return Boolean(actions && target && (target === actions || actions.contains?.(target)));
				};
				const composerStructureChanged = (record) => {
					if (record.type === "characterData") return headerPresetChanged(record);
					if (record.type === "childList") {
						if ((record.target?.nodeType === 1 ? record.target : record.target?.parentElement)?.closest?.(`[${OFFICIAL_ATTRIBUTES.composerSeat}]`)) return true;
						return [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(`[${OFFICIAL_ATTRIBUTES.composerSeat}]`) || node.querySelector?.(`[${OFFICIAL_ATTRIBUTES.composerSeat}]`)));
					}
					return record.attributeName === OFFICIAL_ATTRIBUTES.phase || record.attributeName === OFFICIAL_ATTRIBUTES.composerSeat || record.attributeName === OFFICIAL_ATTRIBUTES.slot || record.attributeName === "aria-expanded" || record.attributeName === "aria-label" && Boolean(record.target?.closest?.(`[${OFFICIAL_ATTRIBUTES.composerSeat}]`));
				};
				if (records.some((record) => headerPresetChanged(record) || composerStructureChanged(record))) scheduleStructure();
				if (records.some((record) => record.attributeName === "aria-expanded" || record.type === "childList")) syncReasoningMenuLayer();
			});
			observer = mutationObserver;
			mutationObserver.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: [
					OFFICIAL_ATTRIBUTES.phase,
					OFFICIAL_ATTRIBUTES.composerSeat,
					OFFICIAL_ATTRIBUTES.slot,
					"aria-expanded",
					"aria-label"
				]
			});
			headerObserver = createManagedMutationObserver(scheduleStructure);
			lifecycle.add(() => mutationObserver.disconnect(), "composer-dock:structure-observer");
			window.addEventListener("resize", schedule, { passive: true });
			window.visualViewport?.addEventListener("resize", schedule, { passive: true });
			lifecycle.add(() => window.removeEventListener("resize", schedule), "composer-dock:window-resize");
			lifecycle.add(() => window.visualViewport?.removeEventListener("resize", schedule), "composer-dock:viewport-resize");
			const off = controller.subscribe?.(() => {
				height = effectiveHeight();
				if (pendingPersistedHeight !== null && readHeight() === pendingPersistedHeight) pendingPersistedHeight = null;
				schedule();
			});
			bind();
			const cleanup = () => {
				disposed = true;
				domObserverManager.cancelFrame(layoutFrameKey);
				domObserverManager.cancelFrame(structureFrameKey);
				observer?.disconnect();
				headerObserver?.disconnect();
				observedHeaderActions = null;
				resizeObserver?.disconnect();
				off?.();
				window.removeEventListener("resize", schedule);
				window.visualViewport?.removeEventListener("resize", schedule);
				toBottomPositioner.clear();
				restoreSeat({ clearWorkspaceTemplate: true });
			};
			lifecycle.add(cleanup, "composer-dock:dispose");
			return () => lifecycle.dispose();
		}
		module.exports = { mountComposerDock };
	}));

//#endregion
//#region src/client/mascot-style.js
	var require_mascot_style = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const CSS = `
/* The host owns fixed positioning; this child fills the centered stage without intercepting input. */
[data-dsh-fairy-mascot-root="true"] {
	position: relative;
	width: min(76%, 36vh, 450px);
	height: min(76%, 36vh);
	aspect-ratio: 1;
	z-index: 99999;
	pointer-events: none;
	user-select: none;
	/* Keep the root as a non-composited overflow host. Safari clips transformed
	 * descendants to an ancestor's layout box when that ancestor owns opacity,
	 * isolation, or containment. Opacity is applied per visual SVG below. */
	overflow: visible;
}
[data-dsh-fairy-mascot-root="true"], [data-dsh-fairy-mascot-root="true"] * { box-sizing: border-box; }
html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-mascot-root="true"] .dsh-fairy-halo path,
html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-mascot-root="true"] .dsh-fairy-lash-pulse {
	stroke: #172531;
}
[data-dsh-fairy-mascot-root="true"] { --dsh-fairy-outer-halo-color: #c9f8ff; }
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-halo { color: #c9efff; }
html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-mascot-root="true"] { --dsh-fairy-outer-halo-color: #172531; }
html[data-dsh-fairy-visual][data-dsh-fairy-theme="light"] [data-dsh-fairy-mascot-root="true"] .dsh-fairy-halo { color: #172531; }
/* Low-power mode removes only the expensive decorative raster work. */
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-outer-disc,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-sclera,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-highlight-glow {
	filter: none;
}
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-outer-halo,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-sclera-halo,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-sclera-contact,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-highlight-halo {
	display: none;
}
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-halo,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-lash-pulse {
	display: none;
}
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-corners,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-lash-pulse-wave,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-sclera,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-layer-three,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-layer-two,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-layer-one,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-thinking-clip-shape,
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-comforting-clip-shape {
	will-change: auto;
}
/* The source image remains legible while a regular glitch is active. */
[data-dsh-fairy-mascot-root="true"][data-transition-glitch] .dsh-fairy-outer-disc,
[data-dsh-fairy-mascot-root="true"][data-transition-glitch] .dsh-fairy-sclera,
[data-dsh-fairy-mascot-root="true"][data-transition-glitch] .dsh-fairy-highlight-glow,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch] .dsh-fairy-outer-disc,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch] .dsh-fairy-sclera,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch] .dsh-fairy-highlight-glow {
	filter: none;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-float {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: visible;
}
[data-dsh-fairy-mascot-root="true"] svg {
	display: block;
	width: 100%;
	height: 100%;
	overflow: visible;
}
/* The expanding pulse has its own three-times viewport.  Its largest frame now
 * stays inside a real SVG viewport instead of relying on root-SVG overflow,
 * whose first-layout clipping differs across browser raster paths. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-pulse-layer {
	position: absolute;
	left: -100%;
	top: -100%;
	width: 300%;
	height: 300%;
	z-index: 0;
	opacity: .92;
	display: block;
	visibility: visible;
	pointer-events: none;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-halo-layer {
	position: absolute;
	left: -112.5%;
	top: -43.75%;
	width: 325%;
	height: 200%;
	z-index: 0;
	pointer-events: none;
	opacity: .92;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-main {
	position: relative;
	z-index: 1;
	/* The main eye is the opaque boundary; halo/pulse layers stay behind it. */
	opacity: 1;
}
/* The two glitch modes are mutually exclusive and selected by data-glitch. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal {
	transform-origin: 80px 80px;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch],
[data-dsh-fairy-mascot-root="true"][data-transition-glitch] .dsh-fairy-signal {
	/* Two full-surface chromatic drop shadows were the most expensive transient
	 * part of a fault. The retained level shift plus displacement preserves the
	 * glitch expression without rasterizing the eye two additional times. */
	will-change: transform, filter;
	filter:
		brightness(var(--dsh-g-bright, 1.12))
		contrast(var(--dsh-g-contrast, 1.18));
	transform: translateX(var(--dsh-g-x, 0)) skewX(var(--dsh-g-skew, 0deg));
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-image {
	opacity: 1;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-blocks {
	opacity: 0;
	display: none;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="threads"] > .dsh-fairy-image,
[data-dsh-fairy-mascot-root="true"][data-transition-glitch] .dsh-fairy-signal > .dsh-fairy-image {
	filter: url(#dsh-fairy-interference);
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="blocks"] .dsh-fairy-glitch-blocks {
	opacity: 1;
	display: block;
}
/* Block clones contain their own lash animation; freeze all copies on one frame. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="blocks"] .dsh-fairy-corners {
	animation: none !important;
	transform: rotate(var(--dsh-lash-angle, 0deg));
}
/* The five <use> slices inherit the eye's continuous animations. Pausing their
 * copies at the current frame keeps the same fractured image while avoiding five
 * extra pulse timelines and compositor layers for each short block fault. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="blocks"] .dsh-fairy-glitch-blocks .dsh-fairy-sclera,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="blocks"] .dsh-fairy-glitch-blocks .dsh-fairy-layer-three,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="blocks"] .dsh-fairy-glitch-blocks .dsh-fairy-layer-two,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal[data-glitch="blocks"] .dsh-fairy-glitch-blocks .dsh-fairy-layer-one {
	animation-play-state: paused !important;
	will-change: auto;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-1 { transform: translateX(var(--dsh-g-s1-x, 0)); }
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-2 { transform: translateX(var(--dsh-g-s2-x, 0)); }
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-3 { transform: translateX(var(--dsh-g-s3-x, 0)); }
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-4 { transform: translateX(var(--dsh-g-s4-x, 0)); }
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-5 { transform: translateX(var(--dsh-g-s5-x, 0)); }
/* Constant lash rotation plus staggered, continuous inside-to-outside eye breathing. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-corners {
	animation: dsh-fairy-lashes calc(15s / var(--dsh-fairy-steady-rate, 1)) linear infinite;
	animation-delay: var(--dsh-lash-delay, 0s);
	transform-origin: 80px 80px;
	will-change: transform;
}
/* Five nested strokes share one transform/opacity timeline. Their individual
 * stroke widths and opacities still form the same soft pulse without keeping
 * five identical SVG animation timelines alive. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-lash-pulse-wave {
	animation: dsh-fairy-lash-pulse var(--dsh-fairy-pulse-cycle, 4s) cubic-bezier(.42, 0, .22, 1) infinite;
	display: block;
	visibility: visible;
	opacity: 1;
	transform-box: view-box;
	transform-origin: 80px 80px;
	will-change: opacity, transform;
}
[data-dsh-fairy-mascot-root="true"][data-dsh-fairy-animation-rate=".7"] .dsh-fairy-lash-pulse-wave { animation-name: dsh-fairy-lash-pulse-slow; }
[data-dsh-fairy-mascot-root="true"][data-dsh-fairy-animation-rate="1.5"] .dsh-fairy-lash-pulse-wave { animation-name: dsh-fairy-lash-pulse-fast; }
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-eye {
	transform: scale(.90);
	transform-origin: 80px 80px;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-eye-flicker {
	opacity: 0;
	animation: none;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-image[data-flicker="true"] ~ .dsh-fairy-eye-flicker,
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-image[data-flicker="true"] .dsh-fairy-eye-flicker {
	animation: dsh-fairy-eye-flicker-overlay var(--dsh-fairy-flicker-duration, 210ms) cubic-bezier(.32, 0, .68, 1) both;
	will-change: opacity;
}
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-eye {
	animation: none !important;
	filter: none !important;
}
[data-dsh-fairy-mascot-root="true"][data-low-power] .dsh-fairy-eye-flicker {
	display: none !important;
}
[data-dsh-fairy-mascot-root="true"][data-state="thinking"] .dsh-fairy-eye {
	clip-path: url(#dsh-fairy-thinking-eye-clip);
}
[data-dsh-fairy-mascot-root="true"][data-state="comforting"] .dsh-fairy-eye {
	clip-path: url(#dsh-fairy-comforting-eye-clip);
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-thinking-clip-shape {
	animation: dsh-fairy-thinking-clip calc(.72s / var(--dsh-fairy-steady-rate, 1)) cubic-bezier(.72, 0, .28, 1) 0s infinite alternate;
	animation-play-state: paused;
	transform-box: view-box;
	transform-origin: 80px 60px;
	will-change: auto;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-comforting-clip-shape {
	animation: dsh-fairy-comforting-clip calc(.72s / var(--dsh-fairy-steady-rate, 1)) cubic-bezier(.72, 0, .28, 1) 0s infinite alternate;
	animation-play-state: paused;
	transform-box: view-box;
	transform-origin: 80px 60px;
	will-change: auto;
}
/* The runtime disables these fallback timelines and evaluates the active eyelid
 * path from MascotMotionClock, keeping thinking/comfort on the same phase as the eye. */
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-sclera {
	animation: dsh-fairy-pulse-outer calc(.72s / var(--dsh-fairy-steady-rate, 1)) cubic-bezier(.72, 0, .28, 1) 0s infinite alternate;
	transform-box: view-box;
	transform-origin: 80px 80px;
	will-change: transform;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-layer-three {
	animation: dsh-fairy-pulse-three calc(.72s / var(--dsh-fairy-steady-rate, 1)) cubic-bezier(.72, 0, .28, 1) calc(-.045s / var(--dsh-fairy-steady-rate, 1)) infinite alternate;
	transform-origin: 80px 80px;
	will-change: transform;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-layer-two {
	animation: dsh-fairy-pulse-two calc(.72s / var(--dsh-fairy-steady-rate, 1)) cubic-bezier(.72, 0, .28, 1) calc(-.09s / var(--dsh-fairy-steady-rate, 1)) infinite alternate;
	transform-origin: 80px 80px;
	will-change: transform;
}
[data-dsh-fairy-mascot-root="true"] .dsh-fairy-layer-one {
	animation: dsh-fairy-pulse-inner calc(.72s / var(--dsh-fairy-steady-rate, 1)) cubic-bezier(.72, 0, .28, 1) calc(-.18s / var(--dsh-fairy-steady-rate, 1)) infinite alternate;
	transform-origin: 80px 80px;
	will-change: transform;
}
/* Visual lifecycle is owned by the HDD host contract. Pausing the whole SVG
 * freezes every eye layer on its exact frame; resume code realigns the active
 * eyelid clip to the retained sclera phase before scheduling faults again. */
[data-dsh-fairy-mascot-root="true"][data-visual-suspended],
[data-dsh-fairy-mascot-root="true"][data-visual-suspended] * {
	animation-play-state: paused !important;
	will-change: auto !important;
}
/* Scanline texture stays static; moving this full-size rect continuously causes
 * a needless SVG repaint without changing the state expression. */
/* Correct Fairy arc: the center of the upper lid pushes downward, not upward. */
@keyframes dsh-fairy-thinking-clip {
	from { transform: translateY(14.5px) scaleY(.55); }
	to { transform: translateY(15.5px); }
}
@keyframes dsh-fairy-comforting-clip {
	from { transform: translateY(-4px); }
	to { transform: translateY(4px); }
}
@keyframes dsh-fairy-lash-pulse {
	0% { opacity: 0; transform: scale(.98); }
	/* Transform stays on one continuous 0%-36% path; only opacity steps down. */
	5% { opacity: .72; }
	12% { opacity: .52; }
	20% { opacity: .19; }
	27% { opacity: 0; }
	36%, 100% { opacity: 0; transform: scale(2.78); }
}
@keyframes dsh-fairy-lash-pulse-slow {
	0% { opacity: 0; transform: scale(.98); }
	3.9% { opacity: .72; }
	9.4% { opacity: .52; }
	15.7% { opacity: .19; }
	21.2% { opacity: 0; }
	28.3%, 100% { opacity: 0; transform: scale(2.78); }
}
@keyframes dsh-fairy-lash-pulse-fast {
	0% { opacity: 0; transform: scale(.98); }
	6.4% { opacity: .72; }
	15.3% { opacity: .52; }
	25.4% { opacity: .19; }
	34.3% { opacity: 0; }
	45.8%, 100% { opacity: 0; transform: scale(2.78); }
}
@keyframes dsh-fairy-lashes { to { transform: rotate(360deg); } }
@keyframes dsh-fairy-pulse-outer {
	/* Keep the fully expanded sclera just inside the lid edge so the ring
	 * never becomes visibly thinner than the calibrated resting thickness. */
	from { transform: scale(.985); }
	to { transform: scale(.91); }
}
@keyframes dsh-fairy-pulse-three {
	from { transform: scale(1); }
	to { transform: scale(.90); }
}
@keyframes dsh-fairy-pulse-two {
	from { transform: scale(1); }
	to { transform: scale(.87); }
}
@keyframes dsh-fairy-pulse-inner {
	from { transform: scale(1); }
	to { transform: scale(.85); }
}
@keyframes dsh-fairy-eye-flicker-overlay {
	0%, 100% { opacity: 0; }
	22% { opacity: var(--dsh-fairy-flicker-opacity-1, .04); }
	48% { opacity: var(--dsh-fairy-flicker-opacity-mid, .012); }
	72% { opacity: var(--dsh-fairy-flicker-opacity-2, .03); }
}
@media (max-width: 520px) {
	[data-dsh-fairy-mascot-root="true"] { width: min(76%, 31vh, 324px); height: min(76%, 31vh); }
}
@media (prefers-reduced-motion: reduce) {
	[data-dsh-fairy-mascot-root="true"] *, [data-dsh-fairy-mascot-root="true"] *::before, [data-dsh-fairy-mascot-root="true"] *::after {
		animation: none !important;
	}
		[data-dsh-fairy-mascot-root="true"] .dsh-fairy-signal {
			opacity: 1 !important;
			filter: none !important;
		transform: none !important;
	}
	[data-dsh-fairy-mascot-root="true"] .dsh-fairy-image { opacity: 1 !important; }
	[data-dsh-fairy-mascot-root="true"] .dsh-fairy-glitch-blocks { opacity: 0 !important; }
}
`;
		module.exports = CSS;
	}));

//#endregion
//#region src/client/mascot-effects-svg.js
	var require_mascot_effects_svg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function buildHaloLines() {
			const paths = /* @__PURE__ */ new Map();
			for (let y = -34; y <= 194; y += 1) {
				const t = y + 34;
				const leftWave = (Math.sin(t * .082 - 1.1) + .55 * Math.sin(t * .151 + 2.4) + 1.55) / 3.1;
				const rightWave = (Math.sin(t * .097 + 2.2) + .5 * Math.sin(t * .137 - 1.7) + 1.5) / 3;
				const leftLength = 158 + leftWave * 56;
				const length = leftLength + (158 + rightWave * 56);
				const brightness = .5 + (leftWave + rightWave) * .5 * .5;
				const x = 80 - leftLength;
				const key = Math.max(.5, Math.min(1, Math.round(brightness * 8) / 8)).toFixed(3);
				if (!paths.has(key)) paths.set(key, []);
				paths.get(key).push("M" + x.toFixed(2) + " " + (y + .25).toFixed(2) + "h" + length.toFixed(2));
			}
			return Array.from(paths.entries()).map(function(entry) {
				return "<path d=\"" + entry[1].join("") + "\" fill=\"none\" stroke=\"currentColor\" stroke-width=\".62\" stroke-linecap=\"butt\" opacity=\"" + entry[0] + "\"/>";
			}).join("");
		}
		const HALO_LINES = buildHaloLines();
		const PULSE_SVG = `
<svg class="dsh-fairy-pulse-layer" viewBox="-160 -160 480 480" xmlns="http://www.w3.org/2000/svg" role="presentation">
	<g class="dsh-fairy-lash-pulse" fill="none" stroke="#f4fdff">
		<g class="dsh-fairy-lash-pulse-wave">
			<circle cx="80" cy="80" r="52" stroke-width="20" stroke-opacity=".05"/>
			<circle cx="80" cy="80" r="52" stroke-width="16" stroke-opacity=".06"/>
			<circle cx="80" cy="80" r="52" stroke-width="12" stroke-opacity=".08"/>
			<circle cx="80" cy="80" r="52" stroke-width="8" stroke-opacity=".10"/>
			<circle cx="80" cy="80" r="52" stroke-width="4.5" stroke-opacity=".09"/>
		</g>
	</g>
</svg>`;
		const HALO_SVG = `
<svg class="dsh-fairy-halo dsh-fairy-halo-layer" viewBox="-180 -70 520 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
	<defs>
		<radialGradient id="dsh-fairy-halo-layer-fade" gradientUnits="userSpaceOnUse" color-interpolation="linearRGB" cx="80" cy="80" r="124">
			<stop offset="0" stop-color="black"/>
			<stop offset=".44" stop-color="black"/>
			<stop offset=".45" stop-color="white" stop-opacity=".08"/>
			<stop offset=".46" stop-color="white" stop-opacity=".30"/>
			<stop offset=".47" stop-color="white" stop-opacity=".65"/>
			<stop offset=".48" stop-color="white"/>
			<stop offset=".52" stop-color="white" stop-opacity=".72"/>
			<stop offset=".56" stop-color="white" stop-opacity=".56"/>
			<stop offset=".60" stop-color="white" stop-opacity=".44"/>
			<stop offset=".65" stop-color="white" stop-opacity=".30"/>
			<stop offset=".71" stop-color="white" stop-opacity=".19"/>
			<stop offset=".77" stop-color="white" stop-opacity=".135"/>
			<stop offset=".83" stop-color="white" stop-opacity=".09"/>
			<stop offset=".89" stop-color="white" stop-opacity=".058"/>
			<stop offset=".90" stop-color="white" stop-opacity=".052"/>
			<stop offset=".91" stop-color="white" stop-opacity=".046"/>
			<stop offset=".92" stop-color="white" stop-opacity=".039"/>
			<stop offset=".93" stop-color="white" stop-opacity=".032"/>
			<stop offset=".94" stop-color="white" stop-opacity=".025"/>
			<stop offset=".95" stop-color="white" stop-opacity=".019"/>
			<stop offset=".96" stop-color="white" stop-opacity=".013"/>
			<stop offset=".97" stop-color="white" stop-opacity=".0075"/>
			<stop offset=".98" stop-color="white" stop-opacity=".0035"/>
			<stop offset=".99" stop-color="white" stop-opacity=".001"/>
			<stop offset="1" stop-color="white" stop-opacity="0"/>
		</radialGradient>
		<mask id="dsh-fairy-halo-layer-mask" mask-type="luminance" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-260" y="-120" width="680" height="440">
			<rect x="-260" y="-120" width="680" height="440" fill="url(#dsh-fairy-halo-layer-fade)"/>
		</mask>
	</defs>
	<g mask="url(#dsh-fairy-halo-layer-mask)" opacity=".99">${HALO_LINES}</g>
</svg>`;
		module.exports = Object.freeze({
			PULSE_SVG,
			HALO_SVG
		});
	}));

//#endregion
//#region src/client/mascot-geometry.js
	var require_mascot_geometry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const MASCOT_GEOMETRY = Object.freeze({
			outerDiscRadius: 68,
			outerStrokeWidth: 1.2,
			outerHaloRadius: 79,
			scleraRadius: 48,
			scleraContactStrokeWidth: .8,
			scleraHaloRadius: 56,
			pupilRadius: 16,
			highlightCenter: Object.freeze({
				x: 98,
				y: 100.5
			}),
			highlightRadius: 11,
			highlightHaloRadius: 18
		});
		const finitePositive = (name, value) => {
			if (!Number.isFinite(value) || value <= 0) throw new Error(`Invalid Fairy geometry: ${name}`);
			return value;
		};
		for (const [name, value] of Object.entries(MASCOT_GEOMETRY)) {
			if (name === "highlightCenter") continue;
			finitePositive(name, value);
		}
		const outerVisibleEdge = finitePositive("outerVisibleEdge", MASCOT_GEOMETRY.outerDiscRadius + MASCOT_GEOMETRY.outerStrokeWidth / 2);
		const scleraVisibleEdge = finitePositive("scleraVisibleEdge", MASCOT_GEOMETRY.scleraRadius + MASCOT_GEOMETRY.scleraContactStrokeWidth / 2);
		const outerHaloPeak = outerVisibleEdge / finitePositive("outerHaloRadius", MASCOT_GEOMETRY.outerHaloRadius);
		const scleraHaloPeak = scleraVisibleEdge / finitePositive("scleraHaloRadius", MASCOT_GEOMETRY.scleraHaloRadius);
		const highlightHaloPeak = MASCOT_GEOMETRY.highlightRadius / finitePositive("highlightHaloRadius", MASCOT_GEOMETRY.highlightHaloRadius);
		for (const [edge, halo] of [
			[outerVisibleEdge, MASCOT_GEOMETRY.outerHaloRadius],
			[scleraVisibleEdge, MASCOT_GEOMETRY.scleraHaloRadius],
			[MASCOT_GEOMETRY.highlightRadius, MASCOT_GEOMETRY.highlightHaloRadius]
		]) if (edge >= halo) throw new Error("Invalid Fairy geometry: visible edge must be inside its halo radius");
		for (const [name, value] of Object.entries(MASCOT_GEOMETRY.highlightCenter)) if (!Number.isFinite(value)) throw new Error(`Invalid Fairy geometry: highlightCenter.${name}`);
		for (const [name, value] of Object.entries({
			outerHaloPeak,
			scleraHaloPeak,
			highlightHaloPeak
		})) if (!(value > 0 && value < 1)) throw new Error(`Invalid Fairy geometry ratio: ${name}`);
		const formatRatio = (value) => value.toFixed(3).replace(/^0/, "");
		module.exports = Object.freeze({
			...MASCOT_GEOMETRY,
			outerVisibleEdge,
			scleraVisibleEdge,
			outerHaloPeak,
			scleraHaloPeak,
			highlightHaloPeak,
			formatRatio
		});
	}));

//#endregion
//#region src/client/mascot-eye-svg.js
	var require_mascot_eye_svg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { outerDiscRadius, outerStrokeWidth, outerHaloRadius, outerVisibleEdge, outerHaloPeak, scleraRadius, scleraContactStrokeWidth, scleraHaloRadius, scleraHaloPeak, pupilRadius, highlightCenter, highlightRadius, highlightHaloRadius, highlightHaloPeak, formatRatio } = require_mascot_geometry();
		const SVG = `
<svg class="dsh-fairy-main" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="presentation">
	<defs>
		<!-- Color, glow, scanline, and horizontal-only displacement resources. -->
		<linearGradient id="dsh-fairy-outer-gradient" x1=".2" y1="0" x2=".8" y2="1">
			<stop stop-color="#4053f0"/>
			<stop offset=".54" stop-color="#3045dc"/>
			<stop offset="1" stop-color="#3d50c8"/>
		</linearGradient>
		<!-- One static radial field replaces separate halo strokes, avoiding alpha seams. -->
		<radialGradient id="dsh-fairy-sclera-halo-gradient" gradientUnits="userSpaceOnUse" cx="80" cy="80" r="${scleraHaloRadius}" color-interpolation="linearRGB">
			<stop offset=".82" stop-color="#ffffff" stop-opacity="0"/>
			<stop offset="${formatRatio(scleraHaloPeak)}" stop-color="#ffffff" stop-opacity=".22"/>
			<stop offset=".875" stop-color="#ffffff" stop-opacity=".28"/>
			<stop offset=".89" stop-color="#ffffff" stop-opacity=".19"/>
			<stop offset=".91" stop-color="#ffffff" stop-opacity=".11"/>
			<stop offset=".94" stop-color="#ffffff" stop-opacity=".07"/>
			<stop offset=".96" stop-color="#ffffff" stop-opacity=".035"/>
			<stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
		</radialGradient>
		<radialGradient id="dsh-fairy-outer-halo-gradient" gradientUnits="userSpaceOnUse" cx="80" cy="80" r="${outerHaloRadius}" color-interpolation="linearRGB">
			<stop offset=".80" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity="0"/>
			<stop offset=".84" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity=".10"/>
			<stop offset="${formatRatio(outerHaloPeak)}" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity=".28"/>
			<stop offset=".90" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity=".18"/>
			<stop offset=".95" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity=".06"/>
			<stop offset=".99" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity=".02"/>
			<stop offset="1" stop-color="var(--dsh-fairy-outer-halo-color)" stop-opacity="0"/>
		</radialGradient>
		<radialGradient id="dsh-fairy-highlight-halo-gradient" gradientUnits="userSpaceOnUse" cx="${highlightCenter.x}" cy="${highlightCenter.y}" r="${highlightHaloRadius}" color-interpolation="linearRGB">
			<stop offset=".53" stop-color="#f5f8fd" stop-opacity="0"/>
			<stop offset=".56" stop-color="#f5f8fd" stop-opacity=".16"/>
			<stop offset="${formatRatio(highlightHaloPeak)}" stop-color="#f5f8fd" stop-opacity=".43"/>
			<stop offset=".72" stop-color="#f5f8fd" stop-opacity=".19"/>
			<stop offset=".77" stop-color="#f5f8fd" stop-opacity=".12"/>
			<stop offset=".83" stop-color="#f5f8fd" stop-opacity=".055"/>
			<stop offset=".89" stop-color="#f5f8fd" stop-opacity=".02"/>
			<stop offset=".96" stop-color="#f5f8fd" stop-opacity=".004"/>
			<stop offset="1" stop-color="#f5f8fd" stop-opacity="0"/>
		</radialGradient>
		<pattern id="dsh-fairy-lines" width="4" height="4" patternUnits="userSpaceOnUse">
			<!-- Keep the internal scanline texture present but quieter against the eye. -->
			<rect width="4" height="1" fill="#c9f8ff" opacity=".055"/>
		</pattern>
			<!-- Blue is forced to 0.5 so the displacement map moves pixels horizontally only. -->
			<!-- Horizontal glitch noise is intentionally low-resolution. The map never
			     moves pixels vertically, so its filter cache needs less vertical coverage
			     and resolution while interpolation keeps the tear continuous. -->
			<filter id="dsh-fairy-interference" x="-30%" y="0%" width="160%" height="100%" filterRes="96 72" color-interpolation-filters="sRGB">
			<feTurbulence id="dsh-fairy-noise" type="fractalNoise" baseFrequency=".012 .72" numOctaves="1" seed="1" result="noise"/>
			<feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 0 0 .5  0 0 0 1 0" result="horizontal-noise"/>
			<feDisplacementMap id="dsh-fairy-displace" in="SourceGraphic" in2="horizontal-noise" scale="5" xChannelSelector="R" yChannelSelector="B"/>
		</filter>
		<clipPath id="dsh-fairy-disc-clip"><circle cx="80" cy="80" r="${outerDiscRadius - 1}"/></clipPath>
		<clipPath id="dsh-fairy-thinking-eye-clip">
			<path class="dsh-fairy-thinking-clip-shape" d="M20 60 Q80 90 140 60 V160 H20 Z"/>
			<!-- This fixed lower region prevents curve scaling from clipping the lower eye. -->
			<rect x="0" y="108" width="160" height="52"/>
		</clipPath>
		<!-- A shallow reversed arc gives Fairy the gentle, slightly drooped brow. -->
		<clipPath id="dsh-fairy-comforting-eye-clip">
			<path class="dsh-fairy-comforting-clip-shape" d="M20 60 Q80 30 140 60 V160 H20 Z"/>
			<rect x="0" y="108" width="160" height="52"/>
		</clipPath>
		<!-- These five rectangles are resized slightly for every block-glitch event. -->
		<clipPath id="dsh-fairy-slice-1"><rect x="4" y="12" width="152" height="25"/></clipPath>
		<clipPath id="dsh-fairy-slice-2"><rect x="4" y="37" width="152" height="28"/></clipPath>
		<clipPath id="dsh-fairy-slice-3"><rect x="4" y="65" width="152" height="26"/></clipPath>
		<clipPath id="dsh-fairy-slice-4"><rect x="4" y="91" width="152" height="30"/></clipPath>
		<clipPath id="dsh-fairy-slice-5"><rect x="4" y="121" width="152" height="27"/></clipPath>
		</defs>
	
		<g class="dsh-fairy-body">
	<!-- Stable outer radial halo stays outside the fault signal so it is not
	     filtered or duplicated by the block-glitch clones. -->
		<circle class="dsh-fairy-outer-halo" cx="80" cy="80" r="${outerHaloRadius}" fill="url(#dsh-fairy-outer-halo-gradient)"/>
	<g class="dsh-fairy-signal" data-fault-source="true">
	<!-- The complete normal visual. Glitch modes filter or slice this entire group. -->
	<g id="dsh-fairy-image" class="dsh-fairy-image">
		<circle class="dsh-fairy-outer-disc" cx="80" cy="80" r="${outerDiscRadius}" fill="url(#dsh-fairy-outer-gradient)" stroke="#f2fbff" stroke-width="${outerStrokeWidth}"/>
	<!-- Dark circle + square form the four rotating lashes / eyelids. -->
	<g class="dsh-fairy-corners" clip-path="url(#dsh-fairy-disc-clip)" fill="#2b3388">
		<!-- Slightly open the eye: reduce the lid ring without changing its silhouette. -->
		<circle cx="80" cy="80" r="51.75"/>
		<rect x="37" y="37" width="86" height="86" rx="2" transform="rotate(3 80 80)"/>
	</g>

	<!-- Eye anatomy: sclera, layered eyeball, pupil, then highlight. -->
	<g class="dsh-fairy-eye">
			<!-- One animated group keeps the vector rim pixel-locked to the sclera. -->
			<g class="dsh-fairy-sclera">
				<circle cx="80" cy="80" r="${scleraRadius}" fill="#eef0f5"/>
				<circle class="dsh-fairy-sclera-halo" cx="80" cy="80" r="${scleraHaloRadius}" fill="url(#dsh-fairy-sclera-halo-gradient)"/>
				<!-- A thin contact rim closes subpixel seams at the sclera/halo boundary. -->
				<circle class="dsh-fairy-sclera-contact" cx="80" cy="80" r="${scleraRadius}" fill="none" stroke="#ffffff" stroke-width="${scleraContactStrokeWidth}" stroke-opacity=".16"/>
			</g>
		<g class="dsh-fairy-eyeball">
			<circle class="dsh-fairy-layer-three" cx="80" cy="80" r="33" fill="#9daee0"/>
			<circle class="dsh-fairy-layer-two" cx="80" cy="80" r="24.15" fill="#eef0f5"/>
			<circle class="dsh-fairy-layer-two" cx="80" cy="80" r="23.5" fill="#317bcf"/>
			<circle class="dsh-fairy-layer-one" cx="80" cy="80" r="16.6" fill="none" stroke="#f5f8fd" stroke-width=".1"/>
			<circle class="dsh-fairy-layer-one" cx="80" cy="80" r="${pupilRadius}" fill="#3b3d8a"/>
				<g class="dsh-fairy-highlight dsh-fairy-layer-two">
					<circle class="dsh-fairy-highlight-halo" cx="${highlightCenter.x}" cy="${highlightCenter.y}" r="${highlightHaloRadius}" fill="url(#dsh-fairy-highlight-halo-gradient)"/>
					<circle class="dsh-fairy-highlight-glow" cx="${highlightCenter.x}" cy="${highlightCenter.y}" r="${highlightRadius}" fill="#f5f8fd"/>
			</g>
		</g>
	</g>
	<!-- Full-eye flicker layer stays outside the scaled eye group and is not part
	     of the fault clone source; it covers the disc and brows only. -->
	<circle class="dsh-fairy-eye-flicker" cx="80" cy="80" r="${outerVisibleEdge}" fill="#ffffff" pointer-events="none"/>

	<g clip-path="url(#dsh-fairy-disc-clip)" opacity=".42">
		<rect class="dsh-fairy-scanlines" x="12" y="10" width="136" height="146" fill="url(#dsh-fairy-lines)"/>
	</g>
	</g>
	<!-- Five complete-image clones clipped into horizontal blocks for left/right displacement. -->
	<g class="dsh-fairy-glitch-blocks">
		<use href="#dsh-fairy-image" class="dsh-fairy-glitch-1" clip-path="url(#dsh-fairy-slice-1)"/>
		<use href="#dsh-fairy-image" class="dsh-fairy-glitch-2" clip-path="url(#dsh-fairy-slice-2)"/>
		<use href="#dsh-fairy-image" class="dsh-fairy-glitch-3" clip-path="url(#dsh-fairy-slice-3)"/>
		<use href="#dsh-fairy-image" class="dsh-fairy-glitch-4" clip-path="url(#dsh-fairy-slice-4)"/>
		<use href="#dsh-fairy-image" class="dsh-fairy-glitch-5" clip-path="url(#dsh-fairy-slice-5)"/>
	</g>
	</g>
	</g>
		</svg>`;
		module.exports = SVG;
	}));

//#endregion
//#region src/client/mascot-assets.js
	var require_mascot_assets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const CSS = require_mascot_style();
		const { PULSE_SVG, HALO_SVG } = require_mascot_effects_svg();
		const SVG = require_mascot_eye_svg();
		const geometry = require_mascot_geometry();
		module.exports = Object.freeze({
			CSS,
			PULSE_SVG,
			HALO_SVG,
			SVG,
			geometry
		});
	}));

//#endregion
//#region src/client/mascot-motion-clock.js
	var require_mascot_motion_clock = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function createMascotMotionClock({ now = () => typeof performance !== "undefined" ? performance.now() : Date.now(), cycleMs = 1440, rate = 1 } = {}) {
			if (!Number.isFinite(cycleMs) || cycleMs <= 0) throw new Error("Invalid Fairy motion clock cycle");
			let epoch = now();
			let phase = 0;
			let currentRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
			let paused = false;
			let pausedAt = epoch;
			const read = () => {
				if (paused) return phase;
				const elapsed = Math.max(0, now() - epoch) * currentRate;
				return ((phase + elapsed / cycleMs) % 1 + 1) % 1;
			};
			return Object.freeze({
				phase: read,
				timeline: (nextCycleMs = cycleMs) => read() * nextCycleMs,
				rate: () => currentRate,
				setRate: (nextRate) => {
					const timestamp = now();
					phase = read();
					currentRate = Number.isFinite(nextRate) && nextRate > 0 ? nextRate : 1;
					epoch = timestamp;
					pausedAt = timestamp;
				},
				pause: () => {
					if (paused) return;
					pausedAt = now();
					phase = read();
					paused = true;
				},
				resume: () => {
					if (!paused) return;
					epoch = now();
					paused = false;
				},
				reset: () => {
					epoch = now();
					phase = 0;
					pausedAt = epoch;
					paused = false;
				},
				isPaused: () => paused,
				pausedAt: () => pausedAt
			});
		}
		module.exports = { createMascotMotionClock };
	}));

//#endregion
//#region src/client/mascot-event-scheduler.js
	var require_mascot_event_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function createMascotEventScheduler() {
			const tasks = /* @__PURE__ */ new Map();
			const schedule = (name, callback, delay) => {
				const previous = tasks.get(name);
				if (previous) clearTimeout(previous.timer);
				const entry = {
					token: (previous?.token || 0) + 1,
					timer: null
				};
				entry.timer = setTimeout(() => {
					if (tasks.get(name) !== entry) return;
					tasks.delete(name);
					callback();
				}, Math.max(0, Number(delay) || 0));
				tasks.set(name, entry);
				return entry.timer;
			};
			const cancel = (name) => {
				const entry = tasks.get(name);
				if (!entry) return;
				clearTimeout(entry.timer);
				tasks.delete(name);
			};
			return Object.freeze({
				schedule,
				cancel,
				cancelAll: () => [...tasks.keys()].forEach(cancel),
				has: (name) => tasks.has(name),
				activeCount: () => tasks.size
			});
		}
		module.exports = { createMascotEventScheduler };
	}));

//#endregion
//#region src/client/mascot-runtime.js
	var require_mascot_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createManagedMutationObserver } = require_dom_observer_manager();
		const { CSS, PULSE_SVG, HALO_SVG, SVG } = require_mascot_assets();
		const { createMascotMotionClock } = require_mascot_motion_clock();
		const { createMascotEventScheduler } = require_mascot_event_scheduler();
		function createMascotRuntime() {
			let mascotRuntime = null;
			(function fairyVisualRuntime() {
				if (typeof document === "undefined") return;
				const ROOT_ID = "dsh-fairy-root";
				const HOST_SELECTOR = ".dsh-fairy-stage";
				const STYLE_ID = "dsh-fairy-mascot-style";
				let root = null;
				let mountedHost = null;
				let mountedOwner = null;
				let mountGeneration = 0;
				let hostObserver = null;
				let observedHost = null;
				let glitchTimer = null;
				let animationRate = 1;
				let speedListener = null;
				let eyeFlickerToken = 0;
				let glitchToken = 0;
				let stateTransitionToken = 0;
				let appliedState = null;
				let signalElement = null;
				let scleraElement = null;
				let layerThreeElements = [];
				let layerTwoElements = [];
				let layerOneElements = [];
				let imageElement = null;
				let thinkingClipShape = null;
				let comfortingClipShape = null;
				let noiseElement = null;
				let displacementElement = null;
				let blockSliceRects = [];
				let motionQuery = null;
				let motionOwner = null;
				let motionGeneration = 0;
				const motionClock = createMascotMotionClock();
				const eventScheduler = createMascotEventScheduler();
				let visualSuspended = false;
				let requestedVisualActive = false;
				function isLifecycleVisible() {
					return document.visibilityState !== "hidden";
				}
				let lifecycleVisible = isLifecycleVisible();
				function isCurrentMount(owner, generation, stage) {
					return Boolean(owner && owner.active !== false && mountedOwner === owner && mountGeneration === generation && (!stage || mountedHost === stage));
				}
				function isValidOwner(owner, stage) {
					return Boolean(owner && owner.active !== false && owner.stage === stage);
				}
				function unbindMotionListener() {
					if (motionQuery && motionChangeListener) {
						if (typeof motionQuery.removeEventListener === "function") motionQuery.removeEventListener("change", motionChangeListener);
						else if (typeof motionQuery.removeListener === "function") motionQuery.removeListener(motionChangeListener);
					}
					motionQuery = null;
					motionChangeListener = null;
					motionOwner = null;
					motionGeneration = 0;
				}
				function cancelLifecycleResume() {
					if (lifecycleResumeFrame) cancelAnimationFrame(lifecycleResumeFrame);
					lifecycleResumeFrame = 0;
					lifecycleToken += 1;
				}
				function invalidateMountResources() {
					stopGlitch();
					cancelLifecycleResume();
					hostObserver?.disconnect();
					hostObserver = null;
					observedHost = null;
					unbindMotionListener();
					unbindLifecycleListeners();
					if (speedListener) window.removeEventListener("dsh-fairy-mascot-animation-speed", speedListener);
					speedListener = null;
					mountGeneration += 1;
				}
				let visualActiveInitialized = false;
				let lifecycleResumeFrame = 0;
				let motionFrame = 0;
				let lifecycleToken = 0;
				let motionChangeListener = null;
				let lifecycleVisibilityListener = null;
				let lifecyclePageHideListener = null;
				let lifecyclePageShowListener = null;
				let lifecycleListenerOwner = null;
				let lifecycleListenerGeneration = 0;
				let lastGlitchMode = Math.random() < .5 ? "threads" : "blocks";
				const FAULT_TIMING = Object.freeze({
					threads: Object.freeze({
						pulses: 4,
						gapMin: 30,
						gapMax: 42,
						fadeMin: 34,
						fadeMax: 76
					}),
					blocks: Object.freeze({
						gapMin: 56,
						gapMax: 104,
						fadeMin: 48,
						fadeMax: 96
					})
				});
				function randomBetween(min, max) {
					return min + Math.random() * (max - min);
				}
				function cacheVisualNodes() {
					signalElement = root ? root.querySelector(".dsh-fairy-signal") : null;
					scleraElement = root ? root.querySelector(".dsh-fairy-sclera") : null;
					imageElement = root ? root.querySelector(".dsh-fairy-image") : null;
					thinkingClipShape = root ? root.querySelector(".dsh-fairy-thinking-clip-shape") : null;
					comfortingClipShape = root ? root.querySelector(".dsh-fairy-comforting-clip-shape") : null;
					noiseElement = root ? root.querySelector("#dsh-fairy-noise") : null;
					displacementElement = root ? root.querySelector("#dsh-fairy-displace") : null;
					blockSliceRects = root ? Array.from(root.querySelectorAll("[id^=dsh-fairy-slice-] rect")) : [];
					layerThreeElements = root ? Array.from(root.querySelectorAll(".dsh-fairy-layer-three")) : [];
					layerTwoElements = root ? Array.from(root.querySelectorAll(".dsh-fairy-layer-two")) : [];
					layerOneElements = root ? Array.from(root.querySelectorAll(".dsh-fairy-layer-one")) : [];
					[
						scleraElement,
						...layerThreeElements,
						...layerTwoElements,
						...layerOneElements
					].forEach((element) => {
						if (element) element.style.animation = "none";
					});
					[thinkingClipShape, comfortingClipShape].forEach((element) => {
						if (element) element.style.animation = "none";
					});
				}
				function currentEyeMotionPhase() {
					return motionClock.phase();
				}
				function easeEyePhase(value) {
					const x = Math.max(0, Math.min(1, value));
					let low = 0;
					let high = 1;
					for (let i = 0; i < 12; i += 1) {
						const t = (low + high) / 2;
						if (3 * (1 - t) * (1 - t) * t * .72 + 3 * (1 - t) * t * t * .28 + t * t * t < x) low = t;
						else high = t;
					}
					const t = (low + high) / 2;
					return 3 * (1 - t) * t * t + t * t * t;
				}
				function readEyeProgress(phase) {
					const cyclePhase = (phase % 1 + 1) % 1;
					return easeEyePhase(cyclePhase <= .5 ? cyclePhase * 2 : 2 - cyclePhase * 2);
				}
				function normalizeMotionTargets(value) {
					return Array.isArray(value) ? value : value ? [value] : [];
				}
				function renderMotionFrame() {
					if (!root || visualSuspended) return;
					const phase = currentEyeMotionPhase();
					[
						[
							scleraElement,
							.985,
							.91,
							0
						],
						[
							layerThreeElements,
							1,
							.9,
							45
						],
						[
							layerTwoElements,
							1,
							.87,
							90
						],
						[
							layerOneElements,
							1,
							.85,
							180
						]
					].forEach(([elements, from, to, leadMs]) => {
						const targets = normalizeMotionTargets(elements);
						if (!targets.length) return;
						const progress = readEyeProgress(phase + leadMs / 1440);
						const transform = "scale(" + (from + (to - from) * progress).toFixed(6) + ")";
						targets.forEach((element) => {
							element.style.transform = transform;
						});
					});
					const state = root.getAttribute("data-state");
					const clip = state === "thinking" ? thinkingClipShape : state === "comforting" ? comfortingClipShape : null;
					[thinkingClipShape, comfortingClipShape].forEach((element) => {
						if (element && element !== clip) element.style.transform = "";
					});
					if (clip) {
						const clipProgress = readEyeProgress(phase);
						clip.style.willChange = "transform";
						clip.style.transform = state === "thinking" ? "translateY(" + (14.5 + clipProgress).toFixed(6) + "px) scaleY(" + (.55 + .45 * clipProgress).toFixed(6) + ")" : "translateY(" + (-4 + 8 * clipProgress).toFixed(6) + "px)";
					}
				}
				function startMotionLoop() {
					if (motionFrame || visualSuspended || !root) return;
					const tick = () => {
						motionFrame = 0;
						if (!root || visualSuspended) return;
						renderMotionFrame();
						motionFrame = requestAnimationFrame(tick);
					};
					renderMotionFrame();
					motionFrame = requestAnimationFrame(tick);
				}
				function stopMotionLoop() {
					if (motionFrame) cancelAnimationFrame(motionFrame);
					motionFrame = 0;
				}
				function alignEyeLayersToClock() {
					renderMotionFrame();
				}
				function pauseClipAnimation(shape) {
					if (!shape) return;
					shape.style.animationDelay = "0s";
					shape.style.animationPlayState = "paused";
					shape.style.willChange = "auto";
				}
				function synchronizeActiveClipPhase(nextState) {
					if (!root) return;
					alignEyeLayersToClock();
					pauseClipAnimation(thinkingClipShape);
					pauseClipAnimation(comfortingClipShape);
					if (nextState !== "normal" && !(motionQuery && motionQuery.matches)) renderMotionFrame();
				}
				function setBlockLayout() {
					const weights = [];
					let weightTotal = 0;
					for (let i = 0; i < 5; i += 1) {
						const weight = randomBetween(.9, 1.1);
						weights.push(weight);
						weightTotal += weight;
					}
					let y = 12;
					for (let i = 0; i < 5; i += 1) {
						const rect = blockSliceRects[i] || root && root.querySelector("#dsh-fairy-slice-" + (i + 1) + " rect");
						if (!rect) continue;
						const height = i === 4 ? 148 - y : 136 * weights[i] / weightTotal;
						rect.setAttribute("y", y.toFixed(1));
						rect.setAttribute("height", height.toFixed(1));
						y += height;
					}
				}
				function clearGlitchVisual() {
					if (!root) return;
					const signal = signalElement || root.querySelector(".dsh-fairy-signal");
					if (!signal) return;
					signal.removeAttribute("data-glitch");
					[
						"--dsh-g-x",
						"--dsh-g-skew",
						"--dsh-g-bright",
						"--dsh-g-contrast",
						"--dsh-g-s1-x",
						"--dsh-g-s2-x",
						"--dsh-g-s3-x",
						"--dsh-g-s4-x",
						"--dsh-g-s5-x"
					].forEach(function(name) {
						signal.style.removeProperty(name);
					});
				}
				function stopEyeFlicker() {
					eyeFlickerToken += 1;
					eventScheduler.cancel("flicker");
					if (imageElement) imageElement.removeAttribute("data-flicker");
					if (imageElement) [
						"--dsh-fairy-flicker-duration",
						"--dsh-fairy-flicker-opacity-1",
						"--dsh-fairy-flicker-opacity-mid",
						"--dsh-fairy-flicker-opacity-2"
					].forEach(function(name) {
						imageElement.style.removeProperty(name);
					});
				}
				function scheduleEyeFlicker(owner, generation) {
					if (!isCurrentMount(owner, generation) || eventScheduler.has("flicker") || !root || root.getAttribute("data-state") !== "normal" || root.hasAttribute("data-low-power") || visualSuspended || motionQuery && motionQuery.matches) return;
					const token = eyeFlickerToken;
					eventScheduler.schedule("flicker", function() {
						if (!isCurrentMount(owner, generation) || token !== eyeFlickerToken || !root || root.getAttribute("data-state") !== "normal" || root.hasAttribute("data-low-power") || visualSuspended || motionQuery && motionQuery.matches) return;
						if (!imageElement) imageElement = root.querySelector(".dsh-fairy-image");
						if (!imageElement) return;
						const duration = randomBetween(155, 255);
						imageElement.style.setProperty("--dsh-fairy-flicker-duration", duration.toFixed(0) + "ms");
						imageElement.style.setProperty("--dsh-fairy-flicker-opacity-1", randomBetween(.026, .048).toFixed(3));
						imageElement.style.setProperty("--dsh-fairy-flicker-opacity-mid", randomBetween(.006, .016).toFixed(3));
						imageElement.style.setProperty("--dsh-fairy-flicker-opacity-2", randomBetween(.018, .04).toFixed(3));
						imageElement.setAttribute("data-flicker", "true");
						eventScheduler.schedule("flicker", function() {
							if (imageElement) imageElement.removeAttribute("data-flicker");
							if (token === eyeFlickerToken) scheduleEyeFlicker(owner, generation);
						}, duration);
					}, randomBetween(1750, 3600) / animationRate);
				}
				function lockLashFrame(signal) {
					const corners = signal && signal.querySelector(".dsh-fairy-image .dsh-fairy-corners");
					if (!signal || !corners) return;
					const transform = window.getComputedStyle(corners).transform;
					let angle = 0;
					const match = transform && transform.match(/^matrix\(([^)]+)\)$/);
					if (match) {
						const values = match[1].split(",");
						const a = parseFloat(values[0]);
						const b = parseFloat(values[1]);
						if (Number.isFinite(a) && Number.isFinite(b)) angle = Math.atan2(b, a) * 180 / Math.PI;
					}
					const normalized = (angle + 360) % 360;
					signal.style.setProperty("--dsh-lash-angle", normalized.toFixed(3) + "deg");
					signal.style.setProperty("--dsh-lash-delay", (-normalized / 360 * 15).toFixed(4) + "s");
				}
				function setGlitchPulse(signal, mode, isTransition) {
					const style = signal.style;
					style.setProperty("--dsh-g-x", randomBetween(isTransition ? -1.6 : -.9, isTransition ? 1.6 : .9).toFixed(2) + "px");
					style.setProperty("--dsh-g-skew", randomBetween(isTransition ? -.32 : -.24, isTransition ? .32 : .24).toFixed(2) + "deg");
					style.setProperty("--dsh-g-bright", randomBetween(isTransition ? 1.06 : 1.02, isTransition ? 1.18 : 1.14).toFixed(2));
					style.setProperty("--dsh-g-contrast", randomBetween(isTransition ? 1.08 : 1.02, isTransition ? 1.22 : 1.16).toFixed(2));
					const noise = noiseElement;
					const displacement = displacementElement;
					if (mode === "threads") {
						const beginsThreadBurst = signal.getAttribute("data-glitch") !== "threads";
						if (beginsThreadBurst && noise) {
							noise.setAttribute("seed", String(Math.floor(randomBetween(1, 999))));
							noise.setAttribute("baseFrequency", randomBetween(.004, .011).toFixed(3) + " " + randomBetween(isTransition ? .78 : .65, isTransition ? 1.18 : 1).toFixed(2));
						}
						if (beginsThreadBurst && displacement) displacement.setAttribute("scale", randomBetween(isTransition ? 30 : 17, isTransition ? 46 : 29).toFixed(1));
					} else {
						if (!signal.hasAttribute("data-glitch")) lockLashFrame(signal);
						const slicePolarity = Math.random() < .5 ? -1 : 1;
						const sliceStrength = randomBetween(isTransition ? 4.2 : 1.4, isTransition ? 6.8 : 3);
						for (let i = 1; i <= 5; i += 1) {
							const offset = (i % 2 === 0 ? slicePolarity : -slicePolarity) * (sliceStrength + randomBetween(-.35, .35));
							style.setProperty("--dsh-g-s" + i + "-x", offset.toFixed(2) + "px");
						}
					}
					signal.setAttribute("data-glitch", mode);
				}
				function playStateTransition(nextState, owner, generation) {
					if (!isCurrentMount(owner, generation) || !root || visualSuspended || motionQuery && motionQuery.matches) return;
					stopGlitch();
					const signal = signalElement || root.querySelector(".dsh-fairy-signal");
					if (!signal) return;
					const token = ++stateTransitionToken;
					root.setAttribute("data-transition-target", nextState);
					function runBurst(pulseCount, blockPulseCount, keepVisual, onComplete) {
						let pulseIndex = 0;
						root.setAttribute("data-transition-glitch", "true");
						function pulse() {
							if (!isCurrentMount(owner, generation) || token !== stateTransitionToken || motionQuery && motionQuery.matches) return;
							if (pulseIndex < blockPulseCount) {
								if (pulseIndex === 0) setBlockLayout();
								setGlitchPulse(signal, "blocks", true);
							} else setGlitchPulse(signal, "threads", true);
							pulseIndex += 1;
							if (pulseIndex < pulseCount) {
								eventScheduler.schedule("transition", pulse, 40);
								return;
							}
							eventScheduler.schedule("transition", function() {
								if (!isCurrentMount(owner, generation) || token !== stateTransitionToken) return;
								if (!keepVisual) {
									root.removeAttribute("data-transition-glitch");
									clearGlitchVisual();
								}
								onComplete();
							}, 28);
						}
						pulse();
					}
					runBurst(2, 0, true, function() {
						if (!isCurrentMount(owner, generation) || token !== stateTransitionToken || motionQuery && motionQuery.matches) return;
						runBurst(6, 2, false, function() {
							if (!isCurrentMount(owner, generation) || token !== stateTransitionToken) return;
							root.removeAttribute("data-transition-target");
							scheduleGlitch(owner, generation);
							scheduleEyeFlicker(owner, generation);
						});
					});
				}
				function armGlitchTimer(callback, delay) {
					let timer = null;
					timer = eventScheduler.schedule("glitch", function() {
						if (glitchTimer === timer) glitchTimer = null;
						callback();
					}, delay);
					glitchTimer = timer;
					return timer;
				}
				function scheduleGlitch(owner, generation) {
					if (!isCurrentMount(owner, generation) || eventScheduler.has("glitch") || !root || visualSuspended || motionQuery && motionQuery.matches) return;
					const token = glitchToken;
					armGlitchTimer(function() {
						if (!isCurrentMount(owner, generation) || token !== glitchToken || !root || visualSuspended || motionQuery && motionQuery.matches) return;
						const signal = signalElement || root.querySelector(".dsh-fairy-signal");
						if (!signal) return;
						const mode = lastGlitchMode === "threads" ? "blocks" : "threads";
						lastGlitchMode = mode;
						if (mode === "blocks") setBlockLayout();
						const pulseCount = mode === "threads" ? FAULT_TIMING.threads.pulses : 2 * (1 + Math.floor(Math.random() * 2));
						let pulseIndex = 0;
						function pulse() {
							if (!isCurrentMount(owner, generation) || token !== glitchToken || visualSuspended || motionQuery && motionQuery.matches) return;
							setGlitchPulse(signal, mode);
							pulseIndex += 1;
							if (pulseIndex < pulseCount) {
								const timing = FAULT_TIMING[mode];
								armGlitchTimer(pulse, randomBetween(timing.gapMin, timing.gapMax));
							} else armGlitchTimer(function() {
								if (!isCurrentMount(owner, generation) || token !== glitchToken) return;
								clearGlitchVisual();
								scheduleGlitch(owner, generation);
							}, mode === "threads" ? randomBetween(FAULT_TIMING.threads.fadeMin, FAULT_TIMING.threads.fadeMax) : randomBetween(FAULT_TIMING.blocks.fadeMin, FAULT_TIMING.blocks.fadeMax));
						}
						pulse();
					}, randomBetween(2300, 4600) / animationRate);
				}
				function stopGlitch() {
					glitchToken += 1;
					stateTransitionToken += 1;
					eventScheduler.cancel("glitch");
					eventScheduler.cancel("transition");
					glitchTimer = null;
					if (root) root.removeAttribute("data-transition-glitch");
					if (root) root.removeAttribute("data-transition-target");
					clearGlitchVisual();
					stopEyeFlicker();
				}
				function ensureGlitchScheduler(owner, generation) {
					if (!isCurrentMount(owner, generation)) return;
					if (motionQuery && (motionOwner !== owner || motionGeneration !== generation)) unbindMotionListener();
					if (!motionQuery && typeof window !== "undefined" && typeof window.matchMedia === "function") {
						motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
						motionOwner = owner;
						motionGeneration = generation;
						motionChangeListener = function() {
							if (!isCurrentMount(owner, generation)) return;
							if (motionQuery.matches) {
								stopGlitch();
								synchronizeActiveClipPhase("normal");
							} else {
								synchronizeActiveClipPhase(root && root.getAttribute("data-state"));
								scheduleGlitch(owner, generation);
							}
						};
						if (typeof motionQuery.addEventListener === "function") motionQuery.addEventListener("change", motionChangeListener);
						else if (typeof motionQuery.addListener === "function") motionQuery.addListener(motionChangeListener);
					}
					if (visualSuspended || motionQuery && motionQuery.matches) {
						synchronizeActiveClipPhase("normal");
						return;
					}
					scheduleGlitch(owner, generation);
					scheduleEyeFlicker(owner, generation);
				}
				function ensureStyle() {
					if (document.getElementById(STYLE_ID)) return;
					const style = document.createElement("style");
					style.id = STYLE_ID;
					style.setAttribute("data-plugin", "dsh-fairy-visual");
					style.textContent = CSS;
					(document.head || document.documentElement).appendChild(style);
				}
				function setAnimationRate(nextRate) {
					const numericRate = typeof nextRate === "string" ? Number(nextRate) : nextRate;
					const rate = numericRate === .7 || numericRate === 1.5 ? numericRate : 1;
					const changed = rate !== animationRate;
					if (changed) motionClock.setRate(rate);
					animationRate = rate;
					if (!root) return;
					root.setAttribute("data-dsh-fairy-animation-rate", String(rate));
					root.style.setProperty("--dsh-fairy-steady-rate", String(rate));
					root.style.setProperty("--dsh-fairy-pulse-cycle", 1.44 + 2.56 / rate + "s");
					if (changed) {
						alignEyeLayersToClock();
						synchronizeActiveClipPhase(root.getAttribute("data-state"));
					}
					if (changed && !root.hasAttribute("data-transition-glitch") && !visualSuspended) {
						stopGlitch();
						if (root.getAttribute("data-state") === "normal") {
							scheduleGlitch(mountedOwner, mountGeneration);
							scheduleEyeFlicker(mountedOwner, mountGeneration);
						}
					}
				}
				function bindSpeedListener() {
					if (speedListener) return;
					speedListener = function(event) {
						setAnimationRate(event?.detail?.rate);
					};
					window.addEventListener("dsh-fairy-mascot-animation-speed", speedListener);
				}
				function build() {
					root = document.createElement("div");
					root.id = ROOT_ID;
					root.setAttribute("data-dsh-fairy-mascot-root", "true");
					root.setAttribute("aria-hidden", "true");
					root.innerHTML = "<div class=\"dsh-fairy-float\">" + HALO_SVG + PULSE_SVG + SVG + "</div>";
					return root;
				}
				function applyVisualState(nextState, playTransition, owner, generation) {
					if (!isCurrentMount(owner, generation) || !root) return;
					const normalized = nextState === "comforting" ? "comforting" : nextState === "thinking" ? "thinking" : "normal";
					if (appliedState === normalized && root.getAttribute("data-state") === normalized) {
						if (!visualSuspended) ensureGlitchScheduler(owner, generation);
						return;
					}
					const stateChanged = appliedState !== null && appliedState !== normalized;
					root.setAttribute("data-state", normalized);
					appliedState = normalized;
					if (visualSuspended) return;
					synchronizeActiveClipPhase(normalized);
					if (stateChanged && playTransition !== false) playStateTransition(normalized, owner, generation);
					else ensureGlitchScheduler(owner, generation);
				}
				function setVisualActive(active, owner, generation = mountGeneration) {
					if (!isCurrentMount(owner, generation)) return;
					requestedVisualActive = active === true;
					const nextActive = requestedVisualActive && lifecycleVisible;
					if (!root) {
						visualSuspended = !nextActive;
						return;
					}
					if (!nextActive) {
						stopMotionLoop();
						motionClock.pause();
						visualSuspended = true;
						lifecycleToken += 1;
						if (lifecycleResumeFrame) cancelAnimationFrame(lifecycleResumeFrame);
						lifecycleResumeFrame = 0;
						stopGlitch();
						root.setAttribute("data-visual-suspended", "true");
						return;
					}
					const shouldResume = !visualActiveInitialized || visualSuspended || root.hasAttribute("data-visual-suspended");
					visualActiveInitialized = true;
					if (!shouldResume) return;
					visualSuspended = false;
					motionClock.resume();
					root.removeAttribute("data-visual-suspended");
					startMotionLoop();
					const token = ++lifecycleToken;
					lifecycleResumeFrame = requestAnimationFrame(function() {
						if (!isCurrentMount(owner, generation) || token !== lifecycleToken || visualSuspended || !root) return;
						lifecycleResumeFrame = 0;
						synchronizeActiveClipPhase(root.getAttribute("data-state"));
						startMotionLoop();
						ensureGlitchScheduler(owner, generation);
					});
				}
				function bindLifecycleListeners(owner, generation) {
					if (lifecycleVisibilityListener && lifecycleListenerOwner === owner && lifecycleListenerGeneration === generation) return;
					unbindLifecycleListeners();
					lifecycleListenerOwner = owner;
					lifecycleListenerGeneration = generation;
					lifecycleVisibilityListener = function() {
						if (!isCurrentMount(owner, generation)) return;
						lifecycleVisible = isLifecycleVisible();
						setVisualActive(requestedVisualActive, owner, generation);
					};
					lifecyclePageHideListener = function() {
						if (!isCurrentMount(owner, generation)) return;
						lifecycleVisible = false;
						setVisualActive(requestedVisualActive, owner, generation);
					};
					lifecyclePageShowListener = function() {
						if (!isCurrentMount(owner, generation)) return;
						lifecycleVisible = isLifecycleVisible();
						setVisualActive(requestedVisualActive, owner, generation);
					};
					document.addEventListener("visibilitychange", lifecycleVisibilityListener);
					window.addEventListener("pagehide", lifecyclePageHideListener);
					window.addEventListener("pageshow", lifecyclePageShowListener);
				}
				function unbindLifecycleListeners() {
					if (!lifecycleVisibilityListener) return;
					document.removeEventListener("visibilitychange", lifecycleVisibilityListener);
					window.removeEventListener("pagehide", lifecyclePageHideListener);
					window.removeEventListener("pageshow", lifecyclePageShowListener);
					lifecycleVisibilityListener = null;
					lifecyclePageHideListener = null;
					lifecyclePageShowListener = null;
					lifecycleListenerOwner = null;
					lifecycleListenerGeneration = 0;
				}
				function mount(stageNode, owner, persistedRate) {
					if (!document.body) return;
					const stage = stageNode || owner?.stage;
					if (!isValidOwner(owner, stage) || stage.isConnected === false || typeof stage.matches === "function" && !stage.matches(HOST_SELECTOR)) return;
					if (mountedOwner && mountedOwner !== owner) dispose(mountedOwner);
					if (mountedOwner !== owner || mountedHost !== stage) {
						mountedOwner = owner;
						mountedHost = stage;
						mountGeneration += 1;
					}
					const stageRoot = stage.id !== ROOT_ID ? stage.querySelector("#" + ROOT_ID) : null;
					const previousRoot = root;
					const rootWasReparented = Boolean(root && root.parentNode !== stage);
					const nextRoot = stageRoot || root || build();
					if (previousRoot && nextRoot !== previousRoot || rootWasReparented) invalidateMountResources();
					root = nextRoot;
					root.setAttribute("data-dsh-fairy-mascot-root", "true");
					if (root.parentNode !== stage) {
						stage.appendChild(root);
						motionClock.reset();
						visualActiveInitialized = false;
					}
					if (root !== previousRoot) visualActiveInitialized = false;
					const generation = mountGeneration;
					bindLifecycleListeners(owner, generation);
					lifecycleVisible = isLifecycleVisible();
					ensureStyle();
					bindSpeedListener();
					cacheVisualNodes();
					setAnimationRate(persistedRate === void 0 ? animationRate : persistedRate);
					setVisualActive(stage.getAttribute("data-fairy-visual-active") === "true", owner, generation);
					const requestedState = stage.getAttribute("data-fairy-state");
					if (stage.getAttribute("data-fairy-low-power") === "true") root.setAttribute("data-low-power", "");
					else root.removeAttribute("data-low-power");
					applyVisualState(requestedState, true, owner, generation);
					if (!visualSuspended) startMotionLoop();
					if (stage !== observedHost || !hostObserver) {
						if (hostObserver) hostObserver.disconnect();
						observedHost = stage;
						if (typeof MutationObserver !== "undefined") {
							const observedGeneration = generation;
							hostObserver = createManagedMutationObserver(function() {
								if (isCurrentMount(owner, observedGeneration, stage)) mount(stage, owner);
							});
							hostObserver.observe(stage, { childList: true });
						}
					}
				}
				function dispose(owner) {
					if (owner && mountedOwner !== owner) return;
					if (mountedOwner) mountedOwner.active = false;
					invalidateMountResources();
					stopMotionLoop();
					mountedOwner = null;
					mountedHost = null;
					root?.remove();
					root = null;
					cacheVisualNodes();
					appliedState = null;
					motionClock.pause();
					visualSuspended = true;
					requestedVisualActive = false;
					lifecycleVisible = true;
					visualActiveInitialized = false;
					document.getElementById(STYLE_ID)?.remove();
				}
				mascotRuntime = {
					mount,
					setVisualActive,
					ownsHost: (owner) => mountedOwner === owner || mountedHost === owner,
					ownsOwner: (owner) => mountedOwner === owner,
					activeTimerCount: () => eventScheduler.activeCount(),
					dispose
				};
			})();
			return mascotRuntime;
		}
		module.exports = { createMascotRuntime };
	}));

//#endregion
//#region src/client/semantic-markers.js
	var require_semantic_markers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		const SEMANTIC_MARKERS = Object.freeze([
			"data-dsh-fairy-background-surface",
			"data-dsh-fairy-sidebar-layer",
			"data-dsh-fairy-sidebar-content",
			"data-dsh-fairy-sidebar-collapsed-content",
			"data-dsh-fairy-history-surface",
			"data-dsh-fairy-history-fade",
			"data-dsh-fairy-active-folder",
			"data-dsh-fairy-selected-session",
			"data-dsh-fairy-brand-anchor",
			"data-dsh-fairy-sidebar-open-control",
			"data-dsh-fairy-native-new-session",
			"data-dsh-fairy-hero-native-copy",
			"data-dsh-fairy-version-navigation",
			"data-dsh-fairy-header-row",
			"data-dsh-fairy-header-title-row",
			"data-dsh-fairy-header-title-cluster",
			"data-dsh-fairy-header-utilities-shell",
			"data-dsh-fairy-header-actions-cluster",
			"data-dsh-fairy-header-utilities-cluster",
			"data-dsh-fairy-header-session-log",
			"data-dsh-fairy-header-session-agent-preset",
			"data-dsh-fairy-composer-seat",
			"data-dsh-fairy-composer-controls",
			"data-dsh-fairy-send-button",
			"data-dsh-fairy-overlay-layer"
		]);
		function createSemanticMarkerMap() {
			return new Map(SEMANTIC_MARKERS.map((name) => [name, /* @__PURE__ */ new Set()]));
		}
		function markSemanticNode(markerMap, node, name) {
			const nodes = markerMap.get(name);
			if (!nodes) throw new Error(`[dsh-fairy-visual] unregistered semantic marker: ${name}`);
			if (node) nodes.add(node);
		}
		function mutationTouchesSemanticSurface(records, selector) {
			const visited = /* @__PURE__ */ new WeakSet();
			return records.some((record) => {
				const target = record.target?.nodeType === 1 ? record.target : record.target?.parentElement;
				if (record.type === "attributes") return Boolean(target?.closest?.(selector));
				if (record.type !== "childList") return false;
				return [...record.addedNodes, ...record.removedNodes].some((node) => {
					if (node.nodeType !== 1 || visited.has(node)) return false;
					visited.add(node);
					return node.matches?.(selector) || node.querySelector?.(selector);
				});
			});
		}
		function claimSemanticMarkers(documentRef) {
			return claimSingleton(documentRef, "semantic-markers", createLifecycleScope("semantic-markers"));
		}
		module.exports = {
			SEMANTIC_MARKERS,
			createSemanticMarkerMap,
			markSemanticNode,
			mutationTouchesSemanticSurface,
			claimSemanticMarkers
		};
	}));

//#endregion
//#region src/client/semantic-markers-manager.js
	var require_semantic_markers_manager = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { getDomObserverManager, createManagedMutationObserver } = require_dom_observer_manager();
		const { createSemanticMarkerMap, markSemanticNode, mutationTouchesSemanticSurface, claimSemanticMarkers } = require_semantic_markers();
		const { OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES, SEMANTIC_SURFACE_SELECTOR, rootSlot, sidebar, shellOverlay, settingsDialog, sidebarOpenControl, sidebarCollapseControl, sessionTree, expandedSessionItems, selectedSessionItems, newSessionButtons, sidebarBrandButton, conversation, phase, sessionHeader, sessionHeaderActions, sessionHeaderUtilities, sessionAgentPresetLabel, headerElement, composerSeat, composerCard, sendOnlyButton, undoControl, redoControl, reportMissingCapabilities } = require_dom_adapter();
		const domObserverManager = getDomObserverManager(document);
		function install(lifecycle = claimSemanticMarkers(document)) {
			const semanticFrameKey = {};
			let observer = null;
			const owned = createSemanticMarkerMap();
			let modalOpen = false;
			const clear = () => {
				owned.forEach((nodes, name) => {
					nodes.forEach((node) => {
						if (node.isConnected) node.removeAttribute(name);
					});
					nodes.clear();
				});
			};
			const sync = () => {
				const desired = createSemanticMarkerMap();
				const mark = (node, name) => markSemanticNode(desired, node, name);
				const rootFrame = rootSlot(document)?.firstElementChild;
				mark(rootFrame, "data-dsh-fairy-background-surface");
				mark(shellOverlay(document)?.parentElement, "data-dsh-fairy-overlay-layer");
				const nextModalOpen = Boolean(settingsDialog(document));
				if (nextModalOpen !== modalOpen) {
					modalOpen = nextModalOpen;
					document.documentElement.toggleAttribute("data-dsh-fairy-modal-open", modalOpen);
				}
				const side = sidebar(document);
				const sidebarContent = side?.firstElementChild;
				const sidebarLayer = side?.parentElement;
				const openSidebarControl = sidebarOpenControl(document);
				mark(sidebarLayer, "data-dsh-fairy-sidebar-layer");
				mark(sidebarContent, "data-dsh-fairy-sidebar-content");
				mark(openSidebarControl, "data-dsh-fairy-sidebar-open-control");
				if (openSidebarControl) mark(sidebarContent, "data-dsh-fairy-sidebar-collapsed-content");
				const tree = sessionTree(side);
				const historySurface = tree?.parentElement?.parentElement;
				mark(historySurface, "data-dsh-fairy-history-surface");
				mark(tree?.nextElementSibling, "data-dsh-fairy-history-fade");
				expandedSessionItems(tree).forEach((node) => mark(node, "data-dsh-fairy-active-folder"));
				selectedSessionItems(tree).forEach((node) => mark(node, "data-dsh-fairy-selected-session"));
				const newSessionControls = newSessionButtons(side);
				const brandCandidate = sidebarBrandButton(side);
				const ownedBrand = !(Boolean(openSidebarControl) || !sidebarCollapseControl(document)) ? brandCandidate : null;
				mark(ownedBrand, "data-dsh-fairy-brand-anchor");
				newSessionControls.filter((button) => button !== ownedBrand).forEach((button) => mark(button, "data-dsh-fairy-native-new-session"));
				const stage = conversation(document);
				const currentPhase = phase(stage);
				const header = sessionHeader(currentPhase);
				const actions = sessionHeaderActions(currentPhase);
				const utilities = sessionHeaderUtilities(currentPhase);
				mark(header, "data-dsh-fairy-header-row");
				const titleRow = [...headerElement(header)?.children || []].find((node) => actions && utilities && node.contains(actions) && node.contains(utilities));
				mark(titleRow, "data-dsh-fairy-header-title-row");
				mark([...titleRow?.children || []].find((node) => actions && node.contains(actions) && (!utilities || !node.contains(utilities))), "data-dsh-fairy-header-title-cluster");
				mark(utilities?.parentElement, "data-dsh-fairy-header-utilities-shell");
				mark(actions, "data-dsh-fairy-header-actions-cluster");
				mark(utilities, "data-dsh-fairy-header-utilities-cluster");
				mark([...utilities?.querySelectorAll("button") || []].find((button) => !button.matches(".dsh-fairy-toggle, .dsh-fairy-theme-toggle")), "data-dsh-fairy-header-session-log");
				mark(sessionAgentPresetLabel(currentPhase), "data-dsh-fairy-header-session-agent-preset");
				const undo = undoControl(actions);
				const redo = redoControl(actions);
				if (undo?.parentElement && undo.parentElement === redo?.parentElement) mark(undo.parentElement, "data-dsh-fairy-version-navigation");
				const seat = composerSeat(stage);
				const card = composerCard(seat);
				const sendButton = sendOnlyButton(card);
				mark(seat, "data-dsh-fairy-composer-seat");
				mark(sendButton?.parentElement, "data-dsh-fairy-composer-controls");
				mark(sendButton, "data-dsh-fairy-send-button");
				const nativeCopy = seat?.querySelector(".dsh-fairy-hero-native-headline");
				mark(nativeCopy, "data-dsh-fairy-hero-native-copy");
				desired.forEach((nextNodes, name) => {
					const previousNodes = owned.get(name);
					previousNodes.forEach((node) => {
						if (nextNodes.has(node)) return;
						if (node.isConnected) node.removeAttribute(name);
					});
					nextNodes.forEach((node) => {
						if (!previousNodes.has(node) || node.getAttribute(name) !== "true") node.setAttribute(name, "true");
					});
					owned.set(name, nextNodes);
				});
				reportMissingCapabilities(document);
			};
			const schedule = () => {
				if (!lifecycle.disposed) domObserverManager.scheduleFrame(semanticFrameKey, sync);
			};
			sync();
			if (typeof MutationObserver === "function" && document.body) {
				observer = createManagedMutationObserver((records) => {
					if (mutationTouchesSemanticSurface(records, SEMANTIC_SURFACE_SELECTOR)) schedule();
				});
				lifecycle.add(() => observer?.disconnect(), "semantic-markers:observer");
				observer.observe(document.body, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: [
						"aria-expanded",
						"aria-label",
						"aria-selected",
						OFFICIAL_ATTRIBUTES.phase,
						OFFICIAL_ATTRIBUTES.slot
					]
				});
			}
			const cleanup = () => {
				domObserverManager.cancelFrame(semanticFrameKey);
				clear();
				document.documentElement.removeAttribute("data-dsh-fairy-modal-open");
			};
			lifecycle.add(cleanup, "semantic-markers:restore-markers");
			return () => lifecycle.dispose();
		}
		module.exports = { install };
	}));

//#endregion
//#region src/client/geometry-lifecycle.js
	var require_geometry_lifecycle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		function claimGeometryLifecycle(owner, name) {
			return claimSingleton(owner, name, createLifecycleScope(name));
		}
		module.exports = { claimGeometryLifecycle };
	}));

//#endregion
//#region src/client/surface-utils.js
	var require_surface_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES } = require_dom_adapter();
		function mutationTouchesSurface(records, selector, attributes = []) {
			return records.some((record) => {
				const target = record.target?.nodeType === 1 ? record.target : record.target?.parentElement;
				if (record.type === "attributes") return (!attributes.length || attributes.includes(record.attributeName)) && Boolean(target?.matches?.(selector) || target?.closest?.(selector));
				if (record.type !== "childList") return false;
				if (target?.matches?.(selector) || target?.closest?.(selector)) return true;
				return [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(selector) || node.querySelector?.(selector)));
			});
		}
		function mutationTouchesHeroSurface(records, officialSelectors, officialAttributes) {
			const selector = `${officialSelectors.conversation}, ${officialSelectors.phaseHero}, ${officialSelectors.phaseActive}, ${officialSelectors.composerSeat}`;
			return records.some((record) => {
				const target = record.target?.nodeType === 1 ? record.target : record.target?.parentElement;
				if (record.type === "attributes") {
					if (record.attributeName === officialAttributes.phase) return Boolean(target?.matches?.(selector));
					return record.attributeName === "placeholder" && Boolean(target?.matches?.(OFFICIAL_SELECTORS.composerTextarea) && target.closest?.(officialSelectors.phaseHero));
				}
				if (record.type !== "childList") return false;
				if (target?.matches?.(officialSelectors.phaseHero) || target?.closest?.(officialSelectors.phaseHero)) return true;
				return [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(selector) || node.querySelector?.(selector)));
			});
		}
		function roundedRectPath(left, top, right, bottom, radius) {
			const r = Math.max(0, Math.min(radius, (right - left) * .5, (bottom - top) * .5));
			if (!r) return `M ${left} ${top} H ${right} V ${bottom} H ${left} Z`;
			return `M ${left + r} ${top} H ${right - r} Q ${right} ${top} ${right} ${top + r} V ${bottom - r} Q ${right} ${bottom} ${right - r} ${bottom} H ${left + r} Q ${left} ${bottom} ${left} ${bottom - r} V ${top + r} Q ${left} ${top} ${left + r} ${top} Z`;
		}
		module.exports = {
			mutationTouchesSurface,
			mutationTouchesHeroSurface,
			roundedRectPath
		};
	}));

//#endregion
//#region src/client/sidebar-geometry-manager.js
	var require_sidebar_geometry_manager = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const React$3 = require("react");
		const { createManagedMutationObserver } = require_dom_observer_manager();
		const { claimGeometryLifecycle } = require_geometry_lifecycle();
		const { mutationTouchesSurface, roundedRectPath } = require_surface_utils();
		const { OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES, sidebarResizeHandle } = require_dom_adapter();
		function install(_lifecycle = null) {
			function SidebarBoardCutout({ enabled }) {
				React$3.useLayoutEffect(() => {
					const lifecycle = claimGeometryLifecycle(document, "sidebar-board-cutout");
					let structureObserver = null;
					let layoutObserver = null;
					let resizeObserver = null;
					let observedLayer = null;
					let observedHole = null;
					let observedFrame = null;
					let observedHandle = null;
					const clear = () => {
						document.querySelectorAll("[data-dsh-fairy-sidebar-layer=\"true\"]").forEach((node) => {
							node.style.removeProperty("--dsh-sidebar-board-clip");
							node.removeAttribute("data-dsh-fairy-sidebar-geometry");
						});
					};
					const bindOwners = () => {
						const layer = document.querySelector("[data-dsh-fairy-sidebar-layer=\"true\"]");
						const hole = document.querySelector("[data-dsh-fairy-history-surface=\"true\"]");
						const ownerFrame = layer?.parentElement || null;
						const handle = sidebarResizeHandle(ownerFrame) || sidebarResizeHandle(document);
						if (layer === observedLayer && hole === observedHole && ownerFrame === observedFrame && handle === observedHandle) return;
						lifecycle.replaceBinding("sidebar-owner", () => {
							resizeObserver?.disconnect();
							layoutObserver?.disconnect();
						}, "sidebar-board:owner-observers");
						observedLayer = layer;
						observedHole = hole;
						observedFrame = ownerFrame;
						observedHandle = handle;
						resizeObserver?.disconnect();
						layoutObserver?.disconnect();
						if (resizeObserver) {
							if (layer) resizeObserver.observe(layer);
							if (hole) resizeObserver.observe(hole);
							if (ownerFrame) resizeObserver.observe(ownerFrame);
						}
						if (layoutObserver) {
							if (ownerFrame) layoutObserver.observe(ownerFrame, {
								attributes: true,
								attributeFilter: [
									"style",
									"data-dragging",
									"data-sidebar-collapsed"
								]
							});
							if (handle) layoutObserver.observe(handle, {
								attributes: true,
								attributeFilter: ["style", "data-dragging"]
							});
						}
					};
					const sync = () => {
						bindOwners();
						const layer = document.querySelector("[data-dsh-fairy-sidebar-layer=\"true\"]");
						const hole = document.querySelector("[data-dsh-fairy-history-surface=\"true\"]");
						if (!enabled || !layer) return clear();
						const layerRect = layer.getBoundingClientRect();
						if (layerRect.width < 1 || layerRect.height < 1) return clear();
						const outer = roundedRectPath(0, 0, layerRect.width, layerRect.height, 0);
						const holeRect = hole?.getBoundingClientRect();
						const inner = holeRect && holeRect.width >= 1 && holeRect.height >= 1 ? roundedRectPath(holeRect.left - layerRect.left, holeRect.top - layerRect.top, holeRect.right - layerRect.left, holeRect.bottom - layerRect.top, 10) : null;
						layer.style.setProperty("--dsh-sidebar-board-clip", `path(evenodd, "${outer}${inner ? ` ${inner}` : ""}")`);
						layer.setAttribute("data-dsh-fairy-sidebar-geometry", "ready");
					};
					const schedule = () => {
						if (!lifecycle.disposed) lifecycle.scheduleFrame("sidebar-board-sync", sync, "sidebar-board:sync-frame");
					};
					if (typeof ResizeObserver === "function") resizeObserver = new ResizeObserver(() => {
						bindOwners();
						schedule();
					});
					if (typeof MutationObserver === "function") layoutObserver = createManagedMutationObserver(schedule);
					bindOwners();
					sync();
					if (typeof MutationObserver === "function" && document.body) {
						structureObserver = createManagedMutationObserver((records) => {
							if (mutationTouchesSurface(records, `${OFFICIAL_SELECTORS.sidebar}, [data-dsh-fairy-sidebar-layer="true"], [data-dsh-fairy-history-surface="true"]`, [
								"aria-expanded",
								OFFICIAL_ATTRIBUTES.phase,
								OFFICIAL_ATTRIBUTES.slot,
								"data-dsh-fairy-sidebar-layer",
								"data-dsh-fairy-history-surface"
							])) schedule();
						});
						structureObserver.observe(document.body, {
							childList: true,
							subtree: true,
							attributes: true,
							attributeFilter: [
								"aria-expanded",
								OFFICIAL_ATTRIBUTES.phase,
								OFFICIAL_ATTRIBUTES.slot,
								"data-dsh-fairy-sidebar-layer",
								"data-dsh-fairy-history-surface"
							]
						});
					}
					window.addEventListener("resize", schedule, { passive: true });
					const cleanup = () => {
						resizeObserver?.disconnect();
						structureObserver?.disconnect();
						layoutObserver?.disconnect();
						window.removeEventListener("resize", schedule);
						clear();
					};
					lifecycle.add(cleanup, "sidebar-board:restore-geometry");
					return () => lifecycle.dispose();
				}, [enabled]);
				return null;
			}
			return { SidebarBoardCutout };
		}
		module.exports = { install };
	}));

//#endregion
//#region src/client/scrollbar.js
	var require_scrollbar = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		function claimScrollbarLifecycle(documentRef) {
			return claimSingleton(documentRef, "scrollbars", createLifecycleScope("scrollbars"));
		}
		module.exports = { claimScrollbarLifecycle };
	}));

//#endregion
//#region src/client/scrollbars-manager.js
	var require_scrollbars_manager = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const React$2 = require("react");
		const { createLifecycleScope } = require_lifecycle();
		const { createManagedMutationObserver } = require_dom_observer_manager();
		const { createPointerDrag } = require_pointer_drag();
		const { claimScrollbarLifecycle } = require_scrollbar();
		const { HDD_SCROLL_TARGET_SELECTOR, hddScrollTargets } = require_dom_adapter();
		function install(_lifecycle = null) {
			function HddOverlayScrollbars({ enabled }) {
				React$2.useLayoutEffect(() => {
					if (!enabled || !document.body) return void 0;
					const lifecycle = claimScrollbarLifecycle(document);
					const host = document.createElement("div");
					host.className = "dsh-hdd-scrollbar-layer";
					host.setAttribute("data-plugin", "dsh-fairy-visual");
					host.setAttribute("aria-label", "HDD 滚动条");
					document.body.appendChild(host);
					let structureObserver = null;
					let resizeObserver = null;
					const bindings = /* @__PURE__ */ new Map();
					const TRACK_WIDTH = 12;
					const EDGE_INSET = 1;
					const schedule = () => {
						if (!lifecycle.disposed) lifecycle.scheduleFrame("scrollbar-sync", sync, "scrollbars:sync-frame");
					};
					const scheduleStructure = () => {
						if (!lifecycle.disposed) lifecycle.scheduleFrame("scrollbar-bind", bindTargets, "scrollbars:bind-frame");
					};
					const updateAria = (thumb, target, maxScroll) => {
						thumb.setAttribute("aria-valuemin", "0");
						thumb.setAttribute("aria-valuemax", String(Math.round(maxScroll)));
						thumb.setAttribute("aria-valuenow", String(Math.round(target.scrollTop)));
					};
					const armIdle = (binding) => {
						binding.idleDeadline = Date.now() + 850;
						if (binding.idleTimer) return;
						const settle = () => {
							const remaining = binding.idleDeadline - Date.now();
							if (remaining > 0) {
								binding.idleTimer = binding.lifecycle.timeout(settle, remaining, `scrollbar:${binding.key}:idle-settle`);
								return;
							}
							binding.idleTimer = null;
							binding.track.setAttribute("data-idle", "true");
							binding.track.setAttribute("data-active", "false");
						};
						binding.idleTimer = binding.lifecycle.timeout(settle, 850, `scrollbar:${binding.key}:idle-settle`);
					};
					const show = (binding) => {
						binding.track.setAttribute("data-idle", "false");
						binding.track.setAttribute("data-active", "true");
						armIdle(binding);
					};
					const createBinding = (key, target) => {
						const track = document.createElement("div");
						track.className = "dsh-history-overlay-scrollbar";
						track.setAttribute("data-target", key);
						track.setAttribute("role", "scrollbar");
						track.setAttribute("aria-orientation", "vertical");
						track.setAttribute("tabindex", "0");
						const thumb = document.createElement("div");
						thumb.className = "dsh-history-overlay-scrollbar-thumb";
						track.appendChild(thumb);
						host.appendChild(track);
						const bindingLifecycle = createLifecycleScope(`scrollbar:${key}`);
						const binding = {
							key,
							target,
							track,
							thumb,
							pointerDrag: null,
							idleTimer: null,
							idleDeadline: 0,
							lifecycle: bindingLifecycle
						};
						track.setAttribute("data-idle", "true");
						const onScroll = () => {
							show(binding);
							schedule();
						};
						const onPointerDown = (event) => {
							if (event.button !== 0) return;
							event.preventDefault();
							event.stopPropagation();
							const trackRect = track.getBoundingClientRect();
							const thumbRect = thumb.getBoundingClientRect();
							const travel = Math.max(1, trackRect.height - thumbRect.height);
							const payload = {
								pointerId: event.pointerId,
								startY: event.clientY,
								startScrollTop: target.scrollTop,
								travel,
								maxScroll: Math.max(0, target.scrollHeight - target.clientHeight)
							};
							show(binding);
							binding.pointerDrag.start(event, payload);
						};
						const onPointerMove = (_event, session) => {
							const drag = session.payload;
							const next = drag.startScrollTop + (_event.clientY - drag.startY) * drag.maxScroll / drag.travel;
							target.scrollTop = Math.max(0, Math.min(drag.maxScroll, next));
							schedule();
						};
						binding.pointerDrag = createPointerDrag({
							getTarget: () => thumb,
							getLockNodes: () => [track],
							onMove: onPointerMove,
							onEnd: schedule,
							onCancel: schedule
						});
						const onTrackPointerDown = (event) => {
							if (event.target === thumb || event.button !== 0) return;
							const rect = track.getBoundingClientRect();
							const direction = event.clientY < rect.top + rect.height * .5 ? -1 : 1;
							target.scrollTop += direction * target.clientHeight * .85;
							show(binding);
							schedule();
						};
						const onKeyDown = (event) => {
							const maxScroll = Math.max(0, target.scrollHeight - target.clientHeight);
							const step = event.shiftKey ? target.clientHeight : 48;
							let next = null;
							if (event.key === "ArrowUp") next = target.scrollTop - step;
							else if (event.key === "ArrowDown") next = target.scrollTop + step;
							else if (event.key === "PageUp") next = target.scrollTop - target.clientHeight;
							else if (event.key === "PageDown") next = target.scrollTop + target.clientHeight;
							else if (event.key === "Home") next = 0;
							else if (event.key === "End") next = maxScroll;
							if (next === null) return;
							event.preventDefault();
							target.scrollTop = Math.max(0, Math.min(maxScroll, next));
							show(binding);
							schedule();
						};
						bindingLifecycle.add(() => track.remove(), `scrollbar:${key}:track-node`);
						bindingLifecycle.on(target, "scroll", onScroll, {
							passive: true,
							label: `scrollbar:${key}:target-scroll`
						});
						bindingLifecycle.on(thumb, "pointerdown", onPointerDown, { label: `scrollbar:${key}:thumb-pointerdown` });
						bindingLifecycle.on(track, "pointerdown", onTrackPointerDown, { label: `scrollbar:${key}:track-pointerdown` });
						bindingLifecycle.on(track, "keydown", onKeyDown, { label: `scrollbar:${key}:track-keydown` });
						bindingLifecycle.add(() => binding.pointerDrag?.dispose(), `scrollbar:${key}:pointer-drag`);
						binding.cleanup = () => {
							if (binding.idleTimer) clearTimeout(binding.idleTimer);
							binding.idleTimer = null;
							bindingLifecycle.dispose();
						};
						return binding;
					};
					const resolveTargets = () => hddScrollTargets(document);
					const bindTargets = () => {
						const next = new Map(resolveTargets().map(({ key, target }) => [key, target]));
						bindings.forEach((binding, key) => {
							if (next.get(key) !== binding.target) {
								binding.cleanup();
								bindings.delete(key);
							}
						});
						next.forEach((target, key) => {
							if (!bindings.has(key)) bindings.set(key, createBinding(key, target));
						});
						resizeObserver?.disconnect();
						resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
						bindings.forEach((binding) => {
							resizeObserver?.observe(binding.target);
						});
						schedule();
					};
					const sync = () => {
						const measurements = [];
						bindings.forEach((binding) => {
							const target = binding.target;
							const rect = target.getBoundingClientRect();
							const maxScroll = Math.max(0, target.scrollHeight - target.clientHeight);
							if (!(rect.width > 0 && rect.height > 0 && target.clientHeight > 0 && maxScroll > 1)) {
								measurements.push({
									binding,
									visible: false
								});
								return;
							}
							const trackHeight = Math.max(24, Math.round(rect.height - 4));
							const thumbHeight = Math.max(20, Math.min(trackHeight, Math.round(trackHeight * target.clientHeight / target.scrollHeight)));
							const travel = Math.max(0, trackHeight - thumbHeight);
							const thumbTop = maxScroll ? Math.round(target.scrollTop / maxScroll * travel) : 0;
							measurements.push({
								binding,
								visible: true,
								rect,
								maxScroll,
								trackHeight,
								thumbHeight,
								thumbTop
							});
						});
						measurements.forEach(({ binding, visible, rect, maxScroll, trackHeight, thumbHeight, thumbTop }) => {
							if (!visible) {
								binding.track.setAttribute("data-visible", "false");
								return;
							}
							binding.track.style.left = `${Math.round(rect.right - EDGE_INSET - TRACK_WIDTH)}px`;
							binding.track.style.top = `${Math.round(rect.top + 2)}px`;
							binding.track.style.height = `${trackHeight}px`;
							binding.thumb.style.height = `${thumbHeight}px`;
							binding.thumb.style.transform = `translateY(${thumbTop}px)`;
							binding.track.setAttribute("data-visible", "true");
							updateAria(binding.track, binding.target, maxScroll);
						});
					};
					bindTargets();
					if (typeof MutationObserver === "function" && document.body) {
						structureObserver = createManagedMutationObserver((records) => {
							let targetStructureChanged = false;
							let targetContentChanged = false;
							records.forEach((record) => {
								if (record.type !== "childList") return;
								if ((record.target?.nodeType === 1 ? record.target : record.target?.parentElement)?.closest?.(HDD_SCROLL_TARGET_SELECTOR)) targetContentChanged = true;
								if ([...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(HDD_SCROLL_TARGET_SELECTOR) || node.querySelector?.(HDD_SCROLL_TARGET_SELECTOR)))) targetStructureChanged = true;
							});
							bindings.forEach((binding) => {
								if (!binding.target.isConnected) targetStructureChanged = true;
							});
							if (targetStructureChanged) scheduleStructure();
							else if (targetContentChanged) schedule();
						});
						structureObserver.observe(document.body, {
							childList: true,
							subtree: true
						});
					}
					window.addEventListener("resize", schedule, { passive: true });
					const cleanup = () => {
						structureObserver?.disconnect();
						resizeObserver?.disconnect();
						window.removeEventListener("resize", schedule);
						bindings.forEach((binding) => binding.cleanup());
						bindings.clear();
						host.remove();
					};
					lifecycle.add(cleanup, "scrollbars:dispose");
					return () => lifecycle.dispose();
				}, [enabled]);
				return null;
			}
			return { HddOverlayScrollbars };
		}
		module.exports = { install };
	}));

//#endregion
//#region src/client/hero-projection-manager.js
	var require_hero_projection_manager = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const React$1 = require("react");
		const { jsx: jsx$1, jsxs: jsxs$1 } = require("react/jsx-runtime");
		const { MODE_ATTR, HERO_PLACEHOLDERS } = (init_constants(), __toCommonJS(constants_exports));
		const { createManagedMutationObserver } = require_dom_observer_manager();
		const { mutationTouchesSurface, mutationTouchesHeroSurface } = require_surface_utils();
		const { OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES, sidebar, conversation, phase, composerSeat, composerCard, composerTextarea } = require_dom_adapter();
		let heroMaskInstanceSeed = 0;
		function install(_lifecycle = null, { Toggle, useController }) {
			function HeroToggleHost({ controller }) {
				const hostRef = React$1.useRef(null);
				const [positioned, setPositioned] = React$1.useState(false);
				const { sessionId } = useController(controller);
				React$1.useLayoutEffect(() => {
					const host = hostRef.current;
					if (!host) return;
					let frame = 0;
					let hero = null;
					let resizeObserver = null;
					let structureObserver = null;
					let conversationObserver = null;
					let observedConversation = null;
					const sync = () => {
						frame = 0;
						bindConversation();
						const conversationSurface = conversation(document);
						const nextHero = phase(conversationSurface, "active") ? null : phase(conversationSurface, "hero");
						if (nextHero !== hero) {
							resizeObserver?.disconnect();
							hero = nextHero;
							if (typeof ResizeObserver === "function" && hero) {
								resizeObserver = new ResizeObserver(schedule);
								resizeObserver.observe(hero);
							}
						}
						if (!hero) {
							setPositioned(false);
							host.style.removeProperty("left");
							host.style.removeProperty("top");
							return;
						}
						const rect = hero.getBoundingClientRect();
						if (rect.width < 1 || rect.height < 1) {
							setPositioned(false);
							return;
						}
						host.style.left = Math.round(rect.right - host.offsetWidth - 28) + "px";
						host.style.top = Math.round(rect.top + 8) + "px";
						setPositioned(true);
					};
					const schedule = () => {
						if (!frame) frame = requestAnimationFrame(sync);
					};
					const bindConversation = () => {
						const conversationNode = conversation(document);
						if (conversationNode === observedConversation) return;
						conversationObserver?.disconnect();
						conversationObserver = null;
						observedConversation = conversationNode;
						if (typeof MutationObserver === "function" && conversationNode) {
							conversationObserver = createManagedMutationObserver((records) => {
								const phaseSelector = `${OFFICIAL_SELECTORS.phaseHero}, ${OFFICIAL_SELECTORS.phaseActive}`;
								if (mutationTouchesSurface(records, phaseSelector, [OFFICIAL_ATTRIBUTES.phase])) schedule();
							});
							conversationObserver.observe(conversationNode, {
								childList: true,
								subtree: true,
								attributes: true,
								attributeFilter: [OFFICIAL_ATTRIBUTES.phase]
							});
						}
					};
					if (typeof MutationObserver === "function" && document.body) {
						structureObserver = createManagedMutationObserver((records) => {
							if (mutationTouchesHeroSurface(records, OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES)) schedule();
						});
						structureObserver.observe(document.body, {
							childList: true,
							subtree: true,
							attributes: true,
							attributeFilter: [OFFICIAL_ATTRIBUTES.phase, "placeholder"]
						});
					}
					window.addEventListener("resize", schedule, { passive: true });
					bindConversation();
					sync();
					return () => {
						if (frame) cancelAnimationFrame(frame);
						resizeObserver?.disconnect();
						structureObserver?.disconnect();
						conversationObserver?.disconnect();
						observedConversation = null;
						window.removeEventListener("resize", schedule);
						host.style.removeProperty("left");
						host.style.removeProperty("top");
					};
				}, [sessionId]);
				return jsx$1("div", {
					ref: hostRef,
					className: "dsh-fairy-hero-toggle-host",
					"data-positioned": String(positioned),
					hidden: !positioned,
					children: jsx$1(Toggle, { controller })
				});
			}
			function HeroHost({ controller }) {
				const state = useController(controller);
				const stateRef = React$1.useRef(state);
				stateRef.current = state;
				const hostRef = React$1.useRef(null);
				const placeholderRef = React$1.useRef({
					key: null,
					text: null
				});
				const heroMaskIdRef = React$1.useRef(null);
				if (!heroMaskIdRef.current) heroMaskIdRef.current = `dsh-fairy-hero-mask-${++heroMaskInstanceSeed}`;
				const heroMaskId = heroMaskIdRef.current;
				React$1.useLayoutEffect(() => {
					const host = hostRef.current;
					if (!host) return;
					let frame = 0;
					let nativeHeadline = null;
					let textarea = null;
					let originalPlaceholder = null;
					let appliedPlaceholder = null;
					let resizeObserver = null;
					let structureObserver = null;
					let modeObserver = null;
					let sidebarLayoutObserver = null;
					let observedHeadline = null;
					let observedHero = null;
					let observedComposer = null;
					let observedSidebar = null;
					let observedSidebarFrame = null;
					const restoreTextarea = () => {
						if (!textarea) return;
						const current = textarea.getAttribute("placeholder");
						if (appliedPlaceholder !== null && current !== appliedPlaceholder) originalPlaceholder = current;
						if (originalPlaceholder === null) textarea.removeAttribute("placeholder");
						else textarea.setAttribute("placeholder", originalPlaceholder);
						textarea = null;
						originalPlaceholder = null;
						appliedPlaceholder = null;
					};
					const clearHero = (resetHostGeometry = false) => {
						nativeHeadline?.classList.remove("dsh-fairy-hero-native-headline", "dsh-fairy-hero-native-headline-hidden");
						nativeHeadline = null;
						restoreTextarea();
						host.setAttribute("data-active", "false");
						if (resetHostGeometry) {
							host.style.removeProperty("left");
							host.style.removeProperty("top");
						}
						host.style.removeProperty("clip-path");
						host.style.removeProperty("-webkit-clip-path");
						resizeObserver?.disconnect();
						sidebarLayoutObserver?.disconnect();
						observedHeadline = null;
						observedHero = null;
						observedComposer = null;
						observedSidebar = null;
						observedSidebarFrame = null;
					};
					const findLeafText = (root, text) => Array.from(root.querySelectorAll("span,div")).find((node) => node.childElementCount === 0 && (node.textContent || "").trim() === text) || null;
					const syncHero = () => {
						frame = 0;
						const hero = phase(conversation(document), "hero");
						if (!hero) return clearHero();
						const nextHeadline = findLeafText(hero, "探索未至之境")?.parentElement || null;
						const card = composerCard(hero);
						const nextTextarea = composerTextarea(card);
						if (!nextHeadline || !nextTextarea) return clearHero();
						const hddEnabled = document.documentElement.hasAttribute("data-dsh-fairy-visual");
						const placeholderKey = stateRef.current.sessionId || "hero";
						if (placeholderRef.current.key !== placeholderKey || !placeholderRef.current.text) placeholderRef.current = {
							key: placeholderKey,
							text: HERO_PLACEHOLDERS[Math.floor(Math.random() * HERO_PLACEHOLDERS.length)]
						};
						const replacementPlaceholder = placeholderRef.current.text;
						if (nativeHeadline !== nextHeadline) {
							nativeHeadline?.classList.remove("dsh-fairy-hero-native-headline", "dsh-fairy-hero-native-headline-hidden");
							nativeHeadline = nextHeadline;
							nativeHeadline.classList.add("dsh-fairy-hero-native-headline");
						}
						nativeHeadline.classList.toggle("dsh-fairy-hero-native-headline-hidden", hddEnabled);
						if (hddEnabled) {
							if (textarea !== nextTextarea) {
								restoreTextarea();
								textarea = nextTextarea;
								originalPlaceholder = textarea.getAttribute("placeholder");
							}
							if (textarea.getAttribute("placeholder") !== replacementPlaceholder) textarea.setAttribute("placeholder", replacementPlaceholder);
							appliedPlaceholder = replacementPlaceholder;
						} else restoreTextarea();
						const heroRect = hero.getBoundingClientRect();
						const center = heroRect.left + heroRect.width * .5;
						host.style.left = Math.round(center) + "px";
						host.setAttribute("data-active", String(hddEnabled));
						if (hddEnabled) {
							const hostRect = host.getBoundingClientRect();
							const composerRect = card.getBoundingClientRect();
							const bottomInset = hostRect.bottom - composerRect.top;
							const sidebarRect = (document.querySelector("[data-dsh-fairy-sidebar-layer=\"true\"]") || sidebar(document)?.firstElementChild || sidebar(document))?.getBoundingClientRect();
							let leftInset = 0;
							let rightInset = 0;
							if (sidebarRect) {
								if (sidebarRect.right <= heroRect.left + heroRect.width * .5) leftInset = Math.max(0, sidebarRect.right - hostRect.left);
								else rightInset = Math.max(0, hostRect.right - sidebarRect.left);
							}
							host.style.clipPath = `inset(0 ${rightInset}px ${bottomInset}px ${leftInset}px)`;
							host.style.webkitClipPath = `inset(0 ${rightInset}px ${bottomInset}px ${leftInset}px)`;
						} else {
							host.style.removeProperty("clip-path");
							host.style.removeProperty("-webkit-clip-path");
						}
						const nextSidebar = document.querySelector("[data-dsh-fairy-sidebar-layer=\"true\"]") || sidebar(document)?.firstElementChild || sidebar(document);
						const sidebarChanged = observedSidebar !== nextSidebar;
						if (resizeObserver && (observedHeadline !== nativeHeadline || observedHero !== hero || observedComposer !== card || sidebarChanged)) {
							resizeObserver.disconnect();
							observedHeadline = nativeHeadline;
							observedHero = hero;
							observedComposer = card;
							observedSidebar = nextSidebar;
							resizeObserver.observe(nativeHeadline);
							resizeObserver.observe(hero);
							resizeObserver.observe(card);
							if (nextSidebar) resizeObserver.observe(nextSidebar);
						}
						const nextSidebarFrame = nextSidebar?.parentElement || null;
						if (sidebarLayoutObserver && (sidebarChanged || observedSidebarFrame !== nextSidebarFrame)) {
							sidebarLayoutObserver.disconnect();
							observedSidebarFrame = nextSidebarFrame;
							if (nextSidebar) sidebarLayoutObserver.observe(nextSidebar, {
								attributes: true,
								attributeFilter: ["style", "aria-expanded"]
							});
							if (nextSidebarFrame) sidebarLayoutObserver.observe(nextSidebarFrame, {
								attributes: true,
								attributeFilter: ["style", "data-sidebar-collapsed"]
							});
						}
					};
					const scheduleHeroSync = () => {
						if (!frame) frame = requestAnimationFrame(syncHero);
					};
					if (typeof ResizeObserver === "function") resizeObserver = new ResizeObserver(scheduleHeroSync);
					if (typeof MutationObserver === "function") sidebarLayoutObserver = createManagedMutationObserver(scheduleHeroSync);
					if (typeof MutationObserver === "function" && document.body) {
						structureObserver = createManagedMutationObserver((records) => {
							if (mutationTouchesSurface(records, `${OFFICIAL_SELECTORS.conversation}, ${OFFICIAL_SELECTORS.phaseHero}, ${OFFICIAL_SELECTORS.composerSeat}`, [OFFICIAL_ATTRIBUTES.phase, "placeholder"])) scheduleHeroSync();
						});
						structureObserver.observe(document.body, {
							childList: true,
							subtree: true,
							attributes: true,
							attributeFilter: [OFFICIAL_ATTRIBUTES.phase, "placeholder"]
						});
						modeObserver = createManagedMutationObserver(scheduleHeroSync);
						modeObserver.observe(document.documentElement, {
							attributes: true,
							attributeFilter: [MODE_ATTR]
						});
					}
					window.addEventListener("resize", scheduleHeroSync, { passive: true });
					syncHero();
					return () => {
						if (frame) cancelAnimationFrame(frame);
						structureObserver?.disconnect();
						modeObserver?.disconnect();
						sidebarLayoutObserver?.disconnect();
						window.removeEventListener("resize", scheduleHeroSync);
						clearHero(true);
					};
				}, []);
				return jsxs$1("div", {
					ref: hostRef,
					className: "dsh-fairy-hero-host",
					children: [jsxs$1("span", {
						className: "dsh-fairy-hero-main",
						children: [jsxs$1("svg", {
							className: "dsh-fairy-hero-projection-svg",
							width: "100%",
							height: "220",
							"aria-hidden": "true",
							children: [
								jsxs$1("defs", { children: [
									jsx$1("mask", {
										id: `${heroMaskId}-2`,
										maskType: "luminance",
										maskUnits: "userSpaceOnUse",
										maskContentUnits: "userSpaceOnUse",
										x: "0",
										y: "0",
										width: "100%",
										height: "220",
										children: jsxs$1("g", { children: [jsx$1("rect", {
											x: "0",
											y: "0",
											width: "100%",
											height: "220",
											fill: "white"
										}), jsx$1("text", {
											className: "dsh-fairy-hero-mask-text dsh-fairy-hero-mask-text-1-for-2",
											x: "50%",
											y: "114",
											fill: "black",
											children: "HOLLOW DEEP DIVE SYSTEM"
										})] })
									}),
									jsx$1("mask", {
										id: `${heroMaskId}-3`,
										maskType: "luminance",
										maskUnits: "userSpaceOnUse",
										maskContentUnits: "userSpaceOnUse",
										x: "0",
										y: "0",
										width: "100%",
										height: "220",
										children: jsxs$1("g", { children: [
											jsx$1("rect", {
												x: "0",
												y: "0",
												width: "100%",
												height: "220",
												fill: "white"
											}),
											jsx$1("text", {
												className: "dsh-fairy-hero-mask-text dsh-fairy-hero-mask-text-1-for-3",
												x: "50%",
												y: "174",
												fill: "black",
												children: "HOLLOW DEEP DIVE SYSTEM"
											}),
											jsx$1("text", {
												className: "dsh-fairy-hero-mask-text dsh-fairy-hero-mask-text-2-for-3",
												x: "50%",
												y: "150",
												fill: "black",
												children: "HOLLOW DEEP DIVE SYSTEM"
											})
										] })
									}),
									jsx$1("mask", {
										id: `${heroMaskId}-4`,
										maskType: "luminance",
										maskUnits: "userSpaceOnUse",
										maskContentUnits: "userSpaceOnUse",
										x: "0",
										y: "0",
										width: "100%",
										height: "220",
										children: jsxs$1("g", { children: [
											jsx$1("rect", {
												x: "0",
												y: "0",
												width: "100%",
												height: "220",
												fill: "white"
											}),
											jsx$1("text", {
												className: "dsh-fairy-hero-mask-text dsh-fairy-hero-mask-text-1-for-4",
												x: "50%",
												y: "246",
												fill: "black",
												children: "HOLLOW DEEP DIVE SYSTEM"
											}),
											jsx$1("text", {
												className: "dsh-fairy-hero-mask-text dsh-fairy-hero-mask-text-2-for-4",
												x: "50%",
												y: "222",
												fill: "black",
												children: "HOLLOW DEEP DIVE SYSTEM"
											}),
											jsx$1("text", {
												className: "dsh-fairy-hero-mask-text dsh-fairy-hero-mask-text-3-for-4",
												x: "50%",
												y: "192",
												fill: "black",
												children: "HOLLOW DEEP DIVE SYSTEM"
											})
										] })
									})
								] }),
								jsx$1("text", {
									className: "dsh-fairy-hero-projection-text dsh-fairy-hero-projection-text-1",
									x: "50%",
									y: "66",
									transform: "matrix(1 0 0 -1 0 132)",
									children: "HOLLOW DEEP DIVE SYSTEM"
								}),
								jsx$1("text", {
									className: "dsh-fairy-hero-projection-text dsh-fairy-hero-projection-text-2",
									x: "50%",
									y: "90",
									transform: "matrix(1 0 0 -1 0 180)",
									mask: `url(#${heroMaskId}-2)`,
									children: "HOLLOW DEEP DIVE SYSTEM"
								}),
								jsx$1("text", {
									className: "dsh-fairy-hero-projection-text dsh-fairy-hero-projection-text-3",
									x: "50%",
									y: "120",
									transform: "matrix(1 0 0 -1 0 240)",
									mask: `url(#${heroMaskId}-3)`,
									children: "HOLLOW DEEP DIVE SYSTEM"
								}),
								jsx$1("text", {
									className: "dsh-fairy-hero-projection-text dsh-fairy-hero-projection-text-4",
									x: "50%",
									y: "156",
									transform: "matrix(1 0 0 -1 0 312)",
									mask: `url(#${heroMaskId}-4)`,
									children: "HOLLOW DEEP DIVE SYSTEM"
								})
							]
						}), "HOLLOW DEEP DIVE SYSTEM"]
					}), jsx$1("span", {
						className: "dsh-fairy-hero-sub",
						children: Array.from("空洞深潜系统").map((character, index) => jsx$1("span", {
							className: "dsh-fairy-hero-sub-char",
							children: character
						}, index))
					})]
				});
			}
			function ActiveComposerPlaceholder({ controller }) {
				const state = useController(controller);
				const placeholderRef = React$1.useRef({
					key: null,
					text: null
				});
				React$1.useLayoutEffect(() => {
					let frame = 0;
					let textarea = null;
					let originalPlaceholder = null;
					let appliedPlaceholder = null;
					let structureObserver = null;
					let modeObserver = null;
					const placeholderKey = state.sessionId || "active";
					if (placeholderRef.current.key !== placeholderKey || !placeholderRef.current.text) placeholderRef.current = {
						key: placeholderKey,
						text: HERO_PLACEHOLDERS[Math.floor(Math.random() * HERO_PLACEHOLDERS.length)]
					};
					const restoreTextarea = () => {
						if (!textarea) return;
						const current = textarea.getAttribute("placeholder");
						if (appliedPlaceholder !== null && current !== appliedPlaceholder) originalPlaceholder = current;
						if (originalPlaceholder === null) textarea.removeAttribute("placeholder");
						else textarea.setAttribute("placeholder", originalPlaceholder);
						textarea = null;
						originalPlaceholder = null;
						appliedPlaceholder = null;
					};
					const syncPlaceholder = () => {
						frame = 0;
						const hddEnabled = document.documentElement.hasAttribute("data-dsh-fairy-visual");
						const conversationSurface = conversation(document);
						const nextTextarea = phase(conversationSurface, "active") ? composerTextarea(composerCard(composerSeat(conversationSurface))) : null;
						if (!hddEnabled || !nextTextarea) return restoreTextarea();
						if (textarea !== nextTextarea) {
							restoreTextarea();
							textarea = nextTextarea;
							originalPlaceholder = textarea.getAttribute("placeholder");
						}
						const replacement = placeholderRef.current.text;
						const current = textarea.getAttribute("placeholder");
						if (appliedPlaceholder !== null && current !== appliedPlaceholder) originalPlaceholder = current;
						if (current !== replacement) textarea.setAttribute("placeholder", replacement);
						appliedPlaceholder = replacement;
					};
					const schedulePlaceholderSync = () => {
						if (!frame) frame = requestAnimationFrame(syncPlaceholder);
					};
					if (typeof MutationObserver === "function" && document.body) {
						structureObserver = createManagedMutationObserver((records) => {
							if (mutationTouchesSurface(records, `${OFFICIAL_SELECTORS.conversation}, ${OFFICIAL_SELECTORS.phaseActive}, ${OFFICIAL_SELECTORS.composerSeat}`, [
								OFFICIAL_ATTRIBUTES.phase,
								OFFICIAL_ATTRIBUTES.composerSeat,
								"placeholder"
							])) schedulePlaceholderSync();
						});
						structureObserver.observe(document.body, {
							childList: true,
							subtree: true,
							attributes: true,
							attributeFilter: [
								OFFICIAL_ATTRIBUTES.phase,
								OFFICIAL_ATTRIBUTES.composerSeat,
								"placeholder"
							]
						});
						modeObserver = createManagedMutationObserver(schedulePlaceholderSync);
						modeObserver.observe(document.documentElement, {
							attributes: true,
							attributeFilter: [MODE_ATTR]
						});
					}
					syncPlaceholder();
					return () => {
						if (frame) cancelAnimationFrame(frame);
						structureObserver?.disconnect();
						modeObserver?.disconnect();
						restoreTextarea();
					};
				}, [state.sessionId, state.settings.enabled]);
				return null;
			}
			return {
				HeroToggleHost,
				HeroHost,
				ActiveComposerPlaceholder
			};
		}
		module.exports = { install };
	}));

//#endregion
//#region src/client/mode-theme.js
	var require_mode_theme = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function ownModeTheme(scope, modeTransition, themeTransition, sessionTransition) {
			scope.add(() => modeTransition?.dispose?.(), "mode-theme:mode-transition");
			scope.add(() => themeTransition?.dispose?.(), "mode-theme:theme-transition");
			scope.add(() => sessionTransition?.dispose?.(), "mode-theme:session-transition");
		}
		module.exports = { ownModeTheme };
	}));

//#endregion
//#region src/client/controller-lifecycle.js
	var require_controller_lifecycle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		const { ownModeTheme } = require_mode_theme();
		function ownControllerLifecycle(controller) {
			const scope = claimSingleton(controller, "controller-dispose", createLifecycleScope("controller"));
			ownModeTheme(scope, controller.modeTransition, controller.themeTransition, controller.sessionTransition);
			scope.add(() => controller.listOff?.(), "controller:session-list-subscription");
			scope.add(() => controller.sessionOff?.(), "controller:session-binding-subscription");
			scope.add(() => controller.settingsOff?.(), "controller:settings-subscription");
			scope.add(() => controller.listeners?.clear?.(), "controller:listener-registry");
			return scope;
		}
		function disposeControllerLifecycle(scope) {
			scope?.dispose?.();
		}
		module.exports = {
			ownControllerLifecycle,
			disposeControllerLifecycle
		};
	}));

//#endregion
//#region src/client/stage-lifecycle.js
	var require_stage_lifecycle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		function claimStageGeometryLifecycle(stageNode) {
			return claimSingleton(stageNode, "stage-geometry", createLifecycleScope("stage-geometry"));
		}
		function claimContentFadeLifecycle(stageNode) {
			return claimSingleton(stageNode, "content-fade", createLifecycleScope("content-fade"));
		}
		module.exports = {
			claimStageGeometryLifecycle,
			claimContentFadeLifecycle
		};
	}));

//#endregion
//#region src/client/content-fade.js
	var require_content_fade = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { claimContentFadeLifecycle } = require_stage_lifecycle();
		module.exports = { claimContentFadeLifecycle };
	}));

//#endregion
//#region src/client/mascot-lifecycle.js
	var require_mascot_lifecycle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		function claimMascotLifecycle(stageNode) {
			return claimSingleton(stageNode, "mascot-runtime", createLifecycleScope("mascot-runtime"));
		}
		module.exports = { claimMascotLifecycle };
	}));

//#endregion
//#region src/client/brand-sidebar-geometry.js
	var require_brand_sidebar_geometry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { claimGeometryLifecycle } = require_geometry_lifecycle();
		function claimBrandSidebarGeometry(owner) {
			return claimGeometryLifecycle(owner, "brand-sidebar-geometry");
		}
		module.exports = { claimBrandSidebarGeometry };
	}));

//#endregion
//#region src/client/power-mode.js
	var require_power_mode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const { claimGeometryLifecycle } = require_geometry_lifecycle();
		function claimPowerModeGeometry(owner) {
			return claimGeometryLifecycle(owner, "power-mode-geometry");
		}
		module.exports = { claimPowerModeGeometry };
	}));

//#endregion
//#region src/client/selection-guard.js
	var require_selection_guard = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const LOCK_ATTRIBUTE = "data-dsh-fairy-selection-lock";
		function createSelectionGuard({ documentRef, windowRef, selector, maxDuration = 15e3 } = {}) {
			const doc = documentRef || (typeof document !== "undefined" ? document : null);
			const win = windowRef || (typeof window !== "undefined" ? window : null);
			const root = doc?.documentElement;
			if (!doc || !win || !root || !selector) return { dispose() {} };
			let pointerId = null;
			let safetyTimer = 0;
			const clear = () => {
				pointerId = null;
				if (safetyTimer) {
					clearTimeout(safetyTimer);
					safetyTimer = 0;
				}
				root.removeAttribute(LOCK_ATTRIBUTE);
			};
			const arm = (event) => {
				if (!event?.target?.closest?.(selector) || event.button != null && event.button !== 0) return;
				pointerId = event.pointerId ?? "mouse";
				root.setAttribute(LOCK_ATTRIBUTE, "true");
				if (safetyTimer) clearTimeout(safetyTimer);
				safetyTimer = setTimeout(clear, maxDuration);
			};
			const end = (event) => {
				if (pointerId === null) return;
				if (event?.pointerId != null && event.pointerId !== pointerId) return;
				clear();
			};
			const preventSelection = (event) => {
				if (root.hasAttribute(LOCK_ATTRIBUTE)) event.preventDefault();
			};
			const onMouseDown = (event) => {
				if (pointerId === null) arm(event);
			};
			const onDocumentVisibilityChange = () => {
				if (doc.visibilityState === "hidden") clear();
			};
			const onPageHide = () => clear();
			doc.addEventListener("pointerdown", arm, true);
			doc.addEventListener("mousedown", onMouseDown, true);
			doc.addEventListener("selectstart", preventSelection, true);
			doc.addEventListener("dragstart", preventSelection, true);
			doc.addEventListener("visibilitychange", onDocumentVisibilityChange, true);
			win.addEventListener("pointerup", end, true);
			win.addEventListener("pointercancel", end, true);
			win.addEventListener("mouseup", end, true);
			win.addEventListener("blur", clear, true);
			win.addEventListener("pagehide", onPageHide, true);
			return { dispose() {
				doc.removeEventListener("pointerdown", arm, true);
				doc.removeEventListener("mousedown", onMouseDown, true);
				doc.removeEventListener("selectstart", preventSelection, true);
				doc.removeEventListener("dragstart", preventSelection, true);
				doc.removeEventListener("visibilitychange", onDocumentVisibilityChange, true);
				win.removeEventListener("pointerup", end, true);
				win.removeEventListener("pointercancel", end, true);
				win.removeEventListener("mouseup", end, true);
				win.removeEventListener("blur", clear, true);
				win.removeEventListener("pagehide", onPageHide, true);
				clear();
			} };
		}
		module.exports = {
			createSelectionGuard,
			LOCK_ATTRIBUTE
		};
	}));

//#endregion
//#region src/client/decision-pointer-guard.js
	var require_decision_pointer_guard = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function createDecisionPointerGuard({ documentRef = document, windowRef = window } = {}) {
			let press = null;
			const release = () => {
				if (!press) return;
				const { button, id } = press;
				press = null;
				try {
					if (button.hasPointerCapture(id)) button.releasePointerCapture(id);
				} catch (_) {}
			};
			const down = (event) => {
				release();
				if (event.defaultPrevented || event.button !== 0 || event.pointerType !== "mouse" || !event.isPrimary) return;
				const button = event.target?.closest?.("[data-approval-key] button, [data-question-key] button, [data-plan-review-key] button");
				if (!button || button.disabled || button.getAttribute("aria-disabled") === "true") return;
				try {
					button.setPointerCapture(event.pointerId);
					press = {
						button,
						id: event.pointerId,
						x: event.clientX,
						y: event.clientY
					};
				} catch (_) {}
			};
			const move = (event) => {
				if (!press || event.pointerId !== press.id) return;
				if (!press.button.isConnected || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 8) release();
			};
			const up = (event) => {
				if (!press || event.pointerId !== press.id) return;
				press = null;
			};
			const hidden = () => {
				if (documentRef.hidden) release();
			};
			documentRef.addEventListener("pointerdown", down, true);
			documentRef.addEventListener("pointermove", move, true);
			documentRef.addEventListener("pointerup", up, true);
			documentRef.addEventListener("pointercancel", release, true);
			documentRef.addEventListener("visibilitychange", hidden);
			windowRef.addEventListener("blur", release);
			windowRef.addEventListener("pagehide", release);
			return { dispose() {
				release();
				documentRef.removeEventListener("pointerdown", down, true);
				documentRef.removeEventListener("pointermove", move, true);
				documentRef.removeEventListener("pointerup", up, true);
				documentRef.removeEventListener("pointercancel", release, true);
				documentRef.removeEventListener("visibilitychange", hidden);
				windowRef.removeEventListener("blur", release);
				windowRef.removeEventListener("pagehide", release);
			} };
		}
		module.exports = { createDecisionPointerGuard };
	}));

//#endregion
//#region src/client/settings-normalizer.cjs
	var require_settings_normalizer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		const SETTINGS_VERSION = 2;
		const SPEED_STOPS = Object.freeze([
			.7,
			1,
			1.5
		]);
		const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
		const nearest = (value, values) => values.reduce((best, item) => Math.abs(item - value) < Math.abs(best - value) ? item : best, values[0]);
		const toFiniteNumber = (value) => {
			if (value === "" || value == null || typeof value === "string" && value.trim() === "") return NaN;
			const number = Number(value);
			return Number.isFinite(number) ? number : NaN;
		};
		function migrateVisualSettings(input = {}) {
			const source = input && typeof input === "object" ? input : {};
			const legacyScale = source.mascotScale ?? source.eyeSize ?? source.mascotSize;
			const rawSpeed = source.mascotAnimationSpeed ?? source.animationSpeed;
			const numericSpeed = toFiniteNumber(rawSpeed);
			const numericScale = toFiniteNumber(legacyScale);
			const numericComposerHeight = toFiniteNumber(source.composerDockHeight);
			return {
				version: SETTINGS_VERSION,
				enabled: typeof source.enabled === "boolean" ? source.enabled : false,
				theme: source.theme === "light" ? "light" : "dark",
				mascotVisible: typeof source.mascotVisible === "boolean" ? source.mascotVisible : true,
				mascotScale: Number.isFinite(numericScale) ? clamp(numericScale, .55, 1) : 1,
				mascotAnimationSpeed: Number.isFinite(numericSpeed) ? nearest(numericSpeed, SPEED_STOPS) : 1,
				powerMode: source.powerMode === "low-power" ? "low-power" : "normal",
				composerDockHeight: Number.isFinite(numericComposerHeight) ? Math.round(clamp(numericComposerHeight, 132, 420)) : 132
			};
		}
		function normalizeSetting(field, value, current = {}) {
			return migrateVisualSettings({
				...current,
				[field]: value
			})[field];
		}
		module.exports = {
			SETTINGS_VERSION,
			SPEED_STOPS,
			migrateVisualSettings,
			normalizeSetting
		};
	}));

//#endregion
//#region src/client/visual-transitions.js
	var require_visual_transitions = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		init_defineProperty();
		const diagnostics = {
			start: () => typeof performance === "object" && performance?.now ? performance.now() : Date.now(),
			metric(operation, startedAt, context = {}) {
				const clock = typeof performance === "object" && performance?.now ? performance.now() : Date.now();
				console.info(`DSH_FAIRY_LOG ${JSON.stringify({
					schema: 1,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					level: "info",
					module: "dsh-fairy-visual",
					operation,
					event: "metric",
					context,
					duration_ms: Number((clock - startedAt).toFixed(3))
				})}`);
			},
			warn(operation, context = {}, error) {
				console.warn(`DSH_FAIRY_LOG ${JSON.stringify({
					schema: 1,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					level: "warn",
					module: "dsh-fairy-visual",
					operation,
					event: "failure",
					context,
					error: {
						name: String(error?.name || "Error"),
						message: String(error?.message || error).slice(0, 320)
					}
				})}`);
			}
		};
		function createVisualTransitions({ rootSlot, modeAttr, conversation, anyPhase, composerSeat, composerCard }) {
			const FAIRY_CONTAINER_ID = "dsh-fairy-plugin-container";
			const FAIRY_CONTAINER_STYLE = "position:fixed;inset:0;pointer-events:none;z-index:2147483000;";
			const THEME_TRANSITION_DURATION_MS = 480;
			let fairyContainer = null;
			let cloneIdSeed = 0;
			const clonedElementLists = /* @__PURE__ */ new WeakMap();
			function collectElements(root) {
				return clonedElementLists.get(root) || [root, ...root.querySelectorAll("*")];
			}
			function isDescendantOf(node, ancestor) {
				for (let parent = node?.parentElement || node?.parentNode; parent; parent = parent.parentElement || parent.parentNode) if (parent === ancestor) return true;
				return false;
			}
			function hasClass(node, name) {
				return String(node?.getAttribute?.("class") || "").split(/\s+/).includes(name);
			}
			function ensureFairyContainer() {
				if (!fairyContainer || !fairyContainer.isConnected) {
					fairyContainer = document.getElementById(FAIRY_CONTAINER_ID);
					if (!fairyContainer || !fairyContainer.isConnected) {
						fairyContainer = document.createElement("div");
						fairyContainer.id = FAIRY_CONTAINER_ID;
						fairyContainer.setAttribute("data-fairy-owned", "true");
						document.body.appendChild(fairyContainer);
					}
				}
				fairyContainer.style.cssText = FAIRY_CONTAINER_STYLE;
				return fairyContainer;
			}
			function removeFairyContainer() {
				fairyContainer?.remove();
				fairyContainer = null;
			}
			function settleVisualTransition(promise, label) {
				return promise.catch((error) => {
					if (error?.name !== "AbortError") diagnostics.warn("transition.settle", { label }, error);
				});
			}
			function namespaceCloneReferences(elements) {
				const idMap = /* @__PURE__ */ new Map();
				const prefix = `dsh-fairy-transition-${++cloneIdSeed}`;
				const isSvgElement = (node) => node?.namespaceURI === "http://www.w3.org/2000/svg" || Boolean(node?.ownerSVGElement) || String(node?.tagName || "").toLowerCase() === "svg";
				elements.filter(isSvgElement).forEach((node) => {
					const id = node.getAttribute?.("id");
					if (!id) return;
					const sourceId = id.replace(/^dsh-fairy-transition-\d+-/, "");
					const next = `${prefix}-${sourceId}`;
					idMap.set(id, next);
					idMap.set(sourceId, next);
					node.setAttribute("id", next);
				});
				const rewrite = (value) => {
					if (!value) return value;
					let next = value.replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${idMap.get(id) || id})`);
					if (next.startsWith("#")) next = `#${idMap.get(next.slice(1)) || next.slice(1)}`;
					return next;
				};
				const attributes = [
					"href",
					"xlink:href",
					"fill",
					"stroke",
					"filter",
					"clip-path",
					"mask",
					"marker-start",
					"marker-mid",
					"marker-end",
					"style"
				];
				elements.forEach((node) => {
					attributes.forEach((attribute) => {
						const value = node.getAttribute?.(attribute);
						if (value) node.setAttribute(attribute, rewrite(value));
					});
				});
				const mascotRoot = elements.find((node) => node.getAttribute?.("data-dsh-fairy-mascot-root") === "true");
				const stateClipId = mascotRoot?.getAttribute?.("data-state") === "thinking" ? "dsh-fairy-thinking-eye-clip" : mascotRoot?.getAttribute?.("data-state") === "comforting" ? "dsh-fairy-comforting-eye-clip" : null;
				const namespacedClipId = stateClipId ? idMap.get(stateClipId) : null;
				if (namespacedClipId) elements.filter((node) => hasClass(node, "dsh-fairy-eye") && isDescendantOf(node, mascotRoot)).forEach((eye) => {
					eye.style?.setProperty?.("clip-path", `url(#${namespacedClipId})`);
					eye.style?.setProperty?.("-webkit-clip-path", `url(#${namespacedClipId})`);
				});
				elements.forEach((node) => {
					if (node.getAttribute?.("data-dsh-fairy-mascot-root") === "true") node.removeAttribute("id");
				});
			}
			function clearClonedFairyFaultState(elements) {
				const mascotRoots = elements.filter((node) => node.getAttribute?.("data-dsh-fairy-mascot-root") === "true");
				mascotRoots.forEach((root) => {
					root.removeAttribute("data-transition-glitch");
					root.removeAttribute("data-transition-target");
					root.removeAttribute("data-visual-suspended");
				});
				elements.filter((node) => hasClass(node, "dsh-fairy-signal") && mascotRoots.some((root) => isDescendantOf(node, root))).forEach((signal) => {
					signal.removeAttribute("data-glitch");
					[
						"--dsh-g-x",
						"--dsh-g-skew",
						"--dsh-g-bright",
						"--dsh-g-contrast",
						"--dsh-g-s1-x",
						"--dsh-g-s2-x",
						"--dsh-g-s3-x",
						"--dsh-g-s4-x",
						"--dsh-g-s5-x"
					].forEach((name) => signal.style.removeProperty(name));
				});
			}
			function isScrollableSnapshotRoot(node) {
				return node?.getAttribute?.("data-conversation-scroll") !== null || node?.getAttribute?.("data-chat-flow") !== null || node?.getAttribute?.("role") === "tree";
			}
			function pruneOffscreenSubtrees(sourceElements, cloneElements) {
				const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
				const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
				if (viewportWidth < 1 || viewportHeight < 1) return cloneElements;
				const removedRoots = [];
				const count = Math.min(sourceElements.length, cloneElements.length);
				for (let index = 1; index < count; index += 1) {
					const source = sourceElements[index];
					const target = cloneElements[index];
					if (!isScrollableSnapshotRoot(source?.parentElement || source?.parentNode)) continue;
					if (!target?.firstElementChild || typeof source.getBoundingClientRect !== "function") continue;
					const rect = source.getBoundingClientRect();
					if (!rect || rect.width <= 0 || rect.height <= 0) continue;
					if (rect.bottom > -2 && rect.top < viewportHeight + 2 && rect.right > -2 && rect.left < viewportWidth + 2) continue;
					target.replaceChildren();
					target.setAttribute("data-dsh-transition-placeholder", "");
					target.style?.setProperty?.("visibility", "hidden", "important");
					target.style?.setProperty?.("content-visibility", "hidden", "important");
					target.style?.setProperty?.("contain", "strict", "important");
					target.style?.setProperty?.("box-sizing", "border-box", "important");
					target.style?.setProperty?.("width", `${rect.width}px`, "important");
					target.style?.setProperty?.("height", `${rect.height}px`, "important");
					target.style?.setProperty?.("min-width", `${rect.width}px`, "important");
					target.style?.setProperty?.("min-height", `${rect.height}px`, "important");
					target.style?.setProperty?.("flex", "none", "important");
					removedRoots.push(target);
				}
				if (!removedRoots.length) return cloneElements;
				return cloneElements.filter((node) => !removedRoots.some((root) => node !== root && isDescendantOf(node, root)));
			}
			function cloneTransitionFrame(frame) {
				const clone = frame.cloneNode(true);
				clone.setAttribute("data-dsh-transition-frame", "");
				const sourceElements = collectElements(frame);
				const cloneElements = [clone, ...clone.querySelectorAll("*")];
				namespaceCloneReferences(cloneElements);
				clearClonedFairyFaultState(cloneElements);
				clone.setAttribute("inert", "");
				cloneElements.forEach((node) => {
					if (node.getAttribute?.("data-dsh-fairy-brand-anchor") !== "true") return;
					node.removeAttribute("data-dsh-fairy-brand-anchor");
					node.removeAttribute("data-dsh-fairy-native-new-session");
				});
				for (let index = 0; index < Math.min(sourceElements.length, cloneElements.length); index += 1) {
					const source = sourceElements[index];
					const target = cloneElements[index];
					if (source.getAttribute?.("data-dsh-fairy-brand-anchor") === "true") {
						target.removeAttribute("data-dsh-fairy-brand-anchor");
						target.removeAttribute("data-dsh-fairy-native-new-session");
					}
					if (source.scrollTop) target.scrollTop = source.scrollTop;
					if (source.scrollLeft) target.scrollLeft = source.scrollLeft;
					if ("value" in source && "value" in target) target.value = source.value;
					if ("checked" in source && "checked" in target) target.checked = source.checked;
				}
				clonedElementLists.set(clone, pruneOffscreenSubtrees(sourceElements, cloneElements));
				return clone;
			}
			class ModeTransition {
				constructor() {
					_defineProperty(this, "cleanup", () => {
						if (this.cleanupTimer !== null) clearTimeout(this.cleanupTimer);
						this.cleanupTimer = null;
						this.frameAnimation?.cancel?.();
						this.frameAnimation = null;
						if (this.sliceFrame !== null) cancelAnimationFrame(this.sliceFrame);
						this.sliceFrame = null;
						this.overlay?.remove();
						this.overlay = null;
					});
					this.overlay = null;
					this.cleanupTimer = null;
					this.frameAnimation = null;
					this.sliceFrame = null;
				}
				resolveFrame() {
					const frame = rootSlot(document)?.firstElementChild || null;
					if (!frame) return null;
					const rect = frame.getBoundingClientRect();
					return rect.width > 0 && rect.height > 0 ? frame : null;
				}
				cloneFrame(frame) {
					return cloneTransitionFrame(frame);
				}
				trigger() {
					const startedAt = diagnostics.start();
					if (!document.body || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
					const frame = this.resolveFrame();
					if (!frame || typeof frame.animate !== "function") return;
					this.cleanup();
					const duration = 420;
					const overlay = document.createElement("div");
					overlay.className = "dsh-hdd-mode-transition";
					overlay.setAttribute("data-from-mode", document.documentElement.getAttribute(modeAttr) || "normal");
					overlay.setAttribute("aria-hidden", "true");
					ensureFairyContainer().appendChild(overlay);
					this.overlay = overlay;
					const oldBackground = getComputedStyle(document.body).backgroundColor;
					const random = (min, max) => min + Math.random() * (max - min);
					const band = () => {
						const top = random(0, 82);
						const height = random(2, 13);
						return `polygon(0% ${top.toFixed(1)}%,100% ${top.toFixed(1)}%,100% ${(top + height).toFixed(1)}%,0% ${(top + height).toFixed(1)}%)`;
					};
					const shakeFrames = Array.from({ length: 9 }, () => ({ transform: `translate3d(${random(-.35, .35).toFixed(3)}%,${random(-.25, .25).toFixed(3)}%,0)` }));
					this.frameAnimation = frame.animate(shakeFrames, {
						duration,
						easing: "steps(9, jump-start)",
						fill: "none"
					});
					const capturedFrame = this.cloneFrame(frame);
					const addSlice = (slice, layer) => {
						layer.setAttribute("data-dsh-transition-layer", "slice");
						if (firstBar) overlay.insertBefore(layer, firstBar);
						else overlay.appendChild(layer);
						const keyframes = Array.from({ length: 8 }, (_, index) => {
							if (index === 7 || Math.random() > .5) return { opacity: 0 };
							return {
								opacity: 1,
								clipPath: band(),
								transform: `translate3d(${random(-8, 8).toFixed(2)}%,0,0)`
							};
						});
						layer.animate(keyframes, {
							duration,
							easing: "steps(8, jump-start)",
							fill: "forwards"
						});
					};
					let firstBar = null;
					addSlice(0, capturedFrame);
					const addDeferredSlices = () => {
						this.sliceFrame = null;
						if (this.overlay !== overlay) return;
						for (let slice = 1; slice < 3; slice += 1) addSlice(slice, this.cloneFrame(capturedFrame));
					};
					if (typeof requestAnimationFrame === "function") this.sliceFrame = requestAnimationFrame(addDeferredSlices);
					else addDeferredSlices();
					const colors = [
						"#38bdf8",
						"#ff2bd6",
						"#ff3b30",
						"#2bd97c",
						"#4d7cff",
						"#f5f7fa",
						"#ffe94a"
					];
					for (let index = 0; index < 4; index += 1) {
						const bar = document.createElement("div");
						if (!firstBar) firstBar = bar;
						bar.setAttribute("data-dsh-transition-layer", "bar");
						bar.style.top = `${random(0, 88).toFixed(1)}%`;
						bar.style.left = "-5%";
						bar.style.width = "110%";
						bar.style.height = `${random(2, 11).toFixed(1)}%`;
						bar.style.background = colors[Math.floor(Math.random() * colors.length)];
						overlay.appendChild(bar);
						const keyframes = Array.from({ length: 7 }, (_, step) => step === 6 || Math.random() < .25 ? { opacity: 0 } : {
							opacity: random(.3, .75).toFixed(2),
							transform: `translate3d(${random(-11, 11).toFixed(1)}%,0,0)`
						});
						bar.animate(keyframes, {
							duration,
							easing: "steps(7, jump-start)",
							fill: "forwards"
						});
					}
					const background = document.createElement("div");
					background.setAttribute("data-dsh-transition-layer", "background");
					background.style.background = oldBackground;
					overlay.appendChild(background);
					const backgroundFrames = Array.from({ length: 9 }, (_, index) => index === 8 ? { opacity: 0 } : {
						opacity: random(.12, .32).toFixed(2),
						clipPath: Math.random() < .5 ? band() : "none"
					});
					background.animate(backgroundFrames, {
						duration,
						easing: "steps(9, jump-start)",
						fill: "forwards"
					});
					this.cleanupTimer = setTimeout(this.cleanup, 470);
					diagnostics.metric("transition.mode.capture", startedAt, { source_mode: overlay.getAttribute("data-from-mode") });
				}
				dispose() {
					this.cleanup();
				}
			}
			class SessionTransition {
				constructor() {
					_defineProperty(this, "cleanup", () => {
						if (this.cleanupTimer !== null) clearTimeout(this.cleanupTimer);
						this.cleanupTimer = null;
						this.animations.forEach((animation) => animation?.cancel?.());
						this.animations = [];
						if (this.sliceFrame !== null) cancelAnimationFrame(this.sliceFrame);
						this.sliceFrame = null;
						this.overlay?.remove();
						this.overlay = null;
					});
					this.overlay = null;
					this.cleanupTimer = null;
					this.animations = [];
					this.sliceFrame = null;
				}
				cloneFrame(frame) {
					return cloneTransitionFrame(frame);
				}
				resolveRegion() {
					const frame = rootSlot(document)?.firstElementChild || null;
					const surface = conversation?.(document);
					const regionSurface = anyPhase?.(surface) || surface;
					const composer = composerCard?.(composerSeat?.(surface));
					if (!frame || !surface || !regionSurface || !composer || typeof frame.animate !== "function") return null;
					const frameRect = frame.getBoundingClientRect();
					const surfaceRect = regionSurface.getBoundingClientRect();
					const composerRect = composer.getBoundingClientRect();
					const width = window.innerWidth || document.documentElement.clientWidth;
					const height = window.innerHeight || document.documentElement.clientHeight;
					const bottomEdge = Math.min(surfaceRect.bottom, Math.max(surfaceRect.top, composerRect.top));
					const top = Math.max(0, surfaceRect.top);
					const right = Math.max(0, width - surfaceRect.right);
					const bottom = Math.max(0, height - bottomEdge);
					const left = Math.max(0, surfaceRect.left);
					if (frameRect.width < 1 || frameRect.height < 1 || width < 1 || height < 1 || width - left - right < 1 || height - top - bottom < 1) return null;
					return {
						frame,
						clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`
					};
				}
				animate(node, keyframes, options) {
					const animation = node.animate(keyframes, options);
					this.animations.push(animation);
					return animation;
				}
				trigger() {
					const startedAt = diagnostics.start();
					if (!document.body || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
					const region = this.resolveRegion();
					if (!region) return;
					this.cleanup();
					const duration = 420;
					const overlay = document.createElement("div");
					overlay.className = "dsh-hdd-session-transition";
					overlay.setAttribute("aria-hidden", "true");
					const clippedRegion = document.createElement("div");
					clippedRegion.setAttribute("data-dsh-session-transition-region", "");
					clippedRegion.style.cssText = `position:absolute;inset:0;overflow:hidden;pointer-events:none;clip-path:${region.clipPath};-webkit-clip-path:${region.clipPath};`;
					overlay.appendChild(clippedRegion);
					ensureFairyContainer().appendChild(overlay);
					this.overlay = overlay;
					const random = (min, max) => min + Math.random() * (max - min);
					const band = () => {
						const top = random(0, 82);
						const height = random(2, 13);
						return `polygon(0% ${top.toFixed(1)}%,100% ${top.toFixed(1)}%,100% ${(top + height).toFixed(1)}%,0% ${(top + height).toFixed(1)}%)`;
					};
					const base = this.cloneFrame(region.frame);
					clippedRegion.appendChild(base);
					const baseFrames = Array.from({ length: 9 }, (_, index) => index === 8 ? { opacity: 0 } : {
						opacity: 1,
						transform: `translate3d(${random(-.35, .35).toFixed(3)}%,${random(-.25, .25).toFixed(3)}%,0)`
					});
					this.animate(base, baseFrames, {
						duration,
						easing: "steps(9, jump-start)",
						fill: "forwards"
					});
					const addSlices = () => {
						this.sliceFrame = null;
						if (this.overlay !== overlay) return;
						for (let slice = 0; slice < 3; slice += 1) {
							const layer = this.cloneFrame(base);
							layer.setAttribute("data-dsh-transition-layer", "slice");
							clippedRegion.appendChild(layer);
							const keyframes = Array.from({ length: 8 }, (_, index) => {
								if (index === 7 || Math.random() > .5) return { opacity: 0 };
								return {
									opacity: 1,
									clipPath: band(),
									transform: `translate3d(${random(-8, 8).toFixed(2)}%,0,0)`
								};
							});
							this.animate(layer, keyframes, {
								duration,
								easing: "steps(8, jump-start)",
								fill: "forwards"
							});
						}
					};
					if (typeof requestAnimationFrame === "function") this.sliceFrame = requestAnimationFrame(addSlices);
					else addSlices();
					this.cleanupTimer = setTimeout(this.cleanup, 470);
					diagnostics.metric("transition.session.capture", startedAt, {});
				}
				dispose() {
					this.cleanup();
				}
			}
			class ThemeTransition {
				constructor(frameTransition) {
					this.frameTransition = frameTransition;
					this.current = null;
					this.overlay = null;
					this.animation = null;
				}
				run(update) {
					const startedAt = diagnostics.start();
					const root = document.documentElement;
					if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return update();
					this.cleanup();
					if (typeof document.startViewTransition !== "function") return this.runFallback(update);
					root.setAttribute("data-dsh-fairy-theme-transition", "");
					let transition;
					try {
						transition = document.startViewTransition(() => Promise.resolve(update()));
					} catch {
						root.removeAttribute("data-dsh-fairy-theme-transition");
						return update();
					}
					this.current = transition;
					settleVisualTransition(transition.finished, "view transition").finally(() => {
						diagnostics.metric("transition.theme", startedAt, { implementation: "view-transition" });
						if (this.current !== transition) return;
						this.current = null;
						root.removeAttribute("data-dsh-fairy-theme-transition");
					});
					return transition.updateCallbackDone;
				}
				runFallback(update) {
					const frame = this.frameTransition.resolveFrame();
					if (!document.body || !frame || typeof frame.animate !== "function") return update();
					const overlay = document.createElement("div");
					overlay.className = "dsh-fairy-theme-fade-transition";
					overlay.setAttribute("aria-hidden", "true");
					overlay.style.background = getComputedStyle(document.body).backgroundColor;
					overlay.appendChild(this.frameTransition.cloneFrame(frame));
					ensureFairyContainer().appendChild(overlay);
					this.overlay = overlay;
					let result;
					try {
						result = Promise.resolve(update());
					} catch (error) {
						this.cleanup();
						throw error;
					}
					return result.then((value) => {
						if (this.overlay !== overlay) return value;
						const animation = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
							duration: THEME_TRANSITION_DURATION_MS,
							easing: "cubic-bezier(.22,1,.36,1)",
							fill: "forwards"
						});
						this.animation = animation;
						settleVisualTransition(animation.finished, "theme fade").finally(() => {
							if (this.overlay === overlay) this.cleanup();
						});
						return value;
					}, (error) => {
						if (this.overlay === overlay) this.cleanup();
						throw error;
					});
				}
				cleanup() {
					this.current?.skipTransition?.();
					this.current = null;
					this.animation?.cancel?.();
					this.animation = null;
					this.overlay?.remove();
					this.overlay = null;
					document.documentElement.removeAttribute("data-dsh-fairy-theme-transition");
				}
				dispose() {
					this.cleanup();
				}
			}
			return {
				createModeTransition: () => new ModeTransition(),
				createSessionTransition: () => new SessionTransition(),
				createThemeTransition: (frameTransition) => new ThemeTransition(frameTransition),
				removeFairyContainer
			};
		}
		module.exports = { createVisualTransitions };
	}));

//#endregion
//#region src/client/index.js
	var require_client = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		init_defineProperty();
		const React = require("react");
		const { jsx, jsxs } = require("react/jsx-runtime");
		const { createFairyDiagnostics } = require_client_diagnostics();
		const { SETTINGS_NAMESPACE, STYLE_ID, MODE_ATTR, POWER_MODE_ATTR, THEME_ATTR, POWER_TOGGLE_WIDTH, POWER_TOGGLE_HEIGHT, DEFAULT } = (init_constants(), __toCommonJS(constants_exports));
		const IDENTITY_SETTINGS_NAMESPACE = "fairy-identity";
		const { deriveSessionActivity, syncDocumentMode } = (init_utils(), __toCommonJS(utils_exports));
		const { injectStyles } = (init_style(), __toCommonJS(style_exports));
		const { mountComposerDock } = require_composer_dock();
		const { createLifecycleScope, claimSingleton } = require_lifecycle();
		const { createManagedMutationObserver, getDomObserverManager } = require_dom_observer_manager();
		const { createMascotRuntime } = require_mascot_runtime();
		const semanticMarkersManager = require_semantic_markers_manager();
		const sidebarGeometryManager = require_sidebar_geometry_manager();
		const scrollbarsManager = require_scrollbars_manager();
		const heroProjectionManager = require_hero_projection_manager();
		const { ownControllerLifecycle, disposeControllerLifecycle } = require_controller_lifecycle();
		const { claimStageGeometryLifecycle } = require_stage_lifecycle();
		const { claimContentFadeLifecycle } = require_content_fade();
		const { claimMascotLifecycle } = require_mascot_lifecycle();
		const { claimBrandSidebarGeometry } = require_brand_sidebar_geometry();
		const { claimPowerModeGeometry } = require_power_mode();
		const { createSelectionGuard } = require_selection_guard();
		const { createDecisionPointerGuard } = require_decision_pointer_guard();
		const { scheduleMascotScale, MASCOT_GEOMETRY_EVENT } = require_mascot_scale_control();
		const { saveControllerSetting } = require_settings_write();
		const { mutationTouchesSurface } = require_surface_utils();
		const { migrateVisualSettings, normalizeSetting } = require_settings_normalizer();
		const { createVisualTransitions } = require_visual_transitions();
		const { OFFICIAL_SELECTORS, OFFICIAL_ATTRIBUTES, rootSlot, sidebar, conversation, conversationScroll, anyPhase, composerSeat, composerCard, conversationComposerDock, chatFlows, balanceAction, sidebarResizeHandle, reportMissingCapabilities } = require_dom_adapter();
		const visualTransitions = createVisualTransitions({
			rootSlot,
			modeAttr: MODE_ATTR,
			conversation,
			anyPhase,
			composerSeat,
			composerCard
		});
		const mascotRuntime = createMascotRuntime();
		const diagnostics = createFairyDiagnostics("dsh-fairy-visual");
		var Controller = class {
			constructor(settings, sessions) {
				_defineProperty(this, "subscribe", (listener) => {
					this.listeners.add(listener);
					return () => this.listeners.delete(listener);
				});
				_defineProperty(this, "getSnapshot", () => this.state);
				this.settings = settings;
				this.sessions = sessions;
				this.modeTransition = visualTransitions.createModeTransition();
				this.sessionTransition = visualTransitions.createSessionTransition();
				this.themeTransition = visualTransitions.createThemeTransition(this.modeTransition);
				this.listeners = /* @__PURE__ */ new Set();
				this.session = null;
				this.boundSessionId = void 0;
				this.hasBoundSession = false;
				this.state = {
					settings: migrateVisualSettings({
						...DEFAULT,
						...settings.getSnapshot().value || {}
					}),
					activity: "normal",
					lifecycle: "idle",
					sessionId: void 0
				};
				this.lastGoodSettings = this.state.settings;
				this.listOff = sessions.list.subscribe(() => this.bind());
				this.settingsOff = settings.subscribe(() => {
					const next = settings.getSnapshot();
					const normalized = migrateVisualSettings({
						...DEFAULT,
						...next.value || {}
					});
					syncDocumentMode({
						...next,
						value: normalized
					});
					this.state = {
						...this.state,
						settings: normalized
					};
					this.lastGoodSettings = normalized;
					this.emit();
				});
				this.lifecycle = ownControllerLifecycle(this);
				this.bind();
			}
			emit() {
				this.listeners.forEach((listener) => listener());
			}
			bind() {
				const catalog = this.sessions.list.getSnapshot();
				const id = Object.values(catalog.byId).find((row) => (row.retainedBy?.mainView || 0) > 0)?.id;
				const next = id == null ? null : this.sessions.binding(id)?.session || null;
				if (this.hasBoundSession && id !== this.boundSessionId && this.state.settings.enabled) this.sessionTransition.trigger();
				this.boundSessionId = id;
				this.hasBoundSession = true;
				if (next === this.session) return this.update();
				this.sessionOff?.();
				this.session = next;
				this.sessionOff = next?.subscribe(() => this.update()) || null;
				this.update();
			}
			update() {
				const snap = this.session?.getSnapshot?.();
				let activity = "normal";
				let lifecycle = "idle";
				const sessionId = this.session?.sessionId;
				if (snap) {
					lifecycle = snap.running ? "running" : snap.blank ? "idle" : "completed";
					activity = deriveSessionActivity(snap);
				}
				if (this.state.activity === activity && this.state.lifecycle === lifecycle && this.state.sessionId === sessionId) return;
				this.state = {
					...this.state,
					activity,
					lifecycle,
					sessionId
				};
				this.emit();
			}
			set(field, value) {
				const normalized = normalizeSetting(field, value, this.state.settings);
				if (field === "enabled" && normalized !== this.state.settings.enabled) this.modeTransition.trigger();
				const write = () => this.settings.set(field, normalized);
				return Promise.resolve().then(() => field === "theme" && normalized !== this.state.settings.theme ? this.themeTransition.run(write) : write()).catch((error) => {
					this.state = {
						...this.state,
						settings: this.lastGoodSettings || migrateVisualSettings(DEFAULT)
					};
					this.emit();
					throw error;
				});
			}
			dispose() {
				disposeControllerLifecycle(this.lifecycle);
				mascotRuntime?.dispose?.();
				document.documentElement.removeAttribute("data-dsh-fairy-visual");
				document.documentElement.removeAttribute(MODE_ATTR);
				document.documentElement.removeAttribute(POWER_MODE_ATTR);
				document.documentElement.removeAttribute(THEME_ATTR);
				document.getElementById(STYLE_ID)?.remove();
				visualTransitions.removeFairyContainer();
			}
		};
		const { SidebarBoardCutout } = sidebarGeometryManager.install();
		const { HddOverlayScrollbars } = scrollbarsManager.install();
		function HddBackgroundFxHost({ enabled }) {
			React.useLayoutEffect(() => {
				if (!enabled || !document.body) return void 0;
				const host = document.createElement("div");
				host.className = "dsh-hdd-background-host";
				host.setAttribute("data-dsh-fairy-background-host", "true");
				host.setAttribute("aria-hidden", "true");
				const fx = document.createElement("div");
				fx.className = "dsh-hdd-fx";
				for (const variant of [
					"a",
					"b",
					"c"
				]) {
					const glow = document.createElement("div");
					glow.className = `dsh-hdd-glow dsh-hdd-glow-${variant}`;
					fx.appendChild(glow);
				}
				host.appendChild(fx);
				document.body.insertBefore(host, document.body.firstElementChild);
				return () => host.remove();
			}, [enabled]);
			return null;
		}
		const useController = (controller) => React.useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
		const save = saveControllerSetting;
		function Toggle({ controller }) {
			const state = useController(controller);
			const on = state.settings.enabled;
			const theme = state.settings.theme === "light" ? "light" : "dark";
			return jsxs("div", {
				className: "dsh-fairy-toggle-group",
				role: "group",
				"aria-label": "H.D.D 视觉控制",
				children: [jsxs("button", {
					type: "button",
					className: "dsh-fairy-toggle",
					"data-on": String(on),
					"aria-pressed": String(on),
					"aria-label": on ? "关闭 H.D.D 视觉" : "启用 H.D.D 视觉",
					onClick: () => save(controller, "enabled", !on),
					children: [jsx("span", { className: "dsh-fairy-dot" }), "H.D.D"]
				}), jsx("button", {
					type: "button",
					className: "dsh-fairy-theme-toggle",
					"data-theme": theme,
					disabled: !on,
					"aria-label": theme === "dark" ? "切换到日间模式" : "切换到夜间模式",
					title: theme === "dark" ? "切换到日间模式" : "切换到夜间模式",
					onClick: () => save(controller, "theme", theme === "dark" ? "light" : "dark"),
					children: jsx("span", {
						className: "dsh-fairy-theme-icon",
						"aria-hidden": "true"
					})
				})]
			});
		}
		const { HeroToggleHost, HeroHost, ActiveComposerPlaceholder } = heroProjectionManager.install(null, {
			Toggle,
			useController
		});
		function FairyMarkEye() {
			return jsxs("span", {
				className: "dsh-fairy-mark-eye",
				"aria-hidden": "true",
				children: [
					"top",
					"right",
					"bottom",
					"left"
				].map((side) => jsx("span", {
					className: "dsh-fairy-mark-brow",
					"data-side": side
				}, side))
			});
		}
		function FairyMarkCopy() {
			return jsxs("span", {
				className: "dsh-fairy-mark-copy",
				children: [jsx("span", {
					className: "dsh-fairy-mark-title",
					children: "Fairy"
				}), jsx("span", {
					className: "dsh-fairy-mark-sub",
					children: "Ⅲ型总序式集成泛用人工智能"
				})]
			});
		}
		function FairyMark({ controller }) {
			const state = useController(controller);
			const on = state.settings.enabled;
			const markRef = React.useRef(null);
			const glitchTimers = React.useRef(/* @__PURE__ */ new Set());
			const glitchToken = React.useRef(0);
			React.useEffect(() => () => {
				glitchToken.current += 1;
				glitchTimers.current.forEach((timer) => clearTimeout(timer));
				glitchTimers.current.clear();
				const mark = markRef.current;
				if (mark) {
					mark.removeAttribute("data-glitch");
					[
						"--dsh-fairy-mark-g-x",
						"--dsh-fairy-mark-thread-x",
						"--dsh-fairy-mark-thread-2-x",
						"--dsh-fairy-mark-thread-3-x",
						"--dsh-fairy-mark-s1-x",
						"--dsh-fairy-mark-s2-x",
						"--dsh-fairy-mark-s3-x"
					].forEach((name) => mark.style.removeProperty(name));
				}
			}, []);
			const clearGlitch = () => {
				glitchTimers.current.forEach((timer) => clearTimeout(timer));
				glitchTimers.current.clear();
				const mark = markRef.current;
				if (!mark) return;
				mark.removeAttribute("data-glitch");
				[
					"--dsh-fairy-mark-g-x",
					"--dsh-fairy-mark-thread-x",
					"--dsh-fairy-mark-thread-2-x",
					"--dsh-fairy-mark-thread-3-x",
					"--dsh-fairy-mark-s1-x",
					"--dsh-fairy-mark-s2-x",
					"--dsh-fairy-mark-s3-x"
				].forEach((name) => mark.style.removeProperty(name));
			};
			const pulseGlitch = (mode) => {
				const mark = markRef.current;
				if (!mark) return;
				const random = (min, max) => min + Math.random() * (max - min);
				const next = { "--dsh-fairy-mark-g-x": `${random(-1.2, 1.2).toFixed(2)}px` };
				if (mode === "blocks") {
					const polarity = Math.random() < .5 ? -1 : 1;
					for (let index = 1; index <= 3; index += 1) {
						const direction = index % 2 === 0 ? polarity : -polarity;
						next[`--dsh-fairy-mark-s${index}-x`] = `${(direction * random(4.2, 6.2)).toFixed(2)}px`;
					}
				} else {
					const offset = random(-9, 9);
					next["--dsh-fairy-mark-thread-x"] = `${offset.toFixed(2)}px`;
					next["--dsh-fairy-mark-thread-2-x"] = `${(-offset * .8).toFixed(2)}px`;
					next["--dsh-fairy-mark-thread-3-x"] = `${(offset * .45).toFixed(2)}px`;
				}
				Object.entries(next).forEach(([name, value]) => mark.style.setProperty(name, value));
				mark.setAttribute("data-glitch", mode);
			};
			const triggerGlitch = () => {
				clearGlitch();
				const token = ++glitchToken.current;
				const schedule = (delay, callback) => {
					const timer = setTimeout(() => {
						glitchTimers.current.delete(timer);
						if (token === glitchToken.current) callback();
					}, delay);
					glitchTimers.current.add(timer);
				};
				[
					["threads", 0],
					["threads", 40],
					["blocks", 68],
					["blocks", 108],
					["threads", 148],
					["threads", 188],
					["threads", 228],
					["threads", 268]
				].forEach(([mode, delay]) => {
					schedule(delay, () => pulseGlitch(mode));
				});
				schedule(296, clearGlitch);
			};
			return jsxs("button", {
				ref: markRef,
				type: "button",
				className: "dsh-fairy-mark",
				"data-enabled": String(on),
				"data-on": String(state.settings.mascotVisible),
				"aria-pressed": String(state.settings.mascotVisible),
				"aria-label": state.settings.mascotVisible ? "隐藏 Fairy 主视觉" : "显示 Fairy 主视觉",
				onPointerDown: (event) => event.stopPropagation(),
				onMouseDown: (event) => event.stopPropagation(),
				onTouchStart: (event) => event.stopPropagation(),
				onClick: (event) => {
					event.preventDefault();
					event.stopPropagation();
					const nextVisible = !state.settings.mascotVisible;
					triggerGlitch();
					save(controller, "mascotVisible", nextVisible);
				},
				children: [
					jsx(FairyMarkEye, {}),
					jsx(FairyMarkCopy, {}),
					...[
						1,
						2,
						3
					].map((index) => jsxs("span", {
						className: "dsh-fairy-mark-glitch-slice",
						"data-slice": String(index),
						"aria-hidden": "true",
						children: [jsx(FairyMarkEye, {}), jsx(FairyMarkCopy, {})]
					}, index))
				]
			});
		}
		const CHAT_SURFACE_SELECTOR = `${OFFICIAL_SELECTORS.chatFlow}, ${OFFICIAL_SELECTORS.conversationScroll}`;
		const STAGE_SURFACE_SELECTOR = OFFICIAL_SELECTORS.conversation;
		const resolveStageSurface = () => anyPhase(conversation(document));
		const hasChatSurfaceMutation = (records) => records.some((record) => record.type === "attributes" && record.target.matches?.(CHAT_SURFACE_SELECTOR) || [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(CHAT_SURFACE_SELECTOR) || node.querySelector?.(CHAT_SURFACE_SELECTOR))));
		const hasStageSurfaceMutation = (records) => records.some((record) => [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.(STAGE_SURFACE_SELECTOR) || node.querySelector?.(STAGE_SURFACE_SELECTOR))));
		function Stage({ state }) {
			const stageRef = React.useRef(null);
			const mascotOwnerRef = React.useRef(null);
			const enabled = state.settings.enabled;
			const visible = enabled && state.settings.mascotVisible;
			const visibleRef = React.useRef(visible);
			const fadeLifecycleRef = React.useRef(null);
			visibleRef.current = visible;
			React.useLayoutEffect(() => {
				const stageNode = stageRef.current;
				if (!stageNode) return;
				const owner = {
					stage: stageNode,
					active: true
				};
				mascotOwnerRef.current = owner;
				const lifecycle = claimMascotLifecycle(stageNode);
				lifecycle.add(() => {
					owner.active = false;
					if (mascotOwnerRef.current === owner) mascotOwnerRef.current = null;
					mascotRuntime?.dispose?.(owner);
				}, "mascot-runtime:owner-dispose");
				return () => lifecycle.dispose();
			}, []);
			React.useEffect(() => {
				const stageNode = stageRef.current;
				if (!stageNode) return;
				const owner = mascotOwnerRef.current;
				if (!owner?.active) return;
				stageNode.setAttribute("data-fairy-visual-active", visible ? "true" : "false");
				stageNode.setAttribute("data-fairy-state", state.activity);
				if (state.settings.powerMode === "low-power") stageNode.setAttribute("data-fairy-low-power", "true");
				else stageNode.removeAttribute("data-fairy-low-power");
				const mascot = mascotRuntime;
				mascot?.mount?.(stageNode, owner, state.settings.mascotAnimationSpeed);
				mascot?.setVisualActive?.(visible, owner);
			}, [
				visible,
				state.activity,
				state.settings.powerMode,
				state.settings.mascotAnimationSpeed
			]);
			React.useLayoutEffect(() => {
				if (!enabled) return void 0;
				return scheduleMascotScale(state.settings.mascotScale);
			}, [enabled, state.settings.mascotScale]);
			React.useEffect(() => {
				if (!enabled) return;
				const stageNode = stageRef.current;
				if (!stageNode) return;
				const lifecycle = claimStageGeometryLifecycle(stageNode);
				let surface = null;
				let resizeObserver = null;
				let structureObserver = null;
				const syncStageGeometry = () => {
					const rect = surface?.getBoundingClientRect();
					if (!rect || rect.width < 240 || rect.height < 1) return;
					stageNode.style.left = Math.round(rect.left) + "px";
					stageNode.style.width = Math.round(rect.width) + "px";
				};
				const scheduleStageGeometry = () => {
					if (!lifecycle.disposed) lifecycle.scheduleFrame("stage-geometry-sync", syncStageGeometry, "stage-geometry:sync-frame");
				};
				const bindSurface = () => {
					const nextSurface = resolveStageSurface();
					if (nextSurface === surface) return;
					lifecycle.replaceBinding("stage-surface", () => resizeObserver?.disconnect(), "stage-geometry:surface-resize-observer");
					resizeObserver?.disconnect();
					surface = nextSurface;
					if (typeof ResizeObserver === "function" && surface) {
						resizeObserver = new ResizeObserver(scheduleStageGeometry);
						resizeObserver.observe(surface);
					}
					scheduleStageGeometry();
				};
				const scheduleSurfaceBind = () => {
					if (!lifecycle.disposed) lifecycle.scheduleFrame("stage-surface-bind", bindSurface, "stage-geometry:bind-surface-frame");
				};
				bindSurface();
				if (typeof MutationObserver === "function" && document.body) {
					structureObserver = createManagedMutationObserver((records) => {
						if (hasStageSurfaceMutation(records)) scheduleSurfaceBind();
					});
					structureObserver.observe(document.body, {
						childList: true,
						subtree: true
					});
				}
				window.addEventListener("resize", scheduleStageGeometry, { passive: true });
				const cleanup = () => {
					resizeObserver?.disconnect();
					structureObserver?.disconnect();
					window.removeEventListener("resize", scheduleStageGeometry);
					stageNode.style.removeProperty("left");
					stageNode.style.removeProperty("width");
				};
				lifecycle.add(cleanup, "stage-geometry:restore-surface");
				return () => lifecycle.dispose();
			}, [enabled, state.sessionId]);
			React.useEffect(() => {
				if (!enabled) return;
				const stageNode = stageRef.current;
				if (!stageNode) return;
				const lifecycle = claimContentFadeLifecycle(stageNode);
				let revealFrame = 0;
				let resizeObserver = null;
				let structureObserver = null;
				let cleanupTimer = 0;
				let observedEye = null;
				let observedSurface = null;
				let surface = null;
				const cancelFrames = () => {
					if (revealFrame) cancelAnimationFrame(revealFrame);
					revealFrame = 0;
				};
				const cancelCleanup = () => {
					if (!cleanupTimer) return;
					clearTimeout(cleanupTimer);
					cleanupTimer = 0;
				};
				const restoreSurface = () => {
					if (!surface) return;
					surface.classList.remove("dsh-fairy-content-mask", "dsh-fairy-content-fade");
					[
						"--dsh-fade-x",
						"--dsh-fade-y",
						"--dsh-fade-rx",
						"--dsh-fade-ry",
						"--dsh-fade-core",
						"--dsh-fade-soft-1",
						"--dsh-fade-soft-2",
						"--dsh-fade-soft-3"
					].forEach((name) => surface.style.removeProperty(name));
					surface = null;
				};
				const clearContentFade = (delayed = false) => {
					cancelFrames();
					surface?.classList.remove("dsh-fairy-content-fade");
					if (!delayed) {
						cancelCleanup();
						restoreSurface();
						return;
					}
					if (cleanupTimer) return;
					cleanupTimer = window.setTimeout(() => {
						cleanupTimer = 0;
						if (!visibleRef.current) restoreSurface();
					}, 360);
				};
				const scheduleContentFade = () => {
					if (!lifecycle.disposed) lifecycle.scheduleFrame("content-fade-sync", applyContentFade, "content-fade:sync-frame");
				};
				const asFadePercent = (ratio) => Math.round(ratio * 1e3) / 10 + "%";
				const applyContentFade = () => {
					const eye = stageNode.querySelector("#dsh-fairy-root");
					const nextSurface = conversationScroll(conversation(document));
					if (!visibleRef.current) return clearContentFade(true);
					if (!eye || !nextSurface) return clearContentFade();
					if (!chatFlows(document).some((flow) => {
						const rect = flow.getBoundingClientRect();
						return flow.isConnected && rect.width > 0 && rect.height > 0;
					})) return clearContentFade();
					cancelCleanup();
					if (surface !== nextSurface) {
						restoreSurface();
						surface = nextSurface;
						surface.classList.add("dsh-fairy-content-mask");
					}
					const eyeBoundary = eye.querySelector(".dsh-fairy-outer-disc") || eye;
					const eyeRect = eyeBoundary.getBoundingClientRect();
					const eyeX = eyeRect.left + eyeRect.width * .5;
					const eyeY = eyeRect.top + eyeRect.height * .5;
					const surfaceRect = surface.getBoundingClientRect();
					const fadeFeatherX = Math.max(56, Math.min(76, eyeRect.width * .24));
					const fadeFeatherY = Math.max(46, Math.min(64, eyeRect.height * .2));
					const fadeRadiusX = Math.round(eyeRect.width * .5 + fadeFeatherX);
					const fadeRadiusY = Math.round(eyeRect.height * .5 + fadeFeatherY);
					const eyeBoundaryRatio = Math.min(.88, Math.max(eyeRect.width * .5 / fadeRadiusX, eyeRect.height * .5 / fadeRadiusY));
					const featherRatio = 1 - eyeBoundaryRatio;
					surface.style.setProperty("--dsh-fade-x", Math.round(eyeX - surfaceRect.left) + "px");
					surface.style.setProperty("--dsh-fade-y", Math.round(eyeY - surfaceRect.top) + "px");
					surface.style.setProperty("--dsh-fade-rx", fadeRadiusX + "px");
					surface.style.setProperty("--dsh-fade-ry", fadeRadiusY + "px");
					surface.style.setProperty("--dsh-fade-core", asFadePercent(eyeBoundaryRatio));
					surface.style.setProperty("--dsh-fade-soft-1", asFadePercent(eyeBoundaryRatio + featherRatio * .28));
					surface.style.setProperty("--dsh-fade-soft-2", asFadePercent(eyeBoundaryRatio + featherRatio * .58));
					surface.style.setProperty("--dsh-fade-soft-3", asFadePercent(eyeBoundaryRatio + featherRatio * .84));
					if (revealFrame) cancelAnimationFrame(revealFrame);
					revealFrame = requestAnimationFrame(() => {
						revealFrame = 0;
						if (visibleRef.current && surface?.isConnected) surface.classList.add("dsh-fairy-content-fade");
					});
					if (resizeObserver && (observedEye !== eyeBoundary || observedSurface !== surface)) {
						resizeObserver.disconnect();
						observedEye = eyeBoundary;
						observedSurface = surface;
						resizeObserver.observe(eyeBoundary);
						resizeObserver.observe(surface);
					}
				};
				if (typeof ResizeObserver === "function") resizeObserver = new ResizeObserver(scheduleContentFade);
				if (typeof MutationObserver === "function" && document.body) {
					structureObserver = createManagedMutationObserver((records) => {
						if (hasChatSurfaceMutation(records)) scheduleContentFade();
					});
					structureObserver.observe(document.body, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: [OFFICIAL_ATTRIBUTES.chatFlow, OFFICIAL_ATTRIBUTES.conversationScroll]
					});
				}
				window.addEventListener("resize", scheduleContentFade, { passive: true });
				window.addEventListener(MASCOT_GEOMETRY_EVENT, scheduleContentFade, { passive: true });
				fadeLifecycleRef.current = (nextVisible) => {
					if (nextVisible) {
						cancelCleanup();
						scheduleContentFade();
					} else clearContentFade(true);
				};
				scheduleContentFade();
				const cleanup = () => {
					fadeLifecycleRef.current = null;
					cancelFrames();
					resizeObserver?.disconnect();
					structureObserver?.disconnect();
					if (cleanupTimer) clearTimeout(cleanupTimer);
					restoreSurface();
					window.removeEventListener("resize", scheduleContentFade);
					window.removeEventListener(MASCOT_GEOMETRY_EVENT, scheduleContentFade);
				};
				lifecycle.add(cleanup, "content-fade:restore-surface");
				return () => lifecycle.dispose();
			}, [enabled, state.sessionId]);
			React.useEffect(() => {
				fadeLifecycleRef.current?.(visible);
			}, [visible]);
			return jsx("div", {
				ref: stageRef,
				className: "dsh-fairy-root dsh-fairy-stage",
				hidden: !enabled,
				"data-visible": String(visible),
				"data-fairy-visual-active": visible ? "true" : "false",
				"data-fairy-state": state.activity,
				"data-fairy-low-power": state.settings.powerMode === "low-power" ? "true" : void 0,
				"aria-hidden": "true"
			});
		}
		function StageHost({ controller }) {
			const state = useController(controller);
			React.useLayoutEffect(() => {
				const lifecycle = claimSingleton(document, "stage-host", createLifecycleScope("stage-host"));
				injectStyles();
				lifecycle.add(semanticMarkersManager.install(), "stage-host:semantic-markers");
				lifecycle.add(mountComposerDock(controller), "stage-host:composer-dock");
				return () => lifecycle.dispose();
			}, [controller]);
			return jsxs(React.Fragment, { children: [
				jsx(HddBackgroundFxHost, { enabled: state.settings.enabled }),
				jsx(SidebarBoardCutout, { enabled: state.settings.enabled }),
				jsx(HddOverlayScrollbars, { enabled: state.settings.enabled }),
				jsx(Stage, { state }),
				jsx(HeroHost, { controller }),
				jsx(ActiveComposerPlaceholder, { controller }),
				jsx(HeroToggleHost, { controller }),
				jsx(BrandHost, { controller }),
				jsx(PowerHost, { controller })
			] });
		}
		function BrandHost({ controller }) {
			const state = useController(controller);
			const hostRef = React.useRef(null);
			const enabled = state.settings.enabled;
			const [positioned, setPositioned] = React.useState(false);
			React.useEffect(() => {
				const host = hostRef.current;
				if (!host || !enabled) {
					setPositioned(false);
					return;
				}
				const lifecycle = claimBrandSidebarGeometry(host);
				let brand = null;
				let resizeObserver = null;
				let structureObserver = null;
				const syncBrandGeometry = () => {
					const next = sidebar(document)?.querySelector("[data-dsh-fairy-brand-anchor=\"true\"]") || null;
					if (next !== brand) {
						lifecycle.replaceBinding("brand-node", () => resizeObserver?.disconnect(), "brand-geometry:node-resize-observer");
						resizeObserver?.disconnect();
						brand = next;
						if (typeof ResizeObserver === "function" && brand) {
							resizeObserver = new ResizeObserver(scheduleBrandGeometry);
							resizeObserver.observe(brand);
							if (brand.parentElement) resizeObserver.observe(brand.parentElement);
						}
					}
					if (!brand) {
						setPositioned(false);
						return;
					}
					const rect = brand.getBoundingClientRect();
					if (rect.width < 1 || rect.height < 1) {
						setPositioned(false);
						return;
					}
					host.style.left = Math.round(rect.left) + "px";
					host.style.top = Math.round(rect.top + rect.height * .5 - 21) + "px";
					setPositioned(true);
				};
				const scheduleBrandGeometry = () => {
					if (!lifecycle.disposed) lifecycle.scheduleFrame("brand-geometry-sync", syncBrandGeometry, "brand-geometry:sync-frame");
				};
				syncBrandGeometry();
				if (typeof MutationObserver === "function" && document.body) {
					structureObserver = createManagedMutationObserver((records) => {
						if (mutationTouchesSurface(records, `${OFFICIAL_SELECTORS.sidebar}, ${OFFICIAL_SELECTORS.sidebarBrandMark}, ${OFFICIAL_SELECTORS.newSession}`, ["aria-label", "data-dsh-fairy-brand-anchor"])) scheduleBrandGeometry();
					});
					structureObserver.observe(document.body, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["aria-label", "data-dsh-fairy-brand-anchor"]
					});
				}
				window.addEventListener("resize", scheduleBrandGeometry, { passive: true });
				const cleanup = () => {
					resizeObserver?.disconnect();
					structureObserver?.disconnect();
					window.removeEventListener("resize", scheduleBrandGeometry);
					host.style.removeProperty("left");
					host.style.removeProperty("top");
				};
				lifecycle.add(cleanup, "brand-geometry:restore-host");
				return () => lifecycle.dispose();
			}, [enabled]);
			return jsx("div", {
				ref: hostRef,
				className: "dsh-fairy-brand-host",
				"data-positioned": String(positioned),
				hidden: !enabled || !positioned,
				children: jsx(FairyMark, { controller })
			});
		}
		function PowerToggle({ controller }) {
			const on = useController(controller).settings.powerMode === "low-power";
			return jsxs("button", {
				type: "button",
				className: "dsh-fairy-power-toggle",
				"data-on": String(on),
				"aria-pressed": String(on),
				"aria-label": on ? "关闭省电模式" : "开启省电模式",
				onClick: () => save(controller, "powerMode", on ? "normal" : "low-power"),
				children: [jsx("span", { className: "dsh-fairy-power-dot" }), on ? "省电模式" : "普通模式"]
			});
		}
		function PowerHost({ controller }) {
			const state = useController(controller);
			const hostRef = React.useRef(null);
			const [positioned, setPositioned] = React.useState(false);
			const enabled = state.settings.enabled;
			React.useLayoutEffect(() => {
				const host = hostRef.current;
				if (!host || !enabled) {
					setPositioned(false);
					return;
				}
				const lifecycle = claimPowerModeGeometry(host);
				let balance = null;
				let conversation = null;
				let resizeObserver = null;
				let structureObserver = null;
				const syncPowerGeometry = () => {
					const nextBalance = balanceAction(document);
					const nextConversation = resolveStageSurface();
					if (nextBalance !== balance || nextConversation !== conversation) {
						resizeObserver?.disconnect();
						balance = nextBalance;
						conversation = nextConversation;
						if (typeof ResizeObserver === "function") {
							resizeObserver = new ResizeObserver(schedulePowerGeometry);
							if (balance) resizeObserver.observe(balance);
							if (conversation) resizeObserver.observe(conversation);
						}
					}
					if (!balance || !conversation) return setPositioned(false);
					const balanceRect = balance.getBoundingClientRect();
					const conversationRect = conversation.getBoundingClientRect();
					const dailyRow = balance.children[1];
					const amountRow = balance.children[2];
					if (!dailyRow || !amountRow) return setPositioned(false);
					const rectUnion = (nodes) => {
						const rects = nodes.map((node) => node?.getBoundingClientRect()).filter((rect) => rect && rect.width > 0 && rect.height > 0);
						if (!rects.length) return null;
						const left = Math.min(...rects.map((rect) => rect.left));
						const top = Math.min(...rects.map((rect) => rect.top));
						const right = Math.max(...rects.map((rect) => rect.right));
						const bottom = Math.max(...rects.map((rect) => rect.bottom));
						return {
							left,
							top,
							right,
							bottom,
							width: right - left,
							height: bottom - top
						};
					};
					const dailyRect = rectUnion([...dailyRow.children]) || rectUnion([dailyRow]);
					const amountRect = amountRow.getBoundingClientRect();
					if (!dailyRect || amountRect.width <= 0 || amountRect.height <= 0) return setPositioned(false);
					const left = Math.round(dailyRect.left + (dailyRect.width - POWER_TOGGLE_WIDTH) / 2);
					const top = Math.round(amountRect.top + (amountRect.height - POWER_TOGGLE_HEIGHT) / 2);
					if (!(balanceRect.width >= 180 && left >= balanceRect.left + 8 && left + POWER_TOGGLE_WIDTH <= balanceRect.right - 4 && left + POWER_TOGGLE_WIDTH <= conversationRect.left - 4 && top >= balanceRect.top + 4 && top + POWER_TOGGLE_HEIGHT <= balanceRect.bottom - 4) || balanceRect.height < 26) return setPositioned(false);
					host.style.left = left + "px";
					host.style.top = top + "px";
					setPositioned(true);
				};
				const schedulePowerGeometry = () => {
					if (!lifecycle.disposed) lifecycle.scheduleFrame("power-geometry-sync", syncPowerGeometry, "power-geometry:sync-frame");
				};
				syncPowerGeometry();
				if (typeof MutationObserver === "function" && document.body) {
					structureObserver = createManagedMutationObserver((records) => {
						if (mutationTouchesSurface(records, `${OFFICIAL_SELECTORS.sidebar}, ${OFFICIAL_SELECTORS.conversation}, ${OFFICIAL_SELECTORS.balance}`)) schedulePowerGeometry();
					});
					structureObserver.observe(document.body, {
						childList: true,
						subtree: true
					});
				}
				window.addEventListener("resize", schedulePowerGeometry, { passive: true });
				const cleanup = () => {
					resizeObserver?.disconnect();
					structureObserver?.disconnect();
					window.removeEventListener("resize", schedulePowerGeometry);
					host.style.removeProperty("left");
					host.style.removeProperty("top");
				};
				lifecycle.add(cleanup, "power-geometry:restore-host");
				return () => lifecycle.dispose();
			}, [enabled]);
			return jsx("div", {
				ref: hostRef,
				className: "dsh-fairy-power-host",
				hidden: !enabled || !positioned,
				children: jsx(PowerToggle, { controller })
			});
		}
		function useHddVisualMode() {
			const readMode = () => document.documentElement?.hasAttribute("data-dsh-fairy-visual") === true;
			const observerManager = getDomObserverManager(document);
			React.useEffect(() => {
				if (readMode()) observerManager.resume();
				else observerManager.suspend();
			});
			return React.useSyncExternalStore((notify) => {
				if (typeof MutationObserver !== "function" || !document.documentElement) return () => {};
				const observer = createManagedMutationObserver(notify);
				observer.observe(document.documentElement, {
					attributes: true,
					attributeFilter: ["data-dsh-fairy-visual"]
				});
				return () => observer.disconnect();
			}, readMode, readMode);
		}
		function SessionMetricsControl() {
			const [open, setOpen] = React.useState(false);
			const [, setRevision] = React.useState(0);
			const buttonRef = React.useRef(null);
			const panelRef = React.useRef(null);
			const hdd = useHddVisualMode();
			const readStats = () => conversationComposerDock()?.textContent?.trim().replace(/\s+/g, " ") || "";
			const statItems = readStats().split(/\s*\|\s*/).map((item) => item.trim()).filter(Boolean);
			React.useEffect(() => {
				if (!hdd) return void 0;
				const source = conversationComposerDock();
				if (!source || typeof MutationObserver !== "function") return void 0;
				const observer = createManagedMutationObserver(() => setRevision((value) => value + 1));
				observer.observe(source, {
					childList: true,
					subtree: true,
					characterData: true
				});
				return () => observer.disconnect();
			}, [hdd]);
			React.useEffect(() => {
				if (!open) return void 0;
				const onPointerDown = (event) => {
					if (buttonRef.current?.contains(event.target) || panelRef.current?.contains(event.target)) return;
					setOpen(false);
				};
				const onKeyDown = (event) => {
					if (event.key === "Escape") {
						setOpen(false);
						buttonRef.current?.focus();
					}
				};
				document.addEventListener("pointerdown", onPointerDown, true);
				document.addEventListener("keydown", onKeyDown);
				return () => {
					document.removeEventListener("pointerdown", onPointerDown, true);
					document.removeEventListener("keydown", onKeyDown);
				};
			}, [open]);
			if (!hdd) return null;
			const panelId = "dsh-fairy-session-metrics-panel";
			return jsxs("span", {
				className: "dsh-fairy-session-metrics",
				children: [jsx("button", {
					ref: buttonRef,
					type: "button",
					className: "dsh-fairy-session-metrics-button",
					"aria-expanded": open,
					"aria-controls": panelId,
					onClick: () => setOpen((value) => !value),
					children: "统计"
				}), open ? jsx("div", {
					ref: panelRef,
					id: panelId,
					className: "dsh-fairy-session-metrics-panel",
					role: "dialog",
					"aria-label": "会话统计",
					children: statItems.length ? statItems.map((item, index) => jsx("div", {
						className: "dsh-fairy-session-metrics-item",
						children: item
					}, `${index}:${item}`)) : "暂无会话统计"
				}) : null]
			});
		}
		function StartupAnimationSettings() {
			const h = React.createElement;
			const api = window.fairyShell.startup;
			const [state, setState] = React.useState(null);
			const [busy, setBusy] = React.useState(false);
			const [message, setMessage] = React.useState("");
			const active = React.useRef(true);
			const locked = React.useRef(false);
			React.useEffect(() => {
				active.current = true;
				api.get().then((value) => {
					if (active.current) setState(value);
				}).catch((error) => {
					if (active.current) setMessage(error.message || "读取设置失败。");
				});
				return () => {
					active.current = false;
				};
			}, [api]);
			async function run(task, notice = "设置已保存，下次启动生效。") {
				if (locked.current) return;
				locked.current = true;
				setBusy(true);
				setMessage("");
				try {
					const value = await task();
					if (active.current) {
						setState(value);
						setMessage(notice);
					}
				} catch (error) {
					if (active.current) setMessage(error.message || "操作失败，请重试。");
				} finally {
					locked.current = false;
					if (active.current) setBusy(false);
				}
			}
			const controlStyle = {
				font: "inherit",
				border: "1px solid var(--dsw-alias-border-standard, #b8c3ce)",
				borderRadius: 8,
				padding: "6px 12px",
				color: "inherit",
				background: "var(--dsw-alias-surface-l1, #edf3f7)"
			};
			const labelStyle = {
				display: "flex",
				gap: 10,
				alignItems: "center",
				flexWrap: "wrap"
			};
			const check = (key, label) => h("label", {
				key,
				style: labelStyle
			}, h("input", {
				type: "checkbox",
				style: {
					width: 16,
					height: 16,
					accentColor: "#2189a5"
				},
				checked: !!state[key],
				disabled: busy,
				onChange: (e) => run(() => api.update({ [key]: e.target.checked }))
			}), label);
			return h("div", {
				"data-fairy-startup-settings": "",
				style: {
					display: "grid",
					gap: 16,
					padding: 20,
					maxWidth: 780,
					fontFamily: "\"Segoe UI\", \"Microsoft YaHei\", sans-serif",
					fontSize: 14,
					fontWeight: 400,
					lineHeight: 1.6
				}
			}, h("p", { style: { margin: 0 } }, "启动动画与 Fairy 窗口大小一致，视频等比铺满窗口。可选择播放完再进入；跳过动画不取消后台启动。"), state ? h(React.Fragment, null, check("enabled", "启用启动加载动画"), check("waitForEnd", "播放完再进入 Fairy"), h("small", null, "开启：动画播放完且主界面就绪后进入；关闭：主界面就绪立即进入。默认关闭，播放失败自动放行；也可点击跳过动画。"), h("div", { style: { overflowWrap: "anywhere" } }, "当前视频：", h("strong", null, state.videoName)), h("label", { style: labelStyle }, "播放速度", h("select", {
				style: controlStyle,
				"aria-label": "启动动画播放速度",
				value: state.speed,
				disabled: busy,
				onChange: (e) => run(() => api.update({ speed: Number(e.target.value) }))
			}, ...Array.from({ length: 12 }, (_, i) => (i + 1) / 4).map((speed) => h("option", {
				key: speed,
				value: speed
			}, speed + " 倍")))), check("muted", "静音播放"), h("div", { style: {
				display: "flex",
				flexWrap: "wrap",
				gap: 10
			} }, h("button", {
				type: "button",
				style: {
					...controlStyle,
					cursor: busy ? "wait" : "pointer"
				},
				disabled: busy,
				onClick: () => run(() => api.choose(), "视频设置已保存。可点击预览检查效果。")
			}, busy ? "处理中…" : "替换启动视频"), h("button", {
				type: "button",
				style: {
					...controlStyle,
					cursor: busy ? "wait" : "pointer"
				},
				disabled: busy,
				onClick: () => run(() => api.preview(), "已打开动画预览。")
			}, "预览动画"), h("button", {
				type: "button",
				style: {
					...controlStyle,
					cursor: busy ? "wait" : "pointer"
				},
				disabled: busy,
				onClick: () => run(() => api.reset(), "已恢复默认视频、1 倍速度、静音及不等待播放完。")
			}, "恢复默认")), h("small", null, "支持 MP4、MOV、MKV、AVI、WebM、M4V；文件不超过 1 GB。导入时自动转换兼容格式，最长保留 60 秒，通常需要几秒至几分钟。原文件不会被修改。")) : h("p", null, "正在读取动画设置…"), h("div", {
				role: "status",
				"aria-live": "polite",
				style: {
					overflowWrap: "anywhere",
					minHeight: 24
				}
			}, message));
		}
        function Settings({ controller }) {
            const state = useController(controller);
            return jsxs("section", { style: { display: "grid", gap: 16, padding: 16 }, children: [
                jsx("h2", { children: "HDD / Fairy 视觉界面" }),
                jsx("p", { children: "仅改变界面外观，不修改 DSH 模型、人格、权限或历史会话。" }),
                ...[
                    ["enabled", "启用 HDD 视觉", state.settings.enabled],
                    ["mascotVisible", "显示 Fairy 主视觉", state.settings.mascotVisible],
                ].map(([key, label, checked]) => jsx("label", { children: [jsx("input", { type: "checkbox", checked, onChange: event => save(controller, key, event.target.checked) }), " " + label] }, key)),
                jsx("label", { children: [jsx("input", { type: "checkbox", checked: state.settings.theme === "light", onChange: event => save(controller, "theme", event.target.checked ? "light" : "dark") }), " HDD 日间模式"] }),
                jsx("label", { children: [jsx("input", { type: "checkbox", checked: state.settings.powerMode === "low-power", onChange: event => save(controller, "powerMode", event.target.checked ? "low-power" : "normal") }), " 低功耗模式"] }),
                jsx("label", { children: ["Fairy 尺寸 ", jsx("input", { type: "range", min: 0.55, max: 1, step: 0.01, value: state.settings.mascotScale, onChange: event => save(controller, "mascotScale", Number(event.target.value)), "aria-label": "Fairy 尺寸" })] }),
                jsx("label", { children: ["动画速度 ", jsx("select", { value: state.settings.mascotAnimationSpeed, onChange: event => save(controller, "mascotAnimationSpeed", Number(event.target.value)), children: [0.7, 1, 1.5].map(value => jsx("option", { value, children: value + " 倍速" }, value)) })] })
            ] });
        }
		function apply(ctx) {
			return diagnostics.guard("apply", () => {
				const settings = ctx.configForms.get(SETTINGS_NAMESPACE);
				syncDocumentMode(settings.getSnapshot());
				injectStyles();
				const selectionGuard = createSelectionGuard({ selector: [
					OFFICIAL_SELECTORS.sidebarResizeHandle,
					".dsh-fairy-composer-resizer",
					".dsh-history-overlay-scrollbar-thumb"
				].join(",") });
				ctx.effect(() => () => selectionGuard.dispose(), "dsh-fairy-visual selection guard");
				const decisionGuard = createDecisionPointerGuard();
				ctx.effect(() => () => decisionGuard.dispose(), "dsh-fairy-visual decision pointer guard");
				const controller = new Controller(settings, ctx.sessions);
				if (typeof window !== "undefined" && typeof process !== "undefined" && true) window.__fairyVisualLifecycle = { inspectController: () => controller.lifecycle?.inspect?.() || [] };
				ctx.effect(() => () => controller.dispose(), "dsh-fairy-visual controller");
				ctx.slots.inject("shell.overlay", () => ctx.slots.register({
					name: "shell.overlay",
					id: "dsh-fairy-visual-stage",
					order: 10
				}, () => jsx(StageHost, { controller })));
				ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
					name: "conversation.session.header.utilities",
					id: "dsh-fairy-session-metrics",
					order: 80
				}, () => jsx(SessionMetricsControl, {})));
				ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
					name: "conversation.session.header.utilities",
					id: "dsh-fairy-visual-toggle",
					order: 90
				}, () => jsx(Toggle, { controller })));
				ctx.slots.inject("settings.section", () => ctx.slots.register({
					name: "settings.section",
					id: "dsh-fairy-visual",
					order: 45,
					label: () => "HDD / Fairy 视觉"
				}, () => jsx(Settings, {
					controller
				})));
				if (typeof window !== "undefined" && window.fairyShell?.startup) ctx.slots.inject("settings.section", () => ctx.slots.register({
					name: "settings.section",
					id: "fairy-startup-animation",
					order: 46,
					label: () => "启动动画"
				}, () => jsx(StartupAnimationSettings, {})));
			}, { surface: "client" });
		}
		module.exports = {
			apply,
			inject: [
				"slots",
				"sessions",
				"configForms"
			],
			name: "dsh-fairy-visual"
		};
	}));

//#endregion
return require_client();

})(); })();
const voice = (() => { 
    const React = require('react');
    const jsx = require('react/jsx-runtime');
    const { Tooltip, IconPauseOutlineRegular, IconPlayOutlineRegular, IconStopFillRegular } = require('@deepseek-ai/dsh-client-ui-primitives');

    const EVENT_PLAY = 'fairy-voice-play';
    const EVENT_STATE = 'fairy-voice-state';
    const EVENT_AVAILABILITY = 'fairy-voice-availability';
    const EVENT_BRAIN_CONFIG = 'fairy-voice-brain-config';
    const EVENT_AUTO_READ = 'fairy-voice-auto-read';
    const SETTINGS_AUTO = 'dsh.fairyVoice.autoRead.v4';
    const SETTINGS_VOLUME = 'dsh.fairyVoice.volume';
    const PCM_SAMPLE_RATE = 32000;
    const PCM_BYTES_PER_SAMPLE = 2;
    const PLAYBACK_GROUP_SIZE = 4;
    /* The CPU service's smallest measured first PCM burst is about 740ms.
     * 450ms starts promptly while leaving scheduling headroom; subsequent
     * sources stay on Web Audio's absolute timeline rather than JS timers. */
    const PLAYBACK_PREBUFFER_SECONDS = 0.65;
    const PLAYBACK_SCHEDULE_LEAD_SECONDS = 0.075;
    const PLAYBACK_MAX_SCHEDULED_SECONDS = 4.8;
    const PLAYBACK_MIN_BUFFER_SECONDS = 0.08;
    const PLAYBACK_MIN_BUFFER_BYTES = PCM_SAMPLE_RATE * PCM_BYTES_PER_SAMPLE * PLAYBACK_MIN_BUFFER_SECONDS;
    const PCM_EDGE_RAMP_SAMPLES = Math.round(PCM_SAMPLE_RATE * 0.005);
    const STOP_FADE_SECONDS = 0.012;
    const SESSION_BASELINE_SETTLE_MS = 1250;
    const FINAL_PLAYBACK_SETTLE_MS = 900;
    const VOICE_REPORT_DELAY_MS = 4500;
    const VOICE_REPORT_COOLDOWN_MS = 15000;
    const VOICE_BRIEF_THRESHOLD = 260;
    const AVAILABILITY_TTL_MS = 30_000;
    const VOICE_STYLE_ID = 'dsh-fairy-voice-controls-style';
    const LOCAL_TTS_ENDPOINT = '/fairy-voice';
    const MAX_TRACKED_SESSION_STATES = 32;
    const { FAIRY_VOICE_CONTROL_ATTRIBUTE } = (() => {
      const module = { exports: {} };
// DSH_FAIRY_CLIENT_DOM_BEGIN
const FAIRY_VOICE_CONTROL_ATTRIBUTE = 'data-dsh-fairy-voice-control';

module.exports = { FAIRY_VOICE_CONTROL_ATTRIBUTE };
// DSH_FAIRY_CLIENT_DOM_END
      return module.exports;
    })();
    const createFairyDiagnostics = (() => {
      const module = { exports: {} };
// DSH_FAIRY_CLIENT_DIAGNOSTICS_BEGIN
const FAIRY_LOG_PREFIX = 'DSH_FAIRY_LOG';
const SENSITIVE_KEY = /authorization|credential|password|secret|token|api[_-]?key|cookie/i;

function sanitize(value, key = '', depth = 0) {
  if (SENSITIVE_KEY.test(key)) return '[redacted]';
  if (value == null || typeof value === 'boolean' || typeof value === 'number') return value;
  if (typeof value === 'string') return value.length > 320 ? `${value.slice(0, 320)}…` : value;
  if (depth >= 2) return '[truncated]';
  if (Array.isArray(value)) return value.slice(0, 12).map((item) => sanitize(item, '', depth + 1));
  if (typeof value === 'object') return Object.fromEntries(Object.entries(value).slice(0, 24).map(([name, item]) => [name, sanitize(item, name, depth + 1)]));
  return String(value);
}

function createFairyDiagnostics(moduleName, sink = console) {
  const recentErrors = new Map();
  const clock = () => typeof performance === 'object' && performance?.now ? performance.now() : Date.now();
  const emit = (level, operation, event, context = {}, error, durationMs) => {
    const normalizedError = error ? { name: String(error.name || 'Error'), code: error.code == null ? undefined : String(error.code), message: String(error.message || error).slice(0, 320) } : undefined;
    if (normalizedError) {
      const signature = `${operation}:${normalizedError.code || normalizedError.message}`;
      const now = Date.now();
      if (now - (recentErrors.get(signature) || 0) < 60_000) return null;
      recentErrors.set(signature, now);
    }
    const record = { schema: 1, timestamp: new Date().toISOString(), level, module: moduleName, operation, event, context: sanitize(context), ...(normalizedError ? { error: normalizedError } : {}), ...(Number.isFinite(durationMs) ? { duration_ms: Number(durationMs.toFixed(3)) } : {}) };
    const writer = level === 'error' ? sink.error : level === 'warn' ? sink.warn : sink.info || sink.log;
    writer.call(sink, `${FAIRY_LOG_PREFIX} ${JSON.stringify(record)}`);
    return record;
  };
  const start = () => clock();
  const metric = (operation, startedAt, context = {}, options = {}) => {
    const duration = clock() - startedAt;
    return duration < (options.thresholdMs || 0) ? null : emit('info', operation, 'metric', context, undefined, duration);
  };
  const guard = (operation, callback, context = {}) => {
    const startedAt = start();
    try {
      const result = callback();
      metric(operation, startedAt, { ...context, outcome: 'success' });
      return result;
    } catch (error) {
      emit('error', operation, 'failure', context, error);
      metric(operation, startedAt, { ...context, outcome: 'failure' });
      throw error;
    }
  };
  return { start, metric, guard, info: (operation, context) => emit('info', operation, 'event', context), warn: (operation, context, error) => emit('warn', operation, 'failure', context, error), error: (operation, error, context) => emit('error', operation, 'failure', context, error) };
}

module.exports = { FAIRY_LOG_PREFIX, createFairyDiagnostics };
// DSH_FAIRY_CLIENT_DIAGNOSTICS_END
      return module.exports.createFairyDiagnostics;
    })();
    const diagnostics = createFairyDiagnostics('dsh-fairy-voice');
    let autoReadFallback = false;
    let autoReadStorageFailed = false;

    function readAutoReadPreference() {
      if (!autoReadStorageFailed) {
        try { autoReadFallback = localStorage.getItem(SETTINGS_AUTO) === 'true'; }
        catch (error) { diagnostics.warn('auto-read preference read', {}, error); }
      }
      return autoReadFallback;
    }

    function setAutoReadPreference(value) {
      const next = typeof value === 'function' ? Boolean(value(readAutoReadPreference())) : Boolean(value);
      autoReadFallback = next;
      try {
        localStorage.setItem(SETTINGS_AUTO, String(next));
        autoReadStorageFailed = false;
      } catch (error) {
        autoReadStorageFailed = true;
        diagnostics.warn('auto-read preference save', {}, error);
      }
      window.dispatchEvent(new Event(EVENT_AUTO_READ));
    }

    function subscribeAutoReadPreference(listener) {
      const onStorage = (event) => {
        if (event.key !== SETTINGS_AUTO && event.key !== null) return;
        // Ignore sessionStorage and unrelated origins; storage events only arrive
        // in other windows, so local updates use EVENT_AUTO_READ instead.
        try { if (event.storageArea && event.storageArea !== localStorage) return; } catch (_) {}
        autoReadStorageFailed = false;
        listener();
      };
      window.addEventListener(EVENT_AUTO_READ, listener);
      window.addEventListener('storage', onStorage);
      return () => {
        window.removeEventListener(EVENT_AUTO_READ, listener);
        window.removeEventListener('storage', onStorage);
      };
    }

    function useAutoReadPreference() {
      return [React.useSyncExternalStore(subscribeAutoReadPreference, readAutoReadPreference, readAutoReadPreference), setAutoReadPreference];
    }
    const voiceStateBySession = new Map();
    const emptyActiveSelection = { key: 'empty-chat', epoch: 0 };
    const emptyActiveSessionStore = { getSnapshot: () => emptyActiveSelection, subscribe: () => () => {} };
    const emptyVoiceTimeline = { found: [], currentTurnFinals: [], messagesById: new Map(), userSeq: 0, sessionKey: 'empty-chat', activity: { running: false, phase: null, turn: 0, toolNames: [] } };
    let activeSessionStore = null;

    function createVoiceRequestScope() {
      const controller = new AbortController();
      const timers = new Set();
      const cleanups = new Set();
      let cancelled = false;
      const cancel = (reason = 'client-aborted') => {
        if (cancelled) return;
        cancelled = true;
        controller.abort(reason);
        for (const timer of timers) clearTimeout(timer);
        timers.clear();
        for (const cleanup of cleanups) {
          try { cleanup(); } catch (error) { reportAudioLifecycleFailure('request cleanup', error); }
        }
        cleanups.clear();
      };
      return {
        controller,
        signal: controller.signal,
        get cancelled() { return cancelled; },
        timeout(callback, delay) {
          if (cancelled) return 0;
          const timer = setTimeout(() => {
            timers.delete(timer);
            if (!cancelled) callback();
          }, delay);
          timers.add(timer);
          return timer;
        },
        addCleanup(cleanup) {
          if (typeof cleanup !== 'function') return cleanup;
          if (cancelled) cleanup();
          else cleanups.add(cleanup);
          return cleanup;
        },
        cancel,
      };
    }

    function createSessionTimelineStore() {
      const listeners = new Set();
      let snapshot = emptyVoiceTimeline;
      return {
        getSnapshot: () => snapshot,
        subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
        set(next) {
          if (snapshot === next) return;
          snapshot = next;
          listeners.forEach((listener) => listener());
        },
        clear(expected) {
          if (expected && snapshot !== expected) return;
          snapshot = emptyVoiceTimeline;
          listeners.forEach((listener) => listener());
        },
      };
    }

    // Compatibility name retained for the existing plugin contract; the
    // implementation is the session-scoped timeline store above.
    function createVoiceTimelineStore() {
      return createSessionTimelineStore();
    }

    const voiceTimelineStore = createVoiceTimelineStore();

    // The client-side transport boundary keeps local TTS and Voice Brain HTTP
    // details out of playback policy and the settings UI.
    function createLocalTtsTransport(fetchImpl = fetch) {
      const request = (operation, url, options) => {
        const startedAt = diagnostics.start();
        return Promise.resolve().then(() => fetchImpl(url, options)).then((response) => {
          diagnostics.metric(operation, startedAt, { status: response.status }, { thresholdMs: 100 });
          return response;
        }, (error) => {
          if (error?.name !== 'AbortError') diagnostics.warn(operation, {}, error);
          diagnostics.metric(operation, startedAt, { outcome: 'failure' }, { thresholdMs: 100 });
          throw error;
        });
      };
      return {
        prepare(markdown, signal) {
          return request('speech.prepare.request', LOCAL_TTS_ENDPOINT + '/prepare', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ markdown }), signal
          }).then(async (response) => {
            const value = await response.json();
            if (!response.ok) throw new Error(value?.error?.message || 'Unable to prepare speech.');
            return value.sentences || [];
          });
        },
        status(signal) {
          return request('status.request', LOCAL_TTS_ENDPOINT + '/status', { cache: 'no-store', signal }).then(async (response) => {
            const value = await response.json();
            return response.ok ? value : { available: false, reason: '本地 Fairy 服务未启动。' };
          });
        },
        stream(text, signal) {
          return request('tts.stream.request', LOCAL_TTS_ENDPOINT + '/tts', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }), signal
          });
        }
      };
    }

    function createVoiceBrainClient(fetchImpl = fetch) {
      const request = (operation, url, options) => {
        const startedAt = diagnostics.start();
        return Promise.resolve().then(() => fetchImpl(url, options)).then((response) => {
          diagnostics.metric(operation, startedAt, { status: response.status }, { thresholdMs: 100 });
          return response;
        }, (error) => {
          if (error?.name !== 'AbortError') diagnostics.warn(operation, {}, error);
          throw error;
        });
      };
      return {
        status() {
          return request('brain.status.request', LOCAL_TTS_ENDPOINT + '/brain/status', { cache: 'no-store' }).then(async (response) => {
            const value = await response.json();
            return response.ok ? value : { configured: false, model: 'deepseek-v4-flash' };
          });
        },
        brief(markdown, signal) {
          return request('brain.brief.request', LOCAL_TTS_ENDPOINT + '/brain/brief', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ markdown }), signal
          }).then(async (response) => {
            const value = await response.json();
            if (!response.ok) throw new Error(value?.error?.message || 'Voice brief unavailable.');
            return typeof value?.brief === 'string' ? value.brief.trim() : '';
          });
        },
        config(payload) {
          return request('brain.config.request', LOCAL_TTS_ENDPOINT + '/brain/config', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), cache: 'no-store'
          }).then(async (response) => {
            const value = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(value?.error?.message || '本地语音简报服务未响应。');
            return value;
          }).catch((error) => {
            if (error instanceof TypeError || error?.name === 'SyntaxError') throw new Error('无法连接本地语音简报服务。请重新加载 DSH 后重试。');
            throw error;
          });
        }
      };
    }

    const localTtsTransport = createLocalTtsTransport();
    const voiceBrainClient = createVoiceBrainClient();

    const VOICE_REPORTS = {
      searching: ['主人，正在检索相关资料。', '资料仍在核验中，我继续盯着。', '检索还在进行，正在筛选有效信息。'],
      tool: ['行动步骤已启动，请稍候。', '必要操作仍在执行中。', '执行进度正常，我继续处理。'],
      working: ['主人，正在整理信息。', '信息还在汇总，我继续梳理。', '正在计算可执行结论。']
    };

    function isSearchTool(name) {
      // A search announcement is permitted only when the tool identifier says
      // so. Assistant prose, reasoning, and UI labels are never treated as evidence.
      const value = String(name || '').trim().toLowerCase();
      return /(^|[._/-])(web_)?search([._/-]|$)|(^|[._/-])search_web([._/-]|$)|搜索|检索/.test(value);
    }

    function clampVolume(value) {
      const number = Number(value);
      return Number.isFinite(number) ? Math.min(1, Math.max(0, number)) : 1;
    }

    function reportAudioLifecycleFailure(operation, error) {
      if (error?.name === 'InvalidStateError' || error?.name === 'AbortError') return;
      diagnostics.warn('audio.lifecycle', { operation }, error);
    }

    function reportAudioResources(current, operation) {
      diagnostics.info('audio.resources', {
        operation,
        activeSources: current?.sources?.size || 0,
        activeObjectUrls: current?.urls?.size || 0,
        contextState: current?.context?.state || 'none',
      });
    }

    function createPcmStreamHandler() {
      return {
        decodeInto(bytes, samples) {
          for (let offset = 0, index = 0; offset < bytes.length && index < samples.length; offset += PCM_BYTES_PER_SAMPLE, index += 1) {
            const value16 = bytes[offset] | (bytes[offset + 1] << 8);
            samples[index] = (value16 & 0x8000 ? value16 - 0x10000 : value16) / 0x8000;
          }
        },
        playableLength(bytes) {
          return bytes.length - (bytes.length % PCM_BYTES_PER_SAMPLE);
        }
      };
    }

    const pcmStreamHandler = createPcmStreamHandler();

    // TTS fragments are independently synthesized and can begin/end away from
    // zero. A short edge ramp prevents a discontinuity becoming an audible click
    // when adjacent AudioBufferSourceNodes are scheduled back-to-back.
    function applyPcmEdgeRamp(samples) {
      const ramp = Math.min(PCM_EDGE_RAMP_SAMPLES, Math.floor(samples.length / 2));
      if (!ramp) return;
      for (let index = 0; index < ramp; index += 1) {
        const ratio = (index + 1) / ramp;
        samples[index] *= ratio;
        samples[samples.length - 1 - index] *= ratio;
      }
    }

    function createWebAudioScheduler({ current, getNextStart }) {
      const waitForPlayback = async () => {
        while (!current.stopped && current.context?.state === 'running' && getNextStart() !== null) {
          const remaining = getNextStart() - current.context.currentTime;
          if (remaining <= 0) return;
          await new Promise((resolve) => setTimeout(resolve, Math.min(remaining * 1000, 50)));
        }
      };
      const waitForQueueCapacity = async () => {
        while (!current.stopped && current.context?.state === 'running' && getNextStart() !== null) {
          const queued = getNextStart() - current.context.currentTime;
          if (queued <= PLAYBACK_MAX_SCHEDULED_SECONDS) return;
          await new Promise((resolve) => setTimeout(resolve, Math.min((queued - PLAYBACK_MAX_SCHEDULED_SECONDS) * 1000, 50)));
        }
      };
      return { waitForPlayback, waitForQueueCapacity };
    }

    function idleVoiceState(sessionKey) {
      return { status: 'idle', messageId: null, error: null, sessionKey: String(sessionKey), lastAccess: Date.now() };
    }

    function disposeVoiceSessionState(key, state) {
      try {
        state?.dispose?.();
      } catch (error) {
        reportAudioLifecycleFailure(`session state ${key} disposal`, error);
      } finally {
        voiceStateBySession.delete(key);
      }
    }

    function pruneOldSessions() {
      if (voiceStateBySession.size <= MAX_TRACKED_SESSION_STATES) return;
      const activeKey = String(activeSessionStore?.getSnapshot?.().key ?? 'empty-chat');
      const entries = [...voiceStateBySession.entries()];
      entries.sort((a, b) => {
        const activeOrder = Number(a[0] === activeKey) - Number(b[0] === activeKey);
        return activeOrder || (a[1].lastAccess || 0) - (b[1].lastAccess || 0);
      });
      const toRemove = entries.slice(0, entries.length - MAX_TRACKED_SESSION_STATES);
      toRemove.forEach(([key, state]) => disposeVoiceSessionState(key, state));
    }

    function clearVoiceSessionStates() {
      [...voiceStateBySession.entries()].forEach(([key, state]) => disposeVoiceSessionState(key, state));
    }

    function readVoiceState(sessionKey) {
      const key = String(sessionKey);
      const state = voiceStateBySession.get(key);
      if (!state) return idleVoiceState(key);
      state.lastAccess = Date.now();
      return state;
    }

    function dispatchVoiceState(detail) {
      const scoped = { ...detail, sessionKey: String(detail.sessionKey), lastAccess: Date.now() };
      voiceStateBySession.set(scoped.sessionKey, scoped);
      pruneOldSessions();
      window.dispatchEvent(new CustomEvent(EVENT_STATE, { detail: scoped }));
      return scoped;
    }

    function createActiveSessionStore(sessions) {
      const listeners = new Set();
      // DSH 0.2 selection is expressed by mainView ownership, not list.current.
      let previousKey = 'empty-chat';
      const readKey = () => {
        const list = sessions?.list?.getSnapshot?.();
        const rows = list?.byId;
        const retained = (row) => (row?.retainedBy?.mainView ?? 0) > 0;
        const selected = rows
          ? (retained(rows[previousKey]) ? previousKey : Object.values(rows).find(retained)?.id)
          : list?.current;
        previousKey = String(selected ?? 'empty-chat');
        return previousKey;
      };
      let snapshot = { key: readKey(), epoch: 0 };
      const sync = () => {
        const key = readKey();
        if (key === snapshot.key) return;
        snapshot = { key, epoch: snapshot.epoch + 1 };
        listeners.forEach((listener) => listener());
      };
      const off = sessions?.list?.subscribe?.(sync) || null;
      return {
        getSnapshot: () => snapshot,
        subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
        dispose: () => { off?.(); listeners.clear(); },
      };
    }

    const iconButton = {
      width: '28px', height: '28px', border: 'none', borderRadius: '999px', padding: '6px',
      display: 'inline-grid', placeItems: 'center', background: 'transparent',
      color: 'var(--dsw-alias-label-tertiary)', cursor: 'pointer'
    };

    function ensureVoiceControlStyles() {
      if (typeof document === 'undefined' || document.getElementById(VOICE_STYLE_ID)) return;
      const style = document.createElement('style');
      style.id = VOICE_STYLE_ID;
      style.setAttribute('data-plugin', 'dsh-fairy-voice');
      style.textContent = `
.dsh-fairy-voice-controls{display:inline-flex;align-items:center;gap:4px;height:28px;padding:2px 5px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);box-sizing:border-box}
.dsh-fairy-voice-auto{width:22px;height:22px;display:grid;place-items:center;flex:none;padding:0;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;transition:background .15s,color .15s}
.dsh-fairy-voice-auto:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.dsh-fairy-voice-auto[data-on="true"]{background:color-mix(in srgb,var(--dsw-alias-label-secondary) 12%,transparent);color:var(--dsw-alias-label-secondary)}
.dsh-fairy-voice-auto:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.dsh-fairy-voice-auto:disabled,.dsh-fairy-voice-volume:disabled{cursor:not-allowed;opacity:.42}
.dsh-fairy-voice-volume{--dsh-fairy-volume:100%;appearance:none;-webkit-appearance:none;width:66px;height:22px;margin:0;background:transparent;cursor:pointer}
.dsh-fairy-voice-volume::-webkit-slider-runnable-track{height:3px;border-radius:999px;background:linear-gradient(to right,var(--dsw-alias-label-secondary) 0 var(--dsh-fairy-volume),var(--dsw-alias-border-l2) var(--dsh-fairy-volume) 100%)}
.dsh-fairy-voice-volume::-webkit-slider-thumb{-webkit-appearance:none;width:11px;height:11px;margin-top:-4px;border:2px solid var(--dsw-alias-bg-layer-1);border-radius:50%;background:var(--dsw-alias-label-secondary);box-shadow:0 0 0 1px var(--dsw-alias-border-l2)}
.dsh-fairy-voice-volume:focus-visible{outline:none}
.dsh-fairy-voice-volume:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 2px var(--dsw-alias-brand-primary)}
.dsh-fairy-voice-volume::-moz-range-track{height:3px;border:0;border-radius:999px;background:var(--dsw-alias-border-l2)}
.dsh-fairy-voice-volume::-moz-range-progress{height:3px;border-radius:999px;background:var(--dsw-alias-label-secondary)}
.dsh-fairy-voice-volume::-moz-range-thumb{width:9px;height:9px;border:2px solid var(--dsw-alias-bg-layer-1);border-radius:50%;background:var(--dsw-alias-label-secondary);box-shadow:0 0 0 1px var(--dsw-alias-border-l2)}
.dsh-fairy-voice-waveform{display:none;align-items:center;justify-content:space-between;gap:3px;flex:1;height:100%;padding:0 4px;pointer-events:none}
.dsh-fairy-voice-wave-bar{display:block;width:3px;min-width:3px;height:var(--dsh-fairy-wave-height);border-radius:999px;background:currentColor;opacity:var(--dsh-fairy-wave-opacity)}
.dsh-fairy-voice-brain{display:grid;gap:16px;width:min(640px,100%);padding:4px 0 12px;color:var(--dsw-alias-label-primary)}
.dsh-fairy-voice-brain-head{display:grid;gap:5px;padding-bottom:14px;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dsh-fairy-voice-brain-title{margin:0;font-size:18px;font-weight:600;line-height:1.3}
.dsh-fairy-voice-brain-copy{margin:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.65}
.dsh-fairy-voice-brain-panel{display:grid;gap:12px;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1)}
.dsh-fairy-voice-brain-row{display:flex;align-items:center;justify-content:space-between;gap:16px}
.dsh-fairy-voice-brain-label{font-size:14px;font-weight:600}.dsh-fairy-voice-brain-value{font-size:13px;color:var(--dsw-alias-label-secondary);text-align:right}
.dsh-fairy-voice-auto-switch{appearance:none;-webkit-appearance:none;position:relative;flex-shrink:0;width:36px;height:20px;margin:0;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;background:var(--dsw-alias-label-tertiary,#888);cursor:pointer;transition:background .15s}
.dsh-fairy-voice-auto-switch::before{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .15s}
.dsh-fairy-voice-auto-switch:checked{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary)}
.dsh-fairy-voice-auto-switch:checked::before{transform:translateX(16px)}
.dsh-fairy-voice-auto-switch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px}
.dsh-fairy-voice-brain-input{width:100%;height:34px;padding:0 10px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-layer-0);color:var(--dsw-alias-label-primary);font:13px ui-monospace,SFMono-Regular,Menlo,monospace;outline:none}
.dsh-fairy-voice-brain-input:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}
.dsh-fairy-voice-brain-actions{display:flex;justify-content:flex-end;gap:8px}.dsh-fairy-voice-brain-button{height:30px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:13px;cursor:pointer}.dsh-fairy-voice-brain-button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-fairy-voice-brain-button--primary{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);color:#fff}.dsh-fairy-voice-brain-button:disabled{opacity:.5;cursor:not-allowed}.dsh-fairy-voice-brain-status{min-height:18px;margin:0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.5}.dsh-fairy-voice-brain-status[data-error="true"]{color:var(--dsw-alias-state-error-primary)}
`;
      (document.head || document.documentElement).appendChild(style);
    }

    function messageText(finalNode) {
      return (finalNode?.blocks || []).filter((block) => block.kind === 'text').map((block) => block.text).join('\n').trim();
    }

    function collectRunningTools(block, activeTools, seenCallIds = new Set()) {
      if (!block || seenCallIds.has(String(block.callId))) return;
      seenCallIds.add(String(block.callId));
      if (!('kind' in block)) {
        activeTools.push({ id: String(block.callId), name: String(block.name || ''), turn: block.turn, step: block.step });
      }
      for (const child of block.subCalls || []) collectRunningTools(child, activeTools, seenCallIds);
    }

    function readVoiceTimeline(snapshot) {
      const found = [];
      const currentTurnFinals = [];
      const activeAssistantSteps = [];
      const activeTools = [];
      const activeToolIds = new Set();
      const chat = snapshot?.chat ?? snapshot;
      for (const key of chat?.order || []) {
        const node = chat.nodes?.get(key);
        const data = node?.kind === 'assistant-step' ? node.data : undefined;
        const finalNode = data?.finalNode;
        const text = messageText(finalNode);
        if (data?.status === 'settled' && finalNode?.messageId && text) found.push({ id: String(finalNode.messageId), markdown: text });
        if (data?.status === 'running') activeAssistantSteps.push({ turn: data.turn, step: data.step });
        // Tool rows remain in chat.order after completion. They are history,
        // not evidence of current activity, so do not infer "running" from
        // their retained root call. The authoritative live list is merged
        // below from legacy.runningCalls.
      }
      const userSeq = (chat?.legacy?.nodes || []).filter((node) => node.kind === 'user' || node.kind === 'steering').at(-1)?.seq || 0;
      // An assistant-step finalNode is the final message for that step, not
      // necessarily the final answer for the whole turn. The official
      // turn-tail projection is the authoritative whole-turn boundary: it is
      // published only for a closed turn and its closing value is the last
      // content-bearing assistant step in that turn. Process/reasoning steps
      // therefore never enter the automatic-final queue.
      //
      // Restrict the projection to the turn containing the latest user/steering
      // event. Without this boundary, a manually replayed historical answer
      // could look like a new automatic candidate on the next prompt.
      const timeline = chat?.timeline;
      for (const turnNumber of timeline?.turnOrder || []) {
        const turnLocation = timeline.turns?.get(turnNumber);
        if (turnLocation?.status !== 'closed') continue;
        const startSeq = turnLocation.start?.seq;
        const endSeq = turnLocation.end?.seq;
        if (typeof startSeq !== 'number' || startSeq > userSeq || (typeof endSeq === 'number' && userSeq > endSeq)) continue;
        const closing = turnLocation.data?.get?.('turn-tail')?.closing;
        const finalNode = closing?.finalNode;
        const text = messageText(finalNode);
        if (finalNode?.messageId && text) {
          currentTurnFinals.push({
            id: String(finalNode.messageId),
            markdown: text,
            turn: turnNumber,
            seq: finalNode.seq
          });
        }
      }
      const sessionKey = snapshot?.sessionId ?? snapshot?.chat?.sessionId ?? snapshot?.chat?.id ?? chat?.order?.[0] ?? 'empty-chat';
      // legacy.runningCalls covers a short interval before a tool row is
      // materialized in chat.order. Merge it by call id without relying on UI text.
      for (const call of chat?.legacy?.runningCalls || []) {
        collectRunningTools(call, activeTools, activeToolIds);
      }
      // snapshot.running can remain true during post-tool reconciliation even
      // after the final assistant node is settled. The concrete live lists
      // below are the reliable activity boundary for speech scheduling.
      const running = activeAssistantSteps.length > 0 || activeTools.length > 0;
      const phase = !running ? null : activeTools.some((tool) => isSearchTool(tool.name)) ? 'searching' : activeTools.length ? 'tool' : 'working';
      const turn = Math.max(0, ...activeAssistantSteps.map((step) => Number(step.turn) || 0), ...activeTools.map((tool) => Number(tool.turn) || 0));
      return {
        found,
        currentTurnFinals,
        messagesById: new Map(found.map((message) => [message.id, message])),
        userSeq,
        sessionKey: String(sessionKey),
        activity: { running, phase, turn, toolNames: activeTools.map((tool) => tool.name) }
      };
    }

    const prepare = (markdown, signal) => localTtsTransport.prepare(markdown, signal);
    const getAvailability = (signal) => localTtsTransport.status(signal);

    const INITIAL_AVAILABILITY = Object.freeze({ available: false, reason: '正在检查本地 Fairy 语音服务…' });
    const availabilityListeners = new Set();
    let availabilitySnapshot = INITIAL_AVAILABILITY;
    let availabilityCheckedAt = 0;
    let availabilityRequest = null;
    let availabilityController = null;

    function publishAvailability(value) {
      const next = value?.available === true
        ? { available: true, reason: null }
        : { available: false, reason: value?.reason || '本地 Fairy 服务未启动。' };
      const changed = next.available !== availabilitySnapshot.available || next.reason !== availabilitySnapshot.reason;
      availabilitySnapshot = changed ? next : availabilitySnapshot;
      availabilityCheckedAt = Date.now();
      if (changed) availabilityListeners.forEach((listener) => listener());
      window.dispatchEvent(new CustomEvent(EVENT_AVAILABILITY, { detail: availabilitySnapshot }));
      return availabilitySnapshot;
    }

    function requestAvailability(force = false) {
      if (availabilityRequest) return availabilityRequest;
      if (!force && availabilityCheckedAt && Date.now() - availabilityCheckedAt < AVAILABILITY_TTL_MS) {
        return Promise.resolve(availabilitySnapshot);
      }
      const controller = new AbortController();
      availabilityController = controller;
      const request = getAvailability(controller.signal)
        .catch((error) => {
          if (controller.signal.aborted) return availabilitySnapshot;
          return { available: false, reason: error?.message || '本地 Fairy 服务未启动。' };
        })
        .then((value) => controller.signal.aborted ? availabilitySnapshot : publishAvailability(value))
        .finally(() => {
          if (availabilityController === controller) availabilityController = null;
          if (availabilityRequest === request) availabilityRequest = null;
        });
      availabilityRequest = request;
      return request;
    }

    const availabilityStore = {
      getSnapshot: () => availabilitySnapshot,
      subscribe(listener) { availabilityListeners.add(listener); return () => availabilityListeners.delete(listener); },
    };

    function disposeAvailability() {
      availabilityController?.abort('disposed');
      availabilityController = null;
      availabilityRequest = null;
      availabilitySnapshot = INITIAL_AVAILABILITY;
      availabilityCheckedAt = 0;
      availabilityListeners.clear();
    }

    const getVoiceBrainStatus = () => voiceBrainClient.status();
    const createVoiceBrief = (markdown, signal) => voiceBrainClient.brief(markdown, signal);
    function requestVoiceBrainConfig(payload) {
      return voiceBrainClient.config(payload);
    }

    function reportText(phase, userSeq, turn, reportCount) {
      const options = VOICE_REPORTS[phase] || VOICE_REPORTS.working;
      const index = Math.abs((Number(userSeq) || 0) + (Number(turn) || 0) + (Number(reportCount) || 0) - 1) % options.length;
      return options[index];
    }

    function createAutoReadPolicy({ autoRead, audioReady, available, activity, silencedTurn, userSeq }) {
      return Boolean(autoRead && audioReady && available && activity?.running && activity?.phase && silencedTurn !== userSeq);
    }

    function useVoiceBrain({ sessionKey, timeline, baselineReady, autoRead, audioReady, available }) {
      const state = React.useRef({ key: null, userSeq: 0, timer: null, epoch: 0, phase: null, activeTurn: 0, phaseStartedAt: 0, reports: 0, lastReportAt: 0, silencedTurn: null });
      const latest = React.useRef({ sessionKey, timeline, baselineReady, autoRead, audioReady, available });
      latest.current = { sessionKey, timeline, baselineReady, autoRead, audioReady, available };
      const clearTimer = React.useCallback(() => {
        const current = state.current;
        if (current.timer) clearTimeout(current.timer);
        current.timer = null;
        current.epoch += 1;
      }, []);

      React.useEffect(() => {
        const current = state.current;
        if (current.key !== sessionKey) {
          clearTimer();
          state.current = { key: sessionKey, userSeq: timeline.userSeq, timer: null, epoch: current.epoch + 1, phase: null, activeTurn: 0, phaseStartedAt: 0, reports: 0, lastReportAt: 0, silencedTurn: null };
        }
        const policy = state.current;
        if (!baselineReady) {
          clearTimer();
          policy.userSeq = timeline.userSeq;
          return;
        }
        if (timeline.userSeq !== policy.userSeq) {
          clearTimer();
          policy.userSeq = timeline.userSeq;
          policy.phase = null;
          policy.activeTurn = 0;
          policy.phaseStartedAt = 0;
          policy.reports = 0;
          policy.lastReportAt = 0;
          policy.silencedTurn = null;
        }
        const phase = timeline.activity.phase;
        const activeTurn = timeline.activity.turn;
        const canReport = createAutoReadPolicy({
          autoRead,
          audioReady,
          available,
          activity: timeline.activity,
          silencedTurn: policy.silencedTurn,
          userSeq: timeline.userSeq,
        });
        if (!canReport) {
          clearTimer();
          policy.phase = null;
          return;
        }
        if (policy.phase !== phase || policy.activeTurn !== activeTurn) {
          clearTimer();
          policy.phase = phase;
          policy.activeTurn = activeTurn;
          policy.phaseStartedAt = Date.now();
        }
        // A long-running search/thinking turn has no fixed duration. Keep one
        // low-frequency heartbeat scheduled for as long as DSH reports live
        // activity; the activity boundary and lifecycle cancellation stop it.
        if (policy.timer) return;
        const now = Date.now();
        const eligibleAt = Math.max(policy.phaseStartedAt + VOICE_REPORT_DELAY_MS, policy.lastReportAt + VOICE_REPORT_COOLDOWN_MS);
        const epoch = policy.epoch;
        const reportUserSeq = timeline.userSeq;
        const schedule = (delay) => {
          policy.timer = setTimeout(() => {
          const fresh = latest.current;
          const live = state.current;
          live.timer = null;
          if (live.epoch !== epoch || fresh.sessionKey !== sessionKey || fresh.timeline.userSeq !== reportUserSeq) return;
          if (!fresh.baselineReady || !fresh.autoRead || !fresh.audioReady || !fresh.available) return;
          if (!fresh.timeline.activity.running || fresh.timeline.activity.phase !== phase || live.silencedTurn === reportUserSeq) return;
          live.reports += 1;
          live.lastReportAt = Date.now();
          window.dispatchEvent(new CustomEvent(EVENT_PLAY, {
            detail: {
              kind: 'status', priority: 10, sessionKey,
              messageId: `fairy-status:${reportUserSeq}:${phase}:${live.reports}`,
              markdown: reportText(phase, reportUserSeq, fresh.timeline.activity.turn, live.reports)
            }
          }));
          if (live.phase === phase && live.silencedTurn !== reportUserSeq) {
            schedule(VOICE_REPORT_COOLDOWN_MS);
          }
          }, Math.max(0, delay));
        };
        schedule(Math.max(0, eligibleAt - now));
      }, [sessionKey, timeline, baselineReady, autoRead, audioReady, available, clearTimer]);

      React.useEffect(() => {
        const onVoiceCommand = (event) => {
          const detail = event.detail || {};
          if (detail.sessionKey !== sessionKey || (!detail.stop && detail.kind === 'status')) return;
          clearTimer();
          state.current.silencedTurn = latest.current.timeline.userSeq;
        };
        window.addEventListener(EVENT_PLAY, onVoiceCommand);
        window.addEventListener('pagehide', clearTimer);
        return () => {
          window.removeEventListener(EVENT_PLAY, onVoiceCommand);
          window.removeEventListener('pagehide', clearTimer);
          clearTimer();
        };
      }, [sessionKey, clearTimer]);
    }

    function ReferenceAudioSection() {
      const h = React.createElement;
      const [state, setState] = React.useState(null);
      const [file, setFile] = React.useState(null);
      const [prompt, setPrompt] = React.useState('');
      const [busy, setBusy] = React.useState(false);
      const [notice, setNotice] = React.useState('');
      const active = React.useRef(true), locked = React.useRef(false), picker = React.useRef(null), version = React.useRef(0);
      async function request(body) {
        const response = await fetch(LOCAL_TTS_ENDPOINT + '/reference', body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || '参考语音操作失败。');
        return result;
      }
      React.useEffect(() => {
        active.current = true;
        const loadingVersion = version.current;
        request().then(value => { if (active.current && version.current === loadingVersion) { setState(value); setPrompt(value.prompt); } }).catch(error => { if (active.current) setNotice(error.message); });
        return () => { active.current = false; };
      }, []);
      async function save(reset = false) {
        if (locked.current) return;
        version.current++; locked.current = true; setBusy(true); setNotice('');
        try {
          let body = { reset: true };
          if (!reset) {
            if (!file || !/\.wav$/i.test(file.name) || file.size > 10 * 1024 * 1024) throw new Error('请选择不超过 10 MB 的 WAV 文件。');
            if (!prompt.trim()) throw new Error('请填写与 WAV 内容一致的中文参考文本。');
            const audioBase64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(String(reader.result).split(',')[1]);
              reader.onerror = () => reject(new Error('无法读取所选 WAV 文件。'));
              reader.readAsDataURL(file);
            });
            body = { filename: file.name, audioBase64, prompt: prompt.trim() };
          }
          const value = await request(body);
          if (active.current) {
            setState(value); setPrompt(value.prompt); setFile(null);
            if (picker.current) picker.current.value = '';
            setNotice(reset ? '已恢复默认参考语音，下一次朗读生效。' : '参考语音已保存，下一次朗读生效，无需重启。');
          }
        } catch (error) { if (active.current) setNotice(error.message || '保存失败，原参考语音未修改。'); }
        finally { locked.current = false; if (active.current) setBusy(false); }
      }
      return h('div', { className: 'dsh-fairy-voice-brain-panel', 'data-fairy-reference-settings': '' },
        h('h3', { className: 'dsh-fairy-voice-brain-label' }, '快捷替换参考语音 WAV'),
        h('p', { className: 'dsh-fairy-voice-brain-copy' }, '当前参考语音：' + (state?.name || '正在读取…') + (state?.duration ? ` · ${state.duration} 秒` : '')),
        h('p', { className: 'dsh-fairy-voice-brain-copy' }, '替换的是 GPT-SoVITS 的参考音频，不是语音模型。请选择 3–10 秒的 16-bit PCM WAV（单/双声道，16000–96000 Hz，不超过 10 MB），并填写与录音一致的中文文本。无模型版也可保存，但朗读仍需要兼容的本地语音服务。'),
        h('label', { style: { display: 'grid', gap: 8 } }, '选择参考语音 WAV', h('input', { ref: picker, type: 'file', accept: '.wav,audio/wav,audio/x-wav', disabled: busy, 'aria-label': '选择参考语音 WAV', onChange: event => { setFile(event.target.files?.[0] || null); setNotice(''); } })),
        h('label', { style: { display: 'grid', gap: 8, marginTop: 12 } }, '参考音频对应文本', h('textarea', { className: 'dsh-fairy-voice-brain-input', rows: 3, maxLength: 1000, style: { width: '100%', resize: 'vertical' }, 'aria-label': '参考音频对应文本', value: prompt, disabled: busy, onChange: event => setPrompt(event.target.value) })),
        h('div', { className: 'dsh-fairy-voice-brain-actions', style: { marginTop: 12 } },
          h('button', { className: 'dsh-fairy-voice-brain-button dsh-fairy-voice-brain-button--primary', type: 'button', disabled: busy || !file || !prompt.trim(), onClick: () => save() }, busy ? '保存中…' : '保存参考语音'),
          h('button', { className: 'dsh-fairy-voice-brain-button', type: 'button', disabled: busy, onClick: () => save(true) }, '恢复默认参考语音')),
        h('p', { className: 'dsh-fairy-voice-brain-status', role: 'status', 'aria-live': 'polite' }, notice));
    }


    const { INSTALL_PROMPT, fillInstallPrompt } = (() => { 'use strict';
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
return { INSTALL_PROMPT, findActiveSessionId, fillInstallPrompt };
 })();
    let installContext = null;
    function InstallVoiceModelSection() {
      const [notice, setNotice] = React.useState('点击后自动填写当前对话的输入框，保留已有草稿；不会自动发送、下载或绕过审批。');
      const prepare = () => {
        try { const result = fillInstallPrompt(installContext); setNotice(result.inserted ? (result.preservedDraft ? '已追加到原草稿后。' : '已填入当前对话。') + ' 请关闭设置检查提示词，再发送让 DSH 安装。' : '安装提示词已在输入框中，没有重复添加。请关闭设置后发送。'); }
        catch (error) { setNotice(error.message); }
      };
      const copy = async () => { try { await navigator.clipboard.writeText(INSTALL_PROMPT); setNotice('已复制安装提示词。可关闭设置后粘贴到任意对话。'); } catch { setNotice('剪贴板不可用。可以选择下方完整提示词手动复制。'); } };
      return React.createElement('div', { className: 'dsh-fairy-voice-brain-panel' },
        React.createElement('h3', null, '安装本地语音模型'),
        React.createElement('div', { className: 'dsh-fairy-voice-brain-actions' },
          React.createElement('button', { type: 'button', className: 'dsh-fairy-voice-brain-button dsh-fairy-voice-brain-button--primary', onClick: prepare }, '安装语音模型'),
          React.createElement('button', { type: 'button', className: 'dsh-fairy-voice-brain-button', onClick: copy }, '复制安装提示词')),
        React.createElement('p', { role: 'status', className: 'dsh-fairy-voice-brain-copy' }, notice),
        React.createElement('details', null, React.createElement('summary', null, '查看安装提示词'), React.createElement('pre', { style: { whiteSpace: 'pre-wrap', userSelect: 'text', fontSize: 12 } }, INSTALL_PROMPT)));
    }

    function VoiceBrainSection() {
      const [autoRead, setAutoRead] = useAutoReadPreference();
      const availability = React.useSyncExternalStore(availabilityStore.subscribe, availabilityStore.getSnapshot, availabilityStore.getSnapshot);
      React.useEffect(() => { requestAvailability(true); }, []);
      const [configured, setConfigured] = React.useState(false);
      const [apiKey, setApiKey] = React.useState('');
      const [busy, setBusy] = React.useState(false);
      const [status, setStatus] = React.useState('正在读取配置…');
      const [error, setError] = React.useState(false);
      const refresh = React.useCallback(() => {
        getVoiceBrainStatus().then((value) => {
          setConfigured(value?.configured === true);
          setStatus(value?.configured === true ? '已配置。密钥保存在本机，不会在页面回显。' : '未配置。未配置时，长回答会直接使用原文朗读。');
          setError(false);
          window.dispatchEvent(new CustomEvent(EVENT_BRAIN_CONFIG, { detail: value }));
        }).catch(() => {
          setStatus('暂时无法读取本地配置状态。');
          setError(true);
        });
      }, []);
      React.useEffect(() => { refresh(); }, [refresh]);
      const save = async () => {
        if (!apiKey.trim()) return;
        setBusy(true); setError(false);
        try {
          const value = await requestVoiceBrainConfig({ apiKey: apiKey.trim() });
          setApiKey('');
          setConfigured(true);
          setStatus('已配置。密钥保存在本机，不会在页面回显。');
          window.dispatchEvent(new CustomEvent(EVENT_BRAIN_CONFIG, { detail: value }));
        } catch (saveError) {
          setStatus(saveError?.message || '保存失败。');
          setError(true);
        } finally { setBusy(false); }
      };
      const clear = async () => {
        setBusy(true); setError(false);
        try {
          const value = await requestVoiceBrainConfig({ clear: true });
          setConfigured(false); setApiKey('');
          setStatus('已移除。未配置时不会调用云端模型。');
          window.dispatchEvent(new CustomEvent(EVENT_BRAIN_CONFIG, { detail: value }));
        } catch (clearError) {
          setStatus(clearError?.message || '移除失败。');
          setError(true);
        } finally { setBusy(false); }
      };
      return jsx.jsxs('section', { className: 'dsh-fairy-voice-brain', children: [
        jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-head', children: [
          jsx.jsx('h2', { className: 'dsh-fairy-voice-brain-title', children: '语音模型设置' }),
          jsx.jsx('p', { className: 'dsh-fairy-voice-brain-copy', children: '这是无 GPT 语音模型版：保留 Fairy 朗读设置，但不内置 GPT-SoVITS 模型及 Python 运行环境。未连接独立语音服务时，不能播放 Fairy 音色。' }),
          jsx.jsx('p', { className: 'dsh-fairy-voice-brain-copy', children: '可点击“安装语音模型”让 DSH 按提示安装独立的本机语音服务（127.0.0.1:9880）。下方云端摘要不提供语音模型。' })
        ] }),
        jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-panel', children: [
          jsx.jsxs('label', { className: 'dsh-fairy-voice-brain-row', children: [
            jsx.jsx('span', { className: 'dsh-fairy-voice-brain-label', children: '自动朗读' }),
            jsx.jsx('input', { className: 'dsh-fairy-voice-auto-switch', type: 'checkbox', role: 'switch', checked: autoRead, onChange: (event) => setAutoRead(event.target.checked), 'aria-label': '自动朗读', 'aria-describedby': 'dsh-fairy-voice-auto-description' })
          ] }),
          jsx.jsx('p', { id: 'dsh-fairy-voice-auto-description', className: 'dsh-fairy-voice-brain-copy', children: '开启后自动朗读当前对话的新回复，不会重播历史回复。关闭后仍可点击回复下方的播放按钮手动朗读。设置自动保存，并与右下角开关同步。' })
        ] }),
        jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-panel', children: [
          jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-row', children: [
            jsx.jsx('span', { className: 'dsh-fairy-voice-brain-label', children: '本地语音服务' }),
            jsx.jsx('span', { className: 'dsh-fairy-voice-brain-value', children: availability.available ? '已连接独立服务 · GPT-SoVITS · Fairy 音色' : availability.reason })
          ] }),
          jsx.jsx('button', { className: 'dsh-fairy-voice-brain-button', type: 'button', onClick: () => requestAvailability(true), children: '刷新语音状态' })
        ] }),
        jsx.jsx(InstallVoiceModelSection, {}),
        jsx.jsx(ReferenceAudioSection, {}),
        jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-panel', children: [
          jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-row', children: [
            jsx.jsx('span', { className: 'dsh-fairy-voice-brain-label', children: '可选云端摘要' }),
            jsx.jsx('span', { className: 'dsh-fairy-voice-brain-value', children: configured ? '已配置 · deepseek-v4-flash' : '未配置' })
          ] }),
          jsx.jsx('input', { className: 'dsh-fairy-voice-brain-input', type: 'password', autoComplete: 'new-password', value: apiKey, onChange: (event) => setApiKey(event.target.value), placeholder: configured ? '输入新 API Key 以替换当前密钥' : '输入 DeepSeek API Key', 'aria-label': 'DeepSeek API Key' }),
          jsx.jsxs('div', { className: 'dsh-fairy-voice-brain-actions', children: [
            configured ? jsx.jsx('button', { className: 'dsh-fairy-voice-brain-button', type: 'button', disabled: busy, onClick: clear, children: '移除密钥' }) : null,
            jsx.jsx('button', { className: 'dsh-fairy-voice-brain-button dsh-fairy-voice-brain-button--primary', type: 'button', disabled: busy || !apiKey.trim(), onClick: save, children: busy ? '处理中…' : '保存密钥' })
          ] }),
          jsx.jsx('p', { className: 'dsh-fairy-voice-brain-status', 'data-error': error ? 'true' : 'false', children: status })
        ] })
      ] });
    }

    function usePlayer(sessionKey) {
      const [state, setState] = React.useState({ status: 'idle', messageId: null, error: null });
      const work = React.useRef({ controller: null, audio: null, context: null, gain: null, sources: new Set(), urls: new Set(), stopped: false });
      const idleSuspendTimer = React.useRef(null);
      const publish = React.useCallback((next) => {
        const scoped = dispatchVoiceState({ ...next, sessionKey });
        setState(scoped);
      }, [sessionKey]);
      const clearIdleSuspend = React.useCallback(() => {
        if (idleSuspendTimer.current) clearTimeout(idleSuspendTimer.current);
        idleSuspendTimer.current = null;
      }, []);
      const suspendWhenIdle = React.useCallback((context) => {
        clearIdleSuspend();
        if (!context || context.state !== 'running') return;
        idleSuspendTimer.current = setTimeout(() => {
          idleSuspendTimer.current = null;
          const current = work.current;
          if (current.context !== context || current.sources.size || context.state !== 'running') return;
          context.suspend().catch((error) => reportAudioLifecycleFailure('suspend', error));
        }, 0);
      }, [clearIdleSuspend]);
      const unlockAudio = React.useCallback(async (initialVolume = 1) => {
        clearIdleSuspend();
        const current = work.current;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) throw new Error('Web Audio is unavailable in this browser.');
        if (!current.context || current.context.state === 'closed') {
          current.context = new AudioContextClass({ sampleRate: PCM_SAMPLE_RATE });
          current.gain = current.context.createGain();
          current.gain.gain.value = initialVolume;
          current.gain.connect(current.context.destination);
        } else if (current.gain) {
          const now = current.context.currentTime;
          current.gain.gain.cancelScheduledValues(now);
          current.gain.gain.setValueAtTime(initialVolume, now);
        }
        await current.context.resume();
        return current.context;
      }, [clearIdleSuspend]);
      const primeAudio = React.useCallback(async (initialVolume = 1) => {
        const context = await unlockAudio(initialVolume);
        suspendWhenIdle(context);
        return context;
      }, [suspendWhenIdle, unlockAudio]);
      const stop = React.useCallback(() => {
        const current = work.current;
        current.stopped = true;
        current.controller?.abort();
        if (current.audio) { current.audio.pause(); current.audio.src = ''; }
        const now = current.context?.state !== 'closed' ? current.context?.currentTime : null;
        if (current.gain && current.context && now !== null) {
          try {
            const currentGain = Number(current.gain.gain.value) || 0;
            current.gain.gain.cancelScheduledValues(now);
            current.gain.gain.setValueAtTime(currentGain, now);
            current.gain.gain.linearRampToValueAtTime(0, now + STOP_FADE_SECONDS);
          } catch (error) { reportAudioLifecycleFailure('fade out', error); }
        }
        for (const source of current.sources) {
          try { source.stop(now === null ? undefined : now + STOP_FADE_SECONDS); } catch (error) { reportAudioLifecycleFailure('source stop', error); }
          try { source.onended = null; source.disconnect(); } catch (error) { reportAudioLifecycleFailure('source disconnect', error); }
        }
        window.speechSynthesis?.cancel();
        for (const url of current.urls) URL.revokeObjectURL(url);
        suspendWhenIdle(current.context);
        work.current = { controller: null, audio: null, context: current.context, gain: current.gain, sources: new Set(), urls: new Set(), stopped: false };
        reportAudioResources(current, 'stop');
        publish({ status: 'stopped', messageId: null, error: null });
      }, [publish, suspendWhenIdle]);
      const setOutputVolume = React.useCallback((value) => {
        const current = work.current;
        const gain = current.gain;
        const context = current.context;
        if (gain && context && context.state !== 'closed') {
          gain.gain.setTargetAtTime(value, context.currentTime, 0.015);
        }
      }, []);
      const play = React.useCallback(async (messageId, sentences, volume) => {
        if (!sentences.length) return false;
        // Keep the work object captured before the user-gesture unlock. Stop
        // or session replacement can reset work.current while resume() is
        // pending; the old request must not adopt that fresh object and start
        // playback after cancellation.
        const requestedWork = work.current;
        await unlockAudio(volume);
        if (work.current !== requestedWork || requestedWork.stopped) return false;
        const current = requestedWork;
        const controller = new AbortController();
        current.controller = controller;
        current.stopped = false;
        let nextStart = null;
        const scheduler = createWebAudioScheduler({ current, getNextStart: () => nextStart });
        const { waitForPlayback, waitForQueueCapacity } = scheduler;
        const streamRawAudio = async (text) => {
          const response = await localTtsTransport.stream(text, controller.signal);
          if (!response.ok) {
            const value = await response.json().catch(() => ({}));
            const error = new Error(value?.error?.message || 'Speech synthesis failed.');
            error.code = value?.error?.code;
            throw error;
          }
          if (!response.body) throw new Error('Speech synthesis returned no audio.');
          const context = current.context;
          const gain = current.gain;
          if (!context || context.state !== 'running' || !gain) throw new Error('Audio output is unavailable.');
          const reader = response.body.getReader();
          let pendingBytes = new Uint8Array(0);
          let receivedSamples = 0;
          if (nextStart === null) nextStart = context.currentTime + PLAYBACK_PREBUFFER_SECONDS;
          const schedulePcm = (bytes) => {
            const sampleCount = bytes.length / PCM_BYTES_PER_SAMPLE;
            const buffer = context.createBuffer(1, sampleCount, PCM_SAMPLE_RATE);
            const samples = buffer.getChannelData(0);
            pcmStreamHandler.decodeInto(bytes, samples);
            applyPcmEdgeRamp(samples);
            receivedSamples += sampleCount;
            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(gain);
            source.onended = () => {
              current.sources.delete(source);
              try { source.disconnect(); } catch (error) { reportAudioLifecycleFailure('source disconnect', error); }
              reportAudioResources(current, 'source-ended');
            };
            current.sources.add(source);
            const startAt = Math.max(nextStart, context.currentTime + PLAYBACK_SCHEDULE_LEAD_SECONDS);
            source.start(startAt);
            nextStart = startAt + buffer.duration;
            publish({ status: 'playing', messageId, error: null });
          };
          const consumePcm = (incoming, final = false) => {
            let bytes = incoming;
            if (pendingBytes.length) {
              bytes = new Uint8Array(pendingBytes.length + incoming.length);
              bytes.set(pendingBytes);
              bytes.set(incoming, pendingBytes.length);
              pendingBytes = new Uint8Array(0);
            }
            const playableLength = pcmStreamHandler.playableLength(bytes);
            if (bytes.length % PCM_BYTES_PER_SAMPLE) {
              pendingBytes = bytes.slice(playableLength);
            }
            if (!playableLength) return;
            // HTTP chunking is arbitrary. Never schedule a few samples as a
            // separate source: it can click, jump, and create needless work.
            if (!final && playableLength < PLAYBACK_MIN_BUFFER_BYTES) {
              const held = new Uint8Array(pendingBytes.length + playableLength);
              held.set(bytes.subarray(0, playableLength));
              held.set(pendingBytes, playableLength);
              pendingBytes = held;
              return;
            }
            schedulePcm(bytes.subarray(0, playableLength));
          };
          try {
            while (true) {
              // Let fetch backpressure reach the server when inference gets
              // ahead of playback. This keeps AudioBufferSource allocation
              // bounded without sacrificing the startup safety buffer.
              await waitForQueueCapacity();
              if (current.stopped) break;
              const { done, value } = await reader.read();
              if (done) {
                if (pendingBytes.length % PCM_BYTES_PER_SAMPLE) throw new Error('Fairy returned an incomplete PCM frame.');
                if (!current.stopped && pendingBytes.length) consumePcm(new Uint8Array(0), true);
                break;
              }
              if (current.stopped) break;
              consumePcm(value);
            }
            if (receivedSamples === 0 && !current.stopped) throw new Error('Fairy returned empty audio.');
          } finally {
            reader.releaseLock();
          }
        };
        try {
          for (let index = 0; index < sentences.length; index += PLAYBACK_GROUP_SIZE) {
            publish({ status: 'loading', messageId, error: null });
            await streamRawAudio(sentences.slice(index, index + PLAYBACK_GROUP_SIZE).join('\n'));
            if (current.stopped) return false;
          }
          await waitForPlayback();
          if (current.stopped) return false;
          // A running AudioContext retains a render thread even with no
          // sources. Resume the same context on the next request instead of
          // leaving that idle work alive between replies.
          if (work.current === current && current.context?.state === 'running') {
            clearIdleSuspend();
            await current.context.suspend().catch((error) => reportAudioLifecycleFailure('suspend', error));
          }
          reportAudioResources(current, 'playback-idle');
          publish({ status: 'idle', messageId: null, error: null });
          return true;
        } catch (error) {
          if (controller.signal.aborted || current.stopped) return;
          publish({ status: 'error', messageId, error: error instanceof Error ? error.message : 'Speech synthesis failed.' });
          return false;
        }
      }, [clearIdleSuspend, publish, unlockAudio]);
      const playSystem = React.useCallback((messageId, sentences, volume) => {
        if (!sentences.length || !window.speechSynthesis) {
          publish({ status: 'error', messageId, error: 'System speech is unavailable in this browser.' });
          return Promise.resolve(false);
        }
        const current = work.current;
        let index = 0;
        return new Promise((resolve) => {
          const speakNext = () => {
            if (current.stopped) { resolve(false); return; }
            if (index >= sentences.length) {
              publish({ status: 'idle', messageId: null, error: null });
              resolve(true);
              return;
            }
            const utterance = new SpeechSynthesisUtterance(sentences[index]);
            const voices = window.speechSynthesis.getVoices();
            utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith('zh')) || null;
            utterance.lang = utterance.voice?.lang || 'zh-CN';
            utterance.volume = volume;
            utterance.onend = () => { index += 1; speakNext(); };
            utterance.onerror = () => {
              publish({ status: 'error', messageId, error: 'System speech playback failed.' });
              resolve(false);
            };
            publish({ status: 'playing', messageId, error: null });
            window.speechSynthesis.speak(utterance);
          };
          speakNext();
        });
      }, [publish]);
      React.useEffect(() => () => {
        const context = work.current.context;
        stop();
        clearIdleSuspend();
        context?.close().catch((error) => reportAudioLifecycleFailure('close', error));
      }, [clearIdleSuspend, stop]);
      return { state, play, playSystem, stop, primeAudio, setOutputVolume };
    }

    function VoiceController({ useChat, sessionId }) {
      // Chat is a separate scoped projection in DSH 0.2; useSession only
      // contains lifecycle data. Keep the real session id on the voice store.
      const timeline = useChat(readVoiceTimeline);
      const snapshot = React.useMemo(() => ({ ...timeline, sessionKey: String(sessionId ?? timeline.sessionKey) }), [timeline, sessionId]);
      const sessionKey = String(sessionId ?? snapshot.sessionKey ?? 'empty-chat');
      const activeSessions = activeSessionStore || emptyActiveSessionStore;
      const activeSelection = React.useSyncExternalStore(activeSessions.subscribe, activeSessions.getSnapshot, activeSessions.getSnapshot);
      const sessionActive = activeSelection.key === sessionKey;
      const { state, play, playSystem, stop, primeAudio, setOutputVolume } = usePlayer(sessionKey);
      // Auto-read is the product default. An explicit false remains respected.
      const [autoRead, setAutoRead] = useAutoReadPreference();
      const [volume, setVolume] = React.useState(() => clampVolume(localStorage.getItem(SETTINGS_VOLUME) || '1'));
      const [audioReady, setAudioReady] = React.useState(false);
      const [baselineReady, setBaselineReady] = React.useState(false);
      // Fairy is the only supported voice. Keeping this fixed avoids an accidental
      // fallback to a non-Fairy system voice from an old local preference.
      const engine = 'fairy';
      const availability = React.useSyncExternalStore(availabilityStore.subscribe, availabilityStore.getSnapshot, availabilityStore.getSnapshot);
      const seen = React.useRef(new Set());
      const autoReadRef = React.useRef(autoRead);
      autoReadRef.current = autoRead;
      const audioUnlocked = React.useRef(false);
      const prepareController = React.useRef(null);
      const prepareScope = React.useRef(null);
      const lifecycleEpoch = React.useRef(0);
      const activeIntent = React.useRef(null);
      const voiceBrainConfigured = React.useRef(false);
      // The initial status request races with the first settled answer on a
      // cold start. Keep its promise so a long final answer can wait for the
      // authoritative configuration instead of silently skipping the brief.
      const voiceBrainReady = React.useRef(Promise.resolve({ configured: false }));
      const timelineRef = React.useRef(snapshot);
      timelineRef.current = snapshot;
      const baseline = React.useRef({ key: null, timer: null, finalTimer: null, pendingFinal: null, signature: null, ready: false, baselineUserSeq: 0, lastUserSeq: 0, armedUserSeq: null });
      const autoMessageIds = React.useRef(new Set());
      const activeAutoMessageId = React.useRef(null);
      // Keep the newest process report instead of dropping it while an earlier
      // report is still being synthesized or played. Final answers always clear
      // this slot and preempt the report path.
      const pendingStatus = React.useRef(null);
      const autoRetryTimers = React.useRef(new Map());
      const autoRetryCounts = React.useRef(new Map());
      React.useLayoutEffect(() => {
        voiceTimelineStore.set(snapshot);
        return () => voiceTimelineStore.clear(snapshot);
      }, [snapshot]);
      const cancelPlayback = React.useCallback(() => {
        lifecycleEpoch.current += 1;
        activeIntent.current = null;
        prepareController.current?.abort();
        prepareController.current = null;
        prepareScope.current?.cancel('client-aborted');
        prepareScope.current = null;
        for (const timer of autoRetryTimers.current.values()) clearTimeout(timer);
        autoRetryTimers.current.clear();
        const finalState = baseline.current;
        if (finalState.finalTimer) clearTimeout(finalState.finalTimer);
        finalState.finalTimer = null;
        finalState.pendingFinal = null;
        stop();
      }, [stop]);
      React.useEffect(() => {
        if (!sessionActive) cancelPlayback();
        return activeSessions.subscribe(() => {
          if (activeSessions.getSnapshot().key !== sessionKey) cancelPlayback();
        });
      }, [activeSessions, sessionActive, activeSelection.epoch, sessionKey, cancelPlayback]);
      React.useEffect(() => { if (!autoRead) cancelPlayback(); }, [autoRead, cancelPlayback]);
      React.useEffect(() => {
        localStorage.setItem(SETTINGS_VOLUME, String(volume));
        setOutputVolume(volume);
      }, [volume, setOutputVolume]);
      React.useEffect(() => {
        if (audioReady) return undefined;
        const unlockFromGesture = () => {
          if (audioUnlocked.current) return;
          audioUnlocked.current = true;
          primeAudio(volume).then(() => {
            setAudioReady(true);
          }).catch(() => { audioUnlocked.current = false; });
        };
        window.addEventListener('pointerdown', unlockFromGesture, { passive: true });
        window.addEventListener('keydown', unlockFromGesture, { passive: true });
        window.addEventListener('touchstart', unlockFromGesture, { passive: true });
        return () => {
          window.removeEventListener('pointerdown', unlockFromGesture);
          window.removeEventListener('keydown', unlockFromGesture);
          window.removeEventListener('touchstart', unlockFromGesture);
        };
      }, [audioReady, primeAudio, volume]);
      React.useEffect(() => {
        requestAvailability();
        const refresh = () => requestAvailability(true);
        const refreshWhenVisible = () => { if (document.visibilityState !== 'hidden') requestAvailability(); };
        // Recover automatically when the local model finishes a cold start.
        const refreshTimer = setInterval(refreshWhenVisible, 5000);
        window.addEventListener('pageshow', refresh);
        document.addEventListener('visibilitychange', refreshWhenVisible);
        return () => {
          clearInterval(refreshTimer);
          window.removeEventListener('pageshow', refresh);
          document.removeEventListener('visibilitychange', refreshWhenVisible);
        };
      }, []);
      React.useEffect(() => {
        let alive = true;
        const update = (value) => {
          const next = { configured: value?.configured === true, model: value?.model || 'deepseek-v4-flash' };
          voiceBrainConfigured.current = next.configured;
          if (!alive) return;
        };
        const pending = getVoiceBrainStatus().then((value) => { update(value); return value; }).catch(() => {
          const value = { configured: false, model: 'deepseek-v4-flash' };
          update(value);
          return value;
        });
        voiceBrainReady.current = pending;
        const onConfig = (event) => update(event.detail);
        window.addEventListener(EVENT_BRAIN_CONFIG, onConfig);
        return () => { alive = false; window.removeEventListener(EVENT_BRAIN_CONFIG, onConfig); };
      }, []);
      const drainPendingStatus = React.useCallback(() => {
        const queued = pendingStatus.current;
        if (!queued) return;
        pendingStatus.current = null;
        setTimeout(() => {
          const selection = activeSessions.getSnapshot();
          if (selection.key !== sessionKey || activeIntent.current?.kind === 'final') return;
          if (activeIntent.current || prepareController.current) {
            pendingStatus.current = queued;
            return;
          }
          window.dispatchEvent(new CustomEvent(EVENT_PLAY, { detail: queued }));
        }, 0);
      }, [activeSessions, sessionKey]);
      React.useEffect(() => {
        const onPlay = async (event) => {
          const detail = event.detail || {};
          const selection = activeSessions.getSnapshot();
          if (detail.sessionKey !== sessionKey || selection.key !== sessionKey) return;
          const { messageId, markdown } = detail;
          const automatic = detail.auto === true;
          if (detail.stop) {
            pendingStatus.current = null;
            cancelPlayback();
            return;
          }
          const kind = detail.kind === 'status' ? 'status' : 'final';
          const priority = kind === 'status' ? 10 : 100;
          // A status report never interrupts an answer. If another status is
          // active, retain only the newest report and drain it after the active
          // intent reaches a terminal state instead of silently losing it.
          if (kind === 'status') {
            if (activeIntent.current?.kind === 'final') return;
            if (activeIntent.current?.priority >= priority || prepareController.current) {
              pendingStatus.current = { ...detail, sessionKey };
              return;
            }
          }
          if (kind === 'final') {
            pendingStatus.current = null;
            // stop() emits `stopped`. Reclaim automatic ownership only after
            // that event, then publish preparation for the current answer.
            cancelPlayback();
            const id = String(messageId || '');
            if (automatic && id) {
              // Claim the message only after the play event is received. This
              // keeps a dispatch/preparation failure retryable instead of
              // marking the final answer consumed before audio exists.
              seen.current.add(id);
              autoMessageIds.current.add(id);
              activeAutoMessageId.current = id;
            } else {
              activeAutoMessageId.current = null;
              if (id) autoMessageIds.current.delete(id);
            }
          }
          dispatchVoiceState({ status: kind === 'final' ? 'preparing' : 'loading', messageId, error: null, sessionKey });
          const requestScope = createVoiceRequestScope();
          const controller = requestScope.controller;
          prepareScope.current?.cancel('superseded');
          prepareScope.current = requestScope;
          prepareController.current = controller;
          const requestEpoch = ++lifecycleEpoch.current;
          const selectionEpoch = selection.epoch;
          const intent = { id: `${requestEpoch}:${String(messageId || kind)}`, kind, priority };
          activeIntent.current = intent;
          const isCurrentRequest = () => {
            const currentSelection = activeSessions.getSnapshot();
            return lifecycleEpoch.current === requestEpoch && !controller.signal.aborted
              && currentSelection.key === sessionKey && currentSelection.epoch === selectionEpoch;
          };
          const retryAutomatic = () => {
            if (!automatic || kind !== 'final' || !autoReadRef.current || !isCurrentRequest()) return;
            const id = String(messageId || '');
            const count = autoRetryCounts.current.get(id) || 0;
            if (!id || count >= 2 || autoRetryTimers.current.has(id)) return;
            autoRetryCounts.current.set(id, count + 1);
            seen.current.delete(id);
            const timer = setTimeout(() => {
              autoRetryTimers.current.delete(id);
              // EVENT_STATE is a UI notification, not the retry owner. In
              // particular, an error notification may arrive before this
              // timer is installed. Keep retry eligibility tied to the
              // session, generation, and intent map instead of a ref that UI
              // cleanup is allowed to clear.
              if (!isCurrentRequest() || !autoReadRef.current || !autoMessageIds.current.has(id)) return;
              activeAutoMessageId.current = id;
              window.dispatchEvent(new CustomEvent(EVENT_PLAY, { detail: { messageId: id, markdown, sessionKey, auto: true, retry: count + 1 } }));
            }, count === 0 ? 900 : 2400);
            autoRetryTimers.current.set(id, timer);
          };
          try {
            // Acquire browser playback permission, then suspend while text and
            // optional briefing are prepared. play() resumes immediately before
            // scheduling PCM, so preparation never holds an idle render thread.
            await primeAudio(volume);
            if (!isCurrentRequest()) return;
            audioUnlocked.current = true;
            setAudioReady(true);
            let speechMarkdown = markdown;
            // Only final, visibly long answers are sent to the optional cloud
            // brief endpoint. Process reports, reasoning, tools, and short
            // replies always remain local.
            if (kind === 'final' && Array.from(String(markdown || '')).length >= VOICE_BRIEF_THRESHOLD) {
              // Resolve the status race on cold start. The normal status
              // effect usually completes first; this bounded wait makes the
              // long-answer path deterministic without delaying short speech.
              await Promise.race([
                voiceBrainReady.current,
                new Promise((resolve) => requestScope.timeout(resolve, 1500))
              ]);
              if (!isCurrentRequest()) return;
              if (!voiceBrainConfigured.current) {
                const refreshed = await getVoiceBrainStatus().catch(() => ({ configured: false }));
                if (refreshed?.configured === true) {
                  voiceBrainConfigured.current = true;
                }
              }
            }
            if (kind === 'final' && voiceBrainConfigured.current && Array.from(String(markdown || '')).length >= VOICE_BRIEF_THRESHOLD) {
              dispatchVoiceState({ status: 'briefing', messageId, error: null, sessionKey });
              try {
                const brief = await createVoiceBrief(markdown, controller.signal);
                if (isCurrentRequest() && brief) speechMarkdown = brief;
              } catch (error) {
                if (controller.signal.aborted) return;
                // Voice continuity matters more than a cloud enhancement.
                // The visible answer is already authoritative, so fallback is local.
                dispatchVoiceState({ status: 'brief-fallback', messageId, error: error?.message || 'Voice brief unavailable.', sessionKey });
              }
            }
            if (!isCurrentRequest()) return;
            const sentences = await prepare(speechMarkdown, controller.signal);
            if (!isCurrentRequest()) return;
            if (!sentences.length) {
              if (automatic) retryAutomatic();
              dispatchVoiceState({ status: 'error', messageId, error: '没有可朗读的文本。', sessionKey });
              return;
            }
            const played = engine === 'system'
              ? await playSystem(messageId, sentences, volume)
              : await play(messageId, sentences, volume);
            if (played !== true) retryAutomatic();
          } catch (error) {
            if (controller.signal.aborted) return;
            if (error?.code === 'local-service-unavailable') {
              const value = {
                available: false,
                reason: '本地 Fairy 服务未启动。',
              };
              publishAvailability(value);
            }
            dispatchVoiceState({ status: 'error', messageId, error: error?.message || 'Speech preparation failed.', sessionKey });
            retryAutomatic();
          } finally {
            if (prepareController.current === controller) prepareController.current = null;
            if (activeIntent.current === intent) activeIntent.current = null;
            if (prepareScope.current === requestScope) {
              requestScope.cancel('request-complete');
              prepareScope.current = null;
            }
            if (kind === 'status') drainPendingStatus();
          }
        };
        window.addEventListener(EVENT_PLAY, onPlay);
        return () => { pendingStatus.current = null; prepareScope.current?.cancel('effect-cleanup'); prepareScope.current = null; prepareController.current = null; for (const timer of autoRetryTimers.current.values()) clearTimeout(timer); autoRetryTimers.current.clear(); window.removeEventListener(EVENT_PLAY, onPlay); };
      }, [activeSessions, cancelPlayback, drainPendingStatus, engine, play, playSystem, primeAudio, sessionKey, volume]);
      React.useEffect(() => {
        const onState = (event) => {
          const detail = event.detail || {};
          if (detail.sessionKey !== sessionKey) return;
          if (['idle', 'stopped'].includes(detail.status) && activeAutoMessageId.current) {
            const id = activeAutoMessageId.current;
            autoMessageIds.current.delete(activeAutoMessageId.current);
            activeAutoMessageId.current = null;
            if (detail.status === 'idle') autoRetryCounts.current.delete(id);
          }
          if (['idle', 'error'].includes(detail.status)) drainPendingStatus();
        };
        window.addEventListener(EVENT_STATE, onState);
        return () => window.removeEventListener(EVENT_STATE, onState);
      }, [sessionKey]);
      React.useEffect(() => {
        const state = baseline.current;
        const signature = `${snapshot.userSeq}:${snapshot.found.map((message) => message.id).join('|')}:${snapshot.currentTurnFinals.map((message) => message.id).join('|')}`;
        if (state.key !== sessionKey) {
          if (state.timer) clearTimeout(state.timer);
          cancelPlayback();
          seen.current = new Set();
          autoMessageIds.current.clear();
          activeAutoMessageId.current = null;
          pendingStatus.current = null;
          setBaselineReady(false);
          baseline.current = { key: sessionKey, timer: null, finalTimer: null, pendingFinal: null, signature: null, ready: false, baselineUserSeq: snapshot.userSeq, lastUserSeq: snapshot.userSeq, armedUserSeq: null };
        }
        const current = baseline.current;
        if (current.ready) return;
        // During cold start and a session switch, every lazily arriving message is
        // historical. Only a user message created after this baseline can arm auto-read.
        for (const message of snapshot.found) seen.current.add(message.id);
        current.baselineUserSeq = Math.max(current.baselineUserSeq, snapshot.userSeq);
        current.lastUserSeq = snapshot.userSeq;
        if (current.signature === signature) return;
        current.signature = signature;
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          if (baseline.current !== current || current.key !== sessionKey) return;
          current.timer = null;
          current.ready = true;
          setBaselineReady(true);
        }, SESSION_BASELINE_SETTLE_MS);
      }, [cancelPlayback, sessionKey, snapshot.found, snapshot.currentTurnFinals, snapshot.userSeq]);
      React.useEffect(() => {
        const current = baseline.current;
        if (current.key !== sessionKey || !current.ready) return;
        if (snapshot.userSeq > current.lastUserSeq) {
          current.lastUserSeq = snapshot.userSeq;
          current.armedUserSeq = snapshot.userSeq;
          cancelPlayback();
        }
      }, [cancelPlayback, sessionKey, snapshot.userSeq, baselineReady]);
      React.useEffect(() => {
        const current = baseline.current;
        if (!sessionActive || current.key !== sessionKey || !current.ready) return;
        // A render can contain both the new user sequence and a settled
        // assistant node. Do not consume anything until the user-turn effect
        // has armed this sequence; importantly, never mark it as seen here.
        if (current.armedUserSeq !== snapshot.userSeq) return;
        if (!autoRead || (engine !== 'system' && !availability.available)) return;

        // Only a closed turn's official closing final may trigger automatic
        // playback. Never infer a final answer from the last settled
        // assistant-step: search/thinking/tool turns can settle several such
        // nodes before the actual answer is emitted.
        const candidate = [...snapshot.currentTurnFinals].reverse().find((message) => !seen.current.has(message.id) && !autoMessageIds.current.has(message.id));
        if (!candidate) return;
        const pending = current.pendingFinal;
        if (!pending || pending.id !== candidate.id) {
          if (current.finalTimer) clearTimeout(current.finalTimer);
          current.pendingFinal = { ...candidate, userSeq: snapshot.userSeq };
          current.finalTimer = null;
        }

        // Defer dispatch briefly so the closed-turn projection and the
        // rendered answer settle together. Activity is intentionally not used
        // as a timeout-based final detector: a running flag cannot promote an
        // intermediate assistant-step into a final answer.
        if (!current.finalTimer) {
          const schedule = (delay) => {
            current.finalTimer = setTimeout(() => {
              current.finalTimer = null;
              const selection = activeSessions.getSnapshot();
              if (baseline.current !== current || current.key !== sessionKey
                || selection.key !== sessionKey || selection.epoch !== activeSelection.epoch) return;
              const latest = timelineRef.current;
              const final = current.pendingFinal;
              if (!final || latest.userSeq !== final.userSeq || current.armedUserSeq !== latest.userSeq) {
                current.pendingFinal = null;
                return;
              }
              const stillAuthoritative = latest.currentTurnFinals.some((message) => message.id === final.id);
              if (!stillAuthoritative) {
                current.pendingFinal = null;
                return;
              }
              current.pendingFinal = null;
              autoMessageIds.current.add(final.id);
              activeAutoMessageId.current = final.id;
              current.armedUserSeq = null;
              window.dispatchEvent(new CustomEvent(EVENT_PLAY, { detail: { messageId: final.id, markdown: final.markdown, sessionKey, auto: true } }));
            }, delay);
          };
          schedule(FINAL_PLAYBACK_SETTLE_MS);
        }
      }, [activeSelection.epoch, sessionActive, sessionKey, snapshot.currentTurnFinals, snapshot.userSeq, autoRead, engine, availability.available, audioReady, baselineReady]);
      React.useEffect(() => () => {
        const current = baseline.current;
        if (current.timer) clearTimeout(current.timer);
        cancelPlayback();
      }, [cancelPlayback]);
      React.useEffect(() => {
        window.addEventListener('pagehide', cancelPlayback);
        const cancelWhenHidden = () => { if (document.visibilityState === 'hidden') cancelPlayback(); };
        document.addEventListener('visibilitychange', cancelWhenHidden);
        return () => {
          window.removeEventListener('pagehide', cancelPlayback);
          document.removeEventListener('visibilitychange', cancelWhenHidden);
        };
      }, [cancelPlayback]);
      useVoiceBrain({
        sessionKey,
        timeline: snapshot,
        baselineReady,
        autoRead: autoRead && sessionActive,
        audioReady,
        available: engine === 'system' || availability.available
      });
      const autoLabel = autoRead ? '关闭自动朗读' : '开启自动朗读';
      const engineAvailable = engine === 'system' || availability.available;
      // Fixed irregular heights avoid a visible repeating cadence while keeping
      // React renders deterministic and free from animation jitter.
      const waveHeights = [6, 11, 8, 14, 10, 5, 13, 9, 14, 7, 12, 13, 6, 10, 14, 8, 13, 5, 11, 9, 13, 7, 10, 14, 6, 12, 8, 11, 5, 13];
      const waveform = waveHeights.map((height, index) => {
        const active = index / (waveHeights.length - 1) <= volume;
        return jsx.jsx('span', { className: 'dsh-fairy-voice-wave-bar', 'data-dsh-fairy-wave-bar': 'true', 'data-active': active ? 'true' : 'false', style: { '--dsh-fairy-wave-height': `${height}px`, '--dsh-fairy-wave-opacity': active ? '.86' : '.22' }, 'aria-hidden': 'true', key: index });
      });
      return jsx.jsxs('span', { className: 'dsh-fairy-voice-controls', role: 'group', 'aria-label': 'Fairy 朗读控制', [FAIRY_VOICE_CONTROL_ATTRIBUTE]: 'true', children: [
        jsx.jsx(Tooltip, { label: engineAvailable ? autoLabel : availability.reason, children: jsx.jsx('button', { type: 'button', className: 'dsh-fairy-voice-auto', 'data-dsh-fairy-auto-control': 'true', 'data-on': autoRead ? 'true' : 'false', disabled: !engineAvailable, onClick: () => setAutoRead((value) => !value), 'aria-label': autoLabel, 'aria-pressed': autoRead, children: jsx.jsx('span', { className: 'dsh-fairy-voice-auto-dot', 'data-dsh-fairy-auto-dot': 'true', 'aria-hidden': 'true' }) }) }),
        jsx.jsx('span', { className: 'dsh-fairy-voice-waveform', 'data-dsh-fairy-waveform': 'true', 'aria-hidden': 'true', children: waveform }),
        jsx.jsx(Tooltip, { label: `语音音量 ${Math.round(volume * 100)}%`, children: jsx.jsx('input', { className: 'dsh-fairy-voice-volume', 'data-dsh-fairy-volume-input': 'true', disabled: !engineAvailable, min: '0', max: '1', step: '0.05', type: 'range', value: volume, onChange: (event) => setVolume(Number(event.target.value)), 'aria-label': '语音音量', style: { '--dsh-fairy-volume': `${Math.round(volume * 100)}%` } }) }),
        engine === 'fairy' && state.status === 'error' ? jsx.jsx('span', { title: state.error, style: { color: 'var(--dsw-alias-state-error-primary)', fontSize: '12px', maxWidth: '96px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: '朗读失败' }) : null
      ] });
    }

    function useHddVisualMode() {
      const readMode = () => document.documentElement?.hasAttribute('data-dsh-fairy-visual') === true;
      return React.useSyncExternalStore((notify) => {
        // The visual plugin owns this document attribute. Observing that one
        // source keeps the Voice slot in lockstep without coupling to its
        // settings store or duplicating its mode state.
        if (typeof MutationObserver !== 'function' || !document.documentElement) return () => {};
        const observer = new MutationObserver(notify);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-dsh-fairy-visual'],
        });
        return () => observer.disconnect();
      }, readMode, readMode);
    }

    function SessionScopedVoiceController(props) {
      const hddVisualMode = useHddVisualMode();
      // In normal DSH mode this slot has no Voice surface or controller
      // lifecycle at all. Switching back to HDD mounts a fresh, session-keyed
      // controller, so mode changes cannot retain audio or DOM ownership.
      if (!hddVisualMode) return null;
      // Force a clean controller/ref lifecycle when DSH changes the active
      // session. This prevents playback and seen-message state leaking across
      // conversation providers during the transition frame.
      return jsx.jsx(VoiceController, { ...props, key: String(props.sessionId ?? 'empty-chat') });
    }

    function MessageAction({ messageId, sessionId }) {
      const conversation = React.useSyncExternalStore(voiceTimelineStore.subscribe, voiceTimelineStore.getSnapshot, voiceTimelineStore.getSnapshot);
      const sessionKey = String(sessionId ?? activeSessionStore?.getSnapshot().key ?? 'empty-chat');
      const message = conversation.sessionKey === sessionKey
        ? conversation.messagesById.get(String(messageId))
        : undefined;
      const [state, setState] = React.useState(() => readVoiceState(sessionKey));
      const availability = React.useSyncExternalStore(availabilityStore.subscribe, availabilityStore.getSnapshot, availabilityStore.getSnapshot);
      const engine = 'fairy';
      React.useLayoutEffect(() => {
        setState(readVoiceState(sessionKey));
        const listener = (event) => { if (event.detail?.sessionKey === sessionKey) setState(event.detail); };
        window.addEventListener(EVENT_STATE, listener);
        return () => window.removeEventListener(EVENT_STATE, listener);
      }, [sessionKey]);
      if (!message) return null;
      const active = state.messageId === String(messageId) && ['preparing', 'briefing', 'brief-fallback', 'loading', 'playing'].includes(state.status);
      const enabled = engine === 'system' || availability.available;
      const label = enabled ? (active ? '停止朗读' : '朗读回复') : availability.reason;
      return jsx.jsx(Tooltip, { label, children: jsx.jsx('button', {
        type: 'button', disabled: !enabled, onClick: () => active ? window.dispatchEvent(new CustomEvent(EVENT_PLAY, { detail: { sessionKey, stop: true } })) : window.dispatchEvent(new CustomEvent(EVENT_PLAY, { detail: { sessionKey, messageId: message.id, markdown: message.markdown } })),
        style: iconButton, 'aria-label': label, children: active ? jsx.jsx(IconStopFillRegular, { size: 16 }) : jsx.jsx(IconPlayOutlineRegular, { size: 16 })
      }) });
    }

    function injectVoiceSlot(ctx, name, definition, component) {
      let disposeRegistration = null;
      const releaseRegistration = () => {
        const dispose = disposeRegistration;
        disposeRegistration = null;
        dispose?.();
      };
      return ctx.slots.inject(name, () => {
        // Slot providers may be invoked again when the official node is
        // replaced or the client bundle is reloaded. Release the prior
        // registration before publishing the replacement.
        releaseRegistration();
        const registration = ctx.slots.register({ name, ...definition }, component);
        disposeRegistration = typeof registration === 'function' ? registration : null;
        return releaseRegistration;
      });
    }

    function apply(ctx) {
      return diagnostics.guard('apply', () => {
      installContext = ctx;
      ctx.effect(() => () => { if (installContext === ctx) installContext = null; }, 'fairy voice installer context');
      ensureVoiceControlStyles();
      const activeSessions = createActiveSessionStore(ctx.sessions);
      activeSessionStore = activeSessions;
      ctx.effect(() => () => {
        activeSessions.dispose();
        if (activeSessionStore === activeSessions) activeSessionStore = null;
        clearVoiceSessionStates();
        voiceTimelineStore.clear();
        disposeAvailability();
        document.getElementById(VOICE_STYLE_ID)?.remove();
      }, 'dsh-fairy-voice session lifecycle');
      const slotDisposers = [
        injectVoiceSlot(ctx, 'conversation.input.left', { name: 'conversation.input.left', id: 'fairy-voice-controller', order: 40 }, SessionScopedVoiceController),
        injectVoiceSlot(ctx, 'conversation.chat.assistant-actions', { id: 'fairy-voice-message-action', order: 20 }, MessageAction),
        injectVoiceSlot(ctx, 'settings.section', { id: 'fairy-voice-brain', order: 30, label: () => '语音模型设置' }, VoiceBrainSection),
      ].filter((dispose) => typeof dispose === 'function');
      ctx.effect(() => () => slotDisposers.forEach((dispose) => dispose()), 'dsh-fairy-voice slot registrations');
      }, { surface: 'client' });
    }

    return { apply, inject: ['slots', 'sessions'] }; })();
// BEGIN SHARED STARTUP SKIN
/* HDD/Fairy startup sequence. Visual-only adaptation of dsh-startup-screen 1.1.0
 * Copyright (c) 2026 沈宏宏 (MIT), see THIRD-PARTY-NOTICES.txt.
 * Classic uses the original video; archive is entirely local DOM/SVG, no video/audio. */
function mountStartupSkin(root, video, preferences, options={}) {
 if(preferences.variant!=='archive')return {update(){},dispose(){}};
 const css=`
 [data-fairy-startup-style="archive"]{background:#050910!important;color:#f0f4fa!important;font-family:Bahnschrift,"Arial Narrow","Microsoft YaHei",sans-serif;isolation:isolate;container-type:size}
 [data-fairy-startup-style="archive"] *{box-sizing:border-box}
 [data-fairy-startup-style="archive"] [hidden]{display:none!important}
 [data-fairy-startup-style="archive"] video,[data-fairy-startup-style="archive"] #fallback{display:none!important}
 [data-fairy-startup-style="archive"] .fairy-archive-stage{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 32%,#101d34 0,#080f1c 45%,#050910 100%);overflow:hidden;container-type:size}
 [data-fairy-startup-style="archive"] .fairy-archive-stage:before{content:"";position:absolute;inset:0;pointer-events:none;z-index:5;opacity:.14;background:repeating-linear-gradient(transparent 0 3px,#d8e6ff12 3px 4px)}
 [data-fairy-startup-style="archive"] .fairy-archive-stage:after{content:"";position:absolute;inset:20px;border:1px solid #b7c9e612;pointer-events:none;z-index:4}
 [data-fairy-startup-style="archive"] .fairy-archive-columns{position:absolute;inset:0;background:linear-gradient(90deg,transparent 5%,#dae8ff08 5%,#dae8ff08 15%,transparent 15%,transparent 61%,#dae8ff07 61%,#dae8ff07 77%,transparent 77%,transparent 79%,#dae8ff05 79%,#dae8ff05 95%,transparent 95%);opacity:.45}
 [data-fairy-startup-style="archive"] .fairy-archive-head{position:absolute;top:5cqh;left:4cqw;right:4cqw;display:flex;justify-content:space-between;align-items:start}
 [data-fairy-startup-style="archive"] .fairy-archive-brand{margin:0;color:#f5f7fc;font-size:clamp(26px,3.3cqw,48px);letter-spacing:.02em;line-height:1;font-weight:800}
 [data-fairy-startup-style="archive"] .fairy-archive-brand-sub{font-size:clamp(8px,1.05cqw,14px);margin-top:8px;letter-spacing:.09em;color:#d7e2f6}
 [data-fairy-startup-style="archive"] .fairy-archive-meta{font:10px/1.9 Consolas,monospace;letter-spacing:.12em;color:#8191ac;text-align:right}
 [data-fairy-startup-style="archive"] .fairy-archive-intro{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3cqh;background:#050910;z-index:6;animation:fairy-hdd-intro calc(var(--fairy-motion-unit,.52s) * 3.461538) both}
 [data-fairy-startup-style="archive"] .fairy-hdd-mark{width:min(45cqw,412.5px);height:auto}
 [data-fairy-startup-style="archive"] .fairy-hdd-wordmark{width:min(65.25cqw,750px);height:auto}
 [data-fairy-startup-style="archive"] .fairy-archive-eye{position:absolute;top:12cqh;left:50%;transform:translateX(-50%);width:clamp(120px,24cqh,220px);aspect-ratio:1;--dsh-fairy-outer-halo-color:#7ec4ff;filter:drop-shadow(0 0 20px #6f98ed30);z-index:2}
 [data-fairy-startup-style="archive"] .dsh-fairy-main{width:100%;height:100%;overflow:visible}
 [data-fairy-startup-style="archive"] .dsh-fairy-eye-flicker,[data-fairy-startup-style="archive"] .dsh-fairy-glitch-blocks{opacity:0}
 [data-fairy-startup-style="archive"] .dsh-fairy-corners{transform-origin:80px 80px;animation:fairy-eye-lids 9s ease-in-out infinite}
 [data-fairy-startup-style="archive"] .dsh-fairy-eye{transform-origin:80px 80px;animation:fairy-eye-blink 6.7s infinite}
 [data-fairy-startup-style="archive"] .dsh-fairy-eyeball{animation:fairy-eye-look 8s ease-in-out infinite}
 [data-fairy-startup-style="archive"] .dsh-fairy-glitch-1{transform:translateX(10px)}
 [data-fairy-startup-style="archive"] .dsh-fairy-glitch-2{transform:translateX(-14px)}
 [data-fairy-startup-style="archive"] .dsh-fairy-glitch-3{transform:translateX(8px)}
 [data-fairy-startup-style="archive"] .dsh-fairy-glitch-4{transform:translateX(-9px)}
 [data-fairy-startup-style="archive"] .dsh-fairy-glitch-5{transform:translateX(12px)}
 [data-fairy-startup-style="archive"][data-fairy-sequence-state="awakening"] .fairy-archive-eye{animation:fairy-error-reveal .9s steps(1) both}
 [data-fairy-startup-style="archive"][data-fairy-sequence-state="awakening"] .dsh-fairy-glitch-blocks{animation:fairy-error-blocks .9s steps(1) both}
 [data-fairy-startup-style="archive"][data-fairy-sequence-state="awakening"] .fairy-archive-brand{animation:fairy-error-text .9s steps(1) both}
 [data-fairy-startup-style="archive"] .fairy-archive-error{position:absolute;top:38cqh;left:0;right:0;text-align:center;font:10px Consolas,monospace;letter-spacing:.3em;color:#9ec7ed;animation:fairy-error-text .9s steps(1) both}
 [data-fairy-startup-style="archive"] .fairy-archive-center{position:absolute;top:46cqh;left:10cqw;right:10cqw;text-align:center;display:flex;flex-direction:column;align-items:center;gap:0}
 [data-fairy-startup-style="archive"] .fairy-archive-phase{margin:0;font-weight:500;font-size:clamp(25px,3.6cqw,46px);letter-spacing:.22em;line-height:1.35;color:#f5f7fb}
 [data-fairy-startup-style="archive"] .fairy-archive-en{font:clamp(8px,1.15cqw,13px)/2 Consolas,monospace;letter-spacing:.4em;position:relative;padding:0 20px 8px;margin:0 0 18px;max-width:100%}
 [data-fairy-startup-style="archive"] .fairy-archive-card{width:min(340px,75cqw);margin:0 0 16px;border-top:1px solid #95accb55;border-bottom:1px solid #95accb55;padding:8px 10px}
 [data-fairy-startup-style="archive"] .fairy-archive-row{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#9daec5;line-height:2}
 [data-fairy-startup-style="archive"] .fairy-archive-row b{font-size:16px;color:#f4f7fc;font-weight:500;letter-spacing:.13em}
 [data-fairy-startup-style="archive"] .fairy-archive-action{border:1px solid #d7e4f1a0;border-radius:0;background:linear-gradient(135deg,#101d31,#091321);transition:background .2s,border-color .2s,box-shadow .2s;color:#f4f7fc;padding:9px 20px;font:14px Bahnschrift,"Microsoft YaHei",sans-serif;letter-spacing:.12em;cursor:pointer}
 [data-fairy-startup-style="archive"] .fairy-archive-action:hover{background:#17263d;border-color:#dfedff;box-shadow:0 0 18px #92bcff12}
 [data-fairy-startup-style="archive"] .fairy-archive-hint{font-size:10px;letter-spacing:.08em;color:#8394ad;margin-top:12px}
 [data-fairy-startup-style="archive"] .fairy-archive-log{position:absolute;bottom:9cqh;left:4cqw;right:4cqw;display:flex;align-items:end;justify-content:space-between;gap:15px;border-top:1px solid #cedbee22;padding-top:13px;font:10px/1.8 Consolas,monospace;color:#8195b1;letter-spacing:.08em}
 [data-fairy-startup-style="archive"] .fairy-archive-caption{font:13px/1.8 "Microsoft YaHei",sans-serif;text-align:center;color:#b2c3da;letter-spacing:.05em}
 [data-fairy-startup-style="archive"] .fairy-archive-progress{position:absolute;bottom:6cqh;left:34cqw;right:34cqw;height:2px;background:#708daf30}
 [data-fairy-startup-style="archive"] .fairy-archive-fill{height:100%;background:#e1edfc;transform:scaleX(0);transform-origin:left;transition:transform calc(var(--fairy-motion-unit,.52s) * 1.1) cubic-bezier(.22,1,.36,1)}
 [data-fairy-startup-style="archive"] footer{position:absolute!important;inset:auto 24px 12px!important;padding:8px 0!important;font-size:10px;background:none!important;z-index:8;align-items:center!important;-webkit-app-region:no-drag!important}
 [data-fairy-startup-style="archive"] footer strong{display:none}
 [data-fairy-startup-style="archive"] footer p{font-size:10px;color:#8394ad;margin:0}
 [data-fairy-startup-style="archive"] footer button{padding:6px 12px;border-radius:0;font-size:11px;border-color:#8ca6c150;background:#0a1525}
 [data-fairy-startup-style="archive"][data-fairy-sequence-state="ended"] *,[data-fairy-startup-style="archive"][data-fairy-sequence-state="ended"] *::before,[data-fairy-startup-style="archive"][data-fairy-sequence-state="ended"] *::after,[data-fairy-startup-style="archive"][data-fairy-sequence-state="skipped"] *,[data-fairy-startup-style="archive"][data-fairy-sequence-state="skipped"] *::before,[data-fairy-startup-style="archive"][data-fairy-sequence-state="skipped"] *::after,[data-fairy-startup-style="archive"][data-fairy-sequence-state="failed"] *,[data-fairy-startup-style="archive"][data-fairy-sequence-state="failed"] *::before,[data-fairy-startup-style="archive"][data-fairy-sequence-state="failed"] *::after{animation:none!important;transition:none!important}

 [data-fairy-startup-style="archive"] .fairy-archive-welcome{position:absolute;top:42cqh;left:8cqw;right:8cqw;text-align:center;z-index:3;color:#f4f7fc;transition:transform .55s ease,filter .55s ease,text-shadow .55s ease}
 [data-fairy-startup-style="archive"] .fairy-w1{font:14px Consolas,monospace;letter-spacing:.45em;margin-bottom:12px}
 [data-fairy-startup-style="archive"] .fairy-w2{display:inline-block;padding:9px 18px;border:1px solid #cfe5ff;font-size:clamp(18px,3.3cqw,42px);font-weight:800;letter-spacing:.1em;background:#02060d}
 [data-fairy-startup-style="archive"] .fairy-w3{font:10px Consolas,monospace;letter-spacing:.28em;margin:14px 0;color:#97aaca}
 [data-fairy-startup-style="archive"] .fairy-w4{font-size:clamp(18px,2.4cqw,28px);letter-spacing:.15em}
 [data-fairy-startup-style="archive"] .fairy-archive-welcome[data-effect="signal"] .fairy-w2{animation:fairy-welcome-signal .24s ease-out both}
 [data-fairy-startup-style="archive"] .fairy-archive-welcome[data-effect="bloom"]{text-shadow:0 0 16px #b9d6ff66,0 0 42px #6996d733;filter:drop-shadow(0 0 12px #4d82e944)}
 [data-fairy-startup-style="archive"] .fairy-archive-welcome[data-effect="settled"]{transform:scale(1);filter:none;text-shadow:none}
 [data-fairy-startup-style="archive"] .fairy-archive-flash{position:absolute;inset:0;z-index:7;background:radial-gradient(ellipse at center,#c5e2ff,transparent 75%);opacity:0;pointer-events:none;transition:opacity .34s}

 /* Short, staggered entrances. Base styles remain visible when motion is disabled or frozen. */
 [data-fairy-startup-style="archive"] .fairy-archive-phase{--fairy-text-delay:0s;text-wrap:balance}
 [data-fairy-startup-style="archive"] .fairy-archive-en{--fairy-text-delay:calc(var(--fairy-motion-unit,.52s) * .15);color:#bccce3}
 [data-fairy-startup-style="archive"] .fairy-archive-caption{--fairy-text-delay:calc(var(--fairy-motion-unit,.52s) * .27)}
 [data-fairy-startup-style="archive"] .fairy-archive-step{--fairy-text-delay:calc(var(--fairy-motion-unit,.52s) * .1)}
 [data-fairy-startup-style="archive"] [data-fairy-motion="a"]{animation:fairy-text-in-a var(--fairy-motion-unit,.52s) cubic-bezier(.22,1,.36,1) var(--fairy-text-delay,0s) both}
 [data-fairy-startup-style="archive"] [data-fairy-motion="b"]{animation:fairy-text-in-b var(--fairy-motion-unit,.52s) cubic-bezier(.22,1,.36,1) var(--fairy-text-delay,0s) both}
 [data-fairy-startup-style="archive"] .fairy-archive-en:after{content:"";position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#bdcfe966,transparent);transform-origin:center}
 [data-fairy-startup-style="archive"] .fairy-archive-en[data-fairy-motion="a"]:after{animation:fairy-line-in-a var(--fairy-motion-unit,.52s) ease-out both}
 [data-fairy-startup-style="archive"] .fairy-archive-en[data-fairy-motion="b"]:after{animation:fairy-line-in-b var(--fairy-motion-unit,.52s) ease-out both}
 [data-fairy-startup-style="archive"] .fairy-archive-card{background:linear-gradient(90deg,transparent,#91b6e708,transparent);border-color:#95accb33;animation:fairy-text-in-a var(--fairy-motion-unit,.52s) ease-out both}
 [data-fairy-startup-style="archive"] .fairy-archive-row{animation:fairy-text-in-a var(--fairy-motion-unit,.52s) cubic-bezier(.22,1,.36,1) both}
 [data-fairy-startup-style="archive"] .fairy-archive-row:nth-child(1){animation-delay:calc(var(--fairy-motion-unit,.52s) * .18)}
 [data-fairy-startup-style="archive"] .fairy-archive-row:nth-child(2){animation-delay:calc(var(--fairy-motion-unit,.52s) * .32)}
 [data-fairy-startup-style="archive"] .fairy-archive-row:nth-child(3){animation-delay:calc(var(--fairy-motion-unit,.52s) * .46)}
 [data-fairy-startup-style="archive"] .fairy-archive-action{animation:fairy-text-in-a var(--fairy-motion-unit,.52s) ease-out calc(var(--fairy-motion-unit,.52s) * .4) both}
 [data-fairy-startup-style="archive"] .fairy-archive-action:focus-visible{outline:1px solid #d9e8ff;outline-offset:4px}
 [data-fairy-startup-style="archive"] .fairy-archive-action:active{background:#20334e}
 [data-fairy-startup-style="archive"] .fairy-archive-hint{animation:fairy-text-in-a var(--fairy-motion-unit,.52s) ease-out calc(var(--fairy-motion-unit,.52s) * .65) both}
 [data-fairy-startup-style="archive"] .fairy-hdd-mark{animation:fairy-text-in-a calc(var(--fairy-motion-unit,.52s) * 1.192308) cubic-bezier(.22,1,.36,1) both}
 [data-fairy-startup-style="archive"] .fairy-hdd-wordmark{animation:fairy-text-in-a calc(var(--fairy-motion-unit,.52s) * 1.307692) cubic-bezier(.22,1,.36,1) calc(var(--fairy-motion-unit,.52s) * .384615) both}
 [data-fairy-startup-style="archive"] .fairy-archive-welcome>div{animation:fairy-text-in-a var(--fairy-motion-unit,.52s) cubic-bezier(.22,1,.36,1) both}
 [data-fairy-startup-style="archive"] .fairy-w2{animation-delay:calc(var(--fairy-motion-unit,.52s) * .16)!important}
 [data-fairy-startup-style="archive"] .fairy-w3{animation-delay:calc(var(--fairy-motion-unit,.52s) * .32)!important}
 [data-fairy-startup-style="archive"] .fairy-w4{animation-delay:calc(var(--fairy-motion-unit,.52s) * .48)!important}
 [data-fairy-startup-style="archive"] :is(.fairy-archive-phase,.fairy-archive-en)[data-fairy-motion="a"]{animation-name:fairy-title-in-a}
 [data-fairy-startup-style="archive"] :is(.fairy-archive-phase,.fairy-archive-en)[data-fairy-motion="b"]{animation-name:fairy-title-in-b}
 @keyframes fairy-title-in-a{from{opacity:0;clip-path:inset(0 100% 0 0);transform:translateX(-6px)}to{opacity:1;clip-path:inset(0 0 0 0);transform:translateX(0)}}
 @keyframes fairy-title-in-b{from{opacity:0;clip-path:inset(0 100% 0 0);transform:translateX(-6px)}to{opacity:1;clip-path:inset(0 0 0 0);transform:translateX(0)}}
 @keyframes fairy-text-in-a{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
 @keyframes fairy-text-in-b{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
 @keyframes fairy-line-in-a{from{opacity:0;transform:scaleX(.3)}to{opacity:1;transform:scaleX(1)}}
 @keyframes fairy-line-in-b{from{opacity:0;transform:scaleX(.3)}to{opacity:1;transform:scaleX(1)}}
 @keyframes fairy-welcome-signal{0%{text-shadow:-2px 0 #74dfee88,2px 0 #d86a9488;opacity:.85}100%{text-shadow:none;opacity:1}}
 @keyframes fairy-hdd-intro{0%{opacity:0;transform:scale(.98)}15%,86%{opacity:1;transform:scale(1)}100%{opacity:0}}
 @keyframes fairy-eye-lids{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(9deg)}}
 @keyframes fairy-eye-blink{0%,44%,49%,100%{transform:scaleY(1)}46%{transform:scaleY(.07)}}
 @keyframes fairy-eye-look{0%,100%{transform:translate(0,0)}28%{transform:translate(5px,-3px)}55%{transform:translate(-4px,2px)}78%{transform:translate(3px,1px)}}
 @keyframes fairy-error-reveal{0%,12%,32%{opacity:0;filter:none}6%,22%,50%{opacity:1;transform:translateX(calc(-50% + 8px));filter:drop-shadow(-7px 0 #70efff) drop-shadow(5px 0 #ed658f)}40%,70%,100%{opacity:1;transform:translateX(-50%);filter:drop-shadow(0 0 20px #6f98ed30)}}
 @keyframes fairy-error-blocks{0%,30%,55%,100%{opacity:0}10%,40%,68%{opacity:1}}
 @keyframes fairy-error-text{0%,22%,46%{opacity:.2;text-shadow:-5px 0 #74dfee,5px 0 #d86a94}12%,35%,65%,100%{opacity:1;text-shadow:none}}
 @media(max-height:580px){[data-fairy-startup-style="archive"] .fairy-archive-eye{top:10cqh;width:110px}[data-fairy-startup-style="archive"] .fairy-archive-center{top:40cqh}[data-fairy-startup-style="archive"] .fairy-archive-phase{font-size:25px}[data-fairy-startup-style="archive"] .fairy-archive-en{margin-bottom:8px}[data-fairy-startup-style="archive"] .fairy-archive-row{line-height:1.6}[data-fairy-startup-style="archive"] .fairy-archive-card{margin-bottom:8px;padding:4px 10px}[data-fairy-startup-style="archive"] .fairy-archive-hint{margin-top:6px}}
 @media(max-width:680px){[data-fairy-startup-style="archive"] .fairy-archive-meta{display:none}[data-fairy-startup-style="archive"] .fairy-archive-center{left:5cqw;right:5cqw}[data-fairy-startup-style="archive"] .fairy-archive-phase{font-size:26px;letter-spacing:.13em}[data-fairy-startup-style="archive"] .fairy-archive-log{gap:6px}[data-fairy-startup-style="archive"] .fairy-archive-log>span:last-child{display:none}[data-fairy-startup-style="archive"] .fairy-archive-caption{font-size:11px}[data-fairy-startup-style="archive"] .fairy-archive-brand-sub{font-size:8px;letter-spacing:0}}
 @media(prefers-reduced-motion:reduce){[data-fairy-startup-style="archive"] *,[data-fairy-startup-style="archive"] *::before,[data-fairy-startup-style="archive"] *::after{animation:none!important;transition:none!important}}
`;
 const EYE = "\n<svg class=\"dsh-fairy-main\" viewBox=\"0 0 160 160\" xmlns=\"http://www.w3.org/2000/svg\" role=\"presentation\">\n\t<defs>\n\t\t<!-- Color, glow, scanline, and horizontal-only displacement resources. -->\n\t\t<linearGradient id=\"dsh-fairy-outer-gradient\" x1=\".2\" y1=\"0\" x2=\".8\" y2=\"1\">\n\t\t\t<stop stop-color=\"#4053f0\"/>\n\t\t\t<stop offset=\".54\" stop-color=\"#3045dc\"/>\n\t\t\t<stop offset=\"1\" stop-color=\"#3d50c8\"/>\n\t\t</linearGradient>\n\t\t<!-- One static radial field replaces separate halo strokes, avoiding alpha seams. -->\n\t\t<radialGradient id=\"dsh-fairy-sclera-halo-gradient\" gradientUnits=\"userSpaceOnUse\" cx=\"80\" cy=\"80\" r=\"56\" color-interpolation=\"linearRGB\">\n\t\t\t<stop offset=\".82\" stop-color=\"#ffffff\" stop-opacity=\"0\"/>\n\t\t\t<stop offset=\".864\" stop-color=\"#ffffff\" stop-opacity=\".22\"/>\n\t\t\t<stop offset=\".875\" stop-color=\"#ffffff\" stop-opacity=\".28\"/>\n\t\t\t<stop offset=\".89\" stop-color=\"#ffffff\" stop-opacity=\".19\"/>\n\t\t\t<stop offset=\".91\" stop-color=\"#ffffff\" stop-opacity=\".11\"/>\n\t\t\t<stop offset=\".94\" stop-color=\"#ffffff\" stop-opacity=\".07\"/>\n\t\t\t<stop offset=\".96\" stop-color=\"#ffffff\" stop-opacity=\".035\"/>\n\t\t\t<stop offset=\"1\" stop-color=\"#ffffff\" stop-opacity=\"0\"/>\n\t\t</radialGradient>\n\t\t<radialGradient id=\"dsh-fairy-outer-halo-gradient\" gradientUnits=\"userSpaceOnUse\" cx=\"80\" cy=\"80\" r=\"79\" color-interpolation=\"linearRGB\">\n\t\t\t<stop offset=\".80\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\"0\"/>\n\t\t\t<stop offset=\".84\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\".10\"/>\n\t\t\t<stop offset=\".868\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\".28\"/>\n\t\t\t<stop offset=\".90\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\".18\"/>\n\t\t\t<stop offset=\".95\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\".06\"/>\n\t\t\t<stop offset=\".99\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\".02\"/>\n\t\t\t<stop offset=\"1\" stop-color=\"var(--dsh-fairy-outer-halo-color)\" stop-opacity=\"0\"/>\n\t\t</radialGradient>\n\t\t<radialGradient id=\"dsh-fairy-highlight-halo-gradient\" gradientUnits=\"userSpaceOnUse\" cx=\"98\" cy=\"100.5\" r=\"18\" color-interpolation=\"linearRGB\">\n\t\t\t<stop offset=\".53\" stop-color=\"#f5f8fd\" stop-opacity=\"0\"/>\n\t\t\t<stop offset=\".56\" stop-color=\"#f5f8fd\" stop-opacity=\".16\"/>\n\t\t\t<stop offset=\".611\" stop-color=\"#f5f8fd\" stop-opacity=\".43\"/>\n\t\t\t<stop offset=\".72\" stop-color=\"#f5f8fd\" stop-opacity=\".19\"/>\n\t\t\t<stop offset=\".77\" stop-color=\"#f5f8fd\" stop-opacity=\".12\"/>\n\t\t\t<stop offset=\".83\" stop-color=\"#f5f8fd\" stop-opacity=\".055\"/>\n\t\t\t<stop offset=\".89\" stop-color=\"#f5f8fd\" stop-opacity=\".02\"/>\n\t\t\t<stop offset=\".96\" stop-color=\"#f5f8fd\" stop-opacity=\".004\"/>\n\t\t\t<stop offset=\"1\" stop-color=\"#f5f8fd\" stop-opacity=\"0\"/>\n\t\t</radialGradient>\n\t\t<pattern id=\"dsh-fairy-lines\" width=\"4\" height=\"4\" patternUnits=\"userSpaceOnUse\">\n\t\t\t<!-- Keep the internal scanline texture present but quieter against the eye. -->\n\t\t\t<rect width=\"4\" height=\"1\" fill=\"#c9f8ff\" opacity=\".055\"/>\n\t\t</pattern>\n\t\t\t<!-- Blue is forced to 0.5 so the displacement map moves pixels horizontally only. -->\n\t\t\t<!-- Horizontal glitch noise is intentionally low-resolution. The map never\n\t\t\t     moves pixels vertically, so its filter cache needs less vertical coverage\n\t\t\t     and resolution while interpolation keeps the tear continuous. -->\n\t\t\t<filter id=\"dsh-fairy-interference\" x=\"-30%\" y=\"0%\" width=\"160%\" height=\"100%\" filterRes=\"96 72\" color-interpolation-filters=\"sRGB\">\n\t\t\t<feTurbulence id=\"dsh-fairy-noise\" type=\"fractalNoise\" baseFrequency=\".012 .72\" numOctaves=\"1\" seed=\"1\" result=\"noise\"/>\n\t\t\t<feColorMatrix in=\"noise\" type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 0 0 .5  0 0 0 1 0\" result=\"horizontal-noise\"/>\n\t\t\t<feDisplacementMap id=\"dsh-fairy-displace\" in=\"SourceGraphic\" in2=\"horizontal-noise\" scale=\"5\" xChannelSelector=\"R\" yChannelSelector=\"B\"/>\n\t\t</filter>\n\t\t<clipPath id=\"dsh-fairy-disc-clip\"><circle cx=\"80\" cy=\"80\" r=\"67\"/></clipPath>\n\t\t<clipPath id=\"dsh-fairy-thinking-eye-clip\">\n\t\t\t<path class=\"dsh-fairy-thinking-clip-shape\" d=\"M20 60 Q80 90 140 60 V160 H20 Z\"/>\n\t\t\t<!-- This fixed lower region prevents curve scaling from clipping the lower eye. -->\n\t\t\t<rect x=\"0\" y=\"108\" width=\"160\" height=\"52\"/>\n\t\t</clipPath>\n\t\t<!-- A shallow reversed arc gives Fairy the gentle, slightly drooped brow. -->\n\t\t<clipPath id=\"dsh-fairy-comforting-eye-clip\">\n\t\t\t<path class=\"dsh-fairy-comforting-clip-shape\" d=\"M20 60 Q80 30 140 60 V160 H20 Z\"/>\n\t\t\t<rect x=\"0\" y=\"108\" width=\"160\" height=\"52\"/>\n\t\t</clipPath>\n\t\t<!-- These five rectangles are resized slightly for every block-glitch event. -->\n\t\t<clipPath id=\"dsh-fairy-slice-1\"><rect x=\"4\" y=\"12\" width=\"152\" height=\"25\"/></clipPath>\n\t\t<clipPath id=\"dsh-fairy-slice-2\"><rect x=\"4\" y=\"37\" width=\"152\" height=\"28\"/></clipPath>\n\t\t<clipPath id=\"dsh-fairy-slice-3\"><rect x=\"4\" y=\"65\" width=\"152\" height=\"26\"/></clipPath>\n\t\t<clipPath id=\"dsh-fairy-slice-4\"><rect x=\"4\" y=\"91\" width=\"152\" height=\"30\"/></clipPath>\n\t\t<clipPath id=\"dsh-fairy-slice-5\"><rect x=\"4\" y=\"121\" width=\"152\" height=\"27\"/></clipPath>\n\t\t</defs>\n\t\n\t\t<g class=\"dsh-fairy-body\">\n\t<!-- Stable outer radial halo stays outside the fault signal so it is not\n\t     filtered or duplicated by the block-glitch clones. -->\n\t\t<circle class=\"dsh-fairy-outer-halo\" cx=\"80\" cy=\"80\" r=\"79\" fill=\"url(#dsh-fairy-outer-halo-gradient)\"/>\n\t<g class=\"dsh-fairy-signal\" data-fault-source=\"true\">\n\t<!-- The complete normal visual. Glitch modes filter or slice this entire group. -->\n\t<g id=\"dsh-fairy-image\" class=\"dsh-fairy-image\">\n\t\t<circle class=\"dsh-fairy-outer-disc\" cx=\"80\" cy=\"80\" r=\"68\" fill=\"url(#dsh-fairy-outer-gradient)\" stroke=\"#f2fbff\" stroke-width=\"1.2\"/>\n\t<!-- Dark circle + square form the four rotating lashes / eyelids. -->\n\t<g class=\"dsh-fairy-corners\" clip-path=\"url(#dsh-fairy-disc-clip)\" fill=\"#2b3388\">\n\t\t<!-- Slightly open the eye: reduce the lid ring without changing its silhouette. -->\n\t\t<circle cx=\"80\" cy=\"80\" r=\"51.75\"/>\n\t\t<rect x=\"37\" y=\"37\" width=\"86\" height=\"86\" rx=\"2\" transform=\"rotate(3 80 80)\"/>\n\t</g>\n\n\t<!-- Eye anatomy: sclera, layered eyeball, pupil, then highlight. -->\n\t<g class=\"dsh-fairy-eye\">\n\t\t\t<!-- One animated group keeps the vector rim pixel-locked to the sclera. -->\n\t\t\t<g class=\"dsh-fairy-sclera\">\n\t\t\t\t<circle cx=\"80\" cy=\"80\" r=\"48\" fill=\"#eef0f5\"/>\n\t\t\t\t<circle class=\"dsh-fairy-sclera-halo\" cx=\"80\" cy=\"80\" r=\"56\" fill=\"url(#dsh-fairy-sclera-halo-gradient)\"/>\n\t\t\t\t<!-- A thin contact rim closes subpixel seams at the sclera/halo boundary. -->\n\t\t\t\t<circle class=\"dsh-fairy-sclera-contact\" cx=\"80\" cy=\"80\" r=\"48\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"0.8\" stroke-opacity=\".16\"/>\n\t\t\t</g>\n\t\t<g class=\"dsh-fairy-eyeball\">\n\t\t\t<circle class=\"dsh-fairy-layer-three\" cx=\"80\" cy=\"80\" r=\"33\" fill=\"#9daee0\"/>\n\t\t\t<circle class=\"dsh-fairy-layer-two\" cx=\"80\" cy=\"80\" r=\"24.15\" fill=\"#eef0f5\"/>\n\t\t\t<circle class=\"dsh-fairy-layer-two\" cx=\"80\" cy=\"80\" r=\"23.5\" fill=\"#317bcf\"/>\n\t\t\t<circle class=\"dsh-fairy-layer-one\" cx=\"80\" cy=\"80\" r=\"16.6\" fill=\"none\" stroke=\"#f5f8fd\" stroke-width=\".1\"/>\n\t\t\t<circle class=\"dsh-fairy-layer-one\" cx=\"80\" cy=\"80\" r=\"16\" fill=\"#3b3d8a\"/>\n\t\t\t\t<g class=\"dsh-fairy-highlight dsh-fairy-layer-two\">\n\t\t\t\t\t<circle class=\"dsh-fairy-highlight-halo\" cx=\"98\" cy=\"100.5\" r=\"18\" fill=\"url(#dsh-fairy-highlight-halo-gradient)\"/>\n\t\t\t\t\t<circle class=\"dsh-fairy-highlight-glow\" cx=\"98\" cy=\"100.5\" r=\"11\" fill=\"#f5f8fd\"/>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n\t<!-- Full-eye flicker layer stays outside the scaled eye group and is not part\n\t     of the fault clone source; it covers the disc and brows only. -->\n\t<circle class=\"dsh-fairy-eye-flicker\" cx=\"80\" cy=\"80\" r=\"68.6\" fill=\"#ffffff\" pointer-events=\"none\"/>\n\n\t<g clip-path=\"url(#dsh-fairy-disc-clip)\" opacity=\".42\">\n\t\t<rect class=\"dsh-fairy-scanlines\" x=\"12\" y=\"10\" width=\"136\" height=\"146\" fill=\"url(#dsh-fairy-lines)\"/>\n\t</g>\n\t</g>\n\t<!-- Five complete-image clones clipped into horizontal blocks for left/right displacement. -->\n\t<g class=\"dsh-fairy-glitch-blocks\">\n\t\t<use href=\"#dsh-fairy-image\" class=\"dsh-fairy-glitch-1\" clip-path=\"url(#dsh-fairy-slice-1)\"/>\n\t\t<use href=\"#dsh-fairy-image\" class=\"dsh-fairy-glitch-2\" clip-path=\"url(#dsh-fairy-slice-2)\"/>\n\t\t<use href=\"#dsh-fairy-image\" class=\"dsh-fairy-glitch-3\" clip-path=\"url(#dsh-fairy-slice-3)\"/>\n\t\t<use href=\"#dsh-fairy-image\" class=\"dsh-fairy-glitch-4\" clip-path=\"url(#dsh-fairy-slice-4)\"/>\n\t\t<use href=\"#dsh-fairy-image\" class=\"dsh-fairy-glitch-5\" clip-path=\"url(#dsh-fairy-slice-5)\"/>\n\t</g>\n\t</g>\n\t</g>\n\t\t</svg>";
 const nodes=[];let disposed=false,terminal=false,state='intro',ready=false;
 const schedule=options.setTimeout||setTimeout,cancel=options.clearTimeout||clearTimeout,timers=new Set();
 const speed=[.5,1,1.5,2].includes(preferences.speed)?preferences.speed:1;
 function later(fn,ms){let id=schedule(()=>{timers.delete(id);if(!disposed&&!terminal)fn()},ms/speed);timers.add(id);}
 function clearTimers(){for(const id of timers)cancel(id);timers.clear()}
 function element(tag,name,text,parent=root){const n=document.createElement(tag);n.className=name;if(text!==undefined)n.textContent=text;parent.append(n);return n}
 root.setAttribute('data-fairy-startup-style','archive');
 if(!options.stylesLoaded){const style=element('style','');style.textContent=css;nodes.push(style)}
 const stage=element('div','fairy-archive-stage');nodes.push(stage);
 const ratio={'16:9':16/9,'16:10':16/10,'4:3':4/3,'1:1':1}[preferences.aspectRatio];
 stage.style.cssText=`inset:auto;left:50%;top:50%;width:${ratio?`min(100cqw, ${100*ratio}cqh)`:'100%'};height:${ratio?`min(100cqh, ${100/ratio}cqw)`:'100%'};transform:translate(-50%,-50%) scale(${(preferences.scale||100)/100});transform-origin:center;`;
 element('div','fairy-archive-columns',undefined,stage);
 const intro=element('div','fairy-archive-intro',undefined,stage);intro.style.animationDuration=(1.8/speed)+'s';
 const prefix=options.assetBase||'media/';
 const mark=element('img','fairy-hdd-mark',undefined,intro);mark.src=prefix+'hdd-mark.png';mark.alt='H.D.D · 原图字形';
 const wordmark=element('img','fairy-hdd-wordmark',undefined,intro);wordmark.src=prefix+'hdd-wordmark.png';wordmark.alt='HOLLOW DEEP DIVE SYSTEM · 空洞深潜系统';
 const head=element('header','fairy-archive-head',undefined,stage);const branding=element('div','',undefined,head);
 const brand=element('h1','fairy-archive-brand','HDD',branding);element('div','fairy-archive-brand-sub','HOLLOW DEEP DIVE ESYSTEM',branding);
 element('div','fairy-archive-meta','REV 1.4.5 · LOCAL PROFILE\nHDD / VISUAL INTERFACE',head);
 const eye=element('div','fairy-archive-eye',undefined,stage);eye.innerHTML=EYE;eye.hidden=true;eye.setAttribute('aria-hidden','true');
 const error=element('div','fairy-archive-error','SIGNAL ERROR / FAIRY LINK RECOVERED',stage);error.hidden=true;
 const center=element('div','fairy-archive-center',undefined,stage);const phase=element('h2','fairy-archive-phase','',center);const en=element('p','fairy-archive-en','',center);
 const card=element('div','fairy-archive-card',undefined,center);card.hidden=true;
 for(const [label,value] of [['身份名称','法厄同'],['身份编号','0000'],['权限等级','3']]){const row=element('div','fairy-archive-row',undefined,card);element('span','',label,row);element('b','',value,row)}
 const action=element('button','fairy-archive-action','',center);action.type='button';action.hidden=true;
 const hint=element('p','fairy-archive-hint','按 Enter / Space，或点击按钮继续',center);hint.hidden=true;
 const welcomePanel=element('div','fairy-archive-welcome',undefined,stage);welcomePanel.hidden=true;
 element('div','fairy-w1','WELCOME TO',welcomePanel);element('div','fairy-w2','DEEPSEEK HARNESS',welcomePanel);element('div','fairy-w3','D E E P S E E K · H A R N E S S',welcomePanel);element('div','fairy-w4','欢迎 法厄同 访问',welcomePanel);
 const flash=element('div','fairy-archive-flash',undefined,stage);flash.setAttribute('aria-hidden','true');
 const log=element('div','fairy-archive-log',undefined,stage);const step=element('span','fairy-archive-step','',log);const caption=element('div','fairy-archive-caption','',log);element('span','','POWERED BY DEEPSEEK ━',log);
 const track=element('div','fairy-archive-progress',undefined,stage);const fill=element('div','fairy-archive-fill',undefined,track);
 function report(s){options.onState?.(s)}
 // Alternate animation names without forced layout or extra timers. Only changed text re-enters.
 const motions=new Map();stage.style.setProperty?.('--fairy-motion-unit',(.52/(preferences.speed||1))+'s');
 function text(node,value){if(node.textContent===value)return;node.textContent=value;const motion=motions.get(node)==='a'?'b':'a';motions.set(node,motion);node.setAttribute('data-fairy-motion',motion)}
 function setState(next,zh,english,subtitle,count,progress){state=next;root.setAttribute('data-fairy-sequence-state',next);text(phase,zh);text(en,english);text(caption,subtitle);text(step,count);fill.style.transform=`scaleX(${progress})`;}
 function permission(){intro.hidden=true;setState('permission','需要访问许可','ACCESS PERMISSION REQUIRED','等待用户授权…','[ 01 / 06 ] AUTHORIZATION',.34);action.textContent='授予访问权限  GRANT ACCESS';action.hidden=false;hint.hidden=false;action.focus?.();report('awaiting-input')}
 function grant(){if(state!=='permission'||terminal||disposed)return;action.hidden=true;hint.hidden=true;brand.textContent='FAIRY';eye.hidden=false;error.hidden=false;setState('awakening','需要访问许可','ACCESS PERMISSION REQUIRED','访问许可已确认，Fairy 信号恢复中…','[ 01 / 06 ] AUTHORIZATION',.34);report('sequence-running');later(identity,900)}
 function identity(){error.hidden=true;card.hidden=false;action.hidden=false;hint.hidden=false;action.textContent='确认身份  CONFIRM IDENTITY';setState('identity','身份资料确认','IDENTITY VERIFICATION','核对身份资料…','[ 02 / 06 ] IDENTITY',.5);action.focus?.();report('awaiting-input')}
 function confirm(){if(state!=='identity'||terminal||disposed)return;action.hidden=true;hint.hidden=true;card.hidden=true;setState('confirmed','身份资料确认','IDENTITY VERIFICATION','身份资料已确认','[ 02 / 06 ] IDENTITY',.5);report('sequence-running');later(request,700)}
 function request(){setState('request','接收访问需求','ACCESS REQUEST RECEIVED','接收访问需求，建立会话通道…','[ 03 / 06 ] REQUEST',.66);later(read,1200)}
 function read(){setState('read','开始读取权限','PERMISSION READ STARTED','开始读取权限，索引工作区与会话…','[ 04 / 06 ] READ',.8);later(verify,1200)}
 function verify(){setState('verify','读取完毕 · 核验通过','READ COMPLETE · VERIFIED','读取完毕，核验通过，权限已授予','[ 05 / 06 ] VERIFY',.93);later(welcome,1600)}
 function welcome(){center.hidden=true;setState('welcome','欢迎法厄同访问','WELCOME','身份验证完成，会话已建立','[ 06 / 06 ] WELCOME',1);later(()=>{welcomePanel.hidden=false},360);later(()=>{welcomePanel.setAttribute('data-effect','signal')},780);later(()=>{welcomePanel.setAttribute('data-effect','bloom')},1420);later(()=>{flash.style.opacity='.18'},1850);later(()=>{flash.style.opacity='0'},1940);later(()=>{welcomePanel.setAttribute('data-effect','settled')},2260);later(finish,3040)}
 function finish(){if(terminal||disposed)return;terminal=true;clearTimers();root.setAttribute('data-fairy-sequence-state','ended');options.onComplete?.()}
 function update(_time=0,_duration=0,isReady=false,next){ready=isReady===true;if(disposed)return;if(next==='skipped'||next==='failed'){terminal=true;clearTimers();intro.hidden=true;card.hidden=true;action.hidden=true;hint.hidden=true;error.hidden=true;welcomePanel.hidden=true;center.hidden=false;flash.style.opacity='0';setState(next,next==='skipped'?'启动动画已跳过':'动画暂时不可用','DSH CONTINUES LOADING',ready?'DSH 已就绪':'等待 DSH 加载完成','LOCAL / VISUAL ONLY',0)}}
 action.onclick=()=>{if(state==='permission')grant();else if(state==='identity')confirm()};
 const key=e=>{if((e.key==='Enter'||e.key===' ')&&(!e.target||e.target===root||e.target===action)){e.preventDefault();action.onclick()}};
 root.addEventListener('keydown',key);setState('intro','','','','HDD / BOOT SEQUENCE',0);report('sequence-running');later(permission,1800);
 return {update,dispose(){if(disposed)return;disposed=true;clearTimers();action.onclick=null;root.removeEventListener?.('keydown',key);for(const n of nodes)n.remove();root.removeAttribute('data-fairy-startup-style');root.removeAttribute('data-fairy-sequence-state');motions.clear()}};
}
// END SHARED STARTUP SKIN
function normalizeStartupPreferences(v={}) {
 if(!v||typeof v!=='object')v={};
 return {enabled:v.enabled!==false,muted:v.muted!==false,speed:[0.5,1,1.5,2].includes(v.speed)?v.speed:1,
  aspectRatio:['auto','16:9','16:10','4:3','1:1'].includes(v.aspectRatio)?v.aspectRatio:'auto',
  scale:typeof v.scale==='number'&&Number.isFinite(v.scale)?Math.max(50,Math.min(150,Math.round(v.scale))):100,
  fit:v.fit==='contain'?'contain':'cover',variant:v.variant==='archive'?'archive':'classic'};
}
function startupVideoStyle(prefs) {
 const ratio={'16:9':16/9,'16:10':16/10,'4:3':4/3,'1:1':1}[prefs.aspectRatio];
 const vw=prefs.variant==='archive'?'cqw':'vw',vh=prefs.variant==='archive'?'cqh':'vh';
 const width=ratio?`min(100${vw}, ${100*ratio}${vh})`:'100%';
 const height=ratio?`min(100${vh}, ${100/ratio}${vw})`:'100%';
 return `position:absolute;left:50%;top:50%;width:${width};height:${height};object-fit:${prefs.fit};transform:translate(-50%,-50%) scale(${prefs.scale/100});transform-origin:center;`;
}
function createStartupSurface(React, ctx) {
  // Desktop-native startup owns launch playback. The plugin never queues another
  // video after the desktop has finished loading; this is manual preview only.
  const KEY = 'dsh.fairyUi.startup.v2';
  let active=null;
  const read=()=>{try{return normalizeStartupPreferences(JSON.parse(localStorage.getItem(KEY)||'{}'))}catch{return normalizeStartupPreferences()}};
  const openPreview=()=>{
    active?.();const prefs=read();const overlay=document.createElement('div');overlay.id='dsh-fairy-ui-startup-preview';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.tabIndex=-1;
    overlay.style.cssText='position:fixed;inset:0;z-index:2147483500;background:#05090d;display:grid;place-items:center;color:#e5fffb;overflow:hidden;';
    let video=null,skin={dispose(){}};let closed=false;const prior=document.activeElement;
    const close=()=>{if(closed)return;closed=true;skin.dispose();if(video){video.pause();video.removeAttribute('src');video.load()}overlay.remove();if(active===close)active=null;if(prior?.isConnected)prior.focus()};active=close;
    const skip=document.createElement('button');skip.textContent='关闭预览';skip.style.cssText='position:absolute;right:24px;bottom:24px;padding:10px 18px;color:#e5fffb;background:#14252dde;border:1px solid #72ddf77a;border-radius:8px;cursor:pointer';skip.onclick=close;
    if(prefs.variant==='archive'){
      skin=mountStartupSkin(overlay,null,prefs,{assetBase:'/fairy-ui/',onComplete:()=>{status.textContent='启动流程完成 · 终幕已保持，可关闭预览'}});
    }else{
      video=document.createElement('video');video.style.cssText=startupVideoStyle(prefs);video.src='/fairy-ui/startup.mp4';video.muted=prefs.muted;video.playsInline=true;video.loop=false;video.playbackRate=prefs.speed;video.onended=close;video.onerror=close;overlay.append(video);
    }
    overlay.onkeydown=e=>{if(e.key==='Escape')close();if(e.key==='Tab'){
      const buttons=[...overlay.querySelectorAll('button')].filter(b=>!b.hidden&&!b.disabled);if(!buttons.length)return;
      const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }};
    const footer=document.createElement('footer'),text=document.createElement('div'),title=document.createElement('strong'),status=document.createElement('p');title.textContent='FAIRY · STARTUP PREVIEW';status.textContent=prefs.variant==='archive'?'纯动效启动界面 · 授予访问权限后继续':'启动动画预览 · 每次只播放一遍';text.append(title,status);footer.append(text,skip);if(prefs.variant==='classic'){footer.style.display='contents';text.hidden=true}else{skip.style.position='static';footer.style.cssText='display:flex;justify-content:space-between;gap:12px;align-items:center'}overlay.append(footer);document.body.append(overlay);skip.focus();video?.play().catch(close);
  };
  function StartupSettings(){
    const [value,setValue]=React.useState(read);
    const [notice,setNotice]=React.useState('旧版播放原 Fairy 视频一次；新版为深蓝黑白 HDD / Fairy 交互动效，不含视频。按提示授予访问权限、确认法厄同（0000）身份后继续原参考流程；结束保持终幕直到 DSH 就绪。这些操作只控制启动视觉，不更改真实权限或账号。比例可立即预览，正常退出 DSH 后用于下次启动；仅改变动画画面。');
    const update=(key,next)=>{const v=normalizeStartupPreferences({...value,[key]:next});setValue(v);try{localStorage.setItem(KEY,JSON.stringify(v))}catch{setNotice('本机偏好保存失败。')}};
    const h=React.createElement;
    return h('section',{style:{display:'grid',gap:16,padding:16}},h('h2',null,'Fairy 启动动画'),
      h('label',null,h('input',{type:'checkbox',checked:value.enabled,onChange:e=>update('enabled',e.target.checked)}),' 启用下次启动动画'),
      h('label',null,h('input',{type:'checkbox',checked:value.muted,onChange:e=>update('muted',e.target.checked)}),' 静音播放'),
      h('label',null,'播放速度 ',h('select',{value:value.speed,onChange:e=>update('speed',Number(e.target.value))},...[0.5,1,1.5,2].map(v=>h('option',{key:v,value:v},v+' 倍速')))),
      h('label',null,'动画样式 ',h('select',{value:value.variant,onChange:e=>update('variant',e.target.value)},h('option',{value:'classic'},'旧版（经典 Fairy 视频）'),h('option',{value:'archive'},'新版（HDD / Fairy · 无视频）'))),
      h('label',null,'画面比例 ',h('select',{value:value.aspectRatio,onChange:e=>update('aspectRatio',e.target.value)},...['auto','16:9','16:10','4:3','1:1'].map(v=>h('option',{key:v,value:v},v==='auto'?'跟随窗口（默认）':v)))),
      h('label',null,`画面缩放 ${value.scale}% `,h('input',{type:'range',min:50,max:150,step:1,value:value.scale,'aria-label':'启动动画缩放比例',onChange:e=>update('scale',Number(e.target.value))})),
      h('label',null,'画面适配 ',h('select',{value:value.fit,onChange:e=>update('fit',e.target.value)},h('option',{value:'cover'},'填满画面（可能裁剪）'),h('option',{value:'contain'},'完整显示（可能留黑边）'))),
      h('button',{type:'button',onClick:()=>{const v={...value,aspectRatio:'auto',scale:100,fit:'cover'};setValue(v);try{localStorage.setItem(KEY,JSON.stringify(v))}catch{setNotice('本机偏好保存失败。')}}},'恢复默认画面比例'),
      h('button',{type:'button',onClick:openPreview},'预览启动动画'),h('p',{role:'status'},notice));
  }
  ctx.slots.inject('settings.section',()=>ctx.slots.register({name:'settings.section',id:'fairy-ui-startup',order:46,label:()=> 'Fairy 启动动画'},StartupSettings));
  ctx.effect(()=>()=>active?.(),'fairy-ui preview cleanup');
}
return { name: 'dsh-fairy-ui', inject: ['slots', 'sessions', 'configForms', 'conversation'], apply(ctx) { visual.apply(ctx); voice.apply(ctx); createStartupSurface(require('react'), ctx);
ctx.inject(['modelDirectories', 'remote.session'], scope => fairyModelControl.apply(scope));
const markReady=()=>{if(document.querySelector('[data-composer-input],button[aria-label="设置"]')){document.documentElement.dataset.fairyUiReady='1';return true}return false};
if(!markReady()){const observer=new MutationObserver(()=>{if(markReady())observer.disconnect()});observer.observe(document.body,{childList:true,subtree:true});ctx.effect(()=>()=>observer.disconnect(),'native startup readiness');}
} };
}});
