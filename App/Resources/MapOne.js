define([], function() {
   'use strict';

   var _getMovementCost = function(tileType) {
      if (tileType.indexOf('forest') === 0) { return 2; }
      else if (tileType.indexOf('stone') === 0) { return 3; }
      else { return 1 }
   }

   var getTerrain = function() {
      var rows = [];
      rows[0]  = 'grass,             grass,              grassNEstone,           grassNEstone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,    stoneEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[1]  = 'grassSWstone,      grassSWstone,              grass,                  grass,          grassNEstone,   grassNEstone,   stone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,          stone,   grassNWstone,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[2]  = 'stone,             stone,              grassSWstone,                  grass,          grass,          grass,    grassNEstone,   grassNEstone,         stone,          stone,          stone,          stone,          stone,          stone,   stoneEgrass,   grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[3]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,          grass,          grass,          grass,    stoneWgrass,          stone,          stone,          stone,          stone,    stoneSgrass,    stoneEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[4]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,          grass,          grass,          grass,    stoneWgrass,          stone,          stone,    stoneSgrass,    stoneSgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[5]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,          grass,          grass,          grass,    stoneWgrass,    stoneSgrass,    stoneSgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[6]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,          grass,          grass,          grass,   grassNEstone,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[7]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[8]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[9]  = 'stone,             stone,               stoneEgrass,                  grass,          grass,  grassSEforest,  grassSEforest,         forest,  grassSWforest,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[10] = 'stone,             stone,               stoneEgrass,                  grass,          grass,   forestWgrass,         forest,         forest,   forestEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[11] = 'stone,             stoneEgrass,        grassNWstone,                  grass,          grass,   forestWgrass,         forest,   forestEgrass,  grassNWforest,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[12] = 'stone,             grassNWstone,              grass,                  grass,          grass,   forestWgrass,         forest,         forest, grassSWforest,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[13] = 'grassNWstone,      grass,                     grass,          grassSEforest,   grassSEforest,        forest,         forest,         forest,   forestEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[14] = 'grass,             grass,                     grass,                 forest,          forest,        forest,         forest,         forest,   forestEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[15] = 'grass,     grassSEforest,             grassSEforest,                 forest,          forest,        forest,         forest,         forest,   forestEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[16] = 'forestNgrass,     forest,                    forest,                 forest,          forest,        forest,         forest,         forest,  grassNWforest,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[17] = 'forest,           forest,                    forest,                 forest,          forest,        forest,         forest,         forest,  grassSWforest,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[18] = 'forest,           forest,                    forest,                 forest,          forest,        forest,         forest,  grassNWforest,  grassNWforest,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[19] = 'forestSgrass,grassNEforest,                  forest,           forestSgrass,    forestSgrass, grassNEforest,   forestEgrass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[20] = 'grass,             grass,             grassNEforest,                  grass,           grass,         grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[21] = 'grass,             grass,                     grass,                  grass,           grass,         grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[22] = 'grass,             grass,                     grass,                  grass,           grass,         grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[23] = 'grass,             grass,                     grass,                  grass,           grass,         grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');
      rows[24] = 'grass,             grass,                     grass,                  grass,           grass,         grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass,          grass'.split(',');

      rows.forEach(function(row, rowIndex) {
         row.forEach(function(tile, columnIndex) {
            var tileType = tile.trim();
            rows[rowIndex][columnIndex] = { type: tileType, weight: _getMovementCost(tileType) };
         });
      });
      return rows;
   }
   return { getTerrain: getTerrain };
});