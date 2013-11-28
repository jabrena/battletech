define(['AppGlobals'], function(AppGlobals) {
	'use strict';

	var _colorPathsTo = function(mech, destinationNode, pathFinder) {
		var tempGrid = AppGlobals.grid.clone();
		var path = pathFinder.findPath(mech.getPosition().column, mech.getPosition().row,
								   destinationNode.x, destinationNode.y,
								   tempGrid, mech.remainingMovement());
		_colorMovableHexes(tempGrid);
	}
	
	var _colorMovableHexes = function(markedGrid) {
		var allNodes = _(markedGrid.nodes).flatten();
		var availableNodes = _(allNodes).where({ 'opened': true, 'withinRage': true });

		var self = this;
		var availableHexes = [];
		availableNodes.forEach(function(node) {
			availableHexes.push(AppGlobals.map.getHexFromNode(node));
		});

		availableHexes.forEach(function(hex) {
			hex.setOpacity(.3);
		});
	}


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

	var colorHexesWithinReach = function(mech, pathFinder) {
		// find paths to every coner to avoid missing possible moves.
		// there should be a better way to do this.
		var SeMapCorner = AppGlobals.grid.getNodeAt(AppGlobals.grid.width-1, AppGlobals.grid.height-1);
		_colorPathsTo(mech, SeMapCorner, pathFinder);

		var NeMapCorner = AppGlobals.grid.getNodeAt(AppGlobals.grid.width-1, 0);
		_colorPathsTo(mech, NeMapCorner, pathFinder);

		var NwMapCorner = AppGlobals.grid.getNodeAt(0, 0);
		_colorPathsTo(mech, NwMapCorner, pathFinder);

		var SwMapCorner = AppGlobals.grid.getNodeAt(0, AppGlobals.grid.height-1);
		_colorPathsTo(mech, SwMapCorner, pathFinder);
	}

	var clearMovableHexes = function(node) {
		var allHexesInMap = AppGlobals.map.getAllHexes();
		allHexesInMap.forEach(function(hex) {
			hex.setOpacity(.01); //zero would erase selected outlines
		});
	}

	return {
		clearMovableHexes: clearMovableHexes,
		colorHexesWithinReach: colorHexesWithinReach,
		colorPath: colorPath
	}

});