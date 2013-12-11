define(['AppGlobals'], function(appGlobals) {
	'use strict';
	var _hexDrawer;

	var MapDrawer = function(hexDrawer) {
		_hexDrawer = hexDrawer;
	}

/*	MapDrawer.prototype.drawMap = function(grid, view)  {
		var mapLayer = _(paper.project.layers).findWhere({ 'name': 'map' });

		for (var y = view.firstRow; y < view.lastRow; y++) {
			for (var x = view.firstColumn; x < view.lastColumn; x++) {
				var node = grid.getNodeAt(x, y);
				_hexDrawer.drawHex(node, mapLayer);
			}
		}*/
	MapDrawer.prototype.drawMap = function(opts,c) {
        
	    var alpha       = opts.alpha || 1;
	    var color       = opts.color || '#1e1e1e';
	    var lineWidth   = opts.lineWidth || 1;
	    var radius      = opts.radius || 20;
	        
	        
	    var mapGridCanvas = c.getContext("2d");
	        mapGridCanvas.clearRect(0, 0, c.width, c.height);
	    mapGridCanvas.globalAlpha = alpha;
	    mapGridCanvas.strokeStyle = color;
	    mapGridCanvas.lineWidth = lineWidth;
	    
	    //length of line
	    var r = appGlobals.map.getDetails().hexRadius;
	    var part = 60;
	    var hexSize = r*Math.sqrt(3);
	    var yHexSize = r*Math.sqrt(2.25);
	    var xHexes = 2000 / hexSize;
	    var yHexes = 2000 / yHexSize;
	    
	    mapGridCanvas.beginPath();
	    
	    //loop through hex "rows" and every other row shift
		for (var xGrid=0;xGrid<=xHexes;xGrid++){
			for (var yGrid=0;yGrid<=yHexes;yGrid++){
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
			           mapGridCanvas.moveTo(x,y);
			      }
			      else {
			          mapGridCanvas.lineTo(x,y);
			      }
			    }
			}
		}
        mapGridCanvas.stroke();
        
        return c;
    }

	return MapDrawer;
});