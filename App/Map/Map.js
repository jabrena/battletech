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
      _unitDrawer = new UnitDrawer(_mapDetails);
      _viewPort = new ViewPort(_mapDetails);
   }

   Map.prototype.draw = function(grid) {
      var onScreenCanvas = document.getElementById('myCanvas');
      var onScreenContext = onScreenCanvas.getContext('2d');
      
      var view = _viewPort.getView();

      onScreenContext.fillRect(0, 0, onScreenCanvas.width, onScreenCanvas.height);
     
      var screenWidth = appGlobals.camera.bounds.width;
      var screenHeight = appGlobals.camera.bounds.height;
      var viewingX = appGlobals.camera.view.x;
      var viewingY = appGlobals.camera.view.y;

      onScreenContext.drawImage(_offScreenMapCanvas, viewingX, viewingY, screenWidth, screenHeight,
                                                     0, 0, screenWidth, screenHeight);
   }

   Map.prototype.update = function(grid) {
      _unitDrawer.drawUnits(_offScreenMapCanvas.getContext('2d'));
   }

   Map.prototype.getDetails = function() {
      return _mapDetails;
   }

   return Map
   });
