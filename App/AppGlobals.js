define([], function() {
   'use strict';
   var pristineGrid;
   var activeGrid;
   var pathFinder;
   var map = {};
   var units = [];
   var camera = {}

   return {
      pristineGrid: pristineGrid,
      activeGrid: activeGrid,
      pathFinder: pathFinder,
      map: map,
      units: units,
      camera: camera
   };
})