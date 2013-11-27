define(['PathFinding/Core/Grid', 'Map/HexDrawer'], function(Grid, HexDrawer) {
	'use strict';
	var HEX_RADIUS = 25;
	var TOP_LEFT_POINT = new paper.Point(HEX_RADIUS, HEX_RADIUS);

	var _grid;
	var _hexSize;
	var _mapHexes;
	var _hexDrawer;

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
			var tempHex = new paper.Path.RegularPolygon({
				sides: 6,
				radius: HEX_RADIUS,
			});

			_hexSize = tempHex.bounds.size;
		}
		return _hexSize;
	}

	var _initLayers = function() {
		if (paper.project.layers.length !== 1) {
			throw ('this should be one, we are about to create a nasty bug!')
		}
		paper.project.activeLayer.name = 'top';
	
		var bottomLayer = new paper.Layer();
		bottomLayer.name = 'bottom';
	}

	var MapDrawer = function(grid) {
		_grid = grid;
		_mapHexes = []
		_hexDrawer = new HexDrawer(HEX_RADIUS);

		_initLayers();
	}

	MapDrawer.prototype.drawMap = function()  {
		var topLayer = _(paper.project.layers).findWhere({ 'name': 'top' });
		var bottomLayer = _(paper.project.layers).findWhere({ 'name': 'bottom' });

		for (var y = 0; y < _grid.height; y++) {
			for (var x = 0; x < _grid.width; x++) {
				var startingPosition = _getHexStartingPosition(x, y);
				var nodeDetails = _grid.getNodeAt(x, y).details;
				var hex = _hexDrawer.drawHex(nodeDetails, startingPosition, topLayer, bottomLayer);

				_mapHexes.push(hex);
			}
		}

		topLayer.moveAbove(bottomLayer);
		topLayer.activate();
	}

	MapDrawer.prototype.colorPath = function(pointsInPath) {
		paper.project.activeLayer.selected = false;

		var hexesOnPath = [];
		pointsInPath.forEach(function(point) {
			hexesOnPath.push(_getHexFromPoint(point));
		});

		hexesOnPath.forEach(function(hex) {
			hex.setSelected(true);
		});
	}

	MapDrawer.prototype.colorHexesWithinReach = function(mech, pathFinder) {
		// find paths to every coner to avoid missing possible moves.
		// there should be a better way to do this.
		var SeMapCorner = _grid.getNodeAt(_grid.width-1, _grid.height-1);
		_colorPathsTo(mech, SeMapCorner, pathFinder);

		var NeMapCorner = _grid.getNodeAt(_grid.width-1, 0);
		_colorPathsTo(mech, NeMapCorner, pathFinder);

		var NwMapCorner = _grid.getNodeAt(0, 0);
		_colorPathsTo(mech, NwMapCorner, pathFinder);

		var SwMapCorner = _grid.getNodeAt(0, _grid.height-1);
		_colorPathsTo(mech, SwMapCorner, pathFinder);
	}

	var _colorPathsTo = function(mech, destinationNode, pathFinder) {
		var tempGrid = _grid.clone();
		var path = pathFinder.findPath(mech.getPosition().column, mech.getPosition().row,
								   destinationNode.x, destinationNode.y,
								   tempGrid, mech.remainingMovement());
		_colorMovableHexes(tempGrid);
	}
	
	var _colorMovableHexes = function(markedGrid) {
		var allNodes = _(markedGrid.nodes).flatten();
		var availableNodes = _(allNodes).where({ 'opened': true, 'withinRage': true });

		var self = this;
		var availableHexes = [];
		availableNodes.forEach(function(node) {
			availableHexes.push(_getHexFromNode(node));
		});

		availableHexes.forEach(function(hex) {
			hex.setOpacity(.6);
		});
	}

	MapDrawer.prototype.clearMovableHexes = function(node) {
		_mapHexes.forEach(function(hex) {
			hex.setOpacity(.01);
		});
	}

	var _getHexFromNode = function(node) {
		return _(_mapHexes).find(function(hex) { 
			return hex.column === node.x && hex.row === node.y
		});
	}
	MapDrawer.prototype.getHexFromNode = _getHexFromNode;


	var _getHexFromPoint = function(point) {
		return _(_mapHexes).find(function(hex) { 
			return hex.column === point[0] && hex.row === point[1];
		});
	}
	MapDrawer.prototype.getHexFromPoint = _getHexFromPoint;



	return MapDrawer;
});