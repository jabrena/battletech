define(['Map/MapDrawer', 'Map/HexDrawer', 'Map/ViewPort'], function(MapDrawer, HexDrawer, ViewPort) {
	'use strict'
	var _mapDetails;
	var _mapDrawer;
	var _viewPort;

	var Map = function(mapDetails, grid) {
		_mapDetails = mapDetails;

		// hexDrawer updates mapDetails by side effect
		var hexDrawer = new HexDrawer(_mapDetails);
		_mapDrawer = new MapDrawer(grid, hexDrawer);

		_viewPort = new ViewPort(_mapDetails);
	}

	Map.prototype.drawMap = function() {
		_mapDrawer.drawMap(_viewPort.getView());
	}

	Map.prototype.getDetails = function() {
		return _mapDetails;
	}

	return Map
});
