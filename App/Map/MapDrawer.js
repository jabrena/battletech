define(['PathFinding/Core/Grid'], function(Grid) {
	'use strict';
	var HEX_RADIUS = 25;
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
			parent: group,
			clipMask: true
		});
		hexagon.row = position.row;
		hexagon.column = position.column

		var hexImage = new paper.Raster(nodeDetails.groundImage, position);

		//hexImage.size.height = HEX_RADIUS * 4;
		//hexImage.size.width = HEX_RADIUS * 4;
		hexImage.fitBounds(hexagon.bounds, true);
		group.addChild(hexImage);
		hexImage.row = position.row;
		hexImage.column = position.column

		var hexImagePair = { hex: hexagon, image: hexImage };

		_mapHexes.push(hexImagePair);
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
			var tempHex = new paper.Path.RegularPolygon({
				sides: 6,
				radius: HEX_RADIUS,
			});

			_hexSize = tempHex.bounds.size;
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
			hexesOnPath.push(_getHexFromPoint(point).hex);
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
			availableHexes.push(_getHexFromNode(node).image);
		});

		availableHexes.forEach(function(hex) {
			hex.setOpacity(.6);
		});
	}

	MapDrawer.prototype.clearMovableHexes = function(node) {
		_mapHexes.forEach(function(item) {
			item.image.setOpacity(1);
		});
	}

	var _getHexFromNode = function(node) {
		return _(_mapHexes).find(function(item) { 
			return item.hex.column === node.x && item.hex.row === node.y
		});
	}
	MapDrawer.prototype.getHexFromNode = _getHexFromNode;


	var _getHexFromPoint = function(point) {
		return _(_mapHexes).find(function(item) { 
			return item.hex.column === point[0] && item.hex.row === point[1];
		});
	}
	MapDrawer.prototype.getHexFromPoint = _getHexFromPoint;



	return MapDrawer;
});