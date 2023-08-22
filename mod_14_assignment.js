// alert('test')
// Get samples data
const samples_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// const samples_pull = d3.json(samples_url);
// console.log("Samples_URL: ", samples_pull);

// // Fetch the JSON data and console log it
// d3.json(samples_url).then(function(data) {
//   console.log(data);
// })

function drop_down_menu() {
  let sel_data = d3.select("#selDataset");

  d3.json(samples_url).then(function (data) {
    // console.log(data.names);
    let sel_names = data.names;
    sel_names.forEach((currentElement) => {
      console.log(currentElement);
      sel_data
        .append("option")
        .text(currentElement)
        .property("value", currentElement);
    });
    charts(sel_names[0]);
    bar(sel_names[0]);
    panel(sel_names[0]);

  });
}

drop_down_menu();

function charts(x) {

  d3.json(samples_url).then(function (data) {
    // console.log(data.names);
    let sel_samples = data.samples
    let newArray = sel_samples.filter(number => number.id == x)[0];
    let otu_ids = newArray.otu_ids
    let sample_values = newArray.sample_values
    let otu_labels = newArray.otu_labels

    //Set the sort and filter variable for use in the bar chart viz. 
    // let top_ten_sort = newArray.sort((a, b) => b.sample_values - a.sample_values);
    // let top_ten_filter = top_ten_sort.slice(0, 11);
    // let bar_sliced = top_ten_filter.reverse();

    // var bar_data = [{
    //     x: bar_sliced.map(object=>object.sample_values),
    //     y: bar_sliced.map(object=>object.otu_ids),
    //     text: bar_sliced.map(object.object.otu_labels),
    //     orientation: 'h',
    //     type: 'bar',
    //     }];
    // var bar_chart = [bar_data];

    // var bar_layout = {
    //     title: 'Top 10 OTUs',
    //     showlegend: false,
    //   };
    // Plotly.newPlot('bar', bar_data, bar_layout);


    var bubble_data = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values, color: otu_ids
      }
    };

    var bubble_chart = [bubble_data];

    var bubble_layout = {
      title: 'OTU ID',
      showlegend: false,
    };

    Plotly.newPlot('bubble', bubble_chart, bubble_layout);
  })

  // d3.selectAll("#selDataset").on("change", updatePlotly);

}

function bar(sampleData) {
  d3.json(samples_url).then((data) => {
    let sel_samples = data.samples;
    let newArray = sel_samples.filter(number => number.id == sampleData);
    let singleVal = newArray[0];

    let otu_ids = singleVal.otu_ids;
    let sample_values = singleVal.sample_values;
    let otu_labels = singleVal.otu_labels;

    // // Set the sort and filter variable for use in the bar chart viz. 
    // let top_ten_sort = newArray.sort((a, b) => b.sample_values - a.sample_values);
    // let top_ten_filter = top_ten_sort.slice(0, 10);
    // let bar_sliced = top_ten_filter.reverse();

    let y_axis = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    var bar_data = [{
      x: sample_values.slice(0, 10).reverse(),
      // x: bar_sliced,
      y: y_axis,
      text: otu_labels.slice(0, 10).reverse(),
      orientation: 'h',
      type: 'bar',
    }];

    var bar_layout = {
      title: 'Top 10 OTUs',
      showlegend: false,
    };

    Plotly.newPlot('bar', bar_data, bar_layout);

  });
}

// function panel(sampleData) {
//   d3.json(samples_url).then((data) => {
//     let sel_meta = data.metadata;
//     let array = sel_meta.filter(number => number.id == sampleData);
//     let val = array[0];

//     let ethnicity = val.ethnicity.map(ethnicity => `ethnicity ${ethnicity}`);
//     let gender = val.gender.map(gender => `gender ${gender}`);
//     let age = val.age.map(age => `gender ${age}`);
//     let location = val.location.map(age => `gender ${location}`);
//     let bbtype = val.bbqtype.map(age => `bbqtype ${bbqtype}`);
//     let wfreq = val.wfreq.map(age => `wfreq ${wfreq}`);

//     // // Set the sort and filter variable for use in the bar chart viz. 
//     // let top_ten_sort = newArray.sort((a, b) => b.sample_values - a.sample_values);
//     // let top_ten_filter = top_ten_sort.slice(0, 10);
//     // let bar_sliced = top_ten_filter.reverse();

//     var panel_data =   
//       [{
//         "ethinicity": ethnicity,
//         "gender": gender,
//         "age":age,
//         "location": location,
//         "bbqtype": bbtype,
//         "wfreq":wfreq,
//                 }]

//     Plotly.newPlot('sample-metadata', panel_data);

//   });

function panel(sampleData) {
  d3.json(samples_url).then((data) => {
    let metadata = data.metadata;

    let resultArray = metadata.filter(sampleObj => sampleObj.id == sampleData);
    let result = resultArray[0];

    let PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    for (key in result){
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };
	
  });
}

function optionChanged(dataSample){
  charts(dataSample);
  bar(dataSample);
  panel(dataSample);
  //gaugechart;
}