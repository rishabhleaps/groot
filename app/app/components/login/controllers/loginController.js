'use strict';

angular.module('groot.controllers')
  .controller('loginController', ['$scope', '$state', '$stateParams','localStorageService',
    function($scope, $state, $stateParams,localStorageService) {
      function init() {
        $scope.employee = {};
        googleButton();
      }

      function googleButton() {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'longtitle': true,
          'width':265,
          'onsuccess': onSignIn,
          'onfailure': onFailure,
          'display': 'inline-block',
          'color': '#444'
        });
      }

      function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        localStorageService.set('id', profile.getId());
        localStorageService.set('name',profile.getName());
        localStorageService.set('image',profile.getImageUrl());
        localStorageService.set('email',profile.getEmail());
        $state.go('leave');
      }

      function onFailure(error) {
        console.log(error);
      }

      init();
    }
  ]);
