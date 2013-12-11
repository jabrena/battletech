define(['Map/HexPositionCalculator'],
function(hexPositionCalculator) {
	'use strict';
	var _mapDetails;

	var _drawHex = function(xGrid, yGrid, mapContext) {
	    //length of line
	    var r = _mapDetails.hexRadius;
	    var part = 60;
	    var hexSize = r*Math.sqrt(3);
	    var yHexSize = r*Math.sqrt(2.25);

		if (yGrid % 2 == 0) {
		  //even row
		  var shiftX = hexSize/2;
		}
		else {
		  //odd row
		  shiftX=0;
		}
		for (var i=0;i<=6;i++) {
		  var a = i * part - 90;
		  var x = r * Math.cos(a * Math.PI / 180)+xGrid*hexSize+shiftX;
		  var y = r * Math.sin(a * Math.PI / 180)+yGrid*yHexSize;
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