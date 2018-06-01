'use strict';

/**
 * @ngdoc overview
 * @name groot
 * @description
 * # ngPocApp
 *
 * Main module of the application.
 */
angular
  .module('groot', [
    'angular-loading-bar',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'valdr',
    'pascalprecht.translate',
    'ngTable',
    'angular-growl',
    'ngResource',
    'ui.router',
    'LocalStorageModule',
    'groot.controllers',
    'groot.services',
    'groot.directives'
  ])
  .config(['$urlRouterProvider', '$httpProvider', 'growlProvider', 'valdrMessageProvider', 'valdrProvider', '$translateProvider', '$stateProvider', 'cfpLoadingBarProvider',
    function($urlRouterProvider, $httpProvider, growlProvider, valdrMessageProvider, valdrProvider, $translateProvider, stateProvider,cfpLoadingBarProvider) {
      $urlRouterProvider
        .otherwise('/splash');

      // set default timeout for Growl notifications
      growlProvider.globalTimeToLive(5000);
      cfpLoadingBarProvider.includeSpinner = false;

      // customize template for Valdr error messages
      valdrMessageProvider.setTemplateUrl('app/shared/templates/valdr/valdrMesssageTemplate.html');

      // add interceptor
      $httpProvider.interceptors.push('apiResponseInterceptor');

      // registering the valdr server validator
      valdrProvider.addValidator('serverValidator');

      // set up translations
      $translateProvider.translations('en', {
        'SERVER.USER_EMAIL_DUPLICATE': 'Email address already exists',
        'SERVER.SECOND_ERROR': 'Second error from server (testing)',
        'VALIDATIONS.SIZE': '{{fieldName}} must be between {{min}} and {{max}} characters.',
        'VALIDATIONS.REQUIRED': '{{fieldName}} is required',
        'VALIDATIONS.INVALID_EMAIL': '{{fieldName}} is not a valid email',
        'VALIDATIONS.SERVER_MESSAGE': 'Server returned an error on this field',
        'User.name': 'Name',
        'User.email': 'Email'
      });

      $translateProvider.translations('de', {
        'SERVER.USER_EMAIL_DUPLICATE': 'Some german message',
        'SERVER.SECOND_ERROR': 'Dies ist ein Paragraph',
        'VALIDATIONS.SIZE': '{{fieldName}} must be between {{min}} and {{max}} characters.',
        'VALIDATIONS.REQUIRED': '{{fieldName}} is required',
        'VALIDATIONS.INVALID_EMAIL': '{{fieldName}} is not a valid email',
        'VALIDATIONS.SERVER_MESSAGE': 'Server returned an error on this field',
        'User.name': 'Name',
        'User.email': 'Email'
      });

      $translateProvider.preferredLanguage('en');
    }
  ])
  .run(['$rootScope', '$state', '$timeout', 'localStorageService',

   function($rootScope, $state, $timeout, localStorageService) {
     $rootScope.$on('$stateChangeSuccess', function(event, toState) {
       $state.current = toState.name;
       if ($state.current) {
         var titlePage = $state.current[0].toUpperCase() + $state.current.slice(1);
         $rootScope.title = ' | ' + titlePage || '';
       }
       $rootScope.currentState = $state.current;
     });

     $rootScope.$on('$stateChangeError', function(event, current, previous, eventObj) {
       var token = localStorageService.get('id');
       if (!token) {
         $state.go('login');
       }
       if (eventObj.authenticated === false) {
         $state.go('login');
       }
     });
   }
 ]);
