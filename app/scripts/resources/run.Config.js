run.Config = (function () {
    'use strict';

    var Config = run.Class.extend({
        defaults : {
            STAGE_WIDTH: 600,
            STAGE_HEIGHT: 300,
            FPS : 30,
            GRAVITY : 8,
            INIT_JUMP_VELOCITY : -40,
            TERRAIN_BOTTOM_Y: 300 - 33,
            ITEM_INTERVAL_X: 30
        }
    });

    // run.Config is singleton
    return new Config();
})();
