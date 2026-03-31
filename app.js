/**
 * LabDigital v3 - app.js
 * Sinarmas Theme | Grouped Instruments | 10 Rooms | Sheets Integration
 */

// ============================================================
// GOOGLE SHEETS CONFIG — paste your Apps Script URL here after deploying
// ============================================================
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzYRx3tcHUx3V0ynnOaQ3imsDL3F_qlH6CS2EVimu46GhjAngILKOHbxsP65u0hgIK-Ig/exec'; // e.g. 'https://script.google.com/macros/s/AKfycbzYRx3tcHUx3V0ynnOaQ3imsDL3F_qlH6CS2EVimu46GhjAngILKOHbxsP65u0hgIK-Ig/exec'

async function postToSheet(module, row) {

  if (!SHEETS_URL) return;
  try {
    await fetch(SHEETS_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ module, row }),
    });
  } catch (e) { console.warn('Sheets sync failed:', e); }
}

// ============================================================
// USERS
// ============================================================
const USERS = [
  { nik: 'ANA2024001', password: 'DAFFA@123', name: 'Daffa Ardiyansyah', role: 'analyst', initials: 'DA' },
  { nik: 'ANA2024002', password: 'BAGUS@123', name: 'Bagus Suciantoro', role: 'analyst', initials: 'BS' },
  { nik: 'ANA2024003', password: 'ARIP@123', name: 'Arip Y', role: 'analyst', initials: 'AY' },
  { nik: 'ANA2024004', password: 'FAUZI@123', name: 'Fauziah Rahman', role: 'analyst', initials: 'FR' },
  { nik: 'LT2023001', password: 'AFIF@123', name: 'Afif Naufal', role: 'lab_tech', initials: 'AN' },
  { nik: 'LT2023002', password: 'DEWI@123', name: 'Dewi Y', role: 'lab_tech', initials: 'DY' },
  { nik: 'LT2023003', password: 'LATIF@123', name: 'Latifun J', role: 'lab_tech', initials: 'LJ' },
  { nik: 'LT2023004', password: 'SUKMO@123', name: 'Sukmo Wening', role: 'lab_tech', initials: 'SW' },
  { nik: 'LT2023005', password: 'TRI@123', name: 'Tri Nur H', role: 'lab_tech', initials: 'TN' },
];

// ============================================================
// INSTRUMENTS (grouped; sub-units shown on selection)
// ============================================================
const INSTRUMENTS = [
  { id: 'NMR',  name: 'NMR',                      icon: '🧲', cat: 'Spectroscopy',    lamrd: 'LAMRD 027',             units: ['LAMRD 027'],                                                                               noSeri: 'LAMRD 027', heating: false },
  { id: 'HPLC', name: 'HPLC',                     icon: '🔩', cat: 'Chromatography',  lamrd: 'LAMRD 079',             units: ['LAMRD 079'],                                                                               noSeri: 'LAMRD 079', heating: false },
  { id: 'UV',   name: 'Spektrofotometri UV-1800',  icon: '🌐', cat: 'Spectroscopy',    lamrd: 'LAMRD 195',             units: ['LAMRD 195'],                                                                               noSeri: 'LAMRD 195', heating: false },
  { id: 'GCS',  name: 'GC Shimadzu 2010 Plus',    icon: '🔬', cat: 'Chromatography',  lamrd: 'LAMRD 049',             units: ['LAMRD 049'],                                                                               noSeri: 'LAMRD 049', heating: false },
  { id: 'GCA',  name: 'GC Agilent 8890',          icon: '🔭', cat: 'Chromatography',  lamrd: 'LAMRD 176',             units: ['LAMRD 176'],                                                                               noSeri: 'LAMRD 176', heating: false },
  { id: 'PHM',  name: 'pH Meter & Conductometer', icon: '⚡', cat: 'Electrochemistry', lamrd: 'LAMRD 209',            units: ['LAMRD 209'],                                                                               noSeri: 'LAMRD 209', heating: false },
  { id: 'AWM',  name: 'aW-Meter',                 icon: '💧', cat: 'Water Activity',  lamrd: 'LAMRD 130',             units: ['LAMRD 130'],                                                                               noSeri: 'LAMRD 130', heating: false },
  { id: 'BAL',  name: 'Analytical Balance',       icon: '⚖️', cat: 'Gravimetry',      lamrd: 'LAMRD 059 / LAMRD 215', units: ['LAMRD 059', 'LAMRD 215'],                                                                  noSeri: '',          heating: false },
  { id: 'OVN',  name: 'Oven',                     icon: '🔥', cat: 'Heating',         lamrd: 'LAMRD 085',             units: ['LAMRD 085'],                                                                               noSeri: 'LAMRD 085', heating: true  },
  { id: 'INC',  name: 'Incubator',               icon: '🌡️', cat: 'Incubation',       lamrd: 'LAMRD 019–025',        units: ['LAMRD 019','LAMRD 020','LAMRD 021','LAMRD 022','LAMRD 023','LAMRD 024','LAMRD 025'],        noSeri: '',          heating: true  },
  { id: 'LOV',  name: 'Lovibond (Colorimeter)',   icon: '🎨', cat: 'Colorimetry',     lamrd: 'LAMRD 053',             units: ['LAMRD 053'],                                                                               noSeri: 'LAMRD 053', heating: false },
  { id: 'HOT',  name: 'Hotplate Stirrer',         icon: '♨️', cat: 'Heating',         lamrd: 'LAMRD 011 / LAMRD 013', units: ['LAMRD 011', 'LAMRD 013'],                                                                  noSeri: '',          heating: true  },
  { id: 'DROP', name: 'Dropping Point Meter',     icon: '🫧', cat: 'Thermal',         lamrd: 'LAMRD 167',             units: ['LAMRD 167'],                                                                               noSeri: 'LAMRD 167', heating: true  },
  { id: 'ABBR', name: 'Abbemart Refractometer',   icon: '🔍', cat: 'Optical',         lamrd: 'LAMRD 222',             units: ['LAMRD 222'],                                                                               noSeri: 'LAMRD 222', heating: false },
  { id: 'WB',   name: 'Waterbath',               icon: '🌊', cat: 'Thermal',          lamrd: 'LAMRD 151–216',         units: ['LAMRD 151','LAMRD 152','LAMRD 153','LAMRD 154','LAMRD 155','LAMRD 160','LAMRD 182','LAMRD 216'], noSeri: '',       heating: true  },
  { id: 'FH',   name: 'Fumehood',                icon: '🌬️', cat: 'Safety',           lamrd: 'Besar / Kecil',         units: ['Besar', 'Kecil', 'Waterbath Memmert'],                                                     noSeri: '',          heating: false },
];

// ============================================================

// TEMPERATURE ROOMS (10 rooms)
// ============================================================
const TEMP_ROOMS = [
  { id: 'instrumen1', name: 'Instrumen 1', tempMin: 15, tempMax: 28, humMin: 30, humMax: 60, hasHum: true },
  { id: 'instrumen2', name: 'Instrumen 2', tempMin: 18, tempMax: 27, humMin: 30, humMax: 70, hasHum: true },
  { id: 'labroom', name: 'Lab Room', tempMin: 20, tempMax: 28, humMin: 30, humMax: 70, hasHum: true },
  { id: 'standarroom', name: 'Standar Room', tempMin: 18, tempMax: 28, humMin: 30, humMax: 70, hasHum: true },
  { id: 'weighroom', name: 'Weighing Room', tempMin: 18, tempMax: 28, humMin: 30, humMax: 70, hasHum: true },
  { id: 'refrig', name: 'Refrigerator', tempMin: 0, tempMax: 8, humMin: null, humMax: null, hasHum: false },
  { id: 'freezer', name: 'Freezer', tempMin: -25, tempMax: -5, humMin: null, humMax: null, hasHum: false },
  { id: 'refrig_smp', name: 'Refrigerator for Smp', tempMin: 9, tempMax: 11, humMin: null, humMax: null, hasHum: false },
  { id: 'retain', name: 'Retain Sample Room', tempMin: 20, tempMax: 26, humMin: 45, humMax: 65, hasHum: true },
  { id: 'chemical', name: 'Chemical Room', tempMin: 20, tempMax: 26, humMin: 45, humMax: 65, hasHum: true },
];

const SESSIONS = [
  { id: 'pagi', label: 'Pagi', time: '07:00–09:00', startH: 7, endH: 9 },
  { id: 'sore', label: 'Sore', time: '15:00–17:00', startH: 15, endH: 17 },
];

// Full parameter list
const LAB_PARAMS = [
  'Iodine Value', 'Free Fatty Acid (as palmitic)', 'Free Fatty Acid (as lauric)',
  'Peroxide Value', 'Moisture & Volatile Matter (Hotplate)', 'Salt Content',
  'Color (Lovibond 5\u00BC")', 'Color (Lovibond 1")', 'Slip Melting Point, 2 hr',
  'Solid Fat Content', 'Acid Value', 'Cloud Point Test at 10\u00B0C', 'Firmness',
  'Oil Stability Index (OSI)', 'Fatty Acid Composition (FAC)',
  'Saturated Fatty Acids (SAFA)', 'Mono-unsaturated Fatty Acids (MUFA)',
  'Poly-unsaturated Fatty Acids (PUFA)', 'Trans fat', 'Fat Content',
  'Carotene Content (as \u03B2-carotene)', 'Ash Content', 'Vitamin A',
  'Vitamin E (as \u03B1-Tocopherol)', 'p-Anisidine Value', 'TBHQ', 'BHA', 'BHT',
  'Triacylglycerol (TAG) Composition', '2-MCPD esters', '3-MCPD esters', 'Glycidyl esters',
];

// Mapping Parameter to required Instruments
const PARAM_INSTRUMENTS = {
  'Iodine Value': ['Incubator', 'Analytical Balance', 'Fumehood'],
  'Free Fatty Acid (as palmitic)': ['Incubator', 'Analytical Balance'],
  'Free Fatty Acid (as lauric)': ['Incubator', 'Analytical Balance'],
  'Peroxide Value': ['Analytical Balance', 'Fumehood'],
  'Moisture & Volatile Matter (Hotplate)': ['Analytical Balance', 'Hotplate Stirrer'],
  'Salt Content': ['Analytical Balance', 'Hotplate Stirrer'],
  'Color (Lovibond 5\u00BC")': ['Incubator', 'Lovibond (Colorimeter)'],
  'Color (Lovibond 1")': ['Incubator', 'Lovibond (Colorimeter)'],
  'Slip Melting Point, 2 hr': ['Incubator', 'Hotplate Stirrer'],
  'Solid Fat Content': ['Incubator', 'Waterbath', 'NMR'],
  'Acid Value': ['Incubator'],
  'Cloud Point Test at 10\u00B0C': ['Incubator', 'Waterbath'],
  'Firmness': ['Manual'], // User requested manual recording
  'Oil Stability Index (OSI)': ['Analytical Balance'],
  'Fatty Acid Composition (FAC)': ['Incubator', 'Fumehood', 'GC Shimadzu 2010 Plus'],
  'Saturated Fatty Acids (SAFA)': ['Incubator', 'Fumehood', 'GC Shimadzu 2010 Plus'],
  'Mono-unsaturated Fatty Acids (MUFA)': ['Incubator', 'Fumehood', 'GC Shimadzu 2010 Plus'],
  'Poly-unsaturated Fatty Acids (PUFA)': ['Incubator', 'Fumehood', 'GC Shimadzu 2010 Plus'],
  'Trans fat': ['Incubator', 'Fumehood', 'GC Shimadzu 2010 Plus'],
  'Fat Content': ['Incubator', 'Fumehood', 'Waterbath'],
  'Carotene Content (as \u03B2-carotene)': ['Incubator', 'Analytical Balance', 'Spektrofotometri UV-1800'],
  'Ash Content': ['Analytical Balance'],
  'Vitamin A': ['Analytical Balance', 'HPLC'],
  'Vitamin E (as \u03B1-Tocopherol)': ['Analytical Balance', 'HPLC'],
  'p-Anisidine Value': ['Analytical Balance', 'Spektrofotometri UV-1800', 'Fumehood', 'Incubator'],
  'TBHQ': ['Analytical Balance', 'HPLC'],
  'BHA': ['Analytical Balance', 'HPLC'],
  'BHT': ['Analytical Balance', 'HPLC'],
  'Triacylglycerol (TAG) Composition': ['Analytical Balance', 'HPLC'],
  '2-MCPD esters': ['Analytical Balance', 'Fumehood', 'Waterbath', 'Incubator'],
  '3-MCPD esters': ['Analytical Balance', 'Fumehood', 'Waterbath', 'Incubator'],
  'Glycidyl esters': ['Analytical Balance', 'Fumehood', 'Waterbath', 'Incubator'],
};

