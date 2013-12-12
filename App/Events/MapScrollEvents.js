define(['AppGlobals'], function(appGlobals) {
	'use strict';

	var _calculateMaxRightScroll = function(moveDirection) {
		var bounds = appGlobals.camera.bounds;

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
		var bounds = appGlobals.camera.bounds;

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
		var view = paper.view.center;
		var bounds = paper.view.bounds;

		if ((xCord != view.x) || (yCord != view.y))  {
			setTimeout(function() {
				var maxScrollAmount = 60;
				var minScrollAmount = maxScrollAmount * -1;

				var xDiff = xCord - view.x;
				xDiff = (xDiff > maxScrollAmount) ? maxScrollAmount : xDiff;
				xDiff = (xDiff < minScrollAmount) ? minScrollAmount : xDiff;

				var yDiff = yCord - view.y;
				yDiff = (yDiff > maxScrollAmount) ? maxScrollAmount : yDiff;
				yDiff = (yDiff < minScrollAmount) ? minScrollAmount : yDiff;

				var finalMoveAmount = new paper.Point(xDiff, yDiff);
				finalMoveAmount.y =  _adjustMinDestinationIfInvalid(yDiff, bounds.y, 0);
				finalMoveAmount.y = _calculateMaxBottomScroll(finalMoveAmount);

				finalMoveAmount.x = _adjustMinDestinationIfInvalid(finalMoveAmount.x, bounds.x, 0);
				finalMoveAmount.x = _calculateMaxRightScroll(finalMoveAmount);

				paper.view.scrollBy(finalMoveAmount);

				paper.project.layers.forEach(function(layer) {
					layer.children = [];
				});
				appGlobals.map.drawMap(appGlobals.activeGrid);

				if (finalMoveAmount.x !== 0 || finalMoveAmount.y !== 0) {
	        		centerOnPoint(xCord, yCord);
				}
			}, 0)
		}
	}

	var _scrollTo = function(xCord, yCord, downXCoord, downYCoord) {
		var moveDirection = new paper.Point();
		moveDirection.x = downXCoord - xCord;
		moveDirection.y = downYCoord - yCord;

		var bounds = appGlobals.camera.bounds;

		moveDirection.x = _adjustMinDestinationIfInvalid(moveDirection.x, bounds.x, 0);
		moveDirection.y = _adjustMinDestinationIfInvalid(moveDirection.y, bounds.y, 0);

		moveDirection.x = _calculateMaxRightScroll(moveDirection);
		moveDirection.y = _calculateMaxBottomScroll(moveDirection);

		appGlobals.camera.view.x += moveDirection.x;
		appGlobals.camera.view.y += moveDirection.y;

		appGlobals.map.draw(appGlobals.activeGrid);
	}

	var onMouseDrag = function(event) {
		console.log(event);
		_scrollTo(event.drugTo.x, event.drugTo.y,
				  event.clickedAt.x, event.clickedAt.y);
	};

	radio('mouseDragEvent').subscribe(onMouseDrag);

	return {
		centerOnPoint: centerOnPoint
	}
});