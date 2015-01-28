run.Bg = (function () {
    'use strict';

    return run.Class.extend({
        defaults: {
            x: 0,
            y: 0,
            _name: 'hero',
            _currentFrame: 0,
            _ctx: null
        },

        initialize: function (ctx) {
            this._ctx = ctx;
        },

        draw: function () {
            var src = run.Sources[this._name];

            this._ctx.drawImage(src.imageObj,
                src.frames[this._currentFrame][0], src.frames[this._currentFrame][1], src.frames[this._currentFrame][2], src.frames[this._currentFrame][3],
                this.x, this.y, src.frames[this._currentFrame][2], src.frames[this._currentFrame][3]);
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
