define(['AppGlobals'], function(appGlobals) {
	var _mapDetails;

	var ViewPort = function(mapDetails) {
		_mapDetails = mapDetails;
	}

	ViewPort.prototype.getView = function() {
		var currentView = paper.view.bounds;
		var mapDetails = _mapDetails;

		var numberOfHiddenColumns = Math.floor(currentView.x / mapDetails.hexSize.width);
		var numberOfHiddenRows = Math.floor(currentView.y / (mapDetails.hexSize.height * 0.75));

		var numberOfColumnsToShow = Math.ceil(currentView.width / mapDetails.hexSize.width);
		var numberOfRowsToShow = Math.ceil(currentView.height / (mapDetails.hexSize.height * 0.75));

		return { firstColumn: numberOfHiddenColumns,
				 lastColumn: numberOfHiddenColumns + numberOfColumnsToShow,
				 
				 firstRow: numberOfHiddenRows,
				 lastRow: numberOfHiddenRows + numberOfRowsToShow
			   };
	}

	return ViewPort
});