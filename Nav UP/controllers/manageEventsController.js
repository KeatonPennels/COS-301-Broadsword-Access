angular.module('navUP').controller('manageEventsController', 
['$scope', '$http', '$routeParams', '$location',function ($scope, $http, $routeParams, $location){

	var user = $routeParams.user.split(",");
	var id = user[0];
	var status = user[1];

	$scope.navigateNav = true;

    if(status == "user" || status == "admin")
    {
        $scope.profileNav = true;
        $scope.poiNav = true;
        $scope.eventsNav= true;
    }

    if(status == "admin")
    {
        $scope.manageGisNav = true;
        $scope.manageUsersNav = true;
        $scope.manageLocationsNav = true;
        $scope.manageEventsNav = true;
    }

    $scope.home = function()
    {
    	$location.path("/home" + user);
    }

	$scope.profile = function()
	{
		$location.path("/profile" + user);
	}

	$scope.navigate = function()
	{
		$location.path("/navigate" + user);
	}
	$scope.manageLocations = function()
	{
		$location.path("/manageLocations" + user);
	}

	$scope.poi = function()
	{
		$location.path("/poi" + user);
	}

	$scope.manageEvents = function()
	{
		$location.path("/manageEvents" + user);
	}

	$scope.manageGis = function()
	{
		$location.path("/manageGIS" + user);
	}

}]);