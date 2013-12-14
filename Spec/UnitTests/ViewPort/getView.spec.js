define(['Squire', 'AppGlobals'], function(Squire, appGlobals) {
   describe('ViewPort', function() {
      describe('getView', function() {
         'use strict';
         var _viewPort;
         var _mapDetails;

         beforeEach(function(done) {
            var testContext = {};
            testContext.injector = new Squire();

            appGlobals.camera.bounds.width = 100;
            appGlobals.camera.bounds.height = 100;
            testContext.injector.mock('AppGlobals', appGlobals);

            testContext.injector.require(['Map/ViewPort'], function(ViewPort) {
               _mapDetails = {
                  hexSize: {
                     width: 5,
                     height: 5
                  },
                  height: 10,
                  width: 12
               }

               testContext.ViewPort = new ViewPort(_mapDetails);
               _viewPort = testContext.ViewPort;
               done();
            });
         });

         describe('Given any view coordinates, getView', function() {
            it('should never set first column less than zero.', function() {
               appGlobals.camera.view.x = -1000;
               appGlobals.camera.view.y = 0;

               var view = _viewPort.getView();

               expect(view.firstRow).to.equal(0);
               expect(view.firstColumn).to.equal(0);
            });

            it('should never set first row less than zero.', function() {
               appGlobals.camera.view.x = 0;
               appGlobals.camera.view.y = -1000;

               var view = _viewPort.getView();

               expect(view.firstRow).to.equal(0);
               expect(view.firstColumn).to.equal(0);
            });

            it('should never set last column greater than map width', function() {
               appGlobals.camera.view.x = 10000;
               appGlobals.camera.view.y = 0;

               var view = _viewPort.getView();

               expect(view.lastRow).to.be.below(_mapDetails.height + 1);
               expect(view.lastColumn).to.be.below(_mapDetails.width + 1);
            });

            it('should never set last row greater than map height', function() {
               appGlobals.camera.view.x = 0;
               appGlobals.camera.view.y = 10000;

               var view = _viewPort.getView();

               expect(view.lastRow).to.be.below(_mapDetails.height + 1);
               expect(view.lastColumn).to.be.below(_mapDetails.width + 1);
            });
         });
      });
   });
});