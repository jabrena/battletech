define([], function() {
	var _mech;

	var Mech = function(map, startingNode) {
		var startingHex = map.getHexFromNode(startingNode)
		_mech = new paper.Raster('redMechImage', startingHex.position);
		_mech.size.width = 50;
		_mech.size.height = 75;
	}

	return Mech;
});