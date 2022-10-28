var wbook = SpreadsheetApp.openByUrl(
  "https://docs.google.com/spreadsheets/d/1lEtNFeTlXL4u5ZBpAFAGQRmPBdR_t8y3T2U-IJkpS90/edit#gid=0"
);
var sheet = wbook.getSheetByName("Sheet1");

// Post a request to the specific link
function doPost(e) {
  var action = e.parameter.action;
  if (action == "addUser") return addUser(e);
}

function addUser(e) {
  var user = JSON.parse(e.postData.contents);
  console.log(user);
  sheet.appendRow([user.email, user.name]);

  return ContentService.createTextOutput("Success").setMimeType(
    ContentService.MimeType.TEXT
  );
}
