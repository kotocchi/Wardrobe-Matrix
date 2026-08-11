// ── OUTFIT STATE ──────────────────────────────────────
let state = { inner: null, outer: null, bottom: null, shoe: null, accs: {} };
let selectedFit = { inner: null, outer: null, bottom: null };
let selectedType = { inner: null, outer: null, bottom: null, shoe: null, acc: null };
const activeColorCategory = { inner: 'all', outer: 'all', bottom: 'all', shoe: 'all', acc: 'all' };

// ── UNDO HISTORY SNAPSHOT ────────────────────────────
let previousSnapshot = null;

function saveSnapshot() {
  previousSnapshot = JSON.parse(JSON.stringify({ state, selectedFit, selectedType }));
  const undoBtn = document.getElementById('undo-btn');
  if (undoBtn) undoBtn.disabled = false;
}

function undoLastAction() {
  if (!previousSnapshot) return;
  state = JSON.parse(JSON.stringify(previousSnapshot.state));
  selectedFit = JSON.parse(JSON.stringify(previousSnapshot.selectedFit));
  selectedType = JSON.parse(JSON.stringify(previousSnapshot.selectedType));

  previousSnapshot = null;
  const undoBtn = document.getElementById('undo-btn');
  if (undoBtn) undoBtn.disabled = true;

  syncGridCardClasses();
  render();
}

// ── LOCAL STORAGE AUTO-SAVE ──────────────────────────
const LOCAL_STORAGE_KEY = 'wardrobe_matrix_state_v1';

function saveStateToLocalStorage() {
  const payload = { state, selectedFit, selectedType };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

function loadStateFromLocalStorage() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    if (data.state) state = data.state;
    if (data.selectedFit) selectedFit = data.selectedFit;
    if (data.selectedType) selectedType = data.selectedType;
    syncGridCardClasses();
  } catch (e) {
    console.warn('Could not parse saved outfit state from localStorage.');
  }
}

function syncGridCardClasses() {
  document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
  ['inner', 'outer', 'bottom', 'shoe'].forEach(slot => {
    if (selectedType[slot]) {
      const card = document.querySelector('[data-qgroup="' + slot + '"][data-label="' + selectedType[slot] + '"]');
      if (card) card.classList.add('selected');
    }
  });

  Object.keys(state.accs).forEach(accLabel => {
    const card = document.querySelector('[data-qgroup="acc"][data-label="' + accLabel + '"]');
    if (card) card.classList.add('selected');
  });
}


function getRecommendedColorsForSlot(slot) {
  let basePiece = null;
  if (slot === 'bottom' && state.inner) basePiece = state.inner;
  else if (slot === 'outer' && state.inner) basePiece = state.inner;
  else if (slot === 'shoe' && state.bottom) basePiece = state.bottom;

  if (!basePiece) return [];

  const baseLower = basePiece.toLowerCase();
  for (const [colorKey, recs] of Object.entries(COLOR_HARMONIES)) {
    if (baseLower.includes(colorKey)) {
      return recs;
    }
  }
  return [];
}

function findHexForChoice(str) {
  if (!str) return '#7c6f4a';
  const found = QUICK_COLOR_PALETTE.find(c => str.toLowerCase().includes(c.name.toLowerCase()));
  return found ? found.hex : '#7c6f4a';
}

