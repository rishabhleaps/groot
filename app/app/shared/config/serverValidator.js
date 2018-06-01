angular.module('groot.services').factory('serverValidator', ['$rootScope',
  'valdrEvents', '$translate', 'Settings',
  function(
    $rootScope, valdrEvents, $translate, Settings) {
    var validator = function() {
      this.violations = [];

      this.triggerValidator = function(data) {
        console.log("data :: ", data);
        var errorMessages = [],
          i, len;
        for (var key in data) {
          errorMessages = [];
          this.violations[key] = '';
          len = data[key].length;
          for (i = 0; i < len; i += 1) {
            errorMessages.push(Settings.translate.errorPrefix + data[key][i].errorCode);
          }
          // @TODO - Need to fix the markup
          this.violations[key] = errorMessages.join(" | ");
        }

        $rootScope.$broadcast(valdrEvents.revalidate);
      };

      this.resetService = function(field) {
        delete this.violations[field];
      };

      this.isServerError = function(field) {
        if (angular.isDefined(this.violations[field])) {
          return true;
        }

        return false;
      };

      this.getErrorMessage = function(field) {
        return this.violations[field];
      };
    };

    var myValidator = new validator();

    return {
      name: 'serverValidator',
      validate: function(value, argumentsObj) {
        var field = argumentsObj.field;
        if (myValidator.isServerError(field) === true) {
          argumentsObj.message = myValidator.getErrorMessage(field);
          myValidator.resetService(field);
          return false;
        }

        return true;
      },
      validator: myValidator
    };
  }
]);
