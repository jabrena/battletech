define(['AppGlobals', 'Map/HexPositionCalculator'],
function(appGlobals, hexPositionCalculator) {
	var _mech;

	var Mech = function(column, row) {
		_mech = new paper.Raster('redMechImage');
		
		var hexSize = appGlobals.map.getDetails().hexSize;
		_mech.size.width = hexSize.width *.5;
		_mech.size.height = hexSize.height *.6;
		_mech.movement = 3;

		_mech.data.position = { row: undefined, column: undefined };
		this.moveToHex(column, row)
	}

	Mech.prototype.remainingMovement = function() {
		return _mech.movement;
	}

	Mech.prototype.moveToHex = function(column, row) {
		var position = hexPositionCalculator.getCenterPoint(column, row);

		_mech.setPosition(position);
		_mech.data.position.row = row;
		_mech.data.position.column  = column;
	}

	Mech.prototype.getLocation = function() {
		return _mech.data.position;
	}

	return Mech;
});