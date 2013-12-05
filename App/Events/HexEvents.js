define(['AppGlobals'], function(AppGlobals) {
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

/*	var whenMouseClicksHex = function(event) {
		if (_dragging) { 
			return false;
		 }

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
	}*/

	var doNothing = function(event) {
		_dragging = true;

		setTimeout(function () {
			_dragging = false;
		}, 0);
	}
	
/*	return {
		whenMouseEntersHex: whenMouseEntersHex,
		whenMouseClicksHex: whenMouseClicksHex,
		doNothing: doNothing
	};*/
});
