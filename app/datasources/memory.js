// In memory data source
var objects = {};

exports = module.exports = function() {
  if (!objects) {
    objects = {}
  }
  return {
    get: function(id) {
      console.log(objects);
      return objects[id];
    },
    set: function(id, object) {
    	objects[id] = object;
    	return objects[id];
    }
  }
}