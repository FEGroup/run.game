run.HeroController = (function () {
    'use strict';

    return run.ViewController.extend({

        defaults: {
            ctx: null,
            mainModel: null,
            heroView: null,
            heroModel: null,
            itemModel: null,
            itemMap:null,
            terrainModel: null,
            terrainMap: null,
            name: '',
            src: null
        },

        /**
         * @constructor
         * @param ctx
         * @param modelCollection
         */
        initialize: function (ctx, modelCollection) {
            this.ctx = ctx;

            this.mainModel = modelCollection.getModel(modelCollection.MODEL.MAIN);
            this.heroModel = modelCollection.getModel(modelCollection.MODEL.HERO);
            this.terrainModel = modelCollection.getModel(modelCollection.MODEL.TERRAIN);
            this.itemModel = modelCollection.getModel(modelCollection.MODEL.ITEM);
            this.itemMap = this.itemModel.get('itemList');
            this.terrainMap = this.terrainModel.get('gMap');
            this.heroView = new run.Hero(this.heroModel);

            this._initSetting();
        },

        _initSetting: function () {
            this.name = 'hero';
            this.src = run.Sources[this.name];
            this.setPoint(100, -50);
            this.setValue('width', run.Sources.hero.width);
            this.setValue('height', run.Sources.hero.height);
            this.setMode(this.heroModel.MODE.J_MODE);
        },

        setValue: function (varName, value) {
            this.heroModel.set(varName, value);
        },

        setMode: function (mode) {
            this.setValue('mode', mode);
            this.setValue('totalFrames', this.src.frames[this.heroModel.get('mode')].length);
            this.initFrame();

            if (mode === this.heroModel.MODE.D_MODE) {
                this.heroModel.trigger('deadEvent');
            } else if (mode === this.heroModel.MODE.R_MODE) {
                this.setValue('isDoubleJumping', false);
            }
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
                candiTerrainArr = this.getCollisionTerrain(rect),
                candiItemArr = this.getCollisionItem(rect);

            switch (this.heroModel.get('mode')) {
                case this.heroModel.MODE.L_MODE:
                case this.heroModel.MODE.J_MODE:
                    this.setValue('yVel', this.heroModel.get('yVel') + run.Config.get('GRAVITY'));

                    if (this.isCollided(candiTerrainArr) === false) {
                        this.setPoint(null, this.heroModel.get('y') + this.heroModel.get('yVel'));
                    }

                    if (this.heroModel.get('y') > run.Config.get('STAGE_HEIGHT')) {
                        this.setMode(this.heroModel.MODE.D_MODE);
                    }
                    break;

                case this.heroModel.MODE.R_MODE:
                    this.isCollided(candiTerrainArr);
                    break;

                case this.heroModel.MODE.D_MODE:
                    break;

                default:

            }
            this.getItem(candiItemArr);
            this.heroView.draw(this.ctx, this.src);
            this.heroModel.nextFrame();
        },

        getItem: function(arr) {
            var that = this;
            arr.forEach(function(val, index, arr) {
                that.mainModel.addItemScore(val.kind);
                that.itemModel.removeItem(val);
            });
        },

        isCollided: function (terrainArr) {
            var i = 0, terrain, result = false;

            if (terrainArr === null) {
                return;
            }

            while (i < terrainArr.length) {
                terrain = terrainArr[i];

                if ((this.heroModel.get('mode') === this.heroModel.MODE.J_MODE || this.heroModel.get('mode') === this.heroModel.MODE.L_MODE) && this.heroModel.get('yVel') >= 0) {
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
                    //this.setValue('yVel', 3);
                    this.setMode(this.heroModel.MODE.D_MODE);
                    result = true;
                    break;
                }
                if (this.heroModel.get('mode') === this.heroModel.MODE.R_MODE && terrain.type === this.terrainModel.TYPE.CLIFF) {
                    this.setValue('yVel', 3);
                    this.setMode(this.heroModel.MODE.J_MODE);
                    result = true;
                    break;
                }

                i++;
            }
            return result;
        },

        getCollisionItem: function(rect) {
            var i = 0, item = null, arr = [];
            while (i < this.itemMap.length) {
                item = this.itemMap[i].item;

                if (this.AABB({
                        x: rect.x - rect.width / 2,
                        y: rect.y - rect.height,
                        width: rect.width,
                        height: rect.height
                    }, item) === true) {
                    arr.push(this.itemMap[i]);
                }
                i++;
            }
            return arr;
        },

        getCollisionTerrain: function (rect) {
            var i = 0, terrain = null, arr = [], prevRect = this.heroModel.prevRect, trapMap = this.terrainModel.get('trapMap'), trap;
            while (i < this.terrainMap.length) {
                terrain = this.terrainMap[i].terrain;

                if ((terrain.type === this.terrainModel.TYPE.BOTTOM && trapMap[i] === null) ||
                    terrain.type === this.terrainModel.TYPE.SECOND ||
                    terrain.type === this.terrainModel.TYPE.THIRD || terrain.type === this.terrainModel.TYPE.CLIFF) {

                    if ((rect.x >= terrain.x && rect.x < terrain.x + terrain.width && rect.y >= terrain.y && rect.y <= terrain.y + terrain.height) ||
                        this.AABB({
                            x: prevRect.x,
                            y: prevRect.y,
                            width: 1,
                            height: rect.y - prevRect.y
                        }, terrain) === true) {
                            arr.push(terrain);

                    }
                } else {
                    if (trapMap[i] !== null) {
                        trap = trapMap[i].terrain;
                        if (this.AABB({
                                x: rect.x - rect.width / 2,
                                y: rect.y - rect.height,
                                width: rect.width,
                                height: rect.height
                            }, trap) === true) {
                            arr.push(trap);
                        }
                    } else {
                        if (this.AABB({
                                x: rect.x - rect.width / 2,
                                y: rect.y - rect.height,
                                width: rect.width,
                                height: rect.height
                            }, terrain) === true) {
                            arr.push(terrain);
                        }
                    }


                }

                i++;
            }
            return arr;
        },

        AABB: function (a, b) {
            return (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.height + a.y > b.y);
        },

        jump: function () {
            var mode = this.heroModel.get('mode');
            if (mode === this.heroModel.MODE.R_MODE) {
                this.setValue('yVel', run.Config.get('INIT_JUMP_VELOCITY'));
                this.setMode(this.heroModel.MODE.J_MODE);
            } else if (mode === this.heroModel.MODE.J_MODE && this.heroModel.get('isDoubleJumping') === false) {
                this.setValue('isDoubleJumping', true);
                this.setValue('yVel', run.Config.get('INIT_JUMP_VELOCITY'));
                this.setMode(this.heroModel.MODE.L_MODE);
            }
        },

        moveRight: function () {
            this.setValue('x', this.heroModel.get('x') + this.heroModel.get('xVel'));
        },

        moveLeft: function () {
            this.setValue('x', this.heroModel.get('x') - this.heroModel.get('xVel'));
        },

        setPoint: function (lx, ly) {
            this.heroModel.prevRect = {
                x: this.heroModel.get('x'),
                y: this.heroModel.get('y'),
                w: this.heroModel.get('width'),
                h: this.heroModel.get('height')
            };
            if (lx !== null) {
                this.setValue('x', lx);
            }

            if (ly !== null) {
                this.setValue('y', ly);
            }

        }

    });
})();
