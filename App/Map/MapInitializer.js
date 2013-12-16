define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/Map', 'Events/MapScrollEvents'], 
function(appGlobals, Grid, PathFinder, Map, MapScrollEvents) {
   'use strict';
   var initMap = function(mapDetails) {
      appGlobals.camera = {
         bounds: {
            width: $(window).width(),
            height: $(window).height()
         },
         view: {
            x: 0,
            y: 0
         }
      };

      appGlobals.pathFinder = new PathFinder();
      appGlobals.pristineGrid = new Grid(mapDetails.width, mapDetails.height); 
      appGlobals.activeGrid = appGlobals.pristineGrid.clone();

      appGlobals.map = new Map(mapDetails, appGlobals.pristineGrid);
      appGlobals.map.draw(appGlobals.pristineGrid);
   }

   return { initMap: initMap };
});