/*
 * MF Home Monitor — Home Assistant cards for a solar home with a battery and an EV charger.
 * https://github.com/mfkilla13/mf-home-monitor · MIT License · © 2026 Alexandru Volovoi (mfkilla13)
 *
 *   custom:mf-house-card  — rendered house with live layers: energy flows, panel power, battery SOC and glow,
 *                           charger ring, cable and current, temperatures, tap-to-open info plates.
 *                           Picture by season, rain and sun.sun; optional "no car" pictures.
 *   custom:mf-now-card    — "Now": solar, home, grid bar with limit, battery bar with thresholds.
 *   custom:mf-badges-card — row of large badges (entity | entities + format).
 *   custom:mf-day-chart   — power today (HA history).
 *   custom:mf-days-chart  — energy per day (HA long-term statistics).
 *
 * Layer coordinates are in pixels of the 1672×941 pictures shipped in /images. For your own render set
 * `calibrate: true`: a step-by-step wizard marks every layer on the picture and gives a ready `layout:` YAML.
 * Languages: en, ru, zh (from HA profile or `language:`).
 */

const VERSION = "1.0.0";

// ─── Languages ───────────────────────────────────────────────────────────────

const I18N = {
  en: {
    solar: "Solar", grid: "Grid", home: "Home", inverters: "Inverters", battery: "Battery", charger: "Charger",
    street: "Outside", car: "Car", now: "Now", today: "Today", peak: "Peak", current: "Current", voltage: "Voltage",
    import_today: "Imported today", home_now: "Now (without EV)", consumption: "Consumption",
    consumption_today: "Consumption today", self_sufficiency: "Self-sufficiency", data: "Inverter data",
    fresh: "fresh", stale: "stale", charge: "Charge", charging: "Charging", discharging: "Discharging",
    charge_discharge_today: "Charge / discharge today", status: "Status", power: "Power", temperature: "Temperature",
    ev_today: "To car today", auto_charge: "Auto charging", mode: "Mode", on: "on", off: "off",
    illuminance: "Illuminance", rain: "Rain", raining: "raining", no: "no", more: "Details ›", outside: "outside",
    inverter: "Inverter", ev_charging: "Charging", car_plugged: "Car plugged in", car_unplugged: "Car not plugged in",
    fullscreen: "Full screen", close: "Close", no_history: "No history data", no_stats: "No statistics",
    from_grid: "From grid", to_car: "To car", today_colon: "Today:", dry: "dry",
    st_charging: "charging", st_available: "not plugged in", st_charged: "charged", st_waiting: "waiting", st_fault: "fault",
    solar_today: "solar", home_sub: "home without EV", charge_w: "charge", discharge_w: "discharge",
    limit: "limit", input: "input", stop: "stop", protect: "protection",
    cal_title: "Layout wizard",
    cal_step: "Step",
    cal_back: "Back",
    cal_skip: "Skip",
    cal_next: "Next",
    cal_undo: "Undo point",
    cal_reset: "Start over",
    cal_copy: "Copy YAML",
    cal_copied: "Copied — paste it into the card and remove calibrate: true",
    cal_done: "Done. Copy the YAML below into the card config and remove calibrate: true.",
    h_point: "Tap the place on the picture.",
    h_line: "Tap points along the line from start to end, then Next.",
    h_quad: "Tap the 4 corners clockwise, starting top left.",
    h_rect: "Tap the top-left and the bottom-right corner.",
    h_multi: "Tap every point, then Next.",
    s_spot_solar: "Dot: solar panels",
    s_spot_grid: "Dot: grid (pole)",
    s_spot_home: "Dot: house",
    s_spot_inverters: "Dot: inverters",
    s_spot_battery: "Dot: battery",
    s_spot_charger: "Dot: wall box",
    s_spot_car: "Dot: car",
    s_spot_street: "Dot: outside (garden)",
    s_panels_0: "Upper panel row (PV 1)",
    s_panels_1: "Lower panel row (PV 2)",
    s_flows_solar: "Flow: panels → inverters",
    s_flows_grid: "Flow: pole → inverters along the wire",
    s_wire_text: "Label above the wire: house → pole",
    s_flows_battery: "Flow: inverters → battery",
    s_flows_home: "Flow: inverters → into the house",
    s_flows_ev: "Flow: inverters → wall box",
    s_inverter_leds: "Inverter LEDs",
    s_battery_outline: "Battery cabinet (4 corners)",
    s_battery_text: "SOC % on the battery",
    s_charger_ring: "Wall box light ring",
    s_cable: "Charging cable: wall box → car",
    s_amps_text: "Charging current label (in front of the car)",
    s_temps: "Temperature block (top-left corner of it)",
    s_phone_crop: "Phone view: area with the house",
  },
  ru: {
    solar: "Солнце", grid: "Сеть", home: "Дом", inverters: "Инверторы", battery: "Батарея", charger: "Зарядная станция",
    street: "Улица", car: "Машина", now: "Сейчас", today: "Сегодня", peak: "Пик", current: "Ток", voltage: "Напряжение",
    import_today: "Импорт сегодня", home_now: "Сейчас (без гаража)", consumption: "Потребление",
    consumption_today: "Потребление сегодня", self_sufficiency: "Самообеспечение", data: "Данные инверторов",
    fresh: "свежие", stale: "устарели", charge: "Заряд", charging: "Заряжается", discharging: "Разряжается",
    charge_discharge_today: "Заряд / разряд сегодня", status: "Статус", power: "Мощность", temperature: "Температура",
    ev_today: "В машину сегодня", auto_charge: "Авто-зарядка", mode: "Режим", on: "вкл", off: "выкл",
    illuminance: "Освещённость", rain: "Дождь", raining: "идёт", no: "нет", more: "Подробнее ›", outside: "на улице",
    inverter: "Инвертор", ev_charging: "Зарядка", car_plugged: "Машина подключена", car_unplugged: "Машина не подключена",
    fullscreen: "На весь экран", close: "Закрыть", no_history: "Нет данных истории", no_stats: "Нет статистики",
    from_grid: "Из сети", to_car: "В машину", today_colon: "Сегодня:", dry: "сухо",
    st_charging: "заряжает", st_available: "не подключена", st_charged: "заряжена", st_waiting: "ожидание", st_fault: "ошибка",
    solar_today: "солнце", home_sub: "дом без гаража", charge_w: "заряд", discharge_w: "разряд",
    limit: "лимит", input: "ввод", stop: "стоп", protect: "защита",
    cal_title: "Мастер разметки",
    cal_step: "Шаг",
    cal_back: "Назад",
    cal_skip: "Пропустить",
    cal_next: "Дальше",
    cal_undo: "Отменить точку",
    cal_reset: "Начать заново",
    cal_copy: "Скопировать YAML",
    cal_copied: "Скопировано — вставьте в карточку и уберите calibrate: true",
    cal_done: "Готово. Скопируйте YAML ниже в настройки карточки и уберите calibrate: true.",
    h_point: "Нажмите на это место на картинке.",
    h_line: "Нажимайте точки вдоль линии от начала к концу, затем «Дальше».",
    h_quad: "Отметьте 4 угла по часовой стрелке, начиная с левого верхнего.",
    h_rect: "Отметьте левый верхний и правый нижний угол.",
    h_multi: "Отметьте все точки, затем «Дальше».",
    s_spot_solar: "Точка: солнечные панели",
    s_spot_grid: "Точка: сеть (столб)",
    s_spot_home: "Точка: дом",
    s_spot_inverters: "Точка: инверторы",
    s_spot_battery: "Точка: батарея",
    s_spot_charger: "Точка: зарядная станция",
    s_spot_car: "Точка: машина",
    s_spot_street: "Точка: улица (сад)",
    s_panels_0: "Верхний ряд панелей (PV 1)",
    s_panels_1: "Нижний ряд панелей (PV 2)",
    s_flows_solar: "Поток: панели → инверторы",
    s_flows_grid: "Поток: столб → инверторы по проводу",
    s_wire_text: "Подпись над проводом: от дома к столбу",
    s_flows_battery: "Поток: инверторы → батарея",
    s_flows_home: "Поток: инверторы → в дом",
    s_flows_ev: "Поток: инверторы → зарядная станция",
    s_inverter_leds: "Светодиоды инверторов",
    s_battery_outline: "Шкаф батареи (4 угла)",
    s_battery_text: "Процент SOC на батарее",
    s_charger_ring: "Световое кольцо станции",
    s_cable: "Кабель зарядки: станция → машина",
    s_amps_text: "Надпись тока (перед машиной)",
    s_temps: "Блок температур (его левый верхний угол)",
    s_phone_crop: "Вид на телефоне: область с домом",
  },
  zh: {
    solar: "光伏", grid: "电网", home: "住宅", inverters: "逆变器", battery: "电池", charger: "充电桩",
    street: "室外", car: "汽车", now: "当前", today: "今日", peak: "峰值", current: "电流", voltage: "电压",
    import_today: "今日购电", home_now: "当前（不含充电）", consumption: "用电",
    consumption_today: "今日用电", self_sufficiency: "自给率", data: "逆变器数据",
    fresh: "正常", stale: "过期", charge: "电量", charging: "充电中", discharging: "放电中",
    charge_discharge_today: "今日充 / 放电", status: "状态", power: "功率", temperature: "温度",
    ev_today: "今日充入汽车", auto_charge: "自动充电", mode: "模式", on: "开", off: "关",
    illuminance: "照度", rain: "降雨", raining: "下雨", no: "无", more: "详情 ›", outside: "室外",
    inverter: "逆变器", ev_charging: "充电", car_plugged: "汽车已连接", car_unplugged: "汽车未连接",
    fullscreen: "全屏", close: "关闭", no_history: "没有历史数据", no_stats: "没有统计数据",
    from_grid: "来自电网", to_car: "充入汽车", today_colon: "今日：", dry: "无雨",
    st_charging: "充电中", st_available: "未连接", st_charged: "已充满", st_waiting: "等待", st_fault: "故障",
    solar_today: "光伏", home_sub: "住宅（不含充电）", charge_w: "充电", discharge_w: "放电",
    limit: "限值", input: "进线", stop: "停止", protect: "保护",
    cal_title: "布局向导",
    cal_step: "步骤",
    cal_back: "上一步",
    cal_skip: "跳过",
    cal_next: "下一步",
    cal_undo: "撤销点",
    cal_reset: "重新开始",
    cal_copy: "复制 YAML",
    cal_copied: "已复制 —— 粘贴到卡片配置中并删除 calibrate: true",
    cal_done: "完成。将下方 YAML 复制到卡片配置中，并删除 calibrate: true。",
    h_point: "点击图片上的该位置。",
    h_line: "沿线从起点到终点依次点击，然后点“下一步”。",
    h_quad: "从左上角开始顺时针点击 4 个角。",
    h_rect: "点击左上角和右下角。",
    h_multi: "点击所有位置，然后点“下一步”。",
    s_spot_solar: "圆点：光伏板",
    s_spot_grid: "圆点：电网（电线杆）",
    s_spot_home: "圆点：住宅",
    s_spot_inverters: "圆点：逆变器",
    s_spot_battery: "圆点：电池",
    s_spot_charger: "圆点：充电桩",
    s_spot_car: "圆点：汽车",
    s_spot_street: "圆点：室外（花园）",
    s_panels_0: "上排光伏板（PV 1）",
    s_panels_1: "下排光伏板（PV 2）",
    s_flows_solar: "能量流：光伏板 → 逆变器",
    s_flows_grid: "能量流：沿电线从电线杆 → 逆变器",
    s_wire_text: "电线上方标签：从住宅到电线杆",
    s_flows_battery: "能量流：逆变器 → 电池",
    s_flows_home: "能量流：逆变器 → 住宅",
    s_flows_ev: "能量流：逆变器 → 充电桩",
    s_inverter_leds: "逆变器指示灯",
    s_battery_outline: "电池柜（4 个角）",
    s_battery_text: "电池上的 SOC 百分比",
    s_charger_ring: "充电桩灯环",
    s_cable: "充电线：充电桩 → 汽车",
    s_amps_text: "充电电流标签（车前）",
    s_temps: "温度区块（其左上角）",
    s_phone_crop: "手机视图：住宅所在区域",
  },
};

