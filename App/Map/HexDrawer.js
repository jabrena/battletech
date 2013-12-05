define(['Events/HexEvents', 'Map/HexPositionCalculator'], function(hexEvents, hexPositionCalculator) {
	'use strict';
	var _mapDetails;
	var _topLeftPoint;
	var _hexImageCollection = [];

	var _createImageForNodeType = function(nodeDetails, withinRange) {
		var project = new paper.Project();
		var layer  = new paper.Layer();

		var invisilbeHex = new paper.Path.RegularPolygon({
			sides: 6,
			radius: _mapDetails.hexRadius,
			clipMask: true,
		});

		var hexRaster = new paper.Raster(nodeDetails.groundImage);
		hexRaster.fitBounds(invisilbeHex.bounds, true);

		var opacity = (withinRange) ? .2 : .01; //zero would erase selected outlines
		var visibleHex = new paper.Path.RegularPolygon({
			sides: 6,
			fillColor: 'green',
			selected: withinRange,
			radius: _mapDetails.hexRadius,
			clipMask: false,
			opacity: opacity
		});

		var savedSymbol = new paper.Symbol(layer);

		layer.remove();
		project.remove();

		return savedSymbol;
	}

	var _getCorrectHexState = function(node, hexType) {
		if (node.withinRange) {
			return hexType.withinRange;
		}
		
		return hexType.normal;
	}

	var _getImageForNodeType = function(node) {
		var nodeDetails = node.details;
		var hexType = _hexImageCollection[nodeDetails.groundImage];

		if (hexType) {
			return _getCorrectHexState(node, hexType);
		}

		hexType = {};
		_hexImageCollection[nodeDetails.groundImage] = hexType;

		var normalHexImage = _createImageForNodeType(nodeDetails, false);
		hexType.normal = normalHexImage;

		var withinRangeHexImage = _createImageForNodeType(nodeDetails, true);
		hexType.withinRange = withinRangeHexImage;

		return _getCorrectHexState(node, hexType);
	}

	var HexDrawer = function(mapDetails) { 
		_mapDetails = mapDetails;
	}

	HexDrawer.prototype.drawHex = function(node, mapLayer) {
		var hexPosition = hexPositionCalculator.getCenterPoint(node.x, node.y);
		var hexImage = _getImageForNodeType(node);

		paper.projects[0].activate();
		mapLayer.activate();

		hexImage.place(hexPosition);
	}

	return HexDrawer;
});