var gaugeDiv = document.getElementById("gauge");

var traceA = {
  type: "pie",
  showlegend: false,
  hole: 0.5,
  rotation: 90,
  values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
  text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8","8-9", ""],
  direction: "clockwise",
  textinfo: "text",
  textposition: "inside",
  marker: {
    colors: ["rgb(248, 243, 236)", "rgb(244, 241, 229)", "rgb(233, 230, 202)", "rgb(229, 231, 179)", "rgb(213, 228, 157)",
              "rgb(183, 204, 146)", "rgb(140, 191, 136)", "rgb(138, 187, 143)", "rgb(133, 180, 138)", "white"]
  },
  hoverinfo: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8","8-9", ""],
};

var degrees = 115, radius = .6;
var radians = degrees * Math.PI / 180;
var x = -1 * radius * Math.cos(radians);
var y = radius * Math.sin(radians);

var mainPath = 'M -.0 -0.025 L .0 0.025 L',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);
var layout = {
  shapes:[{
      type: 'path',
      path: path,
      line: {
        color: 'red',
      }
    }],
  title: 'Belly Button Washing Frequency',
  xaxis: {type:'category',zeroline:false, showticklabels:false,
  showgrid: false, range: [-1, 1]},
yaxis: {type:'category',zeroline:false, showticklabels:false,
  showgrid: false, range: [-1, 1]}
};

var data = [traceA];

Plotly.plot(gaugeDiv, data, layout, {staticPlot: true});