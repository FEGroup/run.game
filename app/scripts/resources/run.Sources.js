run.Sources = (function () {
    'use strict';

     return {
        hero: {
            img: 'img/hero.png',
            frames: {
                run: [[0, 0, 256, 256, 0, 0, 0], [256, 0, 256, 256, 0, 0, 0], [0, 256, 256, 256, 0, 0, 0], [256, 256, 256, 256, 0, 0, 0], [0, 512, 256, 256, 0, 0, 0], [256, 512, 256, 256, 0, 0, 0], [0, 768, 256, 256, 0, 0, 0], [256, 768, 256, 256, 0, 0, 0]],
                jump: [[0, 0, 256, 256, 0, 0, 0]],
                dead: [[0, 512, 256, 256, 0, 0, 0]]
            },
            imageObj: null
        },

        bottomGround: {
            img: 'img/ground.png',
            imageObj: null
        },

        bg: {
            img: 'img/bg.png',
            imageObj: null
        }
    };
})();
