define(['Map/MapInitializer', 'Map/HexInitializer'],
function(mapInitializer, hexInitializer) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var mapDetails = {
			width: 30,
			height: 30,
			hexRadius: 40,
			hexSize: undefined // use hexInitializer below
		}
		mapDetails.hexSize = hexInitializer.getHexSize(mapDetails.hexRadius);

		mapInitializer.initMap(mapDetails);	

		//Init Units
		//mechStartingPosition = appGlobals.grid.getNodeAt(0, 0);
		//appGlobals.mech = new Mech(mechStartingPosition);
		//mapHelper.colorHexesWithinReach(appGlobals.mech, appGlobals.pathFinder);

		paper.view.draw();

	}();
});