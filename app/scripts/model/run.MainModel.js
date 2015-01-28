(function () {
  var MainModel = run.Model.extend({

    defaults: {
      _speed: 0,
      _distance: 0
    },

    initialize: function () {

    }

  });

  run.MainModel = new MainModel;

})();
