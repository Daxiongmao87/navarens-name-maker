class MakerListWindow extends Application {
  template = "modules/navarens-name-maker/templates/makerList.hbs";
  title = "Navaren's Name Maker";
  getData(options) {
    let nameData = Object.entries(NameData.getMakersForUser(game.userId));  
    return nameData;
  }
}

singleNameData = [];
function generateMakerEntry(nameData) {
  id = nameData.id;
  dictCount = nameData.dict.length;
  prefixDepth = nameData.prefixDepth;
  minLength = nameData.minLength;
  maxLength = nameData.maxLength;
  makerName = nameData.makerName;
  makerDiv = document.createElement('DIV');
  makerDiv.id = 'div-' + id;
  makerDiv.className = 'makerItemContainer';
  makerDiv.style = 'margin:4px;display:table;height:32px;overflow:hidden;width:100%;'
  makerMakeButton = document.createElement('BUTTON');
  makerMakeButton.type = 'button';
  makerMakeButton.id = 'makerMakeButton-' + id;
  makerMakeButton.style = 'width:128px;font-size:16px;font-weight:bold;font-family: "Modesto Condensed", "Palatino Linotype", serif;';
  makerMakeButton.innerHTML = makerName
  infoTextDiv = document.createElement('DIV') 
  infoTextDiv.style = 'padding-left:8px;display:table-cell;height:32px;overflow:hidden;width:100%;font-size:0.85em;vertical-align:middle;column-count:2;';
  infoTextDiv.innerHTML = 'Entries: ' + dictCount.toLocaleString() + '<br>Context Depth: ' + prefixDepth + '<br>Minimum Length: ' + minLength + '<br>Maximum Length: ' + maxLength;
  makerEditDiv = document.createElement('DIV');
  makerEditDiv.id = 'edit-' + id;
  makerEditDiv.style= 'display:table-cell;vertical-align:middle;text-align:right;';
  makerEditInnerDiv = document.createElement('DIV');
  makerEditInnerDiv.style = 'display:inline-block;float:right;';
  makerEditButton = document.createElement('I');
  makerEditButton.id = 'makerEditButton-' + id;
  makerEditButton.className = 'fas fa-pen';
  makerEditButton.style = 'font-size:16px;padding:4px;';

  makerDiv.append(makerMakeButton);
  makerDiv.append(infoTextDiv);
  makerEditInnerDiv.append(makerEditButton);
  makerEditDiv.append(makerEditInnerDiv);
  makerDiv.append(makerEditDiv);
  return makerDiv;
}
function outputNames(names, html, app) {
  console.log(html);
  let divElement = html.closest('.window-app').find('.maker-list-names');
  divElement.empty(); 
  nameElement = [];
  for (let i = 0; i < names.length; i ++ ) {
    nameElement[i] = $(`<button style='height:32px;line-height:100%;font-family: "Modesto Condensed", "Palatino Linotype"; letter-spacing: 0.05em;font-size:0.75em'>` + names[i] + `</button>`);
    nameElement[i].click(ev => {
      dummyElement = document.createElement("textarea");
      document.body.appendChild(dummyElement);
      dummyElement.value = names[i]
      dummyElement.select();
      document.execCommand("copy");
      document.body.removeChild(dummyElement);
      app.close();
    });
    divElement.append(nameElement);
  }
}