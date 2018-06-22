'use strict';

angular.module('groot.controllers')
  .controller('historyController', ['$scope', '$state', '$stateParams', 'historyService',
    function($scope, $state, $stateParams, historyService) {
      function init() {
        $scope.history=[];
        var projectId = $stateParams.id;
        getHistoryForProject(projectId);
      }

      function getHistoryForProject(projectId) {
        historyService
          .getHistoryForProject(projectId)
          .then(function(response) {
            $scope.history = response.data;
            console.log($scope.history);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
      init();
    }
  ]);
