run.TerrainModel = (function () {

    return run.Class.extend({
        defaults: {
            itemList: [],
            currentID: 0,
            endX: 0
        },


        initialize: function () {
            this.itemList = [];
        },

        removeItem: function(target) {
            if (target === null) {
                return;
            }

            this.itemList.splice(this.itemList.indexOf(target), 1);
        },

        addItem: function(target){
            if (target === null) {
                return;
            }

            this.currentID++;
            this.itemList.push(target);
        }
    });

})();
