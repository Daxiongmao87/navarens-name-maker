class NameData {
  static get allMakers() {
    const allMakers = game.users.reduce((accumulator, user) => {
      const userMakers = this.getMakersForUser(user.id);
      return {
      ...accumulator,
      ...userMakers
      }
    }, {});

    return allMakers;
  }

  static getMakersForUser(userId) {
    return game.users.get(userId)?.getFlag(
      NameMaker.ID,
      NameMaker.FLAGS.MAKERS
    );
}
  static getMaker(userId, id) {
    if(userId == undefined || id == undefined) {
      return {delim: ",", prefixDepth: "2"}
    }
    this.nameData = Object.entries(NameData.getMakersForUser(userId));
    for(this.i = 0; this.i < this.nameData.length; this.i++) {
      this.thisData = this.nameData[this.i][1];
      if(this.thisData.id == id) {
        return this.thisData;
      }
    }
  }

  static createMaker(userId, nameData, app) {
    const newMaker = {
      ...nameData,
      id: foundry.utils.randomID(16),
      userId,
    }

    const newMakers = {
      [newMaker.id]: newMaker
    }

    return game.users.get(userId)?.setFlag(
      NameMaker.ID,
      NameMaker.FLAGS.MAKERS,
      newMakers
    ).then(() => {
      app.close();
    });
  }

  static updateMaker(makerId, updateData,app) {
    const relevantMaker = this.allMakers[makerId];
    const update = {
      [makerId]: updateData
    }
    game.users.get(relevantMaker.userId)?.setFlag(
      NameMaker.ID,
      NameMaker.FLAGS.MAKERS,
      update
    ).then(() => {
      app.close();
    });
  }

  static deleteMaker(makerId, app) {
    const thisMaker = this.allMakers[makerId];
    const keyDeletion = {
      [`-=${makerId}`]: null
    }
    return game.users.get(thisMaker.userId)?.setFlag(
      NameMaker.ID,
      NameMaker.FLAGS.MAKERS,
      keyDeletion
    ).then(() => {
      app.close();
      app.options.label.parent.app.close();
    });
  }
}
