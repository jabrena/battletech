define(['Map/HexInitializer', 'Map/MapInitializer', 'Units/UnitInitializer', 'Events/MouseEventInitializer', 'Resources/MapOne'],
function(hexInitializer, mapInitializer, unitInitializer, mouseEventInitializer, mapOne) {
   'use strict';

   var InitApp = function() {
      var canvas = $('#myCanvas');
      mouseEventInitializer.initMouseEvents(canvas);
      canvas[0].width  = $(window).width();
      canvas[0].height = $(window).height();

      var terrainMatrix = mapOne.getTerrain();
      var mapDetails = {
            width: terrainMatrix[0].length,
            height: terrainMatrix.length,
            hexRadius: 50,
            terrainMatrix: terrainMatrix,
            hexSize: undefined, // use hexInitializer below
      }
      mapDetails.hexSize = hexInitializer.getHexSize(mapDetails.hexRadius);

      mapInitializer.initMap(mapDetails);
      unitInitializer.initUnits();

      //paper.view.draw();
   }();

});