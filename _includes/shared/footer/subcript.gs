var wbook = SpreadsheetApp.openById(
  "1lEtNFeTlXL4u5ZBpAFAGQRmPBdR_t8y3T2U-IJkpS90"
);
var sheet = wbook.getSheetByName("Sheet1");

function doPost(e) {
  var action = e.parameter.action;
  if (action == "addUser") return addUser(e);
  return ContentService.createTextOutput(
    "Unknown action: " + action
  ).setMimeType(ContentService.MimeType.TEXT);
}

function addUser(e) {
  var user = JSON.parse(e.postData.contents);
  console.log(user);
  sheet.appendRow([user.email, user.name]);

  return ContentService.createTextOutput("Success").setMimeType(
    ContentService.MimeType.TEXT
  );
}
