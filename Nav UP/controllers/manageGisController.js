angular.module('navUP').controller('manageGisController', 
['$scope', '$http', '$routeParams', '$location',function ($scope, $http, $routeParams, $location){
	var status = $routeParams.status;

	if(status === "guest"){
		$scope.navigate = true;
	}

	if(status === "user" || status === "admin"){
		$scope.profile = true;
		$scope.poi = true;
		$scope.events = true;
	}

	if(status === "admin"){
		$scope.manageGis = true;
		$scope.manageUsers = true;
		$scope.manageLocations = true;
		$scope.manageEvents = true;
	}
	$scope.findGISObject = true;

	$http.get("/findGisObject").then(function(response)
	{
		if(response.status == 200)
		{
			$scope.GISObjects = response.data;
		}
		else
		{
			console.log("Error Occurred");
		}
	});
	$http.get("/findCurrentCoordinates").then(function(response)
	{
		if(response.status == 200)
		{
			$scope.GISObject.coordinates = response.data;
		}
		else
		{
			console.log("Error Occurred");
		}
	});

	$scope.addGISObject = function()
	{
		$scope.findGISObject = false;
		$scope.AddGISObject = true;
	}

	$scope.saveGISObject = function()
	{
		$http.post("/addGISObject",
		{
			name: $scope.name
			coordinates: $scope.coordinates
		})
		.then(function(response)
		{
			alert(response.data);

			$http.get("/findGISObject").then(function(response)
			{
				$scope.GISObjects = response.data;
			});

			$scope.addGISObject = false;
			$scope.findGISObject = true;
		});
	}

	$scope.back = function()
	{
		$scope.findGISObject = true;
		$scope.EditGISObject = false;
		$scope.AddGISObject = false;
		$scope.prompt = false;
	}

	$scope.EditGISObject = function(id)
	{
		$scope.findGISObject = false;
		$scope.EditGISObject = true;

		for(var key in $scope.GISObjects)
		{
			if($scope.EditGISObject[key].id == id)
			{
				$scope.GISObjectID = $scope.GISObjects[key].id;
				$scope.GISObjectName = $scope.GISObjects[key].name;
				$scope.GISObjectCoordinates = $scope.GISObjects[key].coordinates;
			}
		}
	}

	$scope.saveEditLocation = function()
	{
		var id = $scope.GISObjectID;				
		var name = $scope.GISObjectName;
		var coordinates = $scope.GISObjectCoordinates;

		$http.post("/editGISObject",
		{
			id:id, name:name, coordinates:coordinates 
		})
		.then(function(response)
		{
			alert(response.data);

			$http.get("/findGISObject").then(function(response)
			{
				if(response.status == 200)
				{
					$scope.GISObjects = response.data;
				}
				else
				{
					console.log("Error Occurred");
				}
			});
			
			$scope.EditLocation = false;
			$scope.ViewLocations = true;
		});
	}

	$scope.toDelete;

	$scope.deleteGISObjectPrompt = function(id)
	{
		$scope.deletThis = id;

		$scope.deleteGISBody = "Are you sure you want to delete this location?"
		$scope.findGISObject = false;
		$scope.GISDeletePrompt = true;
	}

	$scope.deleteGISObject = function()
	{
		$http.post("/deleteGISObject",
		{
			id: $scope.deletThis
		})
		.then(function(response)
		{
			alert(response.data);

			$http.get("/findGISObject").then(function(response)
			{
				$scope.GISObjects = response.data;
			});

			$scope.prompt = false;
			$scope.findGISObject = true;
		});
	}


} 
