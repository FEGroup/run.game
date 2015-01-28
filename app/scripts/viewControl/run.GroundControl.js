run.GroundControl = (function () {
  'use strict';

  return run.ViewControl.extend({

    defaults: {
      mainModel: null,
      model: null
    },

    initialize: function (ctx, model) {
      this.model = model;
      this.mainModel = run.MainModel;
      this.model.set('ctx', ctx);
      this.initSetting();
    },

    initSetting: function () {
      this.model.addGround('type');
    },

    update: function () {

    }

  })
});
