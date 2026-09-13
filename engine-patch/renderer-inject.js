// Canonical cross-platform renderer. Run tools/sync-runtime-assets.mjs after editing.
((cssText, artDataUrl, themeConfig) => {
  const SELECTOR_CONTRACT = {"schema":"codex-dream-skin-selectors/1","selectors":[{"key":"shell-main","selector":"main:is(.main-surface, [data-app-shell-main-surface], [class*=\"_MainContentSurface_\"])","tier":"L1","scope":"all","required":true},{"key":"left-panel","selector":"aside.app-shell-left-panel","tier":"L1","scope":"all","required":true},{"key":"header-tint","selector":"header:is(.app-header-tint, [data-app-shell-header-edge-scroll], [class*=\"_Header_\"])","tier":"L1","scope":"all","required":true},{"key":"main-content-top-fade","selector":":is(.app-shell-main-content-top-fade, [data-app-shell-main-content-top-fade], [class*=\"_MainContentTopFade_\"])","tier":"L2","scope":"all","required":false},{"key":"home-icon","selector":"[data-testid=\"home-icon\"]","tier":"L1","scope":"home","required":true},{"key":"home-route","selector":"[role=\"main\"]:has([data-testid=\"home-icon\"])","tier":"L1","scope":"home","required":true},{"key":"home-route-css","selector":"[role=\"main\"]","tier":"L1","scope":"home","required":true},{"key":"home-banners","selector":".home-banners","tier":"L2","scope":"home","required":false},{"key":"composer-chrome","selector":":is(.composer-surface-chrome, [class*=\"_ComposerLayoutRoot_\"], [data-composer-surface-variant][data-composer-radius-variant])","tier":"L2","scope":"home+thread","required":false},{"key":"composer-toolbar","selector":":is(.composer-surface-chrome [class*=\"_footer_\"], [class*=\"_ComposerLayoutRoot_\"] [class*=\"_ComposerLayoutFooter_\"], [data-composer-surface-variant][data-composer-radius-variant] :is([data-composer-footer-responsive], [class*=\"_ComposerLayoutFooter_\"], [class*=\"_footer_\"]))","tier":"L2","scope":"home+thread","required":false},{"key":"home-utility","selector":":is([class*=\"_homeUtilityBar_\"], [class*=\"_ComposerHomeUtilityBar_\"])","tier":"L2","scope":"home","required":false},{"key":"game-source","selector":"[data-feature=\"game-source\"]","tier":"L2","scope":"home","required":false},{"key":"home-suggestions","selector":".group\\/home-suggestions","tier":"L2","scope":"home","required":false},{"key":"project-selector","selector":".group\\/project-selector","tier":"L2","scope":"home config","required":false},{"key":"markdown","selector":"[class*=\"_markdown\"]","tier":"L2","scope":"thread","required":false},{"key":"thread-surface","selector":".thread-scroll-container","tier":"L2","scope":"thread","required":false},{"key":"message","selector":":is([data-message-author-role], [data-local-conversation-user-anchor], [data-local-conversation-final-assistant])","tier":"L2","scope":"thread","required":false},{"key":"settings-panel","selector":"[data-settings-panel-slug=\"general-settings\"]","tier":"L2","scope":"settings","required":false},{"key":"appearance-radio","selector":"input[name=\"appearance-theme\"]","tier":"L2","scope":"settings","required":false},{"key":"overlay-menu","selector":"[role=\"menu\"]","tier":"L2","scope":"overlay","required":false},{"key":"overlay-dialog","selector":"[role=\"dialog\"]","tier":"L2","scope":"overlay","required":false},{"key":"overlay-popper","selector":"[data-radix-popper-content-wrapper]","tier":"L2","scope":"overlay","required":false}],"stableTestids":["app-shell-header-context-menu-surface","home-icon","theme-preview"]};
  const STATE_KEY = "__CODEX_DREAM_SKIN_STATE__";
  const DISABLED_KEY = "__CODEX_DREAM_SKIN_DISABLED__";
  const STYLE_REGISTRY_KEY = "__CODEX_DREAM_SKIN_STYLE_SHEETS__";
  const STYLE_ID = "codex-dream-skin-style";
  const SHELL_ATTR = "data-dream-shell";
  const THEME_ATTR = "data-dream-theme-id";
  const PART_ATTR = "data-ds-part";
  const COMPOSER_BORDER_BRIDGES = [
    "border-color", "border-top-color", "border-right-color", "border-bottom-color",
    "border-left-color", "border-width", "border-top-width", "border-right-width",
    "border-bottom-width", "border-left-width", "border-style", "border-top-style",
    "border-right-style", "border-bottom-style", "border-left-style",
  ].map((property) => ({
    property,
    variable: `--ds-community-composer-${property}`,
  })).filter(({ variable }) => cssText.includes(`${variable}:`));
  const ROOT_ATTRS = [
    "data-dream-skin", SHELL_ATTR, THEME_ATTR,
    "data-dream-art-wide", "data-dream-art-safe", "data-dream-task-mode",
    "data-dream-art-safe-area", "data-dream-art-task-mode", "data-dream-art-aspect",
    "data-dream-art-ready",
  ];
  const initialRoute = new URLSearchParams(String(location.search || ""))
    .get("initialRoute") || "";
  const pathname = String(location.pathname || "");
  const excludedPetSurface = location.protocol === "app:" && (
    pathname.endsWith("/avatar-overlay-composition-surface.html") ||
    initialRoute === "/avatar-overlay" || initialRoute.startsWith("/avatar-overlay/")
  );
  if (excludedPetSurface) {
    const previous = window[STATE_KEY];
    if (typeof previous?.cleanup === "function") previous.cleanup();
    window[DISABLED_KEY] = true;
    return;
  }
  const VERSION = __DREAM_SKIN_VERSION_JSON__;
  const STYLE_REVISION = __DREAM_SKIN_STYLE_REVISION_JSON__;
  const PAYLOAD_REVISION = __DREAM_SKIN_PAYLOAD_REVISION_JSON__;
  const THEME = themeConfig && typeof themeConfig === "object" ? themeConfig : {};
  const ART = THEME.art && typeof THEME.art === "object" ? THEME.art : {};
  const ART_METADATA = THEME.artMetadata && typeof THEME.artMetadata === "object"
    ? THEME.artMetadata : null;
  const ANALYSIS_CACHE_KEY = "__CODEX_DREAM_SKIN_ANALYSIS_CACHE__";
  const THEME_VARIABLES = [
    "--ds-bg", "--ds-panel", "--ds-panel-2", "--ds-green", "--ds-lime", "--ds-on-accent",
    "--ds-cyan", "--ds-purple", "--ds-text", "--ds-muted", "--ds-line",
    "--ds-bg-rgb", "--ds-panel-rgb", "--ds-panel-2-rgb", "--ds-accent-rgb",
    "--ds-accent-alt-rgb", "--ds-secondary-rgb", "--ds-highlight-rgb",
    "--ds-text-rgb", "--ds-muted-rgb", "--ds-line-rgb",
    "--dream-art-focus-x", "--dream-art-focus-y", "--dream-art-position",
    "--dream-skin-focus-x", "--dream-skin-focus-y", "--dream-skin-art-position",
    "--dream-skin-name", "--dream-skin-tagline", "--dream-skin-project-prefix",
    "--dream-skin-project-label", "--dream-skin-brand-subtitle", "--dream-skin-status",
    "--dream-skin-quote", "--dream-skin-art",
    "--ds-theme-color-background", "--ds-theme-color-panel",
    "--ds-theme-color-panel-alt", "--ds-theme-color-accent",
    "--ds-theme-color-accent-alt", "--ds-theme-color-secondary",
    "--ds-theme-color-highlight", "--ds-theme-color-text",
    "--ds-theme-color-muted", "--ds-theme-color-line",
    "--ds-theme-font-family", "--ds-theme-font-scale",
    "--ds-theme-surface-radius", "--ds-theme-surface-opacity",
    "--ds-theme-surface-blur", "--ds-theme-surface-border-alpha",
    "--ds-theme-surface-shadow", "--ds-theme-image-focus-x",
    "--ds-theme-image-focus-y", "--ds-theme-image-zoom",
    "--ds-theme-image-dim", "--ds-theme-image-task-intensity",
    "--ds-theme-density-scale", "--ds-theme-motion-level",
  ];
  const selectorByKey = new Map(SELECTOR_CONTRACT.selectors.map((entry) => [entry.key, entry]));
  const stableTestidSelector = (testid) => SELECTOR_CONTRACT.stableTestids?.includes(testid)
    ? `[data-testid="${testid}"]` : null;
  const installToken = {};
  const existingAnalysisCache = window[ANALYSIS_CACHE_KEY];
  const analysisCache = existingAnalysisCache && typeof existingAnalysisCache.get === "function" &&
    typeof existingAnalysisCache.set === "function" ? existingAnalysisCache : new Map();
  window[ANALYSIS_CACHE_KEY] = analysisCache;
  let artAnalysis = typeof THEME.artKey === "string" ? analysisCache.get(THEME.artKey) ?? null : null;
  let analysisTimer = null;
  let rootObserver = null;
  let partObserver = null;
  let bodyReadyHandler = null;
  let styleMode = null;
  let styleNode = null;
  let styleSheet = null;
  const now = () => typeof performance === "object" && typeof performance.now === "function"
    ? performance.now() : Date.now();
  const metrics = {
    ensureCalls: 0,
    rootPasses: 0,
    routePasses: 0,
    layoutReads: 0,
    attributeWrites: 0,
    styleWrites: 0,
    styleRepairs: 0,
    partPasses: 0,
    partWrites: 0,
    navigationEvents: 0,
    safetyPasses: 0,
    analysisRuns: 0,
    analysisCacheHits: artAnalysis ? 1 : 0,
    firstEnsureMs: null,
    analysisMs: null,
  };

  const previous = window[STATE_KEY];
  if (typeof previous?.cleanup === "function") previous.cleanup();
  window[DISABLED_KEY] = false;

  const existingStyleRegistry = window[STYLE_REGISTRY_KEY];
  const styleRegistry = existingStyleRegistry instanceof Set ? existingStyleRegistry : new Set();
  window[STYLE_REGISTRY_KEY] = styleRegistry;
  const artUrl = (() => {
    const comma = artDataUrl.indexOf(",");
    const mime = /^data:([^;,]+)/.exec(artDataUrl)?.[1] || "image/png";
    const binary = atob(artDataUrl.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return URL.createObjectURL(new Blob([bytes], { type: mime }));
  })();

  const cssString = (value) => JSON.stringify(String(value ?? ""));

  const setStyleProperty = (root, name, value) => {
    if (root.style.getPropertyValue(name) !== value) {
      root.style.setProperty(name, value);
      metrics.styleWrites += 1;
    }
  };

  const setAttribute = (root, name, value) => {
    const normalized = String(value);
    if (root.getAttribute(name) !== normalized) {
      root.setAttribute(name, normalized);
      metrics.attributeWrites += 1;
    }
  };

  const parseRgb = (value) => {
    if (!value || value === "transparent") return null;
    const hex = String(value).trim().match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
    if (hex) {
      const digits = hex[1];
      const rgbHex = digits.length <= 4
        ? digits.slice(0, 3).split("").map((digit) => `${digit}${digit}`).join("")
        : digits.slice(0, 6);
      const alphaHex = digits.length === 4
        ? `${digits[3]}${digits[3]}`
        : digits.length === 8 ? digits.slice(6, 8) : "ff";
      const number = Number.parseInt(rgbHex, 16);
      return {
        r: number >> 16,
        g: (number >> 8) & 255,
        b: number & 255,
        alpha: Number.parseInt(alphaHex, 16) / 255,
      };
    }
    const m = String(value).trim().match(
      /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i,
    );
    if (!m) return null;
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      alpha: m[4] === undefined ? 1 : Math.min(1, Math.max(0, Number(m[4]))),
    };
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const rgbString = (value) => {
    const rgb = parseRgb(value);
    return rgb ? [rgb.r, rgb.g, rgb.b]
      .map((channel) => Math.round(clamp(channel, 0, 255)))
      .join(" ") : null;
  };

  const rgbToHex = ({ r, g, b }) => `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;

  const relativeLuminance = ({ r, g, b }) => {
    const channels = [r, g, b].map((value) => {
      const normalized = clamp(value, 0, 255) / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };

  const compositeColor = (value, background, alphaOverride = null) => {
    const foreground = parseRgb(value);
    if (!foreground) return background;
    const alpha = clamp(alphaOverride ?? foreground.alpha ?? 1, 0, 1);
    return {
      r: clamp(foreground.r, 0, 255) * alpha + background.r * (1 - alpha),
      g: clamp(foreground.g, 0, 255) * alpha + background.g * (1 - alpha),
      b: clamp(foreground.b, 0, 255) * alpha + background.b * (1 - alpha),
    };
  };

  const readableAccentInk = (accent, panel) => {
    // The send button sits on the composer surface, which renders panel RGB
    // at 94% regardless of the panel color's declared alpha. Compare against
    // both possible backdrop extremes so artwork cannot flip the decision.
    const luminances = [0, 255].map((backdrop) => {
      const surface = compositeColor(
        panel,
        { r: backdrop, g: backdrop, b: backdrop },
        0.94,
      );
      return relativeLuminance(compositeColor(accent, surface));
    });
    const whiteContrast = Math.min(...luminances.map((value) => 1.05 / (value + 0.05)));
    const blackContrast = Math.min(...luminances.map((value) => (value + 0.05) / 0.05));
    return whiteContrast >= blackContrast ? "rgb(255 255 255)" : "rgb(0 0 0)";
  };

  const rgbToHsl = ({ r, g, b }) => {
    const values = [r, g, b].map((value) => value / 255);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const lightness = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l: lightness };
    const delta = max - min;
    const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    let hue;
    if (max === values[0]) hue = (values[1] - values[2]) / delta + (values[1] < values[2] ? 6 : 0);
    else if (max === values[1]) hue = (values[2] - values[0]) / delta + 2;
    else hue = (values[0] - values[1]) / delta + 4;
    return { h: hue * 60, s: saturation, l: lightness };
  };

  const hslToRgb = ({ h, s, l }) => {
    const hue = ((h % 360) + 360) % 360 / 360;
    if (s === 0) {
      const neutral = Math.round(l * 255);
      return { r: neutral, g: neutral, b: neutral };
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const channel = (offset) => {
      let t = hue + offset;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    return { r: channel(1 / 3) * 255, g: channel(0) * 255, b: channel(-1 / 3) * 255 };
  };

  const detectShellAppearance = () => {
    const root = document.documentElement;
    if (root?.classList?.contains("electron-dark")) return "dark";
    if (root?.classList?.contains("electron-light")) return "light";
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; } catch {}
    return "light";
  };

  const makeAdaptivePalette = (sample, shell) => {
    const source = sample || { r: 108, g: 126, b: 136 };
    const hsl = rgbToHsl(source);
    const hue = hsl.s < 0.12 ? 214 : hsl.h;
    const saturation = clamp(hsl.s, 0.38, 0.72);
    const accent = hslToRgb({ h: hue, s: saturation, l: shell === "light" ? 0.42 : 0.66 });
    const accentAlt = hslToRgb({ h: hue + 12, s: saturation * 0.82, l: shell === "light" ? 0.52 : 0.73 });
    const secondary = hslToRgb({ h: hue - 24, s: saturation * 0.64, l: shell === "light" ? 0.56 : 0.62 });
    const highlight = hslToRgb({ h: hue + 24, s: saturation * 0.76, l: shell === "light" ? 0.36 : 0.58 });
    const neutral = (lightness, chroma = 0.08) => rgbToHex(hslToRgb({ h: hue, s: chroma, l: lightness }));
    return shell === "light" ? {
      background: neutral(0.965, 0.07),
      panel: neutral(0.987, 0.035),
      panelAlt: neutral(0.945, 0.09),
      accent: rgbToHex(accent),
      accentAlt: rgbToHex(accentAlt),
      secondary: rgbToHex(secondary),
      highlight: rgbToHex(highlight),
      text: neutral(0.13, 0.10),
      muted: neutral(0.42, 0.08),
      line: `rgba(${Math.round(accent.r)}, ${Math.round(accent.g)}, ${Math.round(accent.b)}, .24)`,
    } : {
      background: neutral(0.055, 0.045),
      panel: neutral(0.085, 0.04),
      panelAlt: neutral(0.125, 0.05),
      accent: rgbToHex(accent),
      accentAlt: rgbToHex(accentAlt),
      secondary: rgbToHex(secondary),
      highlight: rgbToHex(highlight),
      text: neutral(0.93, 0.025),
      muted: neutral(0.69, 0.03),
      line: `rgba(${Math.round(accent.r)}, ${Math.round(accent.g)}, ${Math.round(accent.b)}, .28)`,
    };
  };

  const resolvedShell = () => {
    if (THEME.appearance === "light" || THEME.appearance === "dark") return THEME.appearance;
    // Image luminance may tune accents and scrims, but auto appearance follows
    // Codex/ChatGPT (or the OS fallback) so a bright wallpaper cannot flip a
    // native dark session back to a light shell after analysis.
    return detectShellAppearance();
  };

  const applyTheme = (root, shell) => {
    const declaredColors = THEME.colors && typeof THEME.colors === "object" ? THEME.colors : {};
    const legacyPalette = THEME.palette && typeof THEME.palette === "object" ? THEME.palette : {};
    // macOS themes use the full `colors` contract; older Windows themes used
    // `palette.accent`. Accept both while keeping one renderer source.
    const colors = Object.keys(declaredColors).length ? declaredColors : legacyPalette;
    const hasExplicitKeyList = Array.isArray(THEME.explicitColorKeys);
    const explicit = new Set(hasExplicitKeyList ? THEME.explicitColorKeys : []);
    if (!hasExplicitKeyList && (THEME.colorMode === "explicit" || !Object.hasOwn(THEME, "colorMode"))) {
      for (const key of Object.keys(declaredColors)) explicit.add(key);
    }
    if (typeof legacyPalette.accent === "string") explicit.add("accent");
    const adaptive = makeAdaptivePalette(artAnalysis?.accentRgb, shell);
    const legacyLight = (THEME.appearance === undefined || THEME.appearance === "auto")
      && THEME.colorMode !== "explicit" && shell === "light";
    const structural = new Set(["background", "panel", "panelAlt", "text", "muted"]);
    const pick = (name) => {
      const allowExplicit = explicit.has(name) && !(legacyLight && structural.has(name));
      return allowExplicit && typeof colors[name] === "string" ? colors[name] : adaptive[name];
    };
    const accent = pick("accent");
    const accentAlt = explicit.has("accentAlt") ? pick("accentAlt") : (explicit.has("accent") ? accent : adaptive.accentAlt);
    const variables = {
      "--ds-bg": pick("background"),
      "--ds-panel": pick("panel"),
      "--ds-panel-2": pick("panelAlt"),
      "--ds-green": accent,
      "--ds-lime": accentAlt,
      "--ds-cyan": pick("secondary"),
      "--ds-purple": pick("highlight"),
      "--ds-text": pick("text"),
      "--ds-muted": pick("muted"),
      "--ds-line": explicit.has("line") && typeof colors.line === "string" ? colors.line : adaptive.line,
    };

    for (const [name, value] of Object.entries(variables)) {
      if (typeof value === "string" && value) setStyleProperty(root, name, value);
    }
    if (explicit.has("accent")) {
      const accentInk = readableAccentInk(
        accent,
        variables["--ds-panel"],
      );
      if (accentInk) setStyleProperty(root, "--ds-on-accent", accentInk);
    }
    const publicColors = {
      "--ds-theme-color-background": variables["--ds-bg"],
      "--ds-theme-color-panel": variables["--ds-panel"],
      "--ds-theme-color-panel-alt": variables["--ds-panel-2"],
      "--ds-theme-color-accent": variables["--ds-green"],
      "--ds-theme-color-accent-alt": variables["--ds-lime"],
      "--ds-theme-color-secondary": variables["--ds-cyan"],
      "--ds-theme-color-highlight": variables["--ds-purple"],
      "--ds-theme-color-text": variables["--ds-text"],
      "--ds-theme-color-muted": variables["--ds-muted"],
      "--ds-theme-color-line": variables["--ds-line"],
    };
    for (const [name, value] of Object.entries(publicColors)) {
      if (typeof value === "string" && value) setStyleProperty(root, name, value);
    }
    setStyleProperty(root, "--ds-theme-surface-radius", "12px");
    setStyleProperty(root, "--ds-theme-surface-opacity", "1");
    setStyleProperty(root, "--ds-theme-surface-blur", "0px");
    setStyleProperty(root, "--ds-theme-font-family", "system");
    setStyleProperty(root, "--ds-theme-font-scale", "1");
    setStyleProperty(root, "--ds-theme-surface-border-alpha", "0.14");
    setStyleProperty(root, "--ds-theme-surface-shadow", "soft");
    setStyleProperty(root, "--ds-theme-image-zoom", "1");
    setStyleProperty(root, "--ds-theme-image-dim", "0");
    setStyleProperty(root, "--ds-theme-image-task-intensity", "0.35");
    setStyleProperty(root, "--ds-theme-density-scale", "standard");
    setStyleProperty(root, "--ds-theme-motion-level", "standard");
    const rgbVariables = {
      "--ds-bg-rgb": variables["--ds-bg"],
      "--ds-panel-rgb": variables["--ds-panel"],
      "--ds-panel-2-rgb": variables["--ds-panel-2"],
      "--ds-accent-rgb": variables["--ds-green"],
      "--ds-accent-alt-rgb": variables["--ds-lime"],
      "--ds-secondary-rgb": variables["--ds-cyan"],
      "--ds-highlight-rgb": variables["--ds-purple"],
      "--ds-text-rgb": variables["--ds-text"],
      "--ds-muted-rgb": variables["--ds-muted"],
      "--ds-line-rgb": variables["--ds-line"],
    };
    for (const [name, value] of Object.entries(rgbVariables)) {
      const rgb = rgbString(value);
      if (rgb) setStyleProperty(root, name, rgb);
    }
    setStyleProperty(root, "--dream-skin-name", cssString(THEME.name || "Codex Dream Skin"));
    setStyleProperty(root, "--dream-skin-tagline", cssString(THEME.tagline || "Make something wonderful."));
    setStyleProperty(root, "--dream-skin-quote", cssString(THEME.quote || "MAKE SOMETHING WONDERFUL"));
    setStyleProperty(root, "--dream-skin-brand-subtitle", cssString(
      THEME.brandSubtitle || "CODEX DREAM SKIN",
    ));
    setStyleProperty(root, "--dream-skin-status", cssString(THEME.statusText || "DREAM SKIN ONLINE"));
    setStyleProperty(root, "--dream-skin-project-prefix", cssString(THEME.projectPrefix || "选择项目 · "));
    setStyleProperty(root, "--dream-skin-project-label", cssString(THEME.projectLabel || "◉  选择项目"));
  };

  const applyArtMetadata = (root) => {
    const profile = artAnalysis || ART_METADATA;
    const inferredSafe = profile?.safeArea || "center";
    const safeArea = ART.safeArea && ART.safeArea !== "auto" ? ART.safeArea : inferredSafe;
    const canonicalSafe = ["left", "right", "center", "none"].includes(safeArea)
      ? safeArea : "center";
    const focusX = typeof ART.focusX === "number" ? ART.focusX
      : profile?.focusX ?? (safeArea === "left" ? 0.72 : safeArea === "right" ? 0.28 : 0.5);
    const focusY = typeof ART.focusY === "number" ? ART.focusY : profile?.focusY ?? 0.5;
    const taskMode = ART.taskMode && ART.taskMode !== "auto"
      ? ART.taskMode : profile?.taskMode || "ambient";
    const wide = profile?.wide || profile?.aspect === "wide" || profile?.aspect === "ultrawide";
    const aspect = profile?.aspect || "unknown";
    const focusXValue = `${(clamp(focusX, 0, 1) * 100).toFixed(2)}%`;
    const focusYValue = `${(clamp(focusY, 0, 1) * 100).toFixed(2)}%`;

    setAttribute(root, "data-dream-art-wide", wide ? "true" : "false");
    setAttribute(root, "data-dream-art-safe", canonicalSafe);
    setAttribute(root, "data-dream-task-mode", taskMode);
    setAttribute(root, "data-dream-art-safe-area", safeArea);
    setAttribute(root, "data-dream-art-task-mode", taskMode);
    setAttribute(root, "data-dream-art-aspect", aspect);
    setAttribute(root, "data-dream-art-ready", artAnalysis ? "true" : "false");
    setStyleProperty(root, "--dream-art-focus-x", focusXValue);
    setStyleProperty(root, "--dream-art-focus-y", focusYValue);
    setStyleProperty(root, "--dream-art-position", `${focusXValue} ${focusYValue}`);
    setStyleProperty(root, "--dream-skin-focus-x", focusXValue);
    setStyleProperty(root, "--dream-skin-focus-y", focusYValue);
    setStyleProperty(root, "--dream-skin-art-position", `${focusXValue} ${focusYValue}`);
    setStyleProperty(root, "--ds-theme-image-focus-x", String(Number(focusX.toFixed(4))));
    setStyleProperty(root, "--ds-theme-image-focus-y", String(Number(focusY.toFixed(4))));
  };

  const analyzeArt = () => new Promise((resolve) => {
    const startedAt = now();
    metrics.analysisRuns += 1;
    if (typeof window.Image !== "function" || !document?.createElement) {
      metrics.analysisMs = Number((now() - startedAt).toFixed(3));
      resolve(null);
      return;
    }
    const image = new window.Image();
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      if (analysisTimer) clearTimeout(analysisTimer);
      analysisTimer = null;
      metrics.analysisMs = Number((now() - startedAt).toFixed(3));
      resolve(value);
    };
    analysisTimer = setTimeout(() => finish(null), 6000);
    image.onerror = () => finish(null);
    image.onload = () => {
      try {
        const ratio = image.naturalWidth / image.naturalHeight;
        if (!Number.isFinite(ratio) || ratio <= 0) throw new Error("Invalid image dimensions");
        const maxDimension = 96;
        const width = Math.max(16, Math.round(ratio >= 1 ? maxDimension : maxDimension * ratio));
        const height = Math.max(16, Math.round(ratio >= 1 ? maxDimension / ratio : maxDimension));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext?.("2d", { willReadFrequently: true });
        if (!context) throw new Error("Canvas is unavailable");
        context.drawImage(image, 0, 0, width, height);
        const data = context.getImageData(0, 0, width, height).data;
        const samples = new Array(width * height);
        const bins = Array.from({ length: 24 }, () => ({ weight: 0, r: 0, g: 0, b: 0 }));
        let lightTotal = 0;
        let count = 0;

        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const offset = (y * width + x) * 4;
            if (data[offset + 3] < 32) continue;
            const rgb = { r: data[offset], g: data[offset + 1], b: data[offset + 2] };
            const light = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
            const hsl = rgbToHsl(rgb);
            samples[y * width + x] = { light, saturation: hsl.s };
            lightTotal += light;
            count += 1;
            if (hsl.s >= 0.16 && hsl.l >= 0.16 && hsl.l <= 0.86) {
              const bin = bins[Math.min(23, Math.floor(hsl.h / 15))];
              const weight = hsl.s * (1 - Math.abs(hsl.l - 0.52) * 0.85);
              bin.weight += weight;
              bin.r += rgb.r * weight;
              bin.g += rgb.g * weight;
              bin.b += rgb.b * weight;
            }
          }
        }
        if (!count) throw new Error("Image has no visible pixels");
        const brightness = lightTotal / count;
        const information = (start, end) => {
          let total = 0;
          let totalSquared = 0;
          let edges = 0;
          let edgeCount = 0;
          let pixels = 0;
          for (let y = 0; y < height; y += 1) {
            for (let x = start; x < end; x += 1) {
              const sample = samples[y * width + x];
              if (!sample) continue;
              total += sample.light;
              totalSquared += sample.light * sample.light;
              pixels += 1;
              const previous = x > start ? samples[y * width + x - 1] : null;
              const above = y > 0 ? samples[(y - 1) * width + x] : null;
              if (previous) { edges += Math.abs(sample.light - previous.light); edgeCount += 1; }
              if (above) { edges += Math.abs(sample.light - above.light); edgeCount += 1; }
            }
          }
          const mean = pixels ? total / pixels : 0;
          const variance = pixels ? Math.max(0, totalSquared / pixels - mean * mean) : 1;
          return Math.sqrt(variance) * 0.58 + (edgeCount ? edges / edgeCount : 1) * 0.42;
        };
        const zoneWidth = Math.max(1, Math.floor(width * 0.38));
        const leftInformation = information(0, zoneWidth);
        const rightInformation = information(width - zoneWidth, width);
        let safeArea = "center";
        if (leftInformation < rightInformation * 0.86) safeArea = "left";
        else if (rightInformation < leftInformation * 0.86) safeArea = "right";

        let saliencyTotal = 0;
        let saliencyX = 0;
        let saliencyY = 0;
        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const sample = samples[y * width + x];
            if (!sample) continue;
            const previous = x > 0 ? samples[y * width + x - 1] : null;
            const above = y > 0 ? samples[(y - 1) * width + x] : null;
            const edge = (previous ? Math.abs(sample.light - previous.light) : 0) +
              (above ? Math.abs(sample.light - above.light) : 0);
            const weight = 0.01 + Math.abs(sample.light - brightness) * 0.48 +
              sample.saturation * 0.34 + edge * 0.28;
            saliencyTotal += weight;
            saliencyX += (x + 0.5) / width * weight;
            saliencyY += (y + 0.5) / height * weight;
          }
        }
        let focusX = saliencyTotal ? saliencyX / saliencyTotal : 0.5;
        let focusY = saliencyTotal ? saliencyY / saliencyTotal : 0.5;
        if (safeArea === "left") focusX = Math.max(0.64, focusX);
        if (safeArea === "right") focusX = Math.min(0.36, focusX);
        focusX = clamp(focusX, 0.12, 0.88);
        focusY = clamp(focusY, 0.18, 0.82);

        const accentBin = bins.reduce((best, candidate) => candidate.weight > best.weight ? candidate : best, bins[0]);
        const accentRgb = accentBin.weight > 0 ? {
          r: accentBin.r / accentBin.weight,
          g: accentBin.g / accentBin.weight,
          b: accentBin.b / accentBin.weight,
        } : null;
        const aspect = ratio >= 2.25 ? "ultrawide" : ratio >= 1.45 ? "wide"
          : ratio >= 1.08 ? "landscape" : ratio >= 0.9 ? "square" : "portrait";
        finish({
          width: image.naturalWidth,
          height: image.naturalHeight,
          ratio,
          wide: ratio >= 1.75,
          aspect,
          brightness,
          shell: brightness >= 0.58 ? "light" : "dark",
          safeArea,
          focusX,
          focusY,
          taskMode: ratio >= 2.25 ? "banner" : "ambient",
          accentRgb,
        });
      } catch {
        finish(null);
      }
    };
    image.src = artUrl;
  });

  const installStyle = () => {
    try {
      if (!("adoptedStyleSheets" in document) || typeof CSSStyleSheet !== "function") {
        throw new Error("Constructable stylesheets are unavailable");
      }
      const sheet = new CSSStyleSheet();
      if (typeof sheet.replaceSync !== "function") throw new Error("replaceSync is unavailable");
      sheet.replaceSync(cssText);
      const retained = [...document.adoptedStyleSheets]
        .filter((candidate) => !styleRegistry.has(candidate));
      document.adoptedStyleSheets = [...retained, sheet];
      styleRegistry.clear();
      styleRegistry.add(sheet);
      document.getElementById(STYLE_ID)?.remove();
      styleSheet = sheet;
      styleMode = "adopted";
      return;
    } catch {
      styleSheet = null;
    }

    styleNode = document.getElementById(STYLE_ID) || document.createElement("style");
    styleNode.id = STYLE_ID;
    styleNode.textContent = cssText;
    if (!styleNode.parentElement) (document.head || document.documentElement).appendChild(styleNode);
    styleMode = "style";
  };

  const ensureStyle = () => {
    if (styleMode === "adopted" && styleSheet) {
      const current = [...document.adoptedStyleSheets];
      if (!current.includes(styleSheet)) {
        document.adoptedStyleSheets = [...current, styleSheet];
        metrics.styleRepairs += 1;
      }
      return;
    }
    if (styleNode && document.getElementById(STYLE_ID) !== styleNode) {
      document.getElementById(STYLE_ID)?.remove();
      (document.head || document.documentElement).appendChild(styleNode);
      metrics.styleRepairs += 1;
    }
  };

  installStyle();

  const applyRootState = (root) => {
    metrics.rootPasses += 1;
    ensureStyle();
    const shell = resolvedShell();
    setAttribute(root, "data-dream-skin", "active");
    setAttribute(root, SHELL_ATTR, shell);
    setAttribute(root, THEME_ATTR, THEME.id || "custom");
    setStyleProperty(root, "--dream-skin-art", `url("${artUrl}")`);
    applyTheme(root, shell);
    applyArtMetadata(root);
    return shell;
  };

  const selectorHit = (key) => {
    const selector = selectorByKey.get(key)?.selector;
    if (!selector) return false;
    try { return Boolean(document.querySelector(selector)); } catch { return false; }
  };

  const stableTestidHit = (testid) => {
    const selector = stableTestidSelector(testid);
    if (!selector) return false;
    try { return Boolean(document.querySelector(selector)); } catch { return false; }
  };

  const partNodes = new Set();
  const composerBorderRestores = new Map();
  const queryAll = (selector) => {
    if (!selector) return [];
    try { return [...document.querySelectorAll(selector)]; } catch { return []; }
  };
  const selectorNodes = (key) => queryAll(selectorByKey.get(key)?.selector);
  const genericNodes = (selector) => queryAll(selector)
    .filter((node) => node && typeof node.setAttribute === "function");
  const genericInputNodes = () => genericNodes(
    'textarea, [contenteditable="true"], [role="textbox"]',
  ).filter((node) => !node.closest?.('[role="dialog"], [aria-modal="true"]'));
  const resolvedMainNode = () => {
    const exact = selectorNodes("shell-main")[0];
    if (exact) return exact;
    for (const input of genericInputNodes()) {
      const main = input.closest?.('main, [role="main"]');
      if (main && typeof main.setAttribute === "function") return main;
    }
    return genericNodes('main, [role="main"]')
      .find((node) => !node.closest?.('[role="dialog"], [aria-modal="true"]')) ?? null;
  };
  const fallbackMainNodes = () => selectorNodes("shell-main").length
    ? [] : [resolvedMainNode()].filter(Boolean);
  const fallbackSidebarNodes = () => {
    if (selectorNodes("left-panel").length) return [];
    const main = resolvedMainNode();
    const mainParent = main?.parentElement;
    if (!main || !mainParent) return [];
    const candidate = genericNodes('aside, nav[aria-label]')
      .filter((node) => !main.contains?.(node))
      .filter((node) => !node.closest?.('[role="dialog"], [aria-modal="true"]'))
      .find((node) => node.parentElement === mainParent
        || node.parentElement?.parentElement === mainParent
        || node.parentElement === mainParent.parentElement);
    return candidate ? [candidate] : [];
  };
  const fallbackComposerNodes = () => selectorNodes("composer-chrome").length
    ? [] : (() => {
      const main = resolvedMainNode();
      for (const input of genericInputNodes()) {
        if (main && !main.contains?.(input)) continue;
        const layoutRoot = input.closest?.('[class*="_ComposerLayoutRoot_"]');
        if (layoutRoot && (!main || main.contains?.(layoutRoot))) return [layoutRoot];
        const semanticOwner = input.closest?.(
          '.composer-surface-chrome, [data-composer-surface-variant][data-composer-radius-variant], ' +
          '[class*="_ComposerLayoutRoot_"]',
        );
        if (semanticOwner && (!main || main.contains?.(semanticOwner))) return [semanticOwner];
        const ownerSelector =
          '[data-testid*="composer" i], [data-testid*="prompt" i], ' +
          '[class*="composer" i], [class*="prompt" i]';
        const nearest = input.closest?.(ownerSelector);
        if (!nearest || (main && !main.contains?.(nearest))) continue;
        let owner = nearest;
        for (let parent = nearest.parentElement; parent && parent !== main;
          parent = parent.parentElement) {
          if (parent.matches?.(ownerSelector)) owner = parent;
        }
        return [owner];
      }
      return [];
    })();
  const fallbackComposerToolbarNodes = (composerNodes) => {
    if (selectorNodes("composer-toolbar").length || !composerNodes.length) return [];
    return genericNodes(
      '[data-composer-footer-responsive], [class*="_ComposerLayoutFooter_"], [class*="_footer_"]',
    ).filter((node) => composerNodes.some((composer) =>
      composer !== node && composer.contains?.(node)));
  };
  const addPart = (desired, part, nodes) => {
    for (const node of nodes) {
      if (node && typeof node.setAttribute === "function" && !desired.has(node)) {
        desired.set(node, part);
      }
    }
  };
  const restoreComposerBorders = (node) => {
    const saved = composerBorderRestores.get(node);
    if (!saved) return;
    for (const [property, { value, priority }] of saved) {
      if (value) node.style.setProperty(property, value, priority);
      else node.style.removeProperty(property);
      metrics.styleWrites += 1;
    }
    composerBorderRestores.delete(node);
  };
  const refreshComposerBorders = (composerNodes) => {
    const desired = new Set(COMPOSER_BORDER_BRIDGES.length ? composerNodes : []);
    for (const node of composerBorderRestores.keys()) {
      if (!desired.has(node)) restoreComposerBorders(node);
    }
    for (const node of desired) {
      if (!node?.style || composerBorderRestores.has(node)) continue;
      const saved = new Map();
      for (const { property, variable } of COMPOSER_BORDER_BRIDGES) {
        saved.set(property, {
          value: node.style.getPropertyValue(property),
          priority: node.style.getPropertyPriority(property),
        });
        node.style.setProperty(property, `var(${variable})`, "important");
        metrics.styleWrites += 1;
      }
      composerBorderRestores.set(node, saved);
    }
  };
  const resolvedMessageNodes = () => selectorNodes("message").map((node) => {
    if (!node?.hasAttribute?.("data-local-conversation-user-anchor")) return node;
    // Current Codex user anchors span the conversation column. Prefer the
    // adaptive native bubble, while retaining the older anchor as a fallback.
    return node.querySelector?.(
      '[class*="max-w-"][class*="rounded-2xl"][class*="text-start"]',
    ) ?? node;
  });
  const resolvedAssistantReadingProseNodes = () => genericNodes(
    '[data-markdown-text-style="assistant-message"]',
  ).filter((node) =>
    node.closest?.('[data-local-conversation-final-assistant="true"]')
    || node.closest?.('[data-content-search-unit-key$=":assistant"]'));
  const resolvedThreadSummaryPanelNodes = () => {
    const surfaces = genericNodes(
      '[data-slot="thread-summary-panel-item-group"], ' +
      '[data-slot="thread-summary-panel-icon-button"]',
    ).map((node) => node.closest?.(
      'div[class~="bg-surface-elevated-secondary"][class~="rounded-3xl"]',
    )).filter(Boolean);
    return [...new Set(surfaces)];
  };
  const resolvedWritingBlockAddToConversationNodes = () => genericNodes(
    '[data-oai-writing-block-surface] button',
  ).filter((node) => {
    const labels = [
      node.getAttribute?.('aria-label'),
      node.getAttribute?.('title'),
      node.innerText,
      node.textContent,
    ].filter(Boolean).map((label) => label.replace(/\s+/g, ' ').trim());
    return labels.some((label) =>
      /^(?:添加到对话|添加至对话|Add to (?:chat|conversation))$/i.test(label));
  });
  const resolvedConversationNavigationPreviewNodes = () => genericNodes(
    '[data-thread-user-message-navigation-tooltip-preview="true"]',
  );
  const resolvedSidebarThreadDetailNodes = () => genericNodes(
    '[role="tooltip"][data-side="right"]',
  ).filter((node) =>
    node.querySelector?.('[class*="line-clamp"]')
    && node.querySelector?.('[class*="text-codex-description"]')
    && !node.querySelector?.('[class~="group/project-hover-card-row"]'));
  const resolvedSidebarProjectDetailNodes = () => genericNodes(
    '[role="tooltip"][data-side="right"]',
  ).filter((node) =>
    node.querySelector?.('[class~="group/project-hover-card-row"]'));
  const resolvedSidebarUsageNoticeNodes = () => {
    const sidebar = selectorNodes("left-panel")[0] ?? fallbackSidebarNodes()[0];
    if (!sidebar) return [];
    const candidates = [...sidebar.querySelectorAll("div, section, aside")].filter((node) => {
      if (node === sidebar) return false;
      if (node.closest?.('[role="tooltip"], [role="menu"], [role="dialog"]')) return false;
      const rect = node.getBoundingClientRect?.();
      if (!rect || rect.width < 210 || rect.width > 520
        || rect.height < 100 || rect.height > 360) return false;
      const text = node.innerText || "";
      if (!/(?:^|\s)\d{1,3}\s*%/.test(text)) return false;
      if ((node.querySelectorAll?.("button, a").length ?? 0) < 2) return false;
      if (node.querySelector?.('[role="progressbar"], progress, [aria-valuenow]')) return true;
      return [...(node.querySelectorAll?.("div, span") ?? [])].some((child) => {
        const childRect = child.getBoundingClientRect?.();
        if (!childRect || childRect.width < 100
          || childRect.height < 3 || childRect.height > 14) return false;
        const style = getComputedStyle(child);
        return Number.parseFloat(style.borderRadius) >= 2
          && style.backgroundColor !== "rgba(0, 0, 0, 0)";
      });
    });
    candidates.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      return (ar.width * ar.height) - (br.width * br.height);
    });
    return candidates.length ? [candidates[0]] : [];
  };
  const resolvedAccountMenuNodes = () => genericNodes(
    '[role="menu"][data-side="top"][data-align="start"][data-radix-menu-content]',
  ).filter((node) =>
    node.querySelector?.('img[class~="rounded-full"]')
    && (node.querySelectorAll?.('[role="menuitem"]').length ?? 0) >= 4);
  const normalizedNodeText = (node) => String(
    node?.innerText || node?.textContent || "",
  ).replace(/\s+/g, " ").trim();
  const smallestVisibleSurface = (nodes, predicate) => nodes
    .filter((node) => {
      const rect = node.getBoundingClientRect?.();
      return rect && rect.width > 0 && rect.height > 0 && predicate(node);
    })
    .sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      return (ar.width * ar.height) - (br.width * br.height);
    })[0] ?? null;
  const semanticOverlaySurfaces = () => genericNodes(
    '[role="menu"], [role="dialog"], [role="listbox"], [data-slot="popover-content"]',
  );
  const resolvedModeSwitchMenuNodes = () => {
    const node = smallestVisibleSurface(semanticOverlaySurfaces(), (candidate) => {
      const text = normalizedNodeText(candidate);
      return /(?:^|\s)ChatGPT(?:\s|$)/i.test(text)
        && /(?:^|\s)Codex(?:\s|$)/i.test(text)
        && /(?:创建|学习|探索|构建|调试|发布|create|learn|explore|build|debug|ship)/i.test(text);
    });
    return node ? [node] : [];
  };
  const resolvedPermissionMenuNodes = () => {
    const node = smallestVisibleSurface(semanticOverlaySurfaces(), (candidate) => {
      const text = normalizedNodeText(candidate);
      return /(?:请求批准|帮我批准|完全访问权限|更改权限|request approval|full access|permissions?)/i.test(text)
        && /(?:批准|权限|approval|access)/i.test(text);
    });
    return node ? [node] : [];
  };
  const resolvedTextAnchoredSurface = ({ anchorPattern, contentPatterns }) => {
    const matches = [];
    const anchors = genericNodes(
      'button, [role="menuitem"], [role="option"], [data-slot="menu-item"]',
    ).filter((node) => anchorPattern.test(normalizedNodeText(node)));
    for (const anchor of anchors) {
      for (let parent = anchor.parentElement; parent && parent !== document.body;
        parent = parent.parentElement) {
        const rect = parent.getBoundingClientRect?.();
        if (!rect || rect.width < 360 || rect.height < 180) continue;
        const text = normalizedNodeText(parent);
        const markerCount = contentPatterns.reduce(
          (count, pattern) => count + Number(pattern.test(text)), 0,
        );
        if (markerCount >= 3) {
          let surface = parent;
          for (let step = 0; step < 4 && surface && surface !== document.body; step += 1) {
            const style = getComputedStyle(surface);
            const backgroundIsPainted = style.backgroundColor !== "rgba(0, 0, 0, 0)"
              || style.backgroundImage !== "none";
            if (backgroundIsPainted && Number.parseFloat(style.borderRadius) >= 12) break;
            surface = surface.parentElement;
          }
          matches.push(surface && surface !== document.body ? surface : parent);
          break;
        }
      }
    }
    return [...new Set(matches)].sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      return (ar.width * ar.height) - (br.width * br.height);
    });
  };
  const resolvedComposerAddMenuNodes = () => {
    // The add panel is built from a rounded suggestion-menu chrome around an
    // inner listbox. Resolve from its stable first action before considering
    // semantic overlay roles so the public part lands on the painted chrome,
    // rather than on a transparent list child.
    const anchored = resolvedTextAnchoredSurface({
      anchorPattern: /^(?:文件和文件夹|Files? and folders?)$/i,
      contentPatterns: [
        /(?:目标|Goal)/i,
        /(?:计划模式|Plan mode)/i,
        /(?:录制技能|Record skill)/i,
        /(?:绘图|Draw)/i,
        /(?:插件|Plugins?)/i,
      ],
    });
    if (anchored.length) return anchored.slice(0, 1);
    const semantic = smallestVisibleSurface(semanticOverlaySurfaces(), (candidate) => {
      const text = normalizedNodeText(candidate);
      return /(?:文件和文件夹|计划模式|录制技能|绘图|插件|files? and folders?|plan mode|skills?|plugins?)/i.test(text)
        && /(?:添加|文件|插件|add|file|plugin)/i.test(text);
    });
    if (semantic) return [semantic];
    return [];
  };
  const resolvedIntelligenceMenuNodes = () => {
    const node = smallestVisibleSurface(semanticOverlaySurfaces(), (candidate) => {
      // Current Codex builds keep the compact reasoning picker deliberately
      // sparse: only the selected model and effort are rendered as visible
      // text. Prefer its structural controls before falling back to copy so
      // localization and virtualized model lists cannot make the part vanish.
      if (candidate.matches?.('[class*="_ModelPickerDropdownContent_"]')
        || (candidate.querySelector?.('[class*="_ViewToggle_"]')
          && candidate.querySelector?.('[class*="_SliderKeyboardControl_"]'))) {
        return true;
      }
      const text = normalizedNodeText(candidate);
      const effortMatches = text.match(
        /(?:无|极低|轻度|中|高|极高|最高|Ultra|持续|none|minimal|low|medium|high|xhigh|max)/gi,
      ) || [];
      return /(?:GPT-|选择强度|reasoning|effort|model)/i.test(text)
        && effortMatches.length >= 3;
    });
    return node ? [node] : [];
  };
  const resolvedSearchPaletteNodes = () => {
    const inputs = genericNodes(
      'input[placeholder*="搜索"], input[placeholder*="Search" i], '
      + '[role="searchbox"][placeholder*="搜索"], [role="searchbox"][placeholder*="Search" i]',
    ).filter((node) => !node.closest?.('[data-ds-part="composer"]'));
    const surfaces = [];
    for (const input of inputs) {
      const exact = input.closest?.('[role="dialog"]');
      if (exact) {
        surfaces.push(exact);
        continue;
      }
      for (let parent = input.parentElement; parent && parent !== document.body;
        parent = parent.parentElement) {
        const rect = parent.getBoundingClientRect?.();
        if (rect && rect.width >= 420 && rect.height >= 240) {
          surfaces.push(parent);
          break;
        }
      }
    }
    return [...new Set(surfaces)];
  };
  const resolvedMessageEditParts = () => {
    const thread = genericNodes('.thread-scroll-container')[0];
    if (!thread) return { surfaces: [], cancels: [], submits: [] };
    const buttons = [...thread.querySelectorAll('button')].filter((button) =>
      !button.closest?.('[data-ds-part="composer"], [data-codex-composer-root]'));
    const cancels = buttons.filter((button) =>
      /^(?:取消|Cancel)$/i.test(normalizedNodeText(button)));
    const submits = buttons.filter((button) =>
      /^(?:发送|Send)$/i.test(normalizedNodeText(button)));
    const surfaces = [];
    const matchedCancels = [];
    const matchedSubmits = [];
    for (const cancel of cancels) {
      const submit = submits.find((candidate) => {
        let parent = cancel.parentElement;
        while (parent && parent !== thread) {
          if (parent.contains(candidate)) return true;
          parent = parent.parentElement;
        }
        return false;
      });
      if (!submit) continue;
      let surface = cancel.parentElement;
      while (surface && surface !== thread) {
        const rect = surface.getBoundingClientRect?.();
        const hasEditor = Boolean(surface.querySelector?.(
          'textarea, [contenteditable="true"], [role="textbox"]',
        ));
        if (surface.contains(submit) && rect?.width >= 420
          && rect?.height >= 80 && (hasEditor || rect.height >= 120)) break;
        surface = surface.parentElement;
      }
      if (!surface || surface === thread) continue;
      surfaces.push(surface);
      matchedCancels.push(cancel);
      matchedSubmits.push(submit);
    }
    return {
      surfaces: [...new Set(surfaces)],
      cancels: [...new Set(matchedCancels)],
      submits: [...new Set(matchedSubmits)],
    };
  };
  const resolvedScrollToBottomNodes = () => genericNodes(
    'button[aria-label="滚动到底部"], button[aria-label*="bottom" i], ' +
    'button[aria-hidden][class~="absolute"][class~="z-30"][class~="end-1/2"]',
  );
  const resolvedComposerPrimaryActionNodes = (composerNodes) => {
    const matches = [];
    for (const composer of composerNodes) {
      matches.push(...genericNodes(
        'button[class~="bg-composer-primary"], button[class~="bg-primary-solid"]',
      ).filter((node) => composer.contains?.(node)));
    }
    return [...new Set(matches)];
  };
  const refreshParts = () => {
    metrics.partPasses += 1;
    const desired = new Map();
    const messageEditParts = resolvedMessageEditParts();
    addPart(desired, "root", [document.documentElement]);
    addPart(desired, "sidebar", [...selectorNodes("left-panel"), ...fallbackSidebarNodes()]);
    addPart(desired, "header", selectorNodes("header-tint"));
    // Route-specific parts win when a generic shell collapses home and main
    // onto the same element.
    addPart(desired, "home", selectorNodes("home-route"));
    addPart(desired, "main", [...selectorNodes("shell-main"), ...fallbackMainNodes()]);
    addPart(desired, "project-list", selectorNodes("project-selector"));
    addPart(desired, "thread", selectorNodes("thread-surface"));
    addPart(desired, "message-edit-surface", messageEditParts.surfaces);
    addPart(desired, "message-edit-cancel", messageEditParts.cancels);
    addPart(desired, "message-edit-submit", messageEditParts.submits);
    addPart(desired, "message", resolvedMessageNodes());
    addPart(desired, "assistant-reading-prose", resolvedAssistantReadingProseNodes());
    addPart(desired, "thread-summary-panel", resolvedThreadSummaryPanelNodes());
    addPart(desired, "writing-block-add-to-conversation", resolvedWritingBlockAddToConversationNodes());
    addPart(desired, "conversation-navigation-preview", resolvedConversationNavigationPreviewNodes());
    addPart(desired, "sidebar-thread-detail", resolvedSidebarThreadDetailNodes());
    addPart(desired, "sidebar-project-detail", resolvedSidebarProjectDetailNodes());
    addPart(desired, "sidebar-usage-notice", resolvedSidebarUsageNoticeNodes());
    addPart(desired, "account-menu", resolvedAccountMenuNodes());
    addPart(desired, "mode-switch-menu", resolvedModeSwitchMenuNodes());
    addPart(desired, "permission-menu", resolvedPermissionMenuNodes());
    addPart(desired, "composer-add-menu", resolvedComposerAddMenuNodes());
    addPart(desired, "intelligence-menu", resolvedIntelligenceMenuNodes());
    addPart(desired, "search-palette", resolvedSearchPaletteNodes());
    const composerNodes = [...selectorNodes("composer-chrome"), ...fallbackComposerNodes()];
    addPart(desired, "composer", composerNodes);
    addPart(desired, "scroll-to-bottom", resolvedScrollToBottomNodes());
    addPart(desired, "composer-primary-action", resolvedComposerPrimaryActionNodes(composerNodes));
    addPart(desired, "composer-toolbar", [
      ...selectorNodes("composer-toolbar"), ...fallbackComposerToolbarNodes(composerNodes),
    ]);
    addPart(desired, "dialog", selectorNodes("overlay-dialog"));
    const homeHero = selectorNodes("game-source")[0] ??
      selectorNodes("home-icon")[0]?.parentElement;
    addPart(desired, "home-hero", homeHero ? [homeHero] : []);

    for (const node of partNodes) {
      if (!desired.has(node)) {
        node.removeAttribute?.(PART_ATTR);
        metrics.partWrites += 1;
      }
    }
    partNodes.clear();
    for (const [node, part] of desired) {
      if (node.getAttribute?.(PART_ATTR) !== part) {
        node.setAttribute(PART_ATTR, part);
        metrics.partWrites += 1;
      }
      partNodes.add(node);
    }
    refreshComposerBorders(composerNodes);
  };

  const removeParts = () => {
    for (const node of [...composerBorderRestores.keys()]) restoreComposerBorders(node);
    for (const node of partNodes) node.removeAttribute?.(PART_ATTR);
    partNodes.clear();
    for (const node of queryAll(`[${PART_ATTR}]`)) node.removeAttribute?.(PART_ATTR);
  };

  const scopeMatches = (scope, baseState, overlay) => {
    const active = new Set([baseState]);
    if (baseState !== "settings") active.add("all");
    if (overlay) active.add("overlay");
    const tokens = String(scope || "all").toLowerCase().match(/[a-z]+/g) || ["all"];
    return tokens.some((token) => token !== "config" && active.has(token));
  };

  const detectScope = () => {
    const overlay = selectorHit("overlay-menu") || selectorHit("overlay-dialog") ||
      selectorHit("overlay-popper");
    let baseState = "thread";
    if (selectorHit("settings-panel") || selectorHit("appearance-radio") ||
      stableTestidHit("theme-preview")) baseState = "settings";
    else if (selectorHit("home-icon") || selectorHit("home-route")) baseState = "home";
    else if (!selectorHit("shell-main") && !document.querySelector('main, [role="main"]')) baseState = "settings";
    const missingL1 = SELECTOR_CONTRACT.selectors
      .filter((entry) => entry.tier === "L1" && entry.required &&
        scopeMatches(entry.scope, baseState, overlay) && !selectorHit(entry.key))
      .map((entry) => entry.key);
    return {
      state: overlay ? "overlay" : baseState,
      baseState,
      overlay,
      // Settings replaces (or partially replaces) the app shell on macOS and
      // can retain a shell on Windows.  It is therefore always an L0 scope;
      // never treat the absence of the home/thread L1 anchors as a failure.
      level: baseState === "settings" || missingL1.length ? "L0" : "L1",
      missingL1,
    };
  };

  const refreshScope = () => {
    metrics.routePasses += 1;
    const scope = detectScope();
    const state = window[STATE_KEY];
    if (state?.installToken === installToken) state.scope = scope;
    return scope;
  };

  const ensure = ({ root: rootPass = true, scope: scopePass = false, parts: partPass = false } = {}) => {
    if (window[DISABLED_KEY]) return;
    const root = document.documentElement;
    if (!root) return;
    metrics.ensureCalls += 1;
    if (rootPass) applyRootState(root);
    if (partPass) refreshParts();
    if (scopePass) refreshScope();
  };

  const cleanup = () => {
    const state = window[STATE_KEY];
    if (state?.installToken !== installToken) return false;
    window[DISABLED_KEY] = true;
    const root = document.documentElement;
    for (const name of ROOT_ATTRS) root?.removeAttribute(name);
    for (const attribute of [...(root?.attributes || [])]) {
      if (attribute.name.startsWith("data-dream-")) root.removeAttribute(attribute.name);
    }
    for (const name of THEME_VARIABLES) root?.style.removeProperty(name);
    for (const property of [...(root?.style || [])]) {
      if (property.startsWith("--dream-") || property.startsWith("--ds-")) {
        root.style.removeProperty(property);
      }
    }
    removeParts();
    state?.rootObserver?.disconnect();
    state?.partObserver?.disconnect();
    if (bodyReadyHandler && typeof document.removeEventListener === "function") {
      document.removeEventListener("DOMContentLoaded", bodyReadyHandler);
    }
    if (state?.timer) clearInterval(state.timer);
    if (state?.scheduler?.timeout) clearTimeout(state.scheduler.timeout);
    if (analysisTimer) clearTimeout(analysisTimer);
    if (state?.mediaHandler && state?.mediaQuery) {
      try { state.mediaQuery.removeEventListener("change", state.mediaHandler); } catch {}
    }
    if (state?.navigationHandler && state?.navigation) {
      try { state.navigation.removeEventListener("navigate", state.navigationHandler); } catch {}
    }
    if (styleSheet) {
      try {
        document.adoptedStyleSheets = [...document.adoptedStyleSheets]
          .filter((candidate) => candidate !== styleSheet);
      } catch {}
      styleRegistry.delete(styleSheet);
    }
    styleNode?.remove();
    if (document.getElementById(STYLE_ID) === styleNode) document.getElementById(STYLE_ID)?.remove();
    if (styleRegistry.size === 0) delete window[STYLE_REGISTRY_KEY];
    if (state?.artUrl) URL.revokeObjectURL(state.artUrl);
    delete window[STATE_KEY];
    return true;
  };

  const scheduler = { timeout: null, root: false, scope: false, parts: false };
  const flushScheduledEnsure = () => {
    if (scheduler.timeout) clearTimeout(scheduler.timeout);
    scheduler.timeout = null;
    const pending = { root: scheduler.root, scope: scheduler.scope, parts: scheduler.parts };
    scheduler.root = false;
    scheduler.scope = false;
    scheduler.parts = false;
    ensure(pending);
  };
  const scheduleEnsure = ({ root = false, scope = false, parts = false } = {}, delay = 64) => {
    scheduler.root ||= root;
    scheduler.scope ||= scope;
    scheduler.parts ||= parts;
    if (scheduler.timeout) return;
    scheduler.timeout = setTimeout(flushScheduledEnsure, delay);
  };
  if (typeof MutationObserver === "function") {
    rootObserver = new MutationObserver(() => scheduleEnsure({ root: true }));
    // SPA route changes are observable as DOM mutations even when Chromium's
    // Navigation API emits no event. Keep verification scope and public parts
    // derived from the same post-mutation tree.
    partObserver = new MutationObserver(() => scheduleEnsure({ scope: true, parts: true }, 80));
  }

  let mediaQuery = null;
  let mediaHandler = null;
  try {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaHandler = () => scheduleEnsure({ root: true });
  } catch {}

  const navigationApi = window.navigation && typeof window.navigation.addEventListener === "function"
    ? window.navigation : null;
  const navigationHandler = navigationApi ? () => {
    metrics.navigationEvents += 1;
    scheduleEnsure({ scope: true, parts: true }, 180);
  } : null;

  window[STATE_KEY] = {
    ensure,
    cleanup,
    rootObserver,
    partObserver,
    timer: null,
    scheduler,
    mediaQuery,
    mediaHandler,
    navigation: navigationApi,
    navigationHandler,
    artUrl,
    installToken,
    styleMode,
    styleNode,
    styleSheet,
    styleRevision: STYLE_REVISION,
    analysis: artAnalysis,
    artMetadata: ART_METADATA,
    scope: null,
    selectorsSchema: SELECTOR_CONTRACT.schema,
    metrics,
    version: VERSION,
    themeId: THEME.id || "custom",
    revision: PAYLOAD_REVISION,
    detectShellAppearance,
  };
  const firstEnsureStartedAt = now();
  ensure({ root: true, parts: true });
  const initialScope = refreshScope();
  metrics.firstEnsureMs = Number((now() - firstEnsureStartedAt).toFixed(3));

  const observeAttributes = (node) => {
    if (!rootObserver || !node) return;
    rootObserver.observe(node, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-appearance", "data-color-mode"],
    });
  };
  const observePartTree = (node) => {
    if (!partObserver || !node) return;
    partObserver.observe(node, { childList: true, subtree: true });
  };
  observeAttributes(document.documentElement);
  const observeBody = () => {
    observeAttributes(document.body);
    observePartTree(document.body);
  };
  if (document.body) observeBody();
  else if (typeof document.addEventListener === "function") {
    bodyReadyHandler = () => {
      if (!window[DISABLED_KEY]) {
        observeBody();
        scheduleEnsure({ scope: true, parts: true }, 0);
      }
    };
    document.addEventListener("DOMContentLoaded", bodyReadyHandler, { once: true });
  }
  const timer = setInterval(() => {
    metrics.safetyPasses += 1;
    ensure({ root: true });
  }, 30000);
  window[STATE_KEY].timer = timer;
  if (mediaHandler && mediaQuery && typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", mediaHandler);
  }
  if (navigationHandler && navigationApi) {
    navigationApi.addEventListener("navigate", navigationHandler);
  }
  const analysisPromise = artAnalysis ? Promise.resolve(null) : analyzeArt();
  window[STATE_KEY].analysisTimer = analysisTimer;
  analysisPromise.then((analysis) => {
    const state = window[STATE_KEY];
    if (!analysis || state?.installToken !== installToken || window[DISABLED_KEY]) return;
    artAnalysis = analysis;
    state.analysis = analysis;
    if (typeof THEME.artKey === "string") {
      analysisCache.set(THEME.artKey, analysis);
      while (analysisCache.size > 8) analysisCache.delete(analysisCache.keys().next().value);
    }
    ensure({ root: true });
  }).catch(() => {});
  return {
    installed: true,
    version: VERSION,
    themeId: THEME.id || "custom",
    revision: PAYLOAD_REVISION,
    shell: resolvedShell(),
    scope: initialScope,
    styleMode,
    analysis: artAnalysis,
  };
})(__DREAM_SKIN_CSS_JSON__, __DREAM_SKIN_ART_JSON__, __DREAM_SKIN_THEME_JSON__)
