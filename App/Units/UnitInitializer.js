define(['AppGlobals', 'Units/Mech', 'Turns/Turn'],
function(appGlobals, Mech, turn) {
	'use strict';

	var initUnits = function() {
		appGlobals.units.push(new Mech(10, 10, 'Images/redMech.jpg'));
		appGlobals.units.push(new Mech(1, 1, 'Images/axeMech.jpg'));

		var startingMech = appGlobals.units[0];
   		turn.start(startingMech);
	}
	return { initUnits: initUnits };
});