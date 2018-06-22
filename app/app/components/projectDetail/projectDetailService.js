angular.module('groot.services')
  .factory('projectDetailService', ['$q', '$http', 'Settings',
    function($q, $http, Settings) {

      function getDetail(projectId) {
        return $http({
          method: 'GET',
          url: 'http://13.127.222.131:1337/projects/' + projectId
        });
      }

      function editProjectStatus(project) {
        return $http({
          method: 'POST',
          url: 'http://13.127.222.131:1337/status',
          data: project
        });
      }

      return {
        getDetail: getDetail,
        editProjectStatus: editProjectStatus
      };
    }
  ]);
