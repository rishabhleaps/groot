'use strict';

angular.module('groot.controllers')
  .config(function($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/components/projects/views/landing-projects.html',
        controller: 'projectsController'
      });
  });
