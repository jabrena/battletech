define(['Events/HexEvents'], function(hexEvents) {
	'use strict';
	var _mapDetails;
	var _topLeftPoint;

	var _drawTopLayer = function(coordinates, position, topLayer) {
		topLayer.activate();

		var group = new paper.Group();

		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: _mapDetails.hexRadius,
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
		var size = _mapDetails.hexSize;

		var startingPosition = _(_topLeftPoint).clone();
		startingPosition.x += size._width * (coordinates.column + (coordinates.row % 2 ? 0.5 : 0));
		startingPosition.y += size._height *(coordinates.row * 0.75);

		return startingPosition;
	}

	var HexDrawer = function(mapDetails) { 
		//this will be used to calculate positions before hex is created to avoid bug with setPosition
		_mapDetails = mapDetails;
		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: mapDetails.hexRadius,
		});

		_topLeftPoint = new paper.Point(mapDetails.hexRadius, mapDetails.hexRadius);
		mapDetails.hexSize = hexagon.bounds.size;
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