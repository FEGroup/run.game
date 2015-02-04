run.Terrain = (function () {
    'use strict';

    return run.View.extend({
        defaults: {
            model: null,
            id: -1,
            type: -1,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            imageX: 0,
            imageY: 0,
            image: null
        },

        /**
         * @constructor
         * @param model TerrainModel
         * @param type  그라운드 타입(땅, 장애물, 낭떠러지)
         * @param id    id
         */
        initialize: function (model, type, id) {
            this.model = model;
            this.id = id;
            this.type = type;

            switch (type) {
                case this.model.TYPE.BOTTOM:
                    this.image = run.Sources.bottomTerrain.imageObj;

                    this.imageX = run.Sources.bottomTerrain.frames.bg[0][0];
                    this.imageY = run.Sources.bottomTerrain.frames.bg[0][1];
                    this.width = run.Sources.bottomTerrain.frames.bg[0][2];
                    this.height = 60;

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
            this.x = x;
            this.y = y;
            if (this.image) {
                var rect = {x: this.x, y: this.y, w: this.width, h: this.height};

                ctx.drawImage(this.image,
                    this.imageX, this.imageY, this.width, this.height,
                    rect.x, rect.y, rect.w, rect.h);
            }
        }
    });
})();
