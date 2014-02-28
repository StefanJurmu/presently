'use strict';

app.provider('LocationService', function() {

  this.getLocationUrl = function(query) {
    return "https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&sensor=false";
  };

  this.getAdressUrl = function(lat, lng) {
    return "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + lng + '&sensor=false';
  }

  this.$get = function($q, $http) {
    var self = this;
    return {
      getLocationDetails: function(query) {
        var d = $q.defer();
        $http({
          method: 'GET',
          cache: true,
          url: self.getLocationUrl(query)
        }).success(function(data) {
          d.resolve(data.results);
        }).error(function(err) {
          d.reject(err);
        });
        return d.promise;
      },
      getAdressDetatails: function(lat, lng) {
        var d = $q.defer();
        $http({
          method: 'GET',
          url: self.getAdressUrl(lat, lng)
        }).success(function(data) {
          var result = data.results[0].address_components;
          var info = [];
          for(var i = 0; i < result.length; ++i) {
            if(result[i].types[0]=="country"){
              info.push(result[i].long_name)
            }
            if(result[i].types[0]=="locality"){
              info.unshift(result[i].long_name)
            }
          }
          var location = info.join(', ');
          d.resolve(location);
        }).error(function(err) {
          d.reject(err);
        });
        return d.promise;
      }
    }
  };
});