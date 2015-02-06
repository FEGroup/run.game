/* jshint devel:true */
var app = (function () {
    'use strict';

    var initRunGame = function (id) {
        var el = document.getElementById(id);
        var ctx = el.getContext('2d');
        var oStage = new run.Stage(ctx);
        var oGameController = new run.GameController(oStage);

        oGameController.start();

        return oGameController;
    };

    return {

        initUi: function (oGameController) {
            oGameController.on('change:score', function () {
                $('#_score').val(oGameController.getScore());
            });

            $('#_start_btn').on('click', function () {
                oGameController.start();
            });
            $('#_stop_btn').on('click', function () {
                oGameController.stop();
            });

            $('#_pause_btn').on('click', function () {
                oGameController.pause();
            });
            $('#_resume_btn').on('click', function () {
                oGameController.resume();
            });
        },

        initRunGame: function () {
            var oGameController = initRunGame('_stage');
            this.initUi(oGameController);

            initRunGame('_stage2');
            initRunGame('_stage3');
        },

        start: function () {
            run.PreLoader.load(this.initRunGame.bind(this));
        }
    };
})();

app.start();
