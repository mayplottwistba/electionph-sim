
let selectedCandidates = [];
let mainPlayerId = null;
let provinces = [];
let electionResults = [];
let provincialResults = [];

const money = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0
});

const number = new Intl.NumberFormat("en-PH");

// ====================================
// GENERAL HELPERS
// ====================================

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[ch]);
}

function calculateAge(birth) {
  const today = new Date();
  const date = new Date(birth + "T00:00:00");

  let result = today.getFullYear() - date.getFullYear();

  if (
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() &&
      today.getDate() < date.getDate())
  ) {
    result--;
  }

  return result;
}

function getCandidate(id) {
  return candidates.find(c => c.id === id);
}

// ====================================
// CANDIDATE PHOTOS
// ====================================

function photoHTML(candidate) {
  const initials = candidate.name
    .split(" ")
    .map(x => x[0])
    .join("")
    .slice(0, 2);

  return `
    <div class="photo-initials">
      ${escapeHTML(initials)}
    </div>

    <img
      id="photo-${escapeHTML(candidate.id)}"
      alt="${escapeHTML(candidate.name)}"
      loading="lazy"
      hidden
    >
  `;
}

async function loadCandidatePhotos() {
  const photoPromises = candidates.map(async candidate => {
    const img = document.getElementById(`photo-${candidate.id}`);

    if (!img) return;

    try {
      const apiURL =
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(candidate.wiki);

      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error("Wikipedia image unavailable");
      }

      const data = await response.json();

      if (!data.thumbnail?.source) {
        throw new Error("No thumbnail available");
      }

      img.onload = () => {
        img.hidden = false;
        img.previousElementSibling.style.display = "none";
      };

      img.onerror = () => {
        img.hidden = true;
      };

      img.src = data.thumbnail.source;

    } catch (error) {
      console.warn("Photo unavailable:", candidate.name, error);
    }
  });

  await Promise.allSettled(photoPromises);
}

// ====================================
// CANDIDATE CARDS
// ====================================

function renderCandidates() {
  const grid = document.getElementById("candidateGrid");

  grid.innerHTML = candidates.map((c, index) => {
    const selected = selectedCandidates.includes(c.id);
    const isMain = mainPlayerId === c.id;
    const budget = calculateCampaignBudget(c);

    return `
      <article class="candidate-card ${selected ? "selected" : ""}">

        <div class="candidate-photo">
          ${photoHTML(c)}
        </div>

        <div class="candidate-info">

          <div class="candidate-id">
            CANDIDATE ${String(index + 1).padStart(2, "0")}
          </div>

          <div class="candidate-name">
            ${escapeHTML(c.name)}
          </div>

          <div class="candidate-meta">
            ${calculateAge(c.birth)} YEARS OLD<br>
            ${escapeHTML(c.hometown)}
          </div>

          <div class="party">
            ${escapeHTML(c.party)}
          </div>

          <div class="budget">
            <small>CAMPAIGN BUDGET · 10% SALN</small>

            <strong>
              ${budget.salnVerified
                ? money.format(budget.total)
                : "NOT AVAILABLE"}
            </strong>

            <small>
              ${budget.salnVerified
                ? "SALN YEAR: " + escapeHTML(c.salnYear || "Unspecified")
                : "Declared SALN not verified"}
            </small>
          </div>

          <div class="advocacy-title">
            TOP 4 ADVOCACIES
          </div>

          <ul class="advocacies">
            ${c.advocacies.map(a =>
              `<li>${escapeHTML(a)}</li>`
            ).join("")}
          </ul>

          <div class="card-actions">

            <button
              class="select-btn ${selected ? "active" : ""}"
              onclick="toggleCandidate('${c.id}')"
            >
              ${selected ? "✓ SELECTED" : "+ SELECT"}
            </button>

            <button
              class="main-btn ${isMain ? "active" : ""}"
              onclick="setMainPlayer('${c.id}')"
              ${!selected ? "disabled" : ""}
            >
              ${isMain ? "★ MAIN" : "MAIN PLAYER"}
            </button>

          </div>

        </div>
      </article>
    `;
  }).join("");

  updatePlayerPanel();
  updateForecastLegend();

  // Load photos only after the cards exist
  loadCandidatePhotos();
}

