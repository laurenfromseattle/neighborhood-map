var mapModel = (function (){

	var map = {};
	var mapBounds = {};
	var mapOptions = {
			center: { lat: 47.6264468, lng: -122.3502672 },
   			scrollwheel: false,
   			draggable: false,
    		zoom: 18,
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
		};

	return {

		getMap: function() {
			return map;
		},

		setMap: function( newMap ) {
			if (typeof newMap === 'object' ) {
				map = newMap;
			}
		},

		getMapBounds: function() {
			return mapBounds;
		},

		updateMapBounds: function( newMapBounds ) {
			if (typeof newMapBounds === 'object' ) {
				mapBounds = newMapBounds;
			}
		},

		getMapOptions: function() {
			return mapOptions;
		},

		updateMapOptions: function( newMapOptions ) {
			if (typeof newMapOptions === 'object' ) {
				mapOptions = newMapOptions;
			}
		}

	};

})();

var locationModel = (function () {

	var getLocations = function() {
		var bounds = mapModel.getMapBounds();
		var swLat = bounds.H.H;
		var swLong = bounds.j.H;
		var neLat = bounds.H.j;
		var neLong = bounds.j.j;
		var CONSUMER_KEY = 'pr1wuv4t-ZC9wqQWVsJ68g';
		var CONSUMER_SECRET = '9bndcm-Ho1RhwE5btDVJYJKbv4w';
		var TOKEN = 'N57vSZkvDXsVAwk7M8j8qRCKNtwS5ywi';
		var TOKEN_SECRET = 'FiugcPuk-Bh66cWuSaBe18wZGjU';
		var baseURL = 'https://api.yelp.com/v2/search';
		var query = 'restaurants';

		/* Returns unique 12-digit string. Used for auth_nonce parameter. */
		var uniqueString = function() {
			return (Math.floor(Math.random() * 1e12).toString());
		};

		/* Returns seconds since the Unix epoch. */
		var timeStamp = function() {
			return (Math.floor(Date.now()/1000));
		};

		var parameters = {
			oauth_consumer_key: CONSUMER_KEY,
			oauth_token: TOKEN,
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: timeStamp(),
			oauth_nonce: uniqueString(),
			oauth_version: '1.0',
			callback: 'cb',
			term: query,
			bounds: swLat + ',' + swLong + '|' + neLat + ',' + neLong
		};

		/* Generate encoded signature */
		var encodedSignature = 	oauthSignature.generate('GET',
			baseURL,
			parameters,
			CONSUMER_SECRET,
			TOKEN_SECRET);

		/* Add encoded signature to parameters */
		parameters.oauth_signature = encodedSignature;

		/* Update parameters for recursive api calls */
		var updateParameters = function() {

			parameters.oauth_timestamp = timeStamp();

			parameters.oauth_nonce = uniqueString();

			if (parameters.offset === undefined) {
				parameters.offset = 20;
			} else {
				parameters.offset += 20;
			}

			delete parameters.oauth_signature;

		};

		/* Generate new signature for recursive api calls */
		var updateSignature = function() {

			var encodedSignature = 	oauthSignature.generate('GET',
				baseURL,
				parameters,
				CONSUMER_SECRET,
				TOKEN_SECRET);

			parameters.oauth_signature = encodedSignature;
		};

		var fetchLocations = function() {
			$.ajax({
				url: baseURL,
				data: parameters,
				cache: true,
				dataType: 'jsonp',
				success: function( data ) {
					if (data.businesses.length > 0) {
						viewModel.renderLocations( data );
						updateParameters();
						updateSignature();
						fetchLocations();
					}
				},
				error: function() {
					alert( 'Sorry. Locations failed to load.');
				}
			});
		};

		fetchLocations();
	};


	return {

		apiCall: getLocations

	};

})();

var viewModel = (function () {

	var mapDiv = document.getElementById('map-div');
	var locations = ko.observableArray([]);
	var categories = ko.observableArray([]);
	var map = new google.maps.Map(mapDiv, mapModel.getMapOptions());

	/* Render map using mapOptions from mapModel.
	   Store map object in mapModel.
	   Add event listener to calculate the bounding rectangle after map loads.
	   Make API call to get locations in bounding rectangle. */

	var renderMap = function() {

		mapModel.setMap(map);

		google.maps.event.addListener(map, 'tilesloaded', function() {
			setMapBounds();
			locationModel.apiCall();
		});

	};

	/* Calculate bounding rectangle of viewport and update mapModel*/
	var setMapBounds = function() {
		var bounds = map.getBounds(); // getBounds() is a google maps API method
		mapModel.updateMapBounds( bounds );
	};

	var renderMarkers = function( value ) {
		new google.maps.Marker({
			position: {
				lat: value.location.coordinate.latitude,
				lng: value.location.coordinate.longitude
			},
			map: map,
			title: value.name
		});
	};

	renderMap();

	return {

		locations: locations,

		categories: categories,

		selectedCuisine: ko.observable(),

		renderLocations: function( data ) { // This is called when api data retrieval is successful
			$.each(data.businesses, function( key, value ) {
					renderMarkers( value );
					locations.push( value );

					$.each(value.categories, function ( index, value ) {
						if (categories.indexOf( value[1]) === -1) {
							categories.push( value[1] );
						}
					});
			});
			categories.sort();
			console.log(this.locations());
		}

	};

})();

ko.applyBindings(viewModel);
