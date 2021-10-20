class MakerListWindow extends Application {
  template = "modules/navarens-name-maker/templates/makerList.hbs";
  title = "Navaren's Name Maker";
  getData(options) {
    let makers = NameData.getMakersForUser(game.userId);
    if(makers === undefined) return;
    let nameData = Object.entries(makers);
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

  return `
    <div class="makerItemContainer" id="div-${id}">
      <button type=button class="makerMakeButton" id="makerMakeButton-${id}">${makerName}</button>
      <div class="infoTextDiv">
        Entries: ${dictCount.toLocaleString()}<br/>
        Depth: ${prefixDepth}<br/>
        Min Length: ${minLength}<br/>
        Max Length: ${maxLength}<br/>
      </div>
      <div class="makerEditDiv" id="edit-${id}>
        <div class="float-right">
          <i class="fas fa-pen edit-icon" id="makerEditButton-${id}"></i>
        </div>
      </div>
    </div>
    `;
}

function outputNames(names, html, app) {
  let divElement = html.closest('.window-app').find('.maker-list-names');
  divElement.empty();
  nameElement = [];
  for (let i = 0; i < names.length; i ++ ) {
    nameElement[i] = $(`<button class='name-element-button'>` + names[i] + `</button>`);
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
