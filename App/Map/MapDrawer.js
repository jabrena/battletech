define(['AppGlobals'], function(appGlobals) {
	'use strict';
	var _hexDrawer;

	var _initMapLayer = function() {
		if (paper.project.layers.length !== 1) {
			throw ('this should be one, we are about to create a nasty bug!')
		}
		paper.project.activeLayer.name = 'map';
	}

	var MapDrawer = function(hexDrawer) {
		_hexDrawer = hexDrawer;

		_initMapLayer();
	}

	MapDrawer.prototype.drawMap = function(grid, view)  {
		var mapLayer = _(paper.project.layers).findWhere({ 'name': 'map' });

		for (var y = view.firstRow; y < view.lastRow; y++) {
			for (var x = view.firstColumn; x < view.lastColumn; x++) {
				var node = grid.getNodeAt(x, y);
				_hexDrawer.drawHex(node, mapLayer);
			}
		}
	}

	return MapDrawer;
});