const COLORS = {
  solar: "#f5b042", grid: "#5b9cf5", battery: "#7bd389", home: "#4fc3b0", ev: "#eef1f5",
  warn: "#f2a65a", bad: "#f07178", muted: "#9aa1ad", ok: "#46e08a",
};

const fmtW = (w) => (Math.abs(w) >= 1000 ? (w / 1000).toFixed(1) + " kW" : Math.round(w) + " W");
const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ─── Layout of the shipped pictures (1672×941). Override any key under `layout:` ──

const DEFAULT_LAYOUT = {
  size: [1672, 941],
  // Panel rows: quad (4 corners), text center and a matrix that puts text into the roof plane.
  panels: [
    { entity: "pv1", quad: [[530, 215], [882, 137], [954, 205], [603, 295]], text: [742, 213] },
    { entity: "pv2", quad: [[603, 295], [954, 205], [1027, 273], [677, 375]], text: [815, 287] },
  ],
  panel_matrix: [0.976, -0.216, 0.677, 0.737],
  flows: {
    solar: [[930, 300], [1037, 328], [1009, 348], [1005, 425], [990, 432]],
    grid: [[1520, 155], [1500, 167], [1470, 187], [1440, 202], [1400, 222], [1360, 240], [1300, 261], [1240, 279],
      [1180, 295], [1120, 309], [1080, 317], [1040, 327], [1013, 350], [1009, 428], [994, 436]],
    battery: [[968, 472], [968, 498]],
    home: [[908, 452], [887, 458], [887, 508], [835, 520], [790, 526]],
    ev: [[1006, 444], [1042, 396], [1480, 398], [1493, 412], [1493, 588], [1468, 592], [1458, 574]],
  },
  // Text above the grid wire, from house to pole (so it is not upside down).
  wire_text: [[1040, 327], [1080, 317], [1120, 309], [1180, 295], [1240, 279], [1300, 261], [1360, 240],
    [1400, 222], [1440, 202], [1470, 187], [1500, 167], [1520, 155]],
  inverter_leds: [[931, 463], [977, 455]],
  battery_outline: [[936, 506], [1002, 494], [1004, 614], [938, 624]],
  battery_text: [978, 583], battery_text_matrix: [0.995, -0.105, 0, 1],
  charger_ring: [1436, 521, 19, 50],
  cable: "M1442 553 C1440 600 1432 632 1405 629 C1378 626 1382 578 1392 531",
  // Charging current: standing "hologram" in front of the bumper — x along the car front, y vertical.
  amps_text: [1115, 716], amps_text_matrix: [0.985, 0.17, 0, 1], amps_ground: [1118, 760, 105, 16],
  spots: {
    solar: [1040, 262], grid: [1563, 300], home: [640, 448], inverters: [952, 412], battery: [1030, 560],
    charger: [1458, 506], car: [1250, 478], street: [320, 640],
  },
  temps: [4.5, 8],              // % of picture: left, top
  phone_crop: [230, 100, 1600, 920],
};

// ─── Layout wizard (calibrate: true) ────────────────────────────────────────
// t: point — 1 tap, quad — 4 corners, rect — 2 corners, line / multi — any number of taps, then Next.
const CAL_STEPS = [
  ["spot_solar", "point"], ["spot_grid", "point"], ["spot_home", "point"], ["spot_inverters", "point"], ["spot_battery", "point"],
  ["spot_charger", "point"], ["spot_car", "point"], ["spot_street", "point"],
  ["panels_0", "quad"], ["panels_1", "quad"],
  ["flows_solar", "line"], ["flows_grid", "line"], ["wire_text", "line"], ["flows_battery", "line"], ["flows_home", "line"], ["flows_ev", "line"],
  ["inverter_leds", "multi"], ["battery_outline", "quad"], ["battery_text", "point"],
  ["charger_ring", "rect"], ["cable", "line"], ["amps_text", "point"], ["temps", "point"], ["phone_crop", "rect"],
];

// Calibration taps → layout keys (only the steps that were done).
function calToLayout(cal, size) {
  const L = {}, unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1; return [+(dx / n).toFixed(3), +(dy / n).toFixed(3)]; };
  const center = (q) => [Math.round(q.reduce((s, p) => s + p[0], 0) / q.length), Math.round(q.reduce((s, p) => s + p[1], 0) / q.length)];
  if (cal.size) L.size = cal.size;
  for (const [key, pts] of Object.entries(cal.points || {})) {
    if (!pts || !pts.length) continue;
    // Quads and rects count only when all their corners are marked.
    const need = { panels_0: 4, panels_1: 4, battery_outline: 4, charger_ring: 2, phone_crop: 2 }[key];
    if (need && pts.length < need) continue;
    if (key.startsWith("spot_")) (L.spots ||= {})[key.slice(5)] = pts[0];
    else if (key.startsWith("flows_")) (L.flows ||= {})[key.slice(6)] = pts;
    else if (key.startsWith("panels_")) {
      const i = +key.slice(7);
      L.panels ||= [];
      L.panels[i] = { entity: `pv${i + 1}`, quad: pts, text: center(pts) };
      if (i === 0 || !L.panel_matrix) L.panel_matrix = [...unit(pts[0], pts[1]), ...unit(pts[0], pts[3])];
    } else if (key === "battery_outline") { L.battery_outline = pts; L.battery_text_matrix = [...unit(pts[0], pts[1]), 0, 1]; }
    else if (key === "charger_ring") L.charger_ring = [pts[0][0], pts[0][1], pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]];
    else if (key === "cable") L.cable = "M" + pts.map((p) => p.join(" ")).join(" L");
    else if (key === "amps_text") { L.amps_text = pts[0]; L.amps_ground = [pts[0][0], pts[0][1] + 44, 105, 16]; }
    else if (key === "temps") L.temps = [+(pts[0][0] / size[0] * 100).toFixed(1), +(pts[0][1] / size[1] * 100).toFixed(1)];
    else if (key === "phone_crop") L.phone_crop = [pts[0][0], pts[0][1], pts[1][0], pts[1][1]];
    else if (key === "battery_text") L.battery_text = pts[0];
    else L[key] = pts;                                    // inverter_leds, wire_text
  }
  if (L.panels) L.panels = L.panels.filter(Boolean);
  return L;
}

function layoutYaml(L) {
  const v = (x) => (Array.isArray(x) ? `[${x.map(v).join(", ")}]` : typeof x === "string" ? JSON.stringify(x) : x);
  const out = ["layout:"];
  for (const [k, x] of Object.entries(L)) {
    if (k === "spots" || k === "flows") {
      out.push(`  ${k}:`);
      for (const [kk, xx] of Object.entries(x)) out.push(`    ${kk}: ${v(xx)}`);
    } else if (k === "panels") {
      out.push("  panels:");
      x.forEach((p) => out.push(`    - { entity: ${p.entity}, quad: ${v(p.quad)}, text: ${v(p.text)} }`));
    } else out.push(`  ${k}: ${v(x)}`);
  }
  return out.join("\n");
}

// ─── Base ────────────────────────────────────────────────────────────────────

class MfBase extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    this._e = { ...(this._config.entities || {}) };
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this._sig = null;
  }

  set hass(hass) {
    this._hass = hass;
    // Re-render only when one of our entities changed — otherwise animations restart.
    const sig = Object.values(this._e).map((id) => hass.states[id]?.state).join("|") + (hass.locale?.language || "");
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  get lang() {
    const l = (this._config.language || this._hass?.locale?.language || this._hass?.language || "en").toLowerCase();
    return l.startsWith("ru") ? "ru" : l.startsWith("zh") ? "zh" : "en";
  }
  t(key) { return I18N[this.lang][key] ?? I18N.en[key] ?? key; }
  get locale() { return { ru: "ru-RU", zh: "zh-CN", en: "en-US" }[this.lang]; }

  has(key) { return !!this._e[key] && !!this._hass?.states[this._e[key]]; }
  st(key) { return this._e[key] ? this._hass?.states[this._e[key]]?.state : undefined; }
  num(key) { const v = parseFloat(this.st(key)); return Number.isFinite(v) ? v : 0; }

  gridAmps() {
    const v = this.num("grid_voltage");
    return this.num("grid") / (v > 90 ? v : Number(this._config.nominal_voltage ?? 230));
  }
  gridOver() { return this.gridAmps() > Number(this._config.grid_red_amps ?? 16); }

  moreInfo(key) {
    const entityId = this._e[key] || key;
    if (!entityId || !String(entityId).includes(".")) return;
    const ev = new Event("hass-more-info", { bubbles: true, composed: true });
    ev.detail = { entityId };
    this.dispatchEvent(ev);
  }

  bindMoreInfo() {
    this.shadowRoot.querySelectorAll("[data-entity]").forEach((el) =>
      el.addEventListener("click", () => this.moreInfo(el.dataset.entity)));
  }
}

// ─── House scene ─────────────────────────────────────────────────────────────

