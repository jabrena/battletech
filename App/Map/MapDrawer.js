define(['AppGlobals'], function(AppGlobals) {
	'use strict';
	var _grid;
	var _hexDrawer;

	var _initLayers = function() {
		if (paper.project.layers.length !== 1) {
			throw ('this should be one, we are about to create a nasty bug!')
		}
		paper.project.activeLayer.name = 'top';
	
		var bottomLayer = new paper.Layer();
		bottomLayer.name = 'bottom';
	}

	var MapDrawer = function(grid, hexDrawer) {
		_grid = grid;
		_hexDrawer = hexDrawer;

		_initLayers();
	}

	MapDrawer.prototype.drawMap = function(view)  {
		var topLayer = _(paper.project.layers).findWhere({ 'name': 'top' });
		var bottomLayer = _(paper.project.layers).findWhere({ 'name': 'bottom' });

		for (var y = view.firstRow; y < view.lastRow; y++) {
			for (var x = view.firstColumn; x < view.lastColumn; x++) {
				var coordinates = { column: x, row: y };
				var nodeDetails = _grid.getNodeAt(x, y).details;
				_hexDrawer.drawHex(nodeDetails, coordinates, topLayer, bottomLayer);
			}
		}

		topLayer.moveAbove(bottomLayer);
		topLayer.activate();
	}

	return MapDrawer;
});