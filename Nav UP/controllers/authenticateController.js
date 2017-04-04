angular.module('navUP').controller('authenticateController', 
['$scope', '$location', '$http',
function ($scope, $location, $http) 
{
	$scope.register = function()
	{
		$location.path("/register");
	}

	$scope.login = function(status)
	{
		if(status == "guest")
		{
			$location.path("/home" + 0 + "," + status); //guest login
		}
		else
		{
			$http.post("/login",
			{
				username: $scope.username, password: $scope.password
			})
			.then(function(response)
			{
				if(response.status == 200)
				{
					if(response.data == "login failed")
					{
						alert("The login details are incorrect");
					}
					else
					{
						var user = response.data.split("-");

						$location.path("/home" + user); //user login
					}
				}
			});
		}	
	}

	$scope.registerUser = function()
	{
		var user = new Object();
		user.id = null;
		user.firstname = $scope.firstname;
		user.surname = $scope.surname;
		user.email = $scope.email;
		user.username = $scope.username;
		user.status = "user";
		if($scope.password != $scope.confirmPassword)
		{
			alert("The password and confirmed password do not match");
		}
		else
		{
			user.password = $scope.password;
		}

		$http.post("/registerUser",
		{
			user:user
		})
		.then(function(response)
		{
			if(response.status == 200)
			{
				if(response.data == "registered")
				{
					alert("You have been successfully registered! You may now log in");
					$location.path("/");
				}
				else if(response.data == "email")
				{
					alert("A user with this email address already exists!");
				}
			}
			
		})
	}

}]);