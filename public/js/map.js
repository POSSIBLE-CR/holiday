/* * POSSIBLE * * HOLIDAY APP * * Map Namespace */

var map = map || {};

(function (context, $) {
	vars = {
		$mapContainer : $("#map-container"),
		winW : null,
		winH : null,
		zoom : null,
		radius : null,
		zoom_x : null,
		zoom_y : null,
		g : null,
		scale : 1,
		translate : [0,0]
	};

	/* API CALLS */

	function getAllGroupedMessages () {
		$.ajax({
			type: "GET",
		  	url: "api/messages"
		}).done( function (data) {
			if (data !== undefined) {
				$.each(data, function (index, message) {
					console.log(message.location.coordinates);
					drawMessageGroup(message.location.coordinates);
				});
			}
		});
	}

	function getUser () {}

	function getAllMessagesAround (km, coordinate) {
		$.ajax({
			type: "GET",
		  	url: "api/messages",
		  	data: {
		  	km: km,
		  	coordinate: coordinate
		  }
		}).done( function (data) {
			console.log(data);
			if (data !== undefined) {
				$.each(data, function (index, message) {
					drawUser(message.location.coordinates, message.userDisplayName, message.message, null, false);
				});
			}
		});
	}

	/*
	*  TESTER function to display n nueggets
	*
	*/
	function displayTesterNuggets(){
		var c = [];
		var a,b;
		for (i = 0; i < 10000; i++) { 
			console.log(i);
			a = (Math.random() * i+15);
			b = (Math.random() * i+5);
			c.push([a*10,b*3]);
		} 
		drawUser(c);
	}

	/* DRAWING */

	function drawUser (coordinate, userDisplayName, message, avatar, isCurrentUser) {

		vars.g.append("foreignObject")
		.attr("x", vars.projection(coordinate)[0])
		.attr("y", vars.projection(coordinate)[1])
	    .attr("width", 100)
	    .attr("height", 100)
	    .html("<div class='nugg nugget6'></div>");
	}
	
	function drawSomeUser (coordinate_array) {

		vars.g.selectAll("image")
			.data([coordinate_array]).enter().append("svg:image")	
			.attr("x", function (d) {  return vars.projection(d)[0]; })
			.attr("y", function (d) {  return vars.projection(d)[1]; })
			.attr('width', 12.5)
			.attr('height', 12.5)    
			.attr("xlink:href", "../img/avatars/banana.gif");

	}

	function drawMessageGroup (coordinate) {
		vars.g.append("foreignObject")
			.attr("x", vars.projection(coordinate)[0])
			.attr("y", vars.projection(coordinate)[1])
		    .attr("width", 50)
		    .attr("height", 50)
		    .html("<span class='icon-message'></span>");
	}

	function drawPoints () {
		//drawUser([24, -27]);
		//drawUser([-122.490402, 47.786453]);
		getAllGroupedMessages();
	}

	function drawMap (callback) {
		var width = vars.winW, height = vars.winH;
		// Set projection
		vars.projection = d3.geo.mercator().translate([0, 0]).scale(width / 2 / Math.PI);
		// Set zoom scale
		vars.zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", move);

		// Create path
		var path = d3.geo.path().projection(vars.projection);

		// Create SVG
		var svg = d3.select("#map-container").append("svg") 
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
					.call(vars.zoom);

		vars.g = svg.append("g");

		// Draw the map data
		d3.json("js/custom.json", function(error, data) {
			vars.g.append("path").datum(topojson.feature(data, data.objects.world)).attr("class", "land").attr("d", path);
			callback();
		});
	}

	/* MAP INTERACTION */

	function centeredZoomInOut (inOut) {
		var scale = 0.5,
			t = vars.translate;
		
		var s = vars.scale + (scale * inOut);
		s = (s < 1)? 1 : s;
		s = (s > 8)? 8 : s;
		vars.scale = s;

		t[0] = Math.min(vars.winW / 2 * (s - 1), Math.max(vars.winW / 2 * (1 - s), t[0]));
		t[1] = Math.min(vars.winH / 2 * (s - 1) * s, Math.max(vars.winH / 2 * (1 - s) * s, t[1]));

		vars.zoom.translate(t).scale(vars.scale);
		vars.g.style("stroke-width", 1 / vars.scale)
			.attr("transform", "translate(" + t + ")scale(" + vars.scale + ")");
	}

	function zoomTo () {}

	function goTo () {}

	function move () {
		var t = d3.event.translate,
			s = d3.event.scale;

		vars.scale = s;
		vars.translate = t;

		t[0] = Math.min(vars.winW / 2 * (s - 1), Math.max(vars.winW / 2 * (1 - s), t[0]));
		t[1] = Math.min(vars.winH / 2 * (s - 1) + 230 * s, Math.max(vars.winH / 2 * (1 - s) - 230 * s, t[1]));

		data = vars.projection.invert([t[0], t[1]]);

		vars.zoom_x = data[0]*-1;
		vars.zoom_y = data[1]*-1;

		switch(s){
      		case 2:
      			vars.radius ='5503';// km, ml=3421
      			break;
      		case 4:
      			vars.radius ='2883';// km, ml=1792
      			break;
      		case 8:
      			vars.radius ='1801';// km, ml=1119
      			break;
      	}
      	

		vars.zoom.translate(t);
		vars.g.style("stroke-width", 1 / s)
			.attr("transform", "translate(" + t + ")scale(" + s + ")");

		//getAllMessagesAround(vars.radius,"["+vars.zoom_x+","+vars.zoom_x+"]" );

		console.log("Radius KM="+vars.radius);
		console.log("["+vars.zoom_x+","+vars.zoom_y+"]");
	}

	/* INIT */

	function init () {
		if (window.innerWidth && window.innerHeight) {
			vars.winW = window.innerWidth;
			vars.winH = window.innerHeight;
		}

		//drawMap(drawPoints);
		drawMap(drawPoints);		

		$(".zoom-control").on('click', function (event) {
			event.preventDefault();
			if ($(this).hasClass("in")) {
				centeredZoomInOut(1);
			} else {
				centeredZoomInOut(-1)
			}
		})
	}

	$(init);

}(map, jQuery));

