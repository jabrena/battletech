define(['Map/HexInitializer', 'Map/MapInitializer', 'Units/UnitInitializer', 'Events/MouseEventInitializer'],
function(hexInitializer, mapInitializer, unitInitializer, mouseEventInitializer) {
   'use strict';

   var InitApp = function() {
      var canvas = $('#myCanvas');
      mouseEventInitializer.initMouseEvents(canvas);
      canvas[0].width  = window.screen.width;
      canvas[0].height = window.screen.height;

      var mapDetails = {
            width: 50,
            height: 50,
            hexRadius: 50,
            hexSize: undefined // use hexInitializer below
      }
      mapDetails.hexSize = hexInitializer.getHexSize(mapDetails.hexRadius);

      mapInitializer.initMap(mapDetails);
      //unitInitializer.initUnits();

      //paper.view.draw();
   }();
});