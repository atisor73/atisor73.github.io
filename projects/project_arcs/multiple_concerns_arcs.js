

var data = [
    {key: 0, code1: 6, code2: 7, count: 2795},
    {key: 1, code1: 6, code2: 8, count: 10812},
    {key: 2, code1: 6, code2: 9, count: 673},
    {key: 3, code1: 8, code2: 9, count: 627},
    {key: 4, code1: 1, code2: 2, count: 151},
    {key: 5, code1: 1, code2: 3, count: 1070},
    {key: 6, code1: 1, code2: 4, count: 914},
    {key: 7, code1: 1, code2: 5, count: 606},
    {key: 8, code1: 1, code2: 6, count: 2068},
    {key: 9, code1: 1, code2: 7, count: 1398},
    {key: 10, code1: 1, code2: 8, count: 2413},
    {key: 11, code1: 1, code2: 9, count: 130},
    {key: 12, code1: 2, code2: 3, count: 91},
    {key: 13, code1: 2, code2: 4, count: 553},
    {key: 14, code1: 2, code2: 5, count: 318},
    {key: 15, code1: 2, code2: 6, count: 773},
    {key: 16, code1: 2, code2: 7, count: 478},
    {key: 17, code1: 2, code2: 8, count: 1417},
    {key: 18, code1: 2, code2: 9, count: 699},
    {key: 19, code1: 3, code2: 4, count: 528},
    {key: 20, code1: 3, code2: 5, count: 259},
    {key: 21, code1: 3, code2: 6, count: 1612},
    {key: 22, code1: 3, code2: 7, count: 1065},
    {key: 23, code1: 3, code2: 8, count: 1829},
    {key: 24, code1: 3, code2: 9, count: 73},
    {key: 25, code1: 4, code2: 5, count: 2547},
    {key: 26, code1: 4, code2: 6, count: 4535},
    {key: 27, code1: 4, code2: 7, count: 1491},
    {key: 28, code1: 4, code2: 8, count: 6311},
    {key: 29, code1: 4, code2: 9, count: 433},
    {key: 30, code1: 5, code2: 6, count: 3063},
    {key: 31, code1: 5, code2: 7, count: 686},
    {key: 32, code1: 5, code2: 8, count: 2863},
    {key: 33, code1: 5, code2: 9, count: 221},
    {key: 34, code1: 7, code2: 8, count: 5127},
    {key: 35, code1: 7, code2: 9, count: 406}
];

var data_node_counts = [
    {code: 1, count: 4800},
    {code: 2, count: 2560},
    {code: 3, count: 26562},
    {code: 4, count: 3892},
    {code: 5, count: 13691},
    {code: 6, count: 29841},
    {code: 7, count: 9981},
    {code: 8, count: 71312},
    {code: 9, count: 1272},
]

var decode_concern = {
    "1": "A", // "Adaptive/Self-help",
    "2": "B", // "Hearing",
    "3": "C", // "Cognitive",
    "4": "D", // "Global",
    "5": "E", // "Medical",
    "6": "F", // "Physical/Motor",
    "7": "G", // "Social/Emotional",
    "8": "H", // "Speech/Language",
    "9": "I", // "Vision"
};

var class_concern = {
    "1": "A", // "AdaptiveSelfhelp",
    "2": "B", // "Hearing",
    "3": "C", // "Cognitive",
    "4": "D", // "Global",
    "5": "E", // "Medical",
    "6": "F", // "PhysicalMotor",
    "7": "G", // "SocialEmotional",
    "8": "H", // "SpeechLanguage",
    "9": "I", // "Vision"
}
var palette_concern = {
    "1": "#303359",
    "2": "#8B8BAE",
    "3": "#6AB3BF",
    "4": "#DC996A",
    "5": "#A84D60",
    "6": "#D8CA26",
    "7": "#D6A3B7",
    "8": "#77A289",
    "9": "#A45A36"
}
body = d3.select("#container-svg");

// *********************** GLOBAL DISPLAY VARS *********************** 
var N_arcs = data.length,
    svg_width = 675,
    svg_height = 360,
    padding_H = 20,
    padding_V = 10,
    Y_DRAW = 290;

var dark_mode = false; 
if (dark_mode) {
    var color_bg_rect = "#101010";
    var color_unselected = "#343434";
} else {
    var color_bg_rect = "transparent";
    var color_unselected = "#dfdfdf";
}

// ******************************* SVG ******************************* 
var svg  = body.append("svg")
            .attr("width", svg_width)
            .attr("height", svg_height);

var margin_plot = {top: 20, bottom: 20, left: 0}
const plot_width = svg_width, 
        plot_height = svg_height;

// ***************************** SCALES ****************************** 

var scale_x = d3.scaleBand()
    .domain(d3.range(1,10))
    .range([padding_H, plot_width - padding_H])

var scale_width = d3.scaleLinear()
    .domain([
        0, d3.max(data, function(d){ return d.count; })
    ])
    .range([0, 23])

// ***************************** GRADIENTS **************************** 
var defs = svg.append("defs");

