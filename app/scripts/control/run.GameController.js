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
            this.initStage(stage);
            this._bindKeyEvents();
        },

        initStage : function(stage){
            this.stage = stage;
            this.stage.on('enterframe', this._tick.bind(this));
        },

        initModels : function (){
            this.modelCollection = new run.ModelCollection();
            this.oStackCollection = new run.StackCollection();

            this.model = new run.MainModel();
            this.heroModel = new run.HeroModel();

            this.modelCollection
                .set('main', this.model)
                .set('hero', this.heroModel)
                .set('terrain', new run.TerrainModel());

            this._initTerrain();
            this._initHero();
            this.setModelEvents();
        },

        setModelEvents: function(){
            this.heroModel.on('deadEvent', this._onDeadHero.bind(this));

            this.model
                .on('change:distance', function(){
                    this.model.set('score', this.model.get('distance') * 10);
                }.bind(this))
                .on('change:score', function(){
                    this.trigger('change:score');
                }.bind(this));
        },

        start : function(){
            this.stop();
            this._startAnimation();
        },

        stop : function(){
            this.stage.stop();
            this.initModels();
            this._initSetting();
        },

        pause : function(){
            this.stage.pause();
        },

        resume : function(){
            this.stage.animate();
        },

        getScore : function(){
            return this.model.get('score');
        },

        _startAnimation: function () {
            this.stage.animate();
        },

        _initSetting: function(){
            this.model.set('level', 0);
            this.model.set('speed', run.Rules.SPEED_OF_LEVEL[this.model.get('level')]);
        },

        _initTerrain: function () {
            this.terrainControl = new run.TerrainController(this.stage.getContext(), this.modelCollection);
            this.oStackCollection.add(this.terrainControl);
        },

        _initHero: function () {
            this.oHeroControl = new run.HeroController(this.stage.getContext(), this.modelCollection);
            this.oStackCollection.add(this.oHeroControl);
        },

        _onDeadHero: function() {
            this.model.set('speed', 0);
        },

        _initFrames : function (){
            this.oStackCollection.each(function (item){
                item.initFrame();
            });
        },

        _updateFrames : function(){
            this.oStackCollection.each(function (item) {
                item.update();
            });
        },

        _tick: function () {
            this.stage.clearContext();

            if (this.stage.startTime === 0) {
                return this._initFrames();
            }

            this._updateFrames();
            /**
             * 간 거리에 따라 Level set
             * Level에 따른 스피드 set
             * 스피드가 곧 거리 : 총 거리 = 현재 거리 + 스피드
             * score는 거리 * x로 구해도 될 듯
             */
            var nDistance = this.model.get('distance');
            this.model.set('distance', nDistance + this.model.get('speed'));
        },

        _bindKeyEvents: function () {
            $(window)
                .on('keydown', $.proxy(this._keyDownHandler, this))
                .on('keyup', $.proxy(this._keyUpHandler, this));
        },

        _keyDownHandler: function (e) {
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

        _keyUpHandler: function (e) {
            switch (e.keyCode) {
                case 37 :
                    //this.moveLeft = false;
                    break;
                // right
                case 39 :
                    //this.moveRight = false;
                    break;
            }
        }
    });
})();
