run.GroundControl = (function () {
    'use strict';

    return run.ViewControl.extend({

        defaults: {
            mainModel: null,
            model: null,
            ctx: null
        },

        initialize: function (ctx, model) {
            this.model = model;
            this.ctx = ctx;
            this.mainModel = run.MainModel;

            this.initSetting();
        },

        initSetting: function () {
            this.model.addGround('type');
        },

        update: function () {

        }
    })
})();
