run.GroundModel = (function () {

  return run.Model.extend({
    defaults: {
      TYPE: {
        BOTTOM: 0,
        SECOND: 1,
        THIRD: 2,
        CLIFF: 3,
        TRAP: 4
      },
      gMap: [],
      ctx: null,
      currentID: 0,
      endX: 0
    },

    initialize: function (model) {
      this.model = model;
    },
    addGround: function(type, option) {
      var ground, mapObj;
      this.currentID++;

      switch (type) {
        case this.TYPE.BOTTOM:
          ground = new run.Ground(this.model, type, this.currentID);

          mapObj = {
            ground: ground,
            id: this.currentID,
            x: this.endX
          };

          this.endX += ground.width;
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
      this.gMap.push(mapObj);
    },

    getCurrentX: function(id) {
      //this.gMap.every(function(obj){
      //  obj.
      //}, this);
    }
  });

})();
