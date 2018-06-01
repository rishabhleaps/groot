'use strict';

angular.module('groot.controllers')
  .controller('leaveController', ['$scope',
    function($scope) {
      function init() {
        $scope.employee = {};
        onLoad();
      }

      function onLoad(){
        gapi.load('auth2', function() {
          gapi.auth2.init();
        });
      }

      init();
    }
  ]);
