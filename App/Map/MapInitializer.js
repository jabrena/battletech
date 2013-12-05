define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/Map', 'Events/MapScrollEvents'], 
function(appGlobals, Grid, PathFinder, Map, MapScrollEvents) {
	'use strict';
	var initMap = function(mapDetails) {
		appGlobals.pathFinder = new PathFinder();
		appGlobals.grid = new Grid(mapDetails.width, mapDetails.height); 
		
		appGlobals.map = new Map(mapDetails, appGlobals.grid);
		appGlobals.map.drawMap(appGlobals.grid);
	}

	return { initMap: initMap };
});