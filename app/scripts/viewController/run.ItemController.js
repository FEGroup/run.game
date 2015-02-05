run.ItemController = (function () {
    'use strict';

    return run.ViewController.extend({
        defaults: {
            ctx: null,
            model: null,
            mainModel: null,
            maps: null
        },

        initialize: function (ctx, mc) {
            this.ctx = ctx;
            this.model = mc.getModel(mc.MODEL.ITEM);
            this.mainModel = mc.getModel(mc.MODEL.MAIN);
            this.maps = this.model.get('itemList');
            this._initSetting();
        },

        _initSetting: function() {

        },

        checkItem: function () {
            if (this.model.get('endX') - this.mainModel.get('speed') <= run.Config.STAGE_WIDTH) {
                this.addItemGroup(run.Rules.TERRAIN_MAP_GROUP[Math.floor(Math.random() * run.Rules.AVAILABLE_TERRAINS[this.mainModel.get('level')].length)]);
                this.checkItem();
            }
        },

        createItem: function(itemObj) {

        },

        addItemGroup: function(itemGroup) {
            var i = 0;

            while (i < itemGroup.length) {
                this.model.addItem(this.createItem(itemGroup[i]));
                i++;
            }
        },


        update: function () {
            var i = 0, target, speed = this.mainModel.get('speed');

            this.checkItem();

            while (i < this.maps.length) {
                target = this.maps[i];
                target.x -= speed;
                if (target.x + target.terrain.width <= 0) {
                    this.model.removeItem(target);
                    continue;
                }

                target.item.draw(this.ctx, target.x, target.y);

                if (i === this.maps.length - 1) {
                    this.model.set('endX', target.x + target.width);
                }

                i++;
            }
        }
    });

})();
