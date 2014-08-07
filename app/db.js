'use strict';
var datasources = require('./datasources'),
  current;

exports = module.exports = function(source) {
  if (!source) {
    if (!current) {
      // initialize the db state once
      console.log('DB STATE STARTED USING MEMORY DB');
      current = datasources.memory();
    }
  }

  return {
    get: function(id) {
      //console.log('current ' + id) ;
      return current.get(id);
    },
    set: function(id, object) {
      return current.set(id, object);
    }
  }
}