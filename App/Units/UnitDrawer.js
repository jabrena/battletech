define(['AppGlobals'],
function(appGlobals) {

	var _isInsideView = function(unit, view) {
		var column = unit.getLocation().column;
		var row = unit.getLocation().row;

		var visibleColumn = column >= view.firstColumn &&
					        column <= view.lastColumn;

		var visibleRow = row >= view.firstRow &&
						 row <= view.lastRow;

		return visibleColumn && visibleRow;
	}

	var UnitDrawer = function() { }

	UnitDrawer.prototype.drawUnits = function(view) {
		var units = appGlobals.units;

		var unitsToDraw = [];
		units.forEach(function(unit) {
			if(_isInsideView(unit, view)) {
				unitsToDraw.push(unit.getRaster());
			}
		});

		paper.project.layers[0].addChildren(unitsToDraw);
	}

	return UnitDrawer;
});