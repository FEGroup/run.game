run.StackCollection = (function () {
    return run.Class.extend({

        defaults: {
            updateStack: []
        },

        initialize: function () {
            this.updateStack = [];
        },

        add: function (model) {
            this.updateStack.push(model);
        },

        find: function () {

        },

        each: function (fn) {
            this.updateStack.forEach(fn);
        }
    });
})();
