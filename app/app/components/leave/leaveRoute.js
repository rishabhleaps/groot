'use strict';

angular.module('groot.controllers')
  .config(function($stateProvider) {
    $stateProvider
      .state('leave', {
        url: '/leave',
        templateUrl: 'app/components/leave/views/leave.html',
        controller: 'leaveController'
      });
  });
