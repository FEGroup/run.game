run.GameControl = (function () {
  'use strict';

  var GameControl = run.Class.extend({

    FPS : 15,

    initialize : function(stage){
      this._stage = stage;
      this.updateStack = [];

      this.initHero();
      this.addKeyEvents();
      this.startTime = 0;
      this.isJumping = false;

      this.startAnimation();
    },

    startAnimation: function () {
      this.animate();
    },

    initHero: function () {
      this._oHero = new run.Hero(this._stage.getContext(), 'hero');
      this.updateStack.push(this._oHero);
    },

    animate : function(){
      this.startTime = (new Date()).getTime();
      requestAnimationFrame(this.tick.bind(this));
    },

    tick : function(){
      var updateStack = this.updateStack;
      var i;

      var gravity = 1.2;
      var characterGround = 20;

      if (this.isJumping) {
        this.yVel += gravity;
        this._oHero._y += this.yVel;

        if (this._oHero._y > characterGround) {
          this._oHero._y = characterGround;
          this.yVel = 0;
          this.isJumping = false;
        }

      }

      if(this.startTime === 0){
        for (i = 0; i < updateStack.length; i++) {
          updateStack[i].initFrame();
        }

        return;
      }

      // 프레임(this._frame)에 따른 tick시점 수정 필요
      var frameDuration = 1000 / this.FPS;
      var now = (new Date()).getTime();
      var elapsedTime = now - this.startTime;
      var visibleTime = Math.floor(elapsedTime / frameDuration);

      if (visibleTime > frames.length) {
        // we're past the end of the animation and we're not looping.
        // stop the animation.
        //this.startTime = 0;
      }



      this._stage.clearContext();
      for (i = 0; i < updateStack.length; i++) {
        if (updateStack[i].update && typeof updateStack[i].update === 'function') {
          updateStack[i].update(visibleTime);
        }
      }


      if (this.startTime !== 0) {
        requestAnimationFrame(this.tick.bind(this));
      }
    },

    addKeyEvents : function () {
      $(window).on('keydown', $.proxy(this.keyDownHandler, this));
    },

    jump : function(){
      if (this.isJumping == false) {
        this.yVel = -15;
        this.isJumping = true;
      }
      console.log('ss')
    },

    keyDownHandler : function (e) {
      e.preventDefault();

      var delta = 10;

      switch(e.keyCode){

        case 32 :
          this.jump();
              break;
        // left
        case 37 :
          this._oHero._x-= delta;
        break;

        // up
        case 38 :
          this._oHero._y-= delta;
        break;

        // right
        case 39 :
          this._oHero._x+= delta;
        break;

        // down
        case 40 :
          this._oHero._y+= delta;
        break;
      }
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
