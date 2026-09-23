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
  const sortEl = document.getElementById("sort");
  const diffEl = document.getElementById("difficulty");
  const countEl = document.getElementById("result-count");

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
        <details class="card-more">
          <summary>Methods &amp; warnings</summary>
          <div class="more-body">
            <h4>Tuning methods</h4>
            <ul>${methods}</ul>
            <h4>Watch out for</h4>
            <ul class="warn">${warnings}</ul>
          </div>
        </details>
      </article>`;
  }

  function renderGrid() {
    const q = searchEl.value.trim().toLowerCase();
    const cat = catEl.value;
    const brand = brandEl.value;
    const diff = diffEl.value;
    const sortKey = sortEl.value;

    let list = scooters.filter(s =>
      (cat === "all" || s.category === cat) &&
      (brand === "all" || s.brand === brand) &&
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

  [searchEl, brandEl, catEl, sortEl, diffEl].forEach(el => el.addEventListener("input", renderGrid));

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
  renderTopPicks();
  renderGrid();
  populateSelects();
  renderCompare();
  renderMethods();
  renderFAQ();
})();
