define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/MapDrawer', 'Character/Mech'], 
function(AppGlobals, Grid, PathFinder, MapDrawer, Mech) {
	'use strict';

	var SetUpCanvas = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var map = {
			width: 28,
			height: 17
		}

		AppGlobals.grid = new Grid(map.width, map.height); 
		AppGlobals.pathFinder = new PathFinder();
		AppGlobals.mapDrawer = new MapDrawer(AppGlobals.grid)
		AppGlobals.mapDrawer.drawMap();

		AppGlobals.mech = new Mech(AppGlobals.mapDrawer, AppGlobals.grid.getNodeAt(0,0));
		AppGlobals.mapDrawer.colorHexesWithinReach(AppGlobals.mech, AppGlobals.pathFinder);

		paper.view.draw();

		AppGlobals.tool = new paper.Tool();
	}

	setTimeout(SetUpCanvas, 500);
});