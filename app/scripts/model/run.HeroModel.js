run.HeroModel = (function () {

    return run.Class.extend({

        defaults: {
            x: 0,
            y: 0,
            currentFrame: 0,
            totalFrames: 0,
            scale: 1,
            xVel: 5,
            yVel: 0,
            isJumping: false,
            mode: '',
            MODE: {
                D_MODE: 'dead',
                R_MODE: 'run',
                J_MODE: 'jump'
            }
        },

        initialize: function () {
        },

        nextFrame: function () {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
        }

    });
})();
