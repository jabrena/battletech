define(['Squire', 'AppGlobals', 'Events/ScrollCalculator'],
function(Squire, appGlobals, scrollCalculator) {
   describe('MapScrollEvents', function() {
      describe('onMouseDrag', function() {
         'use strict';
         var _mapScrollEvents;
         var _sandbox;

         beforeEach(function(done) {
            var injector = new Squire();
            _sandbox = sinon.sandbox.create();

            appGlobals.camera = {
               bounds: { width: 100, height: 100 },
               view: { x: 0, y: 0 }
            };

            var mapDetails = { 
               width: 10,
               height: 12,
               hexSize: { width: 5, height: 5}
             };

            appGlobals.map.getDetails = function() { return mapDetails; };
            appGlobals.map.draw = function() {};

            injector.mock('AppGlobals', appGlobals);
            injector.mock('Events/ScrollCalculator', scrollCalculator);
            injector.require(['Events/MapScrollEvents'], function(mapScrollEvents) {
               _mapScrollEvents = mapScrollEvents;
               done();
            });
         });

         afterEach(function() {
            appGlobals.map = {};
            appGlobals.camera = {};
            _sandbox.restore();
         });

         describe('Given any drag event, onMouseDrag', function() {
            it('should never move the camera past the left side of the map.', function() {
               var dragEvent = {
                //controls are inverted
                drugTo: { x: 1000, y: 0 },
                clickedAt: { x: 0, y:0 }
               };

               _mapScrollEvents.onMouseDrag(dragEvent);

               expect(appGlobals.camera.view.x).to.equal(0);
               expect(appGlobals.camera.view.y).to.equal(0);
            });

            it('should never move the camera past the top of the map.', function() {
               var dragEvent = {
                //controls are inverted
                drugTo: { x: 0, y: 1000 },
                clickedAt: { x: 0, y:0 }
               };

               _mapScrollEvents.onMouseDrag(dragEvent);

               expect(appGlobals.camera.view.x).to.equal(0);
               expect(appGlobals.camera.view.y).to.equal(0);
            });

            it('should never move the camera past the right of the map.', function() {
               var dragEvent = {
                //controls are inverted
                drugTo: { x: -1000, y: 0 },
                clickedAt: { x: 1000, y:0 }
               };

               _sandbox.stub(scrollCalculator, 'calculateMaxRightScroll').returns(17);

               _mapScrollEvents.onMouseDrag(dragEvent);

               expect(appGlobals.camera.view.x).to.equal(17);
            });

            it('should never move the camera past the bottom of the map.', function() {
               var dragEvent = {
                  //controls are inverted
                  drugTo: { x: 0, y: -1000 },
                  clickedAt: { x: 0, y: 1000 }
               }

               _sandbox.stub(scrollCalculator, 'calculateMaxBottomScroll').returns(22);

               _mapScrollEvents.onMouseDrag(dragEvent);

               expect(appGlobals.camera.view.y).to.equal(22);
            });
         });
      });
   });
});