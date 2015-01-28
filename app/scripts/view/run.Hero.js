/**
 * Hero가 여러 종류 생길 수 있다는 가정하에
 * 추후 타입을 추가하자
 */
run.Hero = (function () {
  'use strict';

  return run.View.extend({

    defaults: {
      model: null
    },
    /**
     * @constructor
     * @param model
     */
    initialize: function (model) {
      this.model = model;
    },

    draw: function () {
      var name = this.model.get('name'),
        pos = this.model.getSrc(this.model.get('mode'), name)[this.model.get('currentFrame')],
        x = this.model.get('x'),
        y = this.model.get('y'),
        scale = this.model.get('scale'),
        rect = {x:x, y:y, w:pos[2] * scale, h:pos[3] * scale};

      // image center is bottom_center
      this.model.get('ctx').drawImage(run.Sources[name].imageObj,
        pos[0], pos[1], pos[2], pos[3],
        rect.x - rect.w / 2, rect.y - rect.h, rect.w, rect.h);
    }

  });
})();
