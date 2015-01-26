run.GameControl = (function () {
  'use strict';

  var GameControl = run.Class.extend({

    initialize : function(stage){
      this._stage = stage;
      this.updateStack = [];

      this.initHero();
      this.addKeyEvents();

      this.startAnimation();
    },

    startAnimation: function () {
      window.requestAnimationFrame(this.animation.bind(this));
    },

    initHero: function () {
      this.updateStack.push(new run.Hero(this._stage.getContext(), 'hero'));
    },

    animation : function(){
      // 프레임(this._frame)에 따른 tick시점 수정 필요
      var updateStack = this.updateStack;
      this._stage.clearContext();
      for (var i = 0; i < updateStack.length; i++) {
        if (updateStack[i].update && typeof updateStack[i].update === 'function') {
          updateStack[i].update();
        }
      }
      window.requestAnimationFrame(this.animation.bind(this));

    },

    addKeyEvents : function () {
      this._stage.getContext().canvas.addEventListener('keydown', this.keyDownHandler);
    },

    keyDownHandler : function (e) {
      e.preventDefault();
      console.log(e.keyCode);
    }
  });

  GameControl.changeDepth = function (updateStack, obj1, obj2) {
    var index1 = updateStack.indexOf(obj1), index2 = updateStack.indexOf(obj2), tm1, tm2;
    if (index1 < 0 || index2 < 0){
      return;
    }


    tm1 = updateStack[index1];
    tm2 = updateStack[index2];
    updateStack[index2] = tm1;
    updateStack[index1] = tm2;
  };

  return GameControl;
})();
