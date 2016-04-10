/* top-level UI*/
var app = app || {};

(function ($) {
	'use strict';

	app.appView = {

		init: function() {
			console.log('appView initialized');
			this.initMap();
		},

		initMap: function() {

			// Create a map object and specify the DOM element for display.
			// Data for map location and styles is stored in our `location` model
			var map = new google.maps.Map(document.getElementById('main'), app.location.mapOptions);
		}

	};

})(jQuery);
