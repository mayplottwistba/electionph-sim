// PH ELECTION SIMULATOR — LOCAL, SELF-CONTAINED GAME
// No JSON fetch, no backend, no API requests.
// Sector estimates are modeled from national/regional statistics and assumptions.
// They are not official province-level voter registration or polling figures.

const CANDIDATES = [
 {id:"risa",name:"Risa Hontiveros",party:"Akbayan",birth:"1966-02-24",hometown:"Manila",salnNetWorth:18900000,photo:"",advocacies:["Women's rights","Universal healthcare","Mental health","Child protection"],affinity:{women:1.16,youth:1.04,muslim:0.98,working:1.02,middle:1.10,farmer:0.92,classE:1.00},home:{}},
 {id:"sara",name:"Sara Duterte",party:"HNP / Lakas-CMD",birth:"1978-05-31",hometown:"Davao City",salnNetWorth:98660000,photo:"",advocacies:["Education","Local government","Women's protection","Healthcare access"],affinity:{women:1.00,youth:1.02,muslim:1.10,working:1.08,middle:1.00,farmer:1.08,classE:1.12},home:{"Region XI":1.22,"BARMM":1.05}},
 {id:"leni",name:"Leni Robredo",party:"Independent",birth:"1965-04-23",hometown:"Naga City, Camarines Sur",salnNetWorth:27000000,photo:"",advocacies:["Agriculture","Education","OFW welfare","Community development"],affinity:{women:1.12,youth:1.13,muslim:0.97,working:1.00,middle:1.13,farmer:1.10,classE:1.02},home:{"Region V":1.28}},
 {id:"raffy",name:"Raffy Tulfo",party:"Independent",birth:"1960-03-12",hometown:"Quezon City",salnNetWorth:1005000000,photo:"",advocacies:["Workers' rights","OFW protection","Public assistance","Consumer complaints"],affinity:{women:1.02,youth:1.05,muslim:1.04,working:1.20,middle:1.04,farmer:1.05,classE:1.18},home:{"NCR":1.10}},
 {id:"bam",name:"Bam Aquino",party:"KANP",birth:"1977-05-07",hometown:"Tarlac",salnNetWorth:86500000,photo:"",advocacies:["Quality education","Entrepreneurship","Innovation","Consumer protection"],affinity:{women:1.02,youth:1.20,muslim:0.99,working:1.02,middle:1.13,farmer:0.98,classE:1.02},home:{"NCR":1.08}},
 {id:"tito",name:"Tito Sotto",party:"NPC",birth:"1948-08-24",hometown:"Manila",salnNetWorth:188000000,photo:"",advocacies:["Agriculture","Government efficiency","Public accountability","Disaster preparedness"],affinity:{women:1.00,youth:0.92,muslim:0.98,working:1.04,middle:1.08,farmer:1.10,classE:1.03},home:{"NCR":1.08}}
];

// Editable game demo SALNs above are placeholders, NOT factual declarations.
// Set each salnNetWorth to a verified SALN net worth if you want factual budget inputs.


const PROVINCES = [

	// NCR
  { name: "Metro Manila", region: "NCR", population: 14001751 },
  // CAR
  { name: "Abra", region: "CAR", population: 250985 },
  { name: "Apayao", region: "CAR", population: 124366 },
  { name: "Benguet", region: "CAR", population: 827041 },
  { name: "Ifugao", region: "CAR", population: 207498 },
  { name: "Kalinga", region: "CAR", population: 229570 },
  { name: "Mountain Province", region: "CAR", population: 158200 },

  // Region I
  { name: "Ilocos Norte", region: "Region I", population: 609588 },
  { name: "Ilocos Sur", region: "Region I", population: 706009 },
  { name: "La Union", region: "Region I", population: 822352 },
  { name: "Pangasinan", region: "Region I", population: 3163190 },

  // Region II
  { name: "Batanes", region: "Region II", population: 18831 },
  { name: "Cagayan", region: "Region II", population: 1268603 },
  { name: "Isabela", region: "Region II", population: 1697050 },
  { name: "Nueva Vizcaya", region: "Region II", population: 497432 },
  { name: "Quirino", region: "Region II", population: 203828 },

  // Region III
  { name: "Aurora", region: "Region III", population: 235750 },
  { name: "Bataan", region: "Region III", population: 853373 },
  { name: "Bulacan", region: "Region III", population: 3708890 },
  { name: "Nueva Ecija", region: "Region III", population: 2310134 },
  { name: "Pampanga", region: "Region III", population: 2900637 },
  { name: "Tarlac", region: "Region III", population: 1503456 },
  { name: "Zambales", region: "Region III", population: 909932 },

  // Region IV-A
  { name: "Batangas", region: "Region IV-A", population: 2908494 },
  { name: "Cavite", region: "Region IV-A", population: 4344829 },
  { name: "Laguna", region: "Region IV-A", population: 3382193 },
  { name: "Quezon", region: "Region IV-A", population: 2229383 },
  { name: "Rizal", region: "Region IV-A", population: 3330143 },

  // MIMAROPA
  { name: "Marinduque", region: "MIMAROPA", population: 239207 },
  { name: "Occidental Mindoro", region: "MIMAROPA", population: 525354 },
  { name: "Oriental Mindoro", region: "MIMAROPA", population: 908339 },
  { name: "Palawan", region: "MIMAROPA", population: 1246673 },
  { name: "Romblon", region: "MIMAROPA", population: 308985 },

  // Region V
  { name: "Albay", region: "Region V", population: 1374768 },
  { name: "Camarines Norte", region: "Region V", population: 629699 },
  { name: "Camarines Sur", region: "Region V", population: 2068244 },
  { name: "Catanduanes", region: "Region V", population: 271879 },
  { name: "Masbate", region: "Region V", population: 908920 },
  { name: "Sorsogon", region: "Region V", population: 828655 },

  // Region VI
  { name: "Aklan", region: "Region VI", population: 615475 },
  { name: "Antique", region: "Region VI", population: 612974 },
  { name: "Capiz", region: "Region VI", population: 804952 },
  { name: "Guimaras", region: "Region VI", population: 187842 },
  { name: "Iloilo", region: "Region VI", population: 2509525 },

  // Negros Island Region
  { name: "Negros Occidental", region: "NIR", population: 3223955 },
  { name: "Negros Oriental", region: "NIR", population: 1432990 },
  { name: "Siquijor", region: "NIR", population: 103395 },

  // Region VII
  { name: "Bohol", region: "Region VII", population: 1394329 },
  { name: "Cebu", region: "Region VII", population: 5151274 },

  // Region VIII
  { name: "Biliran", region: "Region VIII", population: 179312 },
  { name: "Eastern Samar", region: "Region VIII", population: 477168 },
  { name: "Leyte", region: "Region VIII", population: 2028728 },
  { name: "Northern Samar", region: "Region VIII", population: 639186 },
  { name: "Samar", region: "Region VIII", population: 793183 },
  { name: "Southern Leyte", region: "Region VIII", population: 429573 },

  // Region IX
  { name: "Zamboanga del Norte", region: "Region IX", population: 1047455 },
  { name: "Zamboanga del Sur", region: "Region IX", population: 2027902 },
  { name: "Zamboanga Sibugay", region: "Region IX", population: 669840 },

  // Region X
  { name: "Bukidnon", region: "Region X", population: 1541308 },
  { name: "Camiguin", region: "Region X", population: 92808 },
  { name: "Lanao del Norte", region: "Region X", population: 1086017 },
  { name: "Misamis Occidental", region: "Region X", population: 617333 },
  { name: "Misamis Oriental", region: "Region X", population: 1685302 },

  // Region XI
  { name: "Davao de Oro", region: "Region XI", population: 767547 },
  { name: "Davao del Norte", region: "Region XI", population: 1125057 },
  { name: "Davao del Sur", region: "Region XI", population: 2457430 },
  { name: "Davao Occidental", region: "Region XI", population: 317159 },
  { name: "Davao Oriental", region: "Region XI", population: 576343 },

  // Region XII
  { name: "Cotabato", region: "Region XII", population: 1490618 },
  { name: "Sarangani", region: "Region XII", population: 558946 },
  { name: "South Cotabato", region: "Region XII", population: 1672791 },
  { name: "Sultan Kudarat", region: "Region XII", population: 854052 },

  // Region XIII
  { name: "Agusan del Norte", region: "Region XIII", population: 760413 },
  { name: "Agusan del Sur", region: "Region XIII", population: 739367 },
  { name: "Dinagat Islands", region: "Region XIII", population: 128117 },
  { name: "Surigao del Norte", region: "Region XIII", population: 534636 },
  { name: "Surigao del Sur", region: "Region XIII", population: 642255 },

  // BARMM
  { name: "Basilan", region: "BARMM", population: 556586 },
  { name: "Lanao del Sur", region: "BARMM", population: 1195518 },
  { name: "Maguindanao", region: "BARMM", population: 1667258 },
  { name: "Sulu", region: "BARMM", population: 1000108 },
  { name: "Tawi-Tawi", region: "BARMM", population: 440276 }
];

const SECTORS = [
 {id:"women",name:"WOMEN",short:"WOMEN",source:"PSA 2024 sex distribution",nationalRate:0.495,rateByRegion:{},color:"#e6a9bb",basis:"2024 household population female share"},
 {id:"youth",name:"18–30",short:"18–30",source:"PSA youth 15–30 proxy; 18–30 estimated",nationalRate:0.235,rateByRegion:{},color:"#b8c9ed",basis:"Modeled 18–30 estimate; PSA published 15–30 youth count"},
 {id:"muslim",name:"MUSLIM",short:"MUSLIM",source:"PSA 2020 religious affiliation; regional distribution",nationalRate:0.064,rateByRegion:{"BARMM":0.909,"Region IX":0.182,"Region X":0.085,"Region XII":0.158,"Region XI":0.035,"MIMAROPA":0.035,"NCR":0.013,"Region III":0.004,"CAR":0.003,"Region I":0.002,"Region II":0.002,"Region IV-A":0.005,"Region V":0.001,"Region VI":0.001,"Region VII":0.002,"Region VIII":0.001,"Region XIII":0.005},color:"#c9b4e7",basis:"2020 PSA religious affiliation, regional rate applied to provinces"},
 {id:"working",name:"WORKING CLASS",short:"WORKING CLASS",source:"Game-model estimate; not an official PSA class",nationalRate:0.30,rateByRegion:{},color:"#e9c28e",basis:"Modeled working-class segment"},
 {id:"middle",name:"MIDDLE CLASS",short:"MIDDLE CLASS",source:"Game-model estimate; income-class definitions vary",nationalRate:0.22,rateByRegion:{},color:"#a9d7c4",basis:"Modeled middle-income segment"},
 {id:"farmer",name:"FARMERS & FISHERS",short:"FARMERS & FISHERS",source:"PSA 2024 agriculture, forestry & fishing employment; province allocation modeled",nationalRate:0.089,rateByRegion:{"CAR":0.16,"Region I":0.15,"Region II":0.18,"Region III":0.10,"Region IV-A":0.06,"MIMAROPA":0.20,"Region V":0.17,"Region VI":0.15,"NIR":0.13,"Region VII":0.09,"Region VIII":0.18,"Region IX":0.17,"Region X":0.15,"Region XI":0.13,"Region XII":0.17,"Region XIII":0.18,"BARMM":0.20},color:"#a9c7a0",basis:"Regional modeled allocation informed by PSA AFF employment"},
 {id:"classe",name:"CLASS E",short:"CLASS E",source:"Game-model estimate; not an official PSA A–E classification",nationalRate:0.18,rateByRegion:{"BARMM":0.30,"Region IX":0.23,"Region X":0.22,"Region XII":0.23,"NIR":0.19},color:"#d9b6a9",basis:"Modeled low-income segment"}
];

