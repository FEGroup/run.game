run.PreLoader = {
    preload: function (images, callback) {
        var resources = {},
            src,
            length = 0,
            com = 0,
            img;

        var onLoad = function (e) {
            images[src].imageObj = e.currentTarget;
            if (++com >= length) {
                callback(resources);
            }
        };

        for (src in images) {
            length++;
            resources[src] = {};
            img = resources[src].imageObj = new Image();

            img.onload = onLoad;
            img.src = images[src].img;
        }
    },

    load: function (cb) {
        this.preload(run.Sources, function (comImages) {
            var src;

            for (src in comImages) {
                run.Sources[src].imageObj = comImages[src].imageObj;
            }

            if (cb) {
                cb();
            }
        });
    }
};
