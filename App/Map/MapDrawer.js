define(['PathFinding/Core/Grid'], function(Grid) {
	'use strict';
	var HEX_RADIUS = 75;
	var TOP_LEFT_POINT = new paper.Point(HEX_RADIUS, HEX_RADIUS);

	var _grid;

	var _createHex = function(centerPosition) {
		var group = new paper.Group();

		var hexagon = new paper.Path.RegularPolygon({
			center: centerPosition,
			sides: 6,
			radius: HEX_RADIUS,
			fillColor: 'darkgrey',
			parent: group
		});

		return hexagon;
	}

	var MapDrawer = function(grid) {
		_grid = grid;
	}

	MapDrawer.prototype.drawMap = function()  {
		var tempHex = _createHex()
		var size = tempHex.bounds.size;
		tempHex.remove();
		for (var y = 0; y < _grid.height; y++) {
			for (var x = 0; x < _grid.width; x++) {
				//hex.position += size * [x + (y % 2 ? 0.5 : 0), y * 0.75];
				var startingPosition = new paper.Point(TOP_LEFT_POINT);
				startingPosition.x += size._width * (x + (y % 2 ? 0.5 : 0));
				startingPosition.y += size._height *(y * 0.75);
				console.log(startingPosition);
				var hex = _createHex(startingPosition);
			}
		}
	}

	return MapDrawer;
});