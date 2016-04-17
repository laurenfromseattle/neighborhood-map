(function () {
	'use strict';

	var mapModel = {

		/* 	Here is where we store the neighborhood location, map options and styles
		 	Map style courtesy of Morgan Davis
		 	https://snazzymaps.com/style/28702/tko-website-redesign-map	*/
		mapOptions: {
			center: { lat: 47.6264468, lng: -122.3502672 },
   			scrollwheel: true,
    		zoom: 15,
    		styles: [
			    {
			    	featureType: 'all',
			    	elementType: 'labels.text.fill',
			    	stylers: [
				        { color: '#b4dce2' },
			    	]
				},{
					featureType: 'all',
			    	elementType: 'labels.text.stroke',
			    	stylers: [
			    		{ visibility: 'on' },
				        { color: '#20505f' },
				        { weight: 2 },
				        { gamma: 0.84 }
			    	]
				},{
			        featureType: 'all',
			        elementType: 'labels.icon',
			        stylers: [
			            { visibility: 'off' }
			        ]
			    },{
			        featureType: 'administrative',
			        elementType: 'geometry',
			        stylers: [
			            { weight: 0.6 },
			            { color: '#094251' }
			        ]
			    },{
			        featureType: 'landscape',
			        elementType: 'geometry',
			        stylers: [
			            { color: '#16414f' }
			        ]
			    },{
			        featureType: 'poi',
			        elementType: 'geometry',
			        stylers: [
			            { color: '#518fa0' }
			        ]
			    },{
			        featureType: 'poi',
			        elementType: 'geometry.fill',
			        stylers: [
			            { lightness: -20 }
			        ]
			    },{
			        featureType: 'poi.attraction',
			        elementType: 'geometry.fill',
			        stylers: [
			            { lightness: 0 }
			        ]
			    },{
			        featureType: 'poi.park',
			        elementType: 'geometry',
			        stylers: [
			            { color: '#11586b' }
			        ]
			    },{
			        featureType: 'road',
			        elementType: 'geometry',
			        stylers: [
			            { color: '#12869b' },
			            { lightness: -37 }
			        ]
			    },{
			        featureType: 'road.arterial',
			        elementType: 'geometry.fill',
			        stylers: [
			            { lightness: -10 }
			        ]
			    },{
			        featureType: 'road.arterial',
			        elementType: 'geometry.stroke',
			        stylers: [
			            { lightness: -5 }
			        ]
			    },{
			        featureType: 'road.arterial',
			        elementType: 'labels.text.fill',
			        stylers: [
			            { lightness: 0 }
			        ]
			    },{
			        featureType: 'road.local',
			        elementType: 'geometry.fill',
			        stylers: [
			            { lightness: -15 }
			        ]
			    },{
			        featureType: 'road.local',
			        elementType: 'geometry.stroke',
			        stylers: [
			            { lightness: '-10' },
			            { gamma: '1.00' }
			        ]
			    },{
			        featureType: 'transit',
			        elementType: 'geometry',
			        stylers: [
			            { color: '#518fa0' }
			        ]
			    },{
			        featureType: 'water',
			        elementType: 'geometry',
			        stylers: [
			            { color: '#05323e' }
			        ]
			    }
			]
		}
	};

	var viewModel = {

		mapInit: function() {
			var mapDiv = document.getElementById('map-div');
			var map = new google.maps.Map(mapDiv, mapModel.mapOptions);
			return map;
		}

	};

	ko.applyBindings(viewModel);

})();