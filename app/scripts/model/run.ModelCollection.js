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
            this[this.MODEL.MAIN] = new run.MainModel();
            this[this.MODEL.TERRAIN] = new run.TerrainModel();
            this[this.MODEL.HERO] = new run.HeroModel();
        },

        getModel: function(type) {
            if (this[type]) {
                return this[type];
            }
        }
    });
})();

