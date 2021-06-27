import {
    axisLeft,
    select,
    scaleLinear,
    max,
} from 'd3'

// var colors = ["red", "green", "yellow", "blue", "lightblue", "pink", "magenta"];
// var randomColor = (function() {
//     return colors[Math.floor(Math.random() * colors.length)];
// })();

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

var DATA = [{
    chevaux: 184,
    constructeur: "mercedes-benz",
    type: "sedan",
    prix: 40960,
    poids: 3900,
    rpmMax: 4500,
    consommation: 14,
    moteur: "eight",
    cylindre: "std",
    carburant: 1
}, {
    chevaux: 200,
    constructeur: "nissan",
    type: "hatchback",
    prix: 19699,
    poids: 3139,
    rpmMax: 5200,
    consommation: 17,
    moteur: "six",
    cylindre: "turbo",
    carburant: 1
}, {
    chevaux: 207,
    constructeur: "porsche",
    type: "convertible",
    prix: 37028,
    poids: 2800,
    rpmMax: 5900,
    consommation: 17,
    moteur: "six",
    cylindre: "std",
    carburant: 1
}, {
    chevaux: 207,
    constructeur: "porsche",
    type: "hardtop",
    prix: 34028,
    poids: 2756,
    rpmMax: 5900,
    consommation: 17,
    moteur: "six",
    cylindre: "std",
    carburant: 1
}, {
    chevaux: 207,
    constructeur: "porsche",
    type: "hardtop",
    prix: 32528,
    poids: 2756,
    rpmMax: 5900,
    consommation: 17,
    moteur: "six",
    cylindre: "std",
    carburant: 1
}, {
    chevaux: 262,
    constructeur: "jaguar",
    type: "sedan",
    prix: 36000,
    poids: 2950,
    rpmMax: 5000,
    consommation: 13,
    moteur: "twelve",
    cylindre: "std",
    carburant: 1
}]


function compare(a, b) {
    if (a.chevaux < b.chevaux)
        return -1;
    if (a.chevaux > b.chevaux)
        return 1;
    return 0;
}

DATA.sort(compare);

// const WIDTH = 500
// const HEIGHT = 500
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const MARGIN = 5
const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50
const MARGIN_TOP = 50
const BAR_HEIGHT = HEIGHT - MARGIN_TOP - MARGIN_BOTTOM
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length

const svg = select('#graph')
    .append('svg')
    .attr('viewBox', "0 0 " + WIDTH + " " + (HEIGHT + 50))

const yScale = scaleLinear()
    .domain([0, max(DATA, d => d.chevaux)])
    .range([BAR_HEIGHT, 0])

const g = svg.append('g')
    .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)

g.selectAll('rect')
    .data(DATA)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * BAR_WIDTH)
    .attr('width', BAR_WIDTH - MARGIN)
    .attr('y', d => yScale(d.chevaux))
    .attr('height', d => BAR_HEIGHT - yScale(d.chevaux))
    .attr('fill', randomColor)

g.selectAll('rect2')
    .data(DATA)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * BAR_WIDTH + 15)
    .attr('width', BAR_WIDTH - MARGIN - 30)
    .attr('y', d => yScale(d.chevaux))
    .attr('height', d => BAR_HEIGHT - yScale(d.chevaux))
    .attr('fill', '#192535')

g.selectAll('text')
    .data(DATA)
    .enter()
    .append('text')
    .text(d => d.constructeur)
    .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
    .attr('y', BAR_HEIGHT + MARGIN_BOTTOM / 2)
    .style('fill', '#fff')
    .attr('text-anchor', 'middle')

g.selectAll('text2')
    .data(DATA)
    .enter()
    .append('text')
    .text(d => Math.round(((500 - d.chevaux) * 2 / 100 + d.poids / 1000) * 100) / 100 + "s")
    .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
    .attr('y', d => {
        return yScale(d.chevaux) - MARGIN_TOP + 10
    })
    .style('fill', '#fff')
    .style('font-weight', 'bold')
    .attr('text-anchor', 'middle')

