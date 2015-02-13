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
            trapMap: [],
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
            this.trapMap = [];
        },

        removeTerrain: function(target) {
            if (target === null) {
                return;
            }
            var index = this.gMap.indexOf(target);
            this.gMap.splice(index, 1);
            this.trapMap.splice(index, 1);

            this.dispatchEvent(new Event(this.Events.REMOVE));
        },

        addTerrain: function(obj){
            if (obj === null) {
                return;
            }
            this.currentID++;
            this.gMap.push(obj);

            this.dispatchEvent(new Event(this.Events.CHANGE));
        },

        addTrap: function(obj) {
            this.trapMap.push(obj);
        }

    });

})();
