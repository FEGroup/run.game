var PRE_LOADER = {
  preload: function (images, callback) {
    var loader = {}, src, length = 0, com = 0, tm;
    for (src in images) {
      length++;
      loader[src] = {};
      tm = loader[src].imageObj = new Image();
      console.log(tm);
      tm.onload = function (e) {
        images[src].imageObj = e.currentTarget;
        if (++com >= length) {
          callback(loader);
        }
      };
      tm.src = images[src].img;
    }
  }
};
