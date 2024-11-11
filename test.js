const { google } = require("googleapis");
const path = require("path");

const SERVICE_ACCOUNT_FILE = "numeric-marker-439206-p6-1a4f5412bbb1.json";

const SPREADSHEET_ID = "1Ibe0z-SY32B5hRl9d8ujZn4dG1v6mu-KRgh6cpFSz5c";
const RANGE_NAME = "Sheet1!A1:D10";

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

async function accessSpreadsheet() {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_NAME,
    });

    const rows = res.data.values;
    if (rows && rows.length) {
      console.log("Data from spreadsheet:");
      rows.forEach((row) => {
        console.log(row.join(", "));
      });
    } else {
      console.log("No data found.");
    }
  } catch (error) {
    console.error("Error accessing spreadsheet:", error);
  }
}

accessSpreadsheet();
