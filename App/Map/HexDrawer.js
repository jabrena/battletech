define(['Events/HexEvents'], function(hexEvents) {
	'use strict';
	var _mapDetails;
	var _topLeftPoint;
	var _hexImageCollection = [];

	var _drawTopLayer = function(nodeDetails, coordinates, position) {
		if (_hexImageCollection[nodeDetails.groundImage]) {
			return _hexImageCollection[nodeDetails.groundImage];
		}

		//else
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

		var hexImage = layer.rasterize();//.toDataURL();
		var grrr = new paper.Symbol(hexImage);

		layer.remove();
		project.remove();

		//var img = new Image();
		//img.src = hexImage;


		_hexImageCollection[nodeDetails.groundImage] = grrr;
		//_hexImageCollection[nodeDetails.groundImage] = img;

		return _hexImageCollection[nodeDetails.groundImage];
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
		startingPosition.x += Math.round(size._width * (coordinates.column + (coordinates.row % 2 ? 0.5 : 0)));
		startingPosition.y += Math.round(size._height *(coordinates.row * 0.75));

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
		//calculate position first to avoid bug with setPosition;
		var hexPosition = _getHexStartingPosition(coordinates);
		var topLayerHexImage = _drawTopLayer(nodeDetails, coordinates, hexPosition, topLayer);

		paper.projects[0].activate();
		topLayer.activate();

		topLayerHexImage.place(hexPosition);
		//var group = new paper.Group();
		//group.addChild(topLayerHexImage);
		//group.setPosition(hexPosition)

		//_drawBottomLayer(nodeDetails, topLayerHex, bottomLayer);
		//paper.getView()._context.drawImage(topLayerHexImage, hexPosition.x, hexPosition.y);

		return topLayerHexImage;
	}

	return HexDrawer;
});