/*
 * Deep-mod guides: VESC conversions, custom battery packs and hub motor swaps.
 *
 * DEEP_MODS is keyed by platform id (matching SCOOTERS[].id).
 *  vesc / battery / motor levels: 0 = not practical, 1 = possible with effort,
 *  2 = common, 3 = popular and well documented.
 */
const FIT = ["Not practical", "Possible", "Common", "Well documented"];

const VESC_CONTROLLERS = [
  { name: "Flipsky 75100 / 75100 V2 Pro", volts: "Up to 75 V (18S)", amps: "100 A peak, ~60 A continuous", form: "Single", price: "$120–$180", best: "Single-motor commuters (Ninebot Max, Xiaomi, Kugoo). Needs a heatsink for sustained load." },
  { name: "Flipsky 75200", volts: "Up to 75 V (18S)", amps: "200 A peak", form: "Single", price: "$200–$260", best: "Single-motor performance builds and 60 V hub motors up to ~3 kW." },
  { name: "Flipsky Dual FSESC 6.7 / 6.6 Plus", volts: "Up to 60 V (14S)", amps: "2 × 100 A peak", form: "Dual", price: "$200–$280", best: "Dual-motor 52 V builds (Zero 10X, Vsett 9+, Kaabo Mantis 52 V)." },
  { name: "Makerbase MKS 84100 / 84200", volts: "Up to 84 V (20S)", amps: "100–200 A peak", form: "Single", price: "$130–$230", best: "72 V single-motor builds; cheapest route to 20S." },
  { name: "Spintend Ubox V2 75 V / 100 A", volts: "Up to 75 V (18S)", amps: "2 × 100 A peak", form: "Dual", price: "$350–$420", best: "Compact dual-motor 60 V builds (Kaabo Wolf, Dualtron Victor, Vsett 10+)." },
  { name: "Spintend Ubox Aluminium 100 V", volts: "Up to 100 V (24S)", amps: "2 × 100 A", form: "Dual", price: "$450–$550", best: "72–84 V hyper-scooter builds (Dualtron Thunder, Wolf King, Zero 11X)." },
  { name: "Trampa VESC 6 MkVI / VESC 100/250", volts: "60 V (14S) / 100 V (24S)", amps: "80 A / 250 A continuous", form: "Single", price: "$300–$700", best: "The reference hardware. Rock-solid firmware support; expensive." },
  { name: "Flipsky 75100 Pro Dual (with IMU)", volts: "Up to 75 V (18S)", amps: "2 × 100 A", form: "Dual", price: "$250–$320", best: "Budget dual-VESC for 60 V dual-motor scooters." }
];

const VESC_STEPS = [
  { title: "Confirm the motor is VESC-compatible", body: "Any brushless hub motor with three phase wires works. Hall sensors (5-pin connector) are strongly recommended for smooth starts; VESC can run sensorless but scooters need torque from zero." },
  { title: "Pick voltage headroom first", body: "Choose a VESC rated at least 10 V above your pack's full-charge voltage. A 16S (67.2 V full) pack needs a 75 V VESC; a 20S (84 V full) pack needs a 100 V unit. Do not run an ESC at its absolute limit." },
  { title: "Wire it", body: "Phase wires to the motor (order does not matter, detection fixes it), Hall connector to the sensor port, battery through a pre-charge resistor or anti-spark switch, throttle to ADC1, brake to ADC2 if separate. Fuse the battery lead." },
  { title: "Run motor detection in VESC Tool", body: "Use the FOC wizard: set motor current limits conservatively (start at 40 A per motor), run detection to measure resistance, inductance and flux linkage, then detect Hall table. Save to the ESC." },
  { title: "Set current and voltage limits", body: "Battery current max should stay below the BMS discharge rating and cell continuous rating. Set battery cutoff start/end from your cell datasheet (e.g. 3.1 V / 2.9 V per cell). Absolute max current 20 % above motor max." },
  { title: "Tune throttle response", body: "In App Settings > ADC, set the throttle voltage range from your Hall throttle (typically 0.8–4.2 V), enable a ramp of 0.2–0.4 s, and pick current control mode. Use 'Current No Reverse Brake ADC2' for a separate brake input." },
  { title: "Add field weakening last", body: "Field weakening lets a motor spin past its back-EMF limit for 10–20 % more top speed at the cost of heat and efficiency. Start at 10 A and raise carefully while monitoring motor temperature." },
  { title: "Fit a temperature sensor and log", body: "Wire the motor NTC (if present) to the VESC temp input and set a motor temperature cutoff. Log a few rides in VESC Tool or a Bluetooth app to check current, temperature and voltage sag before raising limits." }
];

