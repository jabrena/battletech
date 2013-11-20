/**
 * A node in grid. 
 * This class holds some basic information about a node and custom 
 * attributes may be added, depending on the algorithms' needs.
 * @constructor
 * @param {number} x - The x coordinate of the node on the grid.
 * @param {number} y - The y coordinate of the node on the grid.
 * @param {boolean} [walkable] - Whether this node is walkable.
 */
define([], function() {
    var _getDetailsFromType = function(type) {
        return { weight: type };
    }

    function Node(x, y, walkable, type) {
        this.x = x;
        this.y = y;
        this.details =  _getDetailsFromType(type);
        this.walkable = (walkable === undefined ? true : walkable);
    };

    return Node;
});
