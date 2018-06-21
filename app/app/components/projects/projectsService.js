angular.module('groot.services')
  .factory('projectsService', ['$q', '$http', 'Settings',
    function($q, $http, Settings) {

      function getAllProjects() {
        // return $http({
        //   method: 'GET',
        //   url: 'http://13.126.208.107:1337/projects'
        // });
        return $http.get('app/shared/data/projects.json');
      }

      return {
        getAllProjects: getAllProjects
      };
    }
  ]);
