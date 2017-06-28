var mapModel = (function (){

	var map = {};
	var mapBounds = {};
	var mapOptions = {
			center: { lat: 47.624098, lng: -122.356438 },
   			scrollwheel: true,
   			draggable: true,
    		zoom: (function() {
    			if ($( window ).width() < 500) {
    				return 14;
    			} else {
    				return 16;
    			}
    		})(),
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

	var apiCallCount = 0;
	var defaultLocationList = [
		{
			categories: [
				[ 'Dive Bars', 'divebars']
			],
			id: 'streamline-tavern-seattle-2',
			location: {
				address: [ '174 Roy St' ],
				city: 'Seattle',
				coordinate: {
					latitude: 47.6256104,
					longitude: -122.3528064
				}
			},
			name: 'Streamline Tavern',
			rating: 4.5,
			rating_img_url: 'https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
			review_count: 24,
			snippet_text: 'Great dive bar for some pool. Food is usually limited to peanuts. I mostly love it because it replaced Jabu\'s.',
			url: 'http://www.yelp.com/biz/streamline-tavern-seattle-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=pr1wuv4t-ZC9wqQWVsJ68g'
		},
		{
			categories: [
				['American (Traditional)', 'tradamerican'],
				['Dive Bars', 'divebars'],
				['Breakfast & Brunch', 'breakfast_brunch']
			],
			id: 'mecca-cafe-seattle',
			location: {
				address: [ '526 Queen Anne Ave N' ],
				city: 'Seattle',
				coordinate: {
					latitude: 47.62412,
					longitude: -122.35637
				}
			},
			name: 'Mecca Cafe',
			rating: 4,
			rating_img_url: 'https://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png',
			review_count: 421,
			snippet_text: 'HUGE serving sizes of all-American diner food. Amazing bartenders. What more do you need?',
			url: 'http://www.yelp.com/biz/mecca-cafe-seattle?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=pr1wuv4t-ZC9wqQWVsJ68g'
		}
	];

	var defaultState = function() {

		viewModel.resetMapCenter( { lat: 47.624098, lng: -122.356438 } );

			$.each(defaultLocationList, function ( key, value ) {

				value.selected = ko.observable(false);

				viewModel.locations.push( value );

				staticLocationList.push( value );

				viewModel.renderMarker( value );

				$.each( value.categories, function( index, value) {
					if (cuisines.indexOf( value[1]) === -1) {
						viewModel.cuisines.push( value[1] );
						cuisines.push( value[1] );
					}
				});
			});
	};

	var staticLocationList = [];
	var cuisines = [];

	var getLocations = function() {
		var bounds = mapModel.getMapBounds();
		var sw = bounds.getSouthWest();
		var swLat = bounds.getSouthWest().lat();
		var swLong = bounds.getSouthWest().lng();
		var neLat = bounds.getNorthEast().lat();
		var neLong = bounds.getNorthEast().lng();
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

		var apiCall = function() {
			$.ajax({
				url: baseURL,
				data: parameters,
				cache: true,
				dataType: 'jsonp'
			})
			.done(function( data ) {
				if (data.businesses.length > 0) {

					apiCallCount++;

					$.each(data.businesses, function( key, value ) {

						/* Adds an observable property that will track if that location's marker
						is selected, adding a corresponding style to that location in the list. */
						value.selected = ko.observable(false);

						/* Pushes location object into observable array */
						viewModel.locations.push( value );

						/* Pushes location object into immutable array, stored
						   in locationModel. This will be our permanent list so
						   that we do not have to repeat calls to the api.  */
						staticLocationList.push( value );

						/* Renders the gmarker and stores the gmarker in an
						   array so that we can add/remove markers from the map. */
						viewModel.renderMarker( value ); // create marker

						/* Pushes the location object's cuisine categories into
						   observable and immutable cuisine arrays if they are not
						   already there. This will give us a list for the dropdown filter. */
						$.each( value.categories, function( index, value) {
							if (cuisines.indexOf( value[1]) === -1) {
								viewModel.cuisines.push( value[1] );
								cuisines.push( value[1] );
							}
						});
					});

					/* Sort method for location objects courtesy of Stack Overflow, Ron Tornambe
					http://stackoverflow.com/questions/8900732/javascript-sort-objects-in-an-array-
					alphabetically-on-one-property-of-the-arra
					*/
					viewModel.locations.sort(function(a, b) {
						return a.name.localeCompare(b.name);
					});
					viewModel.cuisines.sort();
					updateParameters();
					updateSignature();
				} else {

					if (apiCallCount === 0) {
						alert('Sorry, Yelp can\'t find any restaurants in your area.');

						defaultState();
					}

				}
			})
			.fail(function() {

				alert( 'Sorry. We had issues talking to Yelp. Here are some locations we love in' +
					' Lower Queen Anne, Seattle.');

				defaultState();
			});
		};

		apiCall();

	};

	return {

		cuisines: cuisines,

		getLocations: getLocations,

		staticLocationList: staticLocationList

	};

})();

var viewModel = (function () {

	var mapDiv = $('.map-div')[0];
	var gmarkers = [];
	var openInfoWindow = [];
	var map;
	var locations = ko.observableArray([]);
	var cuisines = ko.observableArray([]);
	var selectedCuisine = ko.observable();

		var initMap = function() {

		if (navigator.geolocation) {

			var success = function(position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;

				var mapOptions = mapModel.getMapOptions();
				mapOptions.center = { lat: lat, lng: lng };

 				map = new google.maps.Map(mapDiv, mapOptions);

				renderMap();

			};

			var error = function(err) {

				/* PERMISSION_DENIED */
				if (err.code === 1) {

					alert( 'Don\'t want us to know where you are? That makes it a bit difficult' +
				' to help you find a restaurant! Here are some places you can check out next time' +
				' you are in Lower Queen Anne, Seattle.' );

				/* POSITION_UNAVAILABLE */
				} else if (err.code === 2) {

					alert( 'We had a problem locating you. Here are some places you can check' +
					' out next time you are in Lower Queen Anne, Seattle.' );

				/* TIMEOUT */
				} else {

					alert( 'Locating you is taking too much time. Here are some places you can check' +
					' out next time you are in Lower Queen Anne, Seattle.' );

				}

				map = new google.maps.Map(mapDiv, mapModel.getMapOptions());
				renderMap();

			};

			var options = {
			  timeout: 10000,
			  maximumAge: 0
			};

			navigator.geolocation.getCurrentPosition(success, error, options);

		/* Runs if geolocation is not supported */
		} else {

			/* Google Maps API check and map load */

			alert('Your browser does not support geolocation. That means we have no idea where you are.' +
			' Here are some places you can check out next time you are in Lower Queen Anne, Seattle.');

			map = new google.maps.Map(mapDiv, mapModel.getMapOptions());
			renderMap();

		}

	};

	var mapLoadError = function() {
		alert('Sorry, Google Maps data can\'t be loaded.');
	};

	/* Removes class that holds animated gif in the map div. */
	var removeLoadingState = function() {
		$(mapDiv).removeClass('loading');
	};

	/* Render map using mapOptions from mapModel.
	   Store map object in mapModel.
	   Add event listener to calculate the bounding rectangle after map loads.
	   Make API call to get locations in bounding rectangle. */
	var renderMap = function() {

		removeLoadingState();

		mapModel.setMap(map);

		var listener = google.maps.event.addListener(map, 'tilesloaded', function() {
			setMapBounds();
			locationModel.getLocations();
			/* This ensures that we only set the api call in motion once.
			   Otherwise, locations continue to load when the user moves
			   the screen or resizes the browser window. */
			google.maps.event.removeListener(listener);
		});

	};

	/* Calculate bounding rectangle of viewport and update mapModel*/
	var setMapBounds = function() {
		var bounds = map.getBounds(); // getBounds() is a google maps API method
		mapModel.updateMapBounds( bounds );
	};

	var resetMapCenter = function( coords ) {
		map.setCenter( coords );
	};

	var renderMarker = function( obj ) {

			var marker = new google.maps.Marker({
				position: {
					lat: obj.location.coordinate.latitude,
					lng: obj.location.coordinate.longitude
				},
				map: map,
				icon: 'img/map-marker.svg',
				title: obj.name,
				id: obj.id
			});


			marker.infowindow = new google.maps.InfoWindow({
				content: '<p class="infowindow-location-name">' + obj.name + '</p>' +
				'<p class="infowindow-location-address">' + obj.location.address[0] + '</p>' +
				'<p class="infowindow-location-rating">' +
				'<img class="infowindow-location-stars" alt="Yelp rating: ' + obj.rating + '" src="' + obj.rating_img_url + '" />' +
				'<span class="infowindow-location-rating-count">' + obj.review_count + '&nbsp;reviews</span></p>' +
				'<p class="infowindow-location-review">' + obj.snippet_text + '</p>' +
				'<a class="infowindow-location-link" href="' + obj.url +
				'" target="_blank">Read reviews on Yelp</a>',
				maxWidth: 200
			});

			google.maps.event.addListener(marker.infowindow,'closeclick', function(){
				clearInfoWindows();
				clearSelected();
			});

			marker.addListener('click', (function(currentMarker, currentInfoWindow) {
				return function() {
					/* Once an infowindow is opened, we store it as a single item in an array.
					   When a marker is clicked, we check the array to see if there is already
					   a window open. If there is a window open, we close it and empty the array.
					   Then we push the new infowindow into the array. The purpose is to prevent
					   more than one infowindow from being open at the same time. */
					clearInfoWindows();
					clearSelected();
					openInfoWindow.push(currentInfoWindow);

					currentMarker.setAnimation(google.maps.Animation.BOUNCE);
					/* This timeout allows for one bounce of the marker before the infowindow appears. */
    				setTimeout(function(){
    					currentMarker.setAnimation(null);
    					currentInfoWindow.open(map, currentMarker);
    				}, 700);

    				/* Adds a style to the sidebar list item if the marker is selected.
    				   Scrolls to the list item. */
    				var listItemHeight = 70;
    				var scrollOffset;

					$.each(locations(), function (index, value) {
						if (locations()[index].id === currentMarker.id) {
							locations()[index].selected(true);
							scrollOffset = index * listItemHeight;

							/* Animating the scrollTop took care of the issues with the scrollbar
							   changing height as things opened and closed and messing up the offset.
							   Now items always appear at the top after the scroll.
							*/
							$('.location-list').animate({
								scrollTop: scrollOffset
							}, 1000);

						} else {
							locations()[index].selected(false);
						}
					});

				};

			})(marker, marker.infowindow));

			gmarkers.push(marker);
	};

	/* This function runs when an item is clicked on the list.
	   Linked to UI with knockout.
	   This is just a repeat of the click even on the markers, above.
	   Eventually need to refactor so that we are not repeating a huge block of code. */
	var openMarker = function( data ) {

		/* This block only runs if the item on the list is not already selected. This allows us to 'close'
		   the location on the second click. */
		if ( data.selected() === false ) {
			var currentMarker;
			clearInfoWindows();
			clearSelected();

			$.each(gmarkers, function( index, value ) {
				if (value.title === data.name) {
					currentMarker = value;
				}
			});

			openInfoWindow.push(currentMarker.infowindow);

			currentMarker.setAnimation(google.maps.Animation.BOUNCE);
			/* This timeout allows for one bounce of the marker before the infowindow appears. */
	    	setTimeout(function(){
	    		currentMarker.setAnimation(null);
	    		currentMarker.infowindow.open(map, currentMarker);
	    	}, 700);

			/* Adds a style to the sidebar list item if the marker is selected.
			   Scrolls to the list item.
			   Same timeout as the bouncing marker. */
			var listItemHeight = 70;
			var scrollOffset;


			$.each(locations(), function (index, value) {
				if (locations()[index].id === currentMarker.id) {
					locations()[index].selected(true);
					scrollOffset = index * listItemHeight;

					/* Animating the scrollTop took care of the issues with the scrollbar
					   changing height as things opened and closed and messing up the offset.
					   Now items always appear at the top after the scroll.
					*/
					$('.location-list').animate({
						scrollTop: scrollOffset
					}, 1000);

				} else {
					locations()[index].selected(false);
				}
			});

		} else {

			clearInfoWindows();
			clearSelected();
		}
	};

	var filteredLocations = ko.computed(function() {

		/* If the user has not selected a filter, it is undefined and this
		   code block will not run. */
		if (selectedCuisine() !== undefined) {

			clearInfoWindows();
			clearSelected();

			/* Locations that do not match the cuisine type selected by
			   the user are removed from the array. */
			locations.remove( function (item) {

				var filterOut = true;

				/* Yelp stores the cuisine categories in multiple arrays for each object.
				   We have to loop through them all and check if the value of
				   the first index matches our cuisine type. If it does, the
				   location stays. Once the loop is done and if none of the location's
				   categories match, the location is removed from the observable array. */
				$.each( item.categories, function( index, value) {

					if (value[1] === selectedCuisine()) {

						filterOut = false;
						return filterOut;

					}
				});

				return filterOut;
			});
		}

		/* This block checks the gmarker array against what we have remaining
		   in the observable location array and removes the marker from the map
		   if the location is no longer in the array. */
		$.each(gmarkers, function (index, value ) {

			var found = false;

			$.each(locations(), function ( key, location ) {
				if (location.name.indexOf(value.title) !== -1) {
					found = true;
				}
			});

			if (!found) {
				value.setMap(null);
			}
		});
	});

	/* Status of filter. If true, the clear button is enabled while the filter list is disabled.*/
	var filterSelected = ko.computed(function() {

		return (selectedCuisine() !== undefined);

	});

	/* When user clicks on clear button, locations repopulate with the original list and
	   selectedCuisine returns to undefined. Markers are redrawn. */
	var clearFilter = function() {

		clearInfoWindows();
		clearSelected();

		selectedCuisine(undefined);
		/* Using a copy of staticLocationList. Otherwise, we modify it, which we don't want to do. */
		locations(locationModel.staticLocationList.slice());

		/* Sort the list again. */
		locations.sort(function(a, b) {
			return a.name.localeCompare(b.name);
		});

		$.each(gmarkers, function( index, value ) {
			value.setMap(map);
		});

	};

	var clearInfoWindows = function() {

		if (openInfoWindow.length !== 0) {
			openInfoWindow[0].close();
			openInfoWindow = [];
		}
	};

	var clearSelected = function() {
		$.each(locations(), function (index, value) {
    		locations()[index].selected(false);
    	});
	};

	$('.sidebar-toggle').click(function() {

		if ($('.sidebar').hasClass('toggle')) {
			$('.sidebar').removeClass('toggle');
		} else {
			$('.sidebar').addClass('toggle');
		}
	});

    $( ".sidebar" ).draggable({
    	axis: 'x',
    	containment: 'parent',
    	handle: '.slider'
    });

	return {

		initMap: initMap,

		mapLoadError: mapLoadError,

		locations: locations,

		cuisines: cuisines,

		selectedCuisine: selectedCuisine,

		gmarkers: gmarkers,

		renderMarker: renderMarker,

		filteredLocations: filteredLocations,

		filterSelected: filterSelected,

		clearFilter: clearFilter,

		openMarker: openMarker,

		resetMapCenter: resetMapCenter

	};

})();

ko.applyBindings(viewModel);