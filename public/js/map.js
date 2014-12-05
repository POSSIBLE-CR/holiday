/* * POSSIBLE * * HOLIDAY APP * * Map Namespace */

var map = map || {};

(function (context, $) {
	vars = {
		$mapContainer : $("#map-container"),
		winW : null,
		winH : null,
		patH : null,
		zoom : null,
		radius : null,
		g : null,
		scale : 1,
		translate : [0,0]
	};

	/* API CALLS */

	function getAllGroupedMessages () {}

	function getUser () {}

	function getAllMessagesAround () {}

	/* DRAWING */
	function drawUser (coordinate) {
		
		vars.g.selectAll("image")
			.data([coordinate]).enter().append("svg:image")
			//.data(-104, -20).enter().append("svg:image")
			.attr("x", function (d) { console.log('1..'+vars.projection(d)[0]);
 			return vars.projection(d)[0]; })
			.attr("y", function (d) { console.log('2..'+vars.projection(d)[1]); return vars.projection(d)[1]; })
			.attr('width', 12.5)
			.attr('height', 12.5)    
			.attr("xlink:href", "../img/avatars/banana.gif");

	}

	function drawIndividual () {}

	function drawMessageGroup () {}

	function drawPoints (x,y) {
		//drawUser([174, 78]);//referense: top-right border
		drawUser([x, y]);
	}



	function drawMap (callback) {
		var width = vars.winW, height = vars.winH;
		// Set projection
		vars.projection = d3.geo.mercator().translate([0, 0]).scale(width / 2 / Math.PI);
		console.log(d3.geo.mercator().translate([0, 0]).scale(width / 2 / Math.PI));
		// Set zoom scale
		vars.zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", move1);
		// Create path
		var path = patH = d3.geo.path().projection(vars.projection);

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
		

		});
	}

	/* MAP INTERACTION */

	function centeredZoomInOut (inOut) {
		console.log("entre");
		var scale = 0.5,
			t = vars.translate;
		
		var s = vars.scale + (scale * inOut);
		console.log('s=');
		console.log(s);
		s = (s < 1)? 1 : s;
		s = (s > 8)? 8 : s;
		vars.scale = s;
		console.log(s);
		t[0] = Math.min(vars.winW / 2 * (s - 1), Math.max(vars.winW / 2 * (1 - s), t[0]));
		t[1] = Math.min(vars.winH / 2 * (s - 1) * s, Math.max(vars.winH / 2 * (1 - s) * s, t[1]));

		vars.zoom.translate(t).scale(vars.scale);
		vars.g.style("stroke-width", 1 / vars.scale)
			.attr("transform", "translate(" + t + ")scale(" + vars.scale + ")");
	}

	function zoomTo () {}

	function goTo () {}

	function move1 () {
		var t = d3.event.translate,
			s = d3.event.scale;

		vars.scale = s;
		vars.translate = t;
	
		t[0] = Math.min(vars.winW / 2 * (s - 1), Math.max(vars.winW / 2 * (1 - s), t[0]));
		t[1] = Math.min(vars.winH / 2 * (s - 1) + 230 * s, Math.max(vars.winH / 2 * (1 - s) - 230 * s, t[1]));
	
		data = vars.projection.invert([t[0], t[1]]);
		
		// values comes from a lineal regretion
		/*var x = 0.0759 * t[0] + 0.0137;
		var y = 0.0299 * t[1] + 28.458;*/

		var x = data[0]*-1;
		var y = data[1]*-1;

		scaledCenterX = (vars.winW / s) / 2
        scaledCenterY = (vars.winH / s) / 2
	
		x1 = (t[0] - scaledCenterX)
        y1 = (t[1] - scaledCenterY)

		drawPoints(x,y);
		vars.zoom.translate(t);
		vars.zoom.center([scaledCenterX,scaledCenterY])
		vars.g.style("stroke-width", 1 / s)
		.attr("transform", "translate(" + t + ")scale(" + s + ")");//original

 		vars.g.selectAll("path")
      	.attr("d", patH);

		//vars.radius = contains the km reference value to show the nuggets around
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
		console.log("Radius KM="+vars.radius);

		//another examples:
		//.attr("transform", "translate("+(vars.winW)/2+","+(vars.winH)/2+")scale(" + s + ")translate(" + -x + "," + -y + ")");
		//.attr("transform", "translate("+(vars.winW/s)/2+","+(vars.winH/s)/2+")scale(" + s + ")");
		//.attr("transform", "translate(" + data + ")scale(" + s + ")");
		//.attr("transform", "translate(" + x1 + "," + y1 + ")scale("+s+")");
	}



	/* INIT */

	function init () {
		if (window.innerWidth && window.innerHeight) {
			vars.winW = window.innerWidth;
			vars.winH = window.innerHeight;
			console.log('Height');
			console.log(window.innerHeight);
			console.log('Width');
			console.log(window.innerWidth);
		}

		drawMap(drawPoints);

		$(".zoom-control").on('click', function (event) {
			console.log('>>>>');
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

