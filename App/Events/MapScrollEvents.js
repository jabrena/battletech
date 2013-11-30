define(['AppGlobals'], function(appGlobals) {
	'use strict';

	appGlobals.tool.onMouseDrag = function(event) {
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

		paper.view.scrollBy(moveDirection);
	};
});