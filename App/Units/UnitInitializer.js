define(['AppGlobals', 'Units/Mech', 'Turns/Turn'],
function(appGlobals, Mech, turn) {
	'use strict';

	var initUnits = function() {
		appGlobals.units.push(new Mech(10, 10, 'redMechImage'));
		appGlobals.units.push(new Mech(40, 40, 'axeMechImage'));

		var startingMech = appGlobals.units[0];
   		turn.start(startingMech);
	}
	return { initUnits: initUnits };
});