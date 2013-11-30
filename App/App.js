define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/Map', 'Character/Mech', 'Map/MapHelper'], 
function(AppGlobals, Grid, PathFinder, Map, Mech, mapHelper) {
	'use strict';

	var InitApp = function() {
		var canvas = $('#myCanvas')[0];
		paper.setup(canvas);

		var map = {
			width: 30,
			height: 20,
			hexSize: 25
		}

		var tool = new paper.Tool();
		tool.onMouseDrag = function(event) {
			var moveDirection = new paper.Point();
			moveDirection.x = event.downPoint.x - event.point.x;
			moveDirection.y = event.downPoint.y - event.point.y;

			var bounds = paper.view.bounds;

			var maxLeftReached = (paper.view.bounds.x + moveDirection.x) < 0;
			if (maxLeftReached) {
				moveDirection.x = paper.view.bounds.x * -1;
			}

			var maxTopReached = (paper.view.bounds.y + moveDirection.y) < 0;
			if (maxTopReached) {
				moveDirection.y = paper.view.bounds.y * -1;
			}

			var hexWidth = 43.30127018922194;
			var numberOfHexes = 30;

			var numberOfHexesOnScreenWidth = Math.floor(bounds.width / hexWidth) -1;
			var maxScrollablePoint = (numberOfHexes - numberOfHexesOnScreenWidth ) * hexWidth;

			var futurePoint = (paper.view.bounds.x + moveDirection.x);
			var maxRightReach =  futurePoint > maxScrollablePoint;
			if (maxRightReach) {
				moveDirection.x = maxScrollablePoint - paper.view.bounds.x;
			}


			console.log(paper.view.bounds.y);
			paper.view.scrollBy(moveDirection);
		};


		AppGlobals.pathFinder = new PathFinder();
		AppGlobals.grid = new Grid(map.width, map.height); 
		
		AppGlobals.map = new Map(AppGlobals.grid)
		
		var mechStartingPosition = AppGlobals.map.getHexFromCoordinates(0, 0);
		AppGlobals.mech = new Mech(mechStartingPosition);
		mapHelper.colorHexesWithinReach(AppGlobals.mech, AppGlobals.pathFinder);

		paper.view.draw();

	}();
});