const BATTERY_CELLS = [
  { cell: "Molicel P45B", format: "21700", capacity: "4,500 mAh", current: "45 A", best: "Best all-round performance cell. High current, good capacity, premium price." },
  { cell: "Molicel P42A", format: "21700", capacity: "4,200 mAh", current: "45 A", best: "Previous-gen P45B. Still excellent for high-current packs." },
  { cell: "Samsung 50S", format: "21700", capacity: "5,000 mAh", current: "25 A", best: "Great balance of range and current for commuter and mid-power builds." },
  { cell: "Samsung 40T", format: "21700", capacity: "4,000 mAh", current: "35 A", best: "Proven high-drain cell; cheaper than Molicel." },
  { cell: "LG M50LT", format: "21700", capacity: "5,000 mAh", current: "14.4 A", best: "Range packs where current per cell stays low (high parallel counts)." },
  { cell: "Samsung 30Q", format: "18650", capacity: "3,000 mAh", current: "15 A", best: "Classic 18650 for Xiaomi and Ninebot rebuilds that keep the stock enclosure." },
  { cell: "Murata / Sony VTC6", format: "18650", capacity: "3,000 mAh", current: "30 A", best: "High-current 18650 for compact performance packs." },
  { cell: "Samsung 35E / LG MJ1", format: "18650", capacity: "3,500 mAh", current: "8–10 A", best: "Range-only packs with many parallel groups; avoid for performance." }
];

const BATTERY_CONFIGS = [
  { series: "10S", nominal: "36 V", full: "42 V", typical: "Xiaomi, Ninebot ES/F/Max stock", note: "Keep 10S to reuse stock controllers; add parallel groups for range and current." },
  { series: "13S", nominal: "48 V", full: "54.6 V", typical: "Kugoo, KuKirin G2, Vsett 8, Navee N65", note: "Mild speed bump for 36 V scooters only with a 48 V-rated controller." },
  { series: "14S", nominal: "52 V", full: "58.8 V", typical: "Zero 10X, Vsett 9+, Apollo Ghost, EMOVE Cruiser", note: "The usual 'upgrade' voltage for 48 V systems and Ninebot Max controller kits." },
  { series: "16S", nominal: "60 V", full: "67.2 V", typical: "Dualtron Spider/Victor, Kaabo Mantis/Wolf, Vsett 10+, Inokim OXO", note: "Most performance scooters; needs a 75 V VESC." },
  { series: "20S", nominal: "72 V", full: "84 V", typical: "Dualtron Thunder/Storm, Kaabo Wolf King, Zero 11X, NAMI Burn-E, Teverun Fighter 11+", note: "Hyper-scooter voltage. 84 V-rated ESC and quality BMS mandatory." },
  { series: "23S–24S", nominal: "84–88 V", full: "96.6–100.8 V", typical: "Dualtron X, Storm Ultra conversions", note: "Extreme builds only. 100 V VESC, 100 V-rated wiring and connectors." }
];

const BATTERY_STEPS = [
  { title: "Size the pack from your current budget", body: "Decide the peak battery current your controller will draw (e.g. 2 × 40 A = 80 A). Divide by the cell's continuous rating with margin (P45B 45 A → 3P minimum, 4P comfortable). Capacity follows: 4P × 4.5 Ah = 18 Ah." },
  { title: "Choose series count for voltage", body: "Match the series count to the controller's rating and the motor's KV. 16S (60 V) is the sweet spot for dual-motor scooters; 20S (72 V) for hyper-scooters. Never exceed the ESC or charger rating." },
  { title: "Measure the deck", body: "Model the pack in a spreadsheet: 21700 cells are 21.5 × 70.5 mm. Include 2 mm for fish paper, nickel and wrap. Most performance decks fit 16S4P–16S6P; commuter decks fit 10S4P–13S4P at best." },
  { title: "Buy a BMS that matches", body: "Smart BMS (JBD, ANT, Daly Smart) with Bluetooth is worth it. Discharge rating ≥ 1.3 × peak current. Use a common-port BMS unless you need separate charge and discharge paths. Verify balance current ≥ 50 mA." },
  { title: "Spot weld, never solder cells", body: "Use a proper spot welder (kWeld, Malectrics) with 0.15–0.2 mm pure nickel strip. Two strips in parallel for high current groups. Soldering directly to cells cooks them." },
  { title: "Insulate everything", body: "Fish paper rings on positive terminals, fish paper between series groups, Kapton over nickel, heat shrink over the finished pack. A single shorted series connection is a fire." },
  { title: "Balance charge before first use", body: "Charge slowly with the BMS connected and watch cell groups reach the same voltage. Check every group with a meter after the first full cycle." },
  { title: "Fuse and wire to gauge", body: "12 AWG silicone wire for 60 A, 10 AWG for 100 A. XT90-S anti-spark connectors or a pre-charge circuit. Fuse the main positive lead at 1.2 × peak current." }
];

