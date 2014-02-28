'use strict';

app.controller('MainController', function ($scope, $timeout, WeatherService, LocationService, user) {
  $scope.date = {};
  $scope.user = user;

  if(!$scope.user.location.city) {
    LocationService.getAdressDetatails($scope.user.location.lat, $scope.user.location.lng)
      .then(function(response) {
        $scope.user.location.city = response;
      })
  }

  var updateTime = function() {
    $scope.date = new Date();
  	$timeout(updateTime, 1000); 
  }

  $scope.weather = {}
  WeatherService.getWeatherForecast($scope.user.location)
  	.then(function(data) {
  		$scope.weather.forecast = data;
  	})

  updateTime();
});
