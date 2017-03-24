var navUP = angular.module('navUP', ['ngRoute']);

navUP.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)
{
    $routeProvider
    .when("/", 
    {
        templateUrl : "login.html",
        controller: "authenticateController"
    })
    .when("/register",
    {
    	templateUrl: "register.html",
    	controller: "authenticateController"
    })
    .when("/home:status",
    {
    	templateUrl: "home.html",
    	controller: "homeController"
    })
    .when("/manageLocations:status",
    {
        templateUrl: "manage-locations.html",
        controller: "manageLocationsController"
    })
    .otherwise(
    {
        redirectTo: '/'
    });

}]);