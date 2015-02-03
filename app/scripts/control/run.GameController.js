run.GameController = (function () {
    'use strict';

    return run.Class.extend({
        defaults: {
            startTime: 0,
            modelCollection: null,
            model: null,
            heroModel: null,
            oHeroControl: null,
            terrainControl: null,
            stage: null,
            oStackCollection: null
        },

        initialize: function (stage) {
            this.stage = stage;
            this.modelCollection = new run.ModelCollection();
            this.oStackCollection = new run.StackCollection();
            this.model = this.modelCollection.getModel(this.modelCollection.MODEL.MAIN);
            this.heroModel = this.modelCollection.getModel(this.modelCollection.MODEL.HERO);

            this.addEvents();
            this.bindKeyEvents();
            this.startGame();
        },

        addEvents: function(){
            this.stage.on('enterframe', this.tick.bind(this));
            this.heroModel.on('deadEvent', this.deadHero.bind(this));

            this.model.on('change:distance', function(){
                this.model.set('score', this.model.get('distance') * 10);
            }.bind(this));

            this.model.on('change:score', function(){
                this.trigger('change:score');
            }.bind(this));
        },

        startGame: function(){
            this.initTerrain();
            this.initHero();
            this.initSetting();
            this.startAnimation();
        },

        getScore : function(){
            return this.model.get('score');
        },

        startAnimation: function () {
            this.stage.animate();
        },

        initSetting: function(){
            this.model.set('level', 0);
            this.model.set('speed', run.Rules.SPEED_OF_LEVEL[this.model.get('level')]);
        },

        initTerrain: function () {
            this.terrainControl = new run.TerrainController(this.stage.getContext(), this.modelCollection);
            this.oStackCollection.add(this.terrainControl);
        },

        initHero: function () {
            this.oHeroControl = new run.HeroController(this.stage.getContext(), this.modelCollection);
            this.oStackCollection.add(this.oHeroControl);
        },

        deadHero: function() {
            this.model.set('speed', 0);
        },

        tick: function () {
            var oStackCollection = this.oStackCollection;

            this.stage.clearContext();

            if (this.stage.startTime === 0) {
                oStackCollection.each(function (item) {
                    if (item.initFrame && typeof item.initFrame === 'function') {
                        item.initFrame();
                    }
                });

                return;
            }

            oStackCollection.each(function (item) {
                if (item.update && typeof item.update === 'function') {
                    item.update();
                }
            });
            /**
             * 간 거리에 따라 Level set
             * Level에 따른 스피드 set
             * 스피드가 곧 거리 : 총 거리 = 현재 거리 + 스피드
             * score는 거리 * x로 구해도 될 듯
             */
            var nDistance = this.model.get('distance');
            this.model.set('distance', nDistance + this.model.get('speed'));
        },

        bindKeyEvents: function () {
            $(window)
                .on('keydown', $.proxy(this.keyDownHandler, this))
                .on('keyup', $.proxy(this.keyUpHandler, this));
        },

        keyDownHandler: function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 32 :// jump
                    this.oHeroControl.jump();
                    break;
                case 37 :// left
                    //this.moveLeft = true;
                    break;
                case 38 :// up
                    break;
                case 39 :// right
                    //this.moveRight = true;
                    break;
                case 40 :// down
                    break;
            }
        },

        keyUpHandler: function (e) {
            switch (e.keyCode) {
                case 37 :
                    //this.moveLeft = false;
                    break;
                // right
                case 39 :
                    //this.moveRight = false;
                    break;
            }
        },

        changeDepth: function (obj1, obj2) {
            var updateStack = this.updateStack;

            var index1 = updateStack.indexOf(obj1), index2 = updateStack.indexOf(obj2), tm1, tm2;
            if (index1 < 0 || index2 < 0) {
                return;
            }

            tm1 = updateStack[index1];
            tm2 = updateStack[index2];
            updateStack[index2] = tm1;
            updateStack[index1] = tm2;
        }
    });
})();
