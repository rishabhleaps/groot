'use strict';

angular.module('groot.controllers')
  .controller('projectsController', ['$scope', '$state', '$stateParams','growl','projectsService','localStorageService',
    function($scope, $state, $stateParams,growl,projectsService,localStorageService) {
      function init() {
        $scope.projects=[];
        $scope.filter = {};
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

      $scope.applyFilter = function(){
        var projects = $scope.projects;
        for (var i = 0; i < projects.length; i++) {
          if (projects[i].name === $scope.filter.customerName) {
            $scope.projects=[];
            $scope.projects= projects[i];
          }
        }
        angular.element(document.querySelector('#filter')).modal('hide');
      }



      init();
    }
  ]);
