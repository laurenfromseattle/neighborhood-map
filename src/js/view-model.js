/* global $ */
/* view model */
var app = app || {};

$(function () {
	'use strict';

	app.viewModel = {

		init: function() {
			console.log('viewModel initialized');
			app.location.init();
			app.locations.init();
			app.locationView.init();
			app.appView.init();
		}
	};
});