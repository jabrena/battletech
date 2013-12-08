define(['AppGlobals', 'Map/HexPositionCalculator', 'Events/UnitEvents'],
function(appGlobals, hexPositionCalculator, unitEvents) {

	var Mech = function(column, row, image) {
		this._mech = new paper.Raster(image);
		
		var hexSize = appGlobals.map.getDetails().hexSize;
		this._mech.size.width = hexSize.width *.5;
		this._mech.size.height = hexSize.height *.6;
		this._mech.movement = 3;

		this._mech.data.position = { row: undefined, column: undefined };
		this.moveToHex(column, row);

		this._mech.onClick = unitEvents.whenMouseClicksUnit;
	}

	Mech.prototype._mech = {};

	Mech.prototype.remainingMovement = function() {
		return this._mech.movement;
	}

	Mech.prototype.getRaster = function() {
		return this._mech;
	}

	Mech.prototype.moveToHex = function(column, row) {
		var position = hexPositionCalculator.getCenterPoint(column, row);

		this._mech.setPosition(position);
		this._mech.data.position.row = row;
		this._mech.data.position.column  = column;
	}

	Mech.prototype.getLocation = function() {
		return this._mech.data.position;
	}

	return Mech;
});