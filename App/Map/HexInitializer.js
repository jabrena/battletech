define([], function() {
	var getHexSize = function(hexRadius) {
		var hexagon = new paper.Path.RegularPolygon({
			sides: 6,
			radius: hexRadius,
		});
		hexagon.rotate(90);

		var hexSize = hexagon.bounds.size;
		hexagon.remove();

		hexSize.width *= .75;
		return hexSize
	}

	return { getHexSize: getHexSize };
});