const axisY = axisLeft().scale(yScale)
    .tickFormat(d => `${d}`)
    .ticks(8)

svg.append('g')
    .attr('transform', `translate(${MARGIN_LEFT - 3}, ${MARGIN_TOP})`)
    .call(axisY)


// CAR SVG

const wholeCar = g.append('g').selectAll('svg')
    .data(DATA)
    .enter()
    .append('svg')
    .attr('viewBox', '0 0 959.992 476.009')
    .attr('width', BAR_WIDTH - MARGIN - 15)
    .attr('x', (d, i) => {
        return i * BAR_WIDTH;
    })
    .attr('y', d => {
        return yScale(d.chevaux) - BAR_HEIGHT / 1.4
    })


wholeCar.append("path")
    .attr('d', 'M610.52,493.69a24.556,24.556,0,0,0-6.469.938l-3.5,1.5,8.656,35.844-124.81.281c-77.963.165-166.52-11.5-232.93-9.5s-152.12,28-152.12,28L85.66,554.534c-19.251,5.3-25.718,97.367-25.718,166.78,0,1.113.027,2.253.031,3.375s-.031,2.262-.031,3.375c0,69.414,6.467,161.48,25.718,166.78l13.687,3.781s85.711,26,152.12,28,154.97-9.665,232.93-9.5l124.81.281-8.656,35.844,3.5,1.5a24.55,24.55,0,0,0,6.469.938,14.135,14.135,0,0,0,2.688-.25c.311-.058.624-.141.938-.219s.633-.157.938-.25a17.949,17.949,0,0,0,1.875-.687,14.008,14.008,0,0,0,4.78-3.282l.031-.031a8.316,8.316,0,0,0,1.469-2.281l12.156-31.25,109.94.25c23.9,11.942,45.511,10.719,73.593,10.719,133.25,0,187.63-86.586,187-201.38,0-.78-.019-1.566-.031-2.344.012-.778.031-1.564.031-2.344.628-114.79-53.749-201.38-187-201.38-28.082,0-49.693-1.224-73.593,10.719l-109.94.25-12.156-31.25a8.316,8.316,0,0,0-1.469-2.281l-.031-.031a14.007,14.007,0,0,0-4.781-3.281,17.935,17.935,0,0,0-1.875-.687c-.3-.093-.633-.175-.937-.25s-.627-.16-.937-.219a14.133,14.133,0,0,0-2.687-.25Z')
    .attr('fill', 'orange')

wholeCar.append("path")
    .attr('d', 'M691.96,573.16a40.661,40.661,0,0,0-8.781.969l-.031-.031L619.3,586.41c-17.728,6.6-32,14.272-32,32V830.97c0,17.728,14.272,25.4,32,32l63.843,12.312.031-.031a40.666,40.666,0,0,0,8.781.969c45.4,0,82.2-57.363,82.312-151.53-.114-94.169-36.916-151.53-82.312-151.53Z')
    .attr('fill', '#262626')

wholeCar.append("path")
    .attr('d', 'M400.34,594.15a867.5,867.5,0,0,1-94.811-5.062c25.66-48.714,97.985-30.265,205.56-31.531,49.686-.585,89.543-1.879,121.53-2.375-47.16,23.334-133.53,38.969-232.28,38.969Z')
    .attr('fill', '#262626')

wholeCar.append("path")
    .attr('d', 'M400.34,855.24a867.516,867.516,0,0,0-94.811,5.063c25.66,48.714,97.985,30.265,205.56,31.531,49.686.585,89.543,1.879,121.53,2.375-47.16-23.334-133.53-38.969-232.28-38.969Z')
    .attr('fill', '#262626')

wholeCar.append("path")
    .attr('d', 'M260.5,607.38l-77.749,12.469c-27.15,4.354-48.947,48.773-51,104.84,2.052,56.071,23.849,100.49,51,104.84L260.5,842a23.947,23.947,0,0,0,24-24V631.378a23.947,23.947,0,0,0-24-24Z')
    .attr('fill', '#262626')


