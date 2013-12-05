define(['Map/MapDrawer', 'Map/HexDrawer', 'Map/ViewPort', 'Units/UnitDrawer'],
function(MapDrawer, HexDrawer, ViewPort, UnitDrawer) {
	'use strict'
	var _mapDetails;
	var _mapDrawer;
	var _unitDrawer;
	var _viewPort;

	var Map = function(mapDetails, grid) {
		_mapDetails = mapDetails;

		var hexDrawer = new HexDrawer(_mapDetails);
		_mapDrawer = new MapDrawer(hexDrawer);
		_unitDrawer = new UnitDrawer();

		_viewPort = new ViewPort(_mapDetails);
	}

	Map.prototype.drawMap = function(grid) {
		var view = _viewPort.getView();
		_mapDrawer.drawMap(grid, view);
		_unitDrawer.drawUnits(view);
	}

	Map.prototype.getDetails = function() {
		return _mapDetails;
	}

	return Map
});
