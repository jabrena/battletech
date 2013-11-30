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

	var _adjustDestinationIfInvalid = function(movement, currentLocation, minBound) {
		var destinationOutOfBounds = (currentLocation + movement) < minBound;
		if (destinationOutOfBounds) {
			movement = currentLocation * - 1;
		}

		return movement;
	}

	appGlobals.tool.onMouseDrag = function(event) {
		var moveDirection = new paper.Point();
		moveDirection.x = event.downPoint.x - event.point.x;
		moveDirection.y = event.downPoint.y - event.point.y;

		var bounds = paper.view.bounds;

		moveDirection.x = _adjustDestinationIfInvalid(moveDirection.x, bounds.x, 0);
		moveDirection.y = _adjustDestinationIfInvalid(moveDirection.y, bounds.y, 0);

		moveDirection.x = _calculateMaxRightScroll(moveDirection)
		moveDirection.y = _calculateMaxBottomScroll(moveDirection)

		paper.view.scrollBy(moveDirection);
	};
});