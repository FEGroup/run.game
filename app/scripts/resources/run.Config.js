(function () {
    'use strict';

    var Config = run.Class.extend({

        defaults: {
            FPS: 30,
            GRAVITY: 5,
            INIT_JUMP_VELOCITY: -30
        },

        get: function (prop) {
            if (this.hasOwnProperty(prop)) {
                return this[prop];
            } else {
                throw new Error('no such config value' + prop);
            }
        }
    });

    // run.Config is singleton
    run.Config = new Config();
})();
