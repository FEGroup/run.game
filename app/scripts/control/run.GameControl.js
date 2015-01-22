var run = run || {};
run.GameControl = (function () {
  'use strict';

  var GameControl, images, Hero, fn, updateStack;


  var animation = function (t) {
    this._stage.clearContext();
    for (var i = 0; i < updateStack.length; i++) {
      if (updateStack[i].update && typeof updateStack[i].update === 'function') {
        updateStack[i].update();
      }
    }
    window.requestAnimationFrame(animation.bind(this));


    // 프레임(this._frame)에 따른 tick시점 수정 필요
  };

  var addKeyEvents = function () {
    this._stage.getContext().canvas.addEventListener("keydown", keyDownHandler.bind(this));
  };
  var keyDownHandler = function (e) {
    e.preventDefault();
    console.log(e.keyCode);
  };

  var init = function () {
    Hero = new run.Hero(this._stage.getContext(), 'hero');
    updateStack = [];
    updateStack.push(Hero);
    addKeyEvents.apply(this);
    console.log(run.Sources);
    window.requestAnimationFrame(animation.bind(this));
  };

  var preloadCom = function (comImages) {
    //images = comImages;

    for (var src in comImages)
      run.Sources[src].imageObj = comImages[src].imageObj;

    init.apply(this);
  };


  fn = (GameControl = function (stage) {
    this._stage = stage;
    PRE_LOADER.preload(run.Sources, preloadCom.bind(this));
  }).prototype;

  fn.changeDepth = function (obj1, obj2) {
    var index1 = updateStack.indexOf(obj1), index2 = updateStack.indexOf(obj2), tm1, tm2;
    if (index1 < 0 || index2 < 0)
      return;

    tm1 = updateStack[index1];
    tm2 = updateStack[index2];
    updateStack[index2] = tm1;
    updateStack[index1] = tm2
  };

  fn.setFrame = function(num){
    this._frame = num;
  }

  return GameControl;
})();
