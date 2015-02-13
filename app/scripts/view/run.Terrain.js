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
            currentFrame: 0,
            totalFrames: -1,
            image: null,
            frameArr: null
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
            this.currentFrame = 0;

            switch (type) {
                case this.model.TYPE.BOTTOM:
                    /**
                     * 레벨에 따라 해당 컨텐츠를 변경 할 수도 있음. bg가 아닌 bg1, bg2, bg3
                     */
                    this.frameArr = run.Sources.bottomTerrain.frames.bg;

                    this.totalFrames = this.frameArr.length;
                    this.image = run.Sources.bottomTerrain.imageObj;

                    this.setImageRect();

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
                    this.frameArr = run.Sources.trap.frames.trap1;

                    this.totalFrames = this.frameArr.length;
                    this.image = run.Sources.trap.imageObj;

                    this.setImageRect();
                    break;
            }
        },

        setImageRect: function() {
            var imgArr = this.frameArr[this.currentFrame];
            this.imageX = imgArr[0];
            this.imageY = imgArr[1];
            this.width = imgArr[2];
            this.height = imgArr[3];
        },

        draw: function (ctx, x, y) {
            this.x = x;
            this.y = y;

            if (this.image) {
                this.setImageRect();

                this.currentFrame++;

                if (this.currentFrame === this.totalFrames) {
                    this.currentFrame = 0;
                }
                var rect = {x: this.x, y: this.y, w: this.width, h: this.height};
                // pivot은 좌측 상단으로 한다.
                ctx.drawImage(this.image,
                    this.imageX, this.imageY, this.width, this.height,
                    rect.x, rect.y, rect.w, rect.h);
            }
        }
    });
})();
