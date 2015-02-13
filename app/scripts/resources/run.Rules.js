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
                [0, 0, 0, 0, 0], [0, 3, 0, 0], [0, 4, 0], [0, 0, 4, 0, 0, 4, 0, 0]
            ],

            AVAILABLE_TERRAINS: [
                [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]
            ],

            /**
             * 아이템 정보에 들어갈 내용
             * - 아이템 종류는 레벨에 따라 랜덤하게 부여함.
             * - 아이템 높이 값 - 땅으로부터의 거리 (계산하여 셋팅함) ITEMS_MAP에는 이 값만 정의
             * - 아이템 점수는 종류에 따라 다름
             */
            ITEMS_MAP: [
                [0, 0, 0, 0, 0, 0, 0], [0, 20, 40, 60, 40, 20, 0]
            ],

            ITEM_MAP_GROUP: [
                [0, 1]
            ],

            SPEED_OF_LEVEL: [15, 18, 20, 25, 30, 40, 50]
        }
    });

    // run.Rules is singleton
    return new Rules();
})();
