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
    .when("/navigate",
    {
        templateUrl: "navigate.html",
        controller: "homeController"
    })
    .when("/home:status",
    {
        templateUrl: "home.html",
        controller: "homeController"
    })
    .when("/manageGIS:status",
    {
        templateUrl: "manageGIS.html",
        controller: "manageGisController"
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
