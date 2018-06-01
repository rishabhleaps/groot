angular
  .module('groot.controllers')
  .controller('navbarController', ['$scope', '$state', '$stateParams', 'localStorageService',
    function($scope, $state, $stateParams, localStorageService) {

      function init(){
        $scope.isLoggedIn = localStorageService.get('id');
      }
      
      init();
    }
  ]);
