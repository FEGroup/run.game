run.GroundModel = (function () {

  return run.Model.extend({
    defaults: {
      _map: []
    },

    initialize: function () {


    },

    dataUpdate: function () {
      dispatchEvent(new Event(run.Config.MOVE_EVENT));
    },

    createGround: function (type, w) {
      var type = run.Config.GROUND_TYPE;
      switch (type) {
        case type.BOTTOM:
          break;
        case type.SECOND:
          break;
      }
      dispatchEvent(new Event(run.Config.CREATE_EVENT));
    }

  });

})();
