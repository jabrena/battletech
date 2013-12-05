define(['Events/HexEvents', 'Map/HexPositionCalculator'], function(hexEvents, hexPositionCalculator) {
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

	var HexDrawer = function(mapDetails) { 
		_mapDetails = mapDetails;
	}

	HexDrawer.prototype.drawHex = function(nodeDetails, coordinates, mapLayer) {
		var hexPosition = hexPositionCalculator.getCenterPoint(coordinates.column, coordinates.row);
		var hexImage = _getImageForNodeType(nodeDetails);

		paper.projects[0].activate();
		mapLayer.activate();

		hexImage.place(hexPosition);
	}

	return HexDrawer;
});