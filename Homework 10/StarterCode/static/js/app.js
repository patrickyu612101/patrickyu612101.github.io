
// from data.js
var tableData = data;
var tbody = d3.select("tbody");

data.forEach((tableData) => {
    var row = tbody.append("tr");
    
    Object.entries(tableData).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });

// YOUR CODE HERE!
var submit = d3.select("#filter-btn");

submit.on("click", function() {
d3.event.preventDefault();

var inputElement = d3.select("#datetime");

var inputValue = inputElement.property("value");

var filteredData = tableData.filter(tdate => tdate.datetime === inputValue);

console.log("file",filteredData);
// console.log(tableData);

// tbody.parentNode.removeChild();
var tremove =d3.select("tbody");
while (tremove.firstChild) {
  tremove.removeChild(tremove.firstChild);
}


var userdate= filteredData.map(time=>time.datetime);
console.log(userdate); 
//new table
tbody.html(" ");
filteredData.forEach((filteredData) => {
  var row = tbody.append("tr");
  
  Object.entries(filteredData).forEach(([key, value]) => {
    var cell = tbody.append("td");
    cell.text(value);
  });
});
//

});


