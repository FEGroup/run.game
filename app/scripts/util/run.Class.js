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
      if(this.defaults){
        for(var prop in this.defaults){
          this[prop] = this.defaults[prop];
        }
      }

      if (this.initialize) {
        this.initialize.apply(this, arguments);
      }

    };

    var parentProto = NewClass.__super__ = this.prototype;

    var proto = create(parentProto);
    proto.constructor = NewClass;

    NewClass.prototype = proto;
    NewClass.prototype.__super__ = parentProto;

    if(!parentProto.initialize){
      NewClass.prototype.__super__.initialize = function(){};
    }


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



    // Defaults Methods

    NewClass.prototype.addEventListener = function (type, callback) {
      if (typeof type !== 'string' || typeof callback !== 'function'){
        return;
      }
      this.eventListenerObj = this.eventListenerObj || {};
      this.eventListenerObj[type] = this.eventListenerObj[type] || [];
      this.eventListenerObj[type].push(callback);
    };

    NewClass.prototype.dispatchEvent = function (e) {
      if (this.eventListenerObj[e.type] === null){
        return;
      }

      for (var i in this.eventListenerObj[e.type]) {
        this.eventListenerObj[e.type][i](e);
      }
    };

    NewClass.prototype.removeEventListener = function (type, callback) {
      if (!this.eventListenerObj[type]){
        return;
      }

      var index = this.eventListenerObj[type].indexOf(callback);
      if (index > -1) {
        this.eventListenerObj[type].splice(index, 1);
        if (this.eventListenerObj[type].length === 0){
          this.eventListenerObj[type] = null;
        }
      }
    };

    NewClass.prototype.hasEventListener = function (type) {
      if(!this.eventListenerObj[type] || this.eventListenerObj[type].length === 0){
        return false;
      }
      return true;
    };

    return NewClass;
  };
})();