const LABEL_WIDTH = 200
const label = svg.append('div')
    .style('position', 'fixed')
    .style('width', `${LABEL_WIDTH}px`)
    .style('text-align', 'center')

const quandLaSourisPasseDessus = (e, d) => {
    // console.log(d.chevaux);

    const {
        clientX,
        clientY
    } = e
    label
        .style('left', `${clientX - LABEL_WIDTH / 2}px`)
        .style('top', `${clientY - 20}px`)
        .style('color', '#000')
        .style('background-color', '#fff')
        .text(d.chevaux)
}

wholeCar.on('mouseover', quandLaSourisPasseDessus)
wholeCar.on('mousemove', quandLaSourisPasseDessus)
wholeCar.on('mouseout', () => label.text(''))



var container = document.getElementById('scroll')[0];
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var scrollArea = 1000 - windowHeight;
var car = document.getElementById('car');

// Lors du scroll
window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || window.scrollTop;

    console.log(Math.abs((car.getBoundingClientRect().top) / 10 - 100) * 10);
    // var posX = Math.abs((car.getBoundingClientRect().top) / 10 - 100) * 15 < 700 ? Math.abs((car.getBoundingClientRect().top) / 10 - 100) * 15 : car.getBoundingClientRect().top;
    // Calcul un peu savant pour faire que le 0 à 100% du scroll cache et affiche completement la voiture
    car.style.left = Math.abs((car.getBoundingClientRect().top) / 10 - 100) * 18 - 650 + 'px';
});

