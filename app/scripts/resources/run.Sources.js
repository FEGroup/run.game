run.Sources = (function () {
    'use strict';

    return {
        hero: {
            img: 'img/char.png',
            frames: {
                run: [
                    [44, 53, 16, 28, 0, 0, 0],
                    [62, 53, 16, 28, 0, 0, 0],
                    [81, 53, 16, 28, 0, 0, 0]
                ],
                jump: [
                    [119, 53, 16, 28, 0, 0, 0]
                ],

                doubleJump : [
                    [703, 0, 22, 26, 0, 0, 0],
                    [727, 0, 22, 26, 0, 0, 0],
                    [749, 0, 22, 26, 0, 0, 0],
                    [770, 0, 22, 26, 0, 0, 0],
                    [794, 0, 22, 26, 0, 0, 0],
                    [817, 0, 22, 26, 0, 0, 0],
                    [840, 0, 22, 26, 0, 0, 0],
                    [863, 0, 22, 26, 0, 0, 0]
                ],

                dead: [
                    [225, 53, 16, 28, 0, 0, 0]
                ]
            },
            height: 27,
            width: 16,
            imageObj: null
        },

        bottomTerrain: {
            img: 'img/bg2.png',
            frames: {
                bg: [
                    [431, 373, 60, 33]
                ]
            },
            imageObj: null
        },

        bg: {
            img: 'img/bg.png',
            imageObj: null,
            stages: {
                wood : [
                    [0, 0, 256, 256, 0, 0, 0]
                ]
            }
        },

        trap: {
            img: 'img/bg2.png',
            frames: {
                trap1: [
                    [13, 152, 16, 16], [31, 152, 16, 16], [49, 152, 16, 16], [67, 152, 16, 16]
                ]
            },

            imageObj: null
        },

        item: {
            img: 'img/bg2.png',
            frames: {
                normalCoin: [
                    [140, 48, 6, 16], [147, 48, 10, 16], [158, 48, 14, 16], [173, 48, 10, 16]
                ]
            },

            imageObj: null
        }

    };
})();
