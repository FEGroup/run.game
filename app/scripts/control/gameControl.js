var RUNGAME = RUNGAME || {};
RUNGAME.gameControl = (function () {
    var gameControl, fn, canvas = document.getElementById("canvas"), ctx = canvas.getContext('2d'), images, hero;

    canvas.addEventListener("keydown", keyDownHandler, false);

    function keyDownHandler(e) {
        console.log(e.keyCode);
    }

    function init() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 800, 600);

        hero = new RUNGAME.hero();

    }

    function preloadCom(comImages) {
        images = comImages;
        init();
    }

    fn = (gameControl = function () {
    }).prototype;

    PRE_LOADER.preload(srcImages, preloadCom);


    return gameControl;

})();
