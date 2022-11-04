const CONTACT_US_SHEET_ID = "1mbSMm8YKz7PdujLwjVsyNY8hWCtbx0p9JRhC1fkpdLg";

/*
  Enter one or more email address(es) below to receive daily notifications
  For multiple recipient emails, simply separate them with comma , i.e. "abc@gmail.com, abc@rice.edu, ..."
*/
const RECEIVER_EMAIL_ADDRESS = "redffish2@gmail.com, jh166@rice.edu, ";

/*
  Instead of modifying an existing trigger, setUpTrigger() will set up a NEW time trigger every time when `Run` is clicked !
  Be sure to check `Triggers`(clock icon) on the left panel to see if there are existing triggers. If so, delete all triggers and click `Run` to run setUpTrigger() again. Otherwise, sendDailyEmail() will be called multiple times per day. 

  Alternatively, you can also use `Triggers` UI (clock icon) on the left panel to create/modify triggers directly

  Reference: https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually
*/
function setUpTrigger() {
  ScriptApp.newTrigger("sendDailyEmail")
    .timeBased()
    .atHour(23)
    .everyDays(1)
    .inTimezone("America/Chicago")
    .create();
}

function sendDailyEmail() {
  let unreadMessages = getUnreadMessages();
  if (unreadMessages.length === 0) {
    return;
  }

  let emailText = getEmailText(unreadMessages);
  let emailHtml = getEmailHtml(unreadMessages);

  // Reference: https://developers.google.com/apps-script/reference/gmail/gmail-app#advanced-parameters_1
  GmailApp.sendEmail(
    RECEIVER_EMAIL_ADDRESS,
    "[RCSSA] Daily Digest - Contact Us - " + new Date().toLocaleDateString(),
    emailText,
    { htmlBody: emailHtml }  // devices capable of rendering HTML will use it instead of the required body argument (emailText)
  );
}

function getUnreadMessages() {
  let sheet = SpreadsheetApp.openById(CONTACT_US_SHEET_ID).getActiveSheet();
  let table = sheet.getDataRange().getValues();
  let headers = table.shift();

  let messages = [];

  // read each row into json object for easier processing
  table.forEach((row) => {
    let message = {};
    message.name = row[0];
    message.email = row[1];
    message.body = row[2];
    message.status = row[3];
    messages.push(message);
  });

  let unread = messages.filter((m) => m.status !== 1);
  return unread;
}

function getEmailText(messages) {
  let emailText = "";
  emailText += `Hi there!

Here are today's ${messages.length} unread messages sent via RCSSA website. Please mark status to 1 in 'Contact Us' sheet below to avoid duplicate email notifications. 
https://docs.google.com/spreadsheets/d/1mbSMm8YKz7PdujLwjVsyNY8hWCtbx0p9JRhC1fkpdLg

--------------------------------------------------

`;

  messages.forEach((message) => {
    emailText += `Name: ${message.name}
Email: ${message.email}
Message: 

${message.body}

--------------------------------------------------

`;
  });
  return emailText;
}

// Reference: https://developers.google.com/apps-script/guides/html/templates#calling_apps_script_functions_from_a_template
function getEmailHtml(messages) {
  let htmlTemplate = HtmlService.createTemplateFromFile("contact-us-templated-email.html");
  htmlTemplate.data = messages;
  let emailHtml = htmlTemplate.evaluate().getContent();
  return emailHtml;
}