// ============================================================
// STATE
// ============================================================
let currentUser = null;
const DB = {
  instrumen: JSON.parse(localStorage.getItem('ld_instrumen') || '[]'),
  suhu: JSON.parse(localStorage.getItem('ld_suhu') || '[]'),
  jobdesk: JSON.parse(localStorage.getItem('ld_jobdesk') || '[]'),
  sampel: JSON.parse(localStorage.getItem('ld_sampel') || '[]'),
  log: JSON.parse(localStorage.getItem('ld_log') || '[]'),
};
const save = k => localStorage.setItem(`ld_${k}`, JSON.stringify(DB[k]));
let sampelCounter = parseInt(localStorage.getItem('ld_sampelCounter') || '0');

// ============================================================
// UTILS
// ============================================================
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5).toUpperCase();
function san(s) { const d = document.createElement('div'); d.appendChild(document.createTextNode(s || '')); return d.innerHTML; }
function fmtDT(dt) { if (!dt) return '-'; return new Date(dt).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
function fmtD(dt) { if (!dt) return '-'; return new Date(dt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  const ic = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  t.textContent = `${ic} ${msg}`; t.className = `toast ${type} show`;
  setTimeout(() => { t.className = 'toast'; }, 3200);
}
function addLog(module, text) {
  DB.log.unshift({ id: uid(), ts: new Date().toISOString(), module, text, user: currentUser?.name || '?' });
  if (DB.log.length > 300) DB.log.pop();
  save('log'); renderLog();
}
function initDT(id) { const el = document.getElementById(id); if (!el) return; const n = new Date(); n.setMinutes(n.getMinutes() - n.getTimezoneOffset()); el.value = n.toISOString().slice(0, 16); }
function initD(id) { const el = document.getElementById(id); if (el) el.value = new Date().toISOString().slice(0, 10); }
function isLabTech() { return currentUser?.role === 'lab_tech'; }

// ============================================================
// BADGES
// ============================================================
const B = {
  Baik: '<span class="badge badge-green">Baik</span>',
  'Ada Gangguan Minor': '<span class="badge badge-orange">Gangguan Minor</span>',
  'Rusak / Perlu Perbaikan': '<span class="badge badge-red">Rusak</span>',
  normal: '<span class="badge badge-green">✅ Normal</span>',
  oos: '<span class="badge badge-red">🚨 Out of Spec</span>',
  belum: '<span class="badge badge-gray">⏳ Belum</span>',
  proses: '<span class="badge badge-blue">⚙️ Proses</span>',
  selesai: '<span class="badge badge-green">✅ Selesai</span>',
  diterima: '<span class="badge badge-green">✅ Diterima</span>',
  antrian: '<span class="badge badge-gray">⏳ Antrian</span>',
  ditolak: '<span class="badge badge-red">❌ Ditolak</span>',
};
const PRIO = { normal: '<span class="badge badge-gray">Normal</span>', tinggi: '<span class="badge badge-orange">Tinggi</span>', urgent: '<span class="badge badge-red">🔴 Urgent</span>' };
function smpBadge(s) { return B[s] || B.diterima; }
function getTempStatus(room, suhu, hum) {
  const tok = suhu >= room.tempMin && suhu <= room.tempMax;
  const hok = !room.hasHum || (hum !== null && !isNaN(hum) && hum >= room.humMin && hum <= room.humMax);
  return (tok && hok) ? 'normal' : 'oos';
}

function getRequiredInstruments(paramsText) {
  if (!paramsText) return [];
  const items = paramsText.split(',').map(s => s.trim());
  let required = new Set();
  items.forEach(it => {
    if (PARAM_INSTRUMENTS[it]) {
      PARAM_INSTRUMENTS[it].forEach(instr => required.add(instr));
    }
  });
  return Array.from(required);
}

function checkInstrumentRecorded(noSampel, instName) {
  // Check in DB.instrumen if this analyst has recorded this instrument for this sample
  // We check for name match (partial) because INSTRUMENTS might have slightly different names than PARAM_INSTRUMENTS keys
  return DB.instrumen.some(r => r.noSampel === noSampel && (r.instrumenNama.toLowerCase().includes(instName.toLowerCase()) || instName.toLowerCase().includes(r.instrumenNama.toLowerCase())));
}

function toggleFilters(pageId) {
  let barId = '';
  if (pageId === 'page-instrumen') barId = 'filterBarInstrumen';
  else if (pageId === 'page-suhu') barId = 'filterBarSuhu';
  else if (pageId === 'page-jobdesk') barId = 'filterBarJobdesk';
  else if (pageId === 'page-sampel') barId = 'filterBarSampel';
  
  if (barId) {
    document.getElementById(barId).classList.toggle('hidden');
  }
}

// ============================================================
// AUTH
// ============================================================
function applySession(user) {
  currentUser = user;
  sessionStorage.setItem('ld_session', JSON.stringify(user));
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'flex';
  document.getElementById('userAvatar').textContent = user.initials;
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userRoleLabel').textContent = user.role === 'lab_tech' ? 'Lab Technologist' : 'Analis';

  // Topbar dropdown & visibility
  const topAv = document.getElementById('topbarAvatar'); if (topAv) topAv.textContent = user.initials;
  const ddName = document.getElementById('ddName'); if (ddName) ddName.textContent = user.name;
  const ddRole = document.getElementById('ddRole'); if (ddRole) ddRole.textContent = user.role === 'lab_tech' ? '🧑‍💼 Lab Technologist' : '👨‍🔬 Analis';
  const sheetBtn = document.getElementById('btnSheet'); if (sheetBtn) sheetBtn.style.display = isLabTech() ? '' : 'none';
  const syncBtn = document.getElementById('btnSync'); if (syncBtn) syncBtn.style.display = isLabTech() ? '' : 'none';

  const rb = document.getElementById('roleBadge');
  rb.textContent = user.role === 'lab_tech' ? '🧑‍💼 Lab Technologist' : '👨‍🔬 Analis';
  rb.className = `role-badge ${user.role === 'lab_tech' ? 'role-lab-tech' : 'role-analyst'}`;
  document.querySelectorAll('.lt-only').forEach(el => el.style.display = isLabTech() ? '' : 'none');
  document.querySelectorAll('.lt-only-btn').forEach(el => el.style.display = isLabTech() ? '' : 'none');
  document.querySelectorAll('.lt-only-th').forEach(el => el.style.display = isLabTech() ? '' : 'none');
  ['instrAnalis', 'suhuPetugas', 'smpPenerima'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = user.name;
  });
  navigateTo('dashboard'); renderAll();
}

// ============================================================
// ANALYST REMINDER
// ============================================================
function checkAnalystReminder() {
  const banner = document.getElementById('analystReminder');
  if (!banner) return;
  if (isLabTech()) { banner.style.display = 'none'; return; }
  const myJobs = DB.jobdesk.filter(r => r.analis === currentUser?.name && r.status !== 'selesai');
  if (myJobs.length > 0) {
    const belum = myJobs.filter(r => r.status === 'belum').length;
    const proses = myJobs.filter(r => r.status === 'proses').length;
    const sub = document.getElementById('reminderSub');
    if (sub) {
      let msg = [];
      if (belum > 0) msg.push(`${belum} tugas belum dimulai`);
      if (proses > 0) msg.push(`${proses} tugas sedang diproses`);
      sub.textContent = msg.join(' • ') + '. Segera selesaikan!';
    }
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

// ============================================================
// SAMPLE COUNTER MANAGEMENT (LT Only)
// ============================================================
function openResetCounterModal() {
  const modal = document.getElementById('modalResetCounter');
  if (!isLabTech()) { showToast('Hanya Lab Technologist yang dapat mengatur nomor sampel', 'error'); return; }
  document.getElementById('currentCounterDisplay').textContent = sampelCounter;
  document.getElementById('newCounterVal').value = sampelCounter;
  modal.style.display = 'flex';
}
function closeResetCounterModal() {
  document.getElementById('modalResetCounter').style.display = 'none';
}
function confirmResetCounter() {
  const val = parseInt(document.getElementById('newCounterVal').value);
  if (isNaN(val) || val < 0) { showToast('Masukkan angka yang valid (≥ 0)', 'error'); return; }
  sampelCounter = val;
  localStorage.setItem('ld_sampelCounter', sampelCounter);
  addLog('sampel', `Counter nomor sampel diatur ulang ke ${sampelCounter} oleh ${currentUser?.name}`);
  showToast(`Counter nomor sampel diatur ke ${sampelCounter}`, 'success');
  closeResetCounterModal();
}
function doLogout() {
  currentUser = null; sessionStorage.removeItem('ld_session');
  window.location.reload();
}

// ============================================================
// NAVIGATION
// ============================================================
function navigateTo(page) {
  // Close instrument modal when navigating
  closeInstrModal();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById(`page-${page}`); if (pg) pg.classList.add('active');
  const ni = document.querySelector(`.nav-item[data-page="${page}"]`); if (ni) ni.classList.add('active');
  const titles = { dashboard: 'Dashboard', instrumen: 'Pemakaian Instrumen', suhu: 'Suhu Lingkungan', jobdesk: 'Jobdesk Analis', sampel: 'Penerimaan Sampel', riwayat: 'Riwayat & Log' };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  document.getElementById('breadcrumb').textContent = titles[page] || page;
  // Scroll main-content back to top
  const mc = document.querySelector('.main-content'); if (mc) mc.scrollTop = 0;
  if (page === 'dashboard') { renderDashboard(); checkAnalystReminder(); }
  if (page === 'suhu') { renderSuhu(); updateSessionAlert(); renderTempBoard(); }
  if (page === 'instrumen') { renderInstrumen(); renderCatalog(); }
  if (page === 'jobdesk') renderJobdesk();
  if (page === 'sampel') renderSampel();
  if (page === 'riwayat') renderLog();
}
function updateClock() { const s = new Date().toLocaleString('id-ID', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }); const el = document.getElementById('clockDisplay'); if (el) el.textContent = s; }

// ============================================================
// POPULATE SELECTS
// ============================================================
function populateInstrumenSelect() {
  const sel = document.getElementById('instrNama'); if (!sel) return;
  sel.innerHTML = '<option value="">-- Pilih Instrumen --</option>' +
    INSTRUMENTS.map(i => `<option value="${i.id}">${i.icon} ${san(i.name)}</option>`).join('');
  
  sel.addEventListener('change', function() {
    const val = this.value;
    const ins = INSTRUMENTS.find(i => i.id === val);
    
    // Dynamic field: Suhu Operasional
    const heatingAlat = ['Incubator', 'Oven', 'Waterbath', 'Hotplate', 'Dropping Point'];
    const isHeating = heatingAlat.some(h => (ins?.name || '').toLowerCase().includes(h.toLowerCase()));
    const suhuGrp = document.getElementById('instrSuhuGroup');
    if (suhuGrp) suhuGrp.style.display = isHeating ? 'block' : 'none';

    if (ins) {
      document.getElementById('instrNoSeri').value = ins.noSeri || ins.serial || '';
      const unitGroup = document.getElementById('unitGroup');
      const unitSel = document.getElementById('instrUnit');
      if (ins.units && ins.units.length > 0) {
        unitGroup.style.display = '';
        unitSel.innerHTML = (ins.units.length > 1 ? '<option value="">-- Pilih Unit --</option>' : '') + 
                           ins.units.map(u => `<option>${u}</option>`).join('');
        if (ins.units.length === 1) unitSel.value = ins.units[0];
      } else {
        unitGroup.style.display = 'none';
      }
    }
  });

  const uSel = document.getElementById('instrUnit');
  if (uSel) {
    uSel.addEventListener('change', function() {
      // Find the instrument again to get its serial if any, or just use selection
      const ins = INSTRUMENTS.find(i => i.id === document.getElementById('instrNama').value);
      if (ins && ins.units && ins.units.length > 0) {
         // Units usually match noSeri in this app's logic
         document.getElementById('instrNoSeri').value = this.value || '';
      }
    });
  }
}

function populateRoomSelect() {
  const sel = document.getElementById('suhuRuangan'); if (!sel) return;
  sel.innerHTML = '<option value="">-- Pilih Ruangan --</option>' +
    TEMP_ROOMS.map(r => `<option value="${r.id}">${san(r.name)}</option>`).join('');
  sel.addEventListener('change', () => {
    const room = TEMP_ROOMS.find(r => r.id === sel.value);
    updateRoomSpec(room);
  });
}
function updateRoomSpec(room) {
  const humG = document.getElementById('humidityGroup');
  const humI = document.getElementById('suhuKelembaban');
  const specBox = document.getElementById('suhuSpecBox');
  if (room) {
    let spec = `Suhu: ${room.tempMin}°C – ${room.tempMax}°C`;
    if (room.hasHum) spec += `  |  Hum: ${room.humMin}% – ${room.humMax}%`;
    specBox.innerHTML = `<span class="spec-info-box">📐 ${spec}</span>`;
    humG.style.display = room.hasHum ? '' : 'none';
    humI.required = room.hasHum;
  } else { specBox.innerHTML = ''; humG.style.display = ''; }
}

function populateParamGrid() {
  const g = document.getElementById('paramGrid'); if (g) g.innerHTML = LAB_PARAMS.map(p => `<label class="check-item"><input type="checkbox" name="param" value="${p}"> ${p}</label>`).join('');
  const jg = document.getElementById('jdkParamGrid'); if (jg) jg.innerHTML = LAB_PARAMS.map(p => `<label class="check-item"><input type="checkbox" name="jdkParam" value="${p}"> ${p}</label>`).join('');
}

// ============================================================
// SESSION ALERT
// ============================================================
function getCurrentSession() {
  const h = new Date().getHours();
  if (h >= 7 && h < 9) return 'pagi'; if (h >= 15 && h < 17) return 'sore'; return null;
}
function updateSessionAlert() {
  const al = document.getElementById('sessionAlert'); if (!al) return;
  const sess = getCurrentSession();
  if (sess === 'pagi') { al.className = 'session-alert show alert-ok'; al.innerHTML = '✅ Sesi Pagi aktif <strong>(07:00–09:00)</strong> — Silakan catat suhu.'; }
  else if (sess === 'sore') { al.className = 'session-alert show alert-ok'; al.innerHTML = '✅ Sesi Sore aktif <strong>(15:00–17:00)</strong> — Silakan catat suhu.'; }
  else { al.className = 'session-alert show alert-warn'; al.innerHTML = '⚠️ Pencatatan suhu hanya pada <strong>07:00–09:00</strong> (Pagi) atau <strong>15:00–17:00</strong> (Sore).'; }
}

// ============================================================
// TEMPERATURE BOARD
// ============================================================
function renderTempBoard() {
  const today = new Date().toISOString().slice(0, 10);
  ['tempBoardMain', 'dashTempBoard'].forEach(bid => {
    const c = document.getElementById(bid); if (!c) return;
    c.innerHTML = TEMP_ROOMS.map(room => {
      const p = DB.suhu.find(s => s.ruanganId === room.id && s.tanggal === today && s.sesi === 'pagi');
      const s = DB.suhu.find(x => x.ruanganId === room.id && x.tanggal === today && x.sesi === 'sore');
      const hasProblem = (p && getTempStatus(room, p.suhu, p.kelembaban) === 'oos') || (s && getTempStatus(room, s.suhu, s.kelembaban) === 'oos');
      const hasData = p || s;
      const hdrCls = hasProblem ? 'rh-oos' : hasData ? 'rh-ok' : 'rh-empty';
      const cardCls = hasProblem ? 'rc-oos' : hasData ? 'rc-ok' : 'rc-empty';

      const specStr = `${room.tempMin}–${room.tempMax}°C${room.hasHum ? ` | ${room.humMin}–${room.humMax}%` : ''}`;

      const sessBlock = (sess, entry) => {
        if (!entry) return `<div class="sess-block"><div class="sess-label">${sess === 'pagi' ? '🌅 Pagi' : '🌇 Sore'}</div><div class="sess-temp st-na">N/A</div><div class="sess-by">Belum dicatat</div></div>`;
        const st = getTempStatus(room, entry.suhu, entry.kelembaban);
        return `<div class="sess-block">
          <div class="sess-label">${sess === 'pagi' ? '🌅 Pagi' : '🌇 Sore'}</div>
          <div class="sess-temp ${st === 'oos' ? 'st-oos' : 'st-ok'}">${entry.suhu}°C</div>
          ${room.hasHum && entry.kelembaban != null ? `<div class="sess-hum">💧 ${entry.kelembaban}%</div>` : ''}
          <div class="sess-by">👤 ${san(entry.petugas || '')}</div>
        </div>`;
      };

      const currSess = getCurrentSession();
      const isCurrFilled = (currSess === 'pagi' && p) || (currSess === 'sore' && s);
      const isAllFilled = p && s;

      let btnHtml = '';
      if (isAllFilled) {
        btnHtml = `<button class="add-reading-btn" disabled style="background:#E2E8F0;color:#A0AEC0;cursor:not-allowed;box-shadow:none">Lengkap</button>`;
      } else if (currSess && isCurrFilled) {
        btnHtml = `<button class="add-reading-btn" disabled style="background:#E2E8F0;color:#A0AEC0;cursor:not-allowed;box-shadow:none">Sesi Terisi</button>`;
      } else {
        btnHtml = `<button class="add-reading-btn" onclick="event.stopPropagation();openSuhuForRoom('${room.id}')">+ Catat</button>`;
      }

      return `<div class="room-card ${cardCls}" onclick="if(!'${isAllFilled || (currSess && isCurrFilled)}') openSuhuForRoom('${room.id}')">
        <div class="room-card-header ${hdrCls}">
          <span>🌡️ ${san(room.name)}</span>
          ${hasProblem ? '<span>⚠️ OOS</span>' : hasData ? '<span>✓</span>' : '<span>—</span>'}
        </div>
        <div class="room-sessions">${sessBlock('pagi', p)}${sessBlock('sore', s)}</div>
        <div class="room-card-footer">
          <span>Spec: ${specStr}</span>
          ${btnHtml}
        </div>
      </div>`;
    }).join('');
  });
}

function openSuhuForRoom(roomId) {
  if (!document.getElementById('page-suhu').classList.contains('active')) navigateTo('suhu');
  setTimeout(() => {
    const form = document.getElementById('formSuhu');
    form.style.display = 'block';
    initD('suhuTanggal');
    document.getElementById('suhuPetugas').value = currentUser?.name || '';
    const sel = document.getElementById('suhuRuangan');
    sel.value = roomId;
    sel.dispatchEvent(new Event('change'));
    const sess = getCurrentSession();
    if (sess) document.getElementById('suhuSesi').value = sess;
    updateSessionAlert();
    checkSuhuDup();
    const mc = document.querySelector('.main-content');
    if (mc) { const rect = form.getBoundingClientRect(); const mcRect = mc.getBoundingClientRect(); mc.scrollTop += rect.top - mcRect.top - 60; }
  }, 100);
}

function checkSuhuDup() {
  const tgl = document.getElementById('suhuTanggal')?.value;
  const sesi = document.getElementById('suhuSesi')?.value;
  const roomId = document.getElementById('suhuRuangan')?.value;
  const btnSubmit = document.querySelector('#suhuForm button[type="submit"]');
  if (!btnSubmit) return;

  if (tgl && sesi && roomId) {
    const dup = DB.suhu.find(s => s.tanggal === tgl && s.sesi === sesi && s.ruanganId === roomId);
    if (dup) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '🚫 Sesi Sudah Terisi';
      btnSubmit.style.background = '#E2E8F0';
      btnSubmit.style.color = '#718096';
      btnSubmit.style.cursor = 'not-allowed';
    } else {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '💾 Simpan';
      btnSubmit.style.background = '';
      btnSubmit.style.color = '';
      btnSubmit.style.cursor = '';
    }
  } else {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = '💾 Simpan';
    btnSubmit.style.background = '';
    btnSubmit.style.color = '';
    btnSubmit.style.cursor = '';
  }
}

// ============================================================
// DASHBOARD
// ============================================================
let chartObj1 = null, chartObj2 = null, chartObj3 = null;
function renderDashboard() {
  const today = new Date().toISOString().slice(0, 10);
  checkAnalystReminder();
  
  // Metric Cards
  animNum('dashTotalJobs', DB.jobdesk.length);
  animNum('dashJobsDone', DB.jobdesk.filter(r => r.status === 'selesai').length);
  animNum('dashJobsProgress', DB.jobdesk.filter(r => r.status === 'proses').length);
  animNum('dashTotalSamples', DB.sampel.length);
  
  let totalParamsDone = 0;
  DB.jobdesk.filter(r => r.status === 'selesai').forEach(j => {
     let c = (j.parameter || '').split(',').length;
     totalParamsDone += c;
  });
  animNum('dashParamsDone', totalParamsDone);
  
  const activeInstCount = DB.instrumen.filter(r => !r.waktuSelesai || r.waktuSelesai > new Date().toISOString()).length;
  animNum('dashInstrumentReady', INSTRUMENTS.length - activeInstCount);

  // TABLES
  const tUp = document.getElementById('dashUpcomingJobs');
  if (tUp) {
    const upJobs = DB.jobdesk.filter(r => r.status !== 'selesai').slice(-5).reverse();
    tUp.innerHTML = upJobs.length === 0 ? '<tr><td colspan="3" class="empty-row">Tidak ada tugas berjalan</td></tr>' :
      upJobs.map(j => `<tr><td>${san(j.analis.split(' ')[0])}</td><td><strong>${san(j.noSampel)}</strong><br><span style="font-size:0.7rem;color:#718096">${san(j.parameter).slice(0, 20)}...</span></td><td>${B[j.status] || j.status}</td></tr>`).join('');
  }
    
  const tUn = document.getElementById('dashUnprocessedSamples');
  if (tUn) {
    const unSamples = DB.sampel.filter(r => r.status === 'antrian' || r.status === 'diterima').slice(-5).reverse();
    tUn.innerHTML = unSamples.length === 0 ? '<tr><td colspan="3" class="empty-row">Tidak ada antrian</td></tr>' :
      unSamples.map(s => `<tr><td><strong>${san(s.noSampel)}</strong></td><td>${san(s.requester)}</td><td>${fmtD(s.tanggal)}</td></tr>`).join('');
  }
    
  const tDone = document.getElementById('dashRecentlyCompleted');
  if (tDone) {
    const doneJobs = DB.jobdesk.filter(r => r.status === 'selesai').slice(-5).reverse();
    tDone.innerHTML = doneJobs.length === 0 ? '<tr><td colspan="3" class="empty-row">Belum ada penyelesaian</td></tr>' :
      doneJobs.map(j => `<tr><td><strong>${san(j.noSampel)}</strong></td><td>${san(j.analis.split(' ')[0])}</td><td>${fmtD(j.tanggal)}</td></tr>`).join('');
  }

  // Charts
  if (window.Chart) {
    if (chartObj1) chartObj1.destroy();
    if (chartObj2) chartObj2.destroy();
    if (chartObj3) chartObj3.destroy();
    
    // Chart 1: Job Status by Analyst
    const analystNames = [...new Set(DB.jobdesk.map(j => j.analis))];
    const dataDone = analystNames.map(a => DB.jobdesk.filter(j => j.analis === a && j.status === 'selesai').length);
    const dataProg = analystNames.map(a => DB.jobdesk.filter(j => j.analis === a && j.status !== 'selesai').length);
    
    const ctx1 = document.getElementById('chartAnalystJobs');
    if (ctx1 && analystNames.length) {
      chartObj1 = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: analystNames.map(a => a.split(' ')[0]),
          datasets: [
            { label: 'Selesai', data: dataDone, backgroundColor: '#38A169' },
            { label: 'Proses/Belum', data: dataProg, backgroundColor: '#DD6B20' }
          ]
        },
        options: { maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
      });
    } else if (ctx1) {
       ctx1.parentElement.innerHTML = '<p class="empty-msg" style="padding-top:80px">Belum ada data analis</p>';
    }
    
    // Chart 2: Parameter Completion Trend (simple count per day)
    const dates = [...new Set(DB.jobdesk.filter(j => j.status === 'selesai').map(j => j.tanggal))].sort().slice(-7);
    const dateCounts = dates.map(d => DB.jobdesk.filter(j => j.tanggal === d && j.status === 'selesai').length);
    const ctx2 = document.getElementById('chartParamTrend');
    if (ctx2 && dates.length) {
      chartObj2 = new Chart(ctx2, {
        type: 'line',
        data: {
          labels: dates.map(d => fmtD(d).slice(0, 5)),
          datasets: [{ label: 'Tugas Selesai', data: dateCounts, borderColor: '#3182CE', backgroundColor: 'rgba(49, 130, 206, 0.2)', fill: true, tension: 0.3 }]
        },
        options: { maintainAspectRatio: false }
      });
    } else if (ctx2) {
       ctx2.parentElement.innerHTML = '<p class="empty-msg" style="padding-top:80px">Belum ada penyelesaian</p>';
    }
    
    // Chart 3: Instrument Usage
    const instCounts = {};
    DB.instrumen.slice(-50).forEach(i => {
      instCounts[i.kondisiAkhir] = (instCounts[i.kondisiAkhir] || 0) + 1;
    });
    const ctx3 = document.getElementById('chartInstrumentUsage');
    if (ctx3 && Object.keys(instCounts).length) {
      chartObj3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
          labels: Object.keys(instCounts),
          datasets: [{
            data: Object.values(instCounts),
            backgroundColor: ['#38A169', '#DD6B20', '#E53E3E', '#A0AEC0']
          }]
        },
        options: { maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } }
      });
    } else if (ctx3) {
       ctx3.parentElement.innerHTML = '<p class="empty-msg" style="padding-top:80px">Belum ada pemakaian instrumen</p>';
    }
  }
}
function animNum(id, t) { const el = document.getElementById(id); if (!el) return; let v = 0; const s = Math.ceil(t / 20) || 1; const timer = setInterval(() => { v = Math.min(v + s, t); el.textContent = v; if (v >= t) clearInterval(timer); }, 35); }

