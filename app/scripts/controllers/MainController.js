'use strict';

app.controller('MainController', function ($scope, $timeout, WeatherService, LocationService, user) {
  $scope.date = {};
  $scope.user = user;
  console.log($scope.user);

  var updateTime = function() {
    $scope.date = new Date();
    $timeout(updateTime, 1000);
  }


    LocationService.getAdressDetails($scope.user.location.lat, $scope.user.location.lng)
      .then(function(response) {
        $scope.user.location.name = response;
      })


  $scope.weather = {}
  WeatherService.getWeatherForecast($scope.user.location)
  	.then(function(data) {
  		$scope.weather.forecast = data;
  	})

  updateTime();
});