class MfHouseCard extends MfBase {
  static getStubConfig() {
    return { image_night: "/local/mf-home-monitor/house_night.jpg", image_day: "/local/mf-home-monitor/house_day.jpg", entities: {} };
  }
  getCardSize() { return 8; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }

  setConfig(config) {
    super.setConfig(config);
    if (!this._e.sun) this._e.sun = "sun.sun";
    if (config.calibrate && !this._calState) {
      // Wizard progress survives page reloads (per browser).
      try { this._calState = JSON.parse(localStorage.getItem(this._calKey()) || "null"); } catch (e) { /* storage blocked */ }
      this._calState ||= { step: 0, points: {} };
    }
    this._applyLayout();
  }

  _calKey() { return `mf-house-card:calibrate:${this._config.image_night || this._config.image_day || ""}`; }

  _applyLayout() {
    // Card layout → over the defaults; wizard taps (while calibrating) → over both.
    const own = this._config.layout || {};
    const size = this._calState?.size || own.size || DEFAULT_LAYOUT.size;
    const cal = this._config.calibrate && this._calState ? calToLayout(this._calState, size) : {};
    this._L = { ...DEFAULT_LAYOUT, ...own, ...cal,
      flows: { ...DEFAULT_LAYOUT.flows, ...(own.flows || {}), ...(cal.flows || {}) },
      spots: { ...DEFAULT_LAYOUT.spots, ...(own.spots || {}), ...(cal.spots || {}) } };
  }

  _calSave() {
    try { localStorage.setItem(this._calKey(), JSON.stringify(this._calState)); } catch (e) { /* storage blocked */ }
    this._applyLayout();
    this._render();
  }

  // Wizard panel under the picture and marks of the current step on it.
  _calHTML() {
    const cs = this._calState, t = (k) => this.t(k), n = CAL_STEPS.length;
    const done = cs.step >= n;
    const [key, type] = done ? [null, null] : CAL_STEPS[cs.step];
    const pts = (key && cs.points[key]) || [];
    const yaml = layoutYaml(calToLayout(cs, cs.size || this._L.size));
    const btn = (act, label, dis = false) => `<button class="wb" data-cal="${act}" ${dis ? "disabled" : ""}>${label}</button>`;
    return `<div class="wiz">
      <div class="wh"><b>${t("cal_title")}</b><span>${done ? "" : `${t("cal_step")} ${cs.step + 1} / ${n}`}</span></div>
      ${done ? `<div class="wt">${t("cal_done")}</div>` : `<div class="wt">${t(`s_${key}`)}</div><div class="wd">${t(`h_${type}`)}${pts.length ? ` · ${pts.length}` : ""}</div>`}
      <div class="wbs">
        ${btn("back", t("cal_back"), cs.step === 0)}
        ${done ? "" : btn("undo", t("cal_undo"), !pts.length)}
        ${done ? "" : (type === "line" || type === "multi" ? btn("next", t("cal_next"), !pts.length) : "")}
        ${done ? "" : btn("skip", t("cal_skip"))}
        ${btn("copy", t("cal_copy"))}${btn("reset", t("cal_reset"))}
      </div>
      <textarea class="wy" readonly rows="${Math.min(14, yaml.split("\n").length)}">${esc(yaml)}</textarea>
      ${this._calMsg ? `<div class="wd">${this._calMsg}</div>` : ""}
    </div>`;
  }

  _calMarks() {
    const cs = this._calState, [VW, VH] = this._L.size;
    if (cs.step >= CAL_STEPS.length) return "";
    const [key, type] = CAL_STEPS[cs.step], pts = cs.points[key] || [];
    let m = `<svg class="calsvg" viewBox="0 0 ${VW} ${VH}" aria-hidden="true">`;
    if (pts.length > 1) {
      const closed = type === "quad" && pts.length === 4;
      m += `<${closed ? "polygon" : "polyline"} points="${pts.map((p) => p.join(",")).join(" ")}" fill="${closed ? "rgba(255,211,107,.15)" : "none"}" stroke="#ffd36b" stroke-width="3" stroke-dasharray="8 5"/>`;
    }
    if (type === "rect" && pts.length === 2) m += `<rect x="${pts[0][0]}" y="${pts[0][1]}" width="${pts[1][0] - pts[0][0]}" height="${pts[1][1] - pts[0][1]}" fill="none" stroke="#ffd36b" stroke-width="3"/>`;
    pts.forEach(([x, y], i) => { m += `<circle cx="${x}" cy="${y}" r="9" fill="#ffd36b" stroke="#111" stroke-width="3"/><text x="${x + 12}" y="${y - 10}" font-size="22" font-weight="700" fill="#ffd36b" stroke="#111" stroke-width="4" paint-order="stroke">${i + 1}</text>`; });
    return m + "</svg>";
  }

  _calTap(x, y) {
    const cs = this._calState;
    if (cs.step >= CAL_STEPS.length) return;
    const [key, type] = CAL_STEPS[cs.step];
    const pts = (cs.points[key] ||= []);
    const need = { point: 1, quad: 4, rect: 2 }[type];
    if (need && pts.length >= need) pts.length = 0;       // start this step again
    pts.push([x, y]);
    if (need && pts.length === need) cs.step++;           // fixed-size steps advance by themselves
    this._calMsg = "";
    this._calSave();
  }

  _calAction(act, root) {
    const cs = this._calState, key = CAL_STEPS[cs.step]?.[0];
    if (act === "back") cs.step = Math.max(0, cs.step - 1);
    else if (act === "next" || act === "skip") cs.step++;
    else if (act === "undo" && key) cs.points[key]?.pop();
    else if (act === "reset") { this._calState = { step: 0, points: {}, size: cs.size }; this._calMsg = ""; return this._calSave(); }
    else if (act === "copy") {
      const ta = root.querySelector(".wy");
      const ok = () => { this._calMsg = this.t("cal_copied"); this._render(); };
      // Clipboard needs https; otherwise the text is selected for Ctrl+C.
      (navigator.clipboard?.writeText(ta.value) || Promise.reject()).then(ok, () => { ta.select(); });
      return;
    }
    if (act === "skip" && key) delete cs.points[key];
    this._calSave();
  }

  _plugged() {
    const cs = this.st("charger_status");
    if (!this._e.charger_status) return this.st("charger") === "on";
    return cs !== undefined && cs !== "available" && cs !== "unavailable" && cs !== "unknown";
  }

  // Hotspots: picture position, color, entity for "Details", rows of the info plate.
  _spots() {
    const n = (k) => this.num(k), st = (k) => this.st(k) ?? "—", t = (k) => this.t(k);
    const P = this._L.spots, names = this._config.pv_names || ["PV 1", "PV 2"];
    const grid = n("grid"), bat = n("battery"), ev = n("ev");
    const cons = n("consumption"), imp = n("import"), evToday = n("ev_today");
    const status = t(`st_${this.st("charger_status")}`);
    const temp = this._hass.states[this._e.weather]?.attributes?.temperature;
    const fresh = this._e.data_fresh ? this.st("data_fresh") === "on" : true;
    const rows = (list) => list.filter(Boolean);
    return {
      solar: this.has("pv") && { at: P.solar, color: COLORS.solar, more: "pv", title: t("solar"), rows: rows([
        [t("now"), fmtW(n("pv"))],
        this.has("pv1") && [names[0], fmtW(n("pv1"))], this.has("pv2") && [names[1], fmtW(n("pv2"))],
        this.has("yield") && [t("today"), `${st("yield")} kWh`], this.has("peak") && [t("peak"), `${(n("peak") / 1000).toFixed(1)} kW`]]) },
      grid: this.has("grid") && { at: P.grid, color: this.gridOver() ? COLORS.bad : COLORS.grid, more: "grid", title: t("grid"), rows: rows([
        [t("now"), fmtW(grid)], [t("current"), `${this.gridAmps().toFixed(1)} A`],
        this.has("grid_voltage") && [t("voltage"), `${st("grid_voltage")} V`],
        this.has("import") && [t("import_today"), `${st("import")} kWh`]]) },
      home: this.has("home") && { at: P.home, color: COLORS.home, more: "home", title: t("home"), rows: rows([
        [t("home_now"), fmtW(n("home"))],
        this.has("consumption") && [t("consumption_today"), `${Math.max(cons - evToday, 0).toFixed(1)} kWh`],
        this.has("consumption") && this.has("import") && [t("self_sufficiency"), `${cons > 0 ? Math.round((1 - imp / cons) * 100) : 0}%`]]) },
      inverters: (this.has("t1") || this.has("t2")) && { at: P.inverters, color: fresh ? COLORS.ok : COLORS.solar, more: this.has("t1") ? "t1" : "t2",
        title: t("inverters"), rows: rows([
          this.has("t1") && [names[0], `${Math.round(n("t1"))} °C`], this.has("t2") && [names[1], `${Math.round(n("t2"))} °C`],
          this._e.data_fresh && [t("data"), t(fresh ? "fresh" : "stale")]]) },
      battery: this.has("soc") && { at: P.battery, color: COLORS.battery, more: "soc", title: t("battery"), rows: rows([
        [t("charge"), `${Math.round(n("soc"))}%`], this.has("battery") && [t(bat >= 0 ? "charging" : "discharging"), fmtW(Math.abs(bat))],
        this.has("voltage") && [t("voltage"), `${st("voltage")} V`],
        this.has("charge_today") && [t("charge_discharge_today"), `${st("charge_today")} / ${st("discharge_today")} kWh`]]) },
      charger: (this.has("charger") || this.has("charger_status")) && { at: P.charger, color: this.st("charger") === "on" ? COLORS.ok : COLORS.muted,
        more: this._e.charger ? "charger" : "charger_status", title: t("charger"), rows: rows([
          this.has("charger_status") && [t("status"), status],
          this.has("charger_current") && [t("current"), `${st("charger_current")} A`], this.has("ev") && [t("power"), fmtW(ev)],
          this.has("charger_temp") && [t("temperature"), `${st("charger_temp")} °C`],
          this.has("ev_today") && [t("ev_today"), `${evToday.toFixed(1)} kWh`]]) },
      car: this._plugged() && (this.has("auto") || this.has("ev_mode") || this.has("ev_state")) && {
        at: P.car, color: COLORS.ev, more: this._e.ev_state ? "ev_state" : "auto", title: this._config.car_name || t("car"), rows: rows([
          this.has("auto") && [t("auto_charge"), t(this.st("auto") === "on" ? "on" : "off")],
          this.has("ev_mode") && [t("mode"), st("ev_mode")], this.has("ev_state") && ["", st("ev_state")]]) },
      street: (temp !== undefined || this.has("lux") || this.has("rain")) && {
        at: P.street, color: COLORS.muted, more: this._e.lux ? "lux" : "weather", title: t("street"), rows: rows([
          temp !== undefined && [t("temperature"), `${Math.round(temp)} °C`],
          this.has("lux") && [t("illuminance"), `${Math.round(n("lux")).toLocaleString(this.locale)} lx`],
          this.has("rain") && [t("rain"), t(this.st("rain") === "on" ? "raining" : "no")]]) },
    };
  }