// Every selected advocacy creates a corresponding voter sector in this simulation.
// Segment sizes are game-model estimates, not official PSA classifications.
const ADVOCACY_OPTIONS = [
 {id:"education",name:"Quality education",sector:{id:"edu",name:"EDUCATION SECTOR",short:"EDUCATION",nationalRate:.19,color:"#9db8e8",source:"Modeled education-priority segment"}},
 {id:"health",name:"Universal healthcare",sector:{id:"health",name:"HEALTHCARE ADVOCATES",short:"HEALTHCARE",nationalRate:.16,color:"#9bcfc8",source:"Modeled healthcare-priority segment"}},
 {id:"jobs",name:"Jobs & livelihood",sector:{id:"jobs",name:"JOBS & LIVELIHOOD",short:"JOBS & LIVELIHOOD",nationalRate:.24,color:"#e6c18d",source:"Modeled jobs-and-livelihood segment"}},
 {id:"workers",name:"Workers' rights",sector:{id:"workers",name:"LABOR & WORKERS",short:"LABOR",nationalRate:.17,color:"#d6a6a6",source:"Modeled labor-priority segment"}},
 {id:"agri",name:"Agriculture & food security",sector:{id:"agri",name:"AGRICULTURE & FOOD SECURITY",short:"AGRICULTURE",nationalRate:.14,color:"#a9c7a0",source:"Modeled agriculture-priority segment"}},
 {id:"ofw",name:"OFW welfare",sector:{id:"ofw",name:"OFW FAMILIES",short:"OFW FAMILIES",nationalRate:.11,color:"#c4b0df",source:"Modeled OFW-family segment"}},
 {id:"womenrights",name:"Women's rights & protection",sector:{id:"womenrights",name:"WOMEN'S RIGHTS ADVOCATES",short:"WOMEN'S RIGHTS",nationalRate:.13,color:"#e6a9bb",source:"Modeled advocacy-priority segment"}},
 {id:"child",name:"Child protection",sector:{id:"child",name:"CHILD PROTECTION",short:"CHILD PROTECTION",nationalRate:.12,color:"#e7b8a0",source:"Modeled child-protection-priority segment"}},
 {id:"mental",name:"Mental health",sector:{id:"mental",name:"MENTAL HEALTH ADVOCATES",short:"MENTAL HEALTH",nationalRate:.10,color:"#b9b5e3",source:"Modeled mental-health-priority segment"}},
 {id:"environment",name:"Environment & climate action",sector:{id:"environment",name:"ENVIRONMENT & CLIMATE",short:"ENVIRONMENT",nationalRate:.15,color:"#9dc7a8",source:"Modeled environment-priority segment"}},
 {id:"transport",name:"Public transportation",sector:{id:"transport",name:"COMMUTERS & TRANSPORT",short:"COMMUTERS",nationalRate:.18,color:"#e1c47e",source:"Modeled commuter-priority segment"}},
 {id:"housing",name:"Affordable housing",sector:{id:"housing",name:"HOUSING & URBAN POOR",short:"HOUSING",nationalRate:.12,color:"#c9b4a4",source:"Modeled housing-priority segment"}},
 {id:"digital",name:"Digital access & innovation",sector:{id:"digital",name:"DIGITAL ACCESS & INNOVATION",short:"DIGITAL ACCESS",nationalRate:.09,color:"#9fc5df",source:"Modeled digital-access-priority segment"}},
 {id:"entrepreneur",name:"Small businesses & entrepreneurship",sector:{id:"entrepreneur",name:"SMALL BUSINESS OWNERS",short:"SMALL BUSINESS",nationalRate:.10,color:"#d6b3d8",source:"Modeled small-business segment"}},
 {id:"disaster",name:"Disaster preparedness",sector:{id:"disaster",name:"DISASTER-PRONE COMMUNITIES",short:"DISASTER PREPAREDNESS",nationalRate:.13,color:"#b8c5d0",source:"Modeled disaster-preparedness segment"}},
 {id:"peace",name:"Peace & security",sector:{id:"peace",name:"PEACE & SECURITY",short:"PEACE & SECURITY",nationalRate:.12,color:"#c5b9a0",source:"Modeled peace-and-security segment"}},
 {id:"senior",name:"Senior citizens' welfare",sector:{id:"senior",name:"SENIOR CITIZENS",short:"SENIOR CITIZENS",nationalRate:.14,color:"#c8b5a5",source:"Modeled senior-citizen segment"}},
 {id:"pwd",name:"PWD inclusion & accessibility",sector:{id:"pwd",name:"PWD INCLUSION",short:"PWD INCLUSION",nationalRate:.07,color:"#b7c5e8",source:"Modeled PWD-inclusion segment"}},
 {id:"justice",name:"Justice & anti-corruption",sector:{id:"justice",name:"GOOD GOVERNANCE & JUSTICE",short:"GOOD GOVERNANCE",nationalRate:.16,color:"#c2c8a4",source:"Modeled governance-priority segment"}},
 {id:"consumer",name:"Consumer protection",sector:{id:"consumer",name:"CONSUMER PROTECTION",short:"CONSUMER PROTECTION",nationalRate:.11,color:"#e0b5a0",source:"Modeled consumer-protection segment"}}
];

const CORE_SECTORS = SECTORS.slice();
let ACTIVE_SECTORS = CORE_SECTORS.slice();


const GAME = {
  week: 1,
  phase: "setup",
  selected: [],
  playerId: null,
  playerAdvocacies: [],
  opponentAdvocacies: {},
  budget: {},
  initialBudget: {},
  provinceState: [],
  logs: [],
  sectorUsed: new Set(),
  specialUsed: new Set(),
  provinceCampaignUsed: new Set(),
  activeSector: null,
  electionOrder: [],
  counted: 0,
  countTimer: null,
  logFilter: "all"
};


const fmt = n => new Intl.NumberFormat("en-PH").format(Math.round(n||0));
const peso = n => "₱"+fmt(n);
const pct = n => (n||0).toFixed(1)+"%";
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const candidate = id => CANDIDATES.find(c=>c.id===id);
const age = birth => {const d=new Date(birth),t=new Date();let a=t.getFullYear()-d.getFullYear();if(t.getMonth()<d.getMonth()||(t.getMonth()===d.getMonth()&&t.getDate()<d.getDate()))a--;return a;};
const budgetFor = c => Math.max(0,Number(c.salnNetWorth)||0)*0.10;
const provinceTotal = PROVINCES.reduce((s,p)=>s+p.population,0);
function showView(id){
 document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
 document.getElementById(id+"View").classList.remove("hidden");
 window.scrollTo({top:0,behavior:"smooth"});
}

