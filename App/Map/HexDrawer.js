define(['Map/HexPositionCalculator'],
function(hexPositionCalculator) {
	'use strict';
	var _mapDetails;

	var _drawHex = function(xGrid, yGrid, mapContext) {
		var hexSides = 6;

	    //length of line
	    var r = _mapDetails.hexRadius;
	    var part = 60;
	    var xHexSize = r*Math.sqrt(2.25);
	    var yHexSize = r*Math.sqrt(3);

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

	var HexDrawer = function(mapDetails) { 
		_mapDetails = mapDetails;
	}

	HexDrawer.prototype.drawHex = function(column, row, mapContext) {
		_drawHex(column, row, mapContext);
	}

	return HexDrawer;
});