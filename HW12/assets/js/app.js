// @TODO: YOUR CODE HERE!   
// read the data from the csv file 

// set up the defalut views for x and y on page load
var xView = "poverty";
var yView = "healthcare";
var places="abbr"

d3.csv(".\\assets\\data\\data.csv").then(function(dataset){
        
        showVisual(dataset, xView, yView); 
        
});

// Create the svg canvas height and width 

var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 

var margin = {
    top: 50, 
    right: 50,
    bottom: 20, 
    left: 50
}

var padding = {
    top: -49,
    right: 19,
    left: 0
}

// Adjust your svg position 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Append svg to the index.html 
var svg = d3.select("#scatter")
          .append("svg")
          .attr("width", width+15)
          .attr("height", height+18) 
          .attr("class", "scatter")
          .append("g")
          .attr("tranform", `translate( ${margin.left}, ${margin.top})`);


function showVisual(data, xView, yView){

    data.map(d =>{
       // I've only cleans a small sample of the data. 
       // you will need to handle the rest
        data.poverty = +d[xView];
        data.healthcare = +d[yView];
        
    });

 // we need to get the min and max of x & y in the dataset to pass to .domain()
var xValues  = data.map(d => parseFloat(d[xView]));
var yValues  = data.map(d => parseFloat(d[yView])); 
// console.log("x",d3.extent(xValues));
// console.log("y",d3.extent(yValues));


// use extent to grab the min and max of the selected Scale and Axis
var xScale = d3.scaleLinear()
            .domain(d3.extent(xValues))
            .range([margin.right+50, width+margin.right]);

var yScale = d3.scaleLinear()
            .domain(d3.extent(yValues))
            .range([height-40, margin.top]);    


// Add the x & y Axis
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


// add the x & y scales to the index.html <svg> tag 
svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${padding.top},  ${height - margin.bottom})`)
        .call(xAxis)
        // .enter()
        // .append("text")
        ;

svg.append("text")             
    .attr("transform","translate(" + (margin.left*8) + " ," + ( height+13) + ")")
    .style("text-anchor", "middle")
    .text("Poverty (%)"); 
// 100 400

svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${padding.right+50}, ${padding.right})`)
        .call(yAxis);

svg.append("text")             
    // .attr("transform", "rotate(-90)")
    // .attr("y", 0 - margin.left+40)
    // .attr("x",0 - (margin.right-10))
    .attr("transform","translate(" + (margin.right-20) + " ," + ( margin.right+200) + "),rotate(90)")
    .style("text-anchor", "middle")
    .text("Health Care"); 

// Create the <circle></circle> element 
// var places =data.map(d=>parseFloat(d[xView]));
// console.log(places);

var scatter = svg.selectAll("circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale( d[xView] ))
            .attr("cy", d => yScale( d[yView] ))
            .attr("r", 10)
            .attr("fill","white")
            .attr('stroke','black')
            .enter()
            .data(data)
            .enter()
            .append("text")
            .attr("dx",  d => xScale( d[xView] )-7)
            .attr("dy", d => yScale( d[yView] )+5)
            .attr("font-size","10px")
            .attr("font-weight","bold")
            .style("fill", "black")
            .text(d=>d[places]);

            ;
     
        
/* data[xView] is the scale that will be 
    updated on click. You will need to update the bubbles with:

    1. Text for state abbr      
    2. Event Handlers 
    3. Labels that the user will click to update the chart 
    4. colors for bubbles and abbr state letters

  */                   
 console.log("data", data[xView]);

}