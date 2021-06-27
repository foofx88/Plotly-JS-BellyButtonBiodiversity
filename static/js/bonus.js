//Display the sample metadata (an individual's demographic information)
function buildSubjectData(subject) {
  d3.json("samples.json").then(function(data) {
    var subjectdata= data.metadata; 
    var resultlist= subjectdata.filter(sampleobj => sampleobj.id == subject); //match sample object ID with input subject key
    var result= resultlist[0]
    //console.log(result); 
    var display_panel = d3.select("#sample-metadata");
    display_panel.html(""); //initialise and clear values
    Object.entries(result).forEach(([key, value]) => {display_panel.append("p").text(`${key}: ${value}`);
    });
  });
}

function buildCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  d3.json("samples.json").then(function(data) {
    var samples= data.samples;
    var resultlist= samples.filter(sampleobj => sampleobj.id == sample);
    var result= resultlist[0]
  
    var ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
  
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    var bar_chart =[
      {
        y:ids.slice(0, 10).map(otu_ID => `OTU ${otu_ID}`).reverse(), //Use `otu_ids` as the labels for the bar chart.
        x:sample_values.slice(0,10).reverse(), //Use `sample_values` as the values for the bar chart.
        text:otu_labels.slice(0,10).reverse(), //Use `otu_labels` as the hovertext for the chart.
        type:"bar",
        orientation:"h", //make the bar chart horizontal
        marker: {
          color: 'rgb(165,42,42)'
        }
  
      }
    ];
  
    var layout_bar = {
      title: "Top 10 Bacteria Cultures Found in Subject ID",
      automargin: true //to prevent ticklabels being cut off
      
    };
  
    Plotly.newPlot("bar", bar_chart, layout_bar);
  
  //Create a bubble chart that displays each sample.
  
    var bubble_chart = [ 
      {
        x: ids, //Use `otu_ids` for the x values.
        y: sample_values, //Use `sample_values` for the y values.
        text: otu_labels, //Use `otu_labels` for the text values.
        mode: "markers",
        marker: {
          color: ids, //Use `otu_ids` for the marker colors.
          size: sample_values, //Use `sample_values` for the marker size.
          }
      }
    ];
  
    var layout_bubble = {
      automargin: true,
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };
  
    Plotly.newPlot("bubble", bubble_chart, layout_bubble);
  
  });
  }

//get the gauge area ready
var gaugeDiv = document.getElementById("gauge");


function gaugeChart(data) {

  console.log("gaugeChart", data);

  if(data.wfreq === null){
    data.wfreq = 0;

  }
var degree = parseInt(data.wfreq) * (180/10);
var degrees = 180 - degree;
var radians = degrees * Math.PI / 180;
var radius = 0.5;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

var mainPath = 'M -.0 -0.025 L .0 0.025 L',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var traceA = [{
  type: 'scatter',
  x: [0], y:[0],
  name: "Wash Frequency",
  showlegend : false,
  text: data.wfreq},
  {
  rotation: 90,
  values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
  text: ["8-9","7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
  textinfo: "text",
  textposition: "inside",
  marker: {
    colors: ["rgb(133, 180, 138)", "rgb(138, 187, 143)", "rgb(140, 191, 136)", "rgb(183, 204, 146)", 
    "rgb(213, 228, 157)", "rgb(229, 231, 179)", "rgb(233, 230, 202)", "rgb(244, 241, 229)", "rgb(248, 243, 236)", "white"]
  },
  label: ["8-9","7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
  hoverinfo: "text",
  type: "pie",
  showlegend: false,
  hole: 0.5,
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'red',
      line: {
        color: 'red',
      }
    }],
  title: 'Belly Button Washing Frequency <br> <b>Scrub Per Week</b>',
  xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
};


Plotly.newPlot(gaugeDiv, traceA, layout, {responsive: true});

}

//building the gauge chart
function buildGaugeChart(sample) {
  console.log("sample", sample);

  d3.json("samples.json").then(function (data) {

    var subjdata = data.metadata;

    var matchedsubj = subjdata.filter(sampleData => sampleData["id"] === parseInt(sample));

    gaugeChart(matchedsubj[0]); //initialise the gauge chart with the default subject value
 });   
}




function init() {
  var selector = d3.select("#selDataset"); //populate the reference data from drop down
  
  // Use the list of sample names to populate the selected option in the drop down
  d3.json("samples.json").then(function (data){
    var names = data.names;
    names.forEach(function(sample) {
      selector.append("option").text(sample).property("value", sample);
    });
  
    // setting the first sample from the list as a display default
    const firstSample = names[0];
    buildCharts(firstSample);
    buildSubjectData(firstSample);
    buildGaugeChart(firstSample)
  });
  }
  
  // get a different values when a new sample is selected
  function optionChanged(newSample) {
    buildCharts(newSample);
    buildSubjectData(newSample);
    buildGaugeChart(newSample)
  }
  
  
  
  // Initialize the dashboard
  init();