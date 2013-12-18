define(['AppGlobals', 'Map/HexPositionCalculator', 'Events/UnitEvents'],
function(appGlobals, hexPositionCalculator, unitEvents) {
   'use strict';

   var Mech = function(column, row, imageSrc) {
      this.canvas = document.createElement("canvas");
      var hexSize = appGlobals.map.getDetails().hexSize;
      var image = new Image();
      image.src = imageSrc;

      this.canvas.width = hexSize.width *.5;
      this.canvas.height = hexSize.height *.6;

      this.context = this.canvas.getContext('2d');
      this.context.drawImage(image, 0, 0,  this.canvas.width, this.canvas.height)

      this.movement = 3;

      this.location = { row: undefined, column: undefined };
      this.moveToHex(column, row);

      //this._mech.onClick = unitEvents.whenMouseClicksUnit;
   }

   Mech.prototype.remainingMovement = function() {
    return this._mech.movement;
   }

   Mech.prototype.moveToHex = function(column, row) {
      this.location.row = row;
      this.location.column  = column;
   }

   return Mech;
});