angular.module('navUP').controller('poiController',
    ['$scope', '$location', '$routeParams',
        function ($scope, $location, $routeParams)
        {
            var status = $routeParams.status;
            $scope.locationSaved = false;
            $scope.locationReceived = false;
            $scope.searchedLocations = false;
            $scope.items = ['Musaion Statue', 'Aula Grass Statue', 'Sci-Enza Statue', 'Natural Sciences Statue'];

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
                $scope.searchedLocations = true;

                function hasTerm(itemText) {
                    if (itemText.indexOf($scope.locationString) >= 0) {
                        return true;
                    }
                }

                $scope.searchedItems = $scope.items.filter(hasTerm);


                //$location.path("/searchLocation" + $scope.locationString);
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
                $scope.addLocation = function()
                {
                    $scope.items.push($scope.addLocationString);
                    //$location.path("/addLocation" + locationString);
                }

                $scope.modifyLocation = function()
                {
                    $location.path("/modifyLocation" + locationString);
                }

                $scope.removeLocation = function()
                {
                    $location.path("/removeLocation" + locationString);
                }
            }
        }]);