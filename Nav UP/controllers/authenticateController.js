angular.module('navUP').controller('authenticateController', 
['$scope', '$location', '$http',
function ($scope, $location, $http) 
{
    $scope.loginSnError = false;
    $scope.loginPassError = false;

	$scope.register = function()
	{
		$location.path("/register");
	}

	$scope.login = function(status)
	{
        $scope.loginSnError = false;
        $scope.loginPassError = false;

		if(status == "guest")
		{
			$location.path("/home" + 0 + "," + status); //guest login
		}
		else
		{
			if ($scope.stud_num == null) {
                $scope.loginSnError = true;

			}

            if ($scope.password == null) {
                $scope.loginPassError = true;

            }

			$http.post("/login",
			{
				stud_num: $scope.stud_num, password: $scope.password
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
		user.fname = $scope.fname;
		user.sname = $scope.sname;
		user.stud_num = $scope.stud_num;
		user.email = $scope.email;	
		user.phone = $scope.phone;
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
				alert("You have been successfully registered! You may now log in");
				$location.path("/");
			}
			
		})
	}

}]);