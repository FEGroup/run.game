run.Config = (function () {
    'use strict';

    var Config = run.Class.extend({
        defaults : {
            STAGE_WIDTH: 600,
            STAGE_HEIGHT: 300,
            FPS : 30,
            GRAVITY : 5,
            INIT_JUMP_VELOCITY : -50,
            GROUND_BOTTOM_Y: 250
        }
    });

    // run.Config is singleton
    return new Config();
})();
