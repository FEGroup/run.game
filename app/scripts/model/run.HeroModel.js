run.HeroModel = (function () {

    return run.Class.extend({

        defaults: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
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

        set: function(prop, val) {
            this.__super__.set.call(this, prop, val);
            if (prop === 'mode' && val === this.MODE.D_MODE) {
                this.dispatchEvent(new Event('deadEvent'));
            }
        },

        nextFrame: function () {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
        }

    });
})();
