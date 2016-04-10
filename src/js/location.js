/* model */
var app = app || {};

(function () {
	'use strict';

	app.location = {

		init: function() {
			console.log('location initialized');
		},

		// Here is where we store the neighborhood location, map options and styles
		mapOptions: {
			center: {lat: 47.6264468, lng: -122.3502672},
   			scrollwheel: true,
    		zoom: 15
		}

	};

})();