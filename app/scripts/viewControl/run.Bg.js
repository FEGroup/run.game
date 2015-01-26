run.Bg = (function () {
    'use strict';

    return run.Class.extend({

        initialize: function (stage) {
            this._stage = stage;

        },

        draw: function () {

        },

        update: function () {
            this.draw();
        },

        setPoint: function (x, y) {
            this.x = x;
            this.y = y;
        },

        setMode: function (mode) {
            this.mode = mode;
        }
    });

})();
