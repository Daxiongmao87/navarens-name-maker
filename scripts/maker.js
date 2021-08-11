function parseDictionary(dictInput, delim) {
  return dictInput.split(delim).map(function(e){return e.trim();});
}

function processDictionary(dict, maxPrefixDepth) {
  data = [];
  for(i = 0; i < dict.length; i++) {
    for(j = 0; j < dict[i].length; j++) {
      k = j+maxPrefixDepth;
      if(k <= dict[i].length) {
        data.push(dict[i].substring(j,k));
      }
      else {
        data.push(dict[i].substring(j,dict[i].length));
      }
    }
  }
  return data;
}

function getMaxLength(dict) {
  length = 0;
  for(i = 0; i < dict.length; i++) {
    if(dict[i].length > length) length = dict[i].length;
  }
 return length;
}

function submitMaker(html,data,app) {
  makerName = html.closest('.window-app').find('#name-maker-name').val();
  dictInput = html.closest('.window-app').find('#name-maker-dictionary').val();
  delim = html.closest('.window-app').find('#name-maker-delimiter').val();
  prefixDepth = html.closest('.window-app').find('#name-maker-relation-depth').val();
  minLength = html.closest('.window-app').find('#name-maker-length-range-min').val();
  maxLength = html.closest('.window-app').find('#name-maker-length-range-max').val();
  if(!makerName || !dictInput || !delim || !minLength || !maxLength || !prefixDepth) {
    alert("Please fill out all fields.");
  }
  else {
    dict = parseDictionary(dictInput, delim);
    maxPrefixDepth = getMaxLength(dict);
    dictData = processDictionary(dict, maxPrefixDepth);
    saveData = {
      makerName: makerName,
      dict: dict,
      maxPrefixDepth: maxPrefixDepth,
      prefixDepth: prefixDepth,
      minLength: minLength,
      maxLength: maxLength,
      delim: delim,
      data: dictData,
    };
    nameData = Object.entries(NameData.getMakersForUser(game.userId));
    existingNameDataId = "";
    console.log(data);
    if(data.id != undefined) {
      id = data.id;
      console.log(id, saveData, app);
      for (i = 0; i < nameData.length; i++) {
        savedData = nameData[i][1];
        if(id == savedData.id) {
          existingNameDataId = data;
          break;
        }
      }
      if(existingNameDataId != undefined) {
        console.log("Exists. Updating");
        console.log(id, saveData, app);
        NameData.updateMaker(id, saveData, app);
      }
    }
    else {
      NameData.createMaker(game.userId, saveData, app);
    }
  }
}

function makeName(nameData, tries) {
  if(tries == 0) return "Not Enough Data";
  data = nameData.data;
  dict = nameData.dict;
  if(dict.length == 0) return;
  minLength = nameData.minLength;
  maxLength = nameData.maxLength;
  rangeDiff = maxLength - minLength;
  length = parseInt(minLength) + Math.floor(Math.random()*(parseInt(rangeDiff)+1));
  prefixDepth = nameData.prefixDepth;
  resultString = "";
  sampledSubstring = "";
  dict = dict;
  data = data;
  minLength = prefixDepth;
  for(i = 0; i < length; i++) {
    resultSubstring = "";
    if(i == 0) {
      eligibleData = dict.filter(function(item) {
        if (item.length >= minLength) return item;
      });
      sampledSubstring = eligibleData[Math.floor(Math.random() * eligibleData.length)].substring(0,prefixDepth);
      resultSubstring = sampledSubstring;
      i = sampledSubstring.length-1;
    }
    else if(i == length-1) {
      eligibleData = data.filter(function(item) {
        sampleIndStart = sampledSubstring.length-prefixDepth+1;
        sampleIndEnd = sampledSubstring.length;
        lastIndStart = parseInt(item.length)-parseInt(prefixDepth);
        lastIndEnd = item.length-1;
        compareA = item.substring(lastIndStart,lastIndEnd).toLowerCase();
        compareB = sampledSubstring.substring(sampleIndStart,sampleIndEnd).toLowerCase();
        if (item.length >= minLength && compareA == compareB) {
          return item;
        }
      });
      selectedData = eligibleData[Math.floor(Math.random() * eligibleData.length)]
        if(selectedData != undefined) {
        resultSubstring = selectedData.substring(selectedData.length-1,selectedData.length);
      }
    }
    else {
      eligibleData = data.filter(function(item) {
        sampleIndStart = sampledSubstring.length-prefixDepth+1
        sampleIndEnd = sampledSubstring.length
        compareA = item.substring(0,prefixDepth-1).toLowerCase();
        compareB = sampledSubstring.substring(sampleIndStart,sampleIndEnd).toLowerCase();
        if (item.length >= minLength && compareA == compareB) {
          return item;
        }
      });
      if(eligibleData.length == 0) {
        tries = parseInt(tries) - 1
        return makeName(nameData, tries);
      }
      subStrStopPos = (prefixDepth);
      selectedData = eligibleData[Math.floor(Math.random() * eligibleData.length)]
      sampleIndStart = 0
      sampleIndEnd = prefixDepth;
      sampledSubstring = selectedData.substring(sampleIndStart,sampleIndEnd);
      resultSubstring = sampledSubstring.substring(prefixDepth-1,prefixDepth);
    }
    resultString = resultString + resultSubstring;
  }
  return resultString;
}
