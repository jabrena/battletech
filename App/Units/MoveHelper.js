define(['AppGlobals'], function(AppGlobals) {
	'use strict';

	var _markNodesWithinReach = function(unit, destinationNode, pathFinder, gridToMark) {
		var tempGrid = AppGlobals.pristineGrid.clone();
		var path = pathFinder.findPath(unit.location.column, unit.location.row,
								   destinationNode.x, destinationNode.y,
								   tempGrid, unit.remainingMovement());
		return _markMovableHexes(tempGrid, gridToMark);
	}
	
	var _markMovableHexes = function(markedGrid, gridToMark) {
		var allNodes = _(markedGrid.nodes).flatten();
		var availableNodes = _(allNodes).where({ 'opened': true, 'withinRange': true });

		availableNodes.forEach(function(node) {
			var node = gridToMark.getNodeAt(node.x, node.y);
			node.withinRange = true;
		});

		return gridToMark;
	}

	var getValidMove = function(unit, clickedNode, pathFinder) {
		var grid = AppGlobals.activeGrid.clone();

		var path = pathFinder.findPath(unit.location.column, unit.location.row,
								   clickedNode.x, clickedNode.y,
								   grid, unit.remainingMovement());

		var markedClickedNode = grid.getNodeAt(clickedNode.x, clickedNode.y);

		var destinationNode;
		if (markedClickedNode.withinRange) {
			destinationNode = markedClickedNode;
		}

		return destinationNode;
	}

	var markNodesWithinReach = function(unit, pathFinder) {
		// find paths to every coner to avoid missing possible moves.
		// this should be done with a different path finding algo.
		var grid = AppGlobals.pristineGrid.clone();

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
		getValidMove: getValidMove
	}
});