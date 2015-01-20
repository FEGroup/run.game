var run = run || {};
(function(){
  'use strict';

  run.Class = function () {};
  run.Class.extend = function (props) {

    var create = Object.create || (function () {
        function F() {}
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

    var NewClass = function () {
      if (this.initialize) {
        this.initialize.apply(this, arguments);
      }
    };

    var parentProto = NewClass.__super__ = this.prototype;

    var proto = create(parentProto);
    proto.constructor = NewClass;

    NewClass.prototype = proto;

    //inherit parent's statics
    for (var i in this) {
      if (this.hasOwnProperty(i) && i !== 'prototype') {
        NewClass[i] = this[i];
      }
    }

    // mix static properties into the class
    if (props.statics) {
      extend(NewClass, props.statics);
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

    return NewClass;
  };

})();