// ============================================================
// CATALOG — card grid, open modal on click
// ============================================================
function renderCatalog() {
  const g = document.getElementById('instrumentCatalogGrid'); if (!g) return;
  g.innerHTML = INSTRUMENTS.map(ins => {
    const usageCount = DB.instrumen.filter(r => r.instrumenId === ins.id).length;
    const isHeating = ins.heating;
    return `
      <div class="instr-card-wrap" id="card-${ins.id}">
        <div class="instr-use-card" onclick="openInstrModal('${ins.id}')" title="Klik untuk mencatat pemakaian ${escHtml(ins.name)}">
          <div class="instr-card-icon">${ins.icon}</div>
          <div class="instr-name">${san(ins.name)}</div>
          <div class="instr-lamrd">📋 ${san(ins.lamrd || ins.noSeri || ins.id)}</div>
          <div class="instr-cat-badge">${san(ins.cat)}${isHeating ? ' 🌡️' : ''}</div>
          <div class="instr-usage-row"><span>📊 ${usageCount}× dipakai</span></div>
          <div class="instr-cta">▶ Isi Pemakaian</div>
        </div>
      </div>`;
  }).join('');
}

function buildInlineForm(ins) {
  const hasUnits = ins.units && ins.units.length > 0;
  const hasMulti = ins.units && ins.units.length > 1;
  const unitOpts = hasMulti ? ins.units.map(u => `<option value="${u}">${u}</option>`).join('') : '';
  return `
    <form class="inline-form-body" onsubmit="submitInlineForm(event,'${ins.id}')">
      <div class="inline-form-header">
        <div><span>${ins.icon} <strong>${san(ins.name)}</strong></span>
        <small style="display:block;color:var(--text-muted);font-size:0.7rem;margin-top:2px;">📋 ${san(ins.lamrd || ins.noSeri || '')}</small></div>
        <button type="button" class="btn-close" onclick="toggleInlineForm(null)">✕</button>
      </div>
      <div class="inline-form-grid">
        ${hasMulti ? `<div class="form-group"><label>No. Aset (Unit) <span class="req">*</span></label><select id="il-unit-${ins.id}" required><option value="">-- Pilih Unit --</option>${unitOpts}</select></div>` : `<input type="hidden" id="il-unit-${ins.id}" value="${hasUnits ? ins.units[0] : ins.noSeri}">`}
        <div class="form-group"><label>No. Sampel</label><input type="text" id="il-sampel-${ins.id}" placeholder="SMP/2603/0001"/></div>
        <div class="form-group"><label>Nama Analis <span class="req">*</span></label><input type="text" id="il-analis-${ins.id}" value="${currentUser?.name||''}" required/></div>
        <div class="form-group"><label>Waktu Mulai <span class="req">*</span></label><input type="datetime-local" id="il-mulai-${ins.id}" required/></div>
        <div class="form-group"><label>Waktu Selesai</label><input type="datetime-local" id="il-selesai-${ins.id}"/></div>
        ${ins.heating ? `<div class="form-group"><label>Suhu Operasional (°C) <span class="req">*</span></label><input type="number" id="il-suhu-${ins.id}" step="0.1" placeholder="Cth: 37.5"/></div>` : ''}
        <div class="form-group inline-full"><label>Tujuan / Nama Sampel <span class="req">*</span></label><input type="text" id="il-tujuan-${ins.id}" placeholder="Tujuan penggunaan atau nama sampel" required/></div>
        <div class="form-group"><label>Kondisi Akhir <span class="req">*</span></label>
          <select id="il-kondisi-${ins.id}" required><option>Baik</option><option>Ada Gangguan Minor</option><option>Rusak / Perlu Perbaikan</option></select></div>
        <div class="form-group inline-full"><label>Catatan</label><textarea id="il-catatan-${ins.id}" rows="2" placeholder="Catatan tambahan…"></textarea></div>
      </div>
      <div class="inline-form-actions">
        <button type="button" class="btn-secondary" onclick="toggleInlineForm(null)">Batal</button>
        <button type="submit" class="btn-primary">💾 Simpan Pemakaian</button>
      </div>
    </form>`;
}

