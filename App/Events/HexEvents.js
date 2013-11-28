define(['AppGlobals'], function(AppGlobals) {
	'use strict';

	var whenMouseEntersHex = function(event) {
		paper.project.activeLayer.selected = false;

		var hex = event.target;
		var tempGrid = AppGlobals.grid.clone();
		var path = AppGlobals.pathFinder.findPath(AppGlobals.mech.getPosition().column, AppGlobals.mech.getPosition().row,
									   	  		  hex.column, hex.row,
		 							   	   		  tempGrid, AppGlobals.mech.remainingMovement());
		AppGlobals.mapDrawer.colorPath(path);					
	}
	
	return {
		whenMouseEntersHex: whenMouseEntersHex
	};
});
