var canvas = document.getElementById("Drawing_area");
var context = canvas.getContext("2d");

//Clear the drawing
function clearDrawing()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
}

//draw the inscribed polygon
function PolygonInsideCircle()
{
	var coordinates = new Array();
	var radius = document.getElementById("radius").value;
	var numSides = parseInt(document.getElementById("vertices").value);
	var i, x, y;
	
	if(radius == "")
	{
		document.getElementById("result").innerHTML = "Enter the radius.";
		clearDrawing();
		return;
	}
	
	var rad = parseInt(radius);
	
	//calculating the angle:theta
	var theta = 2 * Math.PI / numSides;
	
	//center of the drawing fixed at (150,150), i.e the center of the canvas
	var centerX=150, centerY=150;
	
	//clearing the drawing before starting
	clearDrawing();
	
	//Drawing the polygon
	for ( i = 0; i < numSides ; i++)
	{
		coordinates[i] = new Array(2);
		coordinates[i][0] = centerX + rad * Math.sin (i * theta);
		coordinates[i][1] = centerY + rad * Math.cos (i * theta);
		if ( i == 0)
		{
            context.beginPath();
            context.moveTo(coordinates[i][0],coordinates[i][1]);
			continue;
		}
		context.lineTo(coordinates[i][0],coordinates[i][1]);
		context.strokeStyle = 'yellow';
		context.stroke();
	}
	//closing the polygon
	context.lineTo(coordinates[0][0],coordinates[0][1]);
	context.strokeStyle = 'green';
	context.stroke();
    context.closePath();
	
	//drawning the cricle
	context.beginPath();
	context.arc(centerX, centerY, rad, 0, 2 * Math.PI, false);
	context.strokeStyle = "#8E4585";
	context.stroke();
	
	//tolerance is the difference between distance of the mid-point of one of the edges of the polygon from the center (150,150) and the radius of the circle.
	//getting the midpoint of one of the edges
	var midptX = (coordinates[0][0] + coordinates[1][0])/2;
	var midptY = (coordinates[0][1] + coordinates[1][1])/2;
	
	//finding the distance between this midpoint and the center of the cricle
	var d = Math.pow((centerX - midptX),2) + Math.pow((centerY - midptY),2);
	var distance = Math.sqrt(d);
	
	//calculate the tolerance
	var tolerance =  rad - distance;
	
	//print tolerance
	document.getElementById("result").innerHTML = tolerance.toPrecision(4);
}

//changing the label of interactive slider
function ChangeSliderValue(vertex) {
	document.getElementById("numVertex").value = vertex;
	PolygonInsideCircle();
}



