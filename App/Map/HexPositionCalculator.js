define(['AppGlobals'], 
function(appGlobals) {
   'use strict';

   var _quickRound = function(number) {
      var roundedNumber = (0.5 + number) | 0;
      roundedNumber = ~~ (0.5 + number);
      roundedNumber = (0.5 + number) << 0;
      return roundedNumber;
   }

   var _bah = function(bound, size) {
      var hexesOnScreen = bound / size;
      var hexesOnLeftSideOfHex = hexesOnScreen / 2;

      var moveCamera = hexesOnLeftSideOfHex * size;
      return moveCamera * -1;
   }

   var centerHexOnScreen = function(column, row) {
      var hexSize = appGlobals.map.getDetails().hexSize;
      var centerPoint = getCenterOfHex(column, row);
      centerPoint.x += _bah(appGlobals.camera.bounds.width, hexSize.width);
      centerPoint.y += _bah(appGlobals.camera.bounds.height, hexSize.height);

      return centerPoint;
   }

   var getCenterOfHex = function(column, row) {
      var hexSize = appGlobals.map.getDetails().hexSize;
      var centerPoint = { x: undefined, y: undefined }
      centerPoint.x = _quickRound(hexSize.width * column);
         var evenColumn = (column % 2) === 0;
      if (!evenColumn) {
           row += .5;
      }
      centerPoint.y = _quickRound(hexSize.height * row);

      return centerPoint;
   }

   var getLocationFromMouseClick = function(button) {
      var posx = button.clickedAt.x + appGlobals.camera.view.x;
      var posy = button.clickedAt.y + appGlobals.camera.view.y;

      var hexSize = appGlobals.map.getDetails().hexSize;
      var fullWidth = hexSize.width / .75;

      var x = (posx - (fullWidth/2)) / hexSize.width;
      var y = (posy - (hexSize.height/2)) / hexSize.height;
      var z = -0.5 * x - y;
      var y = -0.5 * x + y;

      var ix = Math.floor(x+0.5);
      var iy = Math.floor(y+0.5);
      var iz = Math.floor(z+0.5);
      var s = ix + iy + iz;
      if (s) {
         var abs_dx = Math.abs(ix-x);
         var abs_dy = Math.abs(iy-y);
         var abs_dz = Math.abs(iz-z);
         if (abs_dx >= abs_dy && abs_dx >= abs_dz) {
             ix -= s;
         } else if (abs_dy >= abs_dx && abs_dy >= abs_dz) {
             iy -= s;
         } else {
             iz -= s;
         }
      }

      var map_x = ix;
      var map_y = (iy - iz + (1 - ix %2 ) ) / 2 - 0.5;

      return { column: map_x, row: map_y };
   }

   return { getCenterOfHex: getCenterOfHex,
            centerHexOnScreen: centerHexOnScreen,
            getLocationFromMouseClick: getLocationFromMouseClick
   };
});