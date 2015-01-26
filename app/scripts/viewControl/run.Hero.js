run.Hero = (function () {
    'use strict';

    return run.Class.extend({
        MODE: {
            D_MODE: 'default',
            R_MODE: 'run',
            J_MODE: 'jump'
        },

        /**
         * @constructor
         * @param ctx
         * @param name
         */
        initialize: function (ctx, name) {
            this._x = 0;
            this._y = 0;
            this._ctx = ctx;
            this._name = name;
            this._currentFrame = 0;
        },

        _draw: function () {
            //temporary image create
            var src = run.Sources[this._name];

            this._ctx.drawImage(src.imageObj,
                src.frames[this._currentFrame][0], src.frames[this._currentFrame][1], src.frames[this._currentFrame][2], src.frames[this._currentFrame][3],
                this._x, this._y, src.frames[this._currentFrame][2], src.frames[this._currentFrame][3]);
        },

        initFrame: function () {
            this._currentFrame = 0;
        },

        update: function () {
          this._draw();
          this._currentFrame++;

          if (this._currentFrame >= run.Sources[this._name].frames.length)
              this._currentFrame = 0;
        },

        setPoint: function (lx, ly) {
            this._x = lx;
            this._y = ly;
        },

        setMode: function (m) {
            this.mode = m;
        },

        getSrcName: function () {
            return this._name;
        }
    });
})();
