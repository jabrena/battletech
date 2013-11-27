define([], function() {
	'use strict';
	var _hexRadius;

	var _drawTopLayer = function(position, topLayer) {
		topLayer.activate();

		var group = new paper.Group();

		var hexagon = new paper.Path.RegularPolygon({
			center: position,
			sides: 6,
			radius: _hexRadius,
			fillColor: 'green',
			parent: group,
			clipMask: false,
			opacity: .01,
			name: 'hexagon'
		});

		hexagon.row = position.row;
		hexagon.column = position.column

		hexagon.onMouseEnter = function() {
			console.log('use me instead of mouse over');
		};

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

	var HexDrawer = function(hexRadius) {
		_hexRadius = hexRadius;
	}

	HexDrawer.prototype.drawHex = function(nodeDetails, position, topLayer, bottomLayer) {
		var topLayerHex = _drawTopLayer(position, topLayer);
		_drawBottomLayer(nodeDetails, topLayerHex, bottomLayer);

		//var hexImagePair = { hex: hexagon, image: hexImage };
		//_mapHexes.push(hexImagePair);
		return topLayerHex;
	}

	return HexDrawer;
});