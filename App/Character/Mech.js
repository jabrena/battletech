define([], function() {
	var _mech;

	var Mech = function(map, startingNode) {
		var startingHex = map.getHexFromNode(startingNode)
		_mech = new paper.Raster('redMechImage', startingHex.position);
		_mech.size.width = 50;
		_mech.size.height = 75;
		_mech.movement = 7;
	}

	Mech.prototype.remainingMovement = function() {
		return _mech.movement;
	}

	Mech.prototype.moveToHex = function(hex) {
		_mech.setPosition(hex.position);
	}

	return Mech;
});