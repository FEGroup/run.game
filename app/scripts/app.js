/* jshint devel:true */
var app = (function () {
    'use strict';

    var initRunGame = function (id) {
        var el = document.getElementById(id);
        var ctx = el.getContext('2d');

        var oStage = new run.Stage(ctx);
        new run.GameController(oStage);
    };

    return {
        initRunGame : function () {
            initRunGame('_stage');
        },

        start : function(){
            run.PreLoader.load(this.initRunGame);
        }
    }
})();