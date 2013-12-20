
define(['AppGlobals', 'Units/MoveHelper', 'Events/MapScrollEvents', 'Turns/CombatTurn', 'Map/HexPositionCalculator'], 
function(appGlobals, moveHelper, mapScrollEvents, combatTurn, hexPositionCalculator) {
   'use strict';
   var _activeUnit;

   var startTurn = function(unit) {
      _activeUnit = unit;
      appGlobals.activeGrid = appGlobals.pristineGrid.clone();
      appGlobals.activeGrid = moveHelper.markNodesWithinReach(unit, appGlobals.pathFinder);

     appGlobals.map.update(appGlobals.activeGrid);
     appGlobals.map.draw();

     var centerPoint = hexPositionCalculator.getCenterOfHex(unit.location.column,
                                                            unit.location.row);

      setTimeout(function() {
         mapScrollEvents.centerOnPoint(centerPoint.x, centerPoint.y);
      }, 750);
   }

   var endTurn = function() {
      var nextUnitToGo = _getNextUnit(_activeUnit);
      _activeUnit = undefined;
         if (nextUnitToGo) {
            startTurn(nextUnitToGo);
         }
   }

	var getActiveUnit = function() {
		return _activeUnit;
	}

	var _getNextUnit = function(unitEndingTurn) {
		var currentIndex = appGlobals.units.indexOf(unitEndingTurn);
		var nextIndex = currentIndex + 1;

		if (nextIndex > appGlobals.units.length-1) {
			nextIndex = 0;
			//combatTurn.start(appGlobals.units[nextIndex]);
			//return false;
		}

		return appGlobals.units[nextIndex];
	}

	return {
		getActiveUnit: getActiveUnit,
		start: startTurn,
		end: endTurn
	}
});