'use strict';

angular.module('groot.controllers')
  .controller('projectDetailController', ['$scope', '$state', '$stateParams', 'localStorageService',
    function($scope, $state, $stateParams, localStorageService) {
      function init() {
        var projectId = $stateParams.id;
        $scope.projectDetail=[];
        $scope.project = {};
        getDetailOfProject(projectId);
      }

      function getDetailOfProject(projectId) {
        var projects = localStorageService.get('projects');
        for (var i = 0; i < projects.length; i++) {
          if (projects[i].id === projectId) {
            $scope.projectDetail= projects[i];
          }
        }
        console.log($scope.projectDetail);
      }

      $scope.submitForm = function(){
        console.log($scope.project);
      }

      init();
    }
  ]);
