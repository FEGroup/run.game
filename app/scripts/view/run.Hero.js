var run = run || {};

run.Hero = (function () {

  'use strict';
  var Hero, fn, mode, image, sequence, x, y;

  function draw() {
    //temporary image create

  }

  fn = (Hero = function (imageSrc, sequenceSrc) {
    image = imageSrc;
    sequence = sequenceSrc;
  }).prototype;

  fn.MODE = {
    D_MODE: "default",
    R_MODE: "run",
    J_MODE: "jump"
  };

  fn.update = function () {
    draw.apply(this);
  };

  fn.setPoint = function (lx, ly) {
    x = lx;
    y = ly;
  };

  fn.setMode = function (m) {
    mode = m;
  };

  fn.getImage = function () {

    return image;
  };


  return Hero;
})();
