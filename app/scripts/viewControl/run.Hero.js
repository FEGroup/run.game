run.Hero = (function () {
    'use strict';

    return run.Class.extend({
        MODE: {
            D_MODE: 'default',
            R_MODE: 'run',
            J_MODE: 'jump'
        },

        defaults : {
            x : 0,
            y : 0,
            _currentFrame : 0,
            _name : '',
            _ctx : null
        },

        /**
         * @constructor
         * @param ctx
         * @param name
         */
        initialize: function (ctx, name) {
            this._ctx = ctx;
            this._name = name;
        },

        _draw: function () {
            //temporary image create
            var src = run.Sources[this._name];

            this._ctx.drawImage(src.imageObj,
                src.frames[this._currentFrame][0], src.frames[this._currentFrame][1], src.frames[this._currentFrame][2], src.frames[this._currentFrame][3],
                this.x, this.y, src.frames[this._currentFrame][2], src.frames[this._currentFrame][3]);
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
            this.x = lx;
            this.y = ly;
        },

        setMode: function (m) {
            this.mode = m;
        },

        getSrcName: function () {
            return this._name;
        }
    });
})();
