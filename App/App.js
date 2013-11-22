define(['PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/MapDrawer'], 
function(Grid, PathFinder, MapDrawer) {
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

			var gridBackup = _.clone(grid);
			var path = pathFinder.findPath(0, 0, 5, 4, gridBackup, 7);
			mapDrawer.colorPath(path);
			mapDrawer.colorHexesWithinReach(gridBackup);
			paper.view.draw();
	}();
});