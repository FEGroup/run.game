run.Bg = (function () {
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
        },

        draw: function (ctx, x, y) {
            this.x = x;
            this.y = y;
            if (this.image === null) {
                return;
            }

            ctx.drawImage(this.image, x, y, this.width, this.height);
        }

    });
})();
