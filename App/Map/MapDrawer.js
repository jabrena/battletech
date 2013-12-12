define(['AppGlobals'], function(appGlobals) {
	'use strict';
	var _hexDrawer;

	var MapDrawer = function(hexDrawer) {
		_hexDrawer = hexDrawer;
	}

	MapDrawer.prototype.drawMap = function(grid, view)  {
		var mapCanvas = document.createElement("canvas");
	    mapCanvas.width  = appGlobals.camera.bounds.width;
	    mapCanvas.height = appGlobals.camera.bounds.height;
	    var mapContext = mapCanvas.getContext('2d');

		for (var y = view.firstRow; y < view.lastRow; y++) {
			for (var x = view.firstColumn; x < view.lastColumn; x++) {
				var node = grid.getNodeAt(x, y);
				_hexDrawer.drawHex(node, mapContext);
			}
		}
        
        return mapCanvas;
    }

	return MapDrawer;
});