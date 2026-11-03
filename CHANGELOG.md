# Changelog

## 1.1.0
- Works with any inverter and charger, not only EG4:
  - `invert_battery`, `invert_grid` — for sensors with the opposite sign;
  - grid export: signed grid sensor or a separate `grid_export` sensor; drawn as a green flow to the pole with `▶`;
  - `charger_states` — map your charger's status values; common values are recognized automatically;
  - `mf-days-chart`: `total_counters` for lifetime counters.
- Day chart shows export below zero.
- Charging current is shown upright in front of the car.
- Layout wizard (`calibrate: true`) and prompts for your own pictures (`docs/PROMPTS*.md`).

## 1.0.0
- First release: house, now, badges, day and days cards; English, Russian, Chinese; 12 house renders.
