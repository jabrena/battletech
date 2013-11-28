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

		AppGlobals.tool.onMouseDown = function(event) {
			paper.project.activeLayer.selected = false;
			if (event.item && event.item.children) {

				var hex = event.item.children['hexagon'];
				var tempGrid = AppGlobals.grid.clone();
				var path = AppGlobals.pathFinder.findPath(AppGlobals.mech.getPosition().column, AppGlobals.mech.getPosition().row,
											   hex.column, hex.row,
											   tempGrid, AppGlobals.mech.remainingMovement());

				path = path.reverse();
				var furthestReachableHexOnPath;
				path.forEach(function(point) {
					var possibleMove = tempGrid.getNodeAt(point[0], point[1]);
					if (possibleMove.withinRage && !furthestReachableHexOnPath) {
						furthestReachableHexOnPath = mapDrawer.getHexFromNode(possibleMove);
					}
				})

				AppGlobals.mech.moveToHex(furthestReachableHexOnPath);
				AppGlobals.mapDrawer.clearMovableHexes();
				AppGlobals.mapDrawer.colorHexesWithinReach(mech, pathFinder);
			}
		}
	}

	setTimeout(SetUpCanvas, 500);
});