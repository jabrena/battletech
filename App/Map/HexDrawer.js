define(['Map/HexPositionCalculator'],
function(hexPositionCalculator) {
	'use strict';
	var _hexSides;
	var _radius;
	var _xHexSize;
	var _yHexSize;

	var _drawHex = function(xGrid, yGrid, mapContext) {
	    var part = 60;

	    var shiftY =0
		if (xGrid % 2 !== 0) {
		  var shiftY = yHexSize/2;
		}

		for (var i=0;i<=hexSides;i++) {
		  var a = i * part - 180;
		  var x = r * Math.cos(a * Math.PI / 180)+xGrid*xHexSize;
		  var y = r * Math.sin(a * Math.PI / 180)+yGrid*yHexSize+shiftY;
		  if (i == 0) {
		       mapContext.moveTo(x,y);
		  }
		  else {
		      mapContext.lineTo(x,y);
		  }
		}
	}

	var _drawSingleHex = function(mapContext) {
		var part = 60;
		mapContext.beginPath();

		for (var i=0;i<=_hexSides;i++) {
		  var a = i * part - 180;
		  var x = _radius * Math.cos(a * Math.PI / 180) + _radius;
		  var y = _radius * Math.sin(a * Math.PI / 180) + (_yHexSize / 2) + 1;
		  if (i !== 0) {
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

	var HexDrawer = function(mapDetails) { 
	    _hexSides = 6;
	    _radius = mapDetails.hexRadius;
	    _xHexSize = _radius*Math.sqrt(2.25);
	    _yHexSize = _radius*Math.sqrt(3);
	}

	HexDrawer.prototype.drawHex = function(column, row, mapContext) {
		//_drawHex(column, row, mapContext);
		_drawHexImage(mapContext);
		mapContext.globalCompositeOperation = 'destination-in';
		_drawSingleHex(mapContext);
	}

	return HexDrawer;
});