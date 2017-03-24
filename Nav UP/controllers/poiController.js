angular.module('navUP').controller('poiController',
    ['$scope', '$location', '$routeParams',
        function ($scope, $location, $routeParams)
        {
            var status = $routeParams.status;
            $scope.locationSaved = false;
            $scope.locationReceived = false;

            $scope.poiSection = function () {
                $location.path("/poiSection"+status);
            }

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

            $scope.searchLocation = function()
            {
                $location.path("/searchLocation" + $scope.locationString);
            }

            $scope.saveLocation = function()
            {
                $scope.locationSaved = true;
                //$location.path("/saveLocation");
            }

            $scope.getCurrentDeviceLocation = function()
            {
                $scope.locationReceived = true;
                $scope.locationReceivedString = "IT 4-66, University of Pretoria"
                //$location.path("/getCurrentDeviceLocation");
            }

            if(status === "admin")
            {
                $scope.addLocation = function(locationString)
                {
                    $location.path("/addLocation" + locationString);
                }

                $scope.modifyLocation = function(locationString)
                {
                    $location.path("/modifyLocation" + locationString);
                }

                $scope.removeLocation = function(locationString)
                {
                    $location.path("/removeLocation" + locationString);
                }
            }
        }]);