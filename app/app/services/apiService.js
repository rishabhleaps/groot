'use strict';

angular.module('groot.services')
  .factory('apiService', ['$resource', 'Settings', function($resource,
      Settings) {
      var userResourceUrl = Settings.api.baseUrl + Settings.api.user;
      var User = $resource(userResourceUrl, {
        id: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });

      return {
        User: User
      };
    }

  ]);
