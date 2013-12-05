define(['AppGlobals'], 
function(appGlobals) {
	'use strict';
	var _topLeftCornerOfMap;

	var _getTopLeftCornerOfMap = function() {
		if (_topLeftCornerOfMap) {
			return _topLeftCornerOfMap;
		}

		var hexRadius = appGlobals.map.getDetails().hexRadius;

		var topLeftPoint = new paper.Point(hexRadius, hexRadius);
		topLeftPoint.x = _quickRound(topLeftPoint.x);
		topLeftPoint.y = _quickRound(topLeftPoint.y);

		_topLeftCornerOfMap = topLeftPoint;
		return _topLeftCornerOfMap;
	}	

	var _quickRound = function(number) {
		var roundedNumber = (0.5 + number) | 0;
		roundedNumber = ~~ (0.5 + number);
		roundedNumber = (0.5 + number) << 0;
		return roundedNumber;
	}
	
	var getCenterPoint = function(column, row) {
		var hexSize = appGlobals.map.getDetails().hexSize;

		var centerPoint = {};
		centerPoint.x = _getTopLeftCornerOfMap().x;
		centerPoint.y = _getTopLeftCornerOfMap().y;

		centerPoint.x += _quickRound(hexSize._width * (column + (row % 2 ? 0.5 : 0)));
		centerPoint.y += _quickRound(hexSize._height *(row * 0.75));

		return centerPoint;
	}

	return { getCenterPoint: getCenterPoint };
});