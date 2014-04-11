'use strict';

app.provider('LocationService', function() {

  this.getAdressUrl = function(lat, lng) {
    return "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + lng + '&sensor=false';
  }

  this.$get = function($q, $http) {
    var self = this;
    return {
      getLocationDetails: function(val) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: val,
            sensor: false
          }
        }).then(function(res){
          var addresses = [];
          angular.forEach(res.data.results, function(item){
            addresses.push(item.formatted_address);
          });
          return addresses;
        });
      },
      getAdressDetails: function(lat, lng) {
        var d = $q.defer();
        $http({
          method: 'GET',
          url: self.getAdressUrl(lat, lng)
        }).success(function(data) {
          if(data.results.length != 0) {
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
          } else {
            d.reject(data.status);
          }

        }).error(function(err) {
          d.reject(err);
        });
        return d.promise;
      },
      getGeometryDetails: function(val) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: val.name,
            sensor: false
          }
        }).then(function(res){
          var details = {};
          var result = res.data.results[0];
          details.lat = result.geometry.location.lat;
          details.lng = result.geometry.location.lng;
          return details;
        });
      },
    }
  };
});