const HUB_MOTORS = [
  { motor: "Ninebot Max 500 W aftermarket hub", size: "10\"", power: "500 W nominal / 1,200 W peak", volts: "36–52 V", axle: "Ninebot Max fit", fits: "Ninebot Max G30 direct swap. Pairs with 52 V controller kits or a 75100 VESC." },
  { motor: "Xiaomi 350 W upgrade hub", size: "8.5\"", power: "350 W nominal / 800 W peak", volts: "36–48 V", axle: "Xiaomi M365 / Pro fit", fits: "Drop-in for M365, 1S, Essential and Pro 2. Cures overheating on tuned firmware." },
  { motor: "Minimotors 60 V 1,000–1,650 W", size: "10\"", power: "1,000–1,650 W", volts: "60 V", axle: "12 mm flat", fits: "Dualtron Spider, Eagle, Victor; also fits Kaabo Mantis and Vsett 10+ with spacers." },
  { motor: "Minimotors 72 V 2,700–4,200 W", size: "11\"", power: "2,700–4,200 W", volts: "72–84 V", axle: "12 mm flat", fits: "Dualtron Thunder, Ultra, Storm; the definitive high-power scooter hub." },
  { motor: "QS Motor 10\" 1,000–1,500 W", size: "10\"", power: "1,000–1,500 W", volts: "48–72 V", axle: "12 mm flat", fits: "Quality Chinese hub; used in Zero 10X, Vsett and Kaabo rebuilds. Many winding options." },
  { motor: "QS Motor 11\" 2,000–3,000 W", size: "11\"", power: "2,000–3,000 W", volts: "60–84 V", axle: "12 mm flat", fits: "Wolf King, Zero 11X, Teverun Fighter, NAMI Burn-E class builds." },
  { motor: "Flipsky 10\" 1,500 W / 11\" 3,000 W", size: "10–11\"", power: "1,500–3,000 W", volts: "48–72 V", axle: "12 mm flat", fits: "Sold as VESC-matched kits with Hall sensors and temperature sensor wired." },
  { motor: "Kaabo 60 V 1,000–1,200 W (Mantis / Wolf)", size: "10–11\"", power: "1,000–1,200 W", volts: "60 V", axle: "12 mm flat", fits: "Mantis 10 and Wolf Warrior spares; also fit Zero 10X and Vsett 10+ swingarms." },
  { motor: "Generic 48 V 500–800 W 10\"", size: "10\"", power: "500–800 W", volts: "48 V", axle: "10 or 12 mm flat", fits: "Kugoo, KuKirin, Navee N65, Hiboy Max Pro and other budget 48 V scooters." }
];

const MOTOR_STEPS = [
  { title: "Measure the dropout", body: "Check axle diameter (10 mm or 12 mm), flat-to-flat width and fork inside width. Most performance scooters use 12 mm flats and 150–160 mm forks; commuters vary widely. Buy a motor that matches or plan on spacers." },
  { title: "Match voltage and KV", body: "A motor is wound for a voltage. Running a 60 V motor at 72 V gives ~20 % more speed but more heat. Lower KV (more turns) = torque and hill-climbing; higher KV = speed. Ask the seller for the winding." },
  { title: "Match the controller", body: "Peak motor phase current should be under the motor's rating. A 1,000 W hub is happy at 40–50 A phase; 3,000 W hubs take 100 A+. Stock controllers rarely drive a bigger motor well; pair a motor swap with a controller or VESC upgrade." },
  { title: "Check phase wire gauge", body: "12 AWG phase wires for 60 A+, 14 AWG for 40 A. Thin phase wires are the first thing to melt on a hot motor. Solder heavy leads to the phase bullets and heat shrink them individually." },
  { title: "Hall sensors and temperature", body: "5-pin Hall connector: 5 V, GND, HA, HB, HC. Many motors add a 6th wire for an NTC temperature sensor. Wire the NTC to your ESC's temp input and set a cutoff." },
  { title: "Detect, then ride gently", body: "Run FOC detection (VESC) or check Hall order (stock controller: swap phase pairs until it runs smoothly forward). Ride gently for 20 km checking motor temperature by hand before raising current." },
  { title: "Brakes and torque arms", body: "A 3 kW motor in a fork designed for 1 kW will spin the axle. Fit torque arms or upgrade to a swingarm from the bigger model. Then upgrade the brakes because you just added 30 % more speed." }
];

