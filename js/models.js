/*
 * Per-model catalogue. Each entry belongs to a platform in SCOOTERS (via
 * `platform`) and to a brand (matching `brand` in SCOOTERS exactly).
 *
 * potential: 0 = Locked, 1 = Low, 2 = Medium, 3 = High, 4 = Very high
 * Specs are approximate and vary by region and production year.
 */
const POTENTIAL = ["Locked", "Low", "Medium", "High", "Very high"];

const MODELS = [
  /* ---------------- Xiaomi ---------------- */
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "M365", year: 2016, motor: "250 W", battery: "36 V 7.8 Ah", speed: "25 km/h", potential: 4, notes: "The original. Full CFW support via ScooterHacking Utility and DownG; the most-modded scooter ever made." },
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "M365 Pro", year: 2019, motor: "300 W", battery: "36 V 12.8 Ah", speed: "25 km/h", potential: 4, notes: "Bigger battery and display; same CFW tooling as the M365 with more headroom." },
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "Mi Electric Scooter 1S", year: 2020, motor: "250 W", battery: "36 V 7.65 Ah", speed: "25 km/h", potential: 4, notes: "M365 refresh. CFW supported; check the BLE version before flashing." },
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "Mi Electric Scooter Essential / Lite", year: 2020, motor: "250 W", battery: "36 V 5.1 Ah", speed: "20 km/h", potential: 3, notes: "CFW unlocks 25 km/h+ but the small pack limits range; good cheap flashing platform." },
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "Mi Electric Scooter Pro 2", year: 2020, motor: "300 W", battery: "36 V 12.8 Ah", speed: "25 km/h", potential: 4, notes: "Best classic-era Xiaomi for tuning: CFW, strong ESC, huge parts ecosystem." },
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "Mi Electric Scooter 3", year: 2021, motor: "300 W", battery: "36 V 7.65 Ah", speed: "25 km/h", potential: 3, notes: "CFW supported on most units; later batches need a BLE downgrade first." },
  { brand: "Xiaomi", platform: "xiaomi-classic", name: "Electric Scooter 3 Lite", year: 2022, motor: "300 W", battery: "36 V 5.2 Ah", speed: "25 km/h", potential: 2, notes: "Partial CFW support; some units are locked. Verify firmware version before buying for tuning." },
  { brand: "Xiaomi", platform: "xiaomi-4", name: "Electric Scooter 4", year: 2022, motor: "300 W (600 W peak)", battery: "36 V 7.65 Ah", speed: "25 km/h", potential: 1, notes: "Encrypted BLE and ESC firmware. Region unlock only; hardware swaps are the route." },
  { brand: "Xiaomi", platform: "xiaomi-4", name: "Electric Scooter 4 Lite", year: 2023, motor: "300 W", battery: "36 V 5.2 Ah", speed: "25 km/h", potential: 1, notes: "Locked firmware; the cheapest 4-series and the least worth modding." },
  { brand: "Xiaomi", platform: "xiaomi-4", name: "Electric Scooter 4 Pro", year: 2022, motor: "700 W peak", battery: "36 V 12.4 Ah", speed: "25 km/h", potential: 1, notes: "Strong motor wasted by a locked ESC. Controller transplant is the only real tune." },
  { brand: "Xiaomi", platform: "xiaomi-4", name: "Electric Scooter 4 Pro (2nd Gen) / 4 Pro Plus", year: 2024, motor: "940 W peak", battery: "36 V 12.4 Ah", speed: "25 km/h", potential: 1, notes: "Same locked platform with a stronger motor and TFT display. App region change only." },
  { brand: "Xiaomi", platform: "xiaomi-4", name: "Electric Scooter 4 Ultra", year: 2023, motor: "940 W peak", battery: "36 V 12.4 Ah", speed: "25 km/h", potential: 1, notes: "Dual suspension and 10-inch tubeless tires. Excellent hardware, no firmware access." },
  { brand: "Xiaomi", platform: "xiaomi-4", name: "Electric Scooter 5 / 5 Max", year: 2025, motor: "700–1,000 W peak", battery: "36 V 10–12.4 Ah", speed: "25 km/h", potential: 0, notes: "Newest generation, fully signed firmware. No community tooling at time of writing." },

  /* ---------------- Segway-Ninebot ---------------- */
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter ES1", year: 2018, motor: "250 W", battery: "36 V 5.2 Ah", speed: "20 km/h", potential: 3, notes: "CFW via SHU / ESx-tools unlocks 25–30 km/h. Add the external ES4 pack for range." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter ES2", year: 2018, motor: "300 W", battery: "36 V 5.2 Ah", speed: "25 km/h", potential: 3, notes: "The most common ES. Fully supported by CFW; ES2 → ES4 conversion is a classic mod." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter ES3", year: 2019, motor: "300 W", battery: "36 V 7.8 Ah", speed: "25 km/h", potential: 3, notes: "ES1 with an external pack fitted. Same tooling as ES2." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter ES4", year: 2018, motor: "300 W", battery: "36 V 10.4 Ah (dual)", speed: "30 km/h", potential: 3, notes: "Dual battery gives the current headroom the ES2 lacks. Best ES for CFW." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter E22", year: 2020, motor: "300 W", battery: "36 V 5.2 Ah", speed: "20 km/h", potential: 3, notes: "E-series is the ES platform reskinned. CFW supported; external pack compatible." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter E25", year: 2020, motor: "300 W", battery: "36 V 5.2 Ah", speed: "25 km/h", potential: 3, notes: "Same as E22 with a higher stock speed limit. CFW supported." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter E45", year: 2020, motor: "300 W", battery: "36 V 10.4 Ah (dual)", speed: "30 km/h", potential: 3, notes: "E-series equivalent of the ES4. Dual pack, CFW supported." },
  { brand: "Segway-Ninebot", platform: "ninebot-es", name: "KickScooter E2 / E2 Plus / E2 Pro", year: 2023, motor: "250–450 W", battery: "36 V 5.2–7.65 Ah", speed: "20–25 km/h", potential: 1, notes: "New-generation E2 uses a locked ESC. App speed-mode changes only." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter F20", year: 2021, motor: "250 W", battery: "36 V 5.1 Ah", speed: "20 km/h", potential: 3, notes: "SHU CFW supported. Lower power motor limits gains to about 28 km/h." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter F25", year: 2021, motor: "300 W", battery: "36 V 5.1 Ah", speed: "25 km/h", potential: 3, notes: "CFW supported; solid entry-level flashing platform." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter F30", year: 2021, motor: "300 W", battery: "36 V 7.65 Ah", speed: "25 km/h", potential: 3, notes: "Bigger pack than the F25. CFW supported on most batches." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter F40", year: 2021, motor: "350 W", battery: "36 V 10.2 Ah", speed: "30 km/h", potential: 3, notes: "Best F-series for tuning: largest pack and motor in the range." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter F2 / F2 Plus / F2 Pro", year: 2023, motor: "400–450 W", battery: "36 V 7.65–10.2 Ah", speed: "25–30 km/h", potential: 2, notes: "Second-gen F. Partial community support; check firmware version before buying." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter F65", year: 2022, motor: "400 W", battery: "36 V 12.8 Ah", speed: "25 km/h", potential: 2, notes: "F-series with a Max-size battery. Later ESC firmware limits flashing." },
  { brand: "Segway-Ninebot", platform: "ninebot-f", name: "KickScooter D18 / D28 / D38", year: 2021, motor: "250–350 W", battery: "36 V 5.1–10.2 Ah", speed: "25 km/h", potential: 3, notes: "D-series shares the F platform; same CFW tooling applies." },
  { brand: "Segway-Ninebot", platform: "ninebot-max-g30", name: "KickScooter Max G30", year: 2019, motor: "350 W (700 W peak)", battery: "36 V 15.3 Ah", speed: "25 km/h", potential: 4, notes: "The tuning benchmark for commuters. CFW, 52 V controller kits, motor swaps, dual batteries." },
  { brand: "Segway-Ninebot", platform: "ninebot-max-g30", name: "KickScooter Max G30P", year: 2020, motor: "350 W", battery: "36 V 15.3 Ah", speed: "30 km/h", potential: 4, notes: "US version with higher stock speed. Identical tuning path to the G30." },
  { brand: "Segway-Ninebot", platform: "ninebot-max-g30", name: "KickScooter Max G30LP", year: 2020, motor: "350 W", battery: "36 V 10.2 Ah", speed: "30 km/h", potential: 3, notes: "Smaller pack limits current headroom; CFW still works." },
  { brand: "Segway-Ninebot", platform: "ninebot-max-g30", name: "KickScooter Max G30D / G30D II", year: 2020, motor: "350 W", battery: "36 V 15.3 Ah", speed: "20 km/h", potential: 4, notes: "German road-legal version. CFW removes the 20 km/h limit; check for locked v1.7+ firmware." },
  { brand: "Segway-Ninebot", platform: "ninebot-max-g30", name: "KickScooter Max G30E II", year: 2021, motor: "350 W", battery: "36 V 15.3 Ah", speed: "25 km/h", potential: 3, notes: "EU refresh. Later units ship locked; downgrade tools exist for some firmware versions." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter Max G2", year: 2023, motor: "450 W (900 W peak)", battery: "36 V 15.3 Ah", speed: "25 km/h", potential: 1, notes: "Encrypted ESC. App speed modes and region only; no CFW at time of writing." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter Max G65", year: 2023, motor: "450 W", battery: "36 V 15.3 Ah", speed: "25 km/h", potential: 1, notes: "G2 variant with different suspension. Same locked platform." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter Max G3", year: 2025, motor: "600 W (2,000 W peak)", battery: "36 V 15.3 Ah", speed: "25 km/h", potential: 1, notes: "Newest Max. Signed firmware; app settings only." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter GT1", year: 2022, motor: "1,000 W (3,000 W peak)", battery: "48 V 20.7 Ah", speed: "48 km/h", potential: 1, notes: "Fast stock but locked. Tire, brake and suspension mods only." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter GT2", year: 2022, motor: "2 × 1,500 W (6,000 W peak)", battery: "52 V 30 Ah", speed: "70 km/h", potential: 1, notes: "Segway's hyper-scooter. Locked ESC; already at hardware limits." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter P65", year: 2022, motor: "500 W (1,700 W peak)", battery: "48 V 15.5 Ah", speed: "40 km/h", potential: 1, notes: "Premium commuter. App speed modes only; firmware is encrypted." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter P100 / P100S", year: 2022, motor: "650 W (2,100 W peak)", battery: "48 V 20 Ah", speed: "48 km/h", potential: 1, notes: "Bigger P. Same locked platform; enjoy it stock." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter ZT3 Pro", year: 2024, motor: "650 W (1,600 W peak)", battery: "48 V 12.8 Ah", speed: "25 km/h", potential: 1, notes: "Off-road styled commuter with locked firmware; app modes only." },
  { brand: "Segway-Ninebot", platform: "ninebot-g2-p", name: "KickScooter Air T15", year: 2020, motor: "250 W", battery: "36 V 4 Ah", speed: "20 km/h", potential: 0, notes: "Ultralight folding scooter with no tuning community and no hardware headroom." },

  /* ---------------- NIU ---------------- */
  { brand: "NIU", platform: "niu", name: "KQi1 Pro", year: 2023, motor: "300 W", battery: "36 V 7.8 Ah", speed: "25 km/h", potential: 1, notes: "Entry model. App speed unlock only; signed firmware." },
  { brand: "NIU", platform: "niu", name: "KQi2 Pro", year: 2022, motor: "300 W (600 W peak)", battery: "48 V 7.8 Ah", speed: "28 km/h", potential: 1, notes: "48 V system gives decent torque. App custom mode only." },
  { brand: "NIU", platform: "niu", name: "KQi3 Sport", year: 2022, motor: "300 W (600 W peak)", battery: "48 V 7.8 Ah", speed: "28 km/h", potential: 1, notes: "Same body as KQi3 Pro with a smaller pack. Locked firmware." },
  { brand: "NIU", platform: "niu", name: "KQi3 Pro", year: 2022, motor: "350 W (700 W peak)", battery: "48 V 10.1 Ah", speed: "32 km/h", potential: 2, notes: "Best-known NIU. App region unlock to 32 km/h; controller swap possible with a standard hub motor." },
  { brand: "NIU", platform: "niu", name: "KQi3 Max", year: 2022, motor: "450 W (900 W peak)", battery: "48 V 12.6 Ah", speed: "32 km/h", potential: 2, notes: "Larger motor and pack make it the best NIU candidate for a controller transplant." },
  { brand: "NIU", platform: "niu", name: "KQi 100F / 100P", year: 2024, motor: "300–350 W", battery: "36 V 7.8 Ah", speed: "25 km/h", potential: 1, notes: "New naming scheme, same locked ecosystem." },
  { brand: "NIU", platform: "niu", name: "KQi 200F / 200P", year: 2024, motor: "350–450 W", battery: "48 V 10.1–12.6 Ah", speed: "32 km/h", potential: 2, notes: "Successor to KQi3 Pro / Max. App tuning of acceleration and modes." },
  { brand: "NIU", platform: "niu", name: "KQi 300P / 300X", year: 2024, motor: "500 W (900 W peak)", battery: "48 V 12.6 Ah", speed: "32 km/h", potential: 2, notes: "300X adds suspension. Signed firmware; hardware mods only." },
  { brand: "NIU", platform: "niu", name: "KQi Air / Air X", year: 2023, motor: "350 W", battery: "36 V 9.6 Ah", speed: "25 km/h", potential: 0, notes: "Carbon-fibre frame not intended for higher loads. Leave stock." },
  { brand: "NIU", platform: "niu", name: "KQi Youth / Youth+", year: 2023, motor: "250 W", battery: "36 V 4 Ah", speed: "16–20 km/h", potential: 0, notes: "Kids' scooter. Do not tune." },

  /* ---------------- Navee ---------------- */
  { brand: "Navee", platform: "navee", name: "V25 / V25i", year: 2022, motor: "300 W", battery: "36 V 6.4 Ah", speed: "25 km/h", potential: 1, notes: "Xiaomi-style folder. App region change on some firmware; generic controller." },
  { brand: "Navee", platform: "navee", name: "V40 / V40i Pro", year: 2022, motor: "350 W", battery: "36 V 10 Ah", speed: "25 km/h", potential: 1, notes: "Bigger pack than V25. No CFW; controller swap possible." },
  { brand: "Navee", platform: "navee", name: "V50 / V50i", year: 2023, motor: "350 W (700 W peak)", battery: "36 V 10.4 Ah", speed: "25 km/h", potential: 1, notes: "Newer V-series with locked app-based firmware." },
  { brand: "Navee", platform: "navee", name: "N40", year: 2022, motor: "350 W", battery: "36 V 10 Ah", speed: "25 km/h", potential: 2, notes: "10-inch pneumatic tires and a generic controller. Easy hardware swap." },
  { brand: "Navee", platform: "navee", name: "N65 / N65i", year: 2022, motor: "500 W (1,000 W peak)", battery: "48 V 12.75 Ah", speed: "25 km/h", potential: 2, notes: "Best Navee for hardware tuning: 48 V system, strong motor, conventional internals." },
  { brand: "Navee", platform: "navee", name: "S40 / S40i", year: 2023, motor: "350 W", battery: "36 V 10 Ah", speed: "25 km/h", potential: 1, notes: "Sport-styled commuter with app-locked speed modes." },
  { brand: "Navee", platform: "navee", name: "S65 / S65C", year: 2023, motor: "500 W (1,000 W peak)", battery: "48 V 12.75 Ah", speed: "25 km/h", potential: 2, notes: "N65 platform with suspension. Same controller swap path." },
  { brand: "Navee", platform: "navee", name: "ST3 / ST3 Pro", year: 2024, motor: "600 W (1,350 W peak)", battery: "48 V 12.75 Ah", speed: "25 km/h", potential: 2, notes: "Dual suspension. App modes only from the factory; strong motor for hardware mods." },
  { brand: "Navee", platform: "navee", name: "GT3 / GT3 Pro / GT3 Max", year: 2024, motor: "600–800 W (1,350–1,600 W peak)", battery: "48 V 12.75–15.6 Ah", speed: "25 km/h", potential: 2, notes: "Flagship Navee. Locked firmware; the most powerful platform for a controller swap." },

  /* ---------------- Apollo ---------------- */
  { brand: "Apollo", platform: "apollo", name: "Light", year: 2020, motor: "350 W", battery: "36 V 10.4 Ah", speed: "32 km/h", potential: 2, notes: "Early Apollo with a generic display and P-settings. Controller swap friendly." },
  { brand: "Apollo", platform: "apollo", name: "Air / Air Pro", year: 2021, motor: "350 W", battery: "36 V 10.4 Ah", speed: "29 km/h", potential: 2, notes: "Light commuter. P-settings on the display; limited headroom." },
  { brand: "Apollo", platform: "apollo", name: "Air (2023)", year: 2023, motor: "500 W (750 W peak)", battery: "36 V 10 Ah", speed: "32 km/h", potential: 2, notes: "App-based tuning of speed modes and acceleration." },
  { brand: "Apollo", platform: "apollo", name: "Go", year: 2022, motor: "2 × 350 W", battery: "36 V 12 Ah", speed: "45 km/h", potential: 2, notes: "Dual motor commuter. App tuning; proprietary controllers." },
  { brand: "Apollo", platform: "apollo", name: "City / City Pro", year: 2021, motor: "500 W (Pro: 2 × 500 W)", battery: "48 V 15–20 Ah", speed: "40–52 km/h", potential: 2, notes: "App tuning of regen, acceleration and speed modes. LUDO controller limits swaps." },
  { brand: "Apollo", platform: "apollo", name: "Explore", year: 2020, motor: "1,000 W", battery: "52 V 18.2 Ah", speed: "50 km/h", potential: 3, notes: "Generic P-settings and controller; easy controller swap." },
  { brand: "Apollo", platform: "apollo", name: "Ghost", year: 2020, motor: "2 × 800 W", battery: "52 V 18.2 Ah", speed: "55 km/h", potential: 3, notes: "P-settings and generic controllers make the Ghost the easiest Apollo to mod." },
  { brand: "Apollo", platform: "apollo", name: "Phantom V1 / V2", year: 2021, motor: "2 × 1,200 W", battery: "52 V 23.4 Ah", speed: "65 km/h", potential: 3, notes: "V1 has generic P-settings; V2 introduced the LUDO controller and app tuning." },
  { brand: "Apollo", platform: "apollo", name: "Phantom V3 / Phantom (2023)", year: 2023, motor: "2 × 1,200 W", battery: "52 V 23.4 Ah", speed: "65 km/h", potential: 2, notes: "App tuning is extensive (throttle curves, regen). Proprietary controller." },
  { brand: "Apollo", platform: "apollo", name: "Pro (2023) / Pro (2025)", year: 2023, motor: "2 × 1,200 W (Pro 2025: 2 × 1,500 W)", battery: "52–60 V 30 Ah", speed: "70–75 km/h", potential: 2, notes: "Flagship with deep app tuning and Apollo's own drivetrain. Not built for third-party parts." },

  /* ---------------- Dualtron ---------------- */
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Mini / Mini Special", year: 2019, motor: "1,450 W", battery: "52 V 13–21 Ah", speed: "50–55 km/h", potential: 3, notes: "Single-motor entry Dualtron with EY3 P-settings. Controller and battery upgrades common." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Popular", year: 2022, motor: "1,320 W", battery: "52 V 17.5 Ah", speed: "50 km/h", potential: 3, notes: "Budget Dualtron; same display and settings menu as the rest." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Togo", year: 2023, motor: "500 W", battery: "48 V 13 Ah", speed: "40 km/h", potential: 2, notes: "Lightweight commuter Dualtron. P-settings, limited headroom." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Spider / Spider 2", year: 2019, motor: "2 × 1,000 W (Spider 2: 2 × 1,650 W)", battery: "60 V 21–24 Ah", speed: "60–70 km/h", potential: 4, notes: "Lightweight dual-motor with full P-settings and a huge aftermarket." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Eagle / Eagle Pro", year: 2019, motor: "2 × 1,800 W", battery: "60 V 22–30 Ah", speed: "70 km/h", potential: 4, notes: "Classic mid-size Dualtron. Controller upgrades and 72 V conversions are well documented." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Raptor 2", year: 2019, motor: "2 × 1,000 W", battery: "60 V 18–24 Ah", speed: "60 km/h", potential: 3, notes: "Compact dual-motor. P-settings; moderate headroom." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Compact", year: 2020, motor: "2 × 800 W", battery: "60 V 21 Ah", speed: "55 km/h", potential: 3, notes: "Small-wheel dual motor with full settings menu." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Victor / Victor Luxury / Luxury Plus", year: 2020, motor: "2 × 2,000 W (Luxury+: 2 × 2,500 W)", battery: "60 V 30–35 Ah", speed: "80 km/h", potential: 4, notes: "Sweet-spot Dualtron. EY3/EY4 settings, easy controller upgrade, big battery bay." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Achilleus", year: 2021, motor: "2 × 2,000 W", battery: "60 V 30 Ah", speed: "80 km/h", potential: 4, notes: "Victor-class with different suspension. Same tuning path." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Thunder / Thunder 2 / Thunder 3", year: 2018, motor: "2 × 2,700 W (T2: 2 × 3,000 W; T3: 2 × 4,000 W)", battery: "60–72 V 35–40 Ah", speed: "80–100 km/h", potential: 4, notes: "The definitive tuning hyper-scooter. Controllers, batteries and motors are all swappable." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Ultra / Ultra 2", year: 2018, motor: "2 × 2,700 W (Ultra 2: 2 × 3,000 W)", battery: "60–72 V 35–40 Ah", speed: "85–90 km/h", potential: 4, notes: "Off-road Thunder. Same electronics and headroom." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "Storm / Storm Limited / Storm Ultra", year: 2021, motor: "2 × 3,300 W (Ultra: 2 × 4,200 W)", battery: "72 V 31.5–45 Ah (swappable)", speed: "90–110 km/h", potential: 4, notes: "Swappable battery packs make voltage and capacity upgrades unusually easy." },
  { brand: "Dualtron (Minimotors)", platform: "dualtron", name: "X / X2 / X Limited", year: 2019, motor: "2 × 3,350 W (X2: 2 × 4,150 W; Limited: 2 × 6,720 W)", battery: "72–84 V 42–60 Ah", speed: "100–120 km/h", potential: 3, notes: "Already at the limit of what a scooter chassis can do. Tuning is fine-adjustment, not headroom." },

  /* ---------------- Kaabo ---------------- */
  { brand: "Kaabo", platform: "kaabo", name: "Skywalker 8 / 10", year: 2019, motor: "500–800 W", battery: "48 V 13–18 Ah", speed: "35–45 km/h", potential: 3, notes: "Kaabo's commuter line. Generic display P-settings; easy controller swap." },
  { brand: "Kaabo", platform: "kaabo", name: "Mantis 8", year: 2020, motor: "2 × 800 W", battery: "48 V 18.2 Ah", speed: "45 km/h", potential: 3, notes: "Smaller Mantis with the same controller ecosystem." },
  { brand: "Kaabo", platform: "kaabo", name: "Mantis 8 Pro / Mantis 8 Plus", year: 2022, motor: "2 × 800 W", battery: "48 V 24.5 Ah", speed: "50 km/h", potential: 3, notes: "More capacity, same P-settings and controller path." },
  { brand: "Kaabo", platform: "kaabo", name: "Mantis 10 Base / Pro / Pro+ / Elite", year: 2019, motor: "2 × 1,000 W", battery: "60 V 18.2–24.5 Ah", speed: "60 km/h", potential: 4, notes: "The modding favourite. Sine-wave controller swaps, 72 V builds and brake upgrades all well documented." },
  { brand: "Kaabo", platform: "kaabo", name: "Mantis King GT", year: 2022, motor: "2 × 1,100 W", battery: "60 V 24 Ah", speed: "65 km/h", potential: 4, notes: "TFT display with full settings menu; hydraulic brakes and 72 V-ready wiring." },
  { brand: "Kaabo", platform: "kaabo", name: "Mantis V2 / Mantis X", year: 2023, motor: "2 × 1,000–1,100 W", battery: "60 V 24–35 Ah", speed: "60–65 km/h", potential: 4, notes: "Refreshed Mantis. Same open electronics with improved sealing." },
  { brand: "Kaabo", platform: "kaabo", name: "Wolf Warrior 11 / 11 Pro", year: 2019, motor: "2 × 1,200 W", battery: "60 V 26–35 Ah", speed: "80 km/h", potential: 4, notes: "Big frame, big battery bay. 72 V controller and battery conversions are common." },
  { brand: "Kaabo", platform: "kaabo", name: "Wolf Warrior X / X Pro / X Plus", year: 2021, motor: "2 × 1,100 W", battery: "60 V 21–28 Ah", speed: "70 km/h", potential: 4, notes: "Compact Wolf. Same controller ecosystem as the 11." },
  { brand: "Kaabo", platform: "kaabo", name: "Wolf Warrior GT / GT Pro", year: 2022, motor: "2 × 1,100 W", battery: "60 V 26–35 Ah", speed: "70 km/h", potential: 4, notes: "TFT display and sine-wave controllers with adjustable current." },
  { brand: "Kaabo", platform: "kaabo", name: "Wolf King / Wolf King Plus", year: 2020, motor: "2 × 1,500 W", battery: "72 V 28–35 Ah", speed: "95 km/h", potential: 4, notes: "72 V from the factory. Controller and battery upgrades push it past 100 km/h." },
  { brand: "Kaabo", platform: "kaabo", name: "Wolf King GT / GT Pro", year: 2021, motor: "2 × 2,000 W", battery: "72 V 35 Ah", speed: "100 km/h", potential: 4, notes: "Hyper-scooter with TFT settings and enormous hardware headroom." },
  { brand: "Kaabo", platform: "kaabo", name: "Wolf King GTR", year: 2023, motor: "2 × 2,000 W (10,000 W peak)", battery: "72 V 40 Ah", speed: "100+ km/h", potential: 3, notes: "Already near chassis limits. Tuning is mostly settings and brakes." },

  /* ---------------- NAMI ---------------- */
  { brand: "NAMI", platform: "nami", name: "Burn-E", year: 2020, motor: "2 × 1,500 W", battery: "72 V 32 Ah", speed: "95 km/h", potential: 3, notes: "Deep display settings: current, throttle curve, regen. Controller swaps rare because stock is strong." },
  { brand: "NAMI", platform: "nami", name: "Burn-E 2", year: 2021, motor: "2 × 1,500 W", battery: "72 V 32 Ah", speed: "95 km/h", potential: 3, notes: "Refined Burn-E with the same adjustable controller set-up." },
  { brand: "NAMI", platform: "nami", name: "Burn-E 2 Max", year: 2022, motor: "2 × 1,500 W (8,400 W peak)", battery: "72 V 40 Ah", speed: "100 km/h", potential: 3, notes: "Bigger pack; already near practical limits. Tune settings and suspension." },
  { brand: "NAMI", platform: "nami", name: "Burn-E 3 / Burn-E 3 Max", year: 2024, motor: "2 × 1,500 W (Max: 2 × 2,000 W)", battery: "72 V 32–40 Ah", speed: "100 km/h", potential: 3, notes: "Newest Burn-E with app tuning. Hardware already flagship-grade." },
  { brand: "NAMI", platform: "nami", name: "Klima", year: 2022, motor: "2 × 1,000 W", battery: "60 V 25 Ah", speed: "60 km/h", potential: 3, notes: "Mid-size NAMI. Display settings expose current and acceleration; good controller swap candidate." },
  { brand: "NAMI", platform: "nami", name: "Klima Max", year: 2022, motor: "2 × 1,000 W", battery: "60 V 30 Ah", speed: "65 km/h", potential: 3, notes: "Bigger pack Klima; same tuning path." },
  { brand: "NAMI", platform: "nami", name: "Blast / Blast Max", year: 2023, motor: "2 × 1,500 W", battery: "72 V 32–40 Ah", speed: "100 km/h", potential: 3, notes: "Burn-E derived with app and display settings. Little headroom left, lots of adjustability." },

  /* ---------------- Vsett ---------------- */
  { brand: "Vsett", platform: "vsett", name: "Mini", year: 2021, motor: "500 W", battery: "48 V 8.7 Ah", speed: "35 km/h", potential: 2, notes: "Small commuter. Display P-settings; limited hardware headroom." },
  { brand: "Vsett", platform: "vsett", name: "8 / 8+", year: 2020, motor: "600 W (8+: 2 × 600 W)", battery: "48 V 15.6 Ah", speed: "40–50 km/h", potential: 3, notes: "Zero 8 successor. P-settings and controller swaps." },
  { brand: "Vsett", platform: "vsett", name: "9 / 9+ / 9+R", year: 2020, motor: "2 × 650 W (9+R: 2 × 1,000 W)", battery: "52 V 19–21 Ah", speed: "50–55 km/h", potential: 3, notes: "Most popular Vsett. Well-documented P-settings; controllers widely swapped." },
  { brand: "Vsett", platform: "vsett", name: "10+ / 10+R", year: 2020, motor: "2 × 1,400 W", battery: "60 V 20.8–25.6 Ah", speed: "65–70 km/h", potential: 4, notes: "Zero 10X successor and just as moddable. Controller, battery and brake upgrades all common." },
  { brand: "Vsett", platform: "vsett", name: "11+ / 11+ Super", year: 2021, motor: "2 × 1,500 W (Super: 2 × 3,000 W)", battery: "60–72 V 26–31 Ah", speed: "80–90 km/h", potential: 4, notes: "Big Vsett with 72 V wiring. Huge hardware headroom." },

  /* ---------------- KuKirin ---------------- */
  { brand: "KuKirin", platform: "kukirin", name: "G1", year: 2019, motor: "500 W", battery: "48 V 10 Ah", speed: "35 km/h", potential: 2, notes: "Older folding commuter with generic controller and P-settings." },
  { brand: "KuKirin", platform: "kukirin", name: "G2", year: 2020, motor: "800 W", battery: "48 V 13 Ah", speed: "45 km/h", potential: 3, notes: "Off-road styled with generic electronics; easy controller swap." },
  { brand: "KuKirin", platform: "kukirin", name: "G2 Pro", year: 2021, motor: "600 W (1,000 W peak)", battery: "48 V 15 Ah", speed: "45 km/h", potential: 3, notes: "Best-selling KuKirin. P-settings on the QS-S4 style display; generic controller swaps." },
  { brand: "KuKirin", platform: "kukirin", name: "G2 Master", year: 2023, motor: "2 × 1,000 W", battery: "48 V 20.8 Ah", speed: "55 km/h", potential: 3, notes: "Dual-motor G2. Same open settings; brakes are the weak point when tuned." },
  { brand: "KuKirin", platform: "kukirin", name: "G2 Max", year: 2024, motor: "1,000 W", battery: "48 V 20 Ah", speed: "55 km/h", potential: 3, notes: "Refreshed single motor G2 with larger pack." },
  { brand: "KuKirin", platform: "kukirin", name: "G3", year: 2022, motor: "1,200 W", battery: "52 V 18 Ah", speed: "50 km/h", potential: 3, notes: "Single-motor with hydraulic brakes. P-settings and generic controller." },
  { brand: "KuKirin", platform: "kukirin", name: "G3 Pro", year: 2023, motor: "2 × 1,200 W", battery: "52 V 23.2 Ah", speed: "65 km/h", potential: 3, notes: "Dual-motor G3. Best KuKirin for controller and battery upgrades." },
  { brand: "KuKirin", platform: "kukirin", name: "G4", year: 2022, motor: "2,000 W", battery: "60 V 20 Ah", speed: "70 km/h", potential: 3, notes: "Single 2 kW motor, 60 V system. Open P-settings; treat brakes and bushings first." },
  { brand: "KuKirin", platform: "kukirin", name: "M4 / M4 Pro", year: 2020, motor: "500 W (Pro: 500 W, larger pack)", battery: "48 V 12.5–18 Ah", speed: "45 km/h", potential: 2, notes: "Seated commuter with generic controller; moderate headroom." },
  { brand: "KuKirin", platform: "kukirin", name: "M5 / M5 Pro", year: 2022, motor: "1,000 W", battery: "48 V 20 Ah", speed: "50 km/h", potential: 2, notes: "Larger seated scooter. P-settings; frame limits speed tuning." },
  { brand: "KuKirin", platform: "kukirin", name: "S1 Pro", year: 2021, motor: "350 W", battery: "36 V 7.5 Ah", speed: "30 km/h", potential: 1, notes: "Budget commuter with limited settings; controller swap only." },

  /* ---------------- Kugoo ---------------- */
  { brand: "Kugoo", platform: "kugoo", name: "S1 / S1 Pro", year: 2019, motor: "350 W", battery: "36 V 6–7.5 Ah", speed: "30 km/h", potential: 2, notes: "Cheap 8-inch commuter. Display P-settings unlock speed; generic controller." },
  { brand: "Kugoo", platform: "kugoo", name: "S3 / S3 Pro", year: 2020, motor: "350 W", battery: "36 V 7.5 Ah", speed: "30 km/h", potential: 2, notes: "Same platform as S1 with minor updates." },
  { brand: "Kugoo", platform: "kugoo", name: "G-Booster", year: 2020, motor: "2 × 800 W", battery: "48 V 23 Ah", speed: "55 km/h", potential: 3, notes: "Dual motor with generic display settings and big battery; easy to mod." },
  { brand: "Kugoo", platform: "kugoo", name: "G-Max", year: 2020, motor: "500 W", battery: "48 V 10.4 Ah", speed: "40 km/h", potential: 2, notes: "Single-motor commuter; controller swap friendly." },
  { brand: "Kugoo", platform: "kugoo", name: "Kirin M4 / M4 Pro", year: 2020, motor: "500 W", battery: "48 V 12.5–18 Ah", speed: "45 km/h", potential: 2, notes: "Seated commuter; same as KuKirin M4 under the older name." },
  { brand: "Kugoo", platform: "kugoo", name: "Kirin G2 Pro", year: 2021, motor: "600 W (1,000 W peak)", battery: "48 V 15 Ah", speed: "45 km/h", potential: 3, notes: "Sold under both names. See KuKirin G2 Pro." },

  /* ---------------- Teverun ---------------- */
  { brand: "Teverun", platform: "teverun", name: "Blade Mini / Mini Pro", year: 2022, motor: "1,000 W (Pro: 2 × 1,000 W)", battery: "48–52 V 15–24 Ah", speed: "45–55 km/h", potential: 3, notes: "Compact Teverun with the TFT display settings menu." },
  { brand: "Teverun", platform: "teverun", name: "Blade GT / Blade GT+", year: 2021, motor: "2 × 1,000 W", battery: "60 V 26–30 Ah", speed: "70 km/h", potential: 3, notes: "Mid-size Teverun. Adjustable current and acceleration in the display; controller swaps documented." },
  { brand: "Teverun", platform: "teverun", name: "Blade X", year: 2022, motor: "2 × 1,500 W", battery: "60 V 30 Ah", speed: "80 km/h", potential: 3, notes: "Bigger Blade with 72 V-capable wiring." },
  { brand: "Teverun", platform: "teverun", name: "Fighter Mini", year: 2022, motor: "2 × 1,000 W", battery: "52 V 24 Ah", speed: "60 km/h", potential: 3, notes: "Portable dual motor with full TFT settings." },
  { brand: "Teverun", platform: "teverun", name: "Fighter 10 / Fighter 11", year: 2021, motor: "2 × 1,200–1,500 W", battery: "60 V 28–35 Ah", speed: "75–85 km/h", potential: 3, notes: "Dualtron-class hardware with an adjustable controller set-up." },
  { brand: "Teverun", platform: "teverun", name: "Fighter 11+", year: 2022, motor: "2 × 1,500 W", battery: "72 V 35 Ah", speed: "90 km/h", potential: 4, notes: "72 V from the factory; large headroom for controller and battery upgrades." },
  { brand: "Teverun", platform: "teverun", name: "Fighter Supreme 8.0 / 11+", year: 2023, motor: "2 × 2,000 W (11+: 2 × 3,000 W)", battery: "72 V 35–40 Ah", speed: "90–100 km/h", potential: 3, notes: "Flagship. Deep settings but already at chassis limits; spend on brakes and tires." },
  { brand: "Teverun", platform: "teverun", name: "Fighter Supreme Plus / Supreme 2", year: 2024, motor: "2 × 3,000 W", battery: "72 V 40–50 Ah", speed: "100+ km/h", potential: 3, notes: "Newest Supreme with app tuning. Hardware already maxed." },

  /* ---------------- Zero ---------------- */
  { brand: "Zero", platform: "zero", name: "Zero 8", year: 2018, motor: "500 W", battery: "48 V 10.4 Ah", speed: "35 km/h", potential: 3, notes: "Small commuter with P-settings and a generic controller." },
  { brand: "Zero", platform: "zero", name: "Zero 8X", year: 2019, motor: "2 × 800 W", battery: "52 V 18–21 Ah", speed: "55 km/h", potential: 3, notes: "Dual-motor 8-inch; controller swaps common." },
  { brand: "Zero", platform: "zero", name: "Zero 9", year: 2018, motor: "600 W", battery: "48 V 13–16 Ah", speed: "40 km/h", potential: 3, notes: "Classic single-motor Zero. Open P-settings." },
  { brand: "Zero", platform: "zero", name: "Zero 10", year: 2018, motor: "1,000 W", battery: "52 V 18 Ah", speed: "50 km/h", potential: 3, notes: "Single-motor 10-inch with generic electronics." },
  { brand: "Zero", platform: "zero", name: "Zero 10X", year: 2019, motor: "2 × 1,000 W", battery: "52–60 V 18–24 Ah", speed: "60–65 km/h", potential: 4, notes: "One of the most-modded scooters ever: controllers, batteries, brakes, all documented." },
  { brand: "Zero", platform: "zero", name: "Zero 11X", year: 2019, motor: "2 × 1,600 W", battery: "72 V 32 Ah", speed: "90 km/h", potential: 4, notes: "72 V hyper-scooter with huge headroom and open settings." },

  /* ---------------- EMOVE ---------------- */
  { brand: "EMOVE", platform: "emove", name: "Touring", year: 2019, motor: "500 W", battery: "48 V 13 Ah", speed: "40 km/h", potential: 2, notes: "Light commuter with generic settings; moderate headroom." },
  { brand: "EMOVE", platform: "emove", name: "Cruiser", year: 2019, motor: "1,000 W", battery: "52 V 30 Ah", speed: "48 km/h", potential: 3, notes: "Range monster with open P-settings and a big controller bay." },
  { brand: "EMOVE", platform: "emove", name: "Cruiser S", year: 2022, motor: "1,000 W (1,600 W peak)", battery: "52 V 30 Ah", speed: "53 km/h", potential: 3, notes: "Upgraded Cruiser with sine-wave controller; controller swaps common." },
  { brand: "EMOVE", platform: "emove", name: "RoadRunner", year: 2021, motor: "2 × 500 W", battery: "48 V 26 Ah", speed: "48 km/h", potential: 3, notes: "Seated scooter with generic P-settings and controllers." },
  { brand: "EMOVE", platform: "emove", name: "RoadRunner SE", year: 2022, motor: "2 × 500 W", battery: "48 V 26 Ah", speed: "48 km/h", potential: 3, notes: "Special edition RoadRunner; same tuning path." },
  { brand: "EMOVE", platform: "emove", name: "RoadRunner Pro", year: 2022, motor: "2 × 1,000 W", battery: "60 V 30 Ah", speed: "60 km/h", potential: 3, notes: "Dual motor 60 V seated scooter; open settings, generous headroom." },
  { brand: "EMOVE", platform: "emove", name: "RoadRunner V2 / V3", year: 2023, motor: "2 × 500–1,000 W", battery: "48–60 V 26–30 Ah", speed: "48–60 km/h", potential: 3, notes: "Refreshed RoadRunners with the same open electronics." },

  /* ---------------- Inokim ---------------- */
  { brand: "Inokim", platform: "inokim", name: "Mini / Mini Plus", year: 2019, motor: "250–350 W", battery: "36 V 7.8–10.4 Ah", speed: "25 km/h", potential: 1, notes: "Light folders with proprietary connectors; leave stock." },
  { brand: "Inokim", platform: "inokim", name: "Light 1 / Light 2", year: 2018, motor: "350 W", battery: "36 V 10.4 Ah", speed: "25 km/h", potential: 2, notes: "Hidden display menu unlocks speed on some firmware; limited hardware headroom." },
  { brand: "Inokim", platform: "inokim", name: "Light 2 Super / Light 2 Max", year: 2021, motor: "350 W", battery: "36 V 10.4–13 Ah", speed: "25 km/h", potential: 2, notes: "Same as Light 2 with more range." },
  { brand: "Inokim", platform: "inokim", name: "Quick 3 / Quick 4 / Quick 4 Super", year: 2019, motor: "600 W", battery: "48 V 16–21 Ah", speed: "35–40 km/h", potential: 2, notes: "Solid commuter; hidden menu and controller swap possible." },
  { brand: "Inokim", platform: "inokim", name: "OX / OX Hero / OX Super", year: 2019, motor: "800 W (1,000 W peak)", battery: "60 V 16–21 Ah", speed: "45 km/h", potential: 3, notes: "Hidden settings menu for speed and current; controllers swappable." },
  { brand: "Inokim", platform: "inokim", name: "OXO", year: 2019, motor: "2 × 1,000 W", battery: "60 V 25.6 Ah", speed: "65 km/h", potential: 3, notes: "Dual motor OX. Best Inokim for tuning; hidden menu plus controller upgrades." },

  /* ---------------- Nanrobot ---------------- */
  { brand: "Nanrobot", platform: "nanrobot", name: "X4 / X6", year: 2019, motor: "500 W (X6: 2 × 500 W)", battery: "48 V 10.4–18 Ah", speed: "35–45 km/h", potential: 2, notes: "Compact commuters with generic settings." },
  { brand: "Nanrobot", platform: "nanrobot", name: "D4+ 2.0 / D4+ 3.0", year: 2019, motor: "2 × 1,000 W", battery: "52 V 23 Ah", speed: "65 km/h", potential: 3, notes: "Dual motor with generic controllers; wiring gauge is the limit when raising current." },
  { brand: "Nanrobot", platform: "nanrobot", name: "D5+ / D5+ 2.0", year: 2019, motor: "2 × 1,000 W", battery: "52 V 26 Ah", speed: "65 km/h", potential: 3, notes: "Bigger pack than the D4+; same tuning path." },
  { brand: "Nanrobot", platform: "nanrobot", name: "D6+ 2.0", year: 2020, motor: "2 × 1,000 W", battery: "52 V 26 Ah", speed: "65 km/h", potential: 3, notes: "10-inch dual motor with hydraulic brakes; controller and battery upgrades common." },
  { brand: "Nanrobot", platform: "nanrobot", name: "LS7 / LS7+", year: 2021, motor: "2 × 1,800 W (LS7+: 2 × 2,400 W)", battery: "60–72 V 40 Ah", speed: "85–90 km/h", potential: 3, notes: "Hyper-scooter with generous headroom and open settings." },
  { brand: "Nanrobot", platform: "nanrobot", name: "N4 / N6", year: 2022, motor: "2 × 500–1,000 W", battery: "48–52 V 18–26 Ah", speed: "50–60 km/h", potential: 3, notes: "Newer generation dual motors with P-settings." },

  /* ---------------- Budget brands ---------------- */
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "Hiboy S2 / S2 Pro / S2 Max", year: 2020, motor: "350–500 W", battery: "36 V 7.5–11.6 Ah", speed: "30 km/h", potential: 1, notes: "Generic electronics; app speed unlock on some units. Controller swap only." },
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "Hiboy Max Pro / Titan Pro", year: 2022, motor: "500–1,000 W", battery: "48 V 10–12.5 Ah", speed: "32–45 km/h", potential: 2, notes: "Higher-power Hiboys with generic controllers; the best budget swap candidates." },
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "Gotrax GXL V2 / XR Elite", year: 2019, motor: "250–300 W", battery: "36 V 5.2–7 Ah", speed: "25 km/h", potential: 1, notes: "Very small pack and weak brakes; not worth tuning." },
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "Gotrax G4 / G-Max / Apex", year: 2021, motor: "350–500 W", battery: "36 V 10–15.6 Ah", speed: "25–32 km/h", potential: 1, notes: "App speed modes; no firmware tooling." },
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "TurboAnt X7 / X7 Pro / X7 Max", year: 2020, motor: "350 W", battery: "36 V 6.4–10 Ah", speed: "30 km/h", potential: 1, notes: "Detachable battery; generic controller. Hardware only." },
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "TurboAnt M10 / V8", year: 2021, motor: "350–450 W", battery: "36 V 7.5–10 Ah (V8: dual)", speed: "30 km/h", potential: 1, notes: "Same generic platform as the X7." },
  { brand: "Hiboy / Gotrax / TurboAnt / Razor", platform: "budget-generic", name: "Razor E300 / E Prime III / EcoSmart", year: 2015, motor: "250–350 W (chain / hub)", battery: "24–36 V lead-acid / Li", speed: "25 km/h", potential: 1, notes: "Old-school Razors; lead-acid E300 mods are their own hobby. Not comparable to modern hub scooters." },

  /* ---------------- Rental / fleet ---------------- */
  { brand: "Bird / Lime / Rental units", platform: "rental", name: "Ninebot Max G30 (fleet)", year: 2019, motor: "350 W", battery: "36 V 15.3 Ah", speed: "25 km/h", potential: 3, notes: "Ex-fleet units convert to retail with a new ESC and dashboard, then tune like any G30." },
  { brand: "Bird / Lime / Rental units", platform: "rental", name: "Bird Zero / Bird One / Bird Two", year: 2019, motor: "300–500 W", battery: "36 V 12.8 Ah", speed: "25 km/h", potential: 1, notes: "Proprietary controllers and IoT modules; conversion requires a full ESC and display swap." },
  { brand: "Bird / Lime / Rental units", platform: "rental", name: "Lime Gen 3 / Gen 4", year: 2020, motor: "300–350 W", battery: "36 V 12–14 Ah", speed: "25 km/h", potential: 1, notes: "Lime electronics are locked; battery packs are the only reusable part." },
  { brand: "Bird / Lime / Rental units", platform: "rental", name: "Okai ES400 / ES600 (Spin, Voi, Tier fleets)", year: 2020, motor: "350–500 W", battery: "36–48 V 13–20 Ah", speed: "25 km/h", potential: 2, notes: "Okai fleet units use conventional hub motors; conversion with a generic controller is documented." }
];
