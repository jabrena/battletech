define(['AppGlobals'], function(appGlobals) {
   'use strict';
   var _hexDrawer;

   var MapDrawer = function(hexDrawer) {
      _hexDrawer = hexDrawer;
   }

   MapDrawer.prototype.drawMap = function(grid, mapDetails)  {
      var mapCanvas = document.createElement("canvas");
      mapCanvas.width  = mapDetails.width * mapDetails.hexSize.width *.75;
      mapCanvas.height = (mapDetails.height * mapDetails.hexSize.height) + (mapDetails.hexSize.height / 2);
      var mapContext = mapCanvas.getContext('2d');

      for (var y = 0; y < mapDetails.height; y++) {
         for (var x = 0; x < mapDetails.width; x++) {
            var node = grid.getNodeAt(x, y);
            _hexDrawer.drawHex(node, mapContext);
         }
      }

        return mapCanvas;
    }

   return MapDrawer;
});