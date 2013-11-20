/**
 * Backtrace according to the parent records and return the path.
 * (including both start and end nodes)
 * @param {Node} node End node
 * @return {Array.<Array.<number>>} the path
 */
define([], function() {
    var utils = {
        backtrace: function(node) {
            var path = [[node.x, node.y]];
            while (node.parent) {
                console.log(node.details.color + "x: " + node.x + ", y:" + node.y);
                node = node.parent;
                path.push([node.x, node.y]);
            }
            return path.reverse();
        },

        biBacktrace: function (nodeA, nodeB) {
            var pathA = backtrace(nodeA),
            pathB = backtrace(nodeB);
            return pathA.concat(pathB.reverse());
        },

        pathLength: function(path) {
            var i, sum = 0, a, b, dx, dy;
            for (i = 1; i < path.length; ++i) {
                a = path[i - 1];
                b = path[i];
                dx = a[0] - b[0];
                dy = a[1] - b[1];
                sum += Math.sqrt(dx * dx + dy * dy);
            }
            return sum;
        },

        getLine: function(x0, y0, x1, y1) {
            var abs = Math.abs,
                line = [],
                sx, sy, dx, dy, err, e2;

            dx = abs(x1 - x0);
            dy = abs(y1 - y0);

            sx = (x0 < x1) ? 1 : -1;
            sy = (y0 < y1) ? 1 : -1;

            err = dx - dy;

            while (true) {
                line.push([x0, y0]);

                if (x0 === x1 && y0 === y1) {
                    break;
                }
                
                e2 = 2 * err;
                if (e2 > -dy) {
                    err = err - dy;
                    x0 = x0 + sx;
                }
                if (e2 < dx) {
                    err = err + dx;
                    y0 = y0 + sy;
                }
            }

            return line;
        },

        smoothenPath: function(grid, path) {
            var len = path.length,
                x0 = path[0][0],        // path start x
                y0 = path[0][1],        // path start y
                x1 = path[len - 1][0],  // path end x
                y1 = path[len - 1][1],  // path end y
                sx, sy,                 // current start coordinate
                ex, ey,                 // current end coordinate
                lx, ly,                 // last valid end coordinate
                newPath,
                i, j, coord, line, testCoord, blocked;

            sx = x0;
            sy = y0;
            lx = path[1][0];
            ly = path[1][1];
            newPath = [[sx, sy]];

            for (i = 2; i < len; ++i) {
                coord = path[i];
                ex = coord[0];
                ey = coord[1];
                line = getLine(sx, sy, ex, ey);

                blocked = false;
                for (j = 1; j < line.length; ++j) {
                    testCoord = line[j];

                    if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
                        blocked = true;
                        newPath.push([lx, ly]);
                        sx = lx;
                        sy = ly;
                        break;
                    }
                }
                if (!blocked) {
                    lx = ex;
                    ly = ey;
                }
            }
            newPath.push([x1, y1]);

            return newPath;
        }
    }

    return utils;
});