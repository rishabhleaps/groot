angular.module('groot.services')
  .factory('historyService', ['$q', '$http', 'Settings',
    function($q, $http, Settings) {

      function getHistoryForProject(projectId) {
        // return $http({
        //   method: 'GET',
        //   url: '/history'+projectId
        // });
        return $http.get('app/shared/data/history.json');
      }

      return {
        getHistoryForProject: getHistoryForProject
      };
    }
  ]);
