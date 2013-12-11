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
		var mapDetails = appGlobals.map.getDetails();


	    var alpha       = opts.alpha || 1;
	    var color       = opts.color || '#1e1e1e';
	    var lineWidth   = opts.lineWidth || 1;
	    var radius      = opts.radius || 20;
	        
	    var mapContext = c.getContext("2d");
        mapContext.clearRect(0, 0, c.width, c.height);
	    mapContext.globalAlpha = alpha;
	    mapContext.strokeStyle = color;
	    mapContext.lineWidth = lineWidth;

	    var xHexes = mapDetails.width;
	    var yHexes = mapDetails.height;
	    
	    mapContext.beginPath();
	    
	    //loop through hex "rows" and every other row shift
		for (var xGrid=0;xGrid<=xHexes;xGrid++){
			for (var yGrid=0;yGrid<=yHexes;yGrid++){
				_hexDrawer.drawHex(xGrid, yGrid, mapContext);
			}
		}
        mapContext.stroke();
        
        return c;
    }

	return MapDrawer;
});