  // Weather variant and its fallbacks: day / night, rain, snow (by month, or by temperature while it rains).
  _variants() {
    const c = this._config;
    const day = this.st("sun") === "above_horizon";
    const winter = (c.winter_months || [12, 1, 2]).includes(new Date().getMonth() + 1);
    const rain = this.st("rain") === "on";
    const temp = parseFloat(this._hass.states[this._e.weather]?.attributes?.temperature);
    const snowy = rain ? Number.isFinite(temp) && temp <= Number(c.snow_below ?? 1) : winter;
    if (snowy) return day ? ["winter_day", "day", "winter_night", "night"] : ["winter_night", "night"];
    if (rain) return day ? ["rain_day", "day", "night"] : ["rain_night", "night"];
    return day ? ["day", "night"] : ["night"];
  }

  _picture() {
    const c = this._config;
    let img = this._variants().map((v) => c[`image_${v}`]).find(Boolean) || "/local/mf-home-monitor/house_night.jpg";
    // No car at the charger — same picture with "_nocar" suffix.
    if (c.no_car_images && !this._plugged()) img = img.replace(/(\.[a-z]+)(\?|$)/i, "_nocar$1$2");
    return img;
  }

  _sceneHTML(k = 1, sheet = false) {
    const L = this._L, [VW, VH] = L.size, t = (x) => this.t(x);
    const img = this._picture();
    const pv = this.num("pv"), home = this.num("home"), ev = this.num("ev"), bat = this.num("battery"), grid = this.num("grid");
    const soc = this.num("soc");
    const charging = this.st("charger") === "on" && ev > 50;
    const plugged = this._plugged();
    const fresh = this._e.data_fresh ? this.st("data_fresh") === "on" : true;
    const anim = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = (a) => a.map((p) => p.join(",")).join(" ");
    const route = (a) => "M" + a.map((p) => p.join(" ")).join(" L");
    const font = 'font-family="Roboto, system-ui, sans-serif"';
    const mtx = (m, [x, y]) => `matrix(${m.join(",")},${x},${y})`;
    // Animation phase from the clock: re-renders would otherwise restart pulses and flows.
    const phase = (d) => `animation-delay:-${((Date.now() / 1000) % d).toFixed(2)}s;`;

    let s = `<svg class="ovl" viewBox="0 0 ${VW} ${VH}" aria-hidden="true">
      <defs>
        <filter id="g4" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="g12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
      </defs>`;

    // Panel rows: glow by power and the power written into the roof plane.
    const names = this._config.pv_names || ["PV 1", "PV 2"];
    const panels = (L.panels || []).map((p, i) => ({ ...p, w: this.num(p.entity), name: p.name ?? names[i] ?? "" }))
      .filter((p) => this.has(p.entity));
    const panelMax = Number(this._config.panel_max_w ?? 2800);
    panels.forEach(({ quad, w }) => {
      if (w < 30) return;
      const g = Math.min(w / panelMax, 1);
      s += `<polygon points="${pts(quad)}" fill="#6aa8ff" opacity="${(0.04 + 0.10 * g).toFixed(2)}" style="mix-blend-mode:screen"/>`;
      s += `<polygon points="${pts(quad)}" fill="${COLORS.solar}" opacity="${(0.05 + 0.16 * g).toFixed(2)}" filter="url(#g12)" style="mix-blend-mode:screen"/>`;
    });
    panels.forEach(({ text, w, name }) => {
      s += `<g transform="${mtx(L.panel_matrix, text)}" ${font} text-anchor="middle">
        <text y="${6 * k}" font-size="${46 * k}" font-weight="700" fill="#000" opacity=".55" filter="url(#g4)">${fmtW(w)}</text>
        <text y="${6 * k}" font-size="${46 * k}" font-weight="700" fill="#fff">${fmtW(w)}</text>
        <text y="${34 * k}" font-size="${17 * k}" font-weight="500" fill="#fff" opacity=".75" letter-spacing="1">${esc(name)}</text></g>`;
    });

    // Energy flows: [route, color, power, reverse]
    const flows = [
      [L.flows.solar, COLORS.solar, pv], [L.flows.grid, COLORS.grid, grid],
      [L.flows.battery, COLORS.battery, Math.abs(bat), bat < 0], [L.flows.home, COLORS.home, home], [L.flows.ev, COLORS.ev, ev],
    ];
    flows.forEach(([r, col, w, rev]) => {
      if (!r || w <= 20) return;
      const d = route(rev ? [...r].reverse() : r);
      const width = 3 + Math.min(w / 1200, 4), dd = Math.max(0.7, 2.6 - w / 2500).toFixed(2);
      s += `<path d="${d}" fill="none" stroke="${col}" stroke-width="${width + 10}" opacity=".35" filter="url(#g4)" stroke-linejoin="round" stroke-linecap="round"/>`;
      s += `<path class="dash" d="${d}" fill="none" stroke="${col}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"
        stroke-dasharray="8 20" style="animation-duration:${dd}s;${phase(dd)}${anim ? "" : "animation:none"}"/>`;
    });

    // Grid power and current above the wire (red above grid_red_amps).
    if (grid > 20 && L.wire_text) {
      const wire = L.wire_text.map(([x, y]) => [x, y - 20 * k]);
      const wc = this.gridOver() ? COLORS.bad : "#9cc4ff";
      const a = this.gridAmps(), label = `◀ ${fmtW(grid)} · ${a < 10 ? a.toFixed(1) : Math.round(a)} A`;
      s += `<path id="wire-text" d="${route(wire)}" fill="none"/>
        <text ${font} font-size="${30 * k}" font-weight="700" letter-spacing="1">
          <textPath href="#wire-text" startOffset="52%" text-anchor="middle" fill="#000" opacity=".6" filter="url(#g4)">${label}</textPath></text>
        <text ${font} font-size="${30 * k}" font-weight="700" letter-spacing="1">
          <textPath href="#wire-text" startOffset="52%" text-anchor="middle" fill="${wc}">${label}</textPath></text>`;
    }

    // Inverter LEDs: green — data fresh, amber — stale
    (L.inverter_leds || []).forEach(([x, y]) => {
      const col = fresh ? COLORS.ok : COLORS.solar;
      s += `<circle cx="${x}" cy="${y}" r="9" fill="${col}" opacity=".5" filter="url(#g4)"/><circle cx="${x}" cy="${y}" r="3.2" fill="${col}"/>`;
    });
    // Battery: pulses green while charging, red while discharging; faster with more power
    if (Math.abs(bat) > 50 && L.battery_outline) {
      const pc = bat > 0 ? COLORS.ok : COLORS.bad;
      const dur = Math.max(0.9, 2.6 - Math.abs(bat) / 1500).toFixed(2);
      s += `<g class="pulse" style="animation-duration:${dur}s;${phase(+dur)}${anim ? "" : "animation:none;opacity:.6"}">
        <polygon points="${pts(L.battery_outline)}" fill="none" stroke="${pc}" stroke-width="22" stroke-linejoin="round" filter="url(#g12)"/>
        <polygon points="${pts(L.battery_outline)}" fill="${pc}" opacity=".18" style="mix-blend-mode:screen"/></g>`;
    }
    if (this.has("soc") && L.battery_text) {
      s += `<g transform="${mtx(L.battery_text_matrix, L.battery_text)}" ${font} text-anchor="middle">
        <text font-size="${21 * Math.min(k, 1.3)}" font-weight="600" fill="#4a5058" opacity=".9">${Math.round(soc)}%</text></g>`;
    }

    // Charger ring, cable and current on the ground
    if (L.charger_ring && (this._e.charger || this._e.charger_status)) {
      const [rx, ry, rw, rh] = L.charger_ring;
      const ring = charging ? COLORS.ok : plugged ? COLORS.solar : "#5d636c";
      const rect = (stroke, width, extra = "") => `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="${rw / 2}" fill="none" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
      s += rect("#1d2127", 7) + rect(ring, 3.5);
      if (plugged) s += rect(ring, 8, `opacity=".55" filter="url(#g4)"`);
    }
    if (charging && L.cable) {
      s += `<path d="${L.cable}" stroke="#4ef0a0" stroke-width="14" fill="none" opacity=".5" filter="url(#g4)"/>
        <path class="dash" d="${L.cable}" stroke="#a6ffd2" stroke-width="3.5" fill="none" stroke-dasharray="8 20" style="${phase(1.4)}${anim ? "" : "animation:none"}"/>`;
    }
    if (charging && L.amps_text && this.has("charger_current")) {
      const amps = `${Math.round(this.num("charger_current"))} A`;
      // Light spot on the ground under the hologram
      if (L.amps_ground) {
        const [gx, gy, grx, gry] = L.amps_ground;
        s += `<ellipse cx="${gx}" cy="${gy}" rx="${grx * k}" ry="${gry * k}" fill="#4ef0a0" opacity=".45" filter="url(#g12)"/>
          <ellipse cx="${gx}" cy="${gy}" rx="${grx * 0.55 * k}" ry="${gry * 0.4 * k}" fill="#a6ffd2" opacity=".35" filter="url(#g4)"/>`;
      }
      s += `<g transform="${mtx(L.amps_text_matrix, L.amps_text)}" ${font} text-anchor="middle">
        <text font-size="${54 * k}" font-weight="700" fill="#4ef0a0" opacity=".7" filter="url(#g4)">${amps}</text>
        <text font-size="${54 * k}" font-weight="700" fill="#d8ffec" stroke="#4ef0a0" stroke-width="1">${amps}</text>
        <text y="${30 * k}" font-size="${21 * k}" font-weight="600" fill="#a6ffd2" opacity=".9">${fmtW(ev)}</text></g>`;
    }
    s += "</svg>";

    // Hotspots and the open info plate
    const spots = this._spots();
    let html = "";
    for (const [key, sp] of Object.entries(spots).filter(([, v]) => v && v.at)) {
      const [x, y] = sp.at;
      html += `<button class="hs ${this._open === key ? "on" : ""}" data-spot="${key}" aria-label="${esc(sp.title)}"
        style="left:${(x / VW * 100).toFixed(2)}%;top:${(y / VH * 100).toFixed(2)}%;--c:${sp.color}"></button>`;
    }
    const sp = spots[this._open];
    let plate = "";
    if (sp) {
      const [x, y] = sp.at;
      const fx = x / VW, below = y / VH < 0.4;
      const tx = fx > 0.72 ? "-100%" : fx < 0.28 ? "0%" : "-50%";
      const ty = below ? "16px" : "calc(-100% - 16px)";
      const pos = sheet ? "" : `left:${(fx * 100).toFixed(2)}%;top:${(y / VH * 100).toFixed(2)}%;transform:translate(${tx}, ${ty})`;
      plate = `<div class="plate ${sheet ? "sheet" : ""}" style="${pos}">
        <div class="pt"><span class="dot" style="background:${sp.color}"></span>${esc(sp.title)}</div>
        <dl>${sp.rows.map(([k2, v]) => k2 ? `<dt>${esc(k2)}</dt><dd>${esc(v)}</dd>` : `<dd class="wide">${esc(v)}</dd>`).join("")}</dl>
        <button class="more" data-entity="${sp.more}">${t("more")}</button></div>`;
    }

    // Temperatures in a free corner of the picture
    const tv = (key) => { const v = parseFloat(this.st(key)); return Number.isFinite(v) ? v : null; };
    const tc = (v, warn, bad) => (v == null ? COLORS.muted : v >= bad ? COLORS.bad : v >= warn ? COLORS.warn : "#e8eaf0");
    const outdoor = this._e.outdoor_temp ? tv("outdoor_temp") : parseFloat(this._hass.states[this._e.weather]?.attributes?.temperature);
    const deg = (v, d = 0) => (v == null || !Number.isFinite(v) ? "—" : `${v.toFixed(d)}°`);
    const bmin = tv("bat_tmin"), bmax = tv("bat_tmax");
    const trow = (key, name, val, color) => `<div class="trow" data-entity="${key}"><span>${esc(name)}</span><b style="color:${color}">${val}</b></div>`;
    const tRows = [
      this.has("t1") && trow("t1", `${t("inverter")} ${names[0]}`, deg(tv("t1")), tc(tv("t1"), 55, 70)),
      this.has("t2") && trow("t2", `${t("inverter")} ${names[1]}`, deg(tv("t2")), tc(tv("t2"), 55, 70)),
      this.has("bat_tmin") && trow("bat_tmin", t("battery"), `${deg(bmin, 1)}–${deg(bmax ?? bmin, 1)}`,
        bmin != null && bmin < 5 ? COLORS.grid : tc(bmax ?? bmin, 40, 50)),
      this.has("charger_temp") && trow("charger_temp", t("ev_charging"), deg(tv("charger_temp")), tc(tv("charger_temp"), 45, 60)),
    ].filter(Boolean).join("");
    const showTemps = this._config.show_temperatures !== false && (Number.isFinite(outdoor) || tRows);
    const temps = showTemps ? `<div class="temps" style="left:${L.temps[0]}%;top:${L.temps[1]}%">
      ${Number.isFinite(outdoor) ? `<div class="tout" data-entity="${this._e.outdoor_temp ? "outdoor_temp" : "weather"}">${deg(outdoor)}<small>${t("outside")}</small></div>` : ""}
      ${tRows}</div>` : "";
    const base = `<img src="${esc(img)}" alt="" width="${VW}" height="${VH}">${s}${sheet ? "" : temps}${html}`;
    return sheet ? { img, inner: base, plate, temps: temps.replace('class="temps"', 'class="temps strip"').replace(/style="left:[^"]*"/, "") }
      : { img, inner: base + plate, plate: "", temps: "" };
  }

  connectedCallback() {
    // Card width decides the mode: narrow (phone) — cropped picture and larger text.
    this._ro = this._ro || new ResizeObserver(([e]) => {
      const narrow = e.contentRect.width < 600;
      if (narrow !== this._narrow) { this._narrow = narrow; if (this._hass) this._render(); }
    });
    this._ro.observe(this);
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._closeFull();
  }

  _render() {
    const [VW, VH] = this._L.size, c = this._config;
    const fit = Number(c.fit_offset ?? 170);
    const narrow = !!this._narrow && c.phone_crop !== false;
    const frameless = !!c.frameless;
    const { img, inner, plate, temps } = this._sceneHTML(narrow ? 1.5 : 1, narrow);
    // Phone crop: show only the part of the picture with the house.
    const [cx0, cy0, cx1, cy1] = this._L.phone_crop;
    const cw = cx1 - cx0, ch = cy1 - cy0;
    const fsIcon = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 5h5v2H7v3H5V5zm9 0h5v5h-2V7h-3V5zM5 14h2v3h3v2H5v-5zm12 3v-3h2v5h-5v-2h3z"/></svg>`;
    this.shadowRoot.innerHTML = `
      <style>
        ${SCENE_CSS}
        :host { display: block; }
        ha-card { overflow: hidden; padding: 0; position: relative; }
        ha-card.frameless { background: none; border: none; box-shadow: none; }
        .bg { position: absolute; inset: 0; background: center / cover no-repeat; filter: blur(36px) brightness(.75); transform: scale(1.25); }
        .crop { position: relative; }
        .narrow .crop { overflow: hidden; aspect-ratio: ${cw} / ${ch}; }
        .narrow .crop .scene { width: ${(VW / cw * 100).toFixed(2)}%; margin-left: -${(cx0 / cw * 100).toFixed(2)}%; margin-top: -${(cy0 / cw * 100).toFixed(2)}%; }
        .temps.strip { position: static; display: flex; flex-wrap: wrap; align-items: baseline; justify-content: center;
          gap: 4px 14px; padding: 6px 10px 2px; font-size: 12.5px; text-shadow: none; }
        .temps.strip .tout { font-size: 22px; font-weight: 400; }
        .temps.strip .tout small { display: inline; font-size: 11px; text-transform: none; letter-spacing: 0; margin: 0 0 0 5px; }
        .temps.strip .trow { gap: 5px; padding: 0; }
        .narrow .hs { width: 14px; height: 14px; border-width: 2px; box-shadow: 0 0 0 2px rgba(255, 255, 255, .25), 0 1px 4px rgba(0, 0, 0, .5); }
        .narrow .hs::after { inset: -6px; border-width: 1.5px; }
        .narrow .hs::before { content: ""; position: absolute; inset: -12px; border-radius: 50%; }
        .fsb { position: absolute; right: 10px; bottom: 10px; z-index: 3; width: 38px; height: 38px; border-radius: 50%; padding: 8px;
          border: 1px solid rgba(255, 255, 255, .15); background: rgba(17, 19, 24, .75); color: #fff; cursor: pointer; }
        .fsb svg { width: 100%; height: 100%; display: block; }
        .calsvg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; font-family: sans-serif; }
        .calmode .hs, .calmode .plate { pointer-events: none; opacity: .35; }
        .calmode .scene { cursor: crosshair; }
        .wiz { display: grid; gap: 8px; padding: 12px; margin: 8px; border-radius: 12px; background: rgba(17,19,24,.92);
          border: 1px solid #ffd36b55; color: #e8eaf0; font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif); }
        .wh { display: flex; justify-content: space-between; color: #ffd36b; font-size: 13px; }
        .wt { font-size: 16px; font-weight: 600; } .wd { font-size: 13px; color: #9aa1ad; }
        .wbs { display: flex; flex-wrap: wrap; gap: 6px; }
        .wb { padding: 7px 12px; border-radius: 8px; border: 1px solid #ffffff22; background: #252933; color: #e8eaf0; font: inherit; font-size: 13px; cursor: pointer; }
        .wb:disabled { opacity: .4; cursor: default; }
        .wb[data-cal="copy"] { background: #ffd36b; color: #111; border-color: #ffd36b; font-weight: 600; }
        .wy { width: 100%; box-sizing: border-box; background: #0c0e12; color: #c9ced6; border: 1px solid #ffffff1a; border-radius: 8px;
          font: 12px/1.4 ui-monospace, monospace; padding: 8px; resize: vertical; }
        /* Desktop: the whole picture fits the window; fit_offset — height of everything above and below */
        @media (min-width: 768px) { ha-card:not(.narrow) .scene { width: min(100%, calc((100vh - ${fit}px) * ${(VW / VH).toFixed(4)})); } }
      </style>
      <ha-card class="${narrow ? "narrow" : ""} ${frameless ? "frameless" : ""} ${c.calibrate ? "calmode" : ""}">${frameless ? "" : `<div class="bg" style="background-image:url('${esc(img)}')"></div>`}
        <div class="crop"><div class="scene">${inner}${c.calibrate ? this._calMarks() : ""}</div>
          ${narrow && !c.calibrate ? `<button class="fsb" aria-label="${this.t("fullscreen")}">${fsIcon}</button>` : ""}</div>${temps}${c.calibrate ? this._calHTML() : plate}</ha-card>`;
    if (c.calibrate) {
      this.shadowRoot.querySelectorAll("[data-cal]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); this._calAction(b.dataset.cal, this.shadowRoot); }));
      // Picture size for the layout: taken from the real image file.
      const im = this.shadowRoot.querySelector(".scene img");
      const grab = () => {
        const sz = [im.naturalWidth, im.naturalHeight];
        if (sz[0] && (sz[0] !== this._L.size[0] || sz[1] !== this._L.size[1])) { this._calState.size = sz; this._calSave(); }
      };
      im.complete ? grab() : im.addEventListener("load", grab, { once: true });
    }
    this._bindScene(this.shadowRoot);
    this.shadowRoot.querySelector(".fsb")?.addEventListener("click", (e) => { e.stopPropagation(); this._openFull(); });
    if (this._full) this._renderFull();
  }

  _bindScene(root) {
    root.querySelectorAll(".hs").forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      this._open = this._open === b.dataset.spot ? null : b.dataset.spot;
      this._render();
    }));
    root.querySelector(".plate")?.addEventListener("click", (e) => e.stopPropagation());
    const scene = root.querySelector(".scene");
    scene.addEventListener("click", (e) => {
      if (this._config.calibrate) {
        // Wizard: picture coordinates of the tap
        const r = scene.querySelector("img").getBoundingClientRect(), [VW, VH] = this._L.size;
        this._calTap(Math.round((e.clientX - r.left) / r.width * VW), Math.round((e.clientY - r.top) / r.height * VH));
        return;
      }
      if (this._open) { this._open = null; this._render(); }
    });
    root.querySelectorAll("[data-entity]").forEach((el) => el.addEventListener("click", () => {
      this._closeFull();
      this.moreInfo(el.dataset.entity);
    }));
  }

  // ─── Full screen: overlay in body; in portrait the scene is rotated sideways ───
  _openFull() {
    this._full = document.createElement("div");
    this._full.attachShadow({ mode: "open" });
    document.body.appendChild(this._full);
    this._onResize = () => this._renderFull();
    window.addEventListener("resize", this._onResize);
    this._renderFull();
  }

  _closeFull() {
    if (!this._full) return;
    window.removeEventListener("resize", this._onResize);
    this._full.remove();
    this._full = null;
  }

  _renderFull() {
    const portrait = window.innerHeight > window.innerWidth;
    const { inner } = this._sceneHTML(1, false);
    const [VW, VH] = this._L.size, r = VW / VH;
    const w = portrait ? `min(100dvh, ${(r * 100).toFixed(2)}dvw)` : `min(100dvw, ${(r * 100).toFixed(2)}dvh)`;
    this._full.shadowRoot.innerHTML = `
      <style>
        ${SCENE_CSS}
        .wrap { position: fixed; inset: 0; z-index: 10000; background: #05070c; overflow: hidden; }
        .wrap > .scene { position: absolute; left: 50%; top: 50%; width: ${w};
          transform: translate(-50%, -50%)${portrait ? " rotate(90deg)" : ""}; }
        .close { position: absolute; top: 8px; right: 8px; z-index: 3; width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, .2); background: rgba(17, 19, 24, .8); color: #fff; font-size: 20px; cursor: pointer; }
      </style>
      <div class="wrap"><div class="scene">${inner}<button class="close" aria-label="${this.t("close")}">✕</button></div></div>`;
    this._full.shadowRoot.querySelector(".close").addEventListener("click", (e) => { e.stopPropagation(); this._closeFull(); });
    this._bindScene(this._full.shadowRoot);
  }
}

