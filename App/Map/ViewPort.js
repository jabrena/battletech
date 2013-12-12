define(['AppGlobals'], function(appGlobals) {
	'use strict'
	var _mapDetails;

	var ViewPort = function(mapDetails) {
		_mapDetails = mapDetails;
	}

	ViewPort.prototype.getView = function() {
		var currentView = appGlobals.camera.view;
		var bounds = appGlobals.camera.bounds;
		var mapDetails = _mapDetails;

		var numberOfHiddenColumns = Math.floor(currentView.x / mapDetails.hexSize.width) || 0;
		var firstColumn = (numberOfHiddenColumns === 0) ? numberOfHiddenColumns : numberOfHiddenColumns - 1;

		var numberOfColumnsToShow = Math.ceil(bounds.width / mapDetails.hexSize.width);
		var lastColumn = numberOfHiddenColumns + numberOfColumnsToShow + 1;
		lastColumn = (lastColumn > mapDetails.width) ? mapDetails.width : lastColumn;
		
		var numberOfHiddenRows = Math.floor(currentView.y / mapDetails.hexSize.height) || 0;
		var firstRow = (numberOfHiddenRows === 0) ? numberOfHiddenRows : numberOfHiddenRows - 1;
		
		var numberOfRowsToShow = Math.ceil(bounds.height / mapDetails.hexSize.height);
		var lastRow = numberOfHiddenRows + numberOfRowsToShow + 1;
		lastRow = (lastRow > mapDetails.height) ? mapDetails.height : lastRow;

		return { firstColumn: firstColumn,
				 lastColumn: lastColumn,
				 
				 firstRow: firstRow,
				 lastRow: lastRow
			   };
	}

	return ViewPort
});