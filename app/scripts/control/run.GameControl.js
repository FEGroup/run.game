var run = run || {};
run.GameControl = (function () {
  var GameControl, images, Hero, privateFn;

  privateFn = {
    keyDownHandler: function (e) {
      e.preventDefault();
      console.log(e.keyCode);
    },
    init: function (){
      Hero = new run.Hero();
      privateFn.addKeyEvents.apply(this);
    },
    addKeyEvents : function () {
      this.stage.getContext().canvas.addEventListener("keydown", privateFn.keyDownHandler.bind(this));
    },
    preloadCom: function (comImages) {
      images = comImages;
      privateFn.init.apply(this);
    }
  };

  GameControl = run.Class.extend({
    initialize : function(stage){
      this.stage = stage;
      PRE_LOADER.preload(srcImages, privateFn.preloadCom.bind(this));
    }
  });



  return GameControl;
})();
