var run = run || {};

run.Hero = (function () {

  'use strict';
  var Hero;

  Hero = run.Class.extend({
    initialize: function (ctx, name) {
      this._x = this._y = 0;
      this._ctx = ctx;
      this._name = name;
      this._currentFrame = 0;
    },
    MODE: {
      D_MODE: "default",
      R_MODE: "run",
      J_MODE: "jump"
    },
    _draw: function () {
      //temporary image create
      var src = run.Sources[this._name];

      this._ctx.drawImage(src.imageObj,
        src.frames[this._currentFrame][0], src.frames[this._currentFrame][1], src.frames[this._currentFrame][2], src.frames[this._currentFrame][3],
        this._x, this._y, src.frames[this._currentFrame][2], src.frames[this._currentFrame][3]);
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
  return Hero;
})();
