define(['Events/HexEvents'], function(hexEvents) {
	'use strict';
	var _mapDetails;
	var _topLeftPoint;
	var _hexImageCollection = [];

	var _getImageForNodeType = function(nodeDetails) {
		if (_hexImageCollection[nodeDetails.groundImage]) {
			return _hexImageCollection[nodeDetails.groundImage];
		}

		var project = new paper.Project();
		var layer  = new paper.Layer();

		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: _mapDetails.hexRadius,
			clipMask: true,
			opacity: .01, //zero would erase selected outlines
		});

		var hexRaster = new paper.Raster(nodeDetails.groundImage);
		hexRaster.fitBounds(hexagon.bounds, true);

		var saveSymbol = new paper.Symbol(layer);

		layer.remove();
		project.remove();

		_hexImageCollection[nodeDetails.groundImage] = saveSymbol;

		return _hexImageCollection[nodeDetails.groundImage];
	}

	var _getCenterPointAt = function(column, row) {
		var size = _mapDetails.hexSize;

		var startingPosition = { x: _topLeftPoint.x, y: _topLeftPoint.y };
		startingPosition.x += _quickRound(size._width * (column + (row % 2 ? 0.5 : 0)));
		startingPosition.y += _quickRound(size._height *(row * 0.75));

		return startingPosition;
	}

	var _quickRound = function(number) {
		var roundedNumber = (0.5 + number) | 0;
		roundedNumber = ~~ (0.5 + number);
		roundedNumber = (0.5 + number) << 0;
		return roundedNumber;
	}

	var HexDrawer = function(mapDetails) { 
		_mapDetails = mapDetails;
		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: mapDetails.hexRadius,
		});

		_topLeftPoint = new paper.Point(mapDetails.hexRadius, mapDetails.hexRadius);
		_topLeftPoint.x = _quickRound(_topLeftPoint.x);
		_topLeftPoint.y = _quickRound(_topLeftPoint.y);

		mapDetails.hexSize = hexagon.bounds.size;
		hexagon.remove();
	}

	HexDrawer.prototype.drawHex = function(nodeDetails, coordinates, mapLayer) {
		var hexPosition = _getCenterPointAt(coordinates.column, coordinates.row);
		var hexImage = _getImageForNodeType(nodeDetails);

		paper.projects[0].activate();
		mapLayer.activate();

		hexImage.place(hexPosition);
	}

	return HexDrawer;
});