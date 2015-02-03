run.Stage = (function () {
    'use strict';

    return run.Class.extend({

        defaults : {
            frameTime : null,
            startTime : null,
            isStarted : true
        },

        initialize: function (ctx) {
            this.ctx = ctx;

            this.initPixelHack();
        },

        initPixelHack : function(){
            this.ctx.mozImageSmoothingEnabled = false;
            this.ctx.webkitImageSmoothingEnabled = false;
            this.ctx.msImageSmoothingEnabled = false;
            this.ctx.imageSmoothingEnabled = false;
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

        pause: function () {
            this.isStarted = false;
        },

        stop : function(){
            this.isStarted = false;
            this.startTime = 0;
            this.clearContext();
        },

        getVisibleTime : function(){
            var frameDuration = 1000 / run.Config.get('FPS');
            var now = (new Date()).getTime();
            var elapsedTime = now - this.frameTime;
            return Math.floor(elapsedTime / frameDuration);
        },

        tick: function () {
            if(!this.isStarted){
                return;
            }

            if (this.getVisibleTime() > 0) {
                this.frameTime = (new Date()).getTime();
                this.dispatchEvent(new Event('enterframe'));
            }

            requestAnimationFrame(this.tick.bind(this));
        }
    });
})();
