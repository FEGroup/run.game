run.Hero = (function () {
    'use strict';

    return run.Class.extend({
        MODE: {
            D_MODE: 'default',
            R_MODE: 'run',
            J_MODE: 'jump'
        },

        defaults: {
            xVel: 5,
            yVel: run.Config.get('INIT_JUMP_VELOCITY'),
            isJumping: false,
            moveLeft: false,
            moveRight: false,
            _currentFrame: 0,
            _name: '',
            _ctx: null
        },

        /**
         * @constructor
         * @param ctx
         * @param model
         */
        initialize: function (ctx, model) {
            this._ctx = ctx;
            this._name = 'hero';

            this.model = model;
            this.mode = this.MODE.R_MODE;
        },

        _draw: function () {
            var src = run.Sources[this._name];

            this._ctx.drawImage(src.imageObj,
                src.frames[this._currentFrame][0], src.frames[this._currentFrame][1], src.frames[this._currentFrame][2], src.frames[this._currentFrame][3],
                this.model.get('x'), this.model.get('y'), src.frames[this._currentFrame][2], src.frames[this._currentFrame][3]);
        },

        initFrame: function () {
            this._currentFrame = 0;
        },

        update: function () {
            var characterGround = 20;
            //var characterWidth = 30;
            //
            //if (this.moveLeft) {
            //  this.x -= this.xVel;
            //  if (this._scaleX > 0) {
            //    this._scaleX *= -1;
            //    this.x += characterWidth;
            //  }
            //} else if (this.moveRight) {
            //  this.x += this.xVel;
            //  if (this._scaleX < 0) {
            //    this._scaleX *= -1;
            //    this.x -= characterWidth;
            //  }
            //}

            if (this.mode === this.MODE.J_MODE) {

                this.yVel += run.Config.get('GRAVITY');
                //-------------------------------------------------------------------------------------------------------------------------------
                // 1. 그라운드의 밑 부분 이 캐릭터 좌표상 위에 있을 때 캐릭터의 상체가 그 위로 올라갔는지(뚫고 올라갔는지 체크)
                //    올라갔다면 y좌표를 그라운드 하단에 맞추고 yVel을 +값으로 셋팅
                //
                // 2. 그라운드가 이 캐릭터 x좌표에 포함되어 있을 때 그라운드 윗부분보다 케릭터가 높게 있다면
                //    윗 부분에 닿았는지 체크 후 닿았다면 해당 좌표에서 run
                //-------------------------------------------------------------------------------------------------------------------------------

                this.setPoint(null, this.model.get('y') + this.yVel);

                if (this.model.get('y') > characterGround) {
                    this.setPoint(null, characterGround);
                    this.mode = this.MODE.R_MODE;
                }
            }
            //-------------------------------------------------------------------------------------------------------------------------------
            // 1. 런모드일 경우 캐릭터 바닥에 그라운드가 있는지 없는지 체크 후 없다면 yVel을 0으로 셋팅하여 떨어뜨림
            // 2. 떨어지면서 그라운드 체크
            // 3. 스테이지 아랫부분을 벗어나면 엔딩
            //-------------------------------------------------------------------------------------------------------------------------------

            this._draw();
            this._currentFrame++;

            if (this._currentFrame >= run.Sources[this._name].frames.length) {
                this._currentFrame = 0;
            }
        },

        jump: function () {
            if (this.mode === this.MODE.R_MODE) {
                this.yVel = run.Config.get('INIT_JUMP_VELOCITY');
                this.mode = this.MODE.J_MODE;
            }
        },

        setPoint: function (lx, ly) {

            if (lx !== null) {
                this.model.set('x', lx);
            }

            if (ly !== null) {
                this.model.set('y', ly);
            }
        },

        setMode: function (m) {
            this.mode = m;
        },

        getSrcName: function () {
            return this._name;
        }
    });
})();
