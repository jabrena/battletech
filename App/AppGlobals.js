define([], function() {
	'use strict';
	var pristineGrid;
	var activeGrid;
	var pathFinder;
	var map;
	var tool;
	var units = [];

	var  initTool = function() { 
		tool = new paper.Tool()
		tool.minDistance = 10;
	}();

	return {
		pristineGrid: pristineGrid,
	    activeGrid: activeGrid,
		pathFinder: pathFinder,
		map: map,
		tool: tool,
		units: units
	};
})