'use strict';

angular.module('groot.controllers')
  .config(function($stateProvider) {
    $stateProvider
      .state('history', {
        url: '/history/:id',
        templateUrl: 'app/components/history/views/history.html',
        controller: 'historyController'
      });
  });