// ====================================
// CANDIDATE SELECTION
// ====================================

function toggleCandidate(id) {
  if (selectedCandidates.includes(id)) {
    selectedCandidates = selectedCandidates.filter(x => x !== id);

    if (mainPlayerId === id) {
      mainPlayerId = null;
    }
  } else {
    selectedCandidates.push(id);
  }

  renderCandidates();
  renderProvinces();
}

function setMainPlayer(id) {
  if (!selectedCandidates.includes(id)) return;

  mainPlayerId = id;

  renderCandidates();
}

function clearSelection() {
  selectedCandidates = [];
  mainPlayerId = null;

  renderCandidates();
  renderProvinces();
}

function updatePlayerPanel() {
  const count = selectedCandidates.length;
  const main = getCandidate(mainPlayerId);

  document.getElementById("selectedCount").textContent =
    String(count).padStart(2, "0");

  document.getElementById("playerName").textContent =
    main ? main.name.toUpperCase() : "NO MAIN PLAYER SELECTED";

  const budget = main ? calculateCampaignBudget(main) : null;

  document.getElementById("playerBudget").textContent =
    main
      ? "Campaign budget: " +
        (budget.salnVerified
          ? money.format(budget.total)
          : "SALN not available")
      : "Select candidates and designate your main player.";

  document.getElementById("startButton").disabled =
    count < 2 || !mainPlayerId;
}

// ====================================
// PROVINCE DATABASE
// ====================================

