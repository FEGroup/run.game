(function(){
  'use strict';

  var Config = run.Class.extend({

    defaults : {
      FPS : 15,
      GRAVITY : 1.2,
      JUMP_ACC : -15
    },

    get : function(prop){
      if(this[prop]){
        return this[prop];
      } else {
        throw new Error('no such config value' + prop);
      }
    }
  });

  // run.Config is singleton
  run.Config = new Config();
})();