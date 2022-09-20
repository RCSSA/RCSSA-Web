/*
Google App Script code for the Merch Google Form
*/
var rowIndex = {'均码': 2, 'S': 3, 'M':4, 'L': 5, 'XL': 6, 'XXL': 7, 'sum': 8};
var colIndex = {'鹤 - hoodie': 1, '和 - sweatshirt': 2, '内卷 - bag': 3, '摸鱼 - bag': 4};
var merches = ['鹤 - hoodie', '和 - sweatshirt', '内卷 - bag', '摸鱼 - bag'];
var pages = {'hoodie': 2, 'sweatShirt': 4, 'quantity': 6} //idexes that mapped to pages

function updateForm()
{
  setMerchChoices();
}


function setMerchChoices() {
  var form = FormApp.getActiveForm();
  var items = form.getItems(); 
  //var choices = items[1].asMultipleChoiceItem().getChoices();
  let availMultiChoices = getAvailMerchValues();
  let arr = [];
  for (m of availMultiChoices){
    let page = getPage(pages['hoodie']);
    if (m === merches[0]){
      setSizeChoices(merches[0]);
      page = getPage(pages['hoodie']);
    }
    else if (m === merches[1]){
      setSizeChoices(merches[1]);
      page = getPage(pages['sweatShirt']);
    }
    else{
      page = getPage(pages['quantity']);
    }
    arr.push(items[1].asMultipleChoiceItem().createChoice(m, page))
  }
  items[1].asMultipleChoiceItem().setChoices(arr);
  
}

// return bool that shows whether inquired size is available
function isAvailable(col, row){
  let ss= SpreadsheetApp.openById('1GMZFBGNLYe9sRhrvoC2Qn2EZbhxhlmTZwVtf405y0KY');
  let stockSheet = ss.getSheetByName('Stock');
  let data = stockSheet.getDataRange().getValues();
  if (data[col][row] == 0){
    return false;
  }
  return true;
}

// param: id
// 2 -> hoodie page, 4 -> sweatShirt page, 6 -> quantity page
function getPage(id){
  var form = FormApp.getActiveForm();
  var items = form.getItems(); 
  return items[id].asPageBreakItem();
}

// set available sizes for '鹤 - hoodie' and '和 - sweatshirt'
function setSizeChoices(merch) {
  var form = FormApp.getActiveForm();
  let allSizes = ['均码', 'S', 'M', 'L', 'XL', 'XXL'];
  let itemsMap = {'鹤 - hoodie': 3, '和 - sweatshirt': 5}
  var hoodie = form.getItems()[itemsMap[merch]].asMultipleChoiceItem();
  let availSizes = [];
  for (size of allSizes){
    let isAvail = isAvailable(rowIndex[size], colIndex[merch]);
    //Logger.log(isAvail);
    if(isAvail){
      availSizes.push(hoodie.createChoice(size));
    }
  }
  hoodie.setChoices(availSizes);
}

// return available merch values
function getAvailMerchValues() {
  var ss= SpreadsheetApp.openById('1GMZFBGNLYe9sRhrvoC2Qn2EZbhxhlmTZwVtf405y0KY');
  var stockSheet = ss.getSheetByName('Stock');
  var data = stockSheet.getDataRange().getValues();
  //debugger;
  var choices = [];
  for(let i=1; i< data[8].length; i++){
    if(data[8][i]){
      choices.push(data[1][i])
    }
  }
  return choices;
}