function getColorLuminance(hex) {
  if (!hex || hex === '#7c6f4a') return 128;
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function calculateValueContrast() {
  if (!state.inner || !state.bottom) return null;

  const innerHex = findHexForChoice(state.inner);
  const bottomHex = findHexForChoice(state.bottom);

  const innerLum = getColorLuminance(innerHex);
  const bottomLum = getColorLuminance(bottomHex);

  const diff = Math.abs(innerLum - bottomLum);

  if (diff < 40) {
    return {
      level: 'Low Contrast',
      cssClass: 'contrast-low',
      note: 'Monochrome / Low contrast — sleek, elongates silhouette.'
    };
  } else if (diff < 120) {
    return {
      level: 'Medium Contrast',
      cssClass: 'contrast-med',
      note: 'Balanced contrast — natural, effortless everyday look.'
    };
  } else {
    return {
      level: 'High Contrast',
      cssClass: 'contrast-high',
      note: 'High contrast — sharp visual separation between top & bottom.'
    };
  }
}

function initQuickPickers() {
  Object.keys(GARMENT_DATA).forEach(slot => {
    const container = document.getElementById('grid-' + slot);
    container.innerHTML = GARMENT_DATA[slot].map(item => `
      <div class="item-card" data-qgroup="${slot}" data-label="${item.label}" data-tags="${item.tags ? item.tags.join(',') : ''}" onclick="handleCardClick('${slot}',this,'${item.label}',${item.noColor || false})">
        <div class="card-top"><span class="card-label">${item.label}</span></div>
        <div class="card-sub">${item.desc}</div>
      </div>
    `).join('');
  });
}

function renderColorCategoryPills(slot) {
  const bar = document.getElementById('color-cat-bar-' + slot);
  if (!bar) return;
  bar.innerHTML = COLOR_CATEGORIES.map(cat => `
    <button class="color-cat-pill ${activeColorCategory[slot] === cat.id ? 'active' : ''}" onclick="filterColorPalette('${slot}','${cat.id}')">${cat.label}</button>
  `).join('');
}

function renderColorChips(slot) {
  const chips = document.getElementById('color-chips-' + slot);
  if (!chips) return;
  const currentCat = activeColorCategory[slot] || 'all';
  const filteredColors = currentCat === 'all' ? QUICK_COLOR_PALETTE : QUICK_COLOR_PALETTE.filter(c => c.cat === currentCat);
  const recommendedList = getRecommendedColorsForSlot(slot);

  chips.innerHTML = filteredColors.map(c => {
    const isRecommended = recommendedList.some(rec => c.name.toLowerCase().includes(rec));
    const recBadge = isRecommended ? '<span style="font-size:9px;color:#7c6f4a;margin-left:auto;font-weight:600">★ Rec</span>' : '';
    const borderStyle = isRecommended ? 'border: 1.5px solid #7c6f4a; background: #fdf8ef;' : '';

    return `
      <button class="color-chip" style="${borderStyle}" onclick="finalizeQuickColor('${slot}','${c.name}')">
        <span class="chip-dot" style="background:${c.hex}"></span>${c.name} ${recBadge}
      </button>
    `;
  }).join('');
}

function filterColorPalette(slot, catId) {
  activeColorCategory[slot] = catId;
  renderColorCategoryPills(slot);
  renderColorChips(slot);
}

function clearSlot(slot) {
  saveSnapshot();
  if (slot === 'acc') {
    state.accs = {};
    selectedType.acc = null;
  } else {
    state[slot] = null;
    selectedType[slot] = null;
    if (selectedFit[slot] !== undefined) selectedFit[slot] = null;
  }
  document.querySelectorAll('[data-qgroup="' + slot + '"]').forEach(c => c.classList.remove('selected'));
  document.getElementById('color-panel-' + slot).classList.remove('open');
  
  const clearBtn = document.getElementById('clear-btn-' + slot);
  if (clearBtn) clearBtn.classList.remove('active');

  render();
}

function updateSummaryCards() {
  ['inner', 'outer', 'bottom', 'shoe'].forEach(slot => {
    const summaryCard = document.getElementById('summary-card-' + slot);
    const summaryTag = document.getElementById('summary-tag-' + slot);
    const clearBtn = document.getElementById('clear-btn-' + slot);

    if (state[slot]) {
      const hex = findHexForChoice(state[slot]);
      summaryTag.innerHTML = `<span class="summary-dot" style="background:${hex}"></span> ${state[slot]}`;
      summaryCard.classList.add('active');
      if (clearBtn) clearBtn.classList.add('active');
    } else {
      summaryCard.classList.remove('active');
      if (clearBtn) clearBtn.classList.remove('active');
    }
  });

  // Accessories Multi-select
  const accSummaryCard = document.getElementById('summary-card-acc');
  const accSummaryTag = document.getElementById('summary-tag-acc');
  const accClearBtn = document.getElementById('clear-btn-acc');
  const accVals = Object.values(state.accs);

  if (accVals.length > 0) {
    accSummaryTag.innerHTML = accVals.map(val => {
      const hex = findHexForChoice(val);
      return `<span style="display:inline-flex;align-items:center;gap:4px"><span class="summary-dot" style="background:${hex}"></span>${val}</span>`;
    }).join(' + ');
    accSummaryCard.classList.add('active');
    if (accClearBtn) accClearBtn.classList.add('active');
  } else {
    accSummaryCard.classList.remove('active');
    if (accClearBtn) accClearBtn.classList.remove('active');
  }
}

function handleCardClick(slot, cardEl, label, noColor) {
  const fitErrEl = document.getElementById('fit-error-' + slot);
  if (fitErrEl) fitErrEl.style.display = 'none';

  // Toggle/reopen panel if already selected
  if (cardEl.classList.contains('selected')) {
    const panel = document.getElementById('color-panel-' + slot);
    if (panel) panel.classList.toggle('open');
    return;
  }

  saveSnapshot();

  if (slot === 'acc') {
    if (noColor) {
      document.querySelectorAll('[data-qgroup="acc"]').forEach(c => c.classList.remove('selected'));
      state.accs = {};
      selectedType.acc = null;
      document.getElementById('color-panel-acc').classList.remove('open');
      render();
      return;
    }

    const noneCard = document.querySelector('[data-qgroup="acc"][data-label="None"]');
    if (noneCard) noneCard.classList.remove('selected');

    selectedType.acc = label;
    const colorPanel = document.getElementById('color-panel-acc');
    const title = document.getElementById('color-title-acc');
    
    title.textContent = 'Select color for ' + label + ':';
    renderColorCategoryPills('acc');
    renderColorChips('acc');
    colorPanel.classList.add('open');
    return;
  }

  document.querySelectorAll('[data-qgroup="' + slot + '"]').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');

  if (noColor) {
    document.getElementById('color-panel-' + slot).classList.remove('open');
    state[slot] = null;
    selectedType[slot] = null;
    selectedFit[slot] = null;
    render();
    return;
  }

  selectedType[slot] = label;
  const itemObj = GARMENT_DATA[slot].find(i => i.label === label);
  const colorPanel = document.getElementById('color-panel-' + slot);
  const title = document.getElementById('color-title-' + slot);
  
  title.textContent = 'Select Fit & Color for ' + label + ':';

  // Render Fits
  const fitContainer = document.getElementById('fit-container-' + slot);
  const fitChips = document.getElementById('fit-chips-' + slot);
  if (fitContainer && itemObj && itemObj.fits && itemObj.fits.length > 0) {
    fitChips.innerHTML = itemObj.fits.map(f => `
      <button class="fit-chip ${f === selectedFit[slot] ? 'selected' : ''}" onclick="setFit('${slot}','${f}',this)">${f}</button>
    `).join('');
    fitContainer.style.display = 'block';
  } else {
    selectedFit[slot] = null;
    if (fitContainer) fitContainer.style.display = 'none';
  }

  // Render Categorized Palette
  renderColorCategoryPills(slot);
  renderColorChips(slot);
  colorPanel.classList.add('open');
}

function setFit(slot, fitVal, btnEl) {
  saveSnapshot();
  selectedFit[slot] = fitVal;
  const parent = btnEl.parentElement;
  parent.querySelectorAll('.fit-chip').forEach(c => c.classList.remove('selected'));
  btnEl.classList.add('selected');

  const fitErrEl = document.getElementById('fit-error-' + slot);
  if (fitErrEl) fitErrEl.style.display = 'none';
}

function finalizeQuickColor(slot, colorName) {
  const itemObj = GARMENT_DATA[slot] ? GARMENT_DATA[slot].find(i => i.label === selectedType[slot]) : null;
  if (itemObj && itemObj.fits && itemObj.fits.length > 0 && !selectedFit[slot]) {
    const fitErrEl = document.getElementById('fit-error-' + slot);
    if (fitErrEl) fitErrEl.style.display = 'block';
    return;
  }

  saveSnapshot();

  if (slot === 'acc') {
    const accLabel = selectedType.acc;
    const fullChoice = colorName + ' ' + accLabel;
    state.accs[accLabel] = fullChoice;
    const card = document.querySelector('[data-qgroup="acc"][data-label="' + accLabel + '"]');
    if (card) card.classList.add('selected');
  } else {
    const fitStr = selectedFit[slot] ? selectedFit[slot] + ' ' : '';
    const fullChoice = colorName + ' ' + fitStr + selectedType[slot];
    state[slot] = fullChoice;
  }
  document.getElementById('color-panel-' + slot).classList.remove('open');
  render();
}

function setOccasionFilter(tag, btnEl) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btnEl.classList.add('active');

  document.querySelectorAll('.item-card').forEach(card => {
    const cardTags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').split(',') : [];
    if (tag === 'all' || cardTags.includes(tag)) {
      card.classList.remove('filtered-out');
    } else {
      card.classList.add('filtered-out');
    }
  });
}

