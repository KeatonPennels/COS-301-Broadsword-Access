angular.module('navUP').controller('authenticateController', 
['$scope', '$location',
function ($scope, $location) 
{
	$scope.register = function()
	{
		$location.path("/register");
	}

	$scope.login = function(status)
	{
		$location.path("/home" + status);
	}

}]);