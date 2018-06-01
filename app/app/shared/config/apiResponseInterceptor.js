angular.module('groot.services')
  .factory('apiResponseInterceptor', ['$q', 'growl', 'serverValidator', function ($q, growl, serverValidator) {
    return {
      responseError: function (rejection) {
        if (rejection.status === 422) {
          var response = rejection.data;
          if (response.status === 'fail') {
            serverValidator.validator.triggerValidator(response.data);
          }
        } else {
          growl.error('Failed with ' + rejection.status + ' status');
        }

        return $q.reject(rejection);
      }
    }
  }]);
