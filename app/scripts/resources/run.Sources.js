run.Sources = (function () {
    'use strict';

     return {
        hero: {
            img: 'img/char.png',
            frames: {
                run : [
                    [44, 53, 16, 28, 0, 0, 0],
                    [62, 53, 16, 28, 0, 0, 0],
                    [81, 53, 16, 28, 0, 0, 0]
                ],
                jump: [
                    [119, 53, 16, 28, 0, 0, 0]
                ],
                dead : [
                    [225, 53, 16, 28, 0, 0, 0]
                ]
            },
            height : 27,
            width : 16,
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
            stages : [
                [0, 0, 256, 256, 0, 0, 0]
            ]
        }
    };
})();
