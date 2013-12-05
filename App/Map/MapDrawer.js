define(['AppGlobals'], function(AppGlobals) {
	'use strict';
	var _grid;
	var _hexDrawer;

	var _initMapLayer = function() {
		if (paper.project.layers.length !== 1) {
			throw ('this should be one, we are about to create a nasty bug!')
		}
		paper.project.activeLayer.name = 'map';
	}

	var MapDrawer = function(grid, hexDrawer) {
		_grid = grid;
		_hexDrawer = hexDrawer;

		_initMapLayer();
	}

	MapDrawer.prototype.drawMap = function(view)  {
		var mapLayer = _(paper.project.layers).findWhere({ 'name': 'map' });

		for (var y = view.firstRow; y < view.lastRow; y++) {
			for (var x = view.firstColumn; x < view.lastColumn; x++) {
				var coordinates = { column: x, row: y };
				var nodeDetails = _grid.getNodeAt(x, y).details;
				_hexDrawer.drawHex(nodeDetails, coordinates, mapLayer);
			}
		}
	}

	return MapDrawer;
});