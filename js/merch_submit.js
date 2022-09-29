let sizeMap = {'鹤 - hoodie': "B", '和 - sweatshirt': "C", '内卷 - bag': "D3", '摸鱼 - bag': "E3", '均码': "3", 'S': "4", 'M': "5", 'L': "6", 'XL': '7', 'XXL': "8"};

function onFormSubmit(e) {
  var values = e.namedValues;
  Logger.log(values);
  receiver = values.netid + '@rice.edu'
  Logger.log(receiver);
  name = values['请选择您想购买的商品']
  size = values["请选择您的尺码"]
  quant = values["请选择购买数量"]
  MailApp.sendEmail({
    to: receiver,
    // multi line string!
    subject: `RCSSA: 商品预订成功`,
    name: "RCSSA",
    body:
        `客官你好！
     以下是您所预订商品的信息：
      商品： ${name}
      尺码: ${size}
      数量：${quant}
    
    祝你用的开心！

    RCSSA全体成员
    `
  });
}

function quantHandler(e) {
  var values = e.namedValues;
  let name = values['请选择您想购买的商品'];
  let size_hoodie = values["请选择您的尺码 - 鹤 - hoodie"];
  let size_shirt = values["请选择您的尺码 - 和 - sweatshirt"];
  let quant = values["请选择购买数量"];
  let targetRange = '';
  let numOrdered = 0
  let rowIndex = {'均码': 2, 'S': 3, 'M':4, 'L': 5, 'XL': 6, 'XXL': 7};
  let colIndex = {'鹤 - hoodie': 1, '和 - sweatshirt': 2, '内卷 - bag': 3, '摸鱼 - bag': 4};
  let curStockNum = 0;

  var ss= SpreadsheetApp.openById('1GMZFBGNLYe9sRhrvoC2Qn2EZbhxhlmTZwVtf405y0KY');
  var stockSheet = ss.getSheetByName('Stock');
  var stockData = stockSheet.getDataRange().getValues();
  if (name == '鹤 - hoodie'){
    targetRange = sizeMap[name] + sizeMap[size_hoodie];

    curStockNum = parseInt(stockData[rowIndex[size_hoodie]][colIndex[name]]);
  }
  else if (name == '和 - sweatshirt'){
    targetRange = sizeMap[name] + sizeMap[size_shirt];
    curStockNum = parseInt(stockData[rowIndex[size_shirt]][colIndex[name]]);
  }
  else {
    targetRange = sizeMap[name]
    curStockNum = parseInt(stockData[rowIndex['均码']][colIndex[name]]);
  }
  if (quant !== 'Contact us') {
    numOrdered = parseInt(quant);
    if (curStockNum - numOrdered >= 0){
      //Logger.log(curStockNum);
      //Logger.log(numOrdered);
      let res = curStockNum - numOrdered;
      //Logger.log(res);
      updateSheetWithNewStock(targetRange, res);
    }
    else{
      Logger.log(values["Email Address"][0]);
      //let receiver = values["netid"] + "@rice.edu";
      let receiver = values["Email Address"][0];
      MailApp.sendEmail({
        to: receiver,
        // multi line string!
        subject: `RCSSA: 商品预订失败`,
        name: "RCSSA",
        body:
            `客官你好！
        不好意思，没货了！

        RCSSA全体成员
        `
      });
    }
  }




}

// return available merch values
function getAvailMerchValues() {
  var ss= SpreadsheetApp.openById('1GMZFBGNLYe9sRhrvoC2Qn2EZbhxhlmTZwVtf405y0KY');
  var stockSheet = ss.getSheetByName('Stock');
  var data = stockSheet.getDataRange().getValues();
  return data;
}



function updateSheetWithNewStock(targetRange, val){
  let ss= SpreadsheetApp.openById('1GMZFBGNLYe9sRhrvoC2Qn2EZbhxhlmTZwVtf405y0KY');
  let stockSheet = ss.getSheetByName('Stock');
  let targetCell = stockSheet.getRange(targetRange);
  targetCell.setValue(val);
}