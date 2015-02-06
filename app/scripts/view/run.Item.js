run.Item = (function () {
    'use strict';

    return run.View.extend({
        defaults: {
            model: null,
            type: -1,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            imageX: 0,
            imageY: 0,
            currentFrame: 0,
            totalFrames: 0,
            image: null,
            frameArr: null
        },

        initialize: function (src, frames) {
            this.src = src;
            this.frames = frames;
            this.currentFrame = 0;

            this.totalFrames = this.frames.length;
            this.image = this.src;

            this.setImageRect();
        },

        setImageRect: function() {
            var imgArr = this.frames[this.currentFrame];
            this.imageX = imgArr[0];
            this.imageY = imgArr[1];
            this.width = imgArr[2];
            this.height = imgArr[3];
        },

        draw: function (ctx, x, y) {
            this.x = x;
            this.y = y;

            if (this.image) {
                this.setImageRect();

                this.currentFrame++;

                if (this.currentFrame === this.totalFrames) {
                    this.currentFrame = 0;
                }

                var rect = {x: this.x, y: this.y, w: this.width, h: this.height};
                // pivot은 중심점으로 한다.
                ctx.drawImage(this.image,
                    this.imageX, this.imageY, this.width, this.height,
                    rect.x - rect.w / 2, rect.y - rect.h / 2, rect.w, rect.h);
            }
        }
    });
})();