async function loadProvinces() {
  const list = document.getElementById("provinceList");

  list.innerHTML = `
    <div class="province-row">Loading province database...</div>
  `;

  try {
    const response = await fetch("./data/provinces.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    provinces = Array.isArray(data)
      ? data
      : data.provinces || [];

    provinces = provinces.map(p => ({
      ...p,
      name: p.name || p.province || p.provinceName,
      region: p.region || p.regionName || "Unspecified",
      population: Number(
        p.population || p.population_2024 || 0
      ),
      historicalSupport: p.historicalSupport || {}
    })).filter(p => p.name);

    provinces.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (!provinces.length) {
      throw new Error("Province JSON contains no valid province records.");
    }

    document.getElementById("provinceCount").textContent =
      String(provinces.length).padStart(2, "0");

    populateRegionFilter();
    renderProvinces();

    console.log("Successfully loaded provinces:", provinces.length);

  } catch (error) {
    console.error("Province loading error:", error);

    list.innerHTML = `
      <div class="province-row">
        <strong>PROVINCE DATABASE ERROR</strong>
        <p>${escapeHTML(error.message)}</p>
        <small>
          Check that data/provinces.json exists and is valid JSON.
        </small>
      </div>
    `;
  }
}

function populateRegionFilter() {
  const select = document.getElementById("regionFilter");

  const regions = [...new Set(
    provinces.map(p => p.region)
  )].sort();

  select.innerHTML = `
    <option value="all">All regions</option>
    ${regions.map(region => `
      <option value="${escapeHTML(region)}">
        ${escapeHTML(region)}
      </option>
    `).join("")}
  `;
}

// ====================================
// PROVINCIAL FORECAST
// ====================================

function getHomecourtBonus(candidate, province) {
  const provinceName = province.name.toLowerCase();

  if (
    candidate.homecourtProvince &&
    provinceName === candidate.homecourtProvince.toLowerCase()
  ) {
    return 12;
  }

  return 0;
}

function getProvincialForecast(province) {
  const participants = selectedCandidates
    .map(getCandidate)
    .filter(Boolean);

  if (!participants.length) return [];

  const historical = participants.map(candidate => {
    const value = Number(
      province.historicalSupport?.[candidate.id]
    );

    return {
      candidate,
      historical: Number.isFinite(value) && value >= 0
        ? value
        : null,
      homecourt: getHomecourtBonus(candidate, province)
    };
  });

  const hasHistoricalData = historical.some(
    item => item.historical !== null
  );

  const scores = historical.map(item => {
    let base;

    if (hasHistoricalData) {
      base = item.historical ?? 0;
    } else {
      base = 100 / participants.length;
    }

    return {
      candidate: item.candidate,
      score: Math.max(0, base) + item.homecourt,
      hasHistory: item.historical !== null
    };
  });

  const total = scores.reduce((sum, x) => sum + x.score, 0);

  return scores.map(item => ({
    ...item,
    percentage: total > 0
      ? item.score / total * 100
      : 100 / scores.length
  })).sort((a, b) => b.percentage - a.percentage);
}

// ====================================
// PROVINCE LEGEND
// ====================================

function updateForecastLegend() {
  const legend = document.getElementById("forecastLegend");

  if (!selectedCandidates.length) {
    legend.textContent =
      "Select candidates to display the provincial forecast.";
    return;
  }

  legend.innerHTML = selectedCandidates.map(id => {
    const c = getCandidate(id);

    return `
      <div class="legend-item">
        <span
          class="legend-color"
          style="background:${c.color}"
        ></span>

        ${escapeHTML(c.name)}
      </div>
    `;
  }).join("");
}

// ====================================
// RENDER PROVINCES
// ====================================

function renderProvinces() {
  const list = document.getElementById("provinceList");

  if (!list) return;

  const search = (
    document.getElementById("provinceSearch").value || ""
  ).toLowerCase();

  const region = document.getElementById("regionFilter").value;

  const filtered = provinces.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (region === "all" || p.region === region)
  );

  if (!filtered.length) {
    list.innerHTML = `
      <div class="province-row">No provinces found.</div>
    `;
    return;
  }

  if (!selectedCandidates.length) {
    list.innerHTML = filtered.map(p => `
      <div class="province-row">
        <div class="province-name">${escapeHTML(p.name)}</div>
        <div class="province-region">${escapeHTML(p.region)}</div>
        <div class="stacked-bar"></div>
        <small>Select candidates to view their standings.</small>
      </div>
    `).join("");

    return;
  }

  let covered = 0;

  list.innerHTML = filtered.map(province => {
    const forecast = getProvincialForecast(province);

    if (forecast.some(x => x.hasHistory)) covered++;

    const segments = forecast.map(item => `
      <div
        class="stacked-segment"
        style="
          width:${item.percentage}%;
          background:${item.candidate.color};
        "
        title="${escapeHTML(item.candidate.name)}: ${item.percentage.toFixed(1)}%"
      ></div>
    `).join("");

    const details = forecast.map(item => `
      <span style="color:${item.candidate.color}">
        ${escapeHTML(item.candidate.name)}
        ${item.percentage.toFixed(1)}%
      </span>
    `).join("");

    const leader = forecast[0];

    return `
      <div class="province-row">

        <div class="province-top">
          <div>
            <div class="province-name">
              ${escapeHTML(province.name)}
            </div>

            <div class="province-region">
              ${escapeHTML(province.region)}
            </div>
          </div>

          <div class="leader-name">
            ${leader ? escapeHTML(leader.candidate.name) : "NO DATA"}
          </div>
        </div>

        <div class="stacked-bar">
          ${segments}
        </div>

        <div class="province-votes">
          ${details}
        </div>

        <small class="history-status">
          ${forecast.some(x => x.hasHistory)
            ? "Historical data included"
            : "Provisional forecast"}
        </small>

      </div>
    `;
  }).join("");

  const allCovered = provinces.filter(p =>
    getProvincialForecast(p).some(x => x.hasHistory)
  ).length;

  document.getElementById("dataNote").textContent =
    `${allCovered} of ${provinces.length} provinces have historical candidate data. ` +
    "Other provinces use a neutral starting score. Forecasts are illustrative game estimates.";
}

// ====================================
// ELECTION SIMULATION
// ====================================

