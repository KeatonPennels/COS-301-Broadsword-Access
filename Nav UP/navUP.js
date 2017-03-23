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
    .when("/poiSection:status",
        {
            templateUrl: "poiSection.html",
            controller: "poiController"
        })
    .when("/home:status",
    {
    	templateUrl: "home.html",
    	controller: "homeController"
    })
    .otherwise(
    {
        redirectTo: '/'
    });

}]);