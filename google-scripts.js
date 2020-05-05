/**
 * Add menu items to sheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('External Functions');
  const getData = menu.addItem('Get updated data', 'checkDataAndUpdateSheet');
  const deploySite = menu.addItem('Deploy site', 'triggerNetlifyBuild');
  getData.addToUi();
  deploySite.addToUi();
}

/**
 * Trigger webhook to build and deploy site at Netlify
 */
function triggerNetlifyBuild() {
  const url = '(webhook url from netlify)';
  UrlFetchApp.fetch(url, { method: 'post' });
}

/**
 * Main function: Checks if remote table contains new data and triggers an update, if so
 */
function checkDataAndUpdateSheet() {
  const rowLabelsPattern = /Total Positives|Hospitalizations|Intensive Care|Deaths/;
  const tableXml = _fetchTableFromSite();
  const tableRows = tableXml.getChild('tbody').getChildren();
  const tableUpdatedDateRow = tableRows.filter(
    row => row.getChildren('td').length == 1
  )[0];
  const tableDataRows = tableRows.filter(
    row => row.getChild('td').getValue().match(rowLabelsPattern) != null
  );
  const currentDateFromSite = _extractDateFromTable(tableUpdatedDateRow);
  const lastUpdateDateOnSheet = _getLastDateFromSheet();

  if (
    currentDateFromSite.toDateString() != lastUpdateDateOnSheet.toDateString()
  ) {
    const newDataRow = _formatDataForSheet(currentDateFromSite, tableDataRows);
    _addNewDataRowToSpreadsheet(newDataRow);
  } else {
    console.log('No new data');
  }
}

/**
 * Adds new row of data to sheet
 *
 * @param {array} dataRow The array that will create the new row of data [date, int, int, int, int]
 */
function _addNewDataRowToSpreadsheet(dataRow) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.setActiveSheet(sheet.getSheetByName('RawData'));
  sheet.appendRow(dataRow);
}

/**
 * Extracts the latest update date from the table row
 *
 * @param {xml element} tableRow The <tr> from the data table that contains the updated string
 * @return {date} The extracted date from the table (ie: 'March 20, 2020') as a javascript date object
 */
function _extractDateFromTable(tableRow) {
  // String format from table: "Table updated March 20, 2020"
  // This regex finds the string format and groups the matches
  const stringPattern = /(Table updated )(\S* \d{1,2}, \d{4})/;
  // The incoming row only has one <td> element (currently),
  // so we can find the first <td> and snag the value
  const cellValue = tableRow.getChild('td').getValue();
  // Match on the regex and get the 2nd matched group
  const dateString = cellValue.match(stringPattern)[2];

  // Parse the string and create a new date object to return
  return new Date(Date.parse(dateString));
}

/**
 * Gets the currently published table
 *
 * After getting the string of the current site, regex extracts only the table element
 * Then the table string is converted into XML
 *
 * @return {xml element} The table from the live site structred as XML
 */
function _fetchTableFromSite() {
  const url =
    'https://www.sandiegocounty.gov/content/sdc/hhsa/programs/phs/community_epidemiology/dc/2019-nCoV/status.html';
  const responseString = UrlFetchApp.fetch(url)
    .getContentText()
    .match(/<table[\s\S]*\/table>/)[0];

  return XmlService.parse(responseString).getRootElement();
}

/**
 * Formats array of new data to insert into sheet
 *
 * @param {date} newDate Date to be placed in first column of new row
 * @param {xml elements[]} dataRows Array of <tr>s that contain data points to extract
 * @return {array} Array of new data [date, int, int, int, int]
 */
function _formatDataForSheet(newDate, dataRows) {
  let newDataRow = [newDate];
  // Loop over rows and push new data into array
  // Currently, the order of the <tr>s is stable (cases, hosp, icu, deaths),
  // so we can lean on the order being predictable
  dataRows.forEach(row => {
    // Data is currently in the 2nd <td> and returns as a string
    // After getting the value, remove any commas in the number and conver to int to insert in array
    const dataPoint = row.getChildren('td')[1].getValue().replace(/,/, '');
    newDataRow.push(parseInt(dataPoint));
  });

  return newDataRow;
}

/**
 * Looks up and returns the latest date recorded on the sheet
 * Assumes date is stored in column 1
 *
 * @return {date} The date in column 1 on the final row of the sheet
 */
function _getLastDateFromSheet() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet = sheet.setActiveSheet(sheet.getSheetByName('RawData'));
  const lastRow = sheet.getLastRow();

  return sheet.getRange(lastRow, 1).getValue();
}