function toggleInlineForm(instrId) {
  if (_activeCardId && _activeCardId !== instrId) {
    const prev = document.getElementById(`inline-${_activeCardId}`);
    const prevCard = document.querySelector(`#card-${_activeCardId} .instr-use-card`);
    if (prev) prev.style.display = 'none';
    if (prevCard) prevCard.classList.remove('card-active');
  }
  if (!instrId || _activeCardId === instrId) { _activeCardId = null; return; }
  _activeCardId = instrId;
  const form = document.getElementById(`inline-${instrId}`);
  const card = document.querySelector(`#card-${instrId} .instr-use-card`);
  if (form) {
    form.style.display = 'block';
    const mulaiEl = document.getElementById(`il-mulai-${instrId}`);
    if (mulaiEl && !mulaiEl.value) { const n = new Date(); n.setMinutes(n.getMinutes() - n.getTimezoneOffset()); mulaiEl.value = n.toISOString().slice(0,16); }
    if (card) card.classList.add('card-active');
    form.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }
}

function submitInlineForm(e, instrId) {
  e.preventDefault();
  const ins = INSTRUMENTS.find(i => i.id === instrId); if (!ins) return;
  const unit = document.getElementById(`il-unit-${instrId}`)?.value || '-';
  const noSampel = document.getElementById(`il-sampel-${instrId}`)?.value || '';
  const analis = document.getElementById(`il-analis-${instrId}`)?.value || '';
  const waktuMulai = document.getElementById(`il-mulai-${instrId}`)?.value || '';
  const waktuSelesai = document.getElementById(`il-selesai-${instrId}`)?.value || '';
  const suhu = ins.heating ? (document.getElementById(`il-suhu-${instrId}`)?.value || '-') : '-';
  const tujuan = document.getElementById(`il-tujuan-${instrId}`)?.value || '';
  const kondisi = document.getElementById(`il-kondisi-${instrId}`)?.value || 'Baik';
  const catatan = document.getElementById(`il-catatan-${instrId}`)?.value || '';
  const rec = {
    id: uid(), instrumenId: instrId, instrumenNama: ins.name,
    unit, noSeri: unit || ins.noSeri, noSampel, analis,
    waktuMulai, waktuSelesai, tujuan, suhuOperasional: suhu,
    kondisiAwal:'Baik', kondisiAkhir: kondisi, catatan, recordedBy: currentUser?.name,
  };
  DB.instrumen.push(rec); save('instrumen');
  addLog('instrumen', `${ins.name} (${unit}) dipakai oleh ${analis} — ${noSampel || tujuan}`);
  postToSheet('instrumen', [rec.id, fmtDT(rec.waktuMulai), rec.instrumenNama, rec.unit, rec.noSeri, rec.analis, fmtDT(rec.waktuSelesai)||'-', rec.tujuan, rec.suhuOperasional, rec.kondisiAkhir, rec.catatan, rec.recordedBy]);
  showToast(`✅ Pemakaian ${ins.name} tersimpan!`);
  toggleInlineForm(null);
  renderCatalog(); renderInstrumen(); renderDashboard(); renderJobdesk();
  // Chain prompt
  const job = DB.jobdesk.find(j => j.noSampel === noSampel && j.analis === analis);
  if (job && noSampel) {
    const reqs = getRequiredInstruments(job.parameter);
    const next = reqs.find(inst => inst !== 'Manual' && !checkInstrumentRecorded(noSampel, inst));
    if (next) {
      setTimeout(() => {
        if (confirm(`Pemakaian ${ins.name} tersimpan.\n\nLanjut isi instrumen berikutnya:\n→ ${next}`)) {
          const nextIns = INSTRUMENTS.find(i => i.name.toLowerCase().includes(next.toLowerCase()) || next.toLowerCase().includes(i.name.toLowerCase()));
          if (nextIns) toggleInlineForm(nextIns.id);
        }
      }, 400);
    }
  }
}

// ============================================================
// INSTRUMENT MODAL (replaces inline dropdown form)
// ============================================================
let _instrModalInstrId = null;

