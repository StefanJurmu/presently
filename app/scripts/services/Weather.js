'use strict';

app.provider('WeatherService', function() {
  var apiKey = "";

  this.setApiKey = function(key) {
    if(key) {
      this.apiKey = key;
    }
  };

  this.getForecastUrl = function(type, lat, lng) {
    return "http://api.wunderground.com/api/" + this.apiKey + "/" + type + "/q/" + lat + ',' + lng + ".json";
  };

  this.$get = function($q, $http) {
    var self = this;
    return {
      getWeatherForecast: function(city) {
        var d = $q.defer();
        $http({
          method: 'GET',
          url: self.getForecastUrl("forecast", city.lat, city.lng)
        }).success(function(data) {
          if(data.forecast) {
            d.resolve(data.forecast.simpleforecast);
          } else if (data.response.error) {
            d.reject(data.response.error.description)
          }
        }).error(function(err) {
          d.reject(err);
        });
        return d.promise;
      }
    }
  };
})
.config(function(WeatherServiceProvider) {
  WeatherServiceProvider.setApiKey('ca5ec7401b074680');
})
