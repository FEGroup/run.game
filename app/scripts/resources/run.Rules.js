(function(){
    'use strict';

  /**
   * 게임의 난이도는 속도를 올리거나 내려서 조절한다.
   * 게임이 종료되는 시점은 케릭터가 죽거나, 제한시간이 종료되는 시점이다.
   * 맵 그룹을 정의해서 맵이 생성 될 때마다 해당 맵 그룹 중에 랜덤 그룹을 정해서 셋팅한다.
   */
    var Rules = run.Class.extend({

        defaults : {
            MINIMUM_CREATE_DIS: 60,
            GROUND_MAP_GROUP: [
                [0, 0, 0, 0, 0]
            ]
        },

        get : function(prop){
            if(this.hasOwnProperty(prop)){
                return this[prop];
            } else {
                throw new Error('no such config value' + prop);
            }
        }
    });

    // run.Rules is singleton
    run.Rules = new Rules();
})();
