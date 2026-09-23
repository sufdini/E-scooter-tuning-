/*
 * Scooter tuning database.
 * Scores are 0–10 editorial ratings based on community tooling, hardware
 * headroom and how many well-documented mods exist for each platform.
 *
 * Keys:
 *  firmware  – how tunable the controller firmware / settings are
 *  hardware  – how much room there is for controller, battery, motor swaps
 *  community – size of the modding community and quality of guides
 *  headroom  – how much the stock hardware can safely take beyond stock
 *  value     – performance gained per dollar spent on tuning
 */
const SCOOTERS = [
  {
    id: "xiaomi-classic",
    brand: "Xiaomi",
    model: "M365 / Pro / Pro 2 / 1S / Essential / Mi 3",
    category: "commuter",
    price: "$300–$600",
    stockSpeed: "25 km/h (15.5 mph)",
    tunedSpeed: "30–35 km/h with CFW; 40+ km/h with 10S→12S/13S battery swap",
    stockPower: "250–300 W nominal",
    scores: { firmware: 10, hardware: 8, community: 10, headroom: 6, value: 10 },
    methods: ["Custom firmware (ScooterHacking Utility, m365 DownG)", "Controller swap (Pro 2 ESC into M365)", "Battery upgrade (higher current / higher voltage)", "Tire & brake upgrades"],
    verdict: "The undisputed king of firmware tuning. Ten minutes with a phone and ScooterHacking Utility unlocks speed, motor current, KERS and regen settings. Massive community, cheap parts, endless guides.",
    warnings: ["Bricking is possible if you flash the wrong firmware — always keep a stock backup.", "Raising motor current heats the stock 250 W motor quickly; keep it under 25 A on the M365 without a motor swap."],
    difficulty: "Easy",
    tag: "Best overall"
  },
  {
    id: "xiaomi-4",
    brand: "Xiaomi",
    model: "Mi 4 / 4 Pro / 4 Ultra / 4 Lite",
    category: "commuter",
    price: "$400–$900",
    stockSpeed: "25 km/h (15.5 mph)",
    tunedSpeed: "Region unlock only on most units",
    stockPower: "300–940 W peak",
    scores: { firmware: 4, hardware: 5, community: 6, headroom: 6, value: 4 },
    methods: ["Region change via app or ESC settings (where available)", "Controller swap to third-party sine-wave ESC", "Tire swap"],
    verdict: "Xiaomi encrypted the BLE and firmware on the 4-series, so the CFW golden age is over. Hardware is decent, but treat it as a stock commuter unless you are ready for a controller transplant.",
    warnings: ["Firmware downgrades are blocked on most 4-series units.", "Warranty is void the moment the ESC housing is opened."],
    difficulty: "Hard",
    tag: null
  },
  {
    id: "ninebot-max-g30",
    brand: "Ninebot / Segway",
    model: "Max G30 / G30P / G30LP / G30D",
    category: "commuter",
    price: "$600–$900",
    stockSpeed: "25–30 km/h (15.5–18.6 mph)",
    tunedSpeed: "35–40 km/h with CFW; 45+ km/h with 52 V controller kits",
    stockPower: "350 W nominal / 700 W peak",
    scores: { firmware: 9, hardware: 9, community: 9, headroom: 8, value: 9 },
    methods: ["Custom firmware (ScooterHacking Utility, Ninebot-Flasher)", "Higher-current or 52 V aftermarket controllers", "Battery expansion (dual battery, 52 V packs)", "Motor swap (500 W+ hub motors)"],
    verdict: "The best all-round tuning platform for a commuter. The G30 has beefy wiring, a tough frame and an ecosystem of drop-in controllers, so it scales from a sensible firmware bump to a 50 km/h build.",
    warnings: ["Newer G30 units ship with locked ESC firmware (v1.7+); check your firmware version before buying.", "Stock brake is mechanical drum — upgrade it before pushing past 35 km/h."],
    difficulty: "Easy",
    tag: "Best commuter"
  },
  {
    id: "ninebot-es",
    brand: "Ninebot / Segway",
    model: "ES1 / ES2 / ES3 / ES4 / E22 / E25 / E45",
    category: "commuter",
    price: "$350–$650",
    stockSpeed: "20–30 km/h",
    tunedSpeed: "30–35 km/h with CFW",
    stockPower: "300 W nominal",
    scores: { firmware: 9, hardware: 6, community: 8, headroom: 5, value: 8 },
    methods: ["Custom firmware (ScooterHacking Utility, ESx-tools)", "External battery pack (ES2 → ES4 conversion)", "Speed / region unlock"],
    verdict: "Cheap, plentiful and very well understood. The ES series was the first Ninebot to get open tooling; the E-series is basically the same platform with a fresh look.",
    warnings: ["Solid tires and small wheels make 35 km/h feel sketchy — upgrade the deck grip and ride within the frame's limits."],
    difficulty: "Easy",
    tag: "Best budget"
  },
  {
    id: "ninebot-f",
    brand: "Ninebot / Segway",
    model: "F25 / F30 / F40 / F65 / D-series",
    category: "commuter",
    price: "$400–$700",
    stockSpeed: "25–30 km/h",
    tunedSpeed: "32–35 km/h with CFW",
    stockPower: "300–350 W nominal",
    scores: { firmware: 8, hardware: 6, community: 7, headroom: 5, value: 7 },
    methods: ["Custom firmware (ScooterHacking Utility)", "Region unlock", "Tire swap to pneumatic"],
    verdict: "Solid mid-range platform with CFW support. Not as much hardware headroom as the Max, but a great entry into firmware tuning.",
    warnings: ["Later F-series batches use an updated BLE that needs a downgrade before flashing."],
    difficulty: "Easy",
    tag: null
  },
  {
    id: "ninebot-g2-p",
    brand: "Ninebot / Segway",
    model: "Max G2 / G65 / P65 / P100 / GT1 / GT2",
    category: "performance",
    price: "$900–$3,000",
    stockSpeed: "35–70 km/h",
    tunedSpeed: "Limited — region/speed mode changes via app",
    stockPower: "1000–3000 W peak",
    scores: { firmware: 5, hardware: 5, community: 6, headroom: 7, value: 5 },
    methods: ["Region / speed-mode changes via app (where supported)", "Firmware research is ongoing in the community", "Tire and suspension upgrades"],
    verdict: "Segway locked these down hard. They are quick from the factory, but tuning is mostly limited to whatever the app exposes. Buy these for stock performance, not for modding.",
    warnings: ["Encrypted ESC firmware — no reliable CFW at time of writing."],
    difficulty: "Hard",
    tag: null
  },
  {
    id: "dualtron",
    brand: "Dualtron (Minimotors)",
    model: "Spider / Thunder / Ultra / Victor / Storm / X",
    category: "performance",
    price: "$1,800–$7,000",
    stockSpeed: "60–110 km/h",
    tunedSpeed: "Deep P-setting tuning; 84 V controller & battery builds exceed 120 km/h",
    stockPower: "2 × 1,000–4,200 W",
    scores: { firmware: 8, hardware: 10, community: 9, headroom: 10, value: 7 },
    methods: ["EY3 / EY4 display P-settings (current, acceleration, phase, regen)", "Higher-amp Minimotors or third-party sine-wave controllers", "Battery pack upgrades (higher capacity, higher voltage)", "Motor swaps (higher power hub motors)", "Suspension cartridge & brake upgrades"],
    verdict: "The hyper-scooter benchmark. The P-settings menu gives you controller-level control out of the box, and the frames were over-engineered enough that people routinely push them well past stock power.",
    warnings: ["These are already fast enough to hurt you. Full protective gear is non-negotiable.", "High-voltage battery work is dangerous — leave 72–84 V pack builds to experienced builders."],
    difficulty: "Medium",
    tag: "Best performance"
  },
  {
    id: "kaabo",
    brand: "Kaabo",
    model: "Mantis 8 / 10 / King GT / Wolf Warrior / Wolf King GT",
    category: "performance",
    price: "$1,200–$4,000",
    stockSpeed: "40–100 km/h",
    tunedSpeed: "P-settings unlock; controller swaps add 20–30 %",
    stockPower: "2 × 800–2,000 W",
    scores: { firmware: 8, hardware: 9, community: 9, headroom: 9, value: 8 },
    methods: ["Display P-settings (speed limit, current, acceleration)", "Controller upgrades (higher amp sine-wave)", "Battery upgrades (higher Ah, better cells)", "Tire, suspension and brake upgrades"],
    verdict: "Best value in the performance class. Kaabo controllers are widely swapped, the Mantis chassis is a modding favourite, and the Wolf line has practically unlimited hardware headroom.",
    warnings: ["Stock hydraulic brakes are borderline on the Wolf Warrior at tuned speeds — upgrade rotors and pads.", "Water resistance drops significantly after opening the deck."],
    difficulty: "Medium",
    tag: "Best value performance"
  },
  {
    id: "vsett",
    brand: "Vsett",
    model: "8 / 9+ / 10+ / 11+",
    category: "performance",
    price: "$1,000–$3,500",
    stockSpeed: "40–90 km/h",
    tunedSpeed: "Display P-settings; controller swaps common",
    stockPower: "2 × 600–1,500 W",
    scores: { firmware: 8, hardware: 8, community: 7, headroom: 8, value: 8 },
    methods: ["Display P-settings", "Controller upgrades", "Battery upgrades", "NFC ignition removal / key mods"],
    verdict: "Vsett inherited the Zero platform's easy P-settings and added quality-of-life features. A well-supported middle ground between commuter and hyper-scooter.",
    warnings: ["Aftermarket controllers may need the NFC lock bypassed."],
    difficulty: "Medium",
    tag: null
  },
  {
    id: "zero",
    brand: "Zero",
    model: "8 / 9 / 10X / 11X",
    category: "performance",
    price: "$700–$3,000",
    stockSpeed: "35–90 km/h",
    tunedSpeed: "P-settings unlock; controller swaps add 20 %+",
    stockPower: "500–2 × 1,600 W",
    scores: { firmware: 8, hardware: 8, community: 8, headroom: 8, value: 8 },
    methods: ["Display P-settings", "Controller upgrades", "Battery upgrades", "Brake and tire upgrades"],
    verdict: "The Zero 10X is one of the most-modded performance scooters ever made. Huge parts availability, well-documented P-settings and an easily accessible deck.",
    warnings: ["Older Zero 10X batteries used weaker cells — monitor voltage sag when raising current."],
    difficulty: "Medium",
    tag: null
  },
  {
    id: "nami",
    brand: "NAMI",
    model: "Burn-E / Burn-E 2 / Klima",
    category: "performance",
    price: "$2,500–$5,000",
    stockSpeed: "50–100 km/h",
    tunedSpeed: "Fine-grained stock tuning; already near hardware limits",
    stockPower: "2 × 1,000–1,500 W",
    scores: { firmware: 9, hardware: 7, community: 7, headroom: 6, value: 6 },
    methods: ["Advanced display / app settings (throttle curves, regen, current)", "Suspension tuning", "Tire upgrades"],
    verdict: "NAMI gives you detailed control from the factory — throttle response, regen strength, current limits — so you rarely need to open it up. Less hardware headroom because it already ships near its limits.",
    warnings: ["Premium components mean premium replacement costs if something is pushed too hard."],
    difficulty: "Easy",
    tag: null
  },
  {
    id: "apollo",
    brand: "Apollo",
    model: "City / Ghost / Phantom / Pro / Go",
    category: "performance",
    price: "$900–$3,000",
    stockSpeed: "40–70 km/h",
    tunedSpeed: "App-based tuning (Apollo app) on newer models",
    stockPower: "500–2 × 1,200 W",
    scores: { firmware: 7, hardware: 6, community: 7, headroom: 6, value: 6 },
    methods: ["Apollo app tuning (acceleration, regen, speed modes)", "Display P-settings on Ghost / Phantom V1", "Controller upgrades on older models"],
    verdict: "Apollo moved from generic P-settings to a proprietary app with a lot of adjustability. Newer models are fine to tune within the app, but less friendly to hardware mods.",
    warnings: ["Proprietary LUDO controllers on newer models limit third-party controller options."],
    difficulty: "Easy",
    tag: null
  },
  {
    id: "emove",
    brand: "EMOVE",
    model: "Cruiser / Cruiser S / RoadRunner / RoadRunner Pro",
    category: "performance",
    price: "$1,000–$2,500",
    stockSpeed: "40–60 km/h",
    tunedSpeed: "P-settings unlock; controller swaps common",
    stockPower: "1,000–2 × 1,000 W",
    scores: { firmware: 7, hardware: 8, community: 7, headroom: 7, value: 8 },
    methods: ["Display P-settings", "Controller upgrades", "Tire upgrades", "Seat & range mods (RoadRunner)"],
    verdict: "Big batteries and simple electronics make EMOVE scooters excellent range-and-comfort mod platforms. Huge stock range means you can spend it on speed.",
    warnings: ["The Cruiser is heavy — brake upgrades matter more than speed."],
    difficulty: "Medium",
    tag: null
  },
  {
    id: "inokim",
    brand: "Inokim",
    model: "Light 2 / Quick 4 / OX / OXO",
    category: "commuter",
    price: "$700–$2,200",
    stockSpeed: "25–65 km/h",
    tunedSpeed: "Hidden menu speed unlock on OX / OXO",
    stockPower: "350–2 × 1,000 W",
    scores: { firmware: 6, hardware: 6, community: 5, headroom: 6, value: 5 },
    methods: ["Hidden display menu (speed limit, current)", "Controller swap (OX / OXO)", "Tire upgrades"],
    verdict: "Well-built but a smaller modding scene. The OX/OXO have a hidden settings menu; the Light and Quick are best left near stock.",
    warnings: ["Proprietary connectors on the Light series complicate controller swaps."],
    difficulty: "Medium",
    tag: null
  },
  {
    id: "kugoo",
    brand: "Kugoo / Kukirin",
    model: "S1 / G-Booster / G2 Pro / Kirin M4 / G3",
    category: "budget",
    price: "$300–$1,000",
    stockSpeed: "25–55 km/h",
    tunedSpeed: "P-settings unlock; generic controller swaps",
    stockPower: "350–2 × 800 W",
    scores: { firmware: 7, hardware: 7, community: 6, headroom: 6, value: 9 },
    methods: ["Display P-settings", "Generic controller swap", "Battery upgrades"],
    verdict: "Cheap, generic and easy to tinker with. Parts are standard, P-settings are open, and nobody cries when a $400 scooter gets a new controller.",
    warnings: ["Build quality varies — check welds and wiring before pushing more power."],
    difficulty: "Easy",
    tag: null
  },
  {
    id: "nanrobot",
    brand: "Nanrobot",
    model: "D4+ / D6+ / LS7",
    category: "performance",
    price: "$1,200–$3,000",
    stockSpeed: "60–90 km/h",
    tunedSpeed: "P-settings; controller and battery swaps",
    stockPower: "2 × 1,000–2,400 W",
    scores: { firmware: 7, hardware: 8, community: 5, headroom: 8, value: 7 },
    methods: ["Display P-settings", "Controller upgrades", "Battery upgrades", "Brake upgrades"],
    verdict: "Generic Chinese performance platform with lots of headroom and plenty of compatible parts, but a smaller English-speaking community.",
    warnings: ["Wiring gauge on older models is marginal for large current increases."],
    difficulty: "Medium",
    tag: null
  },
  {
    id: "budget-generic",
    brand: "Hiboy / Gotrax / TurboAnt / Razor",
    model: "S2 / GXL V2 / X7 / E-Prime",
    category: "budget",
    price: "$250–$500",
    stockSpeed: "25–30 km/h",
    tunedSpeed: "Controller swap only — no firmware tooling",
    stockPower: "250–350 W",
    scores: { firmware: 3, hardware: 5, community: 4, headroom: 3, value: 4 },
    methods: ["Generic controller swap", "Battery upgrade (limited by frame space)", "Tire swap"],
    verdict: "Budget scooters with generic electronics. There is no firmware community, so tuning means swapping the controller — usually not worth it versus buying a Xiaomi or Ninebot.",
    warnings: ["Small wheels and weak brakes limit safe tuned speed to about 30 km/h."],
    difficulty: "Hard",
    tag: null
  },
  {
    id: "rental",
    brand: "Bird / Lime / Rental units",
    model: "Bird One / Lime Gen 4 / ex-fleet Ninebot Max",
    category: "budget",
    price: "$100–$400 used",
    stockSpeed: "20–25 km/h",
    tunedSpeed: "Converting ex-fleet units requires new ESC and dashboard",
    stockPower: "350 W",
    scores: { firmware: 2, hardware: 6, community: 5, headroom: 6, value: 5 },
    methods: ["Full ESC + dashboard conversion (ex-Ninebot Max fleet units)", "Battery pack reuse"],
    verdict: "Ex-fleet Ninebot Max units can be converted with a retail ESC and dashboard and then tuned like any G30 — but only buy from legitimate fleet auctions.",
    warnings: ["Only buy decommissioned units from official fleet resellers. Active fleet scooters are tracked and stolen units are not yours to tune."],
    difficulty: "Hard",
    tag: null
  }
];

