define(['Map/HexPositionCalculator', 'Events/HexEvents'],
function(hexPositionCalculator, hexEvents) {
   'use strict';
   var _hexSides;
   var _radius;
   var _xHexSize;
   var _yHexSize;
   var _hexTypes;

	var _drawHex = function(xGrid, yGrid, hexCanvas, mapContext) {
	    var shiftY = 0;
		if (xGrid % 2 !== 0) {
		  shiftY = _yHexSize / 2;
		}

	    var x = _radius * Math.cos(Math.PI) + xGrid * _xHexSize  + _radius;
	    var y = _radius * Math.sin(Math.PI) + yGrid * _yHexSize + shiftY;

        mapContext.drawImage(hexCanvas, x, y);
	}

	var _drawSingleHex = function(mapContext, fill) {
		var part = 60;
		mapContext.beginPath();

		for (var hexSide = 0; hexSide <= _hexSides; hexSide++) {
		  var a = hexSide * part - 180;
		  var x = _radius * Math.cos(a * Math.PI / 180) + _radius;
		  var y = _radius * Math.sin(a * Math.PI / 180) + (_yHexSize / 2) + 1;
		  if (hexSide !== 0) {
		      mapContext.lineTo(x,y);
		  }
		}

      mapContext.closePath();
      mapContext.stroke();
      if (fill) {
         mapContext.fill();
      }
	}

	var _drawHexImage = function(mapContext, imageSrc) {
		var radius2x = _radius * 2;
		var image = new Image();
		image.src = imageSrc;
		mapContext.drawImage(image,
		 					 0, 0, image.width, image.height,
							 0, 0, radius2x, radius2x);
	}

   var _createHex = function(node, color) {
      var imageSrc = node.details.groundImage;
      var hexCanvas = document.createElement('canvas');
      hexCanvas.width = _radius * 2;
      hexCanvas.height = _radius * 2;
      var context = hexCanvas.getContext('2d');
      context.strokeStyle = color;
      context.lineWidth = 2;

      _drawSingleHex(context, true);
      context.globalCompositeOperation = 'source-in';
      _drawHexImage(context, imageSrc);
      context.globalCompositeOperation = 'source-over';
      _drawSingleHex(context, false);

      return hexCanvas;
   }

   var _getCorrectHexStatus = function(node) {
      var hexType = _hexTypes[node.details.groundImage];
      if(node.withinRange) {
         return hexType.withinRange;
      } else {
         return hexType.default;
      }
   }

   var _getImageCanvas = function(node) {
      var hexType = node.details.groundImage
      var hexCanvas = _hexTypes[hexType]
      if (!hexCanvas) {
         var defaultVersion = _createHex(node, 'transparent');
         var withinRangeVersion = _createHex(node, '99FF00');
         _hexTypes[hexType] = { default: defaultVersion,
                                         withinRange: withinRangeVersion };
      }
      return _getCorrectHexStatus(node);
   }

   var HexDrawer = function(mapDetails) { 
      _hexSides = 6;
      _radius = mapDetails.hexRadius;
      _xHexSize = mapDetails.hexSize.width;
      _yHexSize = mapDetails.hexSize.height;

      _hexTypes = [];
   }

   HexDrawer.prototype.drawHex = function(node, mapContext) {
      var hexCanvas = _getImageCanvas(node);
      _drawHex(node.x, node.y, hexCanvas, mapContext);
   }

   return HexDrawer;
});