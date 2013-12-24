define([], function() {
    var _getDetailsFromType = function(type) {
      return { weight: 1, groundImage: 'Resources/Tiles/' + type + '.BMP'};
    }

    function Node(x, y, walkable, type, detailsToCopy) {
        window.nodeCount = (window.nodeCount) ? window.nodeCount + 1 : 1;
        this.x = x;
        this.y = y;
        this.type
        this.details =  detailsToCopy || _getDetailsFromType(type);
        this.walkable = (walkable === undefined ? true : walkable);
    };

    return Node;
});
