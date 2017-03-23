var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var GISObjectArray = [
						{name:"IT Building", id:1, coordinates:"1,1"}, 
						{name:"Humanities", id:2, coordinates:"2,2"}, 
						{name:"Centenery", id:3, coordinates:"3,3"}, 
						{name:"Chancellors Building", id:4, coordinates:"4,4"},
						{name:"Aula", id:5, coordinates:"5,5"},
						{name:"Engineering 3", id:6, coordinates:"6,6"},
						{name:"Sci-Enza", id:7, coordinates:"7,7"},
						{name:"Bio-Informatics", id:8, coordinates:"8,8"},
						{name:"Postgraduate Center", id:9, coordinates:"9,9"},
						{name:"Student Center", id:10, coordinates:"10,10"}
					];

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
    app.use(express.static(__dirname));
});


app.get('/findGISObject', function(request, response){
	response.json(GISObjectArray);
});

app.get('/findCurrentCoordinates', function(request, response){
	response.json(GISObjectArray[1].coordinates);
});

app.post("/editGISObject", function(request, response){
	var GISObject = request.body;
	console.log(GISObject);
	var edit = false;
	for(var key in GISObjectArray){
		if(GISObjectArray[key].id == GISObject.id){
			GISObjectArray[key] = GISObject;
			edit = true;
		}
	}
	if(edit == false){
		response.send("GIS Object edit failed!");
	}
	else{
		response.send("GIS Object has been edited");
	}

});

app.post("/addGISObject", function(request, response){
	var GISObject = new Object();
	try{
		GISObject.name = request.body.name;
		GISObject.id = GISObjectArray[GISObjectArray.length - 1].id + 1;
		GISObjectArray.push(GISObject);
		response.send("The GIS Object has been added successfully");
	}
	catch(error){
		response.send("The GIS Object could not be added");
	}
});

app.post("/deleteGISObject", function(request, response){
	var deleted = false;
	var id = request.body.id;
	console.log(id);
	for(var key in GISObjectArray){
		if(GISObjectArray[key].id == id){
			GISObjectArray.splice(key, 1);
			deleted = true;
		}
	}
	if(deleted == false){
		response.send("The GIS Object could not be deleted");
	}
	else{
		response.send("The GIS Object was successfully deleted")
	}

});

var port = process.argv[process.argv.length - 1];

app.listen(port, function () {
  console.log('NavUP listening on port ' + port);
});