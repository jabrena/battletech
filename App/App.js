define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/MapDrawer', 'Character/Mech'], 
function(AppGlobals, Grid, PathFinder, MapDrawer, Mech) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var map = {
			width: 28,
			height: 17
		}

		AppGlobals.tool = new paper.Tool();
		AppGlobals.pathFinder = new PathFinder();
		AppGlobals.grid = new Grid(map.width, map.height); 
		AppGlobals.mapDrawer = new MapDrawer(AppGlobals.grid)
		AppGlobals.mech = new Mech(AppGlobals.mapDrawer, AppGlobals.grid.getNodeAt(0,0));
		
		AppGlobals.mapDrawer.drawMap();
		AppGlobals.mapDrawer.colorHexesWithinReach(AppGlobals.mech, AppGlobals.pathFinder);

		paper.view.draw();

	}

	setTimeout(InitApp, 500);
});