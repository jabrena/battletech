define([], function() {
	'use strict';
	var _grid;
	var _pathFinder;
	var _map;
	var _tool = new paper.Tool();
	var _units = [];

	return {
		grid: _grid,
		map: _map,
		pathFinder: _pathFinder,
		tool: _tool,
		units: _units
	};
})