run.View = (function () {
  'use strict';

  return run.Class.extend({
    defaults: {
      x: 0,
      y: 0,
      _name: '',
      _currentFrame: 0,
      _ctx: null,
      _scale: 1
    },

    initialize: function (ctx) {
      this._ctx = ctx;
    },

    draw: function () {

    }
  });
})();
