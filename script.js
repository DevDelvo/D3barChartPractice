let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// dimensions of our SVG container
let svgWidth = 500;
let svgHeight = 300;

// padding and width for our bars
var barPadding = 5;
var barWidth = (svgWidth / dataset.length);

// sets the svg dimensions to our declared heigth and width variables
let svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    // .attr("class", "bar-chart");

// set up barChart based on our dummy dataset
let barChart = svg.selectAll("rect")
    .data(dataset) // passes in the dataset. The data will dictate the height of each bar
    .enter() // looks at both the dataset passed into data() _and_ at the selection we did with selectAll('rect)
             // it then tries to look for "matches". So it creates a mapping between our data and the DOM
             // **Note that selectAll('rect') method returned an empty selection (there are no <rect> elements in the DOM yet)
             //  However the dataset has nine items. So there are no "matches"
             // The enter() method then allows you to create new <rect> elements in the DOM for each item in the dataset which doesnt yet have a corresponding <rect> elements   
    .append("rect") // append a <rect> element for each of the items. 
                    // since it follows enter(), this method will be executed nine times, one for each datapoint that lacks a corresponding <rect> in the DOM. 
    
    // Four attributes to assign: X, Y, heigth and width
    .attr("y", function(d) { 
        return svgHeight - d;
    }) // assigning the y-position of the rectangles. First arg is the attribute we want to add ("y")
       // the datapoint is stored in the `d` argument for the function
       // so we take that datapoint and subtract it from the height of our SVG container.
       // **X and Y-coordinates are always calculate from the top-left corner. So when we subtract the height of the container with the `d` value, we get the y-coordinate for the top of the bar.
    .attr("height", function(d) {
        return d; // the height of our bar is just the value of the datapoint.
    })
    .attr("width", barWidth - barPadding) //the width of the datapoint is our barPadding subtracted from out barWidth
    // The x-coordinates
    .attr("transform", function(d, i) { // `d` is the dataset value, `i` is the index of the item in the array
        let translate = [barWidth * i, 0]; //to set the coordinates for each of the bars, we multiply the index `i` by the `barWidth` variable
        return "translate(" + translate +")"; // return a string with the translate(`translate variable`). Ex: "translate(100)" would push the bar 100 pixels to the right.
    });