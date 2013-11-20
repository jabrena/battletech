define(['PathFinding/Core/Grid'], function(Grid) {
	'use strict';
	var HEX_RADIUS = 75;
	var TOP_LEFT_POINT = new paper.Point(HEX_RADIUS, HEX_RADIUS);

	var _grid;
	var _hexSize;
	var _mapGroup;

	var _createHex = function(position, group) {
		var hexagon = new paper.Path.RegularPolygon({
			center: position,
			sides: 6,
			radius: HEX_RADIUS,
			fillColor: 'darkgrey',
			parent: group
		});
		hexagon.row = position.row;
		hexagon.column = position.column

		return hexagon;
	}

	var _getHexStartingPosition = function(row, column) {
		var size = _getHexSize();
		var startingPosition = new paper.Point(TOP_LEFT_POINT);
		startingPosition.x += size._width * (row + (column % 2 ? 0.5 : 0));
		startingPosition.y += size._height *(column * 0.75);
		startingPosition.row = row;
		startingPosition.column = column;
		return startingPosition;
	}

	var _getHexSize = function() {
		if (!_hexSize) {
			var tempGroup = new paper.Group();
			var tempHex = _createHex(TOP_LEFT_POINT, tempGroup)
			_hexSize = tempHex.bounds.size;
			tempHex.remove();
			tempGroup.remove();
		}
		return _hexSize;
	}

	var MapDrawer = function(grid) {
		_grid = grid;
		_mapGroup = new paper.Group();
	}

	MapDrawer.prototype.drawMap = function()  {
		for (var y = 0; y < _grid.height; y++) {
			for (var x = 0; x < _grid.width; x++) {
				var startingPosition = _getHexStartingPosition(x, y);
				_createHex(startingPosition, _mapGroup);
			}
		}
	}

	MapDrawer.prototype.colorPath = function(pointsInPath) {
		var hexesOnMap = _mapGroup._children;
		var hexesOnPath = [];
		pointsInPath.forEach(function(point) {
			var hexOnPath = _(hexesOnMap).findWhere({'row': point[0], 'column': point[1]});
			hexesOnPath.push(hexOnPath);
		});

		hexesOnPath.forEach(function(hex) {
			hex.setSelected(true);
		});
	}

	return MapDrawer;
});