// Shared scene styles: the card and the full-screen overlay.
const SCENE_CSS = `
  .scene { position: relative; container-type: inline-size; line-height: 1.25; margin-inline: auto;
    font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif); }
  .scene img { display: block; width: 100%; height: auto; }
  .ovl { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
  .dash { animation: flow linear infinite; animation-duration: 1.4s; }
  @keyframes flow { to { stroke-dashoffset: -56; } }
  .pulse { animation: glow ease-in-out infinite; }
  @keyframes glow { 0%, 100% { opacity: .25; } 50% { opacity: 1; } }
  .hs { position: absolute; width: clamp(14px, 2.2cqi, 22px); height: clamp(14px, 2.2cqi, 22px); padding: 0;
    transform: translate(-50%, -50%); border-radius: 50%; cursor: pointer;
    background: rgba(255, 255, 255, .92); border: 3px solid var(--c); box-shadow: 0 0 0 4px rgba(255, 255, 255, .22), 0 2px 8px rgba(0, 0, 0, .5); }
  .hs::after { content: ""; position: absolute; inset: -9px; border-radius: 50%; border: 2px solid var(--c); opacity: 0;
    animation: pulse 2.4s ease-out infinite; }
  .hs.on { background: var(--c); }
  .hs:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
  @keyframes pulse { 0% { transform: scale(.6); opacity: .8; } 100% { transform: scale(1.6); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) { .dash, .hs::after, .pulse { animation: none; } }
  .temps { position: absolute; display: grid; gap: .35em; color: #e8eaf0; cursor: default;
    font-size: clamp(10px, 1.25cqi, 15px); text-shadow: 0 1px 6px rgba(0, 0, 0, .7); }
  .tout { font-size: 4.4em; font-weight: 300; line-height: .95; letter-spacing: -.02em; cursor: pointer; font-variant-numeric: tabular-nums; }
  .tout small { display: block; font-size: .2em; font-weight: 400; letter-spacing: .08em; text-transform: uppercase; color: #9aa1ad; margin: .5em 0 .4em .2em; }
  .trow { display: flex; justify-content: space-between; gap: 1.6em; cursor: pointer; padding-left: .15em; }
  .trow span { color: #9aa1ad; }
  .trow b { font-weight: 600; font-variant-numeric: tabular-nums; }
  .plate { position: absolute; z-index: 2; min-width: 190px; max-width: 72%; padding: 10px 12px; border-radius: 14px; color: #e8eaf0;
    background: rgba(17, 19, 24, .9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, .1); box-shadow: 0 8px 24px rgba(0, 0, 0, .45); }
  .plate.sheet { position: relative; margin: 8px; max-width: none; min-width: 0; }
  .pt { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; margin-bottom: 6px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
  dl { display: grid; grid-template-columns: auto auto; gap: 3px 16px; margin: 0; font-size: 13px; }
  dt { color: #9aa1ad; }
  dd { margin: 0; text-align: right; font-variant-numeric: tabular-nums; font-weight: 500; }
  dd.wide { grid-column: 1 / -1; text-align: left; color: #c9ced6; font-weight: 400; }
  .more { margin-top: 8px; padding: 0; border: 0; background: none; color: #8ab4ff; font: inherit; font-size: 13px; cursor: pointer; }
`;

