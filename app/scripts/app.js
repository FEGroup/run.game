/* jshint devel:true */
(function(){
  'use strict';

  run.loadResources = function(cb){
    run.PRE_LOADER.preload(run.Sources, function(comImages){
      var src;

      for (src in comImages){
        run.Sources[src].imageObj = comImages[src].imageObj;
      }

      if(cb){
        cb();
      }
    });
  };

  run.init = function(id){
    var el = document.getElementById(id);
    var ctx = el.getContext('2d');

    var oStage = new run.Stage(ctx);
    new run.GameControl(oStage);
  };

  run.loadResources(function(){
    run.init('_stage');
  });

})();
