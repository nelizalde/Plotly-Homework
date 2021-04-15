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

})   
}

// Call function
initial()

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
}