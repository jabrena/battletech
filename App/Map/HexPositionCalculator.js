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

		centerPoint.x += _quickRound(hexSize.width * column);
        var evenColumn = (column % 2) === 0;
        if (!evenColumn) {
           row += .5;
       }
       centerPoint.y += _quickRound(hexSize.height * row);

       return centerPoint;
	}

	var getLocationFromMouseClick = function(button) {
        var posx = button.clickedAt.x;
        var posy = button.clickedAt.y;

        var hexSize = appGlobals.map.getDetails().hexSize;
        var fullWidth = hexSize.width / .75;

        var x = (posx - (fullWidth/2)) / hexSize.width;
        var y = (posy - (hexSize.height/2)) / hexSize.height;
        var z = -0.5 * x - y;
        var y = -0.5 * x + y;

        var ix = Math.floor(x+0.5);
        var iy = Math.floor(y+0.5);
        var iz = Math.floor(z+0.5);
        var s = ix + iy + iz;
        if (s) {
            var abs_dx = Math.abs(ix-x);
            var abs_dy = Math.abs(iy-y);
            var abs_dz = Math.abs(iz-z);
            if (abs_dx >= abs_dy && abs_dx >= abs_dz) {
                ix -= s;
            } else if (abs_dy >= abs_dx && abs_dy >= abs_dz) {
                iy -= s;
            } else {
                iz -= s;
            }
        }

        var map_x = ix;
        var map_y = (iy - iz + (1 - ix %2 ) ) / 2 - 0.5;

        return { column: map_x, row: map_y };
	}

	return { getCenterPoint: getCenterPoint,
			 getLocationFromMouseClick: getLocationFromMouseClick
		   };
});