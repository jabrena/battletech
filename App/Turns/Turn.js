define(['AppGlobals', 'Units/MoveHelper'], 
function(appGlobals, moveHelper) {
	'use strict';

	var startTurn = function(unit) {
        var markedGrid = moveHelper.markNodesWithinReach(unit, appGlobals.pathFinder);
	    appGlobals.map.drawMap(markedGrid);
	}

	var endTurn = function() {
		var unit = _getNextUnit();
		startTurn(unit);
	}

	var _getNextUnit = function() {
		return appGlobals.units[0];
	}

	return {
		start: startTurn,
		end: endTurn
	}
});