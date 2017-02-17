$(function() {
    createGraph();
});

function createGraph() {
    var margin = {top: 20, right: 20, bottom: 50, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var valueline = d3.line()
        .x(function(d) { return x(d['x']); })
        .y(function(d) { return y(d['y']); });
    
    
    var canvas = d3.select("#d3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // loop through the series json and apply valueline
    var i = 0
    for (var key in c2_data) {
        i++
        var objects = c2_data[key];
        // applies random colors to line stroke and label
        var color = "hsl(" + Math.random() * 360 + ",100%,50%)"

        x.domain(d3.extent(objects, function(d) { return d['x']; }));
        y.domain([0, d3.max(objects, function(d) {
            return Math.max(d['y']); })]);
        
        canvas.append("path")
        .data([objects])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("stroke", color);
        
         console.log(objects)
        canvas.append("text")
		.attr("transform", "translate(" + (width - 30) + "," + (y(objects[5]['y']) - 30 * i)+ ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", color)
		.text(key)
    
    };

    canvas.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    canvas.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Milliseconds");

    // Add the Y Axis
    canvas.append("g")
        .call(d3.axisLeft(y));
        
    canvas.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Radius");

};


