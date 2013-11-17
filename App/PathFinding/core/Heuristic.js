/**
 * @namespace PF.Heuristic
 * @description A collection of heuristic functions.
 */
//module.exports = {
define([], function() {
  heuristic = {
      manhattan: function(dx, dy) {
        return dx + dy;
      },

      euclidean: function(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
      },

      chebyshev: function(dx, dy) {
          return Math.max(dx, dy);
      }
  }

  return heuristic;
});