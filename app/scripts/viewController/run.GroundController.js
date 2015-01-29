run.GroundController = (function () {
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
            this.model = mc.getModel(mc.MODEL.GROUND);
            this.mainModel = mc.getModel(mc.MODEL.MAIN);;
            this.typeObj = this.model.get('TYPE');
            this.maps = this.model.get('gMap');
            this.initSetting();
        },

        initSetting: function () {
            this.checkGround();
        },

        createGround: function (type, option) {
            var ground, mapObj, id = this.model.get('currentID');

            switch (type) {
                case this.typeObj.BOTTOM:
                    ground = new run.Ground(this.model, type, id);

                    mapObj = {
                        ground: ground,
                        id: id,
                        x: this.model.get('endX'),
                        y: run.Config.GROUND_BOTTOM_Y
                    };

                    this.model.set('endX', this.model.get('endX') + ground.width);
                    break;
                case this.typeObj.SECOND:

                    break;
                case this.typeObj.THIRD:

                    break;
                case this.typeObj.CLIFF:
                    ground = new run.Ground(this.model, type, id);

                    mapObj = {
                        ground: ground,
                        id: id,
                        x: this.model.get('endX'),
                        y: run.Config.GROUND_BOTTOM_Y
                    };

                    this.model.set('endX', this.model.get('endX') + ground.width);
                    break;
                case this.typeObj.TRAP:

                    break;
            }

            return mapObj;
        },

        /**
         * 그라운드를 생성할 시기인지 판단해서 그라운드 그룹을 가져온다.
         */
        checkGround: function () {
            if (this.model.get('endX') - this.mainModel.get('speed') <= run.Config.STAGE_WIDTH) {
                var i = 0,
                    availGroundArr = run.Rules.AVAILABLE_GROUNDS[this.mainModel.get('level')],
                    targetArr = run.Rules.GROUND_MAP_GROUP[Math.floor(Math.random() * availGroundArr.length)];

                while (i < targetArr.length) {
                    this.model.addGround(this.createGround(targetArr[i]));
                    i++;
                }
                this.checkGround();
            }
        },

        removeGround: function(target) {
            this.maps.splice(this.maps.indexOf(target), 1);
        },

        update: function () {
            var i = 0, target, speed = this.mainModel.get('speed');

            this.checkGround();

            this.model.set('startX', this.model.get('startX') - speed);
            this.model.set('endX', this.model.get('endX') - speed);

            while (i < this.maps.length) {
                target = this.maps[i];
                target.x -= speed;
                if (target.x + target.ground.width <= 0) {
                    this.removeGround(target);
                    continue;
                }
                target.ground.draw(this.ctx, target.x, target.y);
                i++;
            }
        }
    })
})();