function openInstrModal(instrId, prefillSampel, prefillAnalis) {
  const ins = INSTRUMENTS.find(i => i.id === instrId);
  if (!ins) return;
  _instrModalInstrId = instrId;

  // Build modal HTML
  const hasMulti = ins.units && ins.units.length > 1;
  const unitOpts = hasMulti ? ins.units.map(u => `<option value="${u}">${u}</option>`).join('') : '';
  const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const nowStr = now.toISOString().slice(0, 16);
  const html = `
    <div class="instr-modal-backdrop" id="instrModalBackdrop" onclick="if(event.target===this)closeInstrModal()">
      <div class="instr-modal">
        <div class="instr-modal-header">
          <h3>${ins.icon} ${san(ins.name)} <small style="font-size:.75rem;color:#718096;">(${san(ins.lamrd || ins.noSeri || ins.cat)})</small></h3>
          <button type="button" class="btn-close" onclick="closeInstrModal()">✕</button>
        </div>
        <div class="instr-modal-body">
          <form id="instrModalForm" onsubmit="submitInstrModal(event, '${instrId}')">
            <div class="form-grid">
              ${hasMulti ? `<div class="form-group"><label>No. Aset / Unit <span class="req">*</span></label><select id="im-unit" required><option value="">-- Pilih Unit --</option>${unitOpts}</select></div>` : `<input type="hidden" id="im-unit" value="${ins.units?.[0] || ins.noSeri || ''}"><div class="form-group"><label>No. Aset / LAMRD</label><input type="text" value="${san(ins.lamrd || ins.noSeri || '')}" readonly style="background:var(--bg);"/></div>`}
              <div class="form-group"><label>No. Sampel (Terkait)</label><input type="text" id="im-sampel" placeholder="Cth: SMP/2603/0001" value="${escHtml(prefillSampel||'')}"/></div>
              <div class="form-group"><label>Nama Analis <span class="req">*</span></label><input type="text" id="im-analis" value="${escHtml(prefillAnalis||currentUser?.name||'')}" required/></div>
              <div class="form-group"><label>Waktu Mulai <span class="req">*</span></label><input type="datetime-local" id="im-mulai" value="${nowStr}" required/></div>
              <div class="form-group"><label>Waktu Selesai</label><input type="datetime-local" id="im-selesai"/></div>
              ${ins.heating ? `<div class="form-group"><label>Suhu Operasional (°C) <span class="req">*</span></label><input type="number" id="im-suhu" step="0.1" placeholder="Cth: 37.5" required/></div>` : `<input type="hidden" id="im-suhu" value="-">`}
              <div class="form-group full-width"><label>Tujuan / Nama Sampel <span class="req">*</span></label><input type="text" id="im-tujuan" placeholder="Tujuan penggunaan atau nama sampel" value="${prefillSampel ? 'Analisis Sampel '+escHtml(prefillSampel) : ''}" required/></div>
              <div class="form-group"><label>Kondisi Akhir</label><select id="im-kondisi"><option>Baik</option><option>Ada Gangguan Minor</option><option>Rusak / Perlu Perbaikan</option></select></div>
              <div class="form-group full-width"><label>Catatan</label><textarea id="im-catatan" rows="2" placeholder="Catatan tambahan…"></textarea></div>
            </div>
            <div class="form-actions" style="padding-top:.75rem;border-top:1px solid var(--border);margin-top:.5rem;">
              <button type="button" class="btn-secondary" onclick="closeInstrModal()">Batal</button>
              <button type="submit" class="btn-primary">💾 Simpan Pemakaian</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;
  // Inject modal into body
  let existing = document.getElementById('instrModalBackdrop');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', html);
}

function closeInstrModal() {
  const el = document.getElementById('instrModalBackdrop');
  if (el) el.remove();
  _instrModalInstrId = null;
}

function escHtml(str) { return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function submitInstrModal(e, instrId) {
  e.preventDefault();
  const ins = INSTRUMENTS.find(i => i.id === instrId); if (!ins) return;
  const rec = {
    id: uid(), instrumenId: instrId, instrumenNama: ins.name,
    unit: document.getElementById('im-unit')?.value || '-',
    noSeri: document.getElementById('im-unit')?.value || ins.noSeri || '-',
    noSampel: document.getElementById('im-sampel')?.value || '',
    analis: document.getElementById('im-analis')?.value || '',
    waktuMulai: document.getElementById('im-mulai')?.value || '',
    waktuSelesai: document.getElementById('im-selesai')?.value || '',
    suhuOperasional: ins.heating ? (document.getElementById('im-suhu')?.value || '-') : '-',
    tujuan: document.getElementById('im-tujuan')?.value || '',
    kondisiAwal: 'Baik',
    kondisiAkhir: document.getElementById('im-kondisi')?.value || 'Baik',
    catatan: document.getElementById('im-catatan')?.value || '',
    recordedBy: currentUser?.name,
  };
  DB.instrumen.push(rec); save('instrumen');
  addLog('instrumen', `${ins.name} (${rec.unit}) dipakai oleh ${rec.analis} — ${rec.noSampel || rec.tujuan}`);
  postToSheet('instrumen', [rec.id, fmtDT(rec.waktuMulai), rec.instrumenNama, rec.unit, rec.noSeri, rec.analis, fmtDT(rec.waktuSelesai)||'-', rec.tujuan, rec.suhuOperasional, rec.kondisiAkhir, rec.catatan, rec.recordedBy]);
  showToast(`✅ Pemakaian ${ins.name} tersimpan!`);
  closeInstrModal();
  renderCatalog(); renderInstrumen(); renderDashboard(); renderJobdesk();
  // Chain prompt if there's a next instrument
  const noSampel = rec.noSampel, analis = rec.analis;
  const job = DB.jobdesk.find(j => j.noSampel === noSampel && j.analis === analis);
  if (job && noSampel) {
    const reqs = getRequiredInstruments(job.parameter);
    const next = reqs.find(inst => inst !== 'Manual' && !checkInstrumentRecorded(noSampel, inst));
    if (next) {
      setTimeout(() => {
        if (confirm(`Pemakaian ${ins.name} tersimpan.\n\nLanjut isi instrumen berikutnya:\n→ ${next}`)) {
          const nextIns = INSTRUMENTS.find(i => i.name.toLowerCase().includes(next.toLowerCase()) || next.toLowerCase().includes(i.name.toLowerCase()));
          if (nextIns) openInstrModal(nextIns.id, noSampel, analis);
        }
      }, 300);
    }
  }
}

// openInstrumenForm compatibility shim
function openInstrumenForm(instrId) {
  if (instrId) openInstrModal(instrId);
  else {
    navigateTo('instrumen');
    setTimeout(() => {
      const form = document.getElementById('formInstrumen');
      if (form) { form.style.display = 'block'; const mc = document.querySelector('.main-content'); if (mc) mc.scrollTop = 0; }
    }, 150);
  }
}



// ============================================================
// MODULE: INSTRUMEN
// ============================================================
function renderInstrumen(filter = '', kondisi = '') {
  // Stats
  animNum('statInstrTotal', INSTRUMENTS.length);
  const activeCount = DB.instrumen.filter(r => !r.waktuSelesai || r.waktuSelesai > new Date().toISOString()).length;
  animNum('statInstrAktif', activeCount);
  animNum('statInstrMaintenance', DB.instrumen.filter(r => r.kondisiAkhir === 'rusak').length);

  const tbody = document.getElementById('instrumenBody');
  let data = [...DB.instrumen].reverse();
  if (filter) data = data.filter(r => (r.instrumenNama + r.analis + r.tujuan).toLowerCase().includes(filter.toLowerCase()));
  if (kondisi) data = data.filter(r => r.kondisiAkhir === kondisi);
  tbody.innerHTML = data.length === 0 ? '<tr><td colspan="9" class="empty-row">Belum ada catatan</td></tr>' :
    data.map((r, i) => {
      const ins = INSTRUMENTS.find(x => x.id === r.instrumenId) || { icon: '🔬' }; return `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${ins.icon} ${san(r.instrumenNama)}</strong>${r.unit ? `<br><small style="color:var(--text-muted)">${san(r.unit)}</small>` : ''}</td>
        <td><small style="color:var(--text-muted)">${san(r.noSeri || '-')}</small></td>
        <td>${san(r.analis)}</td>
        <td style="white-space:nowrap">${fmtDT(r.waktuMulai)}</td>
        <td style="white-space:nowrap">${r.waktuSelesai ? fmtDT(r.waktuSelesai) : '<span style="color:var(--text-dim)">Aktif</span>'}</td>
        <td style="max-width:180px">${san(r.tujuan)} ${r.suhuOperasional && r.suhuOperasional !== '-' ? `<br><b style="color:var(--red)">Suhu: ${r.suhuOperasional}\u00B0C</b>` : ''}</td>
        <td><span class="status-badge status-${r.kondisiAkhir === 'Baik' ? 'normal' : 'oos'}">${san(r.kondisiAkhir)}</span></td>
        <td class="lt-only-td" style="display:${isLabTech() ? '' : 'none'}">
          <button class="btn-danger" onclick="del('instrumen','${r.id}')">🗑️</button>
        </td>
      </tr>`;
    }).join('');
}

// Instrument form change logic moved to populateInstrumenSelect for consistency.

  document.getElementById('instrumenForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const sel = document.getElementById('instrNama');
    const ins = INSTRUMENTS.find(i => i.id === sel.value) || {};
    const unit = document.getElementById('unitGroup').style.display === 'none' ? '-' : document.getElementById('instrUnit').value;
    const noSeri = document.getElementById('instrNoSeri').value;

    const rec = {
      id: uid(), instrumenId: sel.value,
      instrumenNama: ins.name || sel.options[sel.selectedIndex]?.text || sel.value,
      unit, noSeri,
      noSampel: document.getElementById('instrNoSampel').value,
      analis: document.getElementById('instrAnalis').value,
      waktuMulai: document.getElementById('instrWaktuMulai').value,
      waktuSelesai: document.getElementById('instrWaktuSelesai').value,
      tujuan: document.getElementById('instrTujuan').value,
      suhuOperasional: document.getElementById('instrSuhuGroup').style.display === 'none' ? '-' : document.getElementById('instrSuhu').value,
      kondisiAwal: document.getElementById('instrKondisiAwal').value,
      kondisiAkhir: document.getElementById('instrKondisiAkhir').value,
      catatan: document.getElementById('instrCatatan').value,
      recordedBy: currentUser?.name,
    };
    DB.instrumen.push(rec); save('instrumen');
    addLog('instrumen', `Penggunaan ${rec.instrumenNama} (${rec.noSeri}) oleh ${rec.analis}`);

    postToSheet('instrumen', [rec.id, fmtDT(rec.waktuMulai), rec.instrumenNama, rec.unit || '-', rec.noSeri, rec.analis, fmtDT(rec.waktuSelesai) || '-', rec.tujuan, rec.suhuOperasional || '-', rec.kondisiAkhir, rec.catatan, rec.recordedBy]);
  showToast('Catatan instrumen disimpan!');
  this.reset();
  
  const lastNoSampel = rec.noSampel;
  const lastAnalis = rec.analis;

  document.getElementById('unitGroup').style.display = 'none';
  document.getElementById('instrAnalis').value = currentUser?.name || '';
  document.getElementById('formInstrumen').style.display = 'none';
  renderInstrumen(); renderDashboard(); renderJobdesk(); // Refresh jobdesk to update checklist

  // Check if there are more instruments to fill for this job
  const job = DB.jobdesk.find(j => j.noSampel === lastNoSampel && j.analis === lastAnalis);
  if (job) {
    const reqs = getRequiredInstruments(job.parameter);
    const next = reqs.find(inst => !checkInstrumentRecorded(lastNoSampel, inst));
    if (next && next !== 'Manual') {
      if (confirm(`Instrumen ${rec.instrumenNama} tersimpan. Lanjut isi instrumen berikutnya: ${next}?`)) {
        openInstrumenFormByName(next, lastNoSampel, lastAnalis);
      }
    } else if (reqs.length > 0) {
      showToast('Semua instrumen untuk tugas ini telah dicatat!');
    }
  }
});

function openInstrumenFormByName(instrName, noSampel, analis) {
  const ins = INSTRUMENTS.find(i => i.name.toLowerCase().includes(instrName.toLowerCase()) || instrName.toLowerCase().includes(i.name.toLowerCase()));
  if (!ins) {
    showToast(`Instrumen "${instrName}" tidak ditemukan, silakan pilih manual.`, 'info');
    return;
  }
  openInstrModal(ins.id, noSampel, analis);
}

// ============================================================
// MODULE: SUHU
// ============================================================
function renderSuhu(filter = '', sesiF = '', statusF = '') {
  // Stats
  animNum('statSuhuRuangan', TEMP_ROOMS.length);
  const today = new Date().toISOString().slice(0, 10);
  animNum('statSuhuOOS', DB.suhu.filter(r => r.tanggal === today && r.statusCalc === 'oos').length);
  const completeness = Math.round((DB.suhu.filter(r => r.tanggal === today).length / (TEMP_ROOMS.length * 2)) * 100) || 0;
  animNum('statSuhuUpdate', completeness);

  renderTempBoard();
  const tbody = document.getElementById('suhuBody');
  let data = [...DB.suhu].reverse();
  if (filter) data = data.filter(r => (r.ruangan + r.petugas).toLowerCase().includes(filter.toLowerCase()));
  if (sesiF) data = data.filter(r => r.sesi === sesiF);
  if (statusF) data = data.filter(r => r.statusCalc === statusF);
  tbody.innerHTML = data.length === 0 ? '<tr><td colspan="11" class="empty-row">Belum ada data</td></tr>' :
    data.map((r, i) => {
      const room = TEMP_ROOMS.find(x => x.id === r.ruanganId);
      const tok = room && r.suhu >= room.tempMin && r.suhu <= room.tempMax;
      const hok = !room?.hasHum || (r.kelembaban !== null && !isNaN(r.kelembaban) && r.kelembaban >= room.humMin && r.kelembaban <= room.humMax);
      return `<tr>
        <td>${i + 1}</td>
        <td>${san(r.tanggal)}</td>
        <td>${r.sesi === 'pagi' ? '🌅 Pagi' : '🌇 Sore'}</td>
        <td><strong>${san(r.ruangan)}</strong></td>
        <td style="font-weight:700;color:${tok ? 'var(--green)' : 'var(--red)'}">${r.suhu}°C</td>
        <td style="font-size:.72rem;color:var(--text-muted)">${room ? `${room.tempMin}–${room.tempMax}°C` : '-'}</td>
        <td style="color:${room?.hasHum ? (hok ? 'var(--green)' : 'var(--red)') : 'var(--text-dim)'}">${room?.hasHum && r.kelembaban != null ? r.kelembaban + '%' : '-'}</td>
        <td style="font-size:.72rem;color:var(--text-muted)">${room?.hasHum ? `${room.humMin}–${room.humMax}%` : '-'}</td>
        <td>${B[r.statusCalc] || r.statusCalc}</td>
        <td>${san(r.petugas)}</td>
        <td class="lt-only-td" style="display:${isLabTech() ? '' : 'none'}">
          <button class="btn-danger" onclick="del('suhu','${r.id}')">🗑️</button>
        </td>
      </tr>`;
    }).join('');
}

document.getElementById('suhuForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const sesiId = document.getElementById('suhuSesi').value;
  const roomId = document.getElementById('suhuRuangan').value;
  const tanggal = document.getElementById('suhuTanggal').value;
  const suhu = parseFloat(document.getElementById('suhuNilai').value);
  const kelem = document.getElementById('suhuKelembaban').value !== '' ? parseFloat(document.getElementById('suhuKelembaban').value) : null;

  if (!sesiId) { showToast('Pilih sesi pencatatan (Pagi/Sore)', 'error'); return; }
  if (!roomId) { showToast('Pilih ruangan', 'error'); return; }

  const dup = DB.suhu.find(s => s.tanggal === tanggal && s.sesi === sesiId && s.ruanganId === roomId);
  if (dup) { showToast(`Data ${sesiId} ruangan ini sudah ada hari ini!`, 'error'); return; }

  const room = TEMP_ROOMS.find(r => r.id === roomId);
  const statusCalc = room ? getTempStatus(room, suhu, kelem) : 'normal';
  const rec = {
    id: uid(), tanggal, sesi: sesiId, ruanganId: roomId, ruangan: room?.name || roomId,
    suhu, kelembaban: kelem, petugas: document.getElementById('suhuPetugas').value,
    kondisiAC: document.getElementById('suhuKondisiAC').value,
    tindakan: document.getElementById('suhuTindakan').value,
    catatan: document.getElementById('suhuCatatan').value,
    statusCalc, recordedBy: currentUser?.name,
  };
  DB.suhu.push(rec); save('suhu');
  addLog('suhu', `Suhu ${rec.ruangan} (${sesiId}): ${suhu}°C${room?.hasHum && kelem != null ? `, Hum: ${kelem}%` : ''} — ${statusCalc === 'oos' ? '⚠️ OOS' : 'Normal'}`);
  postToSheet('suhu', [rec.id, rec.tanggal, sesiId, rec.ruangan, suhu, kelem || '-', statusCalc, rec.petugas, rec.tindakan || '-', rec.recordedBy]);
  showToast(statusCalc === 'oos' ? 'Data disimpan — ⚠️ OUT OF SPEC!' : 'Data suhu disimpan!', statusCalc === 'oos' ? 'error' : 'success');
  this.reset();
  document.getElementById('suhuSpecBox').innerHTML = '';
  document.getElementById('humidityGroup').style.display = '';
  document.getElementById('suhuPetugas').value = currentUser?.name || '';
  document.getElementById('formSuhu').style.display = 'none';
  renderSuhu(); renderDashboard();
});

// ============================================================
// MODULE: JOBDESK (no shift, no unit)
// ============================================================
function renderJobdesk(filter = '', statusF = '', prioF = '') {
  // Stats — show total or own stats depending on role
  const myJobsAll = isLabTech() ? DB.jobdesk : DB.jobdesk.filter(r => r.analis === currentUser?.name);
  animNum('statJobWait', myJobsAll.filter(r => r.status === 'belum').length);
  animNum('statJobProses', myJobsAll.filter(r => r.status === 'proses').length);
  animNum('statJobDone', myJobsAll.filter(r => r.status === 'selesai').length);

  // Filter data by role: analyst sees only own, LT sees all
  let data = isLabTech() ? [...DB.jobdesk].reverse() : [...DB.jobdesk].filter(r => r.analis === currentUser?.name).reverse();
  if (filter) data = data.filter(r => (r.analis + r.noSampel + r.parameter).toLowerCase().includes(filter.toLowerCase()));
  if (statusF) data = data.filter(r => r.status === statusF);
  if (prioF) data = data.filter(r => r.prioritas === prioF);
  const tbody = document.getElementById('jobdeskBody');
  tbody.innerHTML = data.length === 0 ? `<tr><td colspan="8" class="empty-row">${isLabTech() ? 'Belum ada penugasan' : 'Tidak ada jobdesk untuk Anda saat ini'}</td></tr>` :
    data.map((r, i) => `
      <tr>
        <td>${i + 1}</td><td><strong>${san(r.analis)}</strong></td>
        <td>${fmtD(r.tanggal)}</td>
        <td><strong>${san(r.noSampel)}</strong></td>
        <td style="max-width:220px;font-size:0.8rem;color:#4A5568;">${san(r.parameter)}</td>
        <td>${PRIO[r.prioritas] || r.prioritas}</td><td>${B[r.status] || r.status}</td>
        <td style="white-space:nowrap; display:${isLabTech() ? '' : 'none'};">
          <button class="btn-icon" onclick="chgJob('${r.id}','proses')" title="Tandai Proses">▶️</button>
          <button class="btn-icon" onclick="chgJob('${r.id}','selesai')" title="Tandai Selesai">✅</button>
          <button class="btn-danger" onclick="del('jobdesk','${r.id}')" title="Hapus">🗑️</button>
        </td>
      </tr>`).join('');

  const groups = { belum: [], proses: [], selesai: [] };
  data.forEach(r => { if (groups[r.status]) groups[r.status].push(r); else groups.belum.push(r); });
  ['belum', 'proses', 'selesai'].forEach(k => {
    const cap = k[0].toUpperCase() + k.slice(1);
    document.getElementById(`count${cap}`).textContent = groups[k].length;
    document.getElementById(`kanban${cap}`).innerHTML = groups[k].length === 0 ? '<p class="empty-msg" style="font-size:.72rem;padding:.8rem;">Kosong</p>' :
      groups[k].map(r => {
        const reqs = getRequiredInstruments(r.parameter);
        const checklist = reqs.map(inst => {
          const done = inst === 'Manual' ? true : checkInstrumentRecorded(r.noSampel, inst);
          return `<div style="font-size:0.65rem; color:${done ? 'var(--green)' : 'var(--red)'}; display:flex; align-items:center; gap:4px;">
            ${done ? '✅' : '⚠️'} ${inst}
            ${!done ? `<button onclick="openInstrumenFormByName('${inst}', '${r.noSampel}', '${r.analis}')" style="background:none; border:none; color:var(--blue); cursor:pointer; padding:0; font-size:0.65rem; text-decoration:underline;">Catat</button>` : ''}
          </div>`;
        }).join('');

        return `<div class="kanban-card prio-${r.prioritas}">
          <div class="kc-analis">👤 ${san(r.analis)}</div>
          <div class="kc-task"><strong>${san(r.noSampel || '')}</strong><br><span style="font-size:.7rem">${san(r.parameter)}</span></div>
          ${reqs.length > 0 ? `<div style="margin-top:8px; border-top:1px dashed var(--border); padding-top:6px;">
            <div style="font-size:0.6rem; font-weight:700; color:var(--text-muted); margin-bottom:4px; text-transform:uppercase;">Instrumen Wajib:</div>
            ${checklist}
          </div>` : ''}
          <div class="kc-meta">
            ${PRIO[r.prioritas] || ''}
            ${(isLabTech() || (currentUser && r.analis === currentUser.name)) ? `
              <div style="margin-top:8px; display:flex; gap:4px;">
                ${r.status === 'belum' ? `<button class="btn-icon" style="font-size:0.7rem; padding:2px 6px;" onclick="chgJob('${r.id}','proses')">▶️ Mulai</button>` : ''}
                ${r.status === 'proses' ? `<button class="btn-icon" style="font-size:0.7rem; padding:2px 6px; background:var(--green-pale); border-color:var(--green);" onclick="chgJob('${r.id}','selesai')">✅ Selesai</button>` : ''}
              </div>
            ` : ''}
          </div>
        </div>`;
      }).join('');
  });
  // Update analyst reminder after render
  checkAnalystReminder();
}

function chgJob(id, status) {
  const idx = DB.jobdesk.findIndex(r => r.id === id); if (idx < 0) return;
  const job = DB.jobdesk[idx];

  // Validation: Only allow lab_tech or the assigned analyst to change status
  if (!isLabTech() && currentUser?.name !== job.analis) {
     showToast('Hanya Lab Technologist atau Analis terkait yang dapat mengubah status', 'error');
     return;
  }

  // Validation: if status is 'selesai', check if all required instruments are recorded
  if (status === 'selesai') {
    const reqs = getRequiredInstruments(job.parameter);
    const missing = reqs.filter(inst => inst !== 'Manual' && !checkInstrumentRecorded(job.noSampel, inst));
    if (missing.length > 0) {
      showToast(`Pencatatan belum lengkap! Silakan isi pemakaian: ${missing.join(', ')}`, 'error');
      // Highlight the card or scroll to it? 
      navigateTo('jobdesk');
      return;
    }
  }

  DB.jobdesk[idx].status = status; save('jobdesk');
  addLog('jobdesk', `Tugas "${DB.jobdesk[idx].noSampel}" \u2192 ${status}`);
  showToast(`Status: ${status}`, 'info');
  renderJobdesk(document.getElementById('filterJobdesk').value, document.getElementById('filterStatusJobdesk').value, document.getElementById('filterPrioritasJobdesk').value);
}

document.getElementById('jobdeskForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!isLabTech()) { showToast('Hanya Lab Technologist dapat membuat tugas', 'error'); return; }
  const params = Array.from(document.querySelectorAll('#jdkParamGrid input:checked')).map(c => c.value);
  const pLain = document.getElementById('jdkParamLain').value; if (pLain) params.push(pLain);
  if (params.length === 0) { showToast('Pilih minimal 1 parameter', 'error'); return; }

  const rec = {
    id: uid(), tanggal: document.getElementById('jdkTanggal').value,
    analis: document.getElementById('jdkAnalis').value,
    noSampel: document.getElementById('jdkNoSampel').value,
    parameter: params.join(', '),
    prioritas: document.getElementById('jdkPrioritas').value,
    deadline: document.getElementById('jdkDeadline').value,
    status: document.getElementById('jdkStatus').value,
    catatan: document.getElementById('jdkCatatan').value,
    createdBy: currentUser?.name,
  };
  DB.jobdesk.push(rec); save('jobdesk');
  addLog('jobdesk', `Tugas → ${rec.analis}: ${rec.noSampel}`);

  // Workflow auto-update: if we created a job for a sample, auto change sample status to 'proses_s'
  const matchingSmpIdx = DB.sampel.findIndex(s => s.noSampel === rec.noSampel);
  if (matchingSmpIdx >= 0 && DB.sampel[matchingSmpIdx].status !== 'proses_s') {
    DB.sampel[matchingSmpIdx].status = 'proses_s';
    save('sampel');
    addLog('sampel', `Status Sampel ${rec.noSampel} otomatis berubah menjadi Proses karena ditugaskan.`);
  }

  postToSheet('jobdesk', [rec.id, rec.tanggal, rec.analis, rec.parameter, rec.prioritas, rec.status, rec.catatan, rec.createdBy]);
  showToast('Penugasan disimpan!');
  this.reset();
  document.querySelectorAll('#jdkParamGrid input').forEach(c => c.checked = false);
  document.getElementById('formJobdesk').style.display = 'none';
  renderJobdesk(); renderDashboard();
});

// ============================================================
// MODULE: SAMPEL
// ============================================================
function genNoSampel() {
  sampelCounter++; localStorage.setItem('ld_sampelCounter', sampelCounter);
  const n = new Date(), y = n.getFullYear().toString().slice(-2), m = String(n.getMonth() + 1).padStart(2, '0');
  return `SMP/${y}${m}/${String(sampelCounter).padStart(4, '0')}`;
}
function renderSampel(filter = '', statusF = '') {
  // Stats
  const today = new Date().toISOString().slice(0, 10);
  animNum('statSmpMasuk', DB.sampel.filter(r => r.tanggal && r.tanggal.startsWith(today)).length);
  animNum('statSmpAntrian', DB.sampel.filter(r => r.status === 'antrian' || r.status === 'diterima').length);
  animNum('statSmpSelesai', DB.sampel.filter(r => r.status === 'selesai').length);

  let data = [...DB.sampel].reverse();
  if (filter) data = data.filter(r => (r.noSampel + r.requester + r.jenis).toLowerCase().includes(filter.toLowerCase()));
  if (statusF) data = data.filter(r => r.status === statusF);
  const tbody = document.getElementById('sampelBody');
  tbody.innerHTML = data.length === 0 ? '<tr><td colspan="10" class="empty-row">Belum ada sampel</td></tr>' :
    data.map((r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${san(r.noSampel)}</strong></td>
        <td style="white-space:nowrap">${fmtDT(r.tanggal)}</td>
        <td>${san(r.jenis)}</td>
        <td>${san(r.requester)}${r.telp ? `<br><small>${san(r.telp)}</small>` : ''}</td>
        <td style="text-align:center;font-weight:700;color:${r.suhuMasuk ? 'var(--blue)' : 'var(--text-dim)'}">${r.suhuMasuk ? r.suhuMasuk + '°C' : '—'}</td>
        <td style="max-width:150px;font-size:.72rem">${(r.parameter || []).slice(0, 3).join(', ')}${r.parameter?.length > 3 ? ` +${r.parameter.length - 3}` : ''}</td>
        <td>${san(r.penerima)}</td>
        <td>${smpBadge(r.status)}</td>
        <td class="lt-only-td" style="display:${isLabTech() ? '' : 'none'};white-space:nowrap">
          <button class="btn-icon" title="Tugaskan Analis" style="font-size: 1.1rem; padding: 2px 6px;" onclick="tugaskanAnalis('${r.id}')">👨‍🔬 Tugaskan</button>
          <button class="btn-icon" title="Ubah Status Sampel" onclick="ubahStatusSampel('${r.id}')">🔄 Status</button>
          <button class="btn-icon" onclick="printSlip('${r.id}')" title="Cetak Slip">🖨️</button>
          <button class="btn-danger" onclick="del('sampel','${r.id}')" title="Hapus">🗑️</button>
        </td>
      </tr>`).join('');
}

