define(['Squire'], function(Squire) {
	describe('ViewPort', function() {
		describe('getView', function() {
			'use strict';
			var _viewPort;

			beforeEach(function(done) {
				var testContext = {};

				testContext.injector = new Squire();

				testContext.injector.require(['Map/ViewPort'], function(ViewPort) {
					testContext.ViewPort = new ViewPort();
					_viewPort = testContext.ViewPort;
					done();
				});
			});

			describe('When there is smoke', function() {
				it('should cause red', function() {
					expect(false).to.be.true;
				})
			});

			describe('Green means', function() {
				it('should go.', function() {
					expect(true).to.be.true;
				})
			});
		});
	});
});