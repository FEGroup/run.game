run.GameControl = (function () {
  'use strict';

  var GameControl = run.Class.extend({
    defaults : {
      FPS : 15,
      startTime : 0,
      xVel : 5,
      yVel : 0,
      isJumping : false,
      moveLeft : false,
      moveRight : false,
      updateStack : []
    },
    initialize : function(stage, model){


    initialize : function(stage){
      this._stage = stage;
      this.updateStack = [];

      this.initHero();
      this.addKeyEvents();
      this.startAnimation();
    },

    startAnimation: function () {
      this._model.animate();
    },

    initHero: function () {
      this._oHero = new run.Hero(this._stage.getContext(), 'hero');
      this.updateStack.push(this._oHero);

      this._oBg = new run.Bg(this._stage.getContext(), 'bg');
      this.updateStack.push(this._oBg);
    },

    controlHero: function () {
      var gravity = 1.2;
      var characterGround = 20;
      var characterWidth = 30;

      if (this.moveLeft) {
        this._oHero.x -= this.xVel;
        if (this._oHero._scaleX > 0) {
          this._oHero._scaleX *= -1;
          this._oHero.x += characterWidth;
        }
      } else if (this.moveRight) {
        this._oHero.x += this.xVel;
        if (this._oHero._scaleX < 0) {
          this._oHero._scaleX *= -1;
          this._oHero.x -= characterWidth;
        }
      }

      if (this.isJumping) {
        this.yVel += gravity;
        this._oHero.y += this.yVel;

        if (this._oHero._y > characterGround) {
          this._oHero._y = characterGround;
          this.yVel = 0;
          this.isJumping = false;
        }

      }
    },

    tick : function(e){
      var updateStack = this.updateStack;
      var i;

      this.controlHero();

      if(this._model.startTime === 0){
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
    },

    addKeyEvents : function () {

      $(window)
          .on('keydown', $.proxy(this.keyDownHandler, this))
          .on('keyup', $.proxy(this.keyUpHandler, this));
    },

    jump : function(){
      if (this.isJumping === false) {
        this.yVel = -15;
        this.isJumping = true;
      }
    },

    keyDownHandler : function (e) {
      e.preventDefault();

      switch(e.keyCode){
        case 32 :// jump
          this.jump();
          break;
        case 37 :// left
          this.moveLeft = true;
          break;
        case 38 :// up
          break;
        case 39 :// right
          this.moveRight = true;
          break;
        case 40 :// down
          break;
      }
    },

    keyUpHandler : function(e){
      switch(e.keyCode) {
        case 37 :
          this.moveLeft = false;
          break;
        // right
        case 39 :
          this.moveRight = false;
          break;
      }
    },

    changeDepth : function (obj1, obj2) {
      var updateStack = this.updateStack;

      var index1 = updateStack.indexOf(obj1), index2 = updateStack.indexOf(obj2), tm1, tm2;
      if (index1 < 0 || index2 < 0){
        return;
      }

      tm1 = updateStack[index1];
      tm2 = updateStack[index2];
      updateStack[index2] = tm1;
      updateStack[index1] = tm2;
    }
  });

  return GameControl;
})();
