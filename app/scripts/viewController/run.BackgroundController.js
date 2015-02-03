run.BgController = (function () {
    'use strict';

    return run.ViewController.extend({

        defaults: {
            mainModel: null,
            model: null,
            ctx: null,
            typeObj: null,
            maps: null
        },

        initialize: function (ctx, mc) {
            this.ctx = ctx;
            this.model = mc.getModel(mc.MODEL.TERRAIN);
            this.mainModel = mc.getModel(mc.MODEL.MAIN);;
            this.typeObj = this.model.get('TYPE');
            this.maps = this.model.get('gMap');
            this.initSetting();
        },

        initSetting: function () {
            this.checkTerrain();
        },

        createTerrain: function (type, option) {
            var terrain, mapObj, id = this.model.get('currentID');

            switch (type) {
                case this.typeObj.BOTTOM:
                    terrain = new run.Terrain(this.model, type, id);

                    mapObj = {
                        terrain: terrain,
                        id: id,
                        x: this.model.get('endX'),
                        y: run.Config.TERRAIN_BOTTOM_Y
                    };

                    this.model.set('endX', this.model.get('endX') + terrain.width);
                    break;
                case this.typeObj.SECOND:

                    break;
                case this.typeObj.THIRD:

                    break;
                case this.typeObj.CLIFF:
                    terrain = new run.Terrain(this.model, type, id);

                    mapObj = {
                        terrain: terrain,
                        id: id,
                        x: this.model.get('endX'),
                        y: run.Config.TERRAIN_BOTTOM_Y
                    };

                    this.model.set('endX', this.model.get('endX') + terrain.width);
                    break;
                case this.typeObj.TRAP:

                    break;
            }

            return mapObj;
        },

        /**
         * 그라운드를 생성할 시기인지 판단해서 그라운드 그룹을 가져온다.
         */
        checkTerrain: function () {
            if (this.model.get('endX') - this.mainModel.get('speed') <= run.Config.STAGE_WIDTH) {
                var i = 0,
                    availTerrainArr = run.Rules.AVAILABLE_TERRAINS[this.mainModel.get('level')],
                    targetArr = run.Rules.TERRAIN_MAP_GROUP[Math.floor(Math.random() * availTerrainArr.length)];

                while (i < targetArr.length) {
                    this.model.addTerrain(this.createTerrain(targetArr[i]));
                    i++;
                }
                this.checkTerrain();
            }
        },

        update: function () {
            var i = 0, target, speed = this.mainModel.get('speed');

            this.checkTerrain();

            this.model.set('startX', this.model.get('startX') - speed);
            this.model.set('endX', this.model.get('endX') - speed);

            while (i < this.maps.length) {
                target = this.maps[i];
                target.x -= speed;
                if (target.x + target.terrain.width <= 0) {
                    this.model.removeTerrain(target);
                    continue;
                }
                target.terrain.draw(this.ctx, target.x, target.y);
                i++;
            }
        }
    })
})();
