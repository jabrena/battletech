define(['AppGlobals', 'Events/ScrollCalculator'],
function(appGlobals, scrollCalculator) {
   'use strict';

    var centerOnPoint = function(xCord, yCord) {
      var view = appGlobals.camera.view
      var bounds = appGlobals.camera.bounds;

      if ((xCord != view.x) || (yCord != view.y))  {
         setTimeout(function() {
            var maxScrollAmount = 4;
            var minScrollAmount = maxScrollAmount * -1;

            var xDiff = xCord - view.x;
            xDiff = (xDiff > maxScrollAmount) ? maxScrollAmount : xDiff;
            xDiff = (xDiff < minScrollAmount) ? minScrollAmount : xDiff;

            var yDiff = yCord - view.y;
            yDiff = (yDiff > maxScrollAmount) ? maxScrollAmount : yDiff;
            yDiff = (yDiff < minScrollAmount) ? minScrollAmount : yDiff;

            var finalMoveAmount = { x: 0, y: 0 };
            finalMoveAmount.y =  scrollCalculator.adjustMinDestinationIfInvalid(yDiff, view.y, 0);
            finalMoveAmount.y = scrollCalculator.calculateMaxBottomScroll(finalMoveAmount.y);

            finalMoveAmount.x = scrollCalculator.adjustMinDestinationIfInvalid(xDiff, view.x, 0);
            finalMoveAmount.x = scrollCalculator.calculateMaxRightScroll(finalMoveAmount.x);

            view.x += finalMoveAmount.x;
            view.y += finalMoveAmount.y;

            appGlobals.map.draw();

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

      view.x += moveDirection.x;
      view.y += moveDirection.y;

      appGlobals.map.draw();
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