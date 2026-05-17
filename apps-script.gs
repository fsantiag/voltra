// appsscript.json oauthScopes:
// ["https://www.googleapis.com/auth/spreadsheets"]

// Voltra — Google Apps Script form handler
//
// SETUP:
//   1. Open Google Sheets, create a new spreadsheet
//   2. Extensions > Apps Script — paste this file
//   3. Deploy > New deployment > Web App
//      Execute as: Me
//      Who has access: Anyone
//   4. Copy the web app URL
//   5. In index.html, set SCRIPT_URL to that URL

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('1fcOpeFd4Zem2_3A9xAk44xqPZCpmM0FfatWvhDHowRc').getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data', 'Nome', 'Email', 'Telefone', 'Tipo de Espaço', 'Mensagem']);
    }

    sheet.appendRow([
      new Date(),
      e.parameter.nome      || '',
      e.parameter.email     || '',
      e.parameter.telefone  || '',
      e.parameter.tipo      || '',
      e.parameter.mensagem  || '',
    ]);
  } catch (sheetErr) {
    console.error('Sheet write failed: ' + sheetErr.message);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: sheetErr.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