// Force Directed Graph
am4core.ready(function() {

    // var colors = ["#6671cc", "#8fcc66", "#cc66ad", "#9266cc", "#66cbcc"]
    var colors = ["#353535", "#fbde16", "orange", "#b566cc"]

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("force-directed", am4plugins_forceDirected.ForceDirectedTree);
    // chart.zoomable = true;
    // chart.mouseWheelBehavior = "none";
    chart.legend = new am4charts.Legend();

    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    networkSeries.dataFields.id = "id";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.value = "chevaux";
    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.link = "link";
    networkSeries.dataFields.color = "color";

    // networkSeries.maxLevels = 3;

    // Distances
    networkSeries.links.template.distance = 1
    networkSeries.manyBodyStrength = -20;


    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 9;
    networkSeries.linkWithStrength = 0;

    var nodeTemplate = networkSeries.nodes.template;
    nodeTemplate.tooltipText = "{chevaux}";
    nodeTemplate.fillOpacity = 1;
    nodeTemplate.label.hideOversized = true;
    nodeTemplate.label.truncate = true;

    var linkTemplate = networkSeries.links.template;
    linkTemplate.strokeWidth = 1;
    var linkHoverState = linkTemplate.states.create("hover");
    linkHoverState.properties.strokeOpacity = 1;
    linkHoverState.properties.strokeWidth = 2;

    nodeTemplate.events.on("over", function(event) {
        var dataItem = event.target.dataItem;
        dataItem.childLinks.each(function(link) {
            link.isHover = true;
        })
    })

    nodeTemplate.events.on("out", function(event) {
        var dataItem = event.target.dataItem;
        dataItem.childLinks.each(function(link) {
            link.isHover = false;
        })
    })



    var DATA2 = [{
        "id": "1",
        "name": "Mazda",
        "chevaux": 250,
        "children": [{
            "id": "1-2",
            "name": "Mazda 3",
            "chevaux": 140,
        }, {
            "id": "1-1",
            "name": "Mazda mx-5",
            "chevaux": 160,
            "children": [{
                "id": "1-1-1",
                "name": "Mazda MX-5 NA - 1990",
                "chevaux": 90,
            }, {
                "id": "1-1-2",
                "name": "Mazda MX-5 Nb - 2004",
                "chevaux": 110,
            }, {
                "id": "1-1-3",
                "name": "Mazda MX-5 NC - 2008",
                "chevaux": 140,
            }, {
                "id": "1-1-3",
                "name": "Mazda MX-5 ND - 2016",
                "chevaux": 160,
            }]
        }, {
            "id": "1-2",
            "name": "Mazda 2",
            "chevaux": 120,
        }, {
            "id": "1-2",
            "name": "Mazda RX-7",
            "chevaux": 300,
        }]
    }, {
        "id": "2",
        "name": "BMW",
        "chevaux": 250,
        "children": [{
            "id": "1-2",
            "name": "BMW 2.2",
            "chevaux": 200,
        }, {
            "id": "1-1",
            "name": "BMW 2.1",
            "chevaux": 200,
            "children": [{
                "id": "1-1-1",
                "name": "BMW 3.1",
                "chevaux": 150,
            }, {
                "id": "1-1-2",
                "name": "BMW 3.2",
                "chevaux": 150,

            }, {
                "id": "1-1-3",
                "name": "BMW 3.3",
                "chevaux": 150,
                "children": [{
                    "id": "1-1-3-1",
                    "name": "BMW 4.1",
                    "chevaux": 120,
                }, {
                    "id": "1-1-3-2",
                    "name": "BMW 4.2",
                    "chevaux": 120,
                }, ],
            }]
        }]
    }, {
        "id": "3",
        "name": "Audi",
        "chevaux": 250,
        "children": [{
            "id": "1-2",
            "name": "Audi 2.2",
            "chevaux": 200,
        }, {
            "id": "1-1",
            "name": "Audi 2.1",
            "chevaux": 200,
            "children": [{
                "id": "1-1-1",
                "name": "Audi 3.1",
                "chevaux": 150,
            }, {
                "id": "1-1-2",
                "name": "Audi 3.2",
                "chevaux": 150,
            }, {
                "id": "1-1-3",
                "name": "Audi 3.3",
                "chevaux": 150,
                "children": [{
                    "id": "1-1-3-1",
                    "name": "Audi 4.1",
                    "chevaux": 120,
                }, {
                    "id": "1-1-3-2",
                    "name": "Audi 4.2",
                    "chevaux": 120,
                }, ],
            }]
        }]
    }];
    loopThroughArrayAddColors(DATA2);
    console.log(DATA2);
    networkSeries.data = DATA2;

    function loopThroughArrayAddColors(array, count = 0) {
        var count;
        if (count == null) {
            count = 0;
        }
        if (array.length > 1) {

            array.forEach(oeuvre => {
                if (oeuvre['color'] == null) {
                    console.log(oeuvre.id + " n'a pas de couleur");
                    oeuvre['color'] = colors[count];
                    // console.log(count);
                    console.log(oeuvre['color']);
                }
                if (oeuvre.children != null) {
                    count++;
                    (oeuvre.children).forEach(childs => {
                        loopThroughArrayAddColors(childs, count);
                    });
                    count--;
                }
            });
            // count--;

        } else {
            if (array['color'] == null) {
                // console.log(array.id + " n'a pas de couleur");
                array['color'] = colors[count];
                // console.log(count);
                console.log(array['color']);

            }
            if (array.children != null) {
                count++;
                (array.children).forEach(childs => {
                    loopThroughArrayAddColors(childs, count);
                });
                // count--;
            }
        }
    }
    nodeTemplate.events.on("over", function(event) {
        var dataItem = event.target.dataItem;
        dataItem.childLinks.each(function(link) {
            link.isHover = true;
        })
    })

    nodeTemplate.events.on("out", function(event) {
        var dataItem = event.target.dataItem;
        dataItem.childLinks.each(function(link) {
            link.isHover = false;
        })
    })

    nodeTemplate.events.on("rightclick", function(event) {
        startTime = new Date();
        // console.log(nodeTemplate.tooltipText);
        var dataItem = event.target.dataItem;
        console.log(dataItem.id);
        window.open("/oeuvre?" + dataItem.id, '_blank').focus();
    })

}); // end am4core.ready()