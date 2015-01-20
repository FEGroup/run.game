/**
 * Created by Naver on 2015-01-19.
 */
var run = run || {};

run.Bg = (function () {
  'use strict';
  var Bg, fn, mode, image, x, y;

  function draw() {

  }

  fn = (Bg = function (imageSrc) {
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


  return Bg;
})();
