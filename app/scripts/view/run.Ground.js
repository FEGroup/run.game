run.Ground = (function () {
  'use strict';

  return run.View.extend({
    defaults: {
      model: null,
      id: -1,
      type: -1,
      width: 0,
      image: null
    },

    /**
     * @constructor
     * @param model GroundModel
     * @param type  그라운드 타입(땅, 장애물, 낭떠러지)
     * @param id    id
     */
    initialize: function (model, type, id) {
      this.id = id;
      this.type = type;

      switch (type) {
        case this.TYPE.BOTTOM:
          this.image = run.Sources.bg.imageObj;
          break;
        case this.TYPE.SECOND:

          break;
        case this.TYPE.THIRD:

          break;
        case this.TYPE.CLIFF:

          break;
        case this.TYPE.TRAP:

          break;
      }
    },

    draw: function () {

    }

  });
})();
