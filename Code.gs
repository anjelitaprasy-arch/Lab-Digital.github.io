/**
 * LabDigital v3 — Google Apps Script
 * Deploy as Web App (Execute as Me, Anyone can access)
 * 
 * SPREADSHEET: https://docs.google.com/spreadsheets/d/1kAkdMV_Z36lZCouHy6CLVq-0RsWvjVgFCAlOr_xAL98
 * 
 * HOW TO DEPLOY:
 *  1. Open the spreadsheet → Extensions → Apps Script
 *  2. Paste this entire file → Save
 *  3. Deploy → New Deployment → Web App
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  4. Copy the Web App URL
 *  5. Paste it into app.js at:  const SHEETS_URL = '...your url...'
 * 
 * The script will auto-create sheets with headers on first run.
 */

const SS_ID = '1kAkdMV_Z36lZCouHy6CLVq-0RsWvjVgFCAlOr_xAL98';

const SHEET_HEADERS = {
  instrumen: ['ID','Waktu Mulai','Instrumen','Unit','No. Seri','Analis','Waktu Selesai','Tujuan','Kondisi Akhir','Catatan','Dicatat Oleh'],
  suhu:      ['ID','Tanggal','Sesi','Ruangan','Suhu (°C)','Kelembaban (%)','Status','Petugas','Tindakan','Dicatat Oleh'],
  jobdesk:   ['ID','Tanggal','Analis','Deskripsi Tugas','Prioritas','Status','Catatan','Dibuat Oleh'],
  sampel:    ['No. Sampel','Tanggal','Jenis','Requester','Telepon','Jumlah','Volume','Parameter','Kondisi Wadah','Preservasi','Penerima','Status','Catatan','Dicatat Oleh'],
};

function doPost(e) {
  const cors = ContentService.createTextOutput();
  cors.setMimeType(ContentService.MimeType.JSON);

  try {
    const payload = JSON.parse(e.postData.contents);
    const { module, row } = payload;

    if (!SHEET_HEADERS[module]) {
      cors.setContent(JSON.stringify({ error: 'Unknown module: ' + module }));
      return cors;
    }

    const ss    = SpreadsheetApp.openById(SS_ID);
    const name  = module.charAt(0).toUpperCase() + module.slice(1);
    let   sheet = ss.getSheetByName(name);

    // Auto-create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.appendRow(SHEET_HEADERS[module]);
      const header = sheet.getRange(1, 1, 1, SHEET_HEADERS[module].length);
      header.setBackground('#D0021B').setFontColor('#FFFFFF').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Append the data row + timestamp
    const rowWithTimestamp = [...row, new Date().toLocaleString('id-ID')];
    sheet.appendRow(rowWithTimestamp);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, sheet.getLastColumn());

    cors.setContent(JSON.stringify({ success: true, sheet: name, row: rowWithTimestamp }));
  } catch (err) {
    cors.setContent(JSON.stringify({ error: err.toString() }));
  }
  return cors;
}

// Optional: GET handler to check if the script is running
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'LabDigital Apps Script is running',
    sheets: Object.keys(SHEET_HEADERS),
    timestamp: new Date().toISOString(),
  })).setMimeType(ContentService.MimeType.JSON);
}

// Utility: Initialize all sheets manually (run once from Apps Script editor if needed)
function initSheets() {
  const ss = SpreadsheetApp.openById(SS_ID);
  Object.entries(SHEET_HEADERS).forEach(([mod, headers]) => {
    const name = mod.charAt(0).toUpperCase() + mod.slice(1);
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.appendRow(headers);
      const hdr = sheet.getRange(1, 1, 1, headers.length);
      hdr.setBackground('#D0021B').setFontColor('#FFFFFF').setFontWeight('bold');
      sheet.setFrozenRows(1);
      Logger.log('Created sheet: ' + name);
    } else {
      Logger.log('Sheet already exists: ' + name);
    }
  });
}
