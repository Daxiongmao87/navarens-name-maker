class NameMaker {
  static ID = 'navarens-name-maker';
  static FLAGS = {
    MAKERS: 'makers',
    NAMES: 'names'
  }
}

function initActorSheetHook(app, html, data) {
  let openBtn = $(`<a class="open-actor-name-maker" title="Make Name"><i class="fas fa-random"></i>Make Name</a>`);
  openBtn.click(ev => {
    new MakerListWindow(app.document).render(true, {
      resizable: true,
      width: 480,
      height: 400
    });
  });
  html.closest('.app').find('.open-actor-name-maker').remove();
  let element = html.closest('.app').find('.window-title');
  if (!app._minimized) {
    openBtn.insertAfter(element);
  }
}

function initMakerListHook(app, html, data) {
  thisData = []
  if(data != null) {
    for(let i = 0; i < data.length; i++ ) {
      thisData[i] = data[i][1];
    }
    populateMakerList(app, html, thisData);
  }
  let openBtn = $(`<button type="button"'>New Maker</button>`);
  openBtn.click(ev => {
    new NameMakerWindow(document).render(true, {
      resizable: true,
      label: {
        userId: game.userId,
        makerId: thisData.id,
        parent: {
          app: app,
          html: html,
          data: data
        }
      }
    });
  });
  element = html.closest('.window-app').find('.new-maker-div');
  if (!app._minimized) {
    element.append(openBtn);
  }

}

function initNameMakerHook(app, html, data) {
  if(data.id != undefined) {
    let element = html.closest('.window-app').find('#name-maker-analyze-structure-checkbox');
    if(data.analyzeStructure) {
      element.trigger("click");
    }
    let updateBtn = $(`<button class="name-maker-update-button float-left" type="button">Update</button>`);
    updateBtn.click(ev => {
      submitMaker(html,data,app);
    });
    element = html.closest('.window-app').find('.name-maker-submit-div');
    if (!app._minimized) {
      element.append(updateBtn);
    }
    let deleteBtn = $(`<button class="name-maker-delete-button float-right" type="button">Delete</button>`);
    deleteBtn.click(ev => {
      new NameMakerDeleteConfirmationWindow(document).render(true, {
        label: {
          userId: game.userId,
          makerId: data.id,
          parent: {
            app: app,
            html: html,
            data: data
          }
        }
      })
    });
    element = html.closest('.window-app').find('.name-maker-submit-div');
    if (!app._minimized) {
      element.append(deleteBtn);
    }
  }
  else {
    let submitBtn = $(`<button type="button">Submit</button>`);
    submitBtn.click(ev => { submitMaker(html,undefined,app);
    });
    let element = html.closest('.window-app').find('.name-maker-submit-div');
    if (!app._minimized) {
      element.append(submitBtn);
    }
  }
}

function initNameMakerDeleteConfirmationHook(app, html, data) {
  let yesBtn = $(`<button class="name-maker-update-button float-left" type="button">Yes</button>`);
  yesBtn.click(ev => {
    NameData.deleteMaker(data.id,app);

  });
  let element = html.closest('.window-app').find('.name-maker-delete-confirmation-submit-div');
  if (!app._minimized) {
    element.append(yesBtn);
  }
  let noBtn = $(`<button class="name-maker-delete-button float-right" type="button">No</button>`);
  noBtn.click(ev => {
    app.close();
  });
  element = html.closest('.window-app').find('.name-maker-delete-confirmation-submit-div');
  if (!app._minimized) {
    element.append(noBtn);
  }
}

function refreshMakerListHook(app, html, data) {
  parent = app.options.label.parent;
  parent.html.closest('.window-app').find('.maker-list').empty();
  makers = NameData.getMakersForUser(game.userId);

  makersArray = []
  for (const [key, value] of Object.entries(makers)) {
    makersArray.push(value);

  }
  populateMakerList(parent.app,parent.html,makersArray);
}

 function populateMakerList(app, html, data){
  makerEntries = [];
  let element = html.closest('.window-app').find('.maker-list');
  makerButtons = [];
  makerEditButtons = [];
  thisData = []
  for(let i = 0; i < data.length; i++ ) {
    thisData[i] = data[i]
    makerEntries[i] = generateMakerEntry(thisData[i]);
    element.append(makerEntries[i]);
    makerButtons[i] = element.find('#makerMakeButton-' + thisData[i].id);
    makerButtons[i].click(async function() {
      names = [];
      names[0] = await makeName(thisData[i], 5);
      names[1] = await makeName(thisData[i], 5);
      names[2] = await makeName(thisData[i], 5);
      outputNames(names,html,app);
    });
    makerEditButtons[i] = element.find('#makerEditButton-' + thisData[i].id);
    makerEditButtons[i].click(env => {
      new NameMakerWindow(document).render(true, {
        resizable: true,
        label: {
          userId: game.userId,
          makerId: thisData[i].id,
          parent: {
            app: app,
            html: html,
            data: data
          }
        }
      });
    });
  }
}

Hooks.on('renderActorSheet', initActorSheetHook);
Hooks.on('renderDialog', initActorSheetHook);
Hooks.on('renderMakerListWindow', initMakerListHook);
Hooks.on('renderNameMakerWindow', initNameMakerHook);
Hooks.on('renderNameMakerDeleteConfirmationWindow', initNameMakerDeleteConfirmationHook);
Hooks.on('closeNameMakerWindow', refreshMakerListHook);
