class MakerEditButton {
  constructor(nameData) {
    id = nameData.id;
    makerName = nameData.makerName;
    makerEditButton = $(`
          <i id="makerEditButton-` + id + `" class="fas fa-pen edit-icon"></i>
    `);
    makerEditButton.click(function(editButton) {
      nameMakerWindow = new NameMakerWindow(document).render(true, {id: game.userId + "," + id});
    });
  }
}
