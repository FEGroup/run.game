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

        _initSetting: function () {

        },

        checkItem: function () {
            if (this.model.get('endX') - this.mainModel.get('speed') <= run.Config.STAGE_WIDTH) {
                var candidArr = run.Rules.ITEM_MAP_GROUP[this.mainModel.get('level')];
                this.addItemGroup(run.Rules.ITEMS_MAP[candidArr[Math.floor(Math.random() * candidArr.length)]]);
                this.checkItem();
            }
        },

        createItem: function (itemY, kind) {

            var obj;
            if (kind === 0) {
                obj = {
                    x: this.model.get('endX') + run.Config.ITEM_INTERVAL_X,
                    y: run.Config.TERRAIN_BOTTOM_Y - itemY - 20,
                    id: this.model.get('currentID'),
                    kind: kind,
                    item: new run.Item(run.Sources.item.imageObj, run.Sources.item.frames.normalCoin)
                };

                this.model.set('endX', this.model.get('endX') + run.Config.ITEM_INTERVAL_X);
            } else {

            }


            return obj;
        },

        addItemGroup: function (itemGroup) {
            var i = 0, kind = 0;
            /**
             * 랜덤한 종류로 추가 필요
             */
            while (i < itemGroup.length) {
                this.model.addItem(this.createItem(itemGroup[i], kind));
                i++;
            }
        },

        update: function () {
            var i = 0, target, speed = this.mainModel.get('speed');

            this.checkItem();

            while (i < this.maps.length) {
                target = this.maps[i];
                target.x -= speed;
                if (target.x + target.item.width <= 0) {
                    this.model.removeItem(target);
                    continue;
                }

                target.item.draw(this.ctx, target.x, target.y);

                i++;
            }
            this.model.set('endX', this.model.get('endX') - speed);
        }
    });
})();
