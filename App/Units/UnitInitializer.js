define(['AppGlobals', 'Units/Mech', 'Units/MoveHelper'],
function(appGlobals, Mech, moveHelper) {
	'use strict';

	var initUnits = function() {
		appGlobals.units[0] = new Mech(0, 0);

		var mech = appGlobals.units[0];
	    var markedGrid = moveHelper.markNodesWithinReach(mech, appGlobals.pathFinder);

	    appGlobals.map.drawMap(markedGrid);
	}

	return { initUnits: initUnits };
});