define(['PathFinding/Core/Grid'], function(Grid) {
	'use strict';

	var _grid;

	var MapDrawer = function(grid) {
		_grid = grid;
	}

	MapDrawer.prototype.drawMap = function()  {
		console.log('draw map');
	}

	return MapDrawer;
});