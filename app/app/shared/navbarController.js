angular
  .module('groot.controllers')
  .controller('navbarController', ['$scope', '$state', '$stateParams', 'localStorageService',
    function($scope, $state, $stateParams, localStorageService) {

      function init() {
        var name = localStorageService.get('name');
        $scope.isLoggedIn = localStorageService.get('isLoggedIn');
        $scope.imageUrl='';
        if($scope.isLoggedIn){
          getNameCanvas(name);
        }
      }

      function getNameCanvas(name) {
        var first = name.split(" ")[0];
        var last = name.split(" ")[1];
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        canvas.width = '80';
        canvas.height = '80';
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');
        context.fillStyle = "#d3d3d3";
        context.globalAlpha = 1.0;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "28px Avenir";
        context.fillStyle = "#000";
        context.globalAlpha = 1.0;
        if (last === undefined) {
          var firstname = name[0].toUpperCase();
          var lastName = name[1].toUpperCase();
          context.fillText(firstname, 22, 48);
          context.fillText(lastName, 40, 48);

        } else {
          var firstname = first[0];
          context.fillText(firstname.toUpperCase(), 22, 48);
          var lastName = last[0];
          context.fillText(lastName.toUpperCase(), 40, 48);
        }
        $scope.imageUrl = canvas.toDataURL();
      };

    $scope.logout = function(){
       localStorage.clear();
       $state.go('login');
    }

      init();
    }
  ]);
