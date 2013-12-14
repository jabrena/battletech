define(['Squire'], function(Squire) {
   describe('ScrollCalculator', function() {
      describe('_calculateMaxScrollBound', function() {
         'use strcit';
         var _scrollCalculator;

         beforeEach(function(done) {
            var injector = new Squire();

            injector.require(['Events/ScrollCalculator'], function(scrollCalculator) {
               _scrollCalculator = scrollCalculator;
               done();
            });
         });

         describe('When scrolling, _calculateMaxScrollBound', function() {
            it('should ensure the screen is full of hexes', function() {
               var mapHeight = 10;
               var hexSize = 2;
               var screenHeight = 4;

               var maxViewPoint = _scrollCalculator._calculateMaxScrollBound(hexSize,
                                                                             mapHeight,
                                                                             screenHeight);

               expect(maxViewPoint).to.equal(16);
            });
         });

      });
   });
});