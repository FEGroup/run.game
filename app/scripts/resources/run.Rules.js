run.Rules = (function(){
    'use strict';

  /**
   * 게임의 난이도는 속도를 올리거나 내려서 조절한다.
   * 게임이 종료되는 시점은 케릭터가 죽거나, 제한시간이 종료되는 시점이다.
   * 맵 그룹을 정의해서 맵이 생성 될 때마다 해당 맵 그룹 중에 랜덤 그룹을 정해서 셋팅한다.
   */
    /**
     * 그라운드 종류
     *
     * BOTTOM: 0,
     * SECOND: 1,
     * THIRD: 2,
     * CLIFF: 3,
     * TRAP: 4
     */
    var Rules = run.Class.extend({

        defaults : {
            MINIMUM_CREATE_DIS: 60,
            TERRAIN_MAP_GROUP: [
                [0, 0, 0, 0, 0], [0, 3, 0, 0], [0, 0, 4, 0, 0, 4, 0, 0]
            ],

            AVAILABLE_TERRAINS: [
                [0, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]
            ],

            SPEED_OF_LEVEL: [15, 18, 20, 25, 30, 40, 50]
        }
    });

    // run.Rules is singleton
    return new Rules();
})();
