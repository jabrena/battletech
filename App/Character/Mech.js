define([], function() {
	var _mech;
	var _p

	var Mech = function(map, startingNode) {
		var startingHex = map.getHexFromNode(startingNode).hex;
		_mech = new paper.Raster('redMechImage', startingHex.position);
		
		_mech.size.width = startingHex.bounds.size.width *.5;
		_mech.size.height = startingHex.bounds.size.height *.6;
		_mech.movement = 3;

		_mech.data.position = { row: undefined, column: undefined };
		this.moveToHex(startingHex)
	}

	Mech.prototype.remainingMovement = function() {
		return _mech.movement;
	}

	Mech.prototype.moveToHex = function(hex) {
		_mech.setPosition(hex.position);
		_mech.data.position.row = hex.row;
		_mech.data.position.column  = hex.column;
	}

	Mech.prototype.getPosition = function() {
		return _mech.data.position;
	}

	return Mech;
});