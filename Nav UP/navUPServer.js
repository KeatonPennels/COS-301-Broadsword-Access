var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var locationArray = [
						{name:"IT Building", id:1}, 
						{name:"Humanities", id:2}, 
						{name:"Centenery", id:3}, 
						{name:"Chancellors Building", id:4},
						{name:"Aula", id:5},
						{name:"Engineering 3", id:6},
						{name:"Sci-Enza", id:7},
						{name:"Bio-Informatics", id:8},
						{name:"Postgraduate Center", id:9},
						{name:"Student Center", id:10}
					];

app.get('/', function(request, response) 
{
    response.sendFile(path.join(__dirname + '/index.html'));
    app.use(express.static(__dirname));
});

app.get('/viewLocations', function(request, response)
{
	response.json(locationArray);
});

app.post("/editLocation", function(request, response)
{
	var location = request.body;

	console.log(location);
	var edit = false;

	for(var key in locationArray)
	{
		if(locationArray[key].id == location.id)
		{
			locationArray[key] = location;
			edit = true;
		}
	}

	if(edit == false)
	{
		response.send("Location edit failed!");
	}
	else
	{
		response.send("Location has been edited");
	}

});

app.post("/addLocation", function(request, response)
{
	var location = new Object();

	try
	{
		location.name = request.body.name;
		location.id = locationArray[locationArray.length - 1].id + 1;

		locationArray.push(location);

		response.send("The location has been added successfully");
	}
	catch(error)
	{
		response.send("The location could not be added");
	}
});

app.post("/deleteLocation", function(request, response)
{

	var deleted = false;

	var id = request.body.id;

	console.log(id);
	for(var key in locationArray)
	{
		if(locationArray[key].id == id)
		{
			locationArray.splice(key, 1);
			deleted = true;
		}
	}

	if(deleted == false)
	{
		response.send("The location could not be deleted");
	}
	else
	{
		response.send("The location was successfully deleted")
	}

});

app.listen(3000, function () {
  console.log('NavUP listening on port 3000!')
})