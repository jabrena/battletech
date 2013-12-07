define([], function() {
	'use strict';
	var pristineGrid;
	var activeGrid;
	var pathFinder;
	var map;
	var tool = new paper.Tool();
	var units = [];

	return {
		pristineGrid: pristineGrid,
	    activeGrid: activeGrid,
		pathFinder: pathFinder,
		map: map,
		tool: tool,
		units: units
	};
})