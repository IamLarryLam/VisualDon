import { d3 } from 'd3'


var randomColor = (function() {
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();

    var hslToRgb = function(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
    };

    return function() {
        h += golden_ratio_conjugate;
        h %= 1;
        return hslToRgb(h, 0.5, 0.60);
    };
})();
// set the dimensions and margins of the graph
var margin = {
        top: 30,
        right: 80,
        bottom: 100,
        left: 100
    },
    // width = window.innerWidth - margin.left - margin.right,
    // height = window.innerHeight - margin.top - margin.bottom;
    width = window.innerWidth - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
    .domain([0, 13000])
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(function(d) {
        return d.chevaux;
    }))
    .padding(.3);
svg.append("g")
    .call(d3.axisLeft(y))


// //Bars
// const rectBackground = svg.selectAll("myRect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", x(0))
//     .attr("y", function(d) {
//         return y(d.Country);
//     })
//     .attr("width", function(d) {
//         return x(d.Value);
//     })
//     .attr("height", y.bandwidth())
//     .attr("fill", randomColor)
//     .style("margin-top", "10px")


// //Bars
// const rectLines = svg.selectAll("whiteRect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", x(0))
//     .attr("y", function(d) {
//         return y(d.Country) + 10;
//     })
//     .attr("width", function(d) {
//         return x(d.Value) + 1;
//     })
//     .attr("height", y.bandwidth() - 20)
//     .attr("fill", "white")
//     .style("margin-top", "10px")

// const LABEL_WIDTH = 200
// const label = container.append('div')
//     .style('position', 'fixed')
//     .style('width', `${LABEL_WIDTH}px`)
//     .style('text-align', 'center')

// const quandLaSourisPasseDessus = (e, d) => {
//     const {
//         clientX,
//         clientY
//     } = e
//     label
//         .style('left', `${clientX - LABEL_WIDTH / 2}px`)
//         .style('top', `${clientY - 20}px`)
//         .text(d.Country)
// }

// rectLines.on('mouseover', quandLaSourisPasseDessus)
// rectLines.on('mousemove', quandLaSourisPasseDessus)
// rectLines.on('mouseout', () => label.text(''))







// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 13000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function(d) {
                return d.Country;
            }))
            .padding(.3);
        svg.append("g")
            .call(d3.axisLeft(y))

        //Bars
        const rectBackground = svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", function(d) {
                return y(d.Country);
            })
            .attr("width", function(d) {
                return x(d.Value);
            })
            .attr("height", y.bandwidth())
            .attr("fill", randomColor)
            .style("margin-top", "10px")


        //Bars
        const rectLines = svg.selectAll("whiteRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", function(d) {
                return y(d.Country) + 10;
            })
            .attr("width", function(d) {
                return x(d.Value) + 1;
            })
            .attr("height", y.bandwidth() - 20)
            .attr("fill", "white")
            .style("margin-top", "10px")

        const LABEL_WIDTH = 200
        const label = container.append('div')
            .style('position', 'fixed')
            .style('width', `${LABEL_WIDTH}px`)
            .style('text-align', 'center')

        const quandLaSourisPasseDessus = (e, d) => {
            const {
                clientX,
                clientY
            } = e
            label
                .style('left', `${clientX - LABEL_WIDTH / 2}px`)
                .style('top', `${clientY - 20}px`)
                .text(d.Country)
        }
    })
    //     rectLines.on('mouseover', quandLaSourisPasseDessus)
    //     rectLines.on('mousemove', quandLaSourisPasseDessus)
    //     rectLines.on('mouseout', () => label.text(''))

//     // .attr("x", function(d) { return x(d.Country); })
//     // .attr("y", function(d) { return y(d.Value); })
//     // .attr("width", x.bandwidth())
//     // .attr("height", function(d) { return height - y(d.Value); })
//     // .attr("fill", "#69b3a2")