function log(type, title, detail) {
  if (!Array.isArray(GAME.logs)) {
    GAME.logs = [];
  }

  const candidateId = GAME.selected.find(id =>
    title.startsWith(candidate(id)?.name || "\u0000")
  ) || null;

  GAME.logs.unshift({
    week: GAME.week,
    type,
    title,
    detail,
    candidateId,
    time: new Date().toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  // Immediately update the sidebar whenever a log is created.
  if (document.getElementById("activityFeed")) {
    renderActivityFeed();
  }
}


function renderCandidates(){
 const grid=document.getElementById("candidateGrid");
 grid.innerHTML=CANDIDATES.map((c,i)=>{
  const selected=GAME.selected.includes(c.id),main=GAME.playerId===c.id;
  const b=budgetFor(c);
  const chosen=main?"YOUR PLAYER":selected?"OPPONENT":"NOT IN RACE";
  return `<article class="candidate-card ${selected?"selected":""} ${main?"main-selected":""}">
   <div class="candidate-photo"><div class="photo-initials">${c.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div></div>
   <div class="candidate-info">
    <div class="candidate-id">CANDIDATE ${String(i+1).padStart(2,"0")} · ${chosen}</div>
    <div class="candidate-name">${esc(c.name)}</div>
    <div class="candidate-meta">${age(c.birth)} YEARS OLD<br>${esc(c.hometown)}</div>
    <div class="party">${esc(c.party)}</div>
    <div class="saln-field">
  <label>DECLARED SALN NET WORTH</label>
  <div class="budget-value">${peso(c.salnNetWorth)}</div>

  <label>AVAILABLE CAMPAIGN BUDGET (10% OF SALN)</label>
  <div class="budget-value">${peso(b)}</div>
  <small>Automatically calculated · Fixed budget</small>
</div>
    <div class="card-actions">
     <button class="select-btn ${main?"active":""}" onclick="setMain('${c.id}')">${main?"✓ YOUR PLAYER":"CHOOSE PLAYER"}</button>
     <button class="main-btn ${selected&&!main?"active":""}" ${!GAME.playerId||main?"disabled":""} onclick="toggleCandidate('${c.id}')">${selected&&!main?"✓ OPPONENT":"+ ADD OPPONENT"}</button>
    </div>
   </div>
  </article>`;
 }).join("");
 renderAdvocacySetup();
 updateSetupSummary();
}
function renderAdvocacySetup(){
 const panel=document.getElementById("advocacySetup");
 if(!panel)return;
 if(!GAME.playerId){
  panel.innerHTML='<div class="advocacy-setup-empty">FIRST, CHOOSE YOUR PLAYER ABOVE. THEN SELECT FOUR CAMPAIGN ADVOCACIES.</div>';
  return;
 }
 const p=candidate(GAME.playerId);
 panel.innerHTML=`<div class="advocacy-setup-head"><div><div class="eyebrow">02 / YOUR PLATFORM</div><h2>Choose 4 advocacies</h2><p>These will define your campaign platform and unlock additional voter sectors.</p></div><div class="advocacy-counter"><b>${GAME.playerAdvocacies.length}/4</b><small>SELECTED</small></div></div>
 <div class="advocacy-choice-grid">${ADVOCACY_OPTIONS.map(a=>`<label class="advocacy-choice ${GAME.playerAdvocacies.includes(a.id)?"chosen":""}">
 <input type="checkbox" ${GAME.playerAdvocacies.includes(a.id)?"checked":""} ${GAME.playerAdvocacies.length>=4&&!GAME.playerAdvocacies.includes(a.id)?"disabled":""} onchange="togglePlayerAdvocacy('${a.id}',this.checked)">
 <span><b>${esc(a.name)}</b><small>Unlocks: ${esc(a.sector.name)}</small></span><i>${GAME.playerAdvocacies.includes(a.id)?"✓":"+"}</i></label>`).join("")}</div>
 <div class="opponent-platform-note">${GAME.selected.filter(id=>id!==GAME.playerId).length} opponent(s) selected. Their four advocacies will be randomized when you enter Campaign HQ.</div>`;
}
function togglePlayerAdvocacy(id,checked){
 if(checked){if(GAME.playerAdvocacies.length>=4)return;GAME.playerAdvocacies.push(id);}
 else GAME.playerAdvocacies=GAME.playerAdvocacies.filter(x=>x!==id);
 renderAdvocacySetup();updateSetupSummary();
}
function toggleCandidate(id){
 if(!GAME.playerId||id===GAME.playerId)return;
 if(GAME.selected.includes(id))GAME.selected=GAME.selected.filter(x=>x!==id);
 else GAME.selected.push(id);
 renderCandidates();
}
function setMain(id){
 if(GAME.playerId===id)return;
 if(GAME.playerId)GAME.selected=GAME.selected.filter(x=>x!==GAME.playerId);
 GAME.playerId=id;
 if(!GAME.selected.includes(id))GAME.selected.push(id);
 GAME.playerAdvocacies=[];
 renderCandidates();
}
function updateSetupSummary(){
 const n=GAME.selected.filter(id=>id!==GAME.playerId).length,p=candidate(GAME.playerId);
 document.getElementById("selectedCount").textContent=n+(p?1:0);
 document.getElementById("setupSummary").textContent=p?`${p.name.toUpperCase()} · ${n} OPPONENT(S)`:"Choose your main player";
 document.getElementById("setupBudget").textContent=p?`Budget: ${peso(budgetFor(p))} · Select exactly 4 advocacies and at least 1 opponent.`:"Choose one candidate to play as.";
 document.getElementById("enterCampaignBtn").disabled=!p||GAME.playerAdvocacies.length!==4||n<1;
}
function updateSetupSummary(){
 const n=GAME.selected.filter(id=>id!==GAME.playerId).length,p=candidate(GAME.playerId);
 document.getElementById("selectedCount").textContent=n+(p?1:0);
 document.getElementById("setupSummary").textContent=p?`${p.name.toUpperCase()} · ${n} OPPONENT(S)`:"Choose your main player";
 document.getElementById("setupBudget").textContent=p?`Budget: ${peso(budgetFor(p))} · Select exactly 4 advocacies and at least 1 opponent.`:"Choose one candidate to play as.";
 document.getElementById("enterCampaignBtn").disabled=!p||GAME.playerAdvocacies.length!==4||n<1;
}

function startCampaign() {
  const opponents = GAME.selected.filter(
    id => id !== GAME.playerId
  );

  if (!GAME.playerId || GAME.playerAdvocacies.length !== 4 || !opponents.length) {
    alert("Choose your candidate, four advocacies, and at least one opponent.");
    return;
  }

  try {
    // Generate opponent platforms.
    GAME.opponentAdvocacies = {};

    opponents.forEach(id => {
      const shuffled = ADVOCACY_OPTIONS
        .slice()
        .sort(() => Math.random() - 0.5);

      GAME.opponentAdvocacies[id] =
        shuffled.slice(0, 4).map(x => x.id);
    });

    // Assign platforms.
    candidate(GAME.playerId).selectedAdvocacies =
      GAME.playerAdvocacies.slice();

    opponents.forEach(id => {
      candidate(id).selectedAdvocacies =
        GAME.opponentAdvocacies[id].slice();
    });

    // Activate sectors.
    const activeIds = new Set([
      ...GAME.playerAdvocacies,
      ...Object.values(GAME.opponentAdvocacies).flat()
    ]);

    ACTIVE_SECTORS = CORE_SECTORS.slice();

    activeIds.forEach(id => {
      const item = ADVOCACY_OPTIONS.find(x => x.id === id);

      if (item && !ACTIVE_SECTORS.some(s => s.id === item.sector.id)) {
        ACTIVE_SECTORS.push({
          ...item.sector,
          advocacyId: id,
          rateByRegion: {}
        });
      }
    });

    // Initialize budgets.
    GAME.budget = {};
    GAME.initialBudget = {};

    GAME.selected.forEach(id => {
      const amount = budgetFor(candidate(id));
      GAME.budget[id] = amount;
      GAME.initialBudget[id] = amount;
    });

    // Initialize voter data.
    initProvinceState();

    // Reset campaign.
    GAME.week = 1;
    GAME.phase = "campaign";
    GAME.logs = [];

    GAME.sectorUsed.clear();
    GAME.specialUsed.clear();
    GAME.provinceCampaignUsed.clear();

    // Open campaign view.
    showView("campaign");

    // IMPORTANT: Render the candidate and budget data FIRST.
    renderCampaign();
    renderForecast();
    renderActivityFeed();
    renderRivalBudgets();

    // Log campaign setup.
    log(
      "campaign",
      "CAMPAIGN HEADQUARTERS OPENED",
      `${candidate(GAME.playerId).name} begins the campaign with four selected advocacies. Starting budget: ${peso(GAME.budget[GAME.playerId])}.`
    );

    opponents.forEach(id => {
      log(
        "campaign",
        `${candidate(id).name} PLATFORM GENERATED`,
        `${candidate(id).name} received four randomly assigned campaign advocacies.`
      );
    });

    // Process weekly events independently.
    try {
      weeklyNews();
    } catch (error) {
      console.error("Weekly news error:", error);
      log("news", "WEEKLY NEWS ERROR", error.message);
    }

    try {
      opponentWeeklyMoves();
    } catch (error) {
      console.error("Opponent activity error:", error);
      log("news", "OPPONENT ACTIVITY ERROR", error.message);
    }

    // Final refresh after all events.
    renderCampaign();
    renderForecast();
    renderActivityFeed();
    renderRivalBudgets();

  } catch (error) {
    console.error("START CAMPAIGN ERROR:", error);
  }
}

function sectorRate(sector, province) {
  // Sulu is now administratively assigned to Region IX.
  // Retain a separate Muslim-population estimate for the simulation.
  if (sector.id === "muslim" && province.name === "Sulu") {
    return 0.90;
  }

  return sector.rateByRegion[province.region] ?? sector.nationalRate;
}
function provinceSectorCount(sector,province){
 return Math.max(0,Math.round(province.population*sectorRate(sector,province)));
}

function candidateWeight(c,sector,province){

  // Stronger candidate-specific voter affinity
  let w = Math.pow(c.affinity[sector.id]||1,2.0);

  // Advocacy advantage
  if(
    sector.advocacyId &&
    (c.selectedAdvocacies||[]).includes(sector.advocacyId)
  ){
    w *= 1.35;
  }

  // Regional and hometown advantage
  w *= c.home[province.region]||1;

  if(c.id==="leni"&&province.name==="Camarines Sur")w*=1.30;
  if(c.id==="sara"&&province.region==="Region XI")w*=1.28;

  return w;
}


function createProvinceGroup(province,sector){

  const count = provinceSectorCount(sector,province);

  // Random local voter preference variation
  const weights = GAME.selected.map(id=>
    candidateWeight(candidate(id),sector,province) *
    (0.82 + Math.random()*0.36)
  );

  const total = weights.reduce((a,b)=>a+b,0);

  const undecidedRate = 0.34 + Math.random()*0.12;

  const support = {};

  GAME.selected.forEach((id,i)=>{
    support[id] = (1-undecidedRate)*weights[i]/total;
  });

  return {
    count,
    support,
    undecided:undecidedRate
  };
}

function initProvinceState(){
 GAME.provinceState=PROVINCES.map(p=>{
  const groups={};
  ACTIVE_SECTORS.forEach(s=>groups[s.id]=createProvinceGroup(p,s));
  return {province:p,groups,reported:false};
 });
}
function groupFor(provinceName,sectorId){
 const row=GAME.provinceState.find(x=>x.province.name===provinceName);
 return row?.groups[sectorId]||null;
}
function aggregateSector(sectorId){
 let count=0,undecided=0;const shares={};GAME.selected.forEach(id=>shares[id]=0);
 GAME.provinceState.forEach(row=>{
  const g=row.groups[sectorId];count+=g.count;undecided+=g.count*g.undecided;
  GAME.selected.forEach(id=>shares[id]+=g.count*(g.support[id]||0));
 });
 return {count,undecided,shares};
}
function aggregateAll(){
 let total=0,undecided=0,shares={};GAME.selected.forEach(id=>shares[id]=0);
 ACTIVE_SECTORS.forEach(s=>{
  const a=aggregateSector(s.id);
  // Sector populations overlap; these values are not summed into a unique national electorate.
  total+=a.count;undecided+=a.undecided;
  GAME.selected.forEach(id=>shares[id]+=a.shares[id]);
 });
 return {total,undecided,shares};
}
function renderCampaign() {

  // Safely update text elements, even if an element is missing.
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const player = candidate(GAME.playerId);

  if (!player) {
    console.error("renderCampaign: Player not found.", GAME.playerId);
    return;
  }

  const budget = GAME.budget[GAME.playerId] || 0;
  const initial = GAME.initialBudget[GAME.playerId] || 0;

  setText("topWeek", `WEEK ${GAME.week} / 12`);
  setText("weekNumber", String(GAME.week).padStart(2, "0"));
  setText("hudPlayer", player.name);

  setText(
    "hudParty",
    player.party + " · " +
    (player.selectedAdvocacies || []).length +
    " ADVOCACIES"
  );

  setText(
    "campaignSubtitle",
    "Your platform: " +
    (player.selectedAdvocacies || [])
      .map(id => ADVOCACY_OPTIONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(" · ") +
    ". Opponents are campaigning on their own randomly generated platforms."
  );

  setText("hudBudget", peso(budget));

  const all = aggregateAll();
  const own = all.shares[GAME.playerId] || 0;

  const allVotes =
    Object.values(all.shares).reduce((a, b) => a + b, 0) +
    all.undecided;

  setText(
    "hudSupport",
    pct(allVotes ? own / allVotes * 100 : 0)
  );

  setText(
    "hudSupportCount",
    `${fmt(own)} modeled likely supporters`
  );

  setText("hudUndecided", fmt(all.undecided));

  setText(
    "specialActionCount",
    `${GAME.specialUsed.size} / 6`
  );

  setText("remainingBudget", peso(budget));

  // Safely update budget progress bar.
  const budgetFill = document.getElementById("budgetTrackFill");

  if (budgetFill) {
    budgetFill.style.width =
      (initial
        ? Math.min(100, Math.max(0, budget / initial * 100))
        : 0) + "%";
  }

  setText("weekFooterTitle", `Week ${GAME.week} campaign`);

  setText(
    "weekFooterText",
    GAME.sectorUsed.size === ACTIVE_SECTORS.length
      ? "All available sector campaigns used this week. You can still use special actions."
      : "You can directly campaign in each sector once per week."
  );

  setText(
    "advanceWeekBtn",
    GAME.week === 12
      ? "END WEEK 12 → ELECTION DAY"
      : `END WEEK ${GAME.week} →`
  );

  setText("sectorCountLabel", `${ACTIVE_SECTORS.length} SECTORS`);

  // Safely render sector cards.
  const sectorGrid = document.getElementById("sectorGrid");

  if (sectorGrid) {
    sectorGrid.innerHTML = ACTIVE_SECTORS
      .map(s => renderSectorCard(s))
      .join("");
  }

  // Refresh the other campaign panels.
  renderProvinceList();
  renderActivityFeed();
  renderRivalBudgets();
}
function candidateColor(id) {
  if (id === GAME.playerId) return "#3B82F6"; // YOU: BLUE

  const opponentColors = [
    "#EF4444", // RED
    "#F97316", // ORANGE
    "#A855F7", // PURPLE
    "#22C55E", // GREEN
    "#EAB308", // YELLOW
    "#06B6D4", // CYAN
    "#EC4899"  // PINK
  ];

  const opponents = GAME.selected.filter(
    candidateId => candidateId !== GAME.playerId
  );

  const index = opponents.indexOf(id);

  return opponentColors[index % opponentColors.length] || "#94A3B8";
}


function renderActivityFeed() {
  const el = document.getElementById("activityFeed");
  if (!el) return;

  if (!Array.isArray(GAME.logs) || GAME.logs.length === 0) {
    el.innerHTML = `
      <div class="feed-empty">
        No campaign updates yet. Weekly events and opponent moves will appear here.
      </div>
    `;
    return;
  }

  el.innerHTML = GAME.logs.map(x => {
    const color = x.type === "news"
      ? "#A855F7"
      : x.type === "event"
        ? "#EAB308"
        : x.type === "election"
          ? "#06B6D4"
          : x.candidateId
            ? candidateColor(x.candidateId)
            : "#94A3B8";

    return `
      <article class="feed-item">
        <div class="feed-title-row">
          <i class="feed-dot" style="background:${color}"></i>
          <b>${esc(x.title)}</b>
        </div>
        <small>WEEK ${x.week} · ${x.time} · ${(x.type || "campaign").toUpperCase()}</small>
        <p>${esc(x.detail)}</p>
      </article>
    `;
  }).join("");
}



function renderRivalBudgets(){
 const el=document.getElementById("rivalBudgets");if(!el)return;
 el.innerHTML=GAME.selected.filter(id=>id!==GAME.playerId).map(id=>{
  const c=candidate(id),initial=GAME.initialBudget[id]||budgetFor(c),left=GAME.budget[id]||0;
  return `<div class="rival-budget-row"><div><i style="background:${candidateColor(id)}"></i><b>${esc(c.name)}</b></div><strong>${peso(left)}</strong><div class="rival-track"><span style="width:${initial?left/initial*100:0}%;background:${candidateColor(id)}"></span></div></div>`;
 }).join("");
}
function renderForecast(){
 const panel=document.getElementById("forecastPanel");if(!panel)return;
 const a=aggregateAll();
 const total=Object.values(a.shares).reduce((x,y)=>x+y,0)+a.undecided;
 const ranked=GAME.selected.map(id=>({id,support:total?(a.shares[id]||0)/total*100:0}));
 // Convert projected support into relative win likelihood; deliberately a game forecast, not polling.
 const peak=Math.max(...ranked.map(x=>x.support));
 const weighted=ranked.map(x=>({...x,w:Math.exp((x.support-peak)/4.5)}));
 const weightTotal=weighted.reduce((x,y)=>x+y.w,0)||1;
 weighted.forEach(x=>x.chance=x.w/weightTotal*100);
 weighted.sort((x,y)=>y.chance-x.chance);
 document.getElementById("forecastSubtitle").textContent=`Week ${GAME.week} closing estimate · based on modeled support after all campaign actions.`;
 document.getElementById("forecastResults").innerHTML=weighted.map(x=>`<div class="forecast-row"><div><i style="background:${candidateColor(x.id)}"></i><b>${esc(candidate(x.id).name)}</b><strong>${x.chance.toFixed(1)}%</strong></div><div class="forecast-track"><span style="width:${x.chance}%;background:${candidateColor(x.id)}"></span></div><small>Projected support: ${x.support.toFixed(1)}%</small></div>`).join("");
 panel.classList.remove("hidden");
}

function renderSectorCard(s) {
  const a = aggregateSector(s.id);

  const totalSupport =
    Object.values(a.shares).reduce((x, y) => x + y, 0) +
    a.undecided;

  const own = a.shares[GAME.playerId] || 0;

  const candidates = GAME.selected.map(id => ({
    id,
    value: a.shares[id] || 0
  }));

  const ownPct = totalSupport
    ? own / totalSupport * 100
    : 0;

  const undecidedPct = totalSupport
    ? a.undecided / totalSupport * 100
    : 0;

  const used = GAME.sectorUsed.has(s.id);

  const segments = candidates.map(c => {
    const percentage = totalSupport
      ? c.value / totalSupport * 100
      : 0;

    return `
      <div
        style="
          width:${percentage}%;
          background:${candidateColor(c.id)};
          height:100%;
        "
        title="${esc(candidate(c.id).name)}: ${pct(percentage)}">
      </div>
    `;
  }).join("");

  return `
    <article class="sector-card">

      <div class="sector-card-top">
        <div>
          <h3>${s.name}</h3>
          <div class="sector-count">
            ${fmt(a.count)} ESTIMATED PEOPLE
          </div>
        </div>

        <span class="sector-chip">
          ${used ? "CAMPAIGNED" : "AVAILABLE"}
        </span>
      </div>

      <div class="sector-split" style="display:flex;overflow:hidden;">
        ${segments}
        <div
          style="
            width:${undecidedPct}%;
            background:#64748b;
            height:100%;
          "
          title="Undecided: ${pct(undecidedPct)}">
        </div>
      </div>

      <div class="split-legend">
        ${candidates.map(c => {
          const percentage = totalSupport
            ? c.value / totalSupport * 100
            : 0;

          return `
            <span>
              <i style="background:${candidateColor(c.id)}"></i>
              ${esc(candidate(c.id).name)} ${pct(percentage)}
            </span>
          `;
        }).join("")}

        <span>
          <i style="background:#64748b"></i>
          UNDECIDED ${pct(undecidedPct)}
        </span>
      </div>

      <div class="sector-stats">
        <div class="sector-stat">
          <small>YOUR SUPPORT</small>
          <b>${fmt(own)}</b>
        </div>

        <div class="sector-stat">
          <small>YOUR SHARE</small>
          <b>${pct(ownPct)}</b>
        </div>

        <div class="sector-stat">
          <small>UNDECIDED</small>
          <b>${fmt(a.undecided)}</b>
        </div>
      </div>

      <div class="sector-actions">
        <small>${esc(s.source)}</small>
        <button class="btn small"
          ${used ? "disabled" : ""}
          onclick="openCampaignModal('${s.id}')">
          ${used ? "DONE THIS WEEK" : "CAMPAIGN"}
        </button>
      </div>

    </article>
  `;
}
function renderProvinceList() {
  const search = (
    document.getElementById("provinceSearch")?.value || ""
  ).toLowerCase();

  const region =
    document.getElementById("regionFilter")?.value || "all";

  const list = GAME.provinceState
    .filter(row =>
      row.province.name.toLowerCase().includes(search) &&
      (region === "all" || row.province.region === region)
    )
    .sort((a, b) =>
      a.province.name.localeCompare(b.province.name)
    );

  document.getElementById("provinceList").innerHTML = list.map(row => {
    const scores = GAME.selected.map(id => ({
      id,
      v: ACTIVE_SECTORS.reduce(
        (sum, s) =>
          sum + row.groups[s.id].count *
          (row.groups[s.id].support[id] || 0),
        0
      )
    })).sort((a, b) => b.v - a.v);

    // Calculate weighted undecided voters across all sectors.
const undecidedVotes = ACTIVE_SECTORS.reduce(
  (sum, s) =>
    sum + row.groups[s.id].count * row.groups[s.id].undecided,
  0
);

// Total modeled voter positions, including candidates and undecided.
const total =
  scores.reduce((sum, x) => sum + x.v, 0) +
  undecidedVotes;

const lead = [...scores].sort((a, b) => b.v - a.v)[0];
    const used = GAME.provinceCampaignUsed.has(row.province.name);
    const affected = row.affectedPopulation || 0;

    return `
      <article class="province-item ${
  lead?.id === GAME.playerId ? "province-mine" : "province-opponent"
}">
        <div class="province-item-head">
          <div>
            <b>${esc(row.province.name)}</b>
            <small>
  ${esc(row.province.region)} · ${fmt(row.province.population)} POPULATION
</small>

<div style="
  display:flex;
  flex-direction:column;
  gap:5px;
  margin-top:9px;
">

  ${scores.map(x => {
    const estimatedVotes = Math.round(
  row.province.population * (total ? x.v / total : 0)
);

const percentage = total
  ? (x.v / total) * 100
  : 0;

    return `
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        font-size:12px;
      ">

        <span style="
          display:flex;
          align-items:center;
          gap:6px;
          color:${candidateColor(x.id)};
          font-weight:700;
        ">
          <i style="
            width:7px;
            height:7px;
            border-radius:50%;
            background:${candidateColor(x.id)};
            display:inline-block;
          "></i>
          ${esc(candidate(x.id).name)}
        </span>

        <span style="
          text-align:right;
          font-family:monospace;
          font-weight:700;
        ">
          ${fmt(estimatedVotes)}
          <span style="color:#888;font-weight:400;">
            (${percentage.toFixed(1)}%)
          </span>
        </span>

      </div>
    `;
  }).join("")}
      <div style="
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    border-top:1px solid #ddd;
    padding-top:7px;
    margin-top:5px;
    font-size:12px;
  ">
    <span style="
      display:flex;
      align-items:center;
      gap:6px;
      color:#888;
      font-weight:800;
    ">
      <i style="
        width:7px;
        height:7px;
        border-radius:50%;
        background:#888;
        display:inline-block;
      "></i>
      UNDECIDED
    </span>

    <span style="
      text-align:right;
      font-family:monospace;
      font-weight:700;
    ">
     ${fmt(Math.round(
  row.province.population *
  (total ? undecidedVotes / total : 0)
))}

<span style="color:#888;font-weight:400;">
  (${(total ? undecidedVotes / total * 100 : 0).toFixed(1)}%)
</span>
    </span>
  </div>

</div>
          </div>
          <span class="province-leader">
  ${lead ? esc(candidate(lead.id).name) : "No leader"}
</span>

<span class="province-status ${
  lead?.id === GAME.playerId ? "status-mine" : "status-opponent"
}">
  ${lead?.id === GAME.playerId
    ? "YOUR TERRITORY"
    : "OPPONENT LEADING"}
</span>
        </div>

        <div class="mini-bar">
          ${scores.map(x => `
            <i style="
              width:${total ? x.v / total * 100 : 0}%;
              background:${candidateColor(x.id)};
            "></i>
          `).join("")}
        </div>

        <div class="mini-bar-legend">
          ${scores.map(x => `
            <span>
              <i style="background:${candidateColor(x.id)}"></i>
              ${esc(candidate(x.id).name)}
            </span>
          `).join("")}
        </div>

        ${affected ? `
          <small class="impact-note">
            ${fmt(affected)} residents affected by a simulated calamity · turnout disruption
          </small>
        ` : ""}

        <div class="province-card-actions">
          <button class="btn small"
            onclick="openProvinceDetails('${row.province.name.replace(/'/g,"\\'")}')">
            VIEW DETAILS
          </button>

          <button class="btn small province-campaign-btn"
            ${used ? "disabled" : ""}
            onclick="campaignProvince('${row.province.name.replace(/'/g,"\\'")}')">
            ${used ? "CAMPAIGNED" : "CAMPAIGN · ₱20,000"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function campaignProvince(name) {
  const row = GAME.provinceState.find(
    x => x.province.name === name
  );

  if (!row) {
    alert("Province not found: " + name);
    return;
  }

  if (GAME.provinceCampaignUsed.has(name)) {
    alert("You have already campaigned in this province this week.");
    return;
  }

  const cost = 20000;
  const available = GAME.budget[GAME.playerId] || 0;

  if (available < cost) {
    alert(
      "NOT ENOUGH CAMPAIGN FUNDS\n\n" +
      "Required: " + peso(cost) + "\n" +
      "Available: " + peso(available)
    );
    return;
  }

  const confirmed = confirm(
    "PROVINCIAL CAMPAIGN: " + name + "\n\n" +
    "Campaign cost: " + peso(cost) + "\n" +
    "Current budget: " + peso(available) + "\n" +
    "Remaining budget: " + peso(available - cost) + "\n\n" +
    "Deploy your campaign?"
  );

  if (!confirmed) return;

  let totalShift = 0;
  let totalContact = 0;

  // Deduct campaign cost.
  GAME.budget[GAME.playerId] = available - cost;

  // Apply campaign impact across all voter sectors.
  ACTIVE_SECTORS.forEach(s => {
    const g = row.groups[s.id];

    if (!g || !g.count) return;

    const gain = Math.min(
      g.undecided || 0,
      0.015 + Math.random() * 0.020
    );

    g.undecided = Math.max(0, g.undecided - gain);

    g.support[GAME.playerId] =
      (g.support[GAME.playerId] || 0) + gain;

    totalShift += g.count * gain;
    totalContact += g.count;
  });

  // Mark province as campaigned.
  GAME.provinceCampaignUsed.add(name);

  const converted = Math.round(totalShift);

  log(
    "campaign",
    `${candidate(GAME.playerId).name} campaigns in ${name}`,
    `A provincial campaign was deployed across ${fmt(totalContact)} modeled sector-members. Approximately ${fmt(converted)} undecided voter positions shifted toward ${candidate(GAME.playerId).name}. Campaign cost: ${peso(cost)}. Remaining budget: ${peso(GAME.budget[GAME.playerId])}.`
  );

  renderCampaign();
  renderForecast();
  renderActivityFeed();

  alert(
    "CAMPAIGN DEPLOYED!\n\n" +
    name + "\n" +
    "Estimated voter shifts: " + fmt(converted) + "\n" +
    "Campaign cost: " + peso(cost) + "\n" +
    "Remaining budget: " + peso(GAME.budget[GAME.playerId])
  );
}

function openProvinceDetails(name){
 const row=GAME.provinceState.find(x=>x.province.name===name);if(!row)return;
 const detail=ACTIVE_SECTORS.map(s=>{const g=row.groups[s.id],own=g.support[GAME.playerId]||0;return `${s.name}: ${fmt(g.count)} people · your support ${pct(own*100)} · undecided ${pct(g.undecided*100)}`;}).join("\n");
 alert(`${name}\n${row.province.region}\nPopulation: ${fmt(row.province.population)}\n\n${detail}`);
}

function populateProvinceSelect() {
  const select = document.getElementById("campaignProvince");

  if (!select) return;

  const sortedProvinces = [...GAME.provinceState].sort(
    (a, b) => a.province.name.localeCompare(
      b.province.name,
      "en",
      { sensitivity: "base" }
    )
  );

  select.innerHTML = sortedProvinces.map(x =>
    `<option value="${esc(x.province.name)}">
      ${esc(x.province.name)} — ${esc(x.province.region)}
    </option>`
  ).join("");
}
function openCampaignModal(sectorId){
 if(GAME.sectorUsed.has(sectorId))return;
 GAME.activeSector=sectorId;populateProvinceSelect();
 const s=ACTIVE_SECTORS.find(x=>x.id===sectorId);
 document.getElementById("modalTitle").textContent=`Campaign: ${s.name}`;
 document.getElementById("modalDescription").textContent=`Deploy your candidate's campaign team to one province. This sector can only be directly campaigned once this week.`;
 document.getElementById("campaignProvince").onchange=updateCampaignPreview;
 document.getElementById("campaignModal").classList.remove("hidden");
 updateCampaignPreview();
}
function updateCampaignPreview(){
 const s=ACTIVE_SECTORS.find(x=>x.id===GAME.activeSector),p=GAME.provinceState.find(x=>x.province.name===document.getElementById("campaignProvince").value);
 if(!s||!p)return;
 const g=p.groups[s.id],cost=campaignCost(s,g),reach=Math.round(g.count*(0.018+Math.random()*0.012));
 document.getElementById("modalSectorPreview").textContent=`${p.province.name}: ${fmt(g.count)} estimated ${s.name.toLowerCase()} segment members. Your current support: ${pct((g.support[GAME.playerId]||0)*100)}.`;
 document.getElementById("campaignCost").textContent=peso(cost);
 document.getElementById("campaignReach").textContent=`Up to ${fmt(reach)} potential contacts (not guaranteed votes)`;
 document.getElementById("confirmCampaignBtn").disabled=(GAME.budget[GAME.playerId]||0)<cost;
}
function campaignCost(sector,group){
 return Math.max(25000,Math.round(group.count*(0.035+(ACTIVE_SECTORS.indexOf(sector)*0.004))));
}
function closeCampaignModal(){document.getElementById("campaignModal").classList.add("hidden");}

function confirmSectorCampaign() {
  const s = ACTIVE_SECTORS.find(x => x.id === GAME.activeSector);
  const provinceName = document.getElementById("campaignProvince").value;
  const row = GAME.provinceState.find(
    x => x.province.name === provinceName
  );

  if (!s || !row || GAME.sectorUsed.has(s.id)) return;

  const g = row.groups[s.id];
  if (!g) return;

  const cost = campaignCost(s, g);
  const budgetBefore = GAME.budget[GAME.playerId] || 0;

  if (budgetBefore < cost) {
    alert("Not enough campaign funds for this action.");
    return;
  }

  // Deduct the actual campaign expense immediately.
  GAME.budget[GAME.playerId] = Math.max(0, budgetBefore - cost);
  const budgetAfter = GAME.budget[GAME.playerId];

  GAME.sectorUsed.add(s.id);

  const opponentIds = GAME.selected.filter(
    id => id !== GAME.playerId
  );

  const opponentId = opponentIds.sort(
    (a, b) => (g.support[b] || 0) - (g.support[a] || 0)
  )[0];

  const convertUndecided = Math.min(
    g.undecided,
    0.008 + Math.random() * 0.022
  );

  const steal = opponentId
    ? Math.min(g.support[opponentId] || 0, 0.002 + Math.random() * 0.009)
    : 0;

  g.undecided -= convertUndecided;
  g.support[GAME.playerId] += convertUndecided + steal;

  if (opponentId) {
    g.support[opponentId] -= steal;
  }

  const convertedPeople = Math.round(
    g.count * (convertUndecided + steal)
  );

  const eventRoll = Math.random();

  let outcome =
    eventRoll < 0.18
      ? "A small local controversy reduced the campaign's impact."
      : eventRoll > 0.88
      ? "Strong volunteer turnout boosted the team's reach."
      : "The campaign team completed house-to-house visits and sector consultations.";

  log(
    "campaign",
    `${candidate(GAME.playerId).name} campaigned in ${provinceName}`,
    `${s.name}: approximately ${fmt(convertedPeople)} modeled voters shifted toward your candidate. Campaign expense: ${peso(cost)}. Budget: ${peso(budgetBefore)} → ${peso(budgetAfter)}. ${outcome}`
  );

  closeCampaignModal();
  renderCampaign();
}



function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}



function runSpecialAction(type) {
  if (GAME.specialUsed.has(type)) {
    alert("You have already used this action this week.");
    return;
  }

  const player = candidate(GAME.playerId);

  const COST_PER_VOTER = {
    regular: 200,
    smear: 300,
    voteBuy: 400
  };

  const budgetBefore = GAME.budget[GAME.playerId] || 0;

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function getTarget(province, sectors = null) {
    let available = ACTIVE_SECTORS;

    if (sectors) {
      available = ACTIVE_SECTORS.filter(s =>
        sectors.includes(s.id)
      );
    }

    const possible = available.filter(s => {
      const g = province.groups[s.id];
      return g && g.count > 0;
    });

    if (!possible.length) return null;

    const sector = pickRandom(possible);
    return {
      province,
      sector,
      g: province.groups[sector.id]
    };
  }

  function charge(cost) {
    const available = GAME.budget[GAME.playerId] || 0;

    if (available < cost) {
      alert(
        `Not enough campaign funds.\n\n` +
        `Required: ${peso(cost)}\n` +
        `Available: ${peso(available)}`
      );
      return false;
    }

    GAME.budget[GAME.playerId] = available - cost;
    return true;
  }

  function finish(type, title, detail) {
    GAME.specialUsed.add(type);
    log("campaign", title, detail);
    renderCampaign();
  }

  // =========================================
  // PROVINCE SELECTION MODAL
  // FOR SMEAR AND VOTE BUYING
  // =========================================

  
function openProvinceSelector(actionType) {
  const isSmear = actionType === "smear";
  const rate = isSmear ? 300 : 400;

  // Select a rival for smear campaigns.
  const rivals = GAME.selected.filter(id => id !== GAME.playerId);

  if (isSmear && !rivals.length) {
    alert("You need at least one opponent.");
    return;
  }

  const rivalId = isSmear ? pickRandom(rivals) : null;
  const rival = isSmear ? candidate(rivalId) : null;

  if (isSmear && !rival) {
    alert("Could not identify the selected opponent.");
    return;
  }

  // Remove any previously opened modal.
  document.getElementById("specialProvinceModal")?.remove();

  // Get provinces with available voter groups.
 const provinces = GAME.provinceState
  .filter(p =>
    p.groups && Object.values(p.groups).some(g => g.count > 0)
  )
  .sort((a, b) =>
    a.province.name.localeCompare(
      b.province.name,
      "en",
      { sensitivity: "base" }
    )
  );

  if (!provinces.length) {
    alert("No provinces are available.");
    return;
  }

  const modal = document.createElement("div");
  modal.id = "specialProvinceModal";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    z-index:99999;
    background:rgba(0,0,0,.85);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:18px;
    overflow-y:auto;
  `;

  modal.innerHTML = `
    <div style="
      width:100%;
      max-width:540px;
      background:#111827;
      color:white;
      border:1px solid #374151;
      padding:24px;
      border-radius:10px;
      font-family:inherit;
      box-sizing:border-box;
    ">

      <div style="
        font-size:11px;
        letter-spacing:2px;
        color:#9ca3af;
      ">
        SPECIAL CAMPAIGN ACTION
      </div>

      <h2 style="margin:8px 0;">
        ${isSmear ? "SMEAR CAMPAIGN" : "VOTE BUYING"}
      </h2>

      <p style="
        font-size:13px;
        color:#9ca3af;
        line-height:1.6;
      ">
        ${
          isSmear
            ? `Targeting rival: ${esc(rival.name)}`
            : "Select how many modeled voters you will attempt to reach."
        }
      </p>

      <label style="
        font-size:12px;
        font-weight:800;
      ">
        TARGET PROVINCE
      </label>

      <select id="specialProvinceSelect" style="
        width:100%;
        box-sizing:border-box;
        padding:12px;
        margin:8px 0 18px;
        background:#1f2937;
        color:white;
        border:1px solid #4b5563;
        border-radius:5px;
      ">
        ${provinces.map((p, i) => `
          <option value="${i}">
            ${esc(p.province.name)}
          </option>
        `).join("")}
      </select>

      <div id="specialProvinceRisk"></div>

      <div style="margin-top:20px;">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
        ">
          <label style="
            font-size:12px;
            font-weight:800;
          ">
            VOTERS TO ATTEMPT TO REACH
          </label>

          <strong
            id="targetVoterValue"
            style="font-size:20px;"
          >
            1
          </strong>
        </div>

        <input
          id="targetVoterSlider"
          type="number"
          min="1"
          max="1000"
          value="1"
          step="1"
          style="
            width:100%;
            box-sizing:border-box;
            padding:14px;
            margin-top:8px;
            background:#1f2937;
            color:white;
            border:1px solid #4b5563;
            border-radius:5px;
            font-size:22px;
            font-weight:800;
          "
        >

        <small style="
          display:block;
          color:#9ca3af;
          font-size:11px;
          margin-top:7px;
        ">
          Enter the number of modeled voters you want to target.
        </small>

      </div>

      <div
        id="specialCostPreview"
        style="
          background:#1f2937;
          padding:14px;
          border-radius:6px;
          margin-top:18px;
          font-size:13px;
          line-height:1.8;
        "
      ></div>

      <div style="
        display:flex;
        gap:10px;
        margin-top:20px;
      ">

        <button
          id="cancelSpecialProvince"
          style="
            flex:1;
            padding:13px;
            background:transparent;
            color:white;
            border:1px solid #4b5563;
            border-radius:5px;
            cursor:pointer;
          "
        >
          CANCEL
        </button>

        <button
          id="confirmSpecialProvince"
          style="
            flex:1;
            padding:13px;
            background:white;
            color:#111;
            border:0;
            border-radius:5px;
            font-weight:900;
            cursor:pointer;
          "
        >
          CONFIRM ACTION →
        </button>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const select = modal.querySelector("#specialProvinceSelect");
  const input = modal.querySelector("#targetVoterSlider");
  const valueLabel = modal.querySelector("#targetVoterValue");
  const riskBox = modal.querySelector("#specialProvinceRisk");
  const costBox = modal.querySelector("#specialCostPreview");
  const confirmButton = modal.querySelector("#confirmSpecialProvince");

  // Calculate the available target pool in the selected province.
  function getEligibleVoters(province) {
    return Object.values(province.groups).reduce((sum, g) => {

      const available = isSmear
        ? (g.support[rivalId] || 0)
        : (g.undecided || 0);

      return sum + Math.floor(
        (Number(g.count) || 0) * available
      );

    }, 0);
  }

  // Update the preview whenever the province or voter count changes.
  function updatePreview() {
    const province = provinces[Number(select.value)];

    if (!province) return;

    const total = Object.values(province.groups).reduce(
      (sum, g) => sum + (Number(g.count) || 0),
      0
    );

    const eligible = getEligibleVoters(province);

    // Keep the input within the available target pool.
    const entered = Math.floor(Number(input.value) || 1);

    const attempted = eligible > 0
      ? Math.max(1, Math.min(entered, eligible))
      : 0;

    input.max = eligible;
    input.min = eligible > 0 ? 1 : 0;

    if (Number(input.value) !== attempted) {
      input.value = attempted;
    }

    const cost = attempted * rate;

    const riskLevel =
      attempted > total * 0.15 ? "EXTREME RISK" :
      attempted > total * 0.08 ? "VERY HIGH RISK" :
      attempted > total * 0.03 ? "HIGH RISK" :
      "MODERATE RISK";

    const riskColor =
      riskLevel === "EXTREME RISK" ? "#ef4444" :
      riskLevel === "VERY HIGH RISK" ? "#f97316" :
      riskLevel === "HIGH RISK" ? "#f59e0b" :
      "#22c55e";

    const riskMessage =
      attempted > total * 0.15
        ? "Very large operation. The impact and potential backlash could spread widely."
        : attempted > total * 0.08
        ? "A substantial operation. Expect a noticeable reaction across the province."
        : attempted > total * 0.03
        ? "A significant operation. Word of mouth may amplify its impact."
        : "A smaller operation. Its impact may still spread through word of mouth.";

    riskBox.innerHTML = `
      <div style="
        background:#1f2937;
        padding:14px;
        border-radius:6px;
        border-left:4px solid ${riskColor};
      ">

        <div style="
          font-size:11px;
          font-weight:900;
          color:${riskColor};
        ">
          ${eligible > 0 ? riskLevel : "NO AVAILABLE TARGETS"}
        </div>

        <div style="
          font-size:16px;
          font-weight:800;
          margin:8px 0;
        ">
          ${esc(province.province.name)}
        </div>

        <div style="
          font-size:12px;
          color:#9ca3af;
        ">
          ${fmt(total)} modeled voters across all sectors
        </div>

        <div style="
          font-size:12px;
          margin-top:8px;
        ">
          Available target pool:
          <strong>${fmt(eligible)}</strong>
        </div>

        <p style="
          font-size:12px;
          line-height:1.6;
          color:#d1d5db;
          margin-bottom:0;
        ">
          ${
            eligible > 0
              ? riskMessage
              : "There are no eligible voters available for this action in this province."
          }
        </p>

      </div>
    `;

    valueLabel.textContent = fmt(attempted);

    costBox.innerHTML = `
      <div>
        Attempted voters:
        <strong>${fmt(attempted)}</strong>
      </div>

      <div>
        Cost per voter:
        <strong>${peso(rate)}</strong>
      </div>

      <div>
        Total estimated cost:
        <strong>${peso(cost)}</strong>
      </div>

      <div>
        Available budget:
        <strong>${peso(GAME.budget[GAME.playerId] || 0)}</strong>
      </div>

      <div style="
        margin-top:8px;
        color:#9ca3af;
        font-size:11px;
      ">
        Word of mouth may increase the final impact.
        The campaign cost is based on your selected target number.
      </div>
    `;

    const enoughBudget =
      cost <= (GAME.budget[GAME.playerId] || 0);

    const canConfirm =
      eligible > 0 &&
      attempted > 0 &&
      attempted <= eligible &&
      enoughBudget;

    confirmButton.disabled = !canConfirm;

    confirmButton.style.opacity =
      canConfirm ? "1" : ".4";

    confirmButton.style.cursor =
      canConfirm ? "pointer" : "not-allowed";
  }

  // Events.
  select.addEventListener("change", updatePreview);

  input.addEventListener("input", updatePreview);
  input.addEventListener("change", updatePreview);

  modal.querySelector("#cancelSpecialProvince").onclick = () => {
    modal.remove();
  };

  confirmButton.onclick = () => {
    const province = provinces[Number(select.value)];

    if (!province) {
      alert("Invalid province selection.");
      return;
    }

    const eligible = getEligibleVoters(province);
    const attempted = Math.floor(Number(input.value) || 0);
    const cost = attempted * rate;
    const availableBudget = GAME.budget[GAME.playerId] || 0;

    // Final validation before executing.
    if (attempted < 1 || attempted > eligible) {
      alert("Invalid voter target. Please check the available target pool.");
      updatePreview();
      return;
    }

    if (cost > availableBudget) {
      alert("Not enough campaign funds.");
      updatePreview();
      return;
    }

    modal.remove();

    executeTargetedAction(
      actionType,
      province,
      attempted,
      rivalId
    );
  };

  // Initial preview.
  updatePreview();
}


// =========================================
// EXECUTE TARGETED ACTION WITH WORD OF MOUTH
// =========================================

function executeTargetedAction(actionType, province, attempted, rivalId) {
  const isSmear = actionType === "smear";
  const player = candidate(GAME.playerId);
  const rival = isSmear ? candidate(rivalId) : null;

  const rate = isSmear ? 300 : 400;
  const cost = attempted * rate;
  const availableBudget = GAME.budget[GAME.playerId] || 0;

  if (availableBudget < cost) {
    alert("Not enough campaign funds.");
    return;
  }

  const groups = Object.values(province.groups).filter(g => g.count > 0);

  const getAvailable = g => {
    const share = isSmear
      ? (g.support[rivalId] || 0)
      : (g.undecided || 0);

    return Math.max(0, Math.floor(g.count * share));
  };

  const eligible = groups.reduce((sum,g) => sum + getAvailable(g), 0);
  const actualAttempt = Math.min(attempted, eligible);

  if (actualAttempt <= 0) {
    alert("There are no eligible modeled voters in this province.");
    return;
  }

  // Spread the selected target count across voter sectors.
  let remaining = actualAttempt;
  let totalMoved = 0;

  const allocations = groups.map((g, index) => {
    const available = getAvailable(g);
    const remainingGroups = groups.length - index;

    let amount = index === groups.length - 1
      ? remaining
      : Math.min(available, Math.floor(actualAttempt * available / eligible));

    amount = Math.min(amount, available, remaining);
    remaining -= amount;

    return { g, amount };
  });

  // Distribute any rounding remainder.
  for (const item of allocations) {
    if (remaining <= 0) break;

    const extra = Math.min(
      remaining,
      getAvailable(item.g) - item.amount
    );

    item.amount += extra;
    remaining -= extra;
  }

  GAME.budget[GAME.playerId] = availableBudget - cost;

  const successful = Math.random() < (isSmear ? 0.58 : 0.65);

  // Word-of-mouth multiplier.
  const wordOfMouth = 1.10 + Math.random() * 0.40;

  const directRate = isSmear
    ? 0.65 + Math.random() * 0.20
    : 0.70 + Math.random() * 0.20;

  const intendedImpact = Math.round(
    actualAttempt * directRate * wordOfMouth
  );

  for (const item of allocations) {
    if (!item.amount) continue;

    const { g, amount } = item;

    const impact = Math.min(
      getAvailable(g),
      Math.round(intendedImpact * (item.amount / actualAttempt))
    );

    if (isSmear) {
      const share = impact / g.count;

      if (successful) {
        g.support[rivalId] = Math.max(
          0,
          (g.support[rivalId] || 0) - share
        );

        g.support[GAME.playerId] =
          (g.support[GAME.playerId] || 0) + share;
      } else {
        const backlash = Math.min(
          g.support[GAME.playerId] || 0,
          share * (1.1 + Math.random() * 0.5)
        );

        g.support[GAME.playerId] -= backlash;
        g.undecided += backlash;
      }
    } else {
      const share = impact / g.count;

      if (successful) {
        g.undecided = Math.max(0, g.undecided - share);

        g.support[GAME.playerId] =
          (g.support[GAME.playerId] || 0) + share;
      } else {
        const backlash = Math.min(
          g.support[GAME.playerId] || 0,
          share * (1.1 + Math.random() * 0.5)
        );

        g.support[GAME.playerId] -= backlash;
        g.undecided += backlash;
      }
    }

    totalMoved += impact;
  }

  const spread = Math.round(
    Math.max(0, totalMoved - actualAttempt * directRate)
  );

  const outcome = successful
    ? "SUCCESSFUL"
    : "BACKFIRED";

  const title = isSmear
    ? successful
      ? `${player.name}'s smear campaign spreads`
      : `${player.name}'s smear campaign backfires`
    : successful
      ? `${player.name}'s operation gains traction`
      : `${player.name}'s operation triggers backlash`;

  const detail = successful
    ? `${player.name} attempted to reach ${fmt(actualAttempt)} modeled voters in ${province.province.name}. The action was ${outcome.toLowerCase()}. Word of mouth amplified the impact, with approximately ${fmt(totalMoved)} modeled voters affected across multiple sectors. ${isSmear ? `${rival.name} lost support in the affected groups.` : "Undecided voters shifted toward the candidate."} Cost: ${fmt(actualAttempt)} × ₱${rate} = ${peso(cost)}. Remaining budget: ${peso(GAME.budget[GAME.playerId])}.`
    : `${player.name} attempted to reach ${fmt(actualAttempt)} modeled voters in ${province.province.name}, but the operation backfired. Word of mouth spread negative reactions across multiple sectors. Approximately ${fmt(totalMoved)} modeled voters were affected by the backlash. The full cost of ${peso(cost)} was deducted. Remaining budget: ${peso(GAME.budget[GAME.playerId])}.`;

  log(
    successful ? "campaign" : "news",
    title,
    detail
  );

  GAME.specialUsed.add(actionType);
  renderCampaign();
}


  // =========================================
  // OPEN PROVINCE SELECTOR FOR THESE ACTIONS
  // =========================================

  if (type === "smear" || type === "voteBuy") {
    openProvinceSelector(type);
    return;
  }

  // =========================================
  // REGULAR SPECIAL ACTIONS
  // ₱200 PER VOTER SWAYED
  // =========================================

  const configs = {
  event: {
    name: "Community event",
    rate: 0.035,
    sectors: ["working", "farmer", "women"]
  },

  vlog: {
    name: "Vlog appearance",
    rate: 0.030,
    sectors: ["youth", "women", "middle"]
  },

  media: {
    name: "Media appearance",
    rate: 0.032,
    sectors: ["middle", "working", "women"]
  },

  visit: {
    name: "Provincial visit",
    rate: 0.045,
    sectors: ["farmer", "working", "classe"]
  }
};
  const config = configs[type];
  if (!config) return;

  const province = pickRandom(GAME.provinceState);
  const target = getTarget(province, config.sectors);

  if (!target) {
    alert("No available voter sector for this action.");
    return;
  }

  const { sector, g } = target;

  const converted = Math.min(
    g.undecided,
    config.rate + Math.random() * 0.009
  );

  const convertedVoters = Math.round(g.count * converted);
  const cost = convertedVoters * COST_PER_VOTER.regular;

  if (convertedVoters <= 0) {
    alert("No available undecided voters to sway.");
    return;
  }

  if (!charge(cost)) return;

  g.undecided -= converted;
  g.support[GAME.playerId] =
    (g.support[GAME.playerId] || 0) + converted;

  let detail =
    `Campaign activity in ${province.province.name}, targeting ${sector.name}. ` +
    `Approximately ${fmt(convertedVoters)} modeled undecided voters shifted toward ${player.name}. ` +
    `Cost: ${fmt(convertedVoters)} × ₱200 = ${peso(cost)}. ` +
    `Remaining budget: ${peso(GAME.budget[GAME.playerId])}.`;

  if (type === "vlog") {
    detail += ` Estimated views: ${fmt(Math.round(15000 + Math.random() * 350000))}.`;
  }

  if (type === "media") {
    detail += ` Media sentiment: ${Math.random() < 0.72 ? "mostly positive" : "mixed"}.`;
  }

  if (type === "event") {
    detail += ` ${Math.round(80 + Math.random() * 920)} attendees recorded in the simulation.`;
  }

  if (type === "visit") {
    detail += ` Local organizers reported ${Math.round(15 + Math.random() * 100)} new volunteers.`;
  }

  finish(
    type,
    `${player.name}: ${config.name}`,
    detail
  );
}






function opponentWeeklyMoves() {
  const opponents = GAME.selected.filter(
    id => id !== GAME.playerId
  );

  if (!opponents.length) return;

  const activityCount = 3 + Math.floor(Math.random() * 6);

  const activities = [
    "held a local campaign rally",
    "organized a community outreach",
    "met with local community leaders",
    "conducted a sector-focused campaign",
    "mobilized local volunteers",
    "launched a provincial visibility campaign",
    "held a grassroots consultation",
    "expanded its local campaign network"
  ];

  for (let i = 0; i < activityCount; i++) {
    const id = pickRandom(opponents);
    const c = candidate(id);

    // Skip invalid opponent records.
    if (!c) continue;

    const province = pickRandom(GAME.provinceState);
    if (!province || !province.groups) continue;

    const platform = c.selectedAdvocacies || [];

    const preferred = ACTIVE_SECTORS.filter(
      s => !s.advocacyId || platform.includes(s.advocacyId)
    );

    const available = preferred.length
      ? preferred
      : ACTIVE_SECTORS;

    const sector = pickRandom(available);
    if (!sector) continue;

    const g = province.groups[sector.id];
    if (!g || !g.count) continue;

    const budgetBefore = GAME.budget[id] || 0;

    const cost = Math.min(
      budgetBefore,
      Math.round(g.count * (0.015 + Math.random() * 0.035))
    );

    GAME.budget[id] = Math.max(0, budgetBefore - cost);

    const move = Math.min(
      g.undecided || 0,
      0.004 + Math.random() * 0.016
    );

    g.undecided = Math.max(0, g.undecided - move);
    g.support[id] = (g.support[id] || 0) + move;

    const voters = Math.round(g.count * move);
    const activity = pickRandom(activities);

    log(
      "campaign",
      `${c.name} ${activity} in ${province.province.name}`,
      `${c.name}'s campaign team ${activity} in ${province.province.name}, focusing on ${sector.name.toLowerCase()}. Approximately ${fmt(voters)} modeled undecided voter preferences shifted toward ${c.name}. Campaign expenditure: ${peso(cost)}. Remaining opponent budget: ${peso(GAME.budget[id])}.`
    );
  }

  renderRivalBudgets();
  renderActivityFeed();
  renderCampaign();
  renderForecast();
}


function weeklyNews() {
  const events = [
    ["event", "POSITIVE WORD OF MOUTH", "Positive conversations about a candidate are spreading in local communities."],
    ["news", "NEGATIVE WORD OF MOUTH", "Voters are expressing concerns about campaign promises."],
    ["event", "VOLUNTEER NETWORK EXPANDS", "Local volunteers are organizing community outreach activities."],
    ["news", "CAMPAIGN CONTROVERSY", "A campaign statement is attracting negative attention."],
    ["event", "LOCAL ENDORSEMENT", "Community leaders publicly endorse a candidate."],
    ["news", "SMEAR CAMPAIGN ALLEGATIONS", "A negative campaign narrative is circulating."],
    ["event", "VIRAL CAMPAIGN VIDEO", "A campaign video is gaining traction online."],
    ["news", "COST OF LIVING CONCERNS", "Rising prices dominate public discussions."],
    ["event", "COMMUNITY RALLY", "A local campaign gathering attracts new supporters."],
    ["news", "DEBATE PERFORMANCE CRITICIZED", "Commentators question a candidate's public performance."],
    ["event", "YOUTH VOLUNTEER MOVEMENT", "Young volunteers organize online and offline activities."],
    ["news", "CAMPAIGN PROMISES QUESTIONED", "Voters demand clearer explanations of campaign platforms."],
    ["event", "LOCAL MEDIA SPOTLIGHT", "A candidate receives positive local media coverage."],
    ["news", "OPPOSITION CRITICISM", "An opponent's criticism becomes a major news topic."],
    ["event", "COMMUNITY ORGANIZATIONS MOBILIZE", "Local organizations conduct public forums."],
    ["news", "CAMPAIGN FATIGUE", "Some communities are becoming tired of repeated campaign activities."],
    ["event", "INFLUENCER SUPPORT", "An online personality increases a candidate's visibility."],
    ["news", "FACT-CHECK CONTROVERSY", "A campaign claim receives public scrutiny."],
    ["event", "LOCAL LIVELIHOOD PROGRAM", "Employment and livelihood concerns receive attention."],
    ["news", "WEATHER DISRUPTS CAMPAIGNS", "Weather conditions disrupt local campaign activities."]
  ];

  const count = 12 + Math.floor(Math.random() * 4);
  const shuffled = events.slice().sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, count);

  chosen.forEach(event => {
    log(event[0], event[1], event[2]);
  });

  // Apply one actual voter movement event.
  const province = pickRandom(GAME.provinceState);
  const sector = pickRandom(ACTIVE_SECTORS);
  const g = province?.groups[sector?.id];

  if (g && GAME.selected.length) {
    const targetId = pickRandom(GAME.selected);
    const movement = Math.min(
      g.undecided,
      0.008 + Math.random() * 0.012
    );

    g.undecided -= movement;
    g.support[targetId] = (g.support[targetId] || 0) + movement;

    log(
      "event",
      "RANDOM VOTER SENTIMENT SHIFT",
      `${candidate(targetId).name} gains approximately ${fmt(g.count * movement)} modeled supporters in ${province.province.name} following a local news development.`
    );
  }

  log(
    "campaign",
    `WEEK ${GAME.week} NEWS ROUNDUP`,
    `${count} random news events and one additional voter sentiment event have been processed.`
  );
}

function applyWeeklyCandidateSwing() {

  GAME.selected.forEach(candidateId => {

    // Random change: positive or negative, 2% to 10%.
    const magnitude = 0.02 + Math.random() * 0.08;
    const isPositive = Math.random() < 0.5;

    const changeRate = isPositive
      ? magnitude
      : -magnitude;

    let totalBefore = 0;
    let totalAfter = 0;

    GAME.provinceState.forEach(row => {

      ACTIVE_SECTORS.forEach(sector => {

        const g = row.groups[sector.id];

        if (!g || !g.count) return;

        const oldShare = g.support[candidateId] || 0;

        if (oldShare <= 0) return;

        totalBefore += g.count * oldShare;

        let newShare = oldShare * (1 + changeRate);
        let difference = newShare - oldShare;

        if (difference > 0) {

          // Gain: take from undecided voters first.
          let available = g.undecided || 0;
          let gain = Math.min(difference, available);

          // If undecided voters are insufficient,
          // take the remaining share proportionally from rivals.
          let remaining = difference - gain;

          if (remaining > 0) {
            const rivalIds = GAME.selected.filter(
              id => id !== candidateId
            );

            const rivalTotal = rivalIds.reduce(
              (sum, id) => sum + (g.support[id] || 0),
              0
            );

            if (rivalTotal > 0) {
              const rivalTake = Math.min(remaining, rivalTotal);

              rivalIds.forEach(id => {
                const rivalShare = g.support[id] || 0;
                const reduction = rivalTake * (rivalShare / rivalTotal);

                g.support[id] = Math.max(
                  0,
                  rivalShare - reduction
                );
              });

              gain += rivalTake;
            }
          }

          g.undecided = Math.max(0, available - Math.min(difference, available));

          g.support[candidateId] = oldShare + gain;

        } else {

          // Loss: return lost support to undecided voters.
          const loss = Math.abs(difference);

          g.support[candidateId] = Math.max(
            0,
            oldShare - loss
          );

          g.undecided += loss;
        }

        totalAfter += g.count * (g.support[candidateId] || 0);

      });

    });

    const actualChange = totalBefore > 0
      ? ((totalAfter - totalBefore) / totalBefore) * 100
      : 0;

    const direction = actualChange >= 0 ? "gained" : "lost";

    const title =
      `${candidate(candidateId).name} ${direction} support`;

    const detail =
      `${candidate(candidateId).name} experienced a random weekly ` +
      `${actualChange >= 0 ? "increase" : "decrease"} of approximately ` +
      `${Math.abs(actualChange).toFixed(1)}% in modeled support. ` +
      `This change was applied across provincial voter sectors.`;

    log(
      actualChange >= 0 ? "campaign" : "news",
      title,
      detail
    );

  });

}





function advanceWeek() {
  const button = document.getElementById("advanceWeekBtn");

  if (button && button.disabled) return;

  if (button) {
    button.disabled = true;
    button.textContent = "PROCESSING...";
  }

  try {

    const currentWeek = GAME.week;

    log(
      "campaign",
      `WEEK ${currentWeek} CONCLUDED`,
      `Week ${currentWeek} has ended. Processing weekly news, random events, opponent campaign movements and candidate swings.`
    );

    // Process weekly news.
    weeklyNews();

    // Process opponent campaign actions.
    opponentWeeklyMoves();

    // Apply random positive or negative candidate swings.
    applyWeeklyCandidateSwing();

    log(
      "campaign",
      `WEEK ${currentWeek} UPDATE COMPLETE`,
      `Weekly news, opponent movements and random candidate swings have been recorded.`
    );

    // Final refresh before moving forward.
    renderCampaign();
    renderForecast();
    renderActivityFeed();
    renderRivalBudgets();

    if (currentWeek < 12) {

      // Prepare the next campaign week.
      GAME.week++;

      GAME.sectorUsed.clear();
      GAME.specialUsed.clear();
      GAME.provinceCampaignUsed.clear();

      log(
        "campaign",
        `WEEK ${GAME.week} BEGINS`,
        `Welcome to Week ${GAME.week}. Weekly campaign actions have been reset.`
      );

      renderCampaign();
      renderForecast();
      renderActivityFeed();
      renderRivalBudgets();

    } else {

      // Week 12 is complete. Start Election Day.
      log(
        "election",
        "CAMPAIGN PERIOD CONCLUDED",
        "All 12 campaign weeks are complete. Election Day begins."
      );

      renderActivityFeed();
      renderForecast();

      beginElection();
    }

  } catch (error) {

    console.error("Weekly update error:", error);

    alert(
      "Weekly update encountered an error: " +
      error.message
    );

  } finally {

    // Keep the button disabled only after Election Day begins.
    if (button && GAME.phase !== "election") {
      button.textContent = `END WEEK ${GAME.week} →`;
      button.disabled = false;
    }

  }
}


function showLogs(){renderLogs("all");document.getElementById("logsModal").classList.remove("hidden");}
function closeLogs(){document.getElementById("logsModal").classList.add("hidden");}
function filterLogs(type,button){document.querySelectorAll(".log-filters button").forEach(b=>b.classList.remove("active"));button.classList.add("active");renderLogs(type);}
function renderLogs(type){
 GAME.logFilter=type;
 const logs=type==="all"?GAME.logs:GAME.logs.filter(x=>x.type===type);
  document.getElementById("logList").innerHTML=logs.length?logs.map(x=>`<article class="log-entry ${x.type}"><small>WEEK ${x.week} · ${x.time} · ${x.type.toUpperCase()}</small><p><b>${esc(x.title)}</b><br>${esc(x.detail)}</p></article>`).join(""):`<p>No logs yet.</p>`;
}

// Election Day: calculate weighted vote shares by province and reveal in batches.
function beginElection(){
 GAME.phase="election";GAME.counted=0;totalElectionVotes={};
 const totalVotes={};GAME.selected.forEach(id=>totalVotes[id]=0);
 GAME.provinceState.forEach(row=>{
  let combined={};GAME.selected.forEach(id=>combined[id]=0);
  ACTIVE_SECTORS.forEach(s=>{
   const g=row.groups[s.id];
   GAME.selected.forEach(id=>combined[id]+=g.count*(g.support[id]||0));
  });
  let sum=Object.values(combined).reduce((a,b)=>a+b,0);
  if(!sum){GAME.selected.forEach(id=>combined[id]=1);sum=GAME.selected.length;}
  const shares={};GAME.selected.forEach(id=>shares[id]=combined[id]/sum);
  const noise={};GAME.selected.forEach(id=>noise[id]=shares[id]*(.94+Math.random()*.12));
  const nsum=Object.values(noise).reduce((a,b)=>a+b,0);
  const normalized={};GAME.selected.forEach(id=>normalized[id]=noise[id]/nsum);
  row.finalVotes={};GAME.selected.forEach(id=>row.finalVotes[id]=Math.round(row.province.population*normalized[id]));
  row.finalWinner=GAME.selected.slice().sort((a,b)=>row.finalVotes[b]-row.finalVotes[a])[0];
 });
 GAME.electionOrder=GAME.provinceState.slice().sort(()=>Math.random()-.5);
 showView("election");renderElection();
 log("election","Election Day begins","Week 13: the first provincial returns are being prepared.");
 runNextReturns();
}
function renderElection(){
 document.getElementById("topWeek").textContent="WEEK 13 / ELECTION DAY";
 document.getElementById("nationalResults").innerHTML=GAME.selected.map(id=>`<div class="national-row" id="national-${id}"><div class="national-row-top"><b>${esc(candidate(id).name)}</b><b class="national-pct">0.0%</b></div><div class="national-track"><div class="national-fill" style="width:0%"></div></div><small class="national-votes">0 votes counted</small></div>`).join("");
 document.getElementById("electionProvinceList").innerHTML=GAME.provinceState.map(row=>`<div class="return-item" id="return-${slug(row.province.name)}"><b>${esc(row.province.name)}</b><small>Awaiting returns</small></div>`).join("");
}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-");}
function runNextReturns(){
 if(GAME.counted>=GAME.electionOrder.length){finishElection();return;}
 const batch=GAME.electionOrder.slice(GAME.counted,GAME.counted+5);
 batch.forEach(row=>{
  row.reported=true;
  GAME.selected.forEach(id=>totalElectionVotes[id]=(totalElectionVotes[id]||0)+row.finalVotes[id]);
  const winner=candidate(row.finalWinner);
  const el=document.getElementById("return-"+slug(row.province.name));
  if(el)el.innerHTML=`<b>${esc(row.province.name)}</b><small>${esc(winner.name)} leads · ${fmt(row.finalVotes[row.finalWinner])} votes</small>`;
  log("election",`${row.province.name} returns reported`,`${winner.name} leads the provincial count in ${row.province.name}.`);
 });
 GAME.counted+=batch.length;
 updateNationalCount();
 const pctDone=GAME.counted/GAME.electionOrder.length*100;
 document.getElementById("countProgressFill").style.width=pctDone+"%";
 document.getElementById("countPercent").textContent=Math.round(pctDone)+"%";
 document.getElementById("countStage").textContent=`${GAME.counted} of ${GAME.electionOrder.length} provinces reported`;
 document.getElementById("provinceReturnCount").textContent=`${GAME.counted} / ${GAME.electionOrder.length} REPORTED`;
 if(GAME.countTimer)clearTimeout(GAME.countTimer);
 GAME.countTimer=setTimeout(runNextReturns,850);
}
let totalElectionVotes={};
function updateNationalCount(){
 const sum=Object.values(totalElectionVotes).reduce((a,b)=>a+b,0);
 const ranking=GAME.selected.map(id=>({id,v:totalElectionVotes[id]||0})).sort((a,b)=>b.v-a.v);
 ranking.forEach((x,i)=>{
  const el=document.getElementById("national-"+x.id);if(!el)return;
  el.querySelector(".national-pct").textContent=pct(sum?x.v/sum*100:0);
  el.querySelector(".national-fill").style.width=(sum?x.v/sum*100:0)+"%";
  el.querySelector(".national-votes").textContent=`${fmt(x.v)} votes counted`;
 });
 const leader=ranking[0];
 document.getElementById("winnerCard").innerHTML=leader?`<div class="eyebrow">CURRENT NATIONAL LEADER</div><div class="winner-name">${esc(candidate(leader.id).name)}</div><h2>${pct(sum?leader.v/sum*100:0)}</h2><p>${fmt(leader.v)} votes counted so far. This is a live simulation lead, not a final result.</p>`:`<h2>Awaiting returns</h2>`;
}
function finishElection(){
 const sum=Object.values(totalElectionVotes).reduce((a,b)=>a+b,0);
 const ranking=GAME.selected.map(id=>({id,v:totalElectionVotes[id]||0})).sort((a,b)=>b.v-a.v);
 const winner=ranking[0];
 document.getElementById("countStage").textContent="ALL PROVINCIAL RETURNS REPORTED";
 document.getElementById("winnerCard").innerHTML=`<div class="eyebrow">SIMULATED PRESIDENT-ELECT</div><div class="winner-name">${esc(candidate(winner.id).name)}</div><h2>${pct(winner.v/sum*100)}</h2><p>${fmt(winner.v)} simulated votes. ${winner.id===GAME.playerId?"YOUR CANDIDATE WON THE ELECTION!":"Your candidate did not win this simulation."}</p>`;
 log("election","Final simulated result",`${candidate(winner.id).name} wins with ${pct(winner.v/sum*100)} of the simulated counted votes.`);
 document.getElementById("countProgressFill").style.width="100%";
}
function initFilters(){
 const select=document.getElementById("regionFilter");
 const regions=[...new Set(PROVINCES.map(p=>p.region))].sort();
 select.innerHTML='<option value="all">All regions</option>'+regions.map(r=>`<option value="${esc(r)}">${esc(r)}</option>`).join("");
}
function init(){
 renderCandidates();initFilters();
 document.getElementById("topWeek").textContent="SETUP";
}
init();