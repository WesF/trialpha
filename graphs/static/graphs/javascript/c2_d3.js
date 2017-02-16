$(function() {
    console.log('jquery is bullshit!');
    createGraph();
});

function createGraph() {
    console.log(c2_data)
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var valueline = d3.line()
        .x(function(d) { return x(d['x']); })
        .y(function(d) { return x(d['y']); });
    
    
    var canvas = d3.select("#d3").append("svg")
            .attr("width", 500)
            .attr("height", 500)
            .attr("border", "black")
            .attr("display", "block")
            .attr("margin", "auto")
    
    console.log(valueline)
    // loop through the series json and apply valueline
    for (var key in c2_data) {
        var objects = c2_data[key];
        console.log(objects)
        x.domain(d3.extent(objects, function(d) { return d['x']; }));
        y.domain([0, d3.max(objects, function(d) {
            return Math.max(d['x'], d['y']); })]);
        console.log(valueline.apply(null, [objects]))
        canvas.append("path")
        .data([objects])
        .attr("class", "line")
        .attr("d", valueline);
    
    };

    canvas.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    canvas.append("g")
        .call(d3.axisLeft(y));

    
};


