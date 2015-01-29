run.GroundController = (function () {
    'use strict';

    return run.ViewController.extend({

        defaults: {
            mainModel: null,
            model: null,
            ctx: null,
            typeObj: null,
            maps: null,
            initBlock: 5
        },

        initialize: function (ctx, model) {
            this.model = model;
            this.ctx = ctx;
            this.mainModel = run.MainModel;
            this.typeObj = this.model.get('TYPE');
            this.maps = this.model.get('gMap');
            this.initSetting();
        },

        initSetting: function () {
            var i = 0;
            while(i < this.initBlock)
            {
                this.model.addGround(this.createGround(this.typeObj.BOTTOM));
                i++;
            }
        },

        createGround: function(type, option) {
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

                    break;
                case this.typeObj.TRAP:

                    break;
            }

            return mapObj;
        },

        /**
         * 그라운드를 생성할 시기인지 판단해서 그라운드 그룹을 가져온다.
         */
        checkGround: function(){

        },

        update: function () {
            var i = 0, map;
            this.checkGround();
            this.model.set('startX', this.model.get('startX') + this.mainModel.get('speed'));
            while(i < this.maps.length){
                map = this.maps[i];
                map.x -= this.mainModel.get('speed');
                map.ground.draw(this.ctx, map.x, map.y);
                i++;
            }
        }
    })
})();
