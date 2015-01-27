run.MainModel = (function(){

  return run.Model.extend({
    initialize : function(){

    },

    animate : function(){
      this.frameTime = this.startTime = (new Date()).getTime();
      requestAnimationFrame(this.tick.bind(this));
    },

    tick : function(){

      var frameDuration = 1000 / run.Config.get('FPS');
      var now = (new Date()).getTime();
      var elapsedTime = now - this.frameTime;
      var visibleTime = Math.floor(elapsedTime / frameDuration);

      if(visibleTime > 0){
        this.frameTime = now;
        this.dispatchEvent(new Event('enterframe'));
      }

      requestAnimationFrame(this.tick.bind(this));
    }
  });

})();
