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
            this.setValue('totalFrames', this.src.frames[this.heroModel.get('mode')].length);
        },

        initFrame: function () {
            this.setValue('currentFrame', 0);
        },

        update: function () {
            var rect = {
                    x: this.heroModel.get('x'),
                    y: this.heroModel.get('y') + this.heroModel.get('yVel'),
                    width: this.heroModel.get('width') * this.heroModel.get('scale'),
                    height: this.heroModel.get('height') * this.heroModel.get('scale')
                },
                candidateArr = this.getCollisionTerrain(rect);

            switch (this.heroModel.get('mode')) {
                case this.heroModel.MODE.J_MODE:
                    this.setValue('yVel', this.heroModel.get('yVel') + run.Config.get('GRAVITY'));

                    if (this.proceedCollision(candidateArr) === false) {
                        this.setPoint(null, this.heroModel.get('y') + this.heroModel.get('yVel'));
                    }

                    if (this.heroModel.get('y') > run.Config.get('STAGE_HEIGHT')) {
                        this.setMode(this.heroModel.MODE.D_MODE);
                    }
                    break;

                case this.heroModel.MODE.R_MODE:
                    this.proceedCollision(candidateArr);
                    break;

                case this.heroModel.MODE.D_MODE:
                    break;

                default:

            }


            this.hero.draw(this.ctx, this.src);

            this.heroModel.nextFrame();
        },

        proceedCollision: function(terrainArr) {
            var i = 0, terrain, result = false;

            if (terrainArr === null) {
                return;
            }

            while (i < terrainArr.length) {
                terrain = terrainArr[i];

                if (this.heroModel.get('mode') === this.heroModel.MODE.J_MODE && this.heroModel.get('yVel') >= 0) {
                    // 땅 위에 닿은건지 체크 y좌표 + height값 사이에 있다면 땅위에 착지
                    if (terrain.type === this.terrainModel.TYPE.BOTTOM ||
                        terrain.type === this.terrainModel.TYPE.SECOND ||
                        terrain.type === this.terrainModel.TYPE.THIRD) {

                        this.setPoint(null, terrain.y);
                        this.setValue('yVel', 0);
                        this.setMode(this.heroModel.MODE.R_MODE);
                        result = true;
                    }
                }

                // 장애물에 부딪혔는지 체크 - TRAP이면 무조건 사망, R_MODE에서 CLIFF면 사망
                if (terrain.type === this.terrainModel.TYPE.TRAP) {
                    this.setValue('yVel', 3);
                    this.setValue('currentFrame', 0);
                    this.setMode(this.heroModel.MODE.D_MODE);
                    result = true;
                    break;
                } else if (this.heroModel.get('mode') === this.heroModel.MODE.R_MODE && terrain.type === this.terrainModel.TYPE.CLIFF) {
                    this.setValue('yVel', 3);
                    this.setValue('currentFrame', 0);
                    this.setMode(this.heroModel.MODE.J_MODE);
                    result = true;
                    break;
                }
                i++
            }
            return result;
        },

        getCollisionTerrain: function(rect){
            var i = 0, terrain = null, arr = [];
            while (i < this.terrainMap.length) {
                terrain = this.terrainMap[i].terrain;
                if (terrain.type === this.terrainModel.TYPE.BOTTOM ||
                    terrain.type === this.terrainModel.TYPE.SECOND ||
                    terrain.type === this.terrainModel.TYPE.THIRD || terrain.type === this.terrainModel.TYPE.CLIFF) {

                    if (rect.x >= terrain.x && rect.x < terrain.x + terrain.width && rect.y >= terrain.y && rect.y <= terrain.y + terrain.height) {
                        arr.push(terrain);
                    }
                } else {

                }

                i++;
            }
            return arr;
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