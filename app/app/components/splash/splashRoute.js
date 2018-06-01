'use strict';

angular.module('groot.controllers')
  .config(function($stateProvider) {
    $stateProvider
      .state('splash', {
        url: '/splash',
        templateUrl: 'app/components/splash/views/splash.html',
        controller: 'splashController'
      });
  });
