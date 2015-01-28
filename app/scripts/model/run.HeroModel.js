run.HeroModel = (function () {

    return run.Model.extend({

        defaults: {
            x: 0,
            y: 0,
            name: '',
            currentFrame: 0,
            totalFrames: 0,
            ctx: null,
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
        },

        getSrc: function (mode, name) {
            switch (mode) {
                case this.MODE.J_MODE:
                    return run.Sources[name].frames.jump;
                case this.MODE.R_MODE:
                    return run.Sources[name].frames.run;
                case this.MODE.D_MODE:
                    return run.Sources[name].frames.dead;
                default:
            }
        }

    });
})();
