define(['Map/MapDrawer'], function(MapDrawer) {
	'use strict'
	var _mapHexes;

	var Map = function(grid) {
		var mapDrawer = new MapDrawer(grid);
		_mapHexes = mapDrawer.drawMap();
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
