function main() {
    $.getJSON("JSdata.json", function (jsonData) {

    		// Establishing sets of variable for each item of data list
			var platform = jsonData[0];
			var service = jsonData[1];
			var avg = jsonData[2];
			var xdomain = ["Twitter Website - iTunes", "Android  - iTunes", "Other  - iTunes", "iOS  - iTunes",
				       "Twitter Website - Spotify", "Android  - Spotify", "Other - Spotify", "iOS - Spotify",
				       "Twitter Website - Apple Music", "Android - Apple Music", "Other - Apple Music", "iOS - Apple Music",
			       "Twitter Website - Soundcloud", "Android - Soundcloud", "Other - Soundcloud", "iOS - Soundcloud"
    					  ]

			// establishing width, height, and radius of the arc?
			var w = 400,
				h = 400,
		  		r = 150;


// ================================================= Platform Pie Chart =========================
// ==============================================================================================
// ==============================================================================================
			var svg = d3.select("#platform")
			            .append("svg")
						.attr("width", w)
						.attr("height", h)
						.append('g')
						.attr('transform', 'translate('+(w/2)+','+(h/2) +')');

			var arc = d3.svg.arc()
						.outerRadius(r);

			var pie = d3.layout.pie()
						.value(function (d) {return d.Percentage; })
						.sort(null);

			var color = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			var tip = d3.tip()
            .attr('class', 'd3-tip')
						.offset([-10, 0])
						.html(function(d) {
							return "Platform: "+d.data.Platform.toString()+"\n"+"Percentage: "+d.data.Percentage.toString()+"%";
						});

			svg.call(tip);

			svg.selectAll("barGraphContainer")
			    .data(pie(platform))
				.enter()
          		.append("path")
          		.attr("d", arc)
          		.style("fill", function (d, i) { return d.data.Color } )
          		.on("mouseover", tip.show )
          		.on("mouseout", tip.hide )
          		;


// ================================================= Streaming Service Pie Chart ===================
// =================================================================================================
// =================================================================================================
          	var svg = d3.select("#service")
			            .append("svg")
						.attr("width", w)
						.attr("height", h)
						.append('g')
						.attr('transform', 'translate('+(w/2)+','+(h/2) +')');


			var arc = d3.svg.arc()
						.outerRadius(r);

			var pie = d3.layout.pie()
						.value(function (d) {return d.Percentage; })
						.sort(null);

			var color = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			svg.selectAll("barGraphContainer")
			    .data(pie(service))
				.enter()
          		.append("path")
          		.attr("d", arc)
          		.attr("fill", function (d, i) { return d.data.Color; })
          		.on("mouseover", tip.show )
          		.on("mouseout", tip.hide )
          		;

// ================================================= Bar Chart of Averages =========================
// =================================================================================================
// =================================================================================================

				var margin = { top: 100,
							   left: 50,
							   right: 50,
							   bottom: 200 };


				//Scaling ???
				var realW = document.getElementById("barz").offsetWidth;

				var width = realW - margin.left - margin.right,
					height = 800 - margin.top - margin.bottom;

				// We will use a ordinal scale, allowing us to map a series of elements
				// to a range (which will be the location on the x-axis of the bar
				// graph).
				// @see: https://github.com/mbostock/d3/wiki/Ordinal-Scales
				//
				// Our domain is the names of the color, as an array.
				//   Ex: ["red", "green", "yellow", ...]
				//
				// To translate our data, which is an array of objects that contain
				// both a .color and a .count, into an array of only color names,
				// we will use _.map() to map our array into a new array.
				//
				// Our range is all the values in [0, width].


				var svg =
				d3.select("#barz")
				  .append("svg")
				  .attr("w", width + margin.left + margin.right)
				  .attr("h", height + margin.top + margin.bottom)
				  .style("width", (width + margin.left + margin.right) + "px")
				  .style("height", (height + margin.top + margin.bottom) + "px")
				  .append("g")
				  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
				  ;

				var x =
				   d3.scale.ordinal()
						   .domain( xdomain )
						   .rangeBands( [0, width], 0.1 );

				var y =
				   d3.scale.linear()
						   .domain( [0, d3.max( avg, function(d) { return d.Avg; } )] )
						   .range( [height, 0] );

				var xAxis =
				   d3.svg.axis()
						 .scale( x )
						 .orient("bottom");

				var yAxis =
					d3.svg.axis()
						  .scale(y)
						  .orient("left");

				var tip = d3.tip()
            		.attr('class', 'd3-tip')
						.offset([-10, 0])
						.html(function(d) {
							return d.Service.toString()+"\n"+"Percentage: "+d.Avg.toString()+"%";
						});

				svg.call(tip);

				var c20 = d3.scale.category20();
				svg.selectAll("rect")
				  .data(avg)
				  .enter()

				  .append("rect")
				  .attr("x", function (d, i) { return 5+d.Position/16*width; } )
				  .attr("y", function (d, i) { return y(d.Avg); })
				  .attr("width", x.rangeBand()-10 )
				  .attr("height", function (d) { return height - y(d.Avg); })
				  .style("fill", function(d, i) { return d.Color })
				  .style("stroke", function(d, i) { return tinycolor(c20(d,i)).darken(); })
				  .style("stroke-width", 0)
				  .on("mouseover", tip.show )
				  .on("mouseout", tip.hide )
				  ;



				svg.append("g")
				  .attr("class", "axis")
				  .call(yAxis)
				  ;



				svg.append("g")
				  .attr("class", "axis")
				  .attr("transform", "translate(0, " + height + ")")
				  .call(xAxis)
				  .selectAll("text")
					.style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".15em")
		            .attr("transform", "rotate(-65)" )
				  ;

        })

        .fail(function (d) { alert("Failed to load JSON!"); })
    ;
}
