angular.module('groot.services')
  .factory('historyService', ['$q', '$http', 'Settings',
    function($q, $http, Settings) {

      function getHistoryForProject(projectId) {
        // return $http({
        //   method: 'GET',
        //   url: 'http://13.126.208.107:1337/projects/groot:pid:5d2b42ca-39db-4698-883e-93341b3afef9/status'
        // });
        return $http.get('app/shared/data/history.json');
      }

      return {
        getHistoryForProject: getHistoryForProject
      };
    }
  ]);
