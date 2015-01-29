run.Ground = (function () {
    'use strict';

    return run.View.extend({
        defaults: {
            model: null,
            id: -1,
            type: -1,
            width: 0,
            height: 0,
            image: null
        },

        /**
         * @constructor
         * @param model GroundModel
         * @param type  그라운드 타입(땅, 장애물, 낭떠러지)
         * @param id    id
         */
        initialize: function (model, type, id) {
            this.model = model;
            this.id = id;
            this.type = type;

            switch (type) {
                case this.model.TYPE.BOTTOM:
                    this.image = run.Sources.bottomGround.imageObj;
                    this.width = this.image.width;
                    this.height = this.image.height;
                    break;
                case this.model.TYPE.SECOND:

                    break;
                case this.model.TYPE.THIRD:

                    break;
                case this.model.TYPE.CLIFF:
                    this.image = null;
                    this.width = run.Rules.MINIMUM_CREATE_DIS;
                    this.height = 0;

                    break;
                case this.model.TYPE.TRAP:

                    break;
            }
        },

        draw: function (ctx, x, y) {
            if (this.image === null) {
                return;
            }
            ctx.drawImage(this.image, x, y, this.width, this.height);
        }

    });
})();
