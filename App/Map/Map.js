define(['Map/MapDrawer', 'Map/HexDrawer', 'Map/ViewPort', 'Units/UnitDrawer'],
function(MapDrawer, HexDrawer, ViewPort, UnitDrawer) {
   'use strict'
   var _mapDetails;
   var _mapDrawer;
   var _unitDrawer;
   var _viewPort;
   var _offScreenMapCanvas;

   var Map = function(mapDetails, grid) {
      _mapDetails = mapDetails;

      var hexDrawer = new HexDrawer(_mapDetails);
      _mapDrawer = new MapDrawer(hexDrawer);
      _offScreenMapCanvas = _mapDrawer.drawMap(grid, _mapDetails);
      //_unitDrawer = new UnitDrawer();
      _viewPort = new ViewPort(_mapDetails);
   }

   var x = 0;
   var y = 0;
   Map.prototype.draw = function(grid) {
      var view = _viewPort.getView();
      //_unitDrawer.drawUnits(view);
      var onScreenCanvas = document.getElementById('myCanvas');
      var onScreenContext = onScreenCanvas.getContext('2d');
      onScreenContext.fillRect(0, 0, onScreenCanvas.width, onScreenCanvas.height);
      //onScreenContext.drawImage(_offScreenMapCanvas, source_x, source_y, source_width, source_height,
      //                                               dest_x, dest_y, dest_width, dest_height);
      onScreenContext.drawImage(_offScreenMapCanvas, x, y, 1000, 500,
                                                     0, 0, 1000, 500);
      x += 10;
      y += 10;
   }

   Map.prototype.clear = function(grid) {
      
   }

   Map.prototype.getDetails = function() {
      return _mapDetails;
   }

   return Map
   });
