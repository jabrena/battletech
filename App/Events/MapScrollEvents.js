define(['AppGlobals', 'Events/ScrollCalculator'],
function(appGlobals, scrollCalculator) {
   'use strict';

    var centerOnPoint = function(xCord, yCord) {
      var view = paper.view.center;
      var bounds = paper.view.bounds;

      if ((xCord != view.x) || (yCord != view.y))  {
         setTimeout(function() {
            var maxScrollAmount = 1;
            var minScrollAmount = maxScrollAmount * -1;

            var xDiff = xCord - view.x;
            xDiff = (xDiff > maxScrollAmount) ? maxScrollAmount : xDiff;
            xDiff = (xDiff < minScrollAmount) ? minScrollAmount : xDiff;

            var yDiff = yCord - view.y;
            yDiff = (yDiff > maxScrollAmount) ? maxScrollAmount : yDiff;
            yDiff = (yDiff < minScrollAmount) ? minScrollAmount : yDiff;

            var finalMoveAmount = new paper.Point(xDiff, yDiff);
            finalMoveAmount.y =  _adjustMinDestinationIfInvalid(yDiff, bounds.y, 0);
            finalMoveAmount.y = _calculateMaxBottomScroll(finalMoveAmount);

            finalMoveAmount.x = _adjustMinDestinationIfInvalid(finalMoveAmount.x, bounds.x, 0);
            finalMoveAmount.x = _calculateMaxRightScroll(finalMoveAmount);

            paper.view.scrollBy(finalMoveAmount);

            paper.project.layers.forEach(function(layer) {
             layer.children = [];
            });
            appGlobals.map.drawMap(appGlobals.activeGrid);

            if (finalMoveAmount.x !== 0 || finalMoveAmount.y !== 0) {
               centerOnPoint(xCord, yCord);
            }
         }, 0)
      }
   }

   var _scrollTo = function(xCord, yCord, downXCoord, downYCoord) {
      var moveDirection = {};
      moveDirection.x = downXCoord - xCord;
      moveDirection.y = downYCoord - yCord;

      var view = appGlobals.camera.view;

      moveDirection.x = scrollCalculator.adjustMinDestinationIfInvalid(moveDirection.x, view.x, 0);
      moveDirection.y = scrollCalculator.adjustMinDestinationIfInvalid(moveDirection.y, view.y, 0);

      moveDirection.x = scrollCalculator.calculateMaxRightScroll(moveDirection.x);
      moveDirection.y = scrollCalculator.calculateMaxBottomScroll(moveDirection.y);

      appGlobals.camera.view.x += moveDirection.x;
      appGlobals.camera.view.y += moveDirection.y;

      appGlobals.map.draw(appGlobals.activeGrid);
   }

   var onMouseDrag = function(event) {
      _scrollTo(event.drugTo.x, event.drugTo.y,
                event.clickedAt.x, event.clickedAt.y);
   };

   radio('mouseDragEvent').subscribe(onMouseDrag);

   return {
      onMouseDrag: onMouseDrag,
      centerOnPoint: centerOnPoint
   }
});