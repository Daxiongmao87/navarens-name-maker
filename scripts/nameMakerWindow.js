class NameMakerWindow extends Application {
  template = "modules/navarens-name-maker/templates/nameMaker.hbs";
  title = "Navaren's Name Maker";
  getData(options) {
    if (options.label != undefined) {
      return NameData.getMaker(
        options.label.userId, 
        options.label.makerId
      );
    }
  }
}
