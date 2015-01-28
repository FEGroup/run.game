run.Model = (function(){

  return run.Class.extend({

    initialize : function(){

    },

    get : function(prop){
      var dist = "_" + prop;
      if(this.hasOwnProperty(dist)){
        return this[dist];
      } else {
        throw new Error('no such config value' + dist);
      }
    },

    set : function(prop, val){
      this["_" + prop] = val;
    }
  });

})();
