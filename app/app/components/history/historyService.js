angular.module('groot.services')
  .factory('historyService', ['$q', '$http', 'Settings',
    function($q, $http, Settings) {

      function getHistoryForProject(projectId) {
        return $http({
          method: 'GET',
          url: 'http://13.127.222.131:1337/projects/'+projectId + '/status'
        });
      }

      return {
        getHistoryForProject: getHistoryForProject
      };
    }
  ]);