// LT: Quick status change for samples
function ubahStatusSampel(sampelId) {
  if (!isLabTech()) { showToast('Hanya Lab Technologist yang dapat mengubah status sampel', 'error'); return; }
  const smp = DB.sampel.find(s => s.id === sampelId); if (!smp) return;
  const opts = ['diterima', 'antrian', 'proses_s', 'selesai', 'ditolak'];
  const labels = { diterima: '✅ Diterima', antrian: '⏳ Antrian', proses_s: '⚙️ Proses', selesai: '🏁 Selesai', ditolak: '❌ Ditolak' };
  const choice = prompt(`Status saat ini: ${labels[smp.status] || smp.status}\n\nPilih status baru:\n${opts.map((o,i) => `${i+1}. ${labels[o]}`).join('\n')}\n\nMasukkan angka (1-${opts.length}):`);
  if (!choice) return;
  const idx = parseInt(choice) - 1;
  if (isNaN(idx) || idx < 0 || idx >= opts.length) { showToast('Pilihan tidak valid', 'error'); return; }
  const newStatus = opts[idx];
  const dbIdx = DB.sampel.findIndex(s => s.id === sampelId);
  if (dbIdx < 0) return;
  DB.sampel[dbIdx].status = newStatus; save('sampel');
  addLog('sampel', `Status sampel ${smp.noSampel} diubah ke ${newStatus} oleh ${currentUser?.name}`);
  showToast(`Status ${smp.noSampel} → ${labels[newStatus]}`, 'success');
  renderSampel(); renderDashboard();
}

