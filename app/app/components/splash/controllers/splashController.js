'use strict';

angular.module('groot.controllers')
  .controller('splashController', ['$scope', '$state', '$stateParams', '$timeout', 'localStorageService',
    function($scope, $state, $stateParams, $timeout, localStorageService) {
      function init() {
        setInterval();
      }

      function setInterval() {
        // $('html,body').css('background-color', '#e0cba1 !important');
        $timeout(function() {
          $state.go('login')
        }, 2500);
      }
      init();
    }
  ]);
