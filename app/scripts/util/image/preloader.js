run.PRE_LOADER = {
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
  }
};
