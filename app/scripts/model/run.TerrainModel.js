run.TerrainModel = (function () {

    return run.Class.extend({
        defaults: {
            TYPE: {
                BOTTOM: 0,
                SECOND: 1,
                THIRD: 2,
                CLIFF: 3,
                TRAP: 4
            },
            gMap: [],
            currentID: 0,
            startX: 0,
            endX: 0,
            Events: {
                CHANGE: 'terrain_change',
                REMOVE: 'terrain_remove'
            }
        },


        initialize: function () {
            this.gMap = [];
        },

        removeTerrain: function(target) {
            if (target === null) {
                return;
            }
            this.gMap.splice(this.gMap.indexOf(target), 1);
            this.dispatchEvent(new Event(this.Events.REMOVE));
        },

        addTerrain: function(obj){
            if (obj === null) {
                return;
            }
            this.currentID++;
            this.gMap.push(obj);
            this.dispatchEvent(new Event(this.Events.CHANGE));
        }
    });

})();
