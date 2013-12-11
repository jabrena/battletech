define(['AppGlobals','PathFinding/Core/Grid', 'PathFinding/Finders/AStarFinder', 'Map/Map', 'Events/MapScrollEvents'], 
function(appGlobals, Grid, PathFinder, Map, MapScrollEvents) {
	'use strict';
	var initMap = function(mapDetails) {
		appGlobals.pathFinder = new PathFinder();
		appGlobals.pristineGrid = new Grid(mapDetails.width, mapDetails.height); 
		
		appGlobals.map = new Map(mapDetails);
		appGlobals.map.draw();
	}

	return { initMap: initMap };
});