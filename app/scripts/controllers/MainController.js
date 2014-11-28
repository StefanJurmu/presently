'use strict';

app.controller('MainController', function ($scope, $timeout, WeatherService, LocationService, user, $http) {
  $scope.showLoader = true;
  $scope.date = {};
  $scope.user = user;
  $scope.errorMsg = '';
  $scope.weather = {}

  var updateTime = function() {
    $scope.date = new Date();
    $timeout(updateTime, 1000);
  }

  LocationService.getAdressDetails($scope.user.location.lat, $scope.user.location.lng)
    .then(function(response) {
      $scope.user.location.name = response;
    }), function(reason) {
      $scope.showLoader = false;
      $scope.errorMsg = 'Something went wrong! Please try again later...';
    };

  WeatherService.getWeatherForecast($scope.user.location)
  	.then(function(data) {
  		$scope.weather.forecast = data;
      $timeout(function hideLoader () {
        $scope.showLoader = false;
      }, 1000);
  	}, function(reason) {
      $scope.showLoader = false;
      $scope.errorMsg = 'Something went wrong! Please try again later...';
    });

  updateTime();
});
