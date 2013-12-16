define(['Map/HexInitializer', 'Map/MapInitializer', 'Units/UnitInitializer', 'Events/MouseEventInitializer'],
function(hexInitializer, mapInitializer, unitInitializer, mouseEventInitializer) {
   'use strict';

   var InitApp = function() {
      var canvas = $('#myCanvas');
      mouseEventInitializer.initMouseEvents(canvas);
      canvas[0].width  = $(window).width();
      canvas[0].height = $(window).height();

      var mapDetails = {
            width: 10,
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