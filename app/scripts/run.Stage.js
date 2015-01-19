(function(){
  'use strict';

  run.Stage = function(ctx){
    this.constructor.apply(this, arguments);
  };

  run.Stage.prototype.constructor = function(ctx){
    this.ctx = ctx;
    this.drawLine();
  };

  run.Stage.prototype.drawLine = function(){
    var ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.stroke();
  };

})();
