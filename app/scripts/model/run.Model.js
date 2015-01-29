run.Model = (function () {

    return run.Class.extend({

        initialize: function () {

        },

        get : function(prop){
            if(this.hasOwnProperty(prop)){
                return this[prop];
            } else {
                throw new Error('no such config value' + prop);
            }
        },

        set : function(prop, val){
            this[prop] = val;
        }
    });
})();
