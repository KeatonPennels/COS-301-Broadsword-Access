angular.module('navUP').controller('profileController', 
['$scope', '$location', '$routeParams', "$http",
function ($scope, $location, $routeParams, $http) 
{
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

    $http.post("profile",
    {
        id:id
    })
    .then(function(response)
    {
        if(response.status == 200)
        {
            if(response.data == "user not found")
            {
                alert("The profile could not be retreived!");
            }
            else
            {
                var user = response.data;

                $scope.firstname = user.firstname;
                $scope.surname = user.surname;
                $scope.email = user.email;
                $scope.username = user.username;
                $scope.password = user.password;
            }
        }
    });

    function saveUser() {

        UserService.Update(vm.user)
            .then(function () {
                FlashService.Success('User updated');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
    }

    function deleteUser() {
        UserService.Delete(vm.user._id)
            .then(function () {
                // log user out
                $window.location = '/login';
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
    }
}]);