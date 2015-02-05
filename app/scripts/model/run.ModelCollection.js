run.ModelCollection = (function () {
    return run.Class.extend({

        defaults: {
            MODEL: {
                TERRAIN: 'terrain',
                ITEM: 'item',
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

