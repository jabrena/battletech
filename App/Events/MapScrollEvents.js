define(['AppGlobals'], function(appGlobals) {
	'use strict';

	var _calculateMaxRightScroll = function(moveDirection) {
		var bounds = paper.view.bounds;

		var mapDetails = appGlobals.map.getDetails();
		var hexWidth = mapDetails.hexSize.width;
		var numberOfHexes = mapDetails.width;

		var numberOfHexesOnScreenWidth = Math.floor(bounds.width / hexWidth) -1;
		var maxScrollablePoint = (numberOfHexes - numberOfHexesOnScreenWidth) * hexWidth;

		return _adjustMaxDestinationIfInvalid(moveDirection.x, bounds.x, maxScrollablePoint);
	}

	var _calculateMaxBottomScroll = function(moveDirection) {
		var bounds = paper.view.bounds;

		var mapDetails = appGlobals.map.getDetails();
		var hexHeight = mapDetails.hexSize.height * 0.75; //hexes overlap vertically
		var numberOfHexes = mapDetails.height;

		var numberOfHexesOnScreenHeight = Math.floor(bounds.height / hexHeight) -1;
		var maxScrollablePoint = (numberOfHexes - numberOfHexesOnScreenHeight) * hexHeight;

		return _adjustMaxDestinationIfInvalid(moveDirection.y, bounds.y, maxScrollablePoint);
	}

	var _adjustMaxDestinationIfInvalid = function(movement, currentLocation, maxBound) {
		var destination = currentLocation + movement;
		var destinationOutOfBounds = destination > maxBound;
		if (destinationOutOfBounds) {
			movement = maxBound - currentLocation;
		}

		return movement;
	}

	var _adjustMinDestinationIfInvalid = function(movement, currentLocation, minBound) {
		var destination = currentLocation + movement;
		var destinationOutOfBounds = destination < minBound;
		if (destinationOutOfBounds) {
			movement = minBound - currentLocation;
		}

		return movement;
	}

	appGlobals.tool.onMouseDrag = function(event) {
		var moveDirection = new paper.Point();
		moveDirection.x = event.downPoint.x - event.point.x;
		moveDirection.y = event.downPoint.y - event.point.y;

		var bounds = paper.view.bounds;

		moveDirection.x = _adjustMinDestinationIfInvalid(moveDirection.x, bounds.x, 0);
		moveDirection.y = _adjustMinDestinationIfInvalid(moveDirection.y, bounds.y, 0);

		moveDirection.x = _calculateMaxRightScroll(moveDirection)
		moveDirection.y = _calculateMaxBottomScroll(moveDirection)

		paper.view.scrollBy(moveDirection);
	};
});