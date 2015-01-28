run.Class = (function () {
    'use strict';

    var _Class = function () {

    };

    _Class.extend = function (props) {
        var create = Object.create || (function () {
                function F() {
                }

                return function (proto) {
                    F.prototype = proto;
                    return new F();
                };
            })();

        var extend = function (dest) {
            var i, j, len, src;

            for (j = 1, len = arguments.length; j < len; j++) {
                src = arguments[j];
                for (i in src) {
                    dest[i] = src[i];
                }
            }
            return dest;
        };

        var Child = function () {
            var defaults;
            if (this.__super__ && this.__super__.defaults) {
                defaults = this.__super__.defaults;
                for (var prop in defaults) {
                    this[prop] = defaults[prop];
                }
            }
            if (this.defaults) {
                defaults = this.defaults;
                for (var prop in defaults) {
                    this[prop] = defaults[prop];
                }
            }

            if (this.initialize) {
                this.initialize.apply(this, arguments);
            }
        };

        var parentProto = Child.__super__ = this.prototype;

        var proto = create(parentProto);
        proto.constructor = Child;

        Child.prototype = proto;
        Child.prototype.__super__ = parentProto;

        if (!parentProto.initialize) {
            Child.prototype.__super__.initialize = function () {
            };
        }


        //inherit parent's statics
        for (var i in this) {
            if (this.hasOwnProperty(i) && i !== 'prototype') {
                Child[i] = this[i];
            }
        }

        // mix static properties into the class
        if (props.statics) {
            extend(Child, props.statics);
            delete props.statics;
        }

        // mix includes into the prototype
        if (props.includes) {
            extend.apply(null, [proto].concat(props.includes));
            delete props.includes;
        }

        // merge options
        if (proto.options) {
            props.options = extend(create(proto.options), props.options);
        }

        extend(proto, props);

        return Child;
    };


    // Default Function for run.Game
    return _Class.extend({
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

        dispatchEvent: function (e) {
            if (this.eventListenerObj[e.type] === null) {
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