function startSimulation() {
  if (selectedCandidates.length < 2 || !mainPlayerId) {
    return;
  }

  const participants = selectedCandidates.map(getCandidate);

  provincialResults = provinces.map(province => {
    const forecast = getProvincialForecast(province);

    const population = province.population || 0;

    // Small randomized campaign variation
    const randomized = forecast.map(item => ({
      ...item,
      score: item.percentage * (0.95 + Math.random() * 0.10)
    }));

    const total = randomized.reduce(
      (sum, x) => sum + x.score, 0
    );

    const normalized = randomized.map(x => ({
      ...x,
      percentage: total
        ? x.score / total * 100
        : 0
    })).sort((a, b) => b.percentage - a.percentage);

    return {
      province: province.name,
      population,
      forecast: normalized,
      winner: normalized[0]?.candidate || null
    };
  });

  const totals = {};

  participants.forEach(c => {
    totals[c.id] = {
      candidate: c,
      votes: 0
    };
  });

  let totalPopulation = provincialResults.reduce(
    (sum, p) => sum + p.population,
    0
  );

  // Aggregate estimated votes using province populations
  provincialResults.forEach(p => {
    const weight = p.population > 0
      ? p.population
      : totalPopulation > 0 ? 0 : 1;

    p.forecast.forEach(item => {
      totals[item.candidate.id].votes +=
        weight * item.percentage / 100;
    });
  });

  if (totalPopulation === 0) {
    totalPopulation = provinces.length;
  }

  electionResults = Object.values(totals).map(item => ({
    ...item.candidate,
    votes: item.votes,
    percentage: totalPopulation
      ? item.votes / totalPopulation * 100
      : 0
  })).sort((a, b) => b.votes - a.votes);

  displayResults();

  document.getElementById("selectionSection").classList.add("hidden");
  document.getElementById("resultsSection").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ====================================
// DISPLAY RESULTS
// ====================================

function displayResults() {
  const winner = electionResults[0];

  document.getElementById("winnerPanel").innerHTML = `
    <div class="candidate-photo">
      ${photoHTML(winner)}
    </div>

    <div>
      <div class="winner-label">
        ★ SIMULATED PRESIDENT-ELECT
      </div>

      <h3>${escapeHTML(winner.name)}</h3>

      <p>${winner.percentage.toFixed(2)}% modeled vote share</p>

      <p>
        ${number.format(Math.round(winner.votes))}
        modeled votes
      </p>

      <p>
        ${winner.id === mainPlayerId
          ? "YOUR CANDIDATE WON!"
          : "YOUR CANDIDATE DID NOT WIN."}
      </p>
    </div>
  `;

  loadCandidatePhotosForResults();

  document.getElementById("resultsList").innerHTML =
    electionResults.map((c, index) => `
      <div class="result-item">

        <div class="result-top">
          <b>
            ${index + 1}. ${escapeHTML(c.name)}
            ${c.id === mainPlayerId ? "(YOU)" : ""}
          </b>

          <b>${c.percentage.toFixed(2)}%</b>
        </div>

        <div class="result-bar">
          <div
            class="result-fill"
            style="width:${c.percentage}%"
          ></div>
        </div>

        <small>
          ${number.format(Math.round(c.votes))} modeled votes
        </small>

      </div>
    `).join("");

  document.getElementById("provinceWinners").innerHTML =
    provincialResults.map(p => `
      <div class="province-row">

        <div class="province-top">
          <div class="province-name">
            ${escapeHTML(p.province)}
          </div>

          <div class="leader-name">
            ${p.winner ? escapeHTML(p.winner.name) : "NO DATA"}
          </div>
        </div>

        <div class="stacked-bar">
          ${p.forecast.map(x => `
            <div
              class="stacked-segment"
              style="
                width:${x.percentage}%;
                background:${x.candidate.color};
              "
            ></div>
          `).join("")}
        </div>

      </div>
    `).join("");
}

async function loadCandidatePhotosForResults() {
  for (const c of electionResults) {
    const img = document.getElementById(`photo-${c.id}`);

    if (!img) continue;

    try {
      const response = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(c.wiki)
      );

      if (!response.ok) continue;

      const data = await response.json();

      if (!data.thumbnail?.source) continue;

      img.onload = () => {
        img.hidden = false;
        img.previousElementSibling.style.display = "none";
      };

      img.src = data.thumbnail.source;

    } catch (error) {
      console.warn("Result photo unavailable:", c.name);
    }
  }
}

// ====================================
// RESET
// ====================================

function resetSimulation() {
  document.getElementById("resultsSection").classList.add("hidden");
  document.getElementById("selectionSection").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ====================================
// INITIALIZE
// ====================================

document.getElementById("totalCandidates").textContent =
  `${candidates.length} CANDIDATES AVAILABLE`;

renderCandidates();
loadProvinces();
