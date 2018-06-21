'use strict';

angular.module('groot.controllers')
  .controller('projectsController', ['$scope', '$state', '$stateParams','growl','projectsService','localStorageService',
    function($scope, $state, $stateParams,growl,projectsService,localStorageService) {
      function init() {
        $scope.projects=[];
        getAllProjects();
      }

      function getAllProjects(){
        projectsService
        .getAllProjects()
        .then(function(response) {
          $scope.projects = response.data;
          localStorageService.set('projects',$scope.projects);
        })
        .catch(function(err){
          growl.error(err);
        });
      }

      init();
    }
  ]);
