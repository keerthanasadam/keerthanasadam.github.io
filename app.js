
//MODULE
var weatherApp=angular.module('weatherApp',['ngRoute','ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){
    
    $routeProvider
    
    .when('/',{
        
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    
    .when('/forecast',{
        templateUrl:'pages/forecast.html',
        controller:'forecastController'     
    })
    
});

weatherApp.service('weatherService',function(){
    
    this.city = 'NewYork';
});

//CONTROLLERS
weatherApp.controller('homeController',['$scope','weatherService',function($scope, weatherService){
    
        $scope.city=weatherService.city;
    
        console.log($scope);
        $scope.$watch('city',function(){
            weatherService.city=$scope.city;
        });
    
    
}]);

weatherApp.controller('forecastController',['$scope','$resource','weatherService',function($scope,$resource,weatherService){
     $scope.city=weatherService.city;
    
        $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=a6206efeeaae2ce2ffc6ca4a28dc0ad8",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
    
    $scope.weatherResult=$scope.weatherAPI.get({q: $scope.city, cnt: 2});
    
    $scope.convertToFahrenheit= function(degk){
        
        return Math.round((1.8 * (degk-273)) + 32);
    }
    
    $scope.convertToDate=function(date){
        
        return new Date(date*1000);
    }
    
}]);

