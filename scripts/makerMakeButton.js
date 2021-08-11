class MakerMakeButton {
  constructor(nameData) {
    id = nameData.id;
    makerName = nameData.makerName;
    makerMakeButton= $(`
      <button type=button id='makerMakeButton-` + id + `' style='width:128px;font-size:16px;font-weight:bold;font-family: "Modesto Condensed", "Palatino Linotype", serif;'>` + makerName + `</button>
    `);
    makerMakeButton.click(ev => { 
      singleNameData = NameData.getMaker(game.userId, id);
      names = [];
      for ( j = 0; j < 3; j++ ) {
        names[j] = makeName(singleNameData);
      } 
      outputNames(names,html);
    });
  }
}
