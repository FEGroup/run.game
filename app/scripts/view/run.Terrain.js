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

        createPattern : function(){
            var elCanvas = document.createElement('canvas');
            elCanvas.width = 25;
            elCanvas.height = 40;

            var patternCtx = elCanvas.getContext('2d');
            patternCtx.drawImage(this.image , (-450), -370, 1081, 1445);
            this.pattern = elCanvas;
        },

        draw: function (ctx, x, y) {
            this.x = x;
            this.y = y;
            if (this.image === null) {
                return;
            }

            if(!this.pattern){
                this.createPattern();
            }

            ctx.fillStyle = ctx.createPattern(this.pattern, "repeat");

            ctx.save();
            ctx.translate(-x, -y);
            ctx.fillRect(x * 2, y * 2, this.width, this.height);
            ctx.translate(-x, -y);
            ctx.restore();
        }

    });
})();
