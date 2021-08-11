class NameMakerDeleteConfirmationWindow extends Application {
  template = "modules/navarens-name-maker/templates/nameMakerDeleteConfirmationWindow.hbs";
  title = "Navaren's Name Maker";
  getData(options) {
    if (options.label != undefined) return NameData.getMaker(options.label.userId, options.label.makerId);
  }
}