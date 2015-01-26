/**
 * Created by Naver on 2015-01-26.
 */
var run = run || {};

run.MainModel = (function(){
  return run.Model.extend({
    initialize : function(config){
      this._config = config;
    },
    animate : function(){
      this.frameTime = this.startTime = (new Date()).getTime();
      requestAnimationFrame(this.tick.bind(this));
    },
    tick : function(){
      var frameDuration = 1000 / this._config.FPS;
      var now = (new Date()).getTime();
      var elapsedTime = now - this.frameTime;
      var visibleTime = Math.floor(elapsedTime / frameDuration);

      if (visibleTime > 0)
      {
        this.frameTime = now;
        this.dispatchEvent(new Event('enterframe'));
      }

      requestAnimationFrame(this.tick.bind(this));
    },
    getConfig : function(){
      return this._config;
    }
  });

})();
