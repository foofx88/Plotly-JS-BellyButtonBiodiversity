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
});
}

// get a different values when a new sample is selected
function optionChanged(newSample) {
buildCharts(newSample);
buildSubjectData(newSample);
}



// Initialize the dashboard
init();



