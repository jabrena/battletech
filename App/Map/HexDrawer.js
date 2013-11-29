define(['Events/HexEvents'], function(hexEvents) {
	'use strict';
	var HEX_RADIUS = 25;
	var TOP_LEFT_POINT = new paper.Point(HEX_RADIUS, HEX_RADIUS);

	var _hexSize;

	var _drawTopLayer = function(coordinates, position, topLayer) {
		topLayer.activate();

		var group = new paper.Group();

		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: HEX_RADIUS,
			position: position,
			fillColor: 'green',
			parent: group,
			clipMask: false,
			opacity: .01, //zero would erase selected outlines
			name: 'hexagon'
		});

		hexagon.row = coordinates.row;
		hexagon.column = coordinates.column

		hexagon.onMouseEnter = hexEvents.whenMouseEntersHex;
		hexagon.onClick = hexEvents.whenMouseClicksHex;

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

	var _getHexStartingPosition = function(coordinates) {
		var size = _hexSize;

		var startingPosition = _(TOP_LEFT_POINT).clone();
		startingPosition.x += size._width * (coordinates.column + (coordinates.row % 2 ? 0.5 : 0));
		startingPosition.y += size._height *(coordinates.row * 0.75);

		return startingPosition;
	}

	var HexDrawer = function() { 
		//this will be used to calculate positions before hex is created to avoid bug with setPosition
		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: HEX_RADIUS,
		});

		_hexSize = hexagon.bounds.size;
		hexagon.remove();
	}

	HexDrawer.prototype.drawHex = function(nodeDetails, coordinates, topLayer, bottomLayer) {
		//calculate position first to avoid but with setPosition;
		var hexPosition = _getHexStartingPosition(coordinates);
		var topLayerHex = _drawTopLayer(coordinates, hexPosition, topLayer);

		_drawBottomLayer(nodeDetails, topLayerHex, bottomLayer);

		return topLayerHex;
	}

	return HexDrawer;
});