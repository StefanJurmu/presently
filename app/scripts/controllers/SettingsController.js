'use strict';

app.controller('SettingsController', function($scope, $http, $modal) {
	$scope.open = function (size) {
		var modalInstance = $modal.open({
			templateUrl: 'views/settings.html',
			controller: ModalInstanceCtrl
		});
  	};
});

var ModalInstanceCtrl = function ($scope, $modalInstance, UserService, LocationService) {
	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
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
	}
};