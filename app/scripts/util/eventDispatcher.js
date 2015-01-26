/**
 * Created by Naver on 2015-01-22.
 */
//----------------------------------------------------------------
//
//  EventDispatcher
//
//----------------------------------------------------------------
var EventDispatcher = EventDispatcher || {};

(function() {
  'use strict';

  EventDispatcher = run.Class.extend({
    initialize: function () {
      this.eventListenerObj = {};
    },
    addEventListener: function (type, callback) {
      if (typeof type !== 'string' || typeof callback !== 'function'){
        return;
      }
      this.eventListenerObj = this.eventListenerObj || {};
      console.log(this.eventListenerObj);
      console.log(this.eventListenerObj[type]);
      this.eventListenerObj[type] = this.eventListenerObj[type] || [];
      this.eventListenerObj[type].push(callback);
    },
    dispatchEvent: function (e) {
      if (this.eventListenerObj[e.type] === null){
        return;
      }

      for (var i in this.eventListenerObj[e.type]) {
        this.eventListenerObj[e.type][i](e);
      }
    },
    removeEventListner: function (type, callback) {
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
    },
    hasEventListener: function (type) {
      if (!this.eventListenerObj[type] || this.eventListenerObj[type].length === 0){
        return false;
      }
      return true;
    }
  });
})();
