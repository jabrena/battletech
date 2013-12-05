define(['AppGlobals'], function(AppGlobals) {
	'use strict';

	var _markNodesWithinReach = function(mech, destinationNode, pathFinder, gridToMark) {
		var tempGrid = AppGlobals.grid.clone();
		var path = pathFinder.findPath(mech.getLocation().column, mech.getLocation().row,
								   destinationNode.x, destinationNode.y,
								   tempGrid, mech.remainingMovement());
		return _markMovableHexes(tempGrid, gridToMark);
	}
	
	var _markMovableHexes = function(markedGrid, gridToMark) {
		var allNodes = _(markedGrid.nodes).flatten();
		var availableNodes = _(allNodes).where({ 'opened': true, 'withinRage': true });

		availableNodes.forEach(function(node) {
			var node = gridToMark.getNodeAt(node.x, node.y);
			node.withinRange = true;
		});

		return gridToMark;
	}

	// not used yet
	var colorPath = function(pointsInPath) {
		paper.project.activeLayer.selected = false;

		var hexesOnPath = [];
		pointsInPath.forEach(function(point) {
			hexesOnPath.push(AppGlobals.map.getHexFromPoint(point));
		});

		hexesOnPath.forEach(function(hex) {
			hex.setSelected(true);
		});
	}

	var markNodesWithinReach = function(unit, pathFinder) {
		// find paths to every coner to avoid missing possible moves.
		// this should be done with a different path finding algo.
		var grid = _.clone(AppGlobals.grid);

		var SeMapCorner = grid.getNodeAt(grid.width-1, grid.height-1);
		grid =_markNodesWithinReach(unit, SeMapCorner, pathFinder, grid);

		var NeMapCorner = grid.getNodeAt(grid.width-1, 0);
		grid = _markNodesWithinReach(unit, NeMapCorner, pathFinder, grid);

		var NwMapCorner = grid.getNodeAt(0, 0);
		grid = _markNodesWithinReach(unit, NwMapCorner, pathFinder, grid);

		var SwMapCorner = grid.getNodeAt(0, grid.height-1);
		grid = _markNodesWithinReach(unit, SwMapCorner, pathFinder, grid);

		return grid;
	}

	return {
		markNodesWithinReach: markNodesWithinReach,
		colorPath: colorPath //not used yet
	}

});