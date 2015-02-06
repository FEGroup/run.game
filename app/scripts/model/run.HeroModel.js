run.HeroModel = (function () {

    return run.Class.extend({

        defaults: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            currentFrame: 0,
            totalFrames: 0,
            scale: 2,
            xVel: 5,
            yVel: 0,
            prevRect: {x:0, y:0, w:0, h:0},
            isDoubleJumping: false,
            mode: '',
            MODE: {
                D_MODE: 'dead',
                R_MODE: 'run',
                J_MODE: 'jump',
                L_MODE: 'doubleJump'
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
