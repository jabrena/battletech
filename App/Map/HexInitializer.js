define([], function() {
	var getHexSize = function(hexRadius) {
		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: hexRadius,
		});

		var hexSize = hexagon.bounds.size;
		hexagon.remove();

		return hexSize
	}

	return { getHexSize: getHexSize };
});