/* jshint devel:true */
var app = (function () {
    'use strict';

    var initRunGame = function (id) {
        var el = document.getElementById(id);
        var ctx = el.getContext('2d');

        /**
         * 도입부에 게임이 바로 시작하지 않고 UI가 있어야 함.
         */

        var oStage = new run.Stage(ctx);
        var oGameController = new run.GameController(oStage);

        oGameController.on('change:score', function(){
            $('#_score').val(oGameController.getScore());
        });


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
