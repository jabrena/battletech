define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/Map', 'Character/Mech', 'Map/MapHelper', 'Events/MapScrollEvents'], 
function(appGlobals, Grid, PathFinder, Map, Mech, mapHelper, mapScrollEvents) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var mapDetails = {
			width: 30,
			height: 30,
			hexRadius: 40,
			hexSize: undefined //is set in the HexDrawer constructor
		}

		appGlobals.pathFinder = new PathFinder();
		appGlobals.grid = new Grid(mapDetails.width, mapDetails.height); 
		
		appGlobals.map = new Map(mapDetails, appGlobals.grid);
		appGlobals.map.drawMap(appGlobals.grid);
		
		//mechStartingPosition = appGlobals.grid.getNodeAt(0, 0);
		//appGlobals.mech = new Mech(mechStartingPosition);
		//mapHelper.colorHexesWithinReach(appGlobals.mech, appGlobals.pathFinder);

		paper.view.draw();

	}();
});