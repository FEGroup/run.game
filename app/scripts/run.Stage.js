run.Stage = (function () {
  'use strict';

  return run.Class.extend({
    initialize: function (ctx) {
      this.ctx = ctx;
    },

    getContext: function () {
      return this.ctx;
    },

    clearContext: function () {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  });
})();
