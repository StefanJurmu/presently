'use strict';

app.controller('SettingsController', function($scope, $http, UserService, LocationService) {
	$scope.asyncSelected = UserService.user;
	$scope.fetchCities = LocationService;
	$scope.save = function() {
		$scope.fetchCities.getGeometryDetails($scope.asyncSelected.location).then(function(details) {
			$scope.asyncSelected.location.lat = details.lat;
			$scope.asyncSelected.location.lng = details.lng;
			UserService.save();
		});
	}

	$scope.resetStorage = function() {
		UserService.reset();
		$scope.asyncSelected = {};
	}

	$scope.selected = undefined;

});
