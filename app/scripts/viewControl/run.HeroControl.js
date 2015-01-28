run.HeroControl = (function () {
  'use strict';

  return run.ViewControl.extend({

    defaults: {
      _hero: null
    },

    /**
     * @constructor
     * @param ctx
     * @param model
     */
    initialize: function(ctx, model){
      this.model = model;
      this._hero = new run.Hero(this.model);

      this.setValue('ctx', ctx);
      this.setValue('name', 'hero');
      this.setValue('currentFrame', 0);
      this.setValue('scale', 0.5);
      this.setPoint(100, 100);
      this.setMode(this.model.MODE.R_MODE);
    },
    setValue: function(varName, value){
      this.model.set(varName, value);
    },
    setMode: function(mode){
      this.setValue('mode', mode);
      this.setValue('totalFrames', this.model.getSrc(this.model.get('mode'), this.model.get('name')).length);
    },

    initFrame: function () {
      this.setValue('currentFrame', 0);
    },

    update: function () {
      var characterGround = 100;
      switch (this.model.get('mode')) {
        case this.model.MODE.J_MODE:
          this.setValue('yVel', this.model.get('yVel') + run.Config.get('GRAVITY'));
          /**
           * 1. 그라운드의 밑 부분 이 캐릭터 좌표상 위에 있을 때 캐릭터의 상체가 그 위로 올라갔는지(뚫고 올라갔는지 체크)
           *    올라갔다면 y좌표를 그라운드 하단에 맞추고 yVel을 +값으로 셋팅
           * 2. 그라운드가 이 캐릭터 x좌표에 포함되어 있을 때 그라운드 윗부분보다 케릭터가 높게 있다면
           *    윗 부분에 닿았는지 체크 후 닿았다면 해당 좌표에서 run
           */
          this.setPoint(null, this.model.get('y') + this.model.get('yVel'));

          if (this.model.get('y') > characterGround) {
            this.setPoint(null, characterGround);
            this.setValue('yVel', 0);
            this.setMode(this.model.MODE.R_MODE);
          }
          break;
        case this.model.MODE.R_MODE:
          /**
           * 1. 런모드일 경우 캐릭터 바닥에 그라운드가 있는지 없는지 체크 후 없다면 yVel을 0으로 셋팅하여 떨어뜨림
           * 2. 떨어지면서 그라운드 체크
           * 3. 스테이지 아랫부분을 벗어나면 엔딩
           */
          break;
        case this.model.MODE.D_MODE:
          break;
        default :

      }


      this._hero.draw();
      this.model.nextFrame();
    },

    jump: function () {
      if (this.model.get('mode') === this.model.MODE.R_MODE) {
        this.setValue('currentFrame', 0);
        this.setValue('yVel', run.Config.get('INIT_JUMP_VELOCITY'));
        this.setMode(this.model.MODE.J_MODE);
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
