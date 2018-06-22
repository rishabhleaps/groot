'use strict';

angular.module('groot.controllers')
  .controller('projectDetailController', ['$scope', '$state', '$stateParams', 'localStorageService', 'projectDetailService',
    function($scope, $state, $stateParams, localStorageService, projectDetailService) {
      function init() {
        $scope.projectId = $stateParams.id;
        $scope.projectDetail = [];
        $scope.project = {};
        $scope.mailto='';
        getDetailOfProject($scope.projectId);
      }

      function getDetailOfProject(projectId) {
        var projects = localStorageService.get('projects');
        for (var i = 0; i < projects.length; i++) {
          if (projects[i].id === projectId) {
            $scope.projectDetail = projects[i];
          }
        }
        console.log($scope.projectDetail);
        for(var i=0;i<$scope.projectDetail.racis.length;i++){
          $scope.mailto += $scope.projectDetail.racis[i].email + ',';
        }
        $scope.mailto = $scope.mailto.slice(0,-1);
        $scope.project.headline = $scope.projectDetail.status[0].headline;
      }

      $scope.submitForm = function() {
        $scope.project.project = $scope.projectId;
        projectDetailService
          .editProjectStatus($scope.project)
          .then(function(response) {
            angular.element(document.querySelector('#editProject')).modal('hide');
            $state.go('projects');
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      $scope.setAccountStatus = function(code) {
        $scope.project.accountStatus = code;
        switch (code) {
          case 'R':
            $('#accountRed').removeClass('half-opacity');
            $('#accountYellow').removeClass('full-opacity');
            $('#accountGreen').removeClass('full-opacity');

            $('#accountRed').addClass('full-opacity');
            $('#accountYellow').addClass('half-opacity');
            $('#accountGreen').addClass('half-opacity');
            break;
          case 'Y':
            $('#accountRed').removeClass('full-opacity');
            $('#accountYellow').removeClass('half-opacity');
            $('#accountGreen').removeClass('full-opacity');

            $('#accountRed').addClass('half-opacity');
            $('#accountYellow').addClass('full-opacity');
            $('#accountGreen').addClass('half-opacity');
            break;
          case 'G':

            $('#accountRed').removeClass('full-opacity');
            $('#accountYellow').removeClass('full-opacity');
            $('#accountGreen').removeClass('half-opacity');

            $('#accountRed').addClass('half-opacity');
            $('#accountYellow').addClass('half-opacity');
            $('#accountGreen').addClass('full-opacity');
            break;
        }
      }

      $scope.setProjectStatus = function(code) {
        $scope.project.projectStatus = code;
        switch (code) {
          case 'R':
            $('#proRed').removeClass('half-opacity');
            $('#proYellow').removeClass('full-opacity');
            $('#proGreen').removeClass('full-opacity');

            $('#proRed').addClass('full-opacity');
            $('#proYellow').addClass('half-opacity');
            $('#proGreen').addClass('half-opacity');
            break;
          case 'Y':
            $('#proRed').removeClass('full-opacity');
            $('#proYellow').removeClass('half-opacity');
            $('#proGreen').removeClass('full-opacity');

            $('#proRed').addClass('half-opacity');
            $('#proYellow').addClass('full-opacity');
            $('#proGreen').addClass('half-opacity');
            break;
          case 'G':

            $('#proRed').removeClass('full-opacity');
            $('#proYellow').removeClass('full-opacity');
            $('#proGreen').removeClass('half-opacity');

            $('#proRed').addClass('half-opacity');
            $('#proYellow').addClass('half-opacity');
            $('#proGreen').addClass('full-opacity');
            break;
        }
      }

      init();
    }
  ]);