// ─── "Now" ───────────────────────────────────────────────────────────────────

const ICONS = {
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5 1.5 3h-3L12 2zm0 20-1.5-3h3L12 22zM2 12l3-1.5v3L2 12zm20 0-3 1.5v-3l3 1.5zM4.9 4.9l3.2 1.1-2.1 2.1-1.1-3.2zm14.2 14.2-3.2-1.1 2.1-2.1 1.1 3.2zM4.9 19.1 6 15.9 8.1 18l-3.2 1.1zM19.1 4.9 18 8.1 15.9 6l3.2-1.1z",
  home: "M12 3 2 12h3v8h5v-6h4v6h5v-8h3L12 3z",
  grid: "M8.3 2h7.4l1.6 6H20v2h-2.1l2.9 12h-2.1l-.9-3.8L12 22l-5.8-3.8-.9 3.8H3.2L6.1 10H4V8h2.7l1.6-6zm1.6 2-.6 4h5.4l-.6-4H9.9zm-1.4 6-.9 4.4L12 17l4.4-2.6-.9-4.4h-7z",
  bat: "M16 4h-2V2h-4v2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H8V6h8v14zm-7-4h6v3H9v-3zm0-4h6v3H9v-3z",
};

class MfNowCard extends MfBase {
  static getStubConfig() { return { entities: {} }; }
  getCardSize() { return 4; }

  _render() {
    const c = this._config, t = (k) => this.t(k);
    const limit = c.grid_limit ?? 4000, max = c.grid_max ?? 5750;
    const socStop = c.soc_stop ?? 20, socSafe = c.soc_safe ?? 30;
    const pv = this.num("pv"), home = this.num("home"), grid = this.num("grid"), bat = this.num("battery"), soc = this.num("soc");
    const gridCol = grid > limit ? COLORS.bad : grid > limit * 0.75 ? COLORS.warn : COLORS.grid;
    const socCol = soc < socSafe ? COLORS.bad : soc < socSafe + 10 ? COLORS.warn : COLORS.battery;
    const ic = (name, color, size) =>
      `<div class="ic" style="width:${size}px;height:${size}px;background:color-mix(in srgb, ${color} 18%, transparent);color:${color}">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="${ICONS[name]}"/></svg></div>`;
    const big = (w) => { const [v, u] = fmtW(w).split(" "); return `${v}<u>${u}</u>`; };

    this.shadowRoot.innerHTML = `
      <style>
        ha-card { padding: 14px; display: grid; gap: 14px; font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif); }
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .tile { display: flex; gap: 12px; align-items: center; min-width: 0; }
        .ic { flex: none; border-radius: 50%; display: grid; place-items: center; }
        .ic svg { width: 55%; height: 55%; }
        .big { font-size: 22px; font-weight: 500; font-variant-numeric: tabular-nums; color: var(--primary-text-color); }
        .big u { text-decoration: none; font-size: 13px; color: var(--secondary-text-color); font-weight: 400; margin-left: 3px; }
        .sub { color: var(--secondary-text-color); font-size: 12.5px; margin-top: 2px; }
        .row { display: flex; align-items: center; gap: 10px; }
        .head { display: flex; justify-content: space-between; font-size: 13px; color: var(--primary-text-color); }
        .head b { font-weight: 500; font-variant-numeric: tabular-nums; }
        .meter { position: relative; height: 6px; border-radius: 3px; background: var(--divider-color, #2e333d); margin-top: 6px; }
        .meter > span { position: absolute; inset: 0 auto 0 0; border-radius: 3px; }
        .meter i { position: absolute; top: -4px; width: 2px; height: 14px; background: var(--primary-text-color); opacity: .55; }
        .lbl { display: flex; justify-content: space-between; color: var(--secondary-text-color); font-size: 11px; margin-top: 4px; font-variant-numeric: tabular-nums; }
        .click { cursor: pointer; }
        .chg .ic, .dis .ic { animation: halo var(--pdur) ease-in-out infinite; }
        .chg .ic { --h: ${COLORS.ok}; } .dis .ic { --h: ${COLORS.bad}; }
        @keyframes halo { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--h) 0%, transparent); }
          50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--h) 35%, transparent), 0 0 14px color-mix(in srgb, var(--h) 55%, transparent); } }
        @media (prefers-reduced-motion: reduce) { .chg .ic, .dis .ic { animation: none; } }
      </style>
      <ha-card>
        <div class="g2">
          <div class="tile click" data-entity="pv">${ic("sun", COLORS.solar, 40)}<div><div class="big">${big(pv)}</div><div class="sub">${t("solar_today")}${this.has("yield") ? ` · ${this.st("yield")} kWh` : ""}</div></div></div>
          <div class="tile click" data-entity="home">${ic("home", COLORS.home, 40)}<div><div class="big">${big(home)}</div><div class="sub">${t("home_sub")}</div></div></div>
        </div>
        <div class="row click" data-entity="grid">${ic("grid", gridCol, 32)}<div style="flex:1;min-width:0">
          <div class="head"><span>${t("grid")}</span><b>${fmtW(grid)}</b></div>
          <div class="meter"><span style="width:${Math.min(grid / max * 100, 100)}%;background:${gridCol}"></span><i style="left:${limit / max * 100}%"></i></div>
          <div class="lbl"><span>0</span><span>${t("limit")} ${(limit / 1000).toFixed(1)} kW · ${t("input")} ${(max / 1000).toFixed(2)} kW</span></div>
        </div></div>
        <div class="row click ${Math.abs(bat) > 50 ? (bat > 0 ? "chg" : "dis") : ""}" data-entity="soc" style="--pdur:${Math.max(0.9, 2.6 - Math.abs(bat) / 1500).toFixed(2)}s">${ic("bat", bat < -50 ? COLORS.bad : COLORS.battery, 32)}<div style="flex:1;min-width:0">
          <div class="head"><span>${t("battery")} ${Math.round(soc)}%</span><b style="color:${bat >= 0 ? COLORS.battery : COLORS.warn}">${bat >= 0 ? "+" : "−"}${fmtW(Math.abs(bat))} ${t(bat >= 0 ? "charge_w" : "discharge_w")}</b></div>
          <div class="meter"><span style="width:${Math.max(0, Math.min(soc, 100))}%;background:${socCol}"></span><i style="left:${socStop}%"></i><i style="left:${socSafe}%"></i></div>
          <div class="lbl"><span>${t("stop")} ${socStop}% · ${t("protect")} ${socSafe}%</span><span>${this.has("voltage") ? `${this.st("voltage")} V` : ""}</span></div>
        </div></div>
      </ha-card>`;
    this.bindMoreInfo();
  }
}

