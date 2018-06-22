'use strict';

angular.module('groot.controllers')
  .controller('projectDetailController', ['$scope', '$state', '$stateParams', 'localStorageService', 'projectDetailService',
    function($scope, $state, $stateParams, localStorageService, projectDetailService) {
      function init() {
        $scope.projectId = $stateParams.id;
        $scope.projectDetail = [];
        $scope.project = {};
        getDetailOfProject($scope.projectId);
      }

      function getDetailOfProject(projectId) {
        // var projects = localStorageService.get('projects');
        // for (var i = 0; i < projects.length; i++) {
        //   if (projects[i].id === projectId) {
        //     $scope.projectDetail= projects[i];
        //   }
        // }
        // console.log($scope.projectDetail);
        projectDetailService
          .getDetail(projectId)
          .then(function(response) {
            $scope.projectDetail = response.data;
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      $scope.submitForm = function() {
        $scope.project.project = $scope.projectId;
        projectDetailService
          .editProjectStatus($scope.project)
          .then(function(response) {

          })
          .catch(function(err) {
            console.log(err);
          });
      }

      $scope.setAccountStatus = function(code) {
        $scope.project.accountStatus = code;
      }

      $scope.setProjectStatus = function(code) {
        $scope.project.projectStatus = code;
      }

      init();
    }
  ]);
