define([], function() {
	'use strict';
	var pristineGrid;
	var activeGrid;
	var pathFinder;
	var map;
	var units = [];
	var camera = {}

	var _initCamera = function() {
		camera.bounds = {
			width: window.screen.width,
			height: window.screen.height
		};

		camera.view = {
			x: 0,
			y: 0
		};
	}()

	return {
		pristineGrid: pristineGrid,
	    activeGrid: activeGrid,
		pathFinder: pathFinder,
		map: map,
		units: units,
		camera: camera
	};
})