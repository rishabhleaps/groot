'use strict';

angular.module('groot.controllers')
  .controller('projectsController', ['$scope', '$state', '$stateParams','growl','projectsService',
    function($scope, $state, $stateParams,growl,projectsService) {
      function init() {
        $scope.projects=[];
        getAllProjects();
      }

      function getAllProjects(){
        projectsService
        .getAllProjects()
        .then(function(response) {
          $scope.projects = response.data;
          console.log($scope.projects);
        })
        .catch(function(err){
          growl.error(err);
        });
      }

      init();
    }
  ]);
