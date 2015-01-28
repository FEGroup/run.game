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
      _map: [],
      _ctx: null,
      _currentID: 0
    },

    initialize: function () {

    },
    addGround: function(type, option) {
      this._currentID++;
      switch (type){
        case this.TYPE.BOTTOM:

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
      this._map.push();
    }
    //
    //dataUpdate: function () {
    //  dispatchEvent(new Event(run.Config.MOVE_EVENT));
    //},
    //
    //createGround: function (type, w) {
    //  var type = run.Config.GROUND_TYPE;
    //  switch (type) {
    //    case type.BOTTOM:
    //      break;
    //    case type.SECOND:
    //      break;
    //  }
    //  dispatchEvent(new Event(run.Config.CREATE_EVENT));
    //}

  });

})();