function clearAllSelections() {
  saveSnapshot();
  state.inner = null;
  state.outer = null;
  state.bottom = null;
  state.shoe = null;
  state.accs = {};
  
  selectedFit.inner = null;
  selectedFit.outer = null;
  selectedFit.bottom = null;

  selectedType.inner = null;
  selectedType.outer = null;
  selectedType.bottom = null;
  selectedType.shoe = null;
  selectedType.acc = null;

  document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.preset-color-panel').forEach(p => p.classList.remove('open'));
  document.querySelectorAll('.standalone-clear-btn').forEach(b => b.classList.remove('active'));
  render();
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomizeOutfit() {
  saveSnapshot();

  const btn = document.getElementById('randomize-btn'); 
  btn.classList.add('spinning'); 
  setTimeout(() => btn.classList.remove('spinning'), 380);

  document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.preset-color-panel').forEach(p => p.classList.remove('open'));

  // 1. Inner
  const innerItem = getRandomItem(GARMENT_DATA.inner);
  const innerColor = getRandomItem(QUICK_COLOR_PALETTE);
  const innerFitChoice = innerItem.fits && innerItem.fits.length > 0 ? getRandomItem(innerItem.fits) : null;
  selectedFit.inner = innerFitChoice;
  selectedType.inner = innerItem.label;
  state.inner = innerColor.name + ' ' + (innerFitChoice ? innerFitChoice + ' ' : '') + innerItem.label;
  const innerCard = document.querySelector('[data-qgroup="inner"][data-label="' + innerItem.label + '"]');
  if (innerCard) innerCard.classList.add('selected');

  // 2. Outer
  const outerItem = getRandomItem(GARMENT_DATA.outer);
  if (outerItem.noColor) {
    state.outer = null;
    selectedType.outer = null;
    selectedFit.outer = null;
    const outerCard = document.querySelector('[data-qgroup="outer"][data-label="None"]');
    if (outerCard) outerCard.classList.add('selected');
  } else {
    const outerColor = getRandomItem(QUICK_COLOR_PALETTE);
    const outerFitChoice = outerItem.fits && outerItem.fits.length > 0 ? getRandomItem(outerItem.fits) : null;
    selectedFit.outer = outerFitChoice;
    selectedType.outer = outerItem.label;
    state.outer = outerColor.name + ' ' + (outerFitChoice ? outerFitChoice + ' ' : '') + outerItem.label;
    const outerCard = document.querySelector('[data-qgroup="outer"][data-label="' + outerItem.label + '"]');
    if (outerCard) outerCard.classList.add('selected');
  }

  // 3. Bottom
  const bottomItem = getRandomItem(GARMENT_DATA.bottom);
  const bottomColor = getRandomItem(QUICK_COLOR_PALETTE);
  const bottomFitChoice = bottomItem.fits && bottomItem.fits.length > 0 ? getRandomItem(bottomItem.fits) : null;
  selectedFit.bottom = bottomFitChoice;
  selectedType.bottom = bottomItem.label;
  state.bottom = bottomColor.name + ' ' + (bottomFitChoice ? bottomFitChoice + ' ' : '') + bottomItem.label;
  const bottomCard = document.querySelector('[data-qgroup="bottom"][data-label="' + bottomItem.label + '"]');
  if (bottomCard) bottomCard.classList.add('selected');

  // 4. Shoes
  const shoeItem = getRandomItem(GARMENT_DATA.shoe);
  const shoeColor = getRandomItem(QUICK_COLOR_PALETTE);
  selectedType.shoe = shoeItem.label;
  state.shoe = shoeColor.name + ' ' + shoeItem.label;
  const shoeCard = document.querySelector('[data-qgroup="shoe"][data-label="' + shoeItem.label + '"]');
  if (shoeCard) shoeCard.classList.add('selected');

  // 5. Accessories
  state.accs = {};
  const validAccs = GARMENT_DATA.acc.filter(a => !a.noColor);
  const numAccs = Math.floor(Math.random() * 3);
  if (numAccs === 0) {
    const noneAcc = document.querySelector('[data-qgroup="acc"][data-label="None"]');
    if (noneAcc) noneAcc.classList.add('selected');
  } else {
    const shuffledAccs = validAccs.sort(() => 0.5 - Math.random()).slice(0, numAccs);
    shuffledAccs.forEach(accItem => {
      const accColor = getRandomItem(QUICK_COLOR_PALETTE);
      state.accs[accItem.label] = accColor.name + ' ' + accItem.label;
      const accCard = document.querySelector('[data-qgroup="acc"][data-label="' + accItem.label + '"]');
      if (accCard) accCard.classList.add('selected');
    });
  }

  render();
}


function detectColors(s) { if (!s) return []; const x = s.toLowerCase(); return ALL_KNOWN.filter(c => x.includes(c)); }
function isRecognized(s) { if (!s) return true; return ALL_KNOWN.some(c => s.toLowerCase().includes(c)); }
function isBold(s) { if (!s) return false; if (BOLD_COLORS.some(c => s.toLowerCase().includes(c))) return true; if (!isRecognized(s)) return true; return false; }
function isDark(s) { return !!s && DARK_COLORS.some(c => s.toLowerCase().includes(c)); }
function isEarth(s) { return !!s && EARTH_COLORS.some(c => s.toLowerCase().includes(c)); }
function isNeutral(s) { return !!s && NEUTRAL_COLORS.some(c => s.toLowerCase().includes(c)); }
function isCool(s) { return !!s && COOL_COLORS.some(c => s.toLowerCase().includes(c)); }
function isSafe(s) { return isEarth(s) || isNeutral(s) || isDark(s); }

function getBoldPieces() {
  const p = [];
  if (isBold(state.inner)) p.push({ label: 'inner top', val: state.inner });
  if (isBold(state.outer) && state.outer && state.outer !== 'None') p.push({ label: 'outer layer', val: state.outer });
  if (isBold(state.bottom)) p.push({ label: 'bottom', val: state.bottom });
  if (state.shoe && isBold(state.shoe)) p.push({ label: 'shoes', val: state.shoe });
  
  Object.values(state.accs).forEach(accVal => {
    if (isBold(accVal)) p.push({ label: 'accessory', val: accVal });
  });

  return p;
}

function getConcept() {
  const i = state.inner, o = state.outer, b = state.bottom;
  const h = o && o !== 'None';
  if (i && isDark(i) && b && isEarth(b)) return 'WI — dark top, earth bottom';
  if (i && isNeutral(i) && b && isDark(b)) return 'Clean contrast — light top, dark bottom';
  if (h) return 'Layered outfit';
  return 'Balanced outfit';
}

function checkBalance() {
  const o = state.outer, hasOuter = o && o !== 'None';
  const bp = getBoldPieces(), bc = bp.length, bn = bp.map(p => p.label + ' (' + p.val + ')');
  if (bc >= 3) return { ok: false, msg: 'Too many bold pieces — ' + bn.join(', ') + '. Keep one statement piece.' };

  const allItems = [state.inner, hasOuter ? o : null, state.bottom, state.shoe, ...Object.values(state.accs)].filter(Boolean);
  
  // 1. Cool color accent check FIRST
  const coolPieces = allItems.filter(item => isCool(item));
  if (coolPieces.length > 0) {
    const otherItems = allItems.filter(item => !isCool(item));
    if (otherItems.every(item => isSafe(item))) {
      return { ok: true, msg: coolPieces.join(', ') + ' is a cool-tone accent against an otherwise earth/neutral base — keep it as your one pop or swap it for a warm neutral.' };
    }
  }

  // 2. Strict Earth / Neutral / Dark check
  const allSafe = allItems.every(p => isSafe(p));
  if (allSafe) return { ok: true, msg: 'All pieces are neutral / earth / dark — combo looks balanced.' };

  return { ok: true, msg: 'Combo looks balanced — good to go.' };
}

function buildPrompt() {
  const i = state.inner, o = state.outer && state.outer !== 'None' ? state.outer + ' worn open as overshirt,' : '';
  const b = state.bottom, shoes = state.shoe || 'sneakers';
  const accList = Object.values(state.accs);
  const accStr = accList.length ? accList.join(', ') + ',' : '';
  return 'Full body, young Southeast Asian male, slim, ' + i + ', ' + o + ' ' + b + ', ' + shoes + ', ' + accStr + ' Bali outdoor setting, natural light, earth tone street style, editorial photography, 35mm';
}

function copyPrompt() {
  const text = document.getElementById('prompt-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn'); btn.textContent = 'Copied!'; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy prompt'; btn.classList.remove('copied'); }, 2000);
  });
}