function tugaskanAnalis(sampelId) {
  const smp = DB.sampel.find(s => s.id === sampelId);
  if (!smp) return;
  // Buka halaman jobdesk
  navigateTo('jobdesk');
  // Isi formnya
  setTimeout(() => {
    const form = document.getElementById('formJobdesk');
    form.style.display = 'block';
    const btnTambah = document.getElementById('btnTambahJobdesk');
    if (btnTambah) btnTambah.style.display = 'none'; // Optional to hide the "+ Buat Penugasan" while form is open
    initD('jdkTanggal');
    
    document.getElementById('jdkNoSampel').value = smp.noSampel;
    
    // Check parameters
    document.querySelectorAll('#jdkParamGrid input').forEach(c => c.checked = false);
    let lain = [];
    (smp.parameter || []).forEach(p => {
       const box = document.querySelector(`#jdkParamGrid input[value="${p}"]`);
       if (box) box.checked = true;
       else lain.push(p);
    });
    document.getElementById('jdkParamLain').value = lain.join(', ');
    
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`Form penugasan dimuat untuk ${smp.noSampel}`, 'info');
  }, 100);
}

document.getElementById('sampelForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const params = Array.from(document.querySelectorAll('#paramGrid input:checked')).map(c => c.value);
  const pLain = document.getElementById('smpParamLain').value; if (pLain) params.push(pLain);
  const rec = {
    id: uid(), noSampel: document.getElementById('smpNoSampel').value,
    tanggal: document.getElementById('smpTanggal').value,
    jenis: document.getElementById('smpJenis').value,
    jumlah: document.getElementById('smpJumlah').value,
    volume: document.getElementById('smpVolume').value,
    suhuMasuk: document.getElementById('smpSuhuMasuk')?.value || '',
    requester: document.getElementById('smpRequester').value,
    telp: document.getElementById('smpTelp').value,
    email: document.getElementById('smpEmail').value,
    alamat: document.getElementById('smpAlamat').value,
    parameter: params,
    kondisiWadah: document.getElementById('smpKondisiWadah').value,
    kondisiSampel: document.getElementById('smpKondisiSampel').value,
    preservasi: document.getElementById('smpPreservasi').value,
    penerima: document.getElementById('smpPenerima').value,
    target: document.getElementById('smpTarget').value,
    status: document.getElementById('smpStatus').value,
    catatan: document.getElementById('smpCatatan').value,
    recordedBy: currentUser?.name,
  };
  DB.sampel.push(rec); save('sampel');
  addLog('sampel', `Sampel ${rec.noSampel} (${rec.jenis}) dari ${rec.requester}`);
  postToSheet('sampel', [rec.noSampel, fmtDT(rec.tanggal), rec.jenis, rec.requester, rec.telp || '-', rec.jumlah, rec.volume || '-', rec.suhuMasuk || '-', params.join('; '), rec.kondisiWadah, rec.preservasi, rec.penerima, rec.status, rec.catatan, rec.recordedBy]);
  showToast(`Sampel ${rec.noSampel} didaftarkan!`);
  this.reset();
  document.querySelectorAll('#paramGrid input').forEach(c => c.checked = false);
  document.getElementById('smpPenerima').value = currentUser?.name || '';
  document.getElementById('formSampel').style.display = 'none';
  renderSampel(); renderDashboard();
  printSlip(rec.id);
});

function printSlip(id) {
  const r = DB.sampel.find(s => s.id === id); if (!r) return;
  const w = window.open('', '', 'width=720,height=900');
  w.document.write(`<!DOCTYPE html><html><head><title>Bukti-${r.noSampel}</title>
  <style>body{font-family:Arial,sans-serif;padding:30px;color:#000;}h2{color:#D0021B;}table{width:100%;border-collapse:collapse;}td{padding:6px 8px;font-size:13px;}td:first-child{color:#555;width:40%;}hr{border:1px solid #D0021B;}.sig{display:flex;justify-content:space-around;margin-top:40px;}.sigline{border-top:1px solid #000;width:150px;margin:50px auto 5px;font-size:11px;text-align:center;}</style>
  </head><body>
  <h2>⚗️ LABORATORIUM R&D</h2><p style="font-size:12px;color:#666;">Bukti Penerimaan Sampel</p><hr>
  <table>
    <tr><td>No. Sampel</td><td><strong>${r.noSampel}</strong></td></tr>
    <tr><td>Tanggal</td><td>${fmtDT(r.tanggal)}</td></tr>
    <tr><td>Jenis Sampel</td><td>${r.jenis}</td></tr>
    <tr><td>Requester</td><td>${r.requester}</td></tr>
    <tr><td>Telepon</td><td>${r.telp || '-'}</td></tr>
    <tr><td>Jumlah</td><td>${r.jumlah} kemasan${r.volume ? ' / ' + r.volume : ''}</td></tr>
    <tr><td>Parameter</td><td>${(r.parameter || []).join('; ') || '-'}</td></tr>
    <tr><td>Kondisi Wadah</td><td>${r.kondisiWadah}</td></tr>
    <tr><td>Preservasi</td><td>${r.preservasi}</td></tr>
    <tr><td>Target Selesai</td><td>${r.target ? fmtD(r.target) : '-'}</td></tr>
    <tr><td>Status</td><td><strong>${r.status.toUpperCase()}</strong></td></tr>
    <tr><td>Petugas Penerima</td><td>${r.penerima}</td></tr>
  </table>
  <div class="sig"><div class="sigbox"><div class="sigline">Requester</div></div><div class="sigbox"><div class="sigline">Petugas Penerima</div></div></div>
  <p style="font-size:10px;color:#999;text-align:center;margin-top:20px">Dicetak: ${new Date().toLocaleString('id-ID')} — LabDigital v3</p>
  </body></html>`);
  w.document.close(); setTimeout(() => { w.print(); w.close(); }, 400);
}

