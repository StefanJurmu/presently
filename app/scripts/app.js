'use strict';

var app = angular.module('presentlyApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

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
    .otherwise({
      redirectTo: '/'
    });
});