// -------------------- GRADIENT ALL --------------------
for (i = 0; i < data.length; i++) {
    var d = data[i];

    var gradient = defs.append("linearGradient")
        // .attr("id", "svgGradient" + i)
        .attr("id", "svgGradient" + d.key)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "100%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("class", "start")
        .attr("offset", "20%")
        .attr("stop-color", palette_concern[d.code1])
        .attr("stop-opacity", 1);

    gradient.append("stop")
        .attr("class", "end")
        .attr("offset", "80%")
        .attr("stop-color", palette_concern[d.code2])
        .attr("stop-opacity", 1);
}

// **************************** DRAWING CIRCLES ***************************** 
scale_r = d3.scaleSqrt()
            .domain([d3.min(data_node_counts, function(d) { return d.count; }), 
                    d3.max(data_node_counts, function(d) { return d.count; })])
            .range([6, 15]);

var bg_rect = svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", svg_width)
                .attr("height", svg_height)
                .attr("fill", color_bg_rect)

// **************************** DRAWING ARCS ***************************** 
for (i = 0; i < data.length; i++) {
    var d = data[i];

    var x1 = scale_x(d.code1),
        x2 = scale_x(d.code2);

    var width = scale_width(d.count),
        r_avg = (x2 - x1) / 2.0,
        r_inner = r_avg - width/2.0,
        r_outer = r_avg + width/2.0 ; 

    var arc = d3.arc()
        .innerRadius(r_inner)
        .outerRadius(r_outer)
        .startAngle(-Math.PI/2)
        .endAngle(Math.PI/2);

    var move_x = x1 + (x2 - x1)/2.0
    var move_y = Y_DRAW;

    svg.append("path")
        .attr("class", "arcs" + " " + class_concern[d.code1] + " " + class_concern[d.code2])
        .attr("d", arc)
        // .attr("fill", "url(#svgGradient" + i + ")")
        .attr("fill", "url(#svgGradient" + d.key + ")")
        .attr('transform', "translate(" + move_x + "," + move_y + ")")
        .attr("shape-rendering", "geometricPrecision");

}

var nodes = svg
    .selectAll("circle")
    .data(data_node_counts)
    .enter()
    .append("circle")
      .attr("class", "nodes")
      .attr("id", d => class_concern[d.code])
      .attr("cx", function(d){ return scale_x(d.code); })
      .attr("cy", Y_DRAW + 3) 
      .attr("r", function(d) { return scale_r(d.count); })
      .style("fill", function(d) { return palette_concern[d.code]; })
      .attr("shape-rendering", "geometricPrecision");

nodes.on("click", function() {
    // ------- turn everything grey
    svg.selectAll(".arcs").attr("fill", color_unselected)
    svg.selectAll(".nodes").style("fill", color_unselected)

    // ------- Get associated data from selected node
    // console.log(d3.select(this).data()[0].code)
    var code_selected = d3.select(this).data()[0].code,
        color_selected = palette_concern[code_selected];

    console.log(class_concern[code_selected])
    console.log(svg.select("#" + class_concern[code_selected]))

    // ------- select node
    id_selected = "#" + class_concern[code_selected]
    svg.selectAll(id_selected)
        .style("fill", color_selected)

    // ------- select arcs
    class_selected = "." + class_concern[code_selected]
    svg.selectAll(class_selected)
        .attr("fill", color_selected)
        .raise()

})


// ******************** CLICK OUT TO RETURN NORMAL ARCS ********************* 

bg_rect.on("click", function() {
    // change nodes back to original 
    for (j = 0; j < Object.keys(class_concern).length + 1; j++) {
        svg.select("#" + class_concern[j])
            .style("fill", palette_concern[j])
    }
    // select arc that matches datum, change its fill back to original gradient
    for (i = 0; i < data.length; i++) {
        var d = data[i];
        svg.select(".arcs" + "." + class_concern[d.code1] + "." + class_concern[d.code2])
            .attr("fill", "url(#svgGradient" + d.key + ")")
    }
})

// **************************** WRITING LABELS ***************************** 
for (i = 1; i < Object.keys(decode_concern).length + 1; i++) {
    var txt = decode_concern[i];
    txt1 = txt.split("/")[0];
    if (txt.split("/").length == 2) {
        txt1 = txt1 + " /";
        txt2 = txt.split("/")[1];
        add_txt = svg.append("text")
            .attr("class", "arcLabels")
            .text(txt1)
            .attr("x", scale_x(i)- txt1.length - 10 )
            .attr("y", Y_DRAW + 35)
            .attr("dominant-baseline", "middle")
        add_txt.append("tspan")
            .text(txt2)
            .attr("dx", -40)
            .attr("dy", 13);

    } else {
        svg.append("text")
            .attr("class", "arcLabels")
            .text(txt1)
            .attr("x", scale_x(i) - txt1.length - 5)
            .attr("y", Y_DRAW + 35)
            .attr("dominant-baseline", "middle")
    }
}

// svg.selectAll("text.labels")
//     .data([1, 2, 3, 4, 5, 6, 7, 8, 9])
//     .enter()
//     .append("text")
//     .attr("class", "arcLabels")
//     .text(function(d) {
//         return decode_concern[d];
//     })
//     .attr("x", function(d, i) { 
//         return scale_x(d) - decode_concern[d].length - 10; 
//     })
//     .attr("y", 350)
//     .attr("dominant-baseline", "middle")
