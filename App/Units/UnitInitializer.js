define(['AppGlobals', 'Units/Mech'],
function(appGlobals, Mech) {
	'use strict';

	var initUnits = function() {
		appGlobals.units[0] = new Mech(0, 0);
		//mapHelper.colorHexesWithinReach(appGlobals.mech, appGlobals.pathFinder);
	}

	return { initUnits: initUnits };
});