# TuneScoot – Best E-Scooters for Tuning

A static, dependency-free website that ranks e-scooters across all major brands by how well they
respond to tuning (custom firmware, P-settings, controller/battery/motor upgrades).

Brands covered: Segway-Ninebot, Xiaomi, NIU, Navee, Apollo, Dualtron, Kaabo, NAMI, Vsett, KuKirin,
Kugoo, Teverun, Zero, EMOVE, Inokim, Nanrobot, plus budget (Hiboy / Gotrax / TurboAnt / Razor) and
ex-rental units.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

No build step. Plain HTML, CSS and vanilla JavaScript.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Page layout and static sections (hero, safety, footer) |
| `css/styles.css` | Styling, dark theme, responsive layout |
| `js/data.js` | The platform database (scores), tuning methods and FAQ content |
| `js/models.js` | Per-model catalogue: every model for every brand with specs and a tuning-potential rating |
| `js/mods.js` | Deep-mod guides: VESC controllers, battery cells and configs, hub motors, build steps and per-platform fit ratings |
| `js/app.js` | Rendering, filtering, sorting and the compare table |

## Editing the rankings

Every scooter lives in `js/data.js` as an object with five scores (0–10):

- `firmware` – how tunable the firmware / settings are
- `hardware` – room for controller, battery and motor upgrades
- `community` – size of the modding community and quality of guides
- `headroom` – how far stock hardware can safely be pushed
- `value` – performance gained per dollar

The overall score is a weighted average computed in `js/app.js`
(firmware 30 %, hardware 25 %, community 20 %, headroom 15 %, value 10 %).
Add a new entry to the `SCOOTERS` array and it will appear in the grid, the compare pickers and the
top-pick calculations automatically.

Individual models live in `js/models.js`. Each has a `brand` (must match a `SCOOTERS` brand exactly),
a `platform` (the `SCOOTERS` id it belongs to), specs, and a `potential` rating from 0 (locked) to
4 (very high). The catalogue section, per-card model counts and hero stats are all derived from it.

## Disclaimer

This is an enthusiast guide. Tuning can void warranties, break local law and cause injury.
