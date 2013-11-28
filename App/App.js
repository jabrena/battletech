define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/Map', 'Character/Mech', 'Map/MapHelper'], 
function(AppGlobals, Grid, PathFinder, Map, Mech, mapHelper) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var map = {
			width: 28,
			height: 17
		}

		AppGlobals.pathFinder = new PathFinder();
		AppGlobals.grid = new Grid(map.width, map.height); 
		
		AppGlobals.map = new Map(AppGlobals.grid)
		
		var mechStartingPosition = AppGlobals.map.getHexFromCoordinates(0, 0);
		AppGlobals.mech = new Mech(mechStartingPosition);
		mapHelper.colorHexesWithinReach(AppGlobals.mech, AppGlobals.pathFinder);

		paper.view.draw();

	}

	setTimeout(InitApp, 600);
});