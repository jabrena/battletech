define(['PathFinding/Core/Grid'], function(Grid) {
	'use strict';
	var HEX_RADIUS = 75;
	var TOP_LEFT_POINT = new paper.Point(HEX_RADIUS, HEX_RADIUS);

	var _grid;
	var _hexSize;
	var _mapHexes;

	var _createHex = function(nodeDetails, position) {
		var group = new paper.Group();

		var hexagon = new paper.Path.RegularPolygon({
			center: position,
			sides: 6,
			radius: HEX_RADIUS,
			fillColor: nodeDetails.color,
			parent: group
		});
		hexagon.row = position.row;
		hexagon.column = position.column

		_mapHexes.push(hexagon);
		return hexagon;
	}

	var _getHexStartingPosition = function(column, row) {
		var size = _getHexSize();
		var startingPosition = new paper.Point(TOP_LEFT_POINT);
		startingPosition.x += size._width * (column + (row % 2 ? 0.5 : 0));
		startingPosition.y += size._height *(row * 0.75);
		startingPosition.column = column;
		startingPosition.row = row;
		return startingPosition;
	}

	var _getHexSize = function() {
		if (!_hexSize) {
			var fakeNode =  { color: 'fake' }
			var tempHex = _createHex(fakeNode, TOP_LEFT_POINT)
			_hexSize = tempHex.bounds.size;
			tempHex.remove();
		}
		return _hexSize;
	}

	var MapDrawer = function(grid) {
		_grid = grid;
		_mapHexes = []
	}

	MapDrawer.prototype.drawMap = function()  {
		for (var y = 0; y < _grid.height; y++) {
			for (var x = 0; x < _grid.width; x++) {
				var startingPosition = _getHexStartingPosition(x, y);
				var nodeDetails = _grid.getNodeAt(x, y).details;
				_createHex(nodeDetails, startingPosition);
			}
		}
	}

	MapDrawer.prototype.colorPath = function(pointsInPath) {
		paper.project.activeLayer.selected = false;
		var hexesOnPath = [];
		pointsInPath.forEach(function(point) {
			var hexOnPath = _(_mapHexes).findWhere({'column': point[0], 'row': point[1] });
			hexesOnPath.push(hexOnPath);
		});

		hexesOnPath.forEach(function(hex) {
			hex.setSelected(true);
		});
	}

	MapDrawer.prototype.colorHexesWithinReach = function(markedGrid) {
		var allNodes = _(markedGrid.nodes).flatten();
		var availableNodes = _(allNodes).where({ 'opened': true, 'withinRage': true });

		var availableHexes = [];
		availableNodes.forEach(function(node) {
			var availableHex = _(_mapHexes).findWhere({'column': node.x, 'row': node.y });
			availableHexes.push(availableHex);
		});

		availableHexes.forEach(function(hex) {
			hex.setOpacity(.4);
		});
	}

	MapDrawer.prototype.getHexFromNode = function(node) {
		return _(_mapHexes).findWhere({'column': node.x, 'row': node.y });
	}

	MapDrawer.prototype.getHexFromPoint = function(point) {
		return _(_mapHexes).findWhere({'column': point.x, 'row': point.y });
	}

	return MapDrawer;
});