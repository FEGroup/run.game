var run = run || {};
/* jshint devel:true */
(function(){
  'use strict';
  run.init = function(id){
    var el = document.getElementById(id);
    var ctx = el.getContext('2d');

    this.stage = new run.Stage(ctx);
  };

  run.init('_stage');
})();
