run.Stage = (function () {
    'use strict';

    return run.Class.extend({

        defaults : {
            isStarted : true
        },

        initialize: function (ctx) {

            this.ctx = ctx;
        },

        getContext: function () {
            return this.ctx;
        },

        clearContext: function () {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        },

        animate: function () {
            this.frameTime = this.startTime = (new Date()).getTime();
            this.isStarted = true;
            requestAnimationFrame(this.tick.bind(this));
        },

        stop: function () {
            this.isStarted = false;
        },

        tick: function () {

            if(!this.isStarted){
                return;
            }

            var frameDuration = 1000 / run.Config.get('FPS');
            var now = (new Date()).getTime();
            var elapsedTime = now - this.frameTime;
            var visibleTime = Math.floor(elapsedTime / frameDuration);

            if (visibleTime > 0) {
                this.frameTime = now;
                this.dispatchEvent(new Event('enterframe'));
            }

            requestAnimationFrame(this.tick.bind(this));
        }
    });
})();
