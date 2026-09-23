(function () {
  "use strict";

  const WEIGHTS = { firmware: 0.3, hardware: 0.25, community: 0.2, headroom: 0.15, value: 0.1 };
  const CRITERIA = [
    ["firmware", "Firmware"],
    ["hardware", "Hardware"],
    ["community", "Community"],
    ["headroom", "Headroom"],
    ["value", "Value"]
  ];
  const CATEGORY_LABEL = { commuter: "Commuter", performance: "Performance", budget: "Budget" };

  function overall(s) {
    let total = 0;
    for (const k in WEIGHTS) total += s.scores[k] * WEIGHTS[k];
    return Math.round(total * 10) / 10;
  }

  function ringColor(score) {
    if (score >= 8.5) return "#2ee6a6";
    if (score >= 7) return "#ffcc33";
    if (score >= 5) return "#ffab4c";
    return "#ff6b6b";
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const scooters = SCOOTERS.map(s => ({ ...s, overall: overall(s) }));

  function slug(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  const modelsByPlatform = MODELS.reduce((m, x) => ((m[x.platform] = (m[x.platform] || 0) + 1), m), {});
  function modelCount(id) { return modelsByPlatform[id] || 0; }

  /* ---------- Top picks ---------- */
  function renderTopPicks() {
    const el = document.getElementById("top-picks");
    const byOverall = (a, b) => b.overall - a.overall;
    const specs = [
      { label: "Best overall", filter: () => true, sort: byOverall, why: "Highest weighted score across every criterion." },
      { label: "Best commuter", filter: s => s.category === "commuter", sort: byOverall, why: "Open firmware, strong parts ecosystem, sane hardware." },
      { label: "Best performance", filter: s => s.category === "performance", sort: byOverall, why: "Deepest settings and unlimited hardware headroom." },
      { label: "Best budget", filter: s => s.category === "budget", sort: byOverall, why: "Cheapest way into hardware tuning with open P-settings." },
      { label: "Easiest to tune", filter: s => s.difficulty === "Easy", sort: (a, b) => b.scores.firmware - a.scores.firmware || byOverall(a, b), why: "Phone, app, ten minutes. No tools required." },
      { label: "Most hardware headroom", filter: () => true, sort: (a, b) => b.scores.hardware - a.scores.hardware || b.scores.headroom - a.scores.headroom, why: "Built to take well beyond its stock power." }
    ];
    // Each platform appears at most once so the picks show six distinct scooters.
    const used = new Set();
    const picks = specs.map(spec => {
      const pick = scooters.filter(s => spec.filter(s) && !used.has(s.id)).sort(spec.sort)[0];
      if (pick) used.add(pick.id);
      return { ...spec, pick };
    }).filter(p => p.pick);
    el.innerHTML = picks.map(p => `
      <article class="pick-card">
        <span class="pick-label">${esc(p.label)}</span>
        <h3>${esc(p.pick.brand)}</h3>
        <p class="pick-model">${esc(p.pick.model)}</p>
        <div class="pick-score">${p.pick.overall.toFixed(1)}<small> / 10</small></div>
        <p class="pick-why">${esc(p.why)}</p>
      </article>`).join("");
  }

  /* ---------- Scooter grid ---------- */
  const grid = document.getElementById("scooter-grid");
  const searchEl = document.getElementById("search");
  const catEl = document.getElementById("category");
  const brandEl = document.getElementById("brand");
  const deepEl = document.getElementById("deepmod");
  const sortEl = document.getElementById("sort");
  const diffEl = document.getElementById("difficulty");
  const countEl = document.getElementById("result-count");

  function deepHTML(id) {
    const d = DEEP_MODS[id];
    if (!d) return "";
    const row = (label, m) => `
      <span class="fit fit-${m.level}">${FIT[m.level]}</span>
      <span><span class="deep-label">${label}:</span> <span class="deep-note">${esc(m.note)}</span></span>`;
    return `
      <h4>Deep mods <a href="#deep-mods" style="font-weight:500;text-transform:none;letter-spacing:0">(guides ▸)</a></h4>
      <div class="deep-row">
        ${row("VESC", d.vesc)}
        ${row("Custom battery", d.battery)}
        ${row("Hub motor", d.motor)}
      </div>`;
  }

  function cardHTML(s) {
    const pct = s.overall * 10;
    const bars = CRITERIA.map(([k, label]) => `
      <div class="bar-row">
        <span class="label">${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${s.scores[k] * 10}%"></div></div>
        <span class="num">${s.scores[k]}</span>
      </div>`).join("");
    const methods = s.methods.map(m => `<li>${esc(m)}</li>`).join("");
    const warnings = s.warnings.map(w => `<li>${esc(w)}</li>`).join("");
    return `
      <article class="scooter-card" data-id="${s.id}">
        <div class="card-head">
          <div>
            <p class="card-brand">${esc(s.brand)}</p>
            <h3 class="card-model">${esc(s.model)}</h3>
          </div>
          <div class="score-ring" style="--pct:${pct};--ring-color:${ringColor(s.overall)}" title="Overall tuning score">
            <span>${s.overall.toFixed(1)}</span>
          </div>
        </div>
        <div class="badges">
          ${s.tag ? `<span class="badge badge-tag">★ ${esc(s.tag)}</span>` : ""}
          <span class="badge">${CATEGORY_LABEL[s.category]}</span>
          <span class="badge badge-${s.difficulty.toLowerCase()}">${s.difficulty} to tune</span>
          <span class="badge">${esc(s.price)}</span>
        </div>
        <div class="bars">${bars}</div>
        <dl class="specs">
          <div><dt>Stock speed</dt><dd>${esc(s.stockSpeed)}</dd></div>
          <div><dt>Stock power</dt><dd>${esc(s.stockPower)}</dd></div>
          <div style="grid-column:1/-1"><dt>Tuned potential</dt><dd>${esc(s.tunedSpeed)}</dd></div>
        </dl>
        <p class="card-verdict">${esc(s.verdict)}</p>
        ${modelCount(s.id) ? `<p class="card-models"><a href="#brand-${slug(s.brand)}" data-open-brand="${esc(s.brand)}">See all ${modelCount(s.id)} ${modelCount(s.id) === 1 ? "model" : "models"} ▸</a></p>` : ""}
        <details class="card-more">
          <summary>Methods &amp; warnings</summary>
          <div class="more-body">
            <h4>Tuning methods</h4>
            <ul>${methods}</ul>
            <h4>Watch out for</h4>
            <ul class="warn">${warnings}</ul>
            ${deepHTML(s.id)}
          </div>
        </details>
      </article>`;
  }

  function renderGrid() {
    const q = searchEl.value.trim().toLowerCase();
    const cat = catEl.value;
    const brand = brandEl.value;
    const deep = deepEl.value;
    const diff = diffEl.value;
    const sortKey = sortEl.value;

    let list = scooters.filter(s =>
      (cat === "all" || s.category === cat) &&
      (brand === "all" || s.brand === brand) &&
      (deep === "all" || ((DEEP_MODS[s.id] || {})[deep] || { level: 0 }).level >= 2) &&
      (diff === "all" || s.difficulty === diff) &&
      (!q || (s.brand + " " + s.model + " " + s.tag).toLowerCase().includes(q))
    );

    list.sort((a, b) => {
      const av = sortKey === "overall" ? a.overall : a.scores[sortKey];
      const bv = sortKey === "overall" ? b.overall : b.scores[sortKey];
      return bv - av || b.overall - a.overall;
    });

    countEl.textContent = `${list.length} of ${scooters.length} platforms`;
    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<p class="empty">No scooters match those filters.</p>`;
  }

  const brands = [...new Set(scooters.map(s => s.brand))].sort((a, b) => a.localeCompare(b));
  brandEl.insertAdjacentHTML("beforeend", brands.map(b => `<option value="${esc(b)}">${esc(b)}</option>`).join(""));

  [searchEl, brandEl, deepEl, catEl, sortEl, diffEl].forEach(el => el.addEventListener("input", renderGrid));

  /* ---------- Compare ---------- */
  const selects = Array.from(document.querySelectorAll(".compare-select"));
  const table = document.getElementById("compare-table");
  const defaults = ["ninebot-max-g30", "xiaomi-classic", "dualtron"];

  function populateSelects() {
    const opts = `<option value="">— none —</option>` +
      [...scooters].sort((a, b) => a.brand.localeCompare(b.brand))
        .map(s => `<option value="${s.id}">${esc(s.brand)} – ${esc(s.model)}</option>`).join("");
    selects.forEach((sel, i) => {
      sel.innerHTML = opts;
      sel.value = defaults[i];
      sel.addEventListener("change", renderCompare);
    });
  }

  function renderCompare() {
    const chosen = selects.map(sel => scooters.find(s => s.id === sel.value)).filter(Boolean);
    if (!chosen.length) {
      table.innerHTML = `<tbody><tr><td class="empty">Pick at least one scooter to compare.</td></tr></tbody>`;
      return;
    }
    const numericRow = (label, getter, fmt = v => v) => {
      const vals = chosen.map(getter);
      const best = Math.max(...vals);
      return `<tr><th>${label}</th>${vals.map(v =>
        `<td class="${v === best && chosen.length > 1 ? "best" : ""}">${fmt(v)}</td>`).join("")}</tr>`;
    };
    const textRow = (label, getter) =>
      `<tr><th>${label}</th>${chosen.map(s => `<td>${getter(s)}</td>`).join("")}</tr>`;

    table.innerHTML = `
      <thead><tr><th></th>${chosen.map(s => `<th>${esc(s.brand)}<br><small style="font-weight:400;color:var(--muted)">${esc(s.model)}</small></th>`).join("")}</tr></thead>
      <tbody>
        ${numericRow("Overall score", s => s.overall, v => v.toFixed(1) + " / 10")}
        ${CRITERIA.map(([k, label]) => numericRow(label, s => s.scores[k])).join("")}
        ${textRow("Class", s => CATEGORY_LABEL[s.category])}
        ${textRow("Difficulty", s => esc(s.difficulty))}
        ${textRow("Price", s => esc(s.price))}
        ${textRow("Stock speed", s => esc(s.stockSpeed))}
        ${textRow("Stock power", s => esc(s.stockPower))}
        ${textRow("Tuned potential", s => esc(s.tunedSpeed))}
        ${textRow("Methods", s => `<ul>${s.methods.map(m => `<li>${esc(m)}</li>`).join("")}</ul>`)}
      </tbody>`;
  }


  /* ---------- Model catalogue ---------- */
  const catalogueEl = document.getElementById("brand-catalogue");
  const modelSearchEl = document.getElementById("model-search");
  const modelPotEl = document.getElementById("model-potential");
  const modelCountEl = document.getElementById("model-count");

  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
    return safe.replace(re, m => `<mark>${m}</mark>`);
  }

  function renderCatalogue() {
    const brandOrder = [...new Set(scooters.map(s => s.brand))]
      .map(b => ({ brand: b, best: Math.max(...scooters.filter(s => s.brand === b).map(s => s.overall)) }))
      .sort((a, b) => b.best - a.best || a.brand.localeCompare(b.brand));

    catalogueEl.innerHTML = brandOrder.map(({ brand, best }) => {
      const list = MODELS.filter(m => m.brand === brand);
      if (!list.length) return "";
      const rows = list.map(m => `
        <tr data-search="${esc((m.name + " " + brand + " " + m.notes).toLowerCase())}" data-pot="${m.potential}">
          <td class="model-name">${esc(m.name)}</td>
          <td class="model-year">${m.year}</td>
          <td>${esc(m.motor)}</td>
          <td>${esc(m.battery)}</td>
          <td class="model-speed">${esc(m.speed)}</td>
          <td><span class="pot pot-${m.potential}">${POTENTIAL[m.potential]}</span></td>
          <td class="model-notes">${esc(m.notes)}</td>
        </tr>`).join("");
      return `
        <details class="brand-block" id="brand-${slug(brand)}" data-brand="${esc(brand)}">
          <summary>
            <span>${esc(brand)}</span>
            <span class="brand-meta">
              <span class="badge"><span class="brand-model-count">${list.length}</span> models</span>
              <span class="brand-score">best platform ${best.toFixed(1)} / 10</span>
            </span>
          </summary>
          <div class="table-wrap">
            <table class="model-table">
              <thead><tr><th>Model</th><th>Year</th><th>Motor</th><th>Battery</th><th>Stock speed</th><th>Tuning potential</th><th>Notes</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </details>`;
    }).join("");
    filterCatalogue();
  }

  function filterCatalogue() {
    const q = modelSearchEl.value.trim().toLowerCase();
    const minPot = Number(modelPotEl.value);
    let shown = 0;
    catalogueEl.querySelectorAll(".brand-block").forEach(block => {
      let visible = 0;
      block.querySelectorAll("tbody tr").forEach(tr => {
        const ok = (!q || tr.dataset.search.includes(q)) && Number(tr.dataset.pot) >= minPot;
        tr.classList.toggle("hidden", !ok);
        if (ok) visible++;
        const nameCell = tr.querySelector(".model-name");
        nameCell.innerHTML = highlight(nameCell.textContent, q);
      });
      block.querySelector(".brand-model-count").textContent = visible;
      block.style.display = visible ? "" : "none";
      if (q && visible) block.open = true;
      shown += visible;
    });
    modelCountEl.textContent = `${shown} of ${MODELS.length} models across ${new Set(MODELS.map(m => m.brand)).size} brands`;
  }

  [modelSearchEl, modelPotEl].forEach(el => el.addEventListener("input", filterCatalogue));
  document.getElementById("expand-all").addEventListener("click", () =>
    catalogueEl.querySelectorAll(".brand-block").forEach(d => { d.open = true; }));
  document.getElementById("collapse-all").addEventListener("click", () =>
    catalogueEl.querySelectorAll(".brand-block").forEach(d => { d.open = false; }));

  // "See all models" links on platform cards open the matching brand block.
  grid.addEventListener("click", e => {
    const link = e.target.closest("[data-open-brand]");
    if (!link) return;
    const block = document.getElementById("brand-" + slug(link.dataset.openBrand));
    if (block) block.open = true;
  });


  /* ---------- Deep mods ---------- */
  function modTable(id, headers, rows) {
    document.getElementById(id).innerHTML =
      `<thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>` +
      `<tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td class="${i === r.length - 1 ? "muted" : ""}">${c}</td>`).join("")}</tr>`).join("")}</tbody>`;
  }
  function steps(id, list) {
    document.getElementById(id).innerHTML = list.map(st => `<li><h4>${esc(st.title)}</h4><p>${esc(st.body)}</p></li>`).join("");
  }
  function fitTable(id, key) {
    const rows = [...scooters]
      .map(s => ({ s, m: (DEEP_MODS[s.id] || {})[key] }))
      .filter(x => x.m)
      .sort((a, b) => b.m.level - a.m.level || b.s.overall - a.s.overall)
      .map(({ s, m }) => [
        `${esc(s.brand)}<br><small style="font-weight:400;color:var(--muted)">${esc(s.model)}</small>`,
        `<span class="fit fit-${m.level}">${FIT[m.level]}</span>`,
        esc(m.note)
      ]);
    modTable(id, ["Platform", "Fit", "Notes"], rows);
  }

  function renderDeepMods() {
    modTable("vesc-table", ["Controller", "Voltage", "Current", "Motors", "Price", "Best for"],
      VESC_CONTROLLERS.map(v => [esc(v.name), esc(v.volts), esc(v.amps), esc(v.form), esc(v.price), esc(v.best)]));
    steps("vesc-steps", VESC_STEPS);
    fitTable("vesc-fit", "vesc");

    modTable("cell-table", ["Cell", "Format", "Capacity", "Continuous", "Best for"],
      BATTERY_CELLS.map(c => [esc(c.cell), esc(c.format), esc(c.capacity), esc(c.current), esc(c.best)]));
    modTable("config-table", ["Series", "Nominal", "Full charge", "Typical scooters", "Notes"],
      BATTERY_CONFIGS.map(c => [esc(c.series), esc(c.nominal), esc(c.full), esc(c.typical), esc(c.note)]));
    steps("battery-steps", BATTERY_STEPS);
    fitTable("battery-fit", "battery");

    modTable("motor-table", ["Motor", "Wheel", "Power", "Voltage", "Axle", "Fits"],
      HUB_MOTORS.map(m => [esc(m.motor), esc(m.size), esc(m.power), esc(m.volts), esc(m.axle), esc(m.fits)]));
    steps("motor-steps", MOTOR_STEPS);
    fitTable("motor-fit", "motor");

    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");
    tabs.forEach(tab => tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.toggle("active", t === tab));
      panels.forEach(p => p.classList.toggle("active", p.dataset.panel === tab.dataset.tab));
    }));
  }

  /* ---------- Methods ---------- */
  function renderMethods() {
    document.getElementById("methods-grid").innerHTML = METHODS.map(m => `
      <article class="method-card">
        <div class="method-icon">${m.icon}</div>
        <h3>${esc(m.title)}</h3>
        <div class="method-meta">
          <span><strong>Brands:</strong> ${esc(m.brands)}</span>
          <span><strong>Effort:</strong> ${esc(m.effort)}</span>
        </div>
        <p>${esc(m.description)}</p>
      </article>`).join("");
  }

  /* ---------- FAQ ---------- */
  function renderFAQ() {
    document.getElementById("faq-list").innerHTML = FAQ.map(f => `
      <details>
        <summary>${esc(f.q)}</summary>
        <p>${esc(f.a)}</p>
      </details>`).join("");
  }

  /* ---------- Nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Init ---------- */
  document.getElementById("stat-count").textContent = scooters.length;
  document.getElementById("stat-count-inline").textContent = scooters.length;
  document.getElementById("stat-brands").textContent = brands.length;
  document.getElementById("stat-models").textContent = MODELS.length;
  renderTopPicks();
  renderGrid();
  populateSelects();
  renderCompare();
  renderCatalogue();
  renderDeepMods();
  renderMethods();
  renderFAQ();
})();
