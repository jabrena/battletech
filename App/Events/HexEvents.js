define(['AppGlobals', 'Map/HexPositionCalculator', 'Units/MoveHelper'], 
function(appGlobals, hexPositionCalculator, moveHelper) {
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

		//must click inside move range to move
		var clickedNode = appGlobals.grid.getNodeAt(hexLocation.column, hexLocation.row);
		var destinationNode = moveHelper.getValidMove(activeUnit, clickedNode, appGlobals.pathFinder);

		if (destinationNode) {
			activeUnit.moveToHex(destinationNode.x, destinationNode.y);
			appGlobals.map.drawMap(appGlobals.grid);
		}
	}

	var doNothing = function(event) {
		if (_dragging) {
			return;
		}

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
