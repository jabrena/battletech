define(['PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/MapDrawer', 'Character/Mech'], 
function(Grid, PathFinder, MapDrawer, Mech) {
	'use strict';

	var SetUpCanvas = function() {
			var canvas = $('#myCanvas')[0];
			paper.setup(canvas);

			var map = {
				width: 28,
				height: 17
			}

			var grid = new Grid(map.width, map.height); 
			var pathFinder = new PathFinder();
			var mapDrawer = new MapDrawer(grid)
			mapDrawer.drawMap();

			var mech = new Mech(mapDrawer, grid.getNodeAt(0,0));
			mapDrawer.colorHexesWithinReach(mech, pathFinder);

			paper.view.draw();

			var _tool = new paper.Tool();
			_tool.onMouseMove = function(event) {
				paper.project.activeLayer.selected = false;
				if (event.item && event.item.children) {

					var node = event.item.children[0];
					var tempGrid = grid.clone();
					var path = pathFinder.findPath(mech.getPosition().column, mech.getPosition().row,
												   node.column, node.row,
					 							   tempGrid, mech.remainingMovement());
					mapDrawer.colorPath(path);					
				}
			}

			_tool.onMouseDown = function(event) {
				paper.project.activeLayer.selected = false;
				if (event.item && event.item.children) {
					var target =  event.item.children[0];
					var gridBackup = grid.clone();

					var path = pathFinder.findPath(mech.getPosition().column, mech.getPosition().row,
												   target.column, target.row,
												   gridBackup, mech.remainingMovement());

					console.log("path", path);

					path = path.reverse();
					var furthestReachableHexOnPath;
					path.forEach(function(point) {
						var possibleMove = gridBackup.getNodeAt(point[0], point[1]);
						console.log(possibleMove.withinRage);
						if (possibleMove.withinRage && !furthestReachableHexOnPath) {
							furthestReachableHexOnPath = mapDrawer.getHexFromNode(possibleMove).hex;
						}
					})

					mech.moveToHex(furthestReachableHexOnPath);
					mapDrawer.clearMovableHexes();
					mapDrawer.colorHexesWithinReach(mech, pathFinder);
				}
			}
	}();
});