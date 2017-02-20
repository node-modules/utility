'use strict';

/**
 * High performance assign before node6
 * @param {Object} target - target object
 * @param {Object | Array} objects - object assign from
 * @return {Object} - return target object
 */
exports.assign = function(target, objects) {
  if (!Array.isArray(objects)) {
    objects = [ objects ];
  }

  for (let i = 0; i < objects.length; i++) {
    var obj = objects[i];
    if (obj) {
      const keys = Object.keys(obj);
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        target[key] = obj[key];
      }
    }
  }
  return target;
};
