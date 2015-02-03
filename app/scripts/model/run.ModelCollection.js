run.ModelCollection = (function () {
    return run.Class.extend({

        defaults: {
            MODEL: {
                TERRAIN: 'terrain',
                HERO: 'hero',
                MAIN: 'main'
            }
        },

        initialize: function () {

        },

        getModel: function(type) {
            if (this[type]) {
                return this[type];
            }
        }
    });
})();

