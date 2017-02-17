$(function() {
    createD3();
    createHighCharts();
});

function createD3() {
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
    for (var key in d3_data) {
        i++
        var objects = d3_data[key];
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


function createHighCharts () {
    // Get the CSV and create the chartonsole.log(c2_data)
    console.log(highcharts_data)
    Highcharts.chart('highcharts', {

        title: {
            text: 'Daily visits at www.highcharts.com'
        },

        subtitle: {
            text: 'Source: Google Analytics'
        },

        xAxis: {
            tickInterval: 7 * 24 * 3600 * 1000, // one week
            tickWidth: 0,
            gridLineWidth: 1,
            labels: {
                align: 'left',
                x: 3,
                y: -3
            }
        },

        yAxis: [{ // left y axis
            title: {
                text: null
            },
            labels: {
                align: 'left',
                x: 3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }, { // right y axis
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title: {
                text: null
            },
            labels: {
                align: 'right',
                x: -3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }],

        legend: {
            align: 'left',
            verticalAlign: 'top',
            y: 20,
            floating: true,
            borderWidth: 0
        },

        tooltip: {
            shared: true,
            crosshairs: true
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            hs.htmlExpand(null, {
                                pageOrigin: {
                                    x: e.pageX || e.clientX,
                                    y: e.pageY || e.clientY
                                },
                                headingText: this.series.name,
                                maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                    this.y + ' visits',
                                width: 200
                            });
                        }
                    }
                },
                marker: {
                    lineWidth: 1
                }
            }
        },
        series: highcharts_data
    });

}

