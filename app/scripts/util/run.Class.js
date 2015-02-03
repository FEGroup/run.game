run.Class = (function () {
    'use strict';


    // Default Function for run.Game
    return ClassUtil.extend({
        // Defaults Methods
        get: function (prop) {
            if (this.hasOwnProperty(prop)) {
                return this[prop];
            } else {
                throw new Error('no such config value : ' + prop);
            }
        },

        set : function(prop, val){
            this[prop] = val;

            this.trigger('change:'+prop);
            return this;
        },

        addEventListener: function (type, callback) {
            if (typeof type !== 'string' || typeof callback !== 'function') {
                return;
            }
            this.eventListenerObj = this.eventListenerObj || {};
            this.eventListenerObj[type] = this.eventListenerObj[type] || [];
            this.eventListenerObj[type].push(callback);
        },

        removeEventListener: function (type, callback) {
            if (!this.eventListenerObj[type]) {
                return;
            }

            var index = this.eventListenerObj[type].indexOf(callback);
            if (index > -1) {
                this.eventListenerObj[type].splice(index, 1);
                if (this.eventListenerObj[type].length === 0) {
                    this.eventListenerObj[type] = null;
                }
            }
        },

        on: function (type, callback) {
            this.addEventListener(type, callback);
            return this;
        },

        off: function (type, callback) {
            this.removeEventListener(type, callback);
            return this;
        },

        trigger : function(type, obj){
            this.dispatchEvent(new Event(type), obj);
        },

        dispatchEvent: function (e) {
            if (!this.eventListenerObj || this.eventListenerObj.hasOwnProperty(e.type) === false) {
                return;
            }
            for (var i in this.eventListenerObj[e.type]) {
                this.eventListenerObj[e.type][i].apply(null, arguments);
            }
        },

        hasEventListener: function (type) {
            if (!this.eventListenerObj[type] || this.eventListenerObj[type].length === 0) {
                return false;
            }
            return true;
        }
    });
})();
