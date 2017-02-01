'use strict';

/**
 * @ngdoc overview
 * @name csvRowsApp
 * @description
 * # csvRowsApp
 *
 * Main module of the application.
 */
angular
  .module('csvRowsApp', [
    'ngCookies',
    'ngRoute',
    'ngTouch',
    'ngCsv'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
