define(['AppGlobals', 'Map/HexPositionCalculator', 'Units/MoveHelper', 'Turns/Turn'], 
function(appGlobals, hexPositionCalculator, moveHelper, turn) {
	'use strict';
	var _dragging;

	var whenMouseClicksHex = function(event) {
		if (_dragging) { 
			return false;
		 }

		var activeUnit = turn.getCurrentUnit();
		var hexLocation = hexPositionCalculator.getLocationFromMouseClick(event.point);

		//must click inside move range to move
		var clickedNode = appGlobals.activeGrid.getNodeAt(hexLocation.column, hexLocation.row);
		var destinationNode = moveHelper.getValidMove(activeUnit, clickedNode, appGlobals.pathFinder);

		if (destinationNode) {
			activeUnit.moveToHex(destinationNode.x, destinationNode.y);

			turn.end(activeUnit);
		}
	}

	var doNothing = function(event) {
		if (_dragging) {
			return false;
		}

		_dragging = true;
		setTimeout(function () {
			_dragging = false;
		}, 0);
	}
	
	return {
		whenMouseClicksHex: whenMouseClicksHex,
		doNothing: doNothing
	};
});
