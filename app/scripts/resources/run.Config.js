run.Config = (function () {
    'use strict';

    var Config = run.Class.extend({
        defaults : {
            FPS : 30,
            GRAVITY : 5,
            INIT_JUMP_VELOCITY : -30,
            CREATE_EVENT: 'createEvent',
            MOVE_EVENT: 'moveEvent',
            GROUND_TYPE: {
                BOTTOM: 'bottom',
                SECOND: 'second',
                THIRD: 'third',
                CLIFF: 'cliff'
            }
        }
    });

    // run.Config is singleton
    return new Config();
})();
