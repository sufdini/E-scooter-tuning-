# TuneScoot – Best E-Scooters for Tuning

A static, dependency-free website that ranks e-scooters across all major brands by how well they
respond to tuning (custom firmware, P-settings, controller/battery/motor upgrades).

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
| `js/data.js` | The scooter database, tuning methods and FAQ content |
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

## Disclaimer

This is an enthusiast guide. Tuning can void warranties, break local law and cause injury.
