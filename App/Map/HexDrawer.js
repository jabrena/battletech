define(['Map/HexPositionCalculator'],
function(hexPositionCalculator) {
	'use strict';
	var _hexSides;
	var _radius;
	var _xHexSize;
	var _yHexSize;
	var _hexTypes;

	var _drawHex = function(xGrid, yGrid, hexCanvas, mapContext) {
	    var shiftY = 0;
		if (xGrid % 2 !== 0) {
		  var shiftY = _yHexSize / 2;
		}

		var a = 180;
	    var x = _radius * Math.cos(a * Math.PI / 180) + xGrid * _xHexSize;
	    var y = _radius * Math.sin(a * Math.PI / 180) + yGrid * _yHexSize + shiftY;

        mapContext.drawImage(hexCanvas, x, y);
	}

	var _drawSingleHex = function(mapContext) {
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
		mapContext.fill();
	}

	var _drawHexImage = function(mapContext) {
		var radius2x = _radius * 2;
		var image = new Image();
		image.src = 'Images/clayGround.jpg';
		mapContext.drawImage(image,
		 					 0, 0, image.width, image.height,
							 0, 0, radius2x, radius2x);
	}

	var _createHex = function() {
		var hexCanvas = document.createElement('canvas');
		hexCanvas.width = _radius * 2;
		hexCanvas.height = _radius * 2;
		var context = hexCanvas.getContext('2d');

		_drawHexImage(context);
		context.globalCompositeOperation = 'destination-in';
		_drawSingleHex(context);

		return hexCanvas;
	}

	var _getImageCanvas = function(nodeType) {
		var hexCanvas = _hexTypes[nodeType]
		if (!hexCanvas) {
			hexCanvas = _createHex();
			 _hexTypes[nodeType] = hexCanvas;
		}
		return _hexTypes[nodeType];
	}

	var HexDrawer = function(mapDetails) { 
	    _hexSides = 6;
	    _radius = mapDetails.hexRadius;
	    _xHexSize = _radius*Math.sqrt(2.25);
	    _yHexSize = _radius*Math.sqrt(3);

	    _hexTypes = [];
	}

	HexDrawer.prototype.drawHex = function(column, row, mapContext) {
		var hexCanvas = _getImageCanvas('default');
		_drawHex(column, row, hexCanvas, mapContext);
	}

	return HexDrawer;
});