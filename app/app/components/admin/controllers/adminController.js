'use strict';

angular.module('groot.controllers')
  .controller('adminController', ['$scope', '$state', '$stateParams','growl','localStorageService',
    function($scope, $state, $stateParams,growl,localStorageService) {
      function init() {
        $scope.project = {};
      }

      $scope.login = function(){
        if ($scope.user.email === 'admin@gmail.com' && $scope.user.password === 'admin'){
          $state.go('projects');
          localStorageService.set('name','Admin');
        }else{
          growl.error('Not so groot of us. Try Again!!!');
        }
      }

      init();
    }
  ]);
