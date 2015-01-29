run.GroundModel = (function () {

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
            stageEndX: 0,
            Events: {
                CHANGE: 'ground_change',
                REMOVE: 'ground_remove'
            }
        },


        initialize: function () {
        },

        addGround: function(obj){
            if (obj === null) {
                return;
            }
            this.currentID++;
            this.gMap.push(obj);
            this.dispatchEvent(new Event(this.Events.CHANGE));
        },

        getCurrentX: function (id) {
            var i = 0;
            while (i < this.gMap.length) {
                if (this.gMap[i].id === id) {
                    return this.gMap[i].x;
                }
            }
        }
    });

})();
