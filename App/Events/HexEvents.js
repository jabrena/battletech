define(['AppGlobals', 'Map/MapHelper'], function(AppGlobals, mapHelper) {
	'use strict';

	var whenMouseEntersHex = function(event) {
		paper.project.activeLayer.selected = false;

		var hex = event.target;
		var tempGrid = AppGlobals.grid.clone();
		var path = AppGlobals.pathFinder.findPath(AppGlobals.mech.getPosition().column, AppGlobals.mech.getPosition().row,
									   	  		  hex.column, hex.row,
		 							   	   		  tempGrid, AppGlobals.mech.remainingMovement());
		mapHelper.colorPath(path);					
	}

	var whenMouseClicksHex = function(event) {
		paper.project.activeLayer.selected = false;

		var hex = event.target;
		var tempGrid = AppGlobals.grid.clone();
		var path = AppGlobals.pathFinder.findPath(AppGlobals.mech.getPosition().column, AppGlobals.mech.getPosition().row,
									   hex.column, hex.row,
									   tempGrid, AppGlobals.mech.remainingMovement());

		path = path.reverse();
		var furthestReachableHexOnPath;
		path.forEach(function(point) {
			var possibleMove = tempGrid.getNodeAt(point[0], point[1]);
			if (possibleMove.withinRage && !furthestReachableHexOnPath) {
				furthestReachableHexOnPath = AppGlobals.map.getHexFromNode(possibleMove);
			}
		})

		AppGlobals.mech.moveToHex(furthestReachableHexOnPath);
		mapHelper.clearMovableHexes();
		mapHelper.colorHexesWithinReach(AppGlobals.mech, AppGlobals.pathFinder);

		whenMouseEntersHex(event);
	}
	
	return {
		whenMouseEntersHex: whenMouseEntersHex,
		whenMouseClicksHex: whenMouseClicksHex
	};
});
