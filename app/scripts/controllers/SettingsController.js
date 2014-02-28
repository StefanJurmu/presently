'use strict';

app.controller('SettingsController', function($scope, UserService, LocationService) {
	$scope.user = UserService.user;

	$scope.save = function() {
		UserService.save();
	}
	$scope.setCurrentLocation = function(currentLocation) {
		$scope.user.location.city = currentLocation.formatted_address;
		$scope.user.location.lat = currentLocation.geometry.location.lat;
		$scope.user.location.lng = currentLocation.geometry.location.lng;
	}
	$scope.fetchCities = LocationService.getLocationDetails;

	$scope.resetStorage = function() {
		UserService.reset();
	}
});