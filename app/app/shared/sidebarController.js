angular
  .module('groot.controllers')
  .controller('sidebarController', ['$scope', '$state', '$stateParams', 'localStorageService',
    function($scope, $state, $stateParams, localStorageService) {

      function init() {
        $scope.employee = {
          imgUrl: localStorageService.get('image'),
          name: localStorageService.get('name')
        };
      }

      $scope.signOut = function(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        localStorage.clear();
        $state.go('login');
      }

      init();
    }
  ]);
