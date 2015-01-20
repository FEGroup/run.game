/**
 * Created by Naver on 2015-01-19.
 */
var RUNGAME = RUNGAME || {};

RUNGAME.bg = (function () {
  'use strict';
  var bg, fn, mode, image, x, y;

  function draw() {

  }

  fn = (bg = function (imageSrc) {
    image = imageSrc;
  }).prototype;

  fn.MODE = {
    D_MODE: "default",
    R_MODE: "run",
    J_MODE: "jump"
  };

  fn.update = function () {
    draw.apply(this);
  };

  fn.setPoint = function(lx, ly) {
    x = lx;
    y = ly;
  };

  fn.setMode = function(m){
    mode = m;
  }


  return bg;
})();
