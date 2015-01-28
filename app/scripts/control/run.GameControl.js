run.GameControl = (function () {
    'use strict';

    return run.Class.extend({
        defaults: {
            startTime: 0,
            _model: null,
            _oHeroControl: null,
            _groundControl: null
        },

        initialize: function (stage) {
            this._stage = stage;

            this.oStackCollection = new run.StackCollection();

            this.initGround();
            this.initHero();

            this.bindKeyEvents();

            this._model = run.MainModel;

            this._stage.on('enterframe', this.tick.bind(this));
            this.startAnimation();
        },

        startAnimation: function () {
            this._stage.animate();
        },

        initGround: function () {
            this._groundControl = new run.GroundControl(this._stage.getContext(), new run.GroundModel());
            this.oStackCollection.add(this._groundControl);
        },

        initHero: function () {
            this._oHeroControl = new run.HeroControl(this._stage.getContext(), new run.HeroModel());
            this.oStackCollection.add(this._oHeroControl);
        },

        tick: function () {
            var oStackCollection = this.oStackCollection;

            if (this._stage.startTime === 0) {
                oStackCollection.each(function (item) {
                    if (item.initFrame && typeof item.initFrame === 'function') {
                        item.initFrame();
                    }
                });

                return;
            }

            this._stage.clearContext();

            oStackCollection.each(function (item) {
                if (item.update && typeof item.update === 'function') {
                    item.update();
                }
            });
            /**
             * 1. 간 거리에 따라 Level set
             * 2. Level에 맞게 랜덤으로 그라운드 및 아이템 적들을 생성해 준다.
             * 3. Level에 따른 스피드 set
             * 4. 스피드가 곧 거리 - 총 거리 = 현재 거리 + 스피드
             */
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
                    this._oHeroControl.jump();
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
