run.Hero = (function () {
  'use strict';

  return run.View.extend({
    MODE: {
      D_MODE: 'dead',
      R_MODE: 'run',
      J_MODE: 'jump'
    },

    defaults: {
      xVel: 5,
      yVel: 0,
      isJumping: false,
      moveLeft: false,
      moveRight: false,
      mode: '',
      model: null
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
      this._currentFrame = 0;
      this._scale = 0.5;
    },

    getSrc: function(mode, name){
      switch(mode){
        case this.MODE.J_MODE:
          return run.Sources[name].frames.jump;
        case this.MODE.R_MODE:
          return run.Sources[name].frames.run;
        case this.MODE.D_MODE:
          return run.Sources[name].frames.dead;
        default:
      }
    },

    draw: function () {
      var pos = this.getSrc(this.mode, this._name)[this._currentFrame];
      var x = this.model.get('x');
      var y = this.model.get('y');
      this._ctx.drawImage(run.Sources[this._name].imageObj,
      pos[0], pos[1], pos[2], pos[3],
      x, y, pos[2] * this._scale, pos[3] * this._scale);
    },

    initFrame: function () {
      this._currentFrame = 0;
    },

    update: function () {
      var characterGround = 20;
      switch (this.mode) {
        case this.MODE.J_MODE:
          this.yVel += run.Config.get('GRAVITY');
          /**
           * 1. 그라운드의 밑 부분 이 캐릭터 좌표상 위에 있을 때 캐릭터의 상체가 그 위로 올라갔는지(뚫고 올라갔는지 체크)
           *    올라갔다면 y좌표를 그라운드 하단에 맞추고 yVel을 +값으로 셋팅
           * 2. 그라운드가 이 캐릭터 x좌표에 포함되어 있을 때 그라운드 윗부분보다 케릭터가 높게 있다면
           *    윗 부분에 닿았는지 체크 후 닿았다면 해당 좌표에서 run
           */
          this.setPoint(null, this.model.get('y') + this.yVel);

          if (this.model.get('y') > characterGround) {
            this.setPoint(null, characterGround);
            this.yVel = 0;
            this.mode = this.MODE.R_MODE;
          }
          break;
        case this.MODE.R_MODE:
          /**
           * 1. 런모드일 경우 캐릭터 바닥에 그라운드가 있는지 없는지 체크 후 없다면 yVel을 0으로 셋팅하여 떨어뜨림
           * 2. 떨어지면서 그라운드 체크
           * 3. 스테이지 아랫부분을 벗어나면 엔딩
           */
          break;
        case this.MODE.D_MODE:
          break;
        default :

      }


      this.draw();
      this._currentFrame++;

      if (this._currentFrame >= this.getSrc(this.mode, this._name).length) {
        this._currentFrame = 0;
      }
    },

    jump: function () {
      if (this.mode === this.MODE.R_MODE) {
        this._currentFrame = 0;
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