const METHODS = [
  {
    title: "Custom firmware (CFW)",
    icon: "⚡",
    brands: "Xiaomi (pre-4 series), Ninebot ES/E/F/Max G30",
    effort: "10 minutes, phone + app",
    description: "Tools like ScooterHacking Utility (SHU) and m365 DownG let you generate a firmware image with your own speed limit, motor current, KERS level and cruise settings, then flash it over Bluetooth. This is the highest impact, lowest cost tuning that exists."
  },
  {
    title: "P-settings / hidden menus",
    icon: "🎛️",
    brands: "Dualtron, Kaabo, Vsett, Zero, EMOVE, Kugoo, Nanrobot, Inokim OX",
    effort: "2 minutes, no tools",
    description: "Most performance scooters use a Minimotors-style EY3/EY4 or QS-S4 display. Holding two buttons opens a parameter menu where you can raise the speed limit, set phase current, sharpen acceleration and tune regen braking."
  },
  {
    title: "Controller (ESC) upgrade",
    icon: "🔌",
    brands: "Ninebot Max, Kaabo, Dualtron, Zero, Vsett, EMOVE, budget scooters",
    effort: "1–3 hours, basic tools",
    description: "Swapping to a higher-amp or sine-wave controller is the classic hardware tune. It raises peak current (torque) and often supports higher battery voltage. Match phase wires and Hall sensors carefully and confirm the motor can handle the added heat."
  },
  {
    title: "Battery upgrade",
    icon: "🔋",
    brands: "Everything with deck space",
    effort: "2–6 hours, or buy pre-built",
    description: "Higher-capacity packs add range; higher-voltage packs (e.g. 36 V → 48 V, 60 V → 72 V) add speed. Always pair a voltage bump with a controller and BMS that are rated for it, and never mix cells of different age or chemistry."
  },
  {
    title: "Motor swap",
    icon: "⚙️",
    brands: "Ninebot Max, Xiaomi, Dualtron, Kaabo",
    effort: "2–4 hours",
    description: "Larger hub motors with more copper handle higher current without overheating. On commuter scooters this is what lets a firmware tune become a sustained 35–40 km/h cruise rather than a 30-second burst."
  },
  {
    title: "Brakes, tires & suspension",
    icon: "🛞",
    brands: "Everything",
    effort: "30 minutes – 2 hours",
    description: "The unglamorous half of tuning. Every 5 km/h you add needs more braking and more grip. Pneumatic tires, larger rotors, better pads and stiffer suspension springs are the mods that keep a fast scooter rideable."
  }
];

