/* jshint devel:true */
(function () {
    'use strict';

    run.init = function (id) {
        var el = document.getElementById(id);
        var ctx = el.getContext('2d');

        var oStage = new run.Stage(ctx);

        new run.GameController(oStage);
    };

    run.PreLoader.load(function () {
        run.init('_stage');
    });

})();