// ─── Badges ──────────────────────────────────────────────────────────────────

class MfBadgesCard extends MfBase {
  static getStubConfig() { return { items: [] }; }
  getCardSize() { return 1; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }

  setConfig(config) {
    super.setConfig(config);
    this._items = this._config.items || [];
    this._e = Object.fromEntries(this._items.flatMap((it, i) =>
      [[i, it.entity || it.entities?.[0]], ...(it.entities || []).map((e, j) => [`${i}_${j}`, e])]));
  }

  _render() {
    const n = (id) => { const v = parseFloat(this._hass.states[id]?.state); return Number.isFinite(v) ? v : null; };
    const fmt = (it) => {
      // format: "self" — self-sufficiency from [consumption, import]; otherwise {0}, {1} — values of entities
      const v = (it.entities || []).map(n);
      if (it.format === "self") return v[0] > 0 ? `${Math.round((1 - (v[1] ?? 0) / v[0]) * 100)}%` : "—";
      return it.format.replace(/\{(\d)\}/g, (_, k) => (v[k] == null ? "—" : v[k].toFixed(it.decimals ?? 1)));
    };
    const pill = (it, i) => {
      const so = this._hass.states[it.entity || it.entities?.[0]];
      const raw = so?.state;
      if (it.show_states && !it.show_states.includes(raw)) return "";
      const value = it.format ? fmt(it) : it.states?.[raw]
        ?? (so && this._hass.formatEntityState ? this._hass.formatEntityState(so) : `${raw ?? "—"} ${so?.attributes?.unit_of_measurement ?? ""}`);
      const color = (it.state_colors && it.state_colors[raw]) || it.color || COLORS.muted;
      return `<button class="pill" data-entity="${i}" style="--c:${color}">
        <span class="ic"><ha-icon icon="${esc(it.icon || so?.attributes?.icon || "mdi:information-outline")}"></ha-icon></span>
        <span class="tx"><span class="n">${esc(it.name || so?.attributes?.friendly_name || it.entity)}</span><span class="v">${esc(value)}</span></span></button>`;
    };
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; padding: 2px 0;
          font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif); }
        .pill { display: inline-flex; align-items: center; gap: 10px; height: 48px; padding: 0 18px 0 7px; border-radius: 24px; cursor: pointer;
          background: var(--ha-card-background, var(--card-background-color, #1c1f26)); border: 1px solid var(--divider-color, rgba(255,255,255,.1));
          color: var(--primary-text-color); font: inherit; }
        .pill:hover { border-color: var(--c); }
        .pill:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
        .ic { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: var(--c);
          background: color-mix(in srgb, var(--c) 20%, transparent); --mdc-icon-size: 20px; }
        .tx { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.15; }
        .n { font-size: 12px; color: var(--secondary-text-color); }
        .v { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
        @media (max-width: 600px) {
          .row { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; padding: 2px 2px 4px; }
          .row::-webkit-scrollbar { display: none; }
          .pill { flex: none; height: 40px; padding-right: 12px; gap: 7px; } .ic { width: 28px; height: 28px; --mdc-icon-size: 16px; }
          .n { font-size: 10.5px; } .v { font-size: 13px; } }
      </style>
      <div class="row">${this._items.map(pill).join("")}</div>`;
    this.bindMoreInfo();
  }
}

// ─── Charts ──────────────────────────────────────────────────────────────────

const CHART_CSS = `
  :host { display: block; }
  ha-card { padding: 12px 12px 8px; font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif); }
  .legend { display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 2px 4px 8px; font-size: 12.5px; color: var(--secondary-text-color); }
  .legend span { display: inline-flex; align-items: center; gap: 6px; }
  .legend i { width: 12px; height: 4px; border-radius: 2px; display: inline-block; }
  .legend b { color: var(--primary-text-color); font-weight: 500; font-variant-numeric: tabular-nums; }
  .wrap { position: relative; touch-action: pan-y; }
  svg { display: block; width: 100%; font-family: inherit; overflow: visible; }
  .tip { position: absolute; top: 4px; pointer-events: none; z-index: 2; min-width: 150px; padding: 8px 10px; border-radius: 10px;
    background: rgba(17, 19, 24, .94); border: 1px solid rgba(255, 255, 255, .1); box-shadow: 0 6px 18px rgba(0, 0, 0, .4);
    color: #e8eaf0; font-size: 12.5px; }
  .tip .h { color: #9aa1ad; margin-bottom: 4px; font-variant-numeric: tabular-nums; }
  .tip .r { display: flex; align-items: center; gap: 7px; justify-content: space-between; }
  .tip .r span { display: inline-flex; align-items: center; gap: 6px; color: #c9ced6; }
  .tip .r i { width: 8px; height: 8px; border-radius: 50%; }
  .tip .r b { font-weight: 600; font-variant-numeric: tabular-nums; }
  .empty { color: var(--secondary-text-color); font-size: 13px; padding: 24px 4px; text-align: center; }
`;

class MfChartBase extends MfBase {
  connectedCallback() {
    // Block right away: otherwise the element is inline with zero width and never draws.
    this.style.display = "block";
    this._ro = this._ro || new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      if (w && w !== this._w) { this._w = w; this._draw(); }
    });
    this._ro.observe(this);
    this._timer = setInterval(() => this._load(), (this._config?.refresh_minutes ?? 5) * 60000);
  }
  disconnectedCallback() { this._ro?.disconnect(); clearInterval(this._timer); }
  set hass(hass) {
    this._hass = hass;
    if (!this._loaded) { this._loaded = true; this._load(); }
  }
  getGridOptions() { return { columns: "full", rows: "auto" }; }
  _width() {
    if (!this._w) this._w = Math.round(this.getBoundingClientRect().width) || 0;
    return this._w;
  }
  _shell(legend, body) {
    this.shadowRoot.innerHTML = `<style>${CHART_CSS}</style><ha-card><div class="legend">${legend}</div><div class="wrap">${body}<div class="tip" hidden></div></div></ha-card>`;
  }
  _bindHover(n, xOf, tipHtml, cursor) {
    const wrap = this.shadowRoot.querySelector(".wrap"), tip = this.shadowRoot.querySelector(".tip");
    const svg = wrap.querySelector("svg"), cur = svg.querySelector(".cursor");
    const hide = () => { tip.hidden = true; cur.style.display = "none"; };
    const move = (ev) => {
      const r = svg.getBoundingClientRect();
      const i = xOf(ev.clientX - r.left);
      if (i == null) return hide();
      const html = tipHtml(i);
      if (!html) return hide();
      tip.innerHTML = html; tip.hidden = false;
      const x = cursor(i);
      cur.setAttribute("x1", x); cur.setAttribute("x2", x); cur.style.display = "";
      const tw = tip.offsetWidth;
      tip.style.left = `${Math.min(Math.max(x + 12 > r.width - tw ? x - tw - 12 : x + 12, 0), r.width - tw)}px`;
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerdown", move);
    svg.addEventListener("pointerleave", hide);
  }
}

class MfDayChart extends MfChartBase {
  static getStubConfig() { return { entities: {} }; }
  getCardSize() { return 5; }
  _render() {}   // data comes from history, not from every state change

  async _load() {
    if (!this._hass) return;
    const day0 = new Date(); day0.setHours(0, 0, 0, 0);
    const keys = ["pv", "ev", "load", "grid", "soc"].filter((k) => this._e[k]);
    const ids = keys.map((k) => this._e[k]);
    try {
      const res = await this._hass.callWS({
        type: "history/history_during_period", start_time: day0.toISOString(), end_time: new Date().toISOString(),
        entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false,
      });
      const step = 300, n = 288, t0 = day0.getTime() / 1000, now = Date.now() / 1000;
      const last = Math.floor((now - t0) / step);
      this._series = {};
      keys.forEach((k, idx) => {
        const pts = (res[ids[idx]] || []).map((p) => [p.lu ?? p.lc, parseFloat(p.s)]).filter(([t, v]) => t && Number.isFinite(v));
        const out = new Array(n).fill(null);
        let j = 0, carry = null;
        for (let b = 0; b <= Math.min(last, n - 1); b++) {
          const a = t0 + b * step, z = a + step, acc = [];
          while (j < pts.length && pts[j][0] < z) { if (pts[j][0] >= a) acc.push(pts[j][1]); carry = pts[j][1]; j++; }
          out[b] = acc.length ? acc.reduce((x, y) => x + y, 0) / acc.length : carry;
        }
        this._series[k] = out;
      });
      this._last = last;
    } catch (e) {
      this._err = e.message || String(e);
    }
    this._draw();
  }

  _draw() {
    if (!this._series || !this._width()) {
      if (this._err) this._shell("", `<div class="empty">${this.t("no_history")}: ${esc(this._err)}</div>`);
      return;
    }
    const S = this._series, W = this._w, H = this._config.height ?? 230, t = (k) => this.t(k);
    const L = 30, R = 36, T = 18, B = 22, pw = W - L - R, ph = H - T - B, N = 288;
    const vals = ["pv", "ev", "load", "grid"].flatMap((k) => S[k] || []).filter((v) => v != null);
    const top = Math.max(1, Math.ceil(Math.max(...vals, 0) / 1000));
    const X = (i) => L + pw * (i + 0.5) / N, Y = (w) => T + ph - ph * (w / 1000) / top, Ys = (p) => T + ph - ph * p / 100;
    const muted = "var(--secondary-text-color)", line = "var(--divider-color, rgba(128,128,128,.25))";
    const series = [
      { k: "pv", name: t("solar"), c: COLORS.solar, area: .22 }, { k: "ev", name: t("car"), c: COLORS.ev, area: .28 },
      { k: "load", name: t("consumption"), c: COLORS.home }, { k: "grid", name: t("grid"), c: COLORS.grid, dash: "5 4" },
      { k: "soc", name: "SOC", c: COLORS.battery, soc: true },
    ].filter((sr) => S[sr.k]);
    let s = `<svg viewBox="0 0 ${W} ${H}" height="${H}">`;
    const stepKw = top > 6 ? 2 : 1;
    for (let k = 0; k <= top; k += stepKw) {
      s += `<line x1="${L}" x2="${W - R}" y1="${Y(k * 1000)}" y2="${Y(k * 1000)}" stroke="${line}"/>`;
      s += `<text x="${L - 6}" y="${Y(k * 1000) + 4}" text-anchor="end" font-size="11" fill="${muted}">${k}</text>`;
    }
    s += `<text x="${L - 6}" y="9" text-anchor="end" font-size="10.5" fill="${muted}">kW</text>`;
    if (S.soc) [0, 50, 100].forEach((p) => s += `<text x="${W - R + 6}" y="${Ys(p) + 4}" font-size="11" fill="${COLORS.battery}">${p}%</text>`);
    const hours = pw < 420 ? 6 : 3;
    for (let h = 0; h <= 24; h += hours) s += `<text x="${L + pw * h / 24}" y="${H - 5}" text-anchor="middle" font-size="11" fill="${muted}">${String(h).padStart(2, "0")}:00</text>`;
    const pts = (arr, f) => arr.map((v, i) => (v == null ? null : [X(i), f(v)])).filter(Boolean);
    for (const sr of series) {
      const p = pts(S[sr.k], sr.soc ? Ys : Y);
      if (!p.length) continue;
      const poly = p.map((q) => q.map((v) => v.toFixed(1)).join(",")).join(" ");
      if (sr.area) s += `<path d="M${p[0][0]} ${Y(0)} L${poly.replace(/ /g, " L")} L${p[p.length - 1][0]} ${Y(0)} Z" fill="${sr.c}" fill-opacity="${sr.area}"/>`;
      s += `<polyline points="${poly}" fill="none" stroke="${sr.c}" stroke-width="${sr.soc ? 2 : 1.8}" stroke-linejoin="round" ${sr.dash ? `stroke-dasharray="${sr.dash}"` : ""}/>`;
    }
    const xn = X(this._last);
    s += `<line x1="${xn}" x2="${xn}" y1="${T}" y2="${T + ph}" stroke="var(--primary-text-color)" stroke-opacity=".3" stroke-dasharray="2 3"/>`;
    s += `<line class="cursor" y1="${T}" y2="${T + ph}" stroke="var(--primary-text-color)" stroke-opacity=".55" style="display:none"/>`;
    s += `<rect x="${L}" y="${T}" width="${pw}" height="${ph}" fill="transparent"/></svg>`;
    const lastVal = (k) => { const a = S[k]; for (let i = a.length - 1; i >= 0; i--) if (a[i] != null) return a[i]; return 0; };
    const legend = series.map((sr) => `<span><i style="background:${sr.c}"></i>${sr.name} <b>${sr.soc ? Math.round(lastVal(sr.k)) + "%" : fmtW(lastVal(sr.k))}</b></span>`).join("");
    this._shell(legend, s);
    this._bindHover(N, (x) => { const i = Math.floor((x - L) / pw * N); return i >= 0 && i <= this._last ? i : null; },
      (i) => {
        const tm = `${String(Math.floor(i * 5 / 60)).padStart(2, "0")}:${String(i * 5 % 60).padStart(2, "0")}`;
        return `<div class="h">${tm}</div>` + series.map((sr) => { const v = S[sr.k][i]; return v == null ? "" :
          `<div class="r"><span><i style="background:${sr.c}"></i>${sr.name}</span><b>${sr.soc ? Math.round(v) + "%" : fmtW(v)}</b></div>`; }).join("");
      }, X);
  }
}

class MfDaysChart extends MfChartBase {
  static getStubConfig() { return { entities: {} }; }
  getCardSize() { return 5; }
  _render() {}

  async _load() {
    if (!this._hass) return;
    const days = this._config.days ?? 14;
    const end = new Date(); end.setHours(24, 0, 0, 0);
    const start = new Date(end); start.setDate(start.getDate() - days);
    const keys = ["yield", "consumption", "import", "ev_today"].filter((k) => this._e[k]), ids = keys.map((k) => this._e[k]);
    try {
      // "state" for daily counters: value at the end of the day (`change` overcounts on counter resets).
      const res = await this._hass.callWS({
        type: "recorder/statistics_during_period", start_time: start.toISOString(), end_time: end.toISOString(),
        statistic_ids: ids, period: "day", types: ["state"],
      });
      const rows = [];
      for (let d = 0; d < days; d++) {
        const t = new Date(start); t.setDate(t.getDate() + d);
        rows.push({ t, v: {} });
      }
      keys.forEach((k, idx) => (res[ids[idx]] || []).forEach((p) => {
        const ts = typeof p.start === "number" ? p.start : Date.parse(p.start);
        const d = Math.round((ts - start.getTime()) / 86400000);
        if (rows[d] && p.state != null) rows[d].v[k] = p.state;
      }));
      // Today is not closed in statistics yet — take the live counters
      const today = rows[rows.length - 1];
      keys.forEach((k) => { const v = this.num(k); if (v) today.v[k] = v; });
      this._rows = rows;
      this._keys = keys;
    } catch (e) {
      this._err = e.message || String(e);
    }
    this._draw();
  }

  _draw() {
    if (!this._rows || !this._width()) {
      if (this._err) this._shell("", `<div class="empty">${this.t("no_stats")}: ${esc(this._err)}</div>`);
      return;
    }
    const rows = this._rows, W = this._w, H = this._config.height ?? 220, t = (k) => this.t(k);
    const L = 30, R = 6, T = 10, B = 22, pw = W - L - R, ph = H - T - B;
    const bars = [
      { k: "yield", name: t("solar"), c: COLORS.solar }, { k: "consumption", name: t("consumption"), c: COLORS.home },
      { k: "import", name: t("from_grid"), c: COLORS.grid }, { k: "ev_today", name: t("to_car"), c: COLORS.ev },
    ].filter((b) => this._keys.includes(b.k));
    const max = Math.max(...rows.flatMap((r) => bars.map((b) => r.v[b.k] ?? 0)), 1);
    const stepV = max > 40 ? 20 : 10, top = Math.ceil(max / stepV) * stepV;
    const bw = pw / rows.length, Y = (v) => T + ph - ph * v / top;
    const muted = "var(--secondary-text-color)", line = "var(--divider-color, rgba(128,128,128,.25))";
    let s = `<svg viewBox="0 0 ${W} ${H}" height="${H}">`;
    for (let v = 0; v <= top; v += stepV) {
      s += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" stroke="${line}"/>`;
      s += `<text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="${muted}">${v}</text>`;
    }
    const every = bw < 34 ? 2 : 1;
    const group = bw * 0.78, one = group / Math.max(bars.length, 1), rr = Math.min(3, one / 3);
    rows.forEach(({ t: day, v }, i) => {
      const x0 = L + i * bw + (bw - group) / 2;
      bars.forEach((b, j) => {
        const val = v[b.k];
        if (!val) return;
        const x = x0 + j * one + 0.75, w = Math.max(one - 1.5, 1), y = Y(val);
        s += `<path d="M${x} ${Y(0)} V${y + rr} Q${x} ${y} ${x + rr} ${y} H${x + w - rr} Q${x + w} ${y} ${x + w} ${y + rr} V${Y(0)} Z" fill="${b.c}"/>`;
      });
      if (i % every === (rows.length - 1) % every)
        s += `<text x="${L + i * bw + bw / 2}" y="${H - 5}" text-anchor="middle" font-size="11" fill="${muted}" ${i === rows.length - 1 ? 'font-weight="600"' : ""}>${day.toLocaleDateString(this.locale, { day: "2-digit", month: "2-digit" })}</text>`;
    });
    s += `<line class="cursor" y1="${T}" y2="${T + ph}" stroke="var(--primary-text-color)" stroke-opacity=".08" stroke-width="${bw}" style="display:none"/>`;
    s += `<rect x="${L}" y="${T}" width="${pw}" height="${ph}" fill="transparent"/></svg>`;
    const today = rows[rows.length - 1].v;
    const kwh = (x) => (x == null ? "—" : `${x.toFixed(1)} kWh`);
    const legend = `<span>${t("today_colon")}</span>` + bars.map((b) => `<span><i style="background:${b.c}"></i>${b.name} <b>${kwh(today[b.k])}</b></span>`).join("");
    this._shell(legend, s);
    this._bindHover(rows.length, (x) => { const i = Math.floor((x - L) / bw); return i >= 0 && i < rows.length ? i : null; },
      (i) => {
        const { t: day, v } = rows[i];
        const r = (c, n, val) => `<div class="r"><span><i style="background:${c}"></i>${n}</span><b>${val}</b></div>`;
        return `<div class="h">${day.toLocaleDateString(this.locale, { weekday: "short", day: "numeric", month: "long" })}</div>`
          + bars.map((b) => r(b.c, b.name, kwh(v[b.k]))).join("");
      }, (i) => L + i * bw + bw / 2);
  }
}

// ─── Registration ────────────────────────────────────────────────────────────

customElements.get("mf-house-card") || customElements.define("mf-house-card", MfHouseCard);
customElements.get("mf-now-card") || customElements.define("mf-now-card", MfNowCard);
customElements.get("mf-badges-card") || customElements.define("mf-badges-card", MfBadgesCard);
customElements.get("mf-day-chart") || customElements.define("mf-day-chart", MfDayChart);
customElements.get("mf-days-chart") || customElements.define("mf-days-chart", MfDaysChart);
window.customCards = window.customCards || [];
window.customCards.push(
  { type: "mf-house-card", name: "MF House", description: "Rendered house with live energy flows", preview: false },
  { type: "mf-now-card", name: "MF Now", description: "Solar, home, grid and battery right now" },
  { type: "mf-badges-card", name: "MF Badges", description: "Row of large badges" },
  { type: "mf-day-chart", name: "MF Day Chart", description: "Power today" },
  { type: "mf-days-chart", name: "MF Days Chart", description: "Energy per day" },
);
console.info(`%c MF-HOME-MONITOR %c v${VERSION} `, "background:#f5b042;color:#111;font-weight:700", "background:#111;color:#f5b042");