function render() {
  updateSummaryCards();
  saveStateToLocalStorage();

  const r = document.getElementById('result'), pa = document.getElementById('prompt-area');
  if (!state.inner || !state.bottom) { r.innerHTML = '<div class="placeholder">Your outfit will appear here<span>Select an inner top + bottom to start</span></div>'; pa.style.display = 'none'; return; }
  const outer = state.outer && state.outer !== 'None' ? state.outer : null;
  const concept = getConcept(), balance = checkBalance(), shoes = state.shoe || 'Sneakers';
  let h = '<div class="result-label">Your combo</div><div class="outfit-row">';
  h += '<span class="outfit-tag tag-inner">' + state.inner + '</span>';
  if (outer) h += '<span class="arrow">+</span><span class="outfit-tag tag-outer">' + outer + ' (open)</span>';
  h += '<span class="arrow">+</span><span class="outfit-tag tag-bottom">' + state.bottom + '</span>';
  h += '<span class="arrow">+</span><span class="outfit-tag tag-shoe">' + shoes + '</span>';
  
  const accList = Object.values(state.accs);
  accList.forEach(accVal => {
    h += '<span class="arrow">+</span><span class="outfit-tag tag-acc">' + accVal + '</span>';
  });

  h += '</div>';
  h += '<div class="concept-row"><span class="concept-label">Concept</span><span class="concept-badge">' + concept + '</span></div>';
  h += '<div class="balance-msg ' + (balance.ok ? 'balance-ok' : 'balance-warn') + '">' + balance.msg + '</div>';

  const contrast = calculateValueContrast();
  if (contrast) {
    h += `
      <div class="contrast-meter-row">
        <span class="contrast-label">Value Contrast</span>
        <span class="contrast-badge ${contrast.cssClass}">${contrast.level}</span>
      </div>
      <div style="font-size:11px;color:#777;margin-top:4px">${contrast.note}</div>
    `;
  }

  r.innerHTML = h; pa.style.display = 'block';
  document.getElementById('prompt-text').innerText = buildPrompt().replace(/\s+/g, ' ').trim();
}

