// Example of Google Script,
// You can host your gscript on your account
// If limits on my account is expired
// API:
// Body: TransitedRequest
// POST https://script.google.com/macros/s/AKfycbyqQy1QZK3zafaETAegLUDx1KbCgcQuphyu-UAQUI2uDyeqQKWI/exec


// type SupportedLanguage
//
// interface TransitedRequest {
//   fromLang: SupportedLanguage,
//   toLang: SupportedLanguage[],
//
//   data: object --> example { 'keyOne': 'text', 'keyTwo': ['keyIn': 'text']}
// }
//
// interface TransitedResponse {
//  translates: TransitedItem[]
// }
// interface TransitedItem {
//   lang: string,
//   data: object
// }
function doPost(e) {
  const output = translite(e.postData.contents);
  const JSONString = JSON.stringify(output);
  const JSONOutput = ContentService.createTextOutput(JSONString);
  JSONOutput.setMimeType(ContentService.MimeType.JSON);
  return JSONOutput;
}

function example() {
  const request = {
    "fromLang" : "",
    "toLang" : ["ru"],
    "data": {
      "Translate your JSON file": "Translate your JSON file",
      "Select input json language:": "Select input json language:",
      "Select output json language:": "Select output json language:",
      "Send": "Send",
      "Download": "Download"
    }
  }

  Logger.log(JSON.stringify(translite(request)));
}

function translite(req){
  const {fromLang, toLang, data} = JSON.parse(req);
  const output = {
    translates: []
  };

  for(let i=0; i<toLang.length; ++i) {
    const translite = transliteJson(data, fromLang, toLang[i]);
    output.translates.push({
      lang: toLang[i],
      data: translite
    })
  }

  return output
}

function isLower(character) {
    return character === character.toLowerCase()
}

function isUpper(character) {
    return character === character.toUpperCase()
}

function fixCase(before, after) {
    if (isLower(before[0])) {
       after = after[0].toLowerCase() + after.slice(1)
    } else if(isUpper(before[0])){
        after = after[0].toUpperCase() + after.slice(1)
    }
    return after;
}

function transliteJson(json, fromLang, toLang) {
  const outJson = {};
  for(let key in json) {
    if(typeof json[key] === 'string') {
    outJson[key] = LanguageApp.translate(json[key], fromLang, toLang);
    outJson[key] = fixCase(json[key], outJson[key])
    } else if(typeof json[key] === 'object') {
      outJson[key] = transliteJson(json[key], fromLang, toLang);
    } else {
      outJson[key] = json[key]
    }
  }
  return outJson;
}