// ============================================================
// DELETE / LOG / EXPORT
// ============================================================
function del(module, id) {
  if (!isLabTech()) { showToast('Hanya Lab Technologist yang dapat menghapus', 'error'); return; }
  if (!confirm('Yakin hapus data ini?')) return;
  DB[module] = DB[module].filter(r => r.id !== id); save(module);
  addLog(module, `Data dihapus (ID:...${id.slice(-6)})`);
  showToast('Data dihapus', 'info');
  if (module === 'instrumen') renderInstrumen();
  if (module === 'suhu') renderSuhu();
  if (module === 'jobdesk') renderJobdesk();
  if (module === 'sampel') renderSampel();
  renderDashboard();
}
function renderLog() {
  const c = document.getElementById('activityLog'); if (!c) return;
  const fmod = document.getElementById('filterModulRiwayat')?.value || 'all';
  let data = [...DB.log]; if (fmod !== 'all') data = data.filter(l => l.module === fmod);
  const icons = { instrumen: '🔬', suhu: '🌡️', jobdesk: '📋', sampel: '🧪' };
  c.innerHTML = data.length === 0 ? '<p class="empty-msg" style="padding:2rem;">Belum ada aktivitas.</p>' :
    data.map(l => `<div class="activity-item"><div class="activity-dot dot-${l.module}">${icons[l.module] || '📌'}</div><div><div class="activity-text">${san(l.text)}</div><div class="activity-time">${fmtDT(l.ts)}${l.user ? ' — ' + san(l.user) : ''}</div></div></div>`).join('');
}
function renderAll() { renderDashboard(); renderInstrumen(); renderSuhu(); renderJobdesk(); renderSampel(); renderLog(); renderCatalog(); }

// ============================================================
// FORM TOGGLES
// ============================================================
function setupForm(btnId, formId, closeId, cancelId, initFn) {
  const btn = document.getElementById(btnId), form = document.getElementById(formId),
    cls = document.getElementById(closeId), can = cancelId ? document.getElementById(cancelId) : null;
  if (btn) btn.addEventListener('click', () => { form.style.display = 'block'; if (initFn) initFn(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  if (cls) cls.addEventListener('click', () => form.style.display = 'none');
  if (can) can.addEventListener('click', () => form.style.display = 'none');
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  updateClock(); setInterval(updateClock, 1000);
  populateInstrumenSelect();
  populateRoomSelect();
  populateParamGrid();

  // Login
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const user = USERS.find(u => u.nik === document.getElementById('loginNIK').value.trim() && u.password === document.getElementById('loginPass').value.trim());
    if (user) { applySession(user); }
    else { document.getElementById('loginError').textContent = '❌ NIK atau password salah.'; }
  });
  document.getElementById('passToggle').addEventListener('click', function () {
    const inp = document.getElementById('loginPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    this.textContent = inp.type === 'password' ? '👁' : '🙈';
  });
  document.getElementById('btnLogout').addEventListener('click', () => { if (confirm('Keluar dari LabDigital?')) doLogout(); });

  // Nav
  document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', e => { e.preventDefault(); navigateTo(item.dataset.page); if (window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open'); }));
  document.querySelectorAll('.btn-link[data-page]').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.page)));
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const app = document.getElementById('mainApp');
    if (window.innerWidth <= 900) {
      sb.classList.toggle('open');
      app.classList.toggle('sidebar-active', sb.classList.contains('open'));
    } else {
      sb.classList.toggle('collapsed');
      app.classList.toggle('sidebar-collapsed', sb.classList.contains('collapsed'));
    }
  });

  // Forms
  // Form setup — use main-content scroll
  function openForm(formId, initFn) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.style.display = 'block';
    if (initFn) initFn();
    const mc = document.querySelector('.main-content');
    if (mc) { setTimeout(() => { const rect = form.getBoundingClientRect(); const mcRect = mc.getBoundingClientRect(); mc.scrollTop += rect.top - mcRect.top - 60; }, 50); }
  }
  function closeForm(formId) { const f = document.getElementById(formId); if (f) f.style.display = 'none'; }

  function setupFormV2(btnId, formId, closeId, cancelId, initFn) {
    const btn = document.getElementById(btnId);
    const cls = document.getElementById(closeId);
    const can = cancelId ? document.getElementById(cancelId) : null;
    if (btn) btn.addEventListener('click', () => openForm(formId, initFn));
    if (cls) cls.addEventListener('click', () => closeForm(formId));
    if (can) can.addEventListener('click', () => closeForm(formId));
  }

  setupFormV2('btnTambahInstrumen', 'formInstrumen', 'closeFormInstrumen', 'cancelInstrumen', () => { initDT('instrWaktuMulai'); document.getElementById('instrAnalis').value = currentUser?.name || ''; document.getElementById('unitGroup').style.display = 'none'; });
  setupFormV2('btnTambahSuhu', 'formSuhu', 'closeFormSuhu', 'cancelSuhu', () => { initD('suhuTanggal'); document.getElementById('suhuPetugas').value = currentUser?.name || ''; updateSessionAlert(); const sb = document.getElementById('suhuSpecBox'); if(sb) sb.innerHTML=''; });
  setupFormV2('btnTambahJobdesk', 'formJobdesk', 'closeFormJobdesk', 'cancelJobdesk', () => { initD('jdkTanggal'); });
  setupFormV2('btnTambahSampel', 'formSampel', 'closeFormSampel', 'cancelSampel', () => { initDT('smpTanggal'); document.getElementById('smpNoSampel').value = genNoSampel(); document.getElementById('smpPenerima').value = currentUser?.name || ''; });

  // Also keep card-click from room board opening suhu form
  function setupSuhuFormFromBoard() {
    document.getElementById('page-suhu')?.addEventListener('click', e => {
      if (e.target.matches('.add-reading-btn') && !e.target.disabled) {
        // handled by openSuhuForRoom
      }
    });
  }
  setupSuhuFormFromBoard();

  // Sample counter reset button (LT only)
  document.getElementById('btnResetCounter')?.addEventListener('click', openResetCounterModal);
  document.getElementById('modalResetCounter')?.addEventListener('click', function(e) { if (e.target === this) closeResetCounterModal(); });

  // Filters
  const sf = (inId, selIds, fn) => {
    document.getElementById(inId)?.addEventListener('input', fn);
    selIds.forEach(id => document.getElementById(id)?.addEventListener('change', fn));
  };
  sf('filterInstrumen', ['filterKondisiInstrumen'], () => renderInstrumen(document.getElementById('filterInstrumen').value, document.getElementById('filterKondisiInstrumen').value));
  sf('filterSuhu', ['filterSesiSuhu', 'filterStatusSuhu'], () => renderSuhu(document.getElementById('filterSuhu').value, document.getElementById('filterSesiSuhu').value, document.getElementById('filterStatusSuhu').value));
  sf('filterJobdesk', ['filterStatusJobdesk', 'filterPrioritasJobdesk'], () => renderJobdesk(document.getElementById('filterJobdesk').value, document.getElementById('filterStatusJobdesk').value, document.getElementById('filterPrioritasJobdesk').value));
  sf('filterSampel', ['filterStatusSampel'], () => renderSampel(document.getElementById('filterSampel').value, document.getElementById('filterStatusSampel').value));
  document.getElementById('filterModulRiwayat')?.addEventListener('change', renderLog);

  // Suhu temp value live validation
  document.getElementById('suhuNilai')?.addEventListener('input', function () {
    const room = TEMP_ROOMS.find(r => r.id === document.getElementById('suhuRuangan').value);
    if (!room) return;
    const v = parseFloat(this.value);
    if (isNaN(v)) return;
    const ok = v >= room.tempMin && v <= room.tempMax;
    this.className = ok ? '' : 'oos-err';
  });

  // Suhu live duplicate check
  document.getElementById('suhuTanggal')?.addEventListener('change', checkSuhuDup);
  document.getElementById('suhuSesi')?.addEventListener('change', checkSuhuDup);
  document.getElementById('suhuRuangan')?.addEventListener('change', checkSuhuDup);

  // Topbar dropdown
  const topbarUser = document.getElementById('topbarUser');
  const topbarDropdown = document.getElementById('topbarDropdown');
  if (topbarUser && topbarDropdown) {
    topbarUser.addEventListener('click', e => {
      e.stopPropagation();
      topbarDropdown.style.display = topbarDropdown.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => { if (topbarDropdown) topbarDropdown.style.display = 'none'; });
  }

  // Sync to Sheets
  document.getElementById('btnSync')?.addEventListener('click', async function () {
    if (!SHEETS_URL) {
      showToast('SHEETS_URL belum diatur di app.js!', 'error');
      return;
    }
    const btn = this;
    const origText = btn.innerHTML;
    btn.innerHTML = '🔄 Syncing...';
    btn.disabled = true;
    try {
      let count = 0;
      for (const rec of DB.suhu) {
        await postToSheet('suhu', [rec.id, rec.tanggal, rec.sesi, rec.ruangan, rec.suhu, rec.kelembaban || '-', rec.statusCalc, rec.petugas, rec.tindakan || '-', rec.recordedBy]);
        count++;
      }
      for (const rec of DB.instrumen) {
        await postToSheet('instrumen', [rec.id, fmtDT(rec.waktuMulai), rec.instrumenNama, rec.unit || '-', rec.noSeri, rec.analis, fmtDT(rec.waktuSelesai) || '-', rec.tujuan, rec.kondisiAkhir, rec.catatan, rec.recordedBy]);
        count++;
      }
      for (const rec of DB.jobdesk) {
        await postToSheet('jobdesk', [rec.id, rec.tanggal, rec.analis, rec.parameter, rec.prioritas, rec.status, rec.catatan, rec.createdBy]);
        count++;
      }
      for (const rec of DB.sampel) {
        await postToSheet('sampel', [rec.noSampel, fmtDT(rec.tanggal), rec.jenis, rec.requester, rec.telp || '-', rec.jumlah, rec.volume || '-', Array.isArray(rec.parameter) ? rec.parameter.join('; ') : rec.parameter, rec.kondisiWadah, rec.preservasi, rec.penerima, rec.status, rec.catatan, rec.recordedBy]);
        count++;
      }
      showToast(`Sukses sync ${count} data ke Sheets!`, 'success');
    } catch (e) {
      showToast('Gagal sinkronisasi data', 'error');
    }
    btn.innerHTML = origText;
    btn.disabled = false;
  });

  // Export
  document.getElementById('btnExport')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ instrumen: DB.instrumen, suhu: DB.suhu, jobdesk: DB.jobdesk, sampel: DB.sampel, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `LabDigital_v3_${new Date().toISOString().slice(0, 10)}.json`; a.click();
    showToast('Data diekspor!');
  });

  // Session restore
  const saved = sessionStorage.getItem('ld_session');
  if (saved) { try { const u = JSON.parse(saved); if (USERS.find(x => x.nik === u.nik)) applySession(u); } catch { sessionStorage.removeItem('ld_session'); } }
});

