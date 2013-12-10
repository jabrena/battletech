define(['Turns/CombatTurn'],
function(combatTurn) {

	var drawPath = function(currentPosition, newPosition) {
		redMech.path = new Path(currentPosition, newPosition);
		redMech.path.strokeColor = 'red';
		redMech.path.closed = false;
	}

	var whenMouseClicksUnit = function(event) {
		var activeUnit = combatTurn.getActiveUnit();

		if(activeUnit) {
			var targetUnit = event.target;
			var weaponPath = new paper.Path(activeUnit._mech.position, targetUnit.position);
			weaponPath.strokeColor = 'red';
			weaponPath.strokeWidth = 10;
			weaponPath.closed = false;
		}
	}

	return {
		whenMouseClicksUnit: whenMouseClicksUnit
	}
});