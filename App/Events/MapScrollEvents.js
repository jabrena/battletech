define(['AppGlobals'], function(appGlobals) {
	'use strict';

	var _calculateMaxRightScroll = function(moveDirection) {
		var bounds = paper.view.bounds;

		var mapDetails = appGlobals.map.getDetails();
		var hexWidth = mapDetails.hexSize.width;
		var numberOfHexes = mapDetails.width;

		var numberOfHexesOnScreenWidth = Math.floor(bounds.width / hexWidth) -1;
		var maxScrollablePoint = (numberOfHexes - numberOfHexesOnScreenWidth) * hexWidth;

		var futurePoint = (paper.view.bounds.x + moveDirection.x);
		var maxRightReach =  futurePoint > maxScrollablePoint;
		if (maxRightReach) {
			moveDirection.x = maxScrollablePoint - paper.view.bounds.x;
		}

		return moveDirection.x;
	}

	var _calculateMaxBottomScroll = function(moveDirection) {
		var bounds = paper.view.bounds;

		var mapDetails = appGlobals.map.getDetails();
		var hexHeight = mapDetails.hexSize.height * 0.75; //hexes overlap vertically
		var numberOfHexes = mapDetails.height;

		var numberOfHexesOnScreenHeight = Math.floor(bounds.height / hexHeight) -1;
		var maxScrollablePoint = (numberOfHexes - numberOfHexesOnScreenHeight) * hexHeight;

		var futurePoint = (paper.view.bounds.y + moveDirection.y);
		var maxRightReach =  futurePoint > maxScrollablePoint;
		if (maxRightReach) {
			moveDirection.y = maxScrollablePoint - paper.view.bounds.y;
		}

		return moveDirection.y;
	}

	appGlobals.tool.onMouseDown = function(event) {
		console.log(event.point);
	}

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

		moveDirection.x = _calculateMaxRightScroll(moveDirection)
		moveDirection.y = _calculateMaxBottomScroll(moveDirection)

		paper.view.scrollBy(moveDirection);
	};
});