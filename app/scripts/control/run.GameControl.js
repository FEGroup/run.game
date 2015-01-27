run.GameControl = (function () {
  'use strict';

  return run.Class.extend({
    defaults: {
      startTime: 0,
      updateStack: []
    },

    initialize: function (stage, model) {
      this._stage = stage;
      this.updateStack = [];

      this.initHero();
      this.addKeyEvents();

      this._model = model;
      this._stage.addEventListener('enterframe', this.tick.bind(this));
      this.startAnimation();
    },

    startAnimation: function () {
      this._stage.animate();
    },

    initHero: function () {
      this._oHero = new run.Hero(this._stage.getContext(), new run.HeroModel());
      this.updateStack.push(this._oHero);
    },


    tick: function () {
      var updateStack = this.updateStack;
      var i;

      if (this._stage.startTime === 0) {
        for (i = 0; i < updateStack.length; i++) {
          updateStack[i].initFrame();
        }
        return;
      }

      this._stage.clearContext();
      for (i = 0; i < updateStack.length; i++) {
        if (updateStack[i].update && typeof updateStack[i].update === 'function') {
          updateStack[i].update();
        }
      }
      /**
       * 1. 간 거리에 따라 Level set
       * 2. Level에 맞게 랜덤으로 그라운드 및 아이템 적들을 생성해 준다.
       * 3. Level에 따른 스피드 set
       * 4. 스피드가 곧 거리 - 총 거리 = 현재 거리 + 스피드
       */
    },

    addKeyEvents: function () {
      $(window)
        .on('keydown', $.proxy(this.keyDownHandler, this))
        .on('keyup', $.proxy(this.keyUpHandler, this));
    },


    keyDownHandler: function (e) {
      e.preventDefault();

      switch (e.keyCode) {
        case 32 :// jump
          this._oHero.jump();
          break;
        case 37 :// left
          //this.moveLeft = true;
          break;
        case 38 :// up
          break;
        case 39 :// right
          //this.moveRight = true;
          break;
        case 40 :// down
          break;
      }
    },

    keyUpHandler: function (e) {
      switch (e.keyCode) {
        case 37 :
          //this.moveLeft = false;
          break;
        // right
        case 39 :
          //this.moveRight = false;
          break;
      }
    },

    changeDepth: function (obj1, obj2) {
      var updateStack = this.updateStack;

      var index1 = updateStack.indexOf(obj1), index2 = updateStack.indexOf(obj2), tm1, tm2;
      if (index1 < 0 || index2 < 0) {
        return;
      }

      tm1 = updateStack[index1];
      tm2 = updateStack[index2];
      updateStack[index2] = tm1;
      updateStack[index1] = tm2;
    }
  });

})();
