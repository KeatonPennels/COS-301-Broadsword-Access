angular.module('navUP').controller('homeController', 
['$scope', '$location', '$routeParams',
function ($scope, $location, $routeParams) 
{
	var status = $routeParams.status;

	if(status === "guest")
	{
		$scope.navigate = true;
	}
	
	if(status === "user" || status === "admin")
	{
		$scope.profile = true;
		$scope.poi = true;
		$scope.events = true;
	}

	if(status === "admin")
	{
		$scope.manageGis = true;
		$scope.manageUsers = true;
		$scope.manageLocations = true;
		$scope.manageEvents = true;
	}
}]);