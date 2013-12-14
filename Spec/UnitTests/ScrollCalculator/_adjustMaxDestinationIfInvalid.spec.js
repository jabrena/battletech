define(['Squire'], function(Squire) {
   describe('ScrollCalculator', function() {
      describe('_adjustMaxDestinationIfInvalid', function() {
         'use strict';
         var _scrollCalclator;

         beforeEach(function(done) {
            var injector = new Squire();

            injector.require(['Events/ScrollCalculator'], function(scrollCalculator) {
               _scrollCalclator = scrollCalculator;
               done();
            });
         });

         describe('When scrolling outside of map, _adjustMaxDestinationIfInvalid', function() {
            it('should move you back inside the map', function() {
               var amountToMove = 1000;
               var currentLocation = 5;
               var maxBound = 10;

               var amountToMove =  _scrollCalclator._adjustMaxDestinationIfInvalid(amountToMove,
                                                                                   currentLocation,
                                                                                   maxBound);

               expect(amountToMove).to.equal(maxBound - currentLocation);
            });
         });

         describe('When current location is outside of map, _adjustMaxDestinationIfInvalid', function() {
            it('should move you back inside the map', function() {
               var amountToMove = 1000;
               var currentLocation = 1000;
               var maxBound = 10;

               var amountToMove =  _scrollCalclator._adjustMaxDestinationIfInvalid(amountToMove,
                                                                                   currentLocation,
                                                                                   maxBound);

               expect(amountToMove).to.equal(maxBound - currentLocation);
            });
         });
      });
   });
});