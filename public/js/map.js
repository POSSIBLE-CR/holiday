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

	function getAllMessages () {
		$.ajax({
			type: "GET",
		  	url: "api/messages"
		}).done( function (data) {
			if (data !== undefined) {
				$.each(data, function (index, message) {
					console.log(message);
					drawMessage(message);
				});
			}
		});
	}

	function getUser () {}


	/* DRAWING */

	function drawUser (coordinate, userDisplayName, message, avatar, isCurrentUser) {

		vars.g.append("foreignObject")
		.attr("x", vars.projection(coordinate)[0])
		.attr("y", vars.projection(coordinate)[1])
	    .attr("width", 100)
	    .attr("height", 100)

	  	//.append("xhtml:body")
	    .html("<div class='nugg nugget6'  > </div>");
	    //pendant to center the 

	    vars.g.append("foreignObject")
		.attr("x", vars.projection(coordinate)[0])
		.attr("y", vars.projection(coordinate)[1])
	    .attr("width", 400)
	    .attr("height", 100)
	  	//.append("xhtml:body")
	    .html('<blockquote class="bubble"><p>"' + message + '"</p><small>from ' + userDisplayName + ' in COSTA RICA</small></blockquote>');

	}

	function drawMessage (message) {
		var coordinate = message.location.coordinates;

		vars.g.append("circle")
		.style("stroke", "yellow")
		.style("fill", "yellow")
		.attr("r", 5)
		.attr("class", "message-point")
		.attr("dataid", message._id)
		.attr("cx", vars.projection(coordinate)[0])
		.attr("cy", vars.projection(coordinate)[1])
		.on("mouseover", function () {
			$(".message[dataid='"+$(this).attr("dataid")+"']").css("display", "block");
		})
    	.on("mouseout", function () {
    		$(".message[dataid='"+$(this).attr("dataid")+"']").css("display", "none");
    	});

		vars.g.append("foreignObject")
		.attr("x", vars.projection(coordinate)[0])
		.attr("y", vars.projection(coordinate)[1])
	    .attr("width", 400)
	    .attr("height", 100)
	    .attr("class", "message")
	    .attr("dataid", message._id)
	  	//.append("xhtml:body")
	    .html('<blockquote class="bubble"><p>"' + message.message + '"</p><small>from ' + message.userDisplayName + ' in ' + message.country +'</small></blockquote>');
	}

	function drawPoints () {
		getAllMessages();		
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
		/*var t = d3.event.translate,
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
		console.log("["+vars.zoom_x+","+vars.zoom_y+"]");*/
	}

	function addShareButtom(){

  		if(typeof($.cookie('possible.holiday.socialNetwork')) != "undefined" 
  			&& $.cookie('possible.holiday.socialNetwork') !== null) {
            if($.cookie('possible.holiday.socialNetwork') === "twitter" ){
            	console.log('entra tweet');
    			$( ".share-tw-box" ).css("display", "block");
            }else if($.cookie('possible.holiday.socialNetwork') === "facebook" ){
            	$( ".share-fb-box" ).css("display", "block");
            	console.log('entra fb');
            }
        }
	}

	/* INIT */

	function init () {
		if (window.innerWidth && window.innerHeight) {
			vars.winW = window.innerWidth;
			vars.winH = window.innerHeight;
		}

		drawMap(drawPoints);		
	}

	$(init);

}(map, jQuery));

