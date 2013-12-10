
define(['AppGlobals', 'Units/MoveHelper', 'Events/MapScrollEvents'], 
function(appGlobals, moveHelper, mapScrollEvents) {
	'use strict';
	var _activeUnit;

	var startTurn = function(unit) {
		_activeUnit = unit;
		appGlobals.activeGrid = appGlobals.pristineGrid.clone();

		//reach of the gun!
        //appGlobals.activeGrid = moveHelper.markNodesWithinReach(unit, appGlobals.pathFinder);

        var unitCoords = _activeUnit._mech.position;
        mapScrollEvents.centerOnPoint(unitCoords.x, unitCoords.y);
	}

	var endTurn = function() {
		var nextUnitToGo = _getNextUnit(_activeUnit);
		_activeUnit = undefined;
		setTimeout(function() {
			startTurn(nextUnitToGo);
		}, 750);
	}

	var getActiveUnit = function() {
		return _activeUnit;
	}

	var _getNextUnit = function(unitEndingTurn) {
		var currentIndex = appGlobals.units.indexOf(unitEndingTurn);
		var nextIndex = currentIndex + 1;

		if (nextIndex > appGlobals.units.length-1) {
			nextIndex = 0;
		}

		return appGlobals.units[nextIndex];
	}

	return {
		getActiveUnit: getActiveUnit,
		start: startTurn,
		end: endTurn
	}
});