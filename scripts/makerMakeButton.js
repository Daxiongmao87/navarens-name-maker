class MakerMakeButton {
  constructor(nameData) {
    id = nameData.id;
    makerName = nameData.makerName;
    makerMakeButton= $(`
      <button type=button class="maker-make-button" id='makerMakeButton-` + id + `'>` + makerName + `</button>
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
