var run = run || {};
(function () {
  'use strict';

  run.Stage = run.Class.extend({

    initialize: function (ctx) {
      this.ctx = ctx;
      //this.drawLine();
    },

    //drawLine : function(){
    //  var ctx = this.ctx;
    //
    //  ctx.beginPath();
    //  ctx.moveTo(0, 0);
    //  ctx.lineTo(300, 150);
    //  ctx.stroke();
    //},

    getContext: function () {
      return this.ctx;
    },

    clearContext: function () {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  });

})();
