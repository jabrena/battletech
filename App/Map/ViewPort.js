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

      var xStartingPoint = (currentView.x >= 0) ? currentView.x : 0;
      var numberOfHiddenColumns = Math.floor(xStartingPoint / mapDetails.hexSize.width);
      var firstColumn = (numberOfHiddenColumns === 0) ? numberOfHiddenColumns : numberOfHiddenColumns - 1;

      var numberOfColumnsToShow = Math.ceil(bounds.width / mapDetails.hexSize.width);
      var lastColumn = numberOfHiddenColumns + numberOfColumnsToShow + 1;
      lastColumn = (lastColumn > mapDetails.width) ? mapDetails.width : lastColumn;

      var yStartingPoint = (currentView.y >= 0) ? currentView.y : 0;
      var numberOfHiddenRows = Math.floor(yStartingPoint / mapDetails.hexSize.height);
      var firstRow = (numberOfHiddenRows === 0) ? numberOfHiddenRows : numberOfHiddenRows - 1;

      var numberOfRowsToShow = Math.floor(bounds.height / mapDetails.hexSize.height);
      var lastRow = firstRow + numberOfRowsToShow + 1;
      lastRow = (lastRow > mapDetails.height) ? mapDetails.height : lastRow;

      return { firstColumn: firstColumn,
               lastColumn: lastColumn,

               firstRow: firstRow,
               lastRow: lastRow
             };
   }

   return ViewPort
});