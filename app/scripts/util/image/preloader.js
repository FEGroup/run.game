var PRE_LOADER = {
    preload: function (images, callback) {
        var loader = {}, src, length = 0, com = 0, tm;
        for (src in images) {
            length++;
            tm = loader[src] = new Image();
            tm.onload = function () {
                if (++com >= length) {
                    callback(loader);
                }
            }
            tm.src = images[src];
        }
    }
};
