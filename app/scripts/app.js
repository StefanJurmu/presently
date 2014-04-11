'use strict';

var app = angular.module('presentlyApp', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController',
      resolve: {
        user: function(UserService) {
          return UserService.restore();
        }
      }
    })
    .when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});