'use strict';

angular.module('groot.controllers')
  .config(function($stateProvider) {
    $stateProvider
      .state('projectDetail', {
        url: '/projectDetail/:id',
        templateUrl: 'app/components/projectDetail/views/projectDetail.html',
        controller: 'projectDetailController'
      });
  });
