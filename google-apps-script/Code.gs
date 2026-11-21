/**
 * Collection By Hareem - Google Sheets Backend (Apps Script)
 * Columns in Row 1 of your sheet named "Products":
 * id | name | category | price | featured | badge | material | care | description | image
 */

const SHEET_NAME = "Products";

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "id", "name", "category", "price", "featured",
      "badge", "material", "care", "description", "image"
    ]);
  }
  return sheet;
}

function doGet(e) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const products = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[0]) continue;
    const item = {};
    headers.forEach((h, idx) => {
      item[h] = row[idx];
    });
    products.push(item);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success", products: products }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = getSheet();
  const body = JSON.parse(e.postData.contents);
  const action = body.action;

  if (action === "addProduct") {
    const p = body.product;
    sheet.appendRow([
      p.id, p.name, p.category, p.price, p.featured,
      p.badge, p.material, p.care, p.description, p.image
    ]);
    return jsonResponse({ status: "added" });
  }

  if (action === "updateProduct") {
    const p = body.product;
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(p.id)) {
        sheet.getRange(i + 1, 1, 1, 10).setValues([[
          p.id, p.name, p.category, p.price, p.featured,
          p.badge, p.material, p.care, p.description, p.image
        ]]);
        return jsonResponse({ status: "updated" });
      }
    }
  }

  if (action === "deleteProduct") {
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(body.id)) {
        sheet.deleteRow(i + 1);
        return jsonResponse({ status: "deleted" });
      }
    }
  }

  return jsonResponse({ status: "no_action" });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
