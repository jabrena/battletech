define(['Map/MapDrawer', 'Map/ViewPort'], function(MapDrawer, ViewPort) {
	'use strict'
	var _mapHexes;
	var _mapDetails;
	var _mapDrawer;
	var _viewPort;

	var Map = function(mapDetails, grid) {
		_mapDetails = mapDetails;

		_mapDrawer = new MapDrawer(grid, _mapDetails);
		_viewPort = new ViewPort(_mapDetails);
		_mapHexes = _mapDrawer.drawMap(_viewPort);
	}

	Map.prototype.drawMap = function() {
		_mapDrawer.drawMap(_viewPort);
	}

	Map.prototype.getDetails = function() {
		return _mapDetails;
	}

	Map.prototype.getAllHexes = function() {
		return _mapHexes;
	}

	Map.prototype.getHexFromNode = function(node) {
		return _(_mapHexes).find(function(hex) { 
			return hex.column === node.x && hex.row === node.y
		});
	}

	Map.prototype.getHexFromPoint = function(point) {
		return _(_mapHexes).find(function(hex) { 
			return hex.column === point[0] && hex.row === point[1];
		});
	}

	Map.prototype.getHexFromCoordinates = function(column, row) {
		return _(_mapHexes).find(function(hex) { 
			return hex.column === column && hex.row === row;
		});	
	}

	return Map
});
