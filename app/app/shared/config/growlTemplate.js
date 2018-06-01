angular.module('groot')
  .run(function ($templateCache) {
    $templateCache.put('templates/growl/growl.html', '<div class="growl-container mygrowl" ng-class="wrapperClasses()">' + '<div class="growl-item alert" ng-repeat="message in growlMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="stopTimeoutClose(message)">' + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="growlMessages.deleteMessage(message)" ng-show="!message.disableCloseButton">&times;</button>' + '<button type="button" class="close" aria-hidden="true" ng-show="showCountDown(message)">{{message.countdown}}</button>' + '<h4 class="growl-title" ng-show="message.title" ng-bind="message.title"></h4>' + '<div class="growl-message" ng-bind-html="message.text"></div>' + '</div>' + '</div>');
  });
