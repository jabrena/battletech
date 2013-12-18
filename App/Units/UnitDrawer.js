define(['AppGlobals'],
function(appGlobals) {
   var _mapDetails;

   var _drawUnitAtLocation = function(unit, context) {
      var _xHexSize = _mapDetails.hexSize.width;
      var _yHexSize = _mapDetails.hexSize.height;
      var _radius = _mapDetails.hexRadius;

      var shiftY = 0;
      if (unit.location.column % 2 !== 0) {
         shiftY = _yHexSize / 2;
      }

      var x = _radius * Math.cos(Math.PI) + unit.location.column * _xHexSize  + _radius;
      var y = _radius * Math.sin(Math.PI) + unit.location.row * _yHexSize + shiftY;

      var screenWidth = appGlobals.camera.bounds.width;
      var screenHeight = appGlobals.camera.bounds.height;

      context.globalCompositeOperation = 'soucre-over';
      context.drawImage(unit.canvas, 0, 0, unit.canvas.width, unit.canvas.height,
                                     x, y, unit.canvas.width, unit.canvas.height);
   }

   var UnitDrawer = function(mapDetails) {
      _mapDetails = mapDetails;
   }

   UnitDrawer.prototype.drawUnits = function(context) {
      var units = appGlobals.units;

      var unitsToDraw = [];
      units.forEach(function(unit) {
         _drawUnitAtLocation(unit, context);
      });
   }

   return UnitDrawer;
   });