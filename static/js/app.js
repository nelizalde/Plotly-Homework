// Function
function initial(){

    // Importing Data
   d3.json("./samples.json").then((belly_data) => {
       console.log(belly_data);
   
   var dropdownMenu = d3.select("#selDataset");
   
   var id_name = belly_data.names
   
   id_name.forEach(each_name=>{
       dropdownMenu.append("option").text(each_name)
   })
   
   optionChanged(id_name[0])
   topTen(id_name[0])
   
   })   
   }
   
   // Call function
   initial()
   topTen()
   
   // Function - Demoographic info
   function demoographics(id){
   
    // Importing Data
    d3.json("./samples.json").then((belly_data) => {
       console.log(belly_data);
   
   var demo_box = d3.select("#sample-metadata");
   
   var meta_info = belly_data.metadata
   
   var filter_data = meta_info.filter(mi=>mi.id==id)[0]
   
   // Clearing exsiting data 
   demo_box.html("")
   
   Object.entries (filter_data).forEach(([key,value])=>{
       demo_box.append("h3").text(`${key}${value}`)
   })
   })
   }
   
   // Function for optionchange
   
   function optionChanged(user_input){
       demoographics(user_input)
       topTen(user_input)
   }
   
   // creating Top 10 OTU Id's to Graph
   function topTen(user_input){
     d3.json("./samples.json").then((belly_data) => {
       console.log(belly_data);
   
       var samples = belly_data.samples
   
       var filter_data = samples.filter(s=>s.id==user_input)[0]
   
     
   
   
   //Create a Horizontal Bar Chart to display top 10 OTUs 
   var trace = {
   x: filter_data.sample_values.slice(0,10).reverse(),
   y: filter_data.otu_ids.map(data=> `OTU${data}`).slice(0,10).reverse(),
   type: "bar",
   text: filter_data.otu_labels.slice(0,10).reverse(),
   orientation: 'h',
   marker: {
   color: 'rgb(142,124,195)'
   }
   };
   var data = [trace];
   
   var layout = {
   title: "'Bar Chart - Top 10 OTU",
   
    };
   
   Plotly.newPlot("bar", data, layout)
   
   // //Create a Bubble Chart 
   var trace1 = {
       x: filter_data.otu_ids,
       y: filter_data.sample_values,
       mode: 'markers',
       marker: {
         size: filter_data.sample_values,
         color: filter_data.otu_ids,
       },
       text: filter_data.otu_labels
     };
   
   var data = [trace1];
   
   var layout = {
       title: 'Marker Size',
       showlegend: false,
       // height: 600,
       // width: 600
     };
   
   Plotly.newPlot('bubble', data, layout);
   })}