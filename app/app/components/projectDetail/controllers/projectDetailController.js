'use strict';

angular.module('groot.controllers')
  .controller('projectDetailController', ['$scope', '$state', '$stateParams', 'localStorageService',
    function($scope, $state, $stateParams, localStorageService) {
      function init() {
        $scope.projectStatus = {};
        $scope.accountStatus = {};
      }

      init();
    }
  ]);
