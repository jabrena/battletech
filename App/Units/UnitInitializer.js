define(['AppGlobals', 'Units/Mech'],
function(appGlobals, Mech) {
	'use strict';

	var initUnits = function() {
		appGlobals.mech = new Mech(0, 0);
		//mapHelper.colorHexesWithinReach(appGlobals.mech, appGlobals.pathFinder);
	}

	return { initUnits: initUnits };
});