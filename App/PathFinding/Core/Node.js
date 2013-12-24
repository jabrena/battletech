define([], function() {
   var _getDetailsFromType = function(tile) {
      return { weight: tile.weight, groundImage: 'Resources/Tiles/' + tile.type + '.BMP'};
   }

   function Node(x, y, walkable, tile, detailsToCopy) {
      window.nodeCount = (window.nodeCount) ? window.nodeCount + 1 : 1;
      this.x = x;
      this.y = y;
      this.walkable = (walkable === undefined ? true : walkable);
      if (detailsToCopy || tile) {
      this.details =  detailsToCopy || _getDetailsFromType(tile);
      }
   };

   return Node;
});