const FAQ = [
  {
    q: "Which e-scooter is the absolute best for tuning?",
    a: "For pure tunability: the classic Xiaomi M365 / Pro 2 family, thanks to ten-minute custom firmware and the biggest community. For a commuter you want to build on: the Ninebot Max G30 (pre-1.7 firmware), which adds strong hardware and a huge parts ecosystem. For performance: Dualtron and Kaabo."
  },
  {
    q: "Is tuning legal?",
    a: "It depends on where you ride. Many countries cap e-scooter speed on public roads at 20–25 km/h, and a tuned scooter may be classed as an unregistered motor vehicle. Tuning for private land or closed courses is usually fine; riding tuned on public roads may not be. Know your local law."
  },
  {
    q: "Will tuning void my warranty?",
    a: "Almost always yes for firmware changes and any opened electronics. Some manufacturers (Xiaomi, Ninebot) can detect custom firmware flashes even after you restore stock."
  },
  {
    q: "Can I brick my scooter?",
    a: "With firmware tuning, yes, but it is rare when you follow guides and back up first. Ninebot and Xiaomi units can usually be recovered with an ST-Link programmer if a flash goes wrong."
  },
  {
    q: "What about the newest Xiaomi and Segway models?",
    a: "Xiaomi 4-series and Segway G2/P-series ship with encrypted firmware. There is no reliable custom firmware for them. If tuning matters to you, buy an older platform or a performance scooter with P-settings."
  },
  {
    q: "What is a safe amount of extra speed?",
    a: "A rule of thumb: never exceed what your brakes and tires can handle. On a stock M365 with solid rear tire and a drum-less rear disc, 30 km/h is a sensible ceiling. On a Ninebot Max with an upgraded brake, 35–40 km/h. Anything above that needs a purpose-built performance chassis."
  }
];
