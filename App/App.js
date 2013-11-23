define(['PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/MapDrawer', 'Character/Mech'], 
function(Grid, PathFinder, MapDrawer, Mech) {
	'use strict';

	var SetUpCanvas = function() {
			var canvas = $('#myCanvas')[0];
			paper.setup(canvas);

			var map = {
				width: 9,
				height: 5
			}

			var grid = new Grid(map.width, map.height); 
			var pathFinder = new PathFinder();
			var mapDrawer = new MapDrawer(grid)
			mapDrawer.drawMap();

			var mech = new Mech(mapDrawer, grid.getNodeAt(0,0));

			var GridSE = grid.clone();
			var PathToSE = pathFinder.findPath(0, 0, map.width-1, map.height-1, GridSE, mech.remainingMovement());
			mapDrawer.colorHexesWithinReach(GridSE);
			
			var GridNE = grid.clone();
			var PathToNe = pathFinder.findPath(0, 0, map.width-1, 0, GridNE, mech.remainingMovement());
			mapDrawer.colorHexesWithinReach(GridNE);

			var GridNW = grid.clone();
			var PathToNe = pathFinder.findPath(0, 0, 0, 0, GridNW, mech.remainingMovement());
			mapDrawer.colorHexesWithinReach(GridNW);

			var GridSW = grid.clone();
			var PathToNe = pathFinder.findPath(0, 0, 0, map.height-1, GridSW, mech.remainingMovement());
			mapDrawer.colorHexesWithinReach(GridSW);
			
			paper.view.draw();

			var _tool = new paper.Tool();
			_tool.onMouseMove = function(event) {
				paper.project.activeLayer.selected = false;
				if (event.item) {
					var node = event.item.children[0];
					var tempGrid = grid.clone();
					var path = pathFinder.findPath(0, 0, node.column, node.row, tempGrid, mech.remainingMovement());
					mapDrawer.colorPath(path);					
				}
			}

			_tool.onMouseDown = function(event) {
				paper.project.activeLayer.selected = false;
				if (event.item) {
					var target =  event.item.children[0];
					var gridBackup = grid.clone();

					var path = pathFinder.findPath(0, 0,
												   target.column, target.row,
												   gridBackup, mech.remainingMovement());

					console.log("path", path);

					path = path.reverse();
					var furthestReachableHexOnPath;
					path.forEach(function(point) {
						var possibleMove = gridBackup.getNodeAt(point[0], point[1]);
						console.log(possibleMove.withinRage);
						if (possibleMove.withinRage && !furthestReachableHexOnPath) {
							furthestReachableHexOnPath = mapDrawer.getHexFromNode(possibleMove);
						}
					})

					mech.moveToHex(furthestReachableHexOnPath);
				}
			}
	}();
});