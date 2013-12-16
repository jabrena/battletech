define(['AppGlobals', 'Map/MapDrawer', 'Map/HexDrawer', 'Map/ViewPort', 'Units/UnitDrawer'],
function(appGlobals, MapDrawer, HexDrawer, ViewPort, UnitDrawer) {
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
      var screenWidth = appGlobals.camera.bounds.width;
      var screenHeight = appGlobals.camera.bounds.height;
      var viewingX = appGlobals.camera.view.x;
      var viewingY = appGlobals.camera.view.y;
      
      onScreenContext.drawImage(_offScreenMapCanvas, viewingX, viewingY, screenWidth, screenHeight,
                                                     0, 0, screenWidth, screenHeight);
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
