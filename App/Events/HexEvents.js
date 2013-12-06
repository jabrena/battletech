define(['AppGlobals', 'Map/HexPositionCalculator'], 
function(appGlobals, hexPositionCalculator) {
	'use strict';
	var _dragging;

/*	var whenMouseEntersHex = function(event) {
		paper.project.activeLayer.selected = false;

		var hex = event.target;
		var tempGrid = AppGlobals.grid.clone();
		var path = AppGlobals.pathFinder.findPath(AppGlobals.mech.getPosition().column, AppGlobals.mech.getPosition().row,
									   	  		  hex.column, hex.row,
		 							   	   		  tempGrid, AppGlobals.mech.remainingMovement());
		mapHelper.colorPath(path);					
	}*/

	var whenMouseClicksHex = function(event) {
		if (_dragging) { 
			return false;
		 }

		var activeUnit = appGlobals.units[0];
		var hexLocation = hexPositionCalculator.getLocationFromMouseClick(event.point);

/*		var tempGrid = AppGlobals.grid.clone();
		var path = AppGlobals.pathFinder.findPath(activeUnit.getLocation().column, activeUnit.getLocation().row,
									   			  hexLocation.column, hexLocation.row,
									   			  tempGrid, activeUnit.remainingMovement());

	path = path.reverse();
		var furthestReachableHexOnPath;
		path.forEach(function(point) {
			var possibleMove = tempGrid.getNodeAt(point[0], point[1]);
			if (possibleMove.withinRage && !furthestReachableHexOnPath) {
				furthestReachableHexOnPath = AppGlobals.map.getHexFromNode(possibleMove);
			}
		})*/

		activeUnit.moveToHex(hexLocation.column, hexLocation.row);
		appGlobals.map.drawMap(appGlobals.grid);
	}

	var doNothing = function(event) {
		_dragging = true;

		setTimeout(function () {
			_dragging = false;
		}, 0);
	}
	
	return {
	//	whenMouseEntersHex: whenMouseEntersHex,
		whenMouseClicksHex: whenMouseClicksHex,
		doNothing: doNothing
	};
});
