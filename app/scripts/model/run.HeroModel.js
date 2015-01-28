run.HeroModel = (function(){

  return run.Model.extend({

    defaults :{
      _x : 0,
      _y : 0,
      _name: '',
      _currentFrame: 0,
      _totalFrames: 0,
      _ctx: null,
      _scale: 1,
      _xVel: 5,
      _yVel: 0,
      _isJumping: false,
      _mode: '',
      MODE: {
        D_MODE: 'dead',
        R_MODE: 'run',
        J_MODE: 'jump'
      }
    },

    initialize : function(){
    },

    nextFrame: function(){
      this._currentFrame++;
      if (this._currentFrame >= this._totalFrames) {
        this._currentFrame = 0;
      }
    },

    getSrc: function(mode, name){
      switch(mode){
        case this.MODE.J_MODE:
          return run.Sources[name].frames.jump;
        case this.MODE.R_MODE:
          return run.Sources[name].frames.run;
        case this.MODE.D_MODE:
          return run.Sources[name].frames.dead;
        default:
      }
    }

  });
})();
