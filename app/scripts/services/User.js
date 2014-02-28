'use strict';

app.factory('UserService', function($q) {
	var service = {
		user: {
			location: {}
		},
		save: function() {
			chrome.storage.sync.set({'user': service.user}, function(){});
		},
		restore: function() {
			var self = this;
			var d = $q.defer();
			chrome.storage.sync.get('user', function(data){
				if(data && _.size(data) > 0) {
					service.user = data.user;
					d.resolve(service.user);
					self.save();
				} else {
					navigator.geolocation.getCurrentPosition(function(response) {
						service.user.location.lat = response.coords.latitude;
						service.user.location.lng = response.coords.longitude;
						d.resolve(service.user);
						self.save();
					}, function(error) {
					    d.reject(error.code);
					});
				}
			})
			return d.promise;
		},
		reset: function() {
			chrome.storage.sync.clear(function(){
				console.log('Storage cleared');
			});
		}
	};
	return service;
})