// ── VIEW SWITCH ───────────────────────────────────────
function switchView(view) {
  document.getElementById('view-builder').classList.toggle('active', view === 'builder');
  document.getElementById('view-saved').classList.toggle('active', view === 'saved');
  document.getElementById('view-wishlist').classList.toggle('active', view === 'wishlist');
  
  document.getElementById('nav-builder').classList.toggle('active', view === 'builder');
  document.getElementById('nav-saved').classList.toggle('active', view === 'saved');
  document.getElementById('nav-wishlist').classList.toggle('active', view === 'wishlist');
  
  if (view === 'wishlist') loadWishlist();
  if (view === 'saved') loadSavedOutfits();
}

// ── SUPABASE INTEGRATION ──────────────────────────────
const SUPABASE_URL = 'https://xqpuundcmvrmwuqhfdzi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YbwqPJvEX6gdOfkF9lG58A_waCiG9BO';

let sb = null;
if (SUPABASE_URL.startsWith('http') && SUPABASE_ANON_KEY.startsWith('sb_')) {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ── SAVED OUTFITS FUNCTIONS ───────────────────────────
async function saveCurrentOutfit() {
  if (!sb) { alert('Supabase not connected!'); return; }
  const prompt = document.getElementById('prompt-text').innerText;
  const combo = [state.inner, state.outer, state.bottom, state.shoe, ...Object.values(state.accs)].filter(Boolean).join(' + ');
  
  const { error } = await sb.from('items').insert({
    name: combo,
    price: prompt,
    is_wishlist: false,
    bought: false
  });
  if (error) alert('Could not save outfit: ' + error.message);
  else alert('Outfit saved successfully!');
}

async function loadSavedOutfits() {
  const container = document.getElementById('saved-list');
  if (!sb) { container.innerHTML = '<div class="wl-empty">Connect Supabase to save outfits.</div>'; return; }
  container.innerHTML = '<div class="wl-empty">Loading saved outfits…</div>';
  
  const { data, error } = await sb.from('items').select('*').eq('is_wishlist', false).order('created_at', { ascending: false });
  if (error || !data.length) { container.innerHTML = '<div class="wl-empty">No saved outfits yet.</div>'; return; }
  
  container.innerHTML = data.map(o => `
    <div class="saved-card">
      <div class="saved-title">
        <span>${escapeHtml(o.name)}</span>
        <button class="wl-del" onclick="removeSavedOutfit('${o.id}')">✕</button>
      </div>
      <div style="font-size:11px;color:#666;font-family:'DM Mono',monospace">${escapeHtml(o.price)}</div>
    </div>
  `).join('');
}

async function removeSavedOutfit(id) {
  if (!sb) return;
  await sb.from('items').delete().eq('id', id);
  loadSavedOutfits();
}

// ── WISHLIST FUNCTIONS ────────────────────────────────
function wlBanner(msg) {
  document.getElementById('wl-banner-slot').innerHTML = msg ? '<div class="wl-banner">' + msg + '</div>' : '';
}

const WL_CATEGORIES = [{ id: 'all', label: 'All' }, { id: 'top', label: 'Top' }, { id: 'bottom', label: 'Bottom' }, { id: 'shoes', label: 'Shoes' }, { id: 'accessory', label: 'Accessory' }, { id: 'other', label: 'Other' }];
let wlItems = [];
let wlCatFilter = 'all';

async function loadWishlist() {
  const list = document.getElementById('wl-list');
  if (!sb) {
    wlBanner('Not connected to Supabase yet.');
    list.innerHTML = '';
    return;
  }
  wlBanner('');
  list.innerHTML = '<div class="wl-empty">Loading…</div>';
  const { data, error } = await sb.from('items').select('*').eq('is_wishlist', true).order('created_at', { ascending: false });
  if (error) { wlBanner('Could not load wishlist: ' + error.message); list.innerHTML = ''; return; }
  wlItems = data || [];
  renderCatRow();
  renderWishlist();
  renderTotal();
}

function renderCatRow() {
  const row = document.getElementById('wl-cat-row');
  row.innerHTML = WL_CATEGORIES.map(c =>
    `<button class="wl-cat-pill${wlCatFilter === c.id ? ' active' : ''}" onclick="setWlFilter('${c.id}')">${c.label}</button>`
  ).join('');
}

function setWlFilter(cat) {
  wlCatFilter = cat;
  renderCatRow();
  renderWishlist();
}

function parsePrice(s) {
  if (!s) return 0;
  const n = s.replace(/[^0-9]/g, '');
  return n ? parseInt(n, 10) : 0;
}

function renderTotal() {
  const bar = document.getElementById('wl-total-bar');
  const shown = wlCatFilter === 'all' ? wlItems : wlItems.filter(i => (i.category_id || 'other') === wlCatFilter);
  const total = shown.reduce((sum, i) => sum + parsePrice(i.price), 0);
  if (total <= 0) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  document.getElementById('wl-total-value').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function renderWishlist() {
  const list = document.getElementById('wl-list');
  const items = wlCatFilter === 'all' ? wlItems : wlItems.filter(i => (i.category_id || 'other') === wlCatFilter);
  if (!items.length) { list.innerHTML = '<div class="wl-empty">Nothing here yet.</div>'; return; }
  list.innerHTML = items.map(item => {
    const meta = [];
    if (item.price) meta.push('<span>' + escapeHtml(item.price) + '</span>');
    if (item.link) meta.push('<a href="' + escapeHtml(item.link) + '" target="_blank" rel="noreferrer">View</a>');
    const catLabel = (WL_CATEGORIES.find(c => c.id === item.category_id) || { label: 'Other' }).label;
    return `<div class="wishlist-item">
      <button class="wl-check${item.bought ? ' done' : ''}" id="chk-${item.id}" onclick="toggleBought('${item.id}',${!item.bought})">${item.bought ? '✓' : ''}</button>
      <div class="wl-info">
        <div class="wl-name${item.bought ? ' done' : ''}">${escapeHtml(item.name)}</div>
        <div class="wl-meta">${meta.join('')}<span class="wl-tag">${catLabel}</span></div>
      </div>
      <button class="wl-del" onclick="removeWishlistItem('${item.id}')">✕</button>
    </div>`;
  }).join('');
}

function escapeHtml(s) {
  const d = document.createElement('div'); d.innerText = s; return d.innerHTML;
}

async function addWishlistItem() {
  if (!sb) { wlBanner('Connect Supabase first.'); return; }
  const name = document.getElementById('wl-name').value.trim();
  if (!name) return;
  const price = document.getElementById('wl-price').value.trim() || null;
  const link = document.getElementById('wl-link').value.trim() || null;
  const category = document.getElementById('wl-category').value;
  const { error } = await sb.from('items').insert({
    category_id: category,
    name,
    price,
    link,
    is_wishlist: true,
    bought: false,
  });
  if (error) { wlBanner('Could not save: ' + error.message); return; }
  document.getElementById('wl-name').value = '';
  document.getElementById('wl-price').value = '';
  document.getElementById('wl-link').value = '';
  loadWishlist();
}

async function toggleBought(id, boughtVal) {
  if (!sb) return;
  await sb.from('items').update({ bought: boughtVal, is_wishlist: !boughtVal }).eq('id', id);
  setTimeout(loadWishlist, boughtVal ? 300 : 0);
}

async function removeWishlistItem(id) {
  if (!sb) return;
  await sb.from('items').delete().eq('id', id);
  loadWishlist();
}

// ── INIT ──────────────────────────────────────────────
initQuickPickers();
loadStateFromLocalStorage();
render();