const DEEP_MODS = {
  "xiaomi-classic": {
    vesc: { level: 2, note: "75100 VESC fits in the deck with a custom bracket; many builds exist. Loses the stock dashboard and app unless a VESC display is added." },
    battery: { level: 3, note: "Stock enclosure fits 10S3P–10S4P of 18650. 12S–13S rebuilds with 21700 in a taller pack are common with an aftermarket controller." },
    motor: { level: 3, note: "350 W and 500 W 8.5-inch drop-in motors are the standard upgrade for tuned firmware; cures overheating." }
  },
  "xiaomi-4": {
    vesc: { level: 2, note: "The only real tune for a 4-series: VESC plus a Hall throttle replaces the locked ESC and dashboard entirely." },
    battery: { level: 2, note: "Deck fits a 10S3P 21700 rebuild; higher voltage only with a VESC or aftermarket controller." },
    motor: { level: 1, note: "10-inch 4 Pro / Ultra motors are decent stock; few aftermarket options." }
  },
  "ninebot-max-g30": {
    vesc: { level: 3, note: "The most popular VESC conversion. 75100 fits behind the stock ESC location; guides cover throttle, display and light wiring." },
    battery: { level: 3, note: "Stock 10S4P 21700 space. 13S3P and 14S3P rebuilds with a 52 V controller or VESC take it to 40 km/h+. External dual-battery kits also common." },
    motor: { level: 3, note: "500 W aftermarket Max motors are a direct swap; pair with a 52 V controller or VESC for 45 km/h." }
  },
  "ninebot-es": {
    vesc: { level: 1, note: "Possible but the stem-mounted ESC and battery make it awkward; rarely done." },
    battery: { level: 2, note: "Stem pack is 10S3P 18650. External deck-mounted 10S packs (ES4 style) add range and current." },
    motor: { level: 1, note: "8-inch stem motor; almost no aftermarket options." }
  },
  "ninebot-f": {
    vesc: { level: 1, note: "Deck space is tight; VESC builds exist but need a custom enclosure." },
    battery: { level: 2, note: "10S3P–10S4P 18650 rebuilds in the stock box; F40 has the most room." },
    motor: { level: 1, note: "10-inch F-series motor is fine stock; little aftermarket." }
  },
  "ninebot-g2-p": {
    vesc: { level: 2, note: "Locked ESC makes VESC the only tuning path; G2 builds are documented, P/GT less so because they are fast stock." },
    battery: { level: 2, note: "Cell-level rebuilds are possible but the BMS is locked to the ESC; VESC required." },
    motor: { level: 1, note: "Stock motors are strong; keep them and add a VESC." }
  },
  "dualtron": {
    vesc: { level: 3, note: "Ubox 100 V dual-VESC swaps are the standard Thunder/Victor/Storm upgrade for smoother FOC power and full tuning." },
    battery: { level: 3, note: "Deck fits 16S–20S at 4P–6P of 21700 with P45B cells. Storm's swappable packs are the easiest battery upgrade in the industry." },
    motor: { level: 3, note: "Minimotors 60/72 V hubs interchange across models; Thunder motors into a Victor is a classic build." }
  },
  "kaabo": {
    vesc: { level: 3, note: "Mantis 10 and Wolf Warrior VESC builds are extremely well documented; Ubox and Flipsky dual units fit the deck." },
    battery: { level: 3, note: "Wolf deck fits 16S6P–20S5P 21700; Mantis fits 16S4P. 72 V Wolf conversions are common." },
    motor: { level: 3, note: "Kaabo, QS and Minimotors 10/11-inch hubs all fit the swingarms with minor spacer work." }
  },
  "vsett": {
    vesc: { level: 3, note: "Vsett 10+ VESC builds are common; the NFC ignition is bypassed when the stock controllers go." },
    battery: { level: 3, note: "10+ deck takes 16S5P 21700; 11+ takes 20S." },
    motor: { level: 2, note: "Zero 10X / Kaabo Mantis motors fit the 10+; 11+ takes 11-inch QS hubs." }
  },
  "zero": {
    vesc: { level: 3, note: "Zero 10X was one of the first mainstream VESC conversions; dual Flipsky 6.6 or Ubox builds are documented in detail." },
    battery: { level: 3, note: "10X deck fits 16S4P 21700 with a 60 V controller; 11X takes 20S." },
    motor: { level: 3, note: "10X swingarms accept QS and Kaabo 10-inch hubs; 11X takes 11-inch Minimotors hubs." }
  },
  "nami": {
    vesc: { level: 2, note: "Stock controllers are already sine-wave with deep settings; VESC swaps done mainly for logging and FOC feel." },
    battery: { level: 2, note: "72 V 32–40 Ah stock; deck is already full. Cell upgrades (P45B) are the main path." },
    motor: { level: 1, note: "Stock 1,500 W motors are near the chassis limit; keep them." }
  },
  "apollo": {
    vesc: { level: 2, note: "Ghost and Phantom V1 convert easily; LUDO-controller models need a full harness rebuild." },
    battery: { level: 2, note: "52 V 18–23 Ah stock; 14S6P 21700 rebuilds fit the Phantom deck." },
    motor: { level: 2, note: "Ghost / Phantom take standard 10-inch 52 V hubs." }
  },
  "emove": {
    vesc: { level: 2, note: "Cruiser has a huge deck; single 75100 or 75200 swaps are straightforward." },
    battery: { level: 3, note: "Cruiser deck fits 14S8P 21700 comfortably; 16S rebuilds with a 60 V controller are common." },
    motor: { level: 2, note: "10-inch 52 V hubs fit; Cruiser S uses a 1,600 W peak motor that handles 60 V well." }
  },
  "inokim": {
    vesc: { level: 1, note: "OX/OXO deck fits a VESC but proprietary connectors need a full rewire." },
    battery: { level: 2, note: "OXO fits 16S4P 21700; Light series has no room." },
    motor: { level: 1, note: "Few compatible motors outside OEM spares." }
  },
  "kugoo": {
    vesc: { level: 2, note: "Generic wiring makes a 75100 swap easy; G-Booster dual builds exist." },
    battery: { level: 2, note: "13S4P–13S5P 21700 fits the G-Booster deck; S1 has no room." },
    motor: { level: 2, note: "Generic 48 V 10-inch hubs are a direct fit on G-series." }
  },
  "kukirin": {
    vesc: { level: 2, note: "G2 Pro / G3 / G4 use generic harnesses; 75100 and Flipsky dual builds are documented." },
    battery: { level: 2, note: "G4 deck fits 16S4P 21700; G2 Pro fits 13S4P." },
    motor: { level: 2, note: "Generic 48–60 V 10-inch hubs swap in; G4 takes QS 10-inch 2,000 W." }
  },
  "teverun": {
    vesc: { level: 2, note: "Fighter and Blade harnesses are conventional; Ubox 100 V swaps done on Fighter 11+ and Supreme." },
    battery: { level: 3, note: "Fighter 11+ deck fits 20S5P–20S6P 21700; Blade GT fits 16S5P." },
    motor: { level: 2, note: "Minimotors and QS 11-inch hubs fit the Fighter swingarms." }
  },
  "nanrobot": {
    vesc: { level: 2, note: "Generic wiring; D6+ and LS7 VESC builds exist but need heavier phase wire." },
    battery: { level: 2, note: "D6+ fits 14S6P 21700; LS7 fits 20S6P." },
    motor: { level: 2, note: "QS 10-inch and 11-inch hubs are direct fits." }
  },
  "budget-generic": {
    vesc: { level: 1, note: "Technically possible but the VESC costs more than the scooter; rarely worth it." },
    battery: { level: 1, note: "Tiny decks; 10S3P 18650 is the ceiling." },
    motor: { level: 1, note: "8.5–10-inch generic hubs fit but the frames do not want more power." }
  },
  "rental": {
    vesc: { level: 3, note: "Ex-fleet Ninebot Max units are commonly converted with a VESC instead of a retail ESC, since the IoT dashboard is missing anyway." },
    battery: { level: 2, note: "Fleet packs are 10S4P 21700 with locked BMS; swap the BMS or rebuild with 13S." },
    motor: { level: 2, note: "Same 500 W Max motor swap as the retail G30." }
  },
  "niu": {
    vesc: { level: 2, note: "KQi3 Pro / Max convert with a 75100 and a Hall throttle; the stock display goes." },
    battery: { level: 2, note: "48 V 13S3P 21700 stock; 14S rebuilds fit with a VESC." },
    motor: { level: 1, note: "Stock 350–450 W hub is decent; keep it." }
  },
  "navee": {
    vesc: { level: 2, note: "N65 / S65 / ST3 have conventional 48 V harnesses; 75100 swaps documented." },
    battery: { level: 2, note: "13S4P 21700 stock; 14S–16S rebuilds fit with a VESC." },
    motor: { level: 2, note: "Generic 48 V 10-inch hubs fit N65 / S65." }
  }
};
