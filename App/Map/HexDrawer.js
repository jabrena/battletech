define(['Events/HexEvents'], function(hexEvents) {
	'use strict';
	var HEX_RADIUS = 25;
	var TOP_LEFT_POINT = new paper.Point(HEX_RADIUS, HEX_RADIUS);

	var _drawTopLayer = function(coordinates, topLayer) {
		topLayer.activate();

		var group = new paper.Group();

		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: HEX_RADIUS,
			fillColor: 'green',
			parent: group,
			clipMask: false,
			opacity: .01, //zero would erase selected outlines
			name: 'hexagon'
		});

		hexagon.row = coordinates.row;
		hexagon.column = coordinates.column

		hexagon.onMouseEnter = hexEvents.whenMouseEntersHex;

		return hexagon;
	}

	var _drawBottomLayer = function(nodeDetails, hexToCopy, bottomLayer) {
		bottomLayer.activate();

		var group = new paper.Group();

		var maskingHex = hexToCopy.copyTo(group);
		maskingHex.setClipMask(true);

		var hexImage = new paper.Raster(nodeDetails.groundImage, hexToCopy.position);
		hexImage.fitBounds(maskingHex.bounds, true);

		group.addChild(hexImage);
	}

	var _getHexStartingPosition = function(hex, coordinates) {
		var size = hex.bounds.size;

		var startingPosition = new paper.Point(TOP_LEFT_POINT);
		startingPosition.x += size._width * (coordinates.column + (coordinates.row % 2 ? 0.5 : 0));
		startingPosition.y += size._height *(coordinates.row * 0.75);

		return startingPosition;
	}

	var HexDrawer = function() { }

	HexDrawer.prototype.drawHex = function(nodeDetails, coordinates, topLayer, bottomLayer) {
		var topLayerHex = _drawTopLayer(coordinates, topLayer);
		var hexPosition = _getHexStartingPosition(topLayerHex, coordinates);
		topLayerHex.setPosition(hexPosition);

		_drawBottomLayer(nodeDetails, topLayerHex, bottomLayer);

		return topLayerHex;
	}

	return HexDrawer;
});