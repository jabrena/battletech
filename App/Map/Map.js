define(['Map/MapDrawer', 'Map/HexDrawer', 'Map/ViewPort', 'Units/UnitDrawer'],
function(MapDrawer, HexDrawer, ViewPort, UnitDrawer) {
	'use strict'
	var _mapDetails;
	var _mapDrawer;
	var _unitDrawer;
	var _viewPort;

	var Map = function(mapDetails) {
		_mapDetails = mapDetails;

		var hexDrawer = new HexDrawer(_mapDetails);
		_mapDrawer = new MapDrawer(hexDrawer);//hexDrawer);
		//_unitDrawer = new UnitDrawer();

		_viewPort = new ViewPort(_mapDetails);
	}

	Map.prototype.draw = function(grid) {
		var view = _viewPort.getView();
		//_mapDrawer.drawMap(grid, view);
		//_unitDrawer.drawUnits(view);
		c = document.createElement("canvas");
	    c.width  = 1000;
	    c.height = 500;

	    var c = _mapDrawer.drawMap({}, c);
	    var cContext = c.getContext('2d');
    	var onScreenCanvas = document.getElementById('myCanvas')
    	var onScreenContext = onScreenCanvas.getContext('2d');
	    onScreenCanvas.width  = 1000;
	    onScreenCanvas.height = 500;
		onScreenContext.drawImage(c, 0, 0);
	}

	Map.prototype.clear = function(grid) {
		
	}

	Map.prototype.getDetails = function() {
		return _mapDetails;
	}

	return Map
});
