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

        set: function (prop, val) {
            this[prop] = val;

            this.trigger('change:' + prop);
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

        trigger: function (type, obj) {
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


// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}
