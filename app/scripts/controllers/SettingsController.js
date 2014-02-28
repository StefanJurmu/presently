'use strict';

app.controller('SettingsController', function($scope, UserService, LocationService) {
	$scope.user = UserService.user;

	$scope.save = function() {
		UserService.save();
	}
	$scope.setCurrentLocation = function(city) {
		$scope.user.location.city = city.formatted_address;
		$scope.user.location.lat = city.geometry.location.lat;
		$scope.user.location.lng = city.geometry.location.lng;
	}
	$scope.fetchCities = LocationService.getLocationDetails;

	$scope.resetStorage = function() {
		UserService.reset();
	}
});