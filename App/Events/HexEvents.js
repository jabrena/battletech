define(['AppGlobals'], function(AppGlobals) {
	'use strict';

	var whenMouseEntersHex = function(event) {
		paper.project.activeLayer.selected = false;

		var hex = event.target;
		var tempGrid = AppGlobals.grid.clone();
		var path = AppGlobals.pathFinder.findPath(AppGlobals.mech.getPosition().column, AppGlobals.mech.getPosition().row,
									   	  		  hex.column, hex.row,
		 							   	   		  tempGrid, AppGlobals.mech.remainingMovement());
		AppGlobals.mapDrawer.colorPath(path);					
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
				furthestReachableHexOnPath = AppGlobals.mapDrawer.getHexFromNode(possibleMove);
			}
		})

		AppGlobals.mech.moveToHex(furthestReachableHexOnPath);
		AppGlobals.mapDrawer.clearMovableHexes();
		AppGlobals.mapDrawer.colorHexesWithinReach(AppGlobals.mech, AppGlobals.pathFinder);

		whenMouseEntersHex(event);
	}
	
	return {
		whenMouseEntersHex: whenMouseEntersHex,
		whenMouseClicksHex: whenMouseClicksHex
	};
});
