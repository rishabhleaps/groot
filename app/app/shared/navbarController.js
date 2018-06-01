angular
  .module('groot.controllers')
  .controller('navbarController', ['$scope', '$state', '$stateParams', 'localStorageService',
    function($scope, $state, $stateParams, localStorageService) {

      function init() {
        var name = localStorageService.get('name');
        $scope.isLoggedIn = localStorageService.get('isLoggedIn');
        $scope.imageUrl='';
        getNameCanvas(name);
      }

      function getNameCanvas(name) {
        var first = name.split(" ")[0];
        var last = name.split(" ")[1];
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        canvas.width = '60';
        canvas.height = '60';
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        context.fillStyle = "#d3d3d3";
        context.globalAlpha = 1.0;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "15px Avenir";
        context.fillStyle = "#000";
        context.globalAlpha = 1.0;
        if (last === undefined) {
          var firstname = name[0].toUpperCase();
          var lastName = name[1].toUpperCase();
          context.fillText(firstname, 19, 35);
          context.fillText(lastName, 30, 35);

        } else {
          var firstname = first[0];
          context.fillText(firstname.toUpperCase(), 19, 35);
          var lastName = last[0];
          context.fillText(lastName.toUpperCase(), 30, 35);
        }
        $scope.imageUrl = canvas.toDataURL();
      };

      init();
    }
  ]);
