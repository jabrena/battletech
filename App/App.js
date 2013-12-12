define(['Map/HexInitializer', 'Map/MapInitializer', 'Units/UnitInitializer', 'Events/MouseEventInitializer'],
function(hexInitializer, mapInitializer, unitInitializer, mouseEventInitializer) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas');
		mouseEventInitializer.initMouseEvents(canvas);

		var mapDetails = {
			width: 50,
			height: 50,
			hexRadius: 50,
			hexSize: undefined // use hexInitializer below
		}
		//mapDetails.hexSize = hexInitializer.getHexSize(mapDetails.hexRadius);

		mapInitializer.initMap(mapDetails);	
		//unitInitializer.initUnits();

		//paper.view.draw();
	}();
});