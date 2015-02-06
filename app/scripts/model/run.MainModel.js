run.MainModel = (function () {
    return run.Class.extend({

        defaults: {
            speed: 0,
            distance: 0,
            level: 0,
            score : 100
        },

        initialize: function () {

        },

        addScore: function(score) {
            if (typeof score !== 'number') {
                return;
            }
            this.score += score;
        },

        addItemScore: function(kind) {
            switch (kind) {
                case 0:
                    this.score += 10;
                    break;
            }
        }
    });
})();
