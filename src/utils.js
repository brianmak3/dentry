const { google } = require('googleapis'),
    TOKEN_PATH = 'src/keys.json',
    auth = new google.auth.GoogleAuth({
        keyFile: TOKEN_PATH,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    }),
    spreadsheetId = "1SMrpeJC2isCTJotRYXBDNENNbDVzCcazonOOwUQ-Vf0",
    manipulateSheet = (action, data) => new Promise(async (resolve, reject) => {
        let authClientObject = await auth.getClient(),
            googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject })
        if (action === 'get') {
            let readData = await googleSheetsInstance.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: "Sheet1!A:E",
            })
            resolve(readData.data.values)
        }
        else if (action === 'create') {
            let updateData = await googleSheetsInstance.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!A:E",
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [data],
                },
                includeValuesInResponse:true
            })
            resolve(updateData)
        }
    })

module.exports = {
    manipulateSheet
}