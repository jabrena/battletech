define(['AppGlobals', 'Units/Mech', 'Turns/Turn'],
function(appGlobals, Mech, turn) {
	'use strict';

	var initUnits = function() {
		appGlobals.units.push(new Mech(0, 0, 'redMechImage'));
		appGlobals.units.push(new Mech(1, 1, 'axeMechImage'));

		var startingMech = appGlobals.units[0];
   		turn.start(startingMech);
	}
	return { initUnits: initUnits };
});