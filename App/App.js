define(['Map/HexInitializer', 'Map/MapInitializer', 'Units/UnitInitializer'],
function(hexInitializer, mapInitializer, unitInitializer) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var mapDetails = {
			width: 50,
			height: 50,
			hexRadius: 50,
			hexSize: undefined // use hexInitializer below
		}
		mapDetails.hexSize = hexInitializer.getHexSize(mapDetails.hexRadius);

		mapInitializer.initMap(mapDetails);	
		unitInitializer.initUnits();

		paper.view.draw();
	}();
});