define(['AppGlobals'], function(appGlobals) {
	'use strict';

	var _calculateMaxRightScroll = function(moveDirection) {
		var bounds = paper.view.bounds;

		var mapDetails = appGlobals.map.getDetails();
		var hexWidth = mapDetails.hexSize.width;
		var numberOfHexes = mapDetails.width;

		var maxScrollablePoint = _calculateMaxScrollBound(hexWidth,
														  numberOfHexes,
														  bounds.width)

		return _adjustMaxDestinationIfInvalid(moveDirection.x,
											  bounds.x,
									  		  maxScrollablePoint);
	}

	var _calculateMaxBottomScroll = function(moveDirection) {
		var bounds = paper.view.bounds;

		var mapDetails = appGlobals.map.getDetails();
		var hexHeight = mapDetails.hexSize.height;
		var numberOfHexes = mapDetails.height;

		var maxScrollablePoint = _calculateMaxScrollBound(hexHeight,
														  numberOfHexes,
														  bounds.height)

		return _adjustMaxDestinationIfInvalid(moveDirection.y,
											  bounds.y,
											  maxScrollablePoint);
	}

	var _calculateMaxScrollBound = function(hexSize, numberOfHexes, bounds) {
		var numberOfHexesOnScreenHeight = Math.floor(bounds / hexSize) -1;
		return (numberOfHexes - numberOfHexesOnScreenHeight) * hexSize;
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

	var centerOnPoint = function(xCord, yCord) {
		var centerPoint = new paper.Point(xCord, yCord);
        paper.view.center = centerPoint;
        _scrollTo(paper.view.center.x, paper.view.center.y,
        		  paper.view.center.x, paper.view.center.y);
	}

	var _scrollTo = function(xCord, yCord, downXCoord, downYCoord) {
		var moveDirection = new paper.Point();
		moveDirection.x = downXCoord - xCord;
		moveDirection.y = downYCoord - yCord;

		var bounds = paper.view.bounds;

		moveDirection.x = _adjustMinDestinationIfInvalid(moveDirection.x, bounds.x, 0);
		moveDirection.y = _adjustMinDestinationIfInvalid(moveDirection.y, bounds.y, 0);

		moveDirection.x = _calculateMaxRightScroll(moveDirection)
		moveDirection.y = _calculateMaxBottomScroll(moveDirection)

		paper.view.scrollBy(moveDirection);

		paper.project.layers.forEach(function(layer) {
			layer.children = [];
		});
		appGlobals.map.drawMap(appGlobals.activeGrid);
	}

	appGlobals.tool.onMouseDrag = function(event) {
		_scrollTo(event.point.x, event.point.y,
				  event.downPoint.x, event.downPoint.y);
	};

	return {
		centerOnPoint: centerOnPoint
	}
});