'use strict';

angular.module('groot.controllers')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/components/admin/views/admin.html',
        controller: 'adminController'
      });
  });
