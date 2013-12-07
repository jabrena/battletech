define(['AppGlobals', 'Units/Mech', 'Turns/Turn'],
function(appGlobals, Mech, turn) {
	'use strict';

	var initUnits = function() {
		appGlobals.units[0] = new Mech(0, 0);

		var mech = appGlobals.units[0];
   		turn.start(mech);
	}

	return { initUnits: initUnits };
});