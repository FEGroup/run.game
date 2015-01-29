run.HeroController = (function () {
    'use strict';

    return run.ViewController.extend({

        defaults: {
            hero: null,
            heroModel: null,
            terrainModel: null,
            ctx: null,
            terrainMap: null,
            name: '',
            src: null
        },

        /**
         * @constructor
         * @param ctx
         * @param model
         */
        initialize: function (ctx, mc) {
            this.heroModel = mc.getModel(mc.MODEL.HERO);
            this.terrainModel = mc.getModel(mc.MODEL.TERRAIN);
            this.terrainMap = this.terrainModel.get('gMap');
            this.hero = new run.Hero(this.heroModel);
            this.ctx = ctx;

            this.initSetting();
        },

        initSetting: function () {
            this.name = 'hero';
            this.src = run.Sources[this.name];
            this.scale = 0.5;
            this.setValue('currentFrame', 0);
            this.setValue('scale', this.scale);
            this.setPoint(100, 100);
            this.setValue('width', run.Sources.hero.imageObj.height * this.scale);
            this.setValue('height', run.Sources.hero.imageObj.height * this.scale);
            this.setMode(this.heroModel.MODE.J_MODE);
        },

        setValue: function (varName, value) {
            this.heroModel.set(varName, value);
        },

        setMode: function (mode) {
            this.setValue('mode', mode);
            this.setValue('totalFrames', this.src.frames[this.heroModel.mode].length);
        },

        initFrame: function () {
            this.setValue('currentFrame', 0);
        },

        update: function () {
            switch (this.heroModel.get('mode')) {
                case this.heroModel.MODE.J_MODE:
                    this.setValue('yVel', this.heroModel.get('yVel') + run.Config.get('GRAVITY'));
                    /**
                     * 1. 그라운드의 밑 부분 이 캐릭터 좌표상 위에 있을 때 캐릭터의 상체가 그 위로 올라갔는지(뚫고 올라갔는지 체크)
                     *    올라갔다면 y좌표를 그라운드 하단에 맞추고 yVel을 +값으로 셋팅
                     * 2. 그라운드가 이 캐릭터 범위에 포함되어 있을 때 그라운드 윗부분보다 케릭터가 높게 있다면
                     *    윗 부분에 닿았는지 체크 후 닿았다면 R_MODE로 변경
                     */
                    var i = 0,
                        rect = {x: this.heroModel.get('x'), y: this.heroModel.get('y') + this.heroModel.get('yVel'), width: this.heroModel.get('width'), height: this.heroModel.get('height')},
                        dest = null;

                    while(i < this.terrainMap.length){
                        dest = this.terrainMap[i].terrain;

                        if (dest.x + dest.width < rect.x || dest.x > rect.x + rect.width / 2){
                            i++;
                            continue;
                        }
                        if (rect.y > dest.y) {
                            this.setPoint(null, dest.y);
                            this.setValue('yVel', 0);
                            this.setMode(this.heroModel.MODE.R_MODE);

                            break;
                        }
                        i++;
                    }


                    this.setPoint(null, this.heroModel.get('y') + this.heroModel.get('yVel'));

                    break;
                case this.heroModel.MODE.R_MODE:

                    /**
                     * 1. 런모드일 경우 캐릭터 바닥에 그라운드가 있는지 없는지 체크 후 없다면 yVel을 0으로 셋팅하여 떨어뜨림
                     * 2. 떨어지면서 그라운드 체크
                     * 3. 스테이지 아랫부분을 벗어나면 엔딩
                     */
                    break;
                case this.heroModel.MODE.D_MODE:
                    break;
                default :

            }


            this.hero.draw(this.ctx, this.src);

            this.heroModel.nextFrame();
        },

        jump: function () {
            if (this.heroModel.get('mode') === this.heroModel.MODE.R_MODE) {
                this.setValue('currentFrame', 0);
                this.setValue('yVel', run.Config.get('INIT_JUMP_VELOCITY'));
                this.setMode(this.heroModel.MODE.J_MODE);
            }
        },

        setPoint: function (lx, ly) {
            if (lx !== null) {
                this.setValue('x', lx);
            }

            if (ly !== null) {
                this.setValue('y', ly);
            }
        }

    });
})();
