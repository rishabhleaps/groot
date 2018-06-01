"use strict";function isNumber(a){return!isNaN(parseFloat(a))&&isFinite(a)}angular.module("groot",["angular-loading-bar","ngAnimate","ngAria","ngCookies","ngMaterial","ngMessages","ngResource","ngRoute","ngSanitize","valdr","pascalprecht.translate","ngTable","angular-growl","ngResource","ui.router","LocalStorageModule","groot.controllers","groot.services","groot.directives"]).config(["$urlRouterProvider","$httpProvider","growlProvider","valdrMessageProvider","valdrProvider","$translateProvider","$stateProvider","cfpLoadingBarProvider",function(a,b,c,d,e,f,g,h){a.otherwise("/login"),c.globalTimeToLive(5e3),h.includeSpinner=!1,d.setTemplateUrl("app/shared/templates/valdr/valdrMesssageTemplate.html"),b.interceptors.push("apiResponseInterceptor"),e.addValidator("serverValidator"),f.translations("en",{"SERVER.USER_EMAIL_DUPLICATE":"Email address already exists","SERVER.SECOND_ERROR":"Second error from server (testing)","VALIDATIONS.SIZE":"{{fieldName}} must be between {{min}} and {{max}} characters.","VALIDATIONS.REQUIRED":"{{fieldName}} is required","VALIDATIONS.INVALID_EMAIL":"{{fieldName}} is not a valid email","VALIDATIONS.SERVER_MESSAGE":"Server returned an error on this field","User.name":"Name","User.email":"Email"}),f.translations("de",{"SERVER.USER_EMAIL_DUPLICATE":"Some german message","SERVER.SECOND_ERROR":"Dies ist ein Paragraph","VALIDATIONS.SIZE":"{{fieldName}} must be between {{min}} and {{max}} characters.","VALIDATIONS.REQUIRED":"{{fieldName}} is required","VALIDATIONS.INVALID_EMAIL":"{{fieldName}} is not a valid email","VALIDATIONS.SERVER_MESSAGE":"Server returned an error on this field","User.name":"Name","User.email":"Email"}),f.preferredLanguage("en")}]).run(["$rootScope","$state","$timeout","localStorageService",function(a,b,c,d){a.$on("$stateChangeSuccess",function(c,d){if(b.current=d.name,b.current){var e=b.current[0].toUpperCase()+b.current.slice(1);a.title=" | "+e||""}a.currentState=b.current}),a.$on("$stateChangeError",function(a,c,e,f){var g=d.get("id");g||b.go("login"),f.authenticated===!1&&b.go("login")})}]),angular.module("groot.controllers",[]),angular.module("groot.services",[]),angular.module("groot.directives",[]),angular.module("groot").constant("Settings",{api:{baseUrl:"/api/v1/"},translate:{errorPrefix:"SERVER."}}),angular.module("groot.controllers").controller("loginController",["$scope","$state","$stateParams","localStorageService",function(a,b,c,d){function e(){a.employee={},f()}function f(){gapi.signin2.render("my-signin2",{scope:"profile email",longtitle:!0,width:265,onsuccess:g,onfailure:h,display:"inline-block",color:"#444"})}function g(a){var c=a.getBasicProfile();d.set("id",c.getId()),d.set("name",c.getName()),d.set("image",c.getImageUrl()),d.set("email",c.getEmail()),b.go("leave")}function h(a){console.log(a)}e()}]),angular.module("groot.controllers").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/components/login/views/login.html",controller:"loginController"})}]),angular.module("groot.controllers").controller("leaveController",["$scope",function(a){function b(){a.employee={},c()}function c(){gapi.load("auth2",function(){gapi.auth2.init()})}b()}]),angular.module("groot.controllers").config(["$stateProvider",function(a){a.state("leave",{url:"/leave",templateUrl:"app/components/leave/views/leave.html",controller:"leaveController"})}]),angular.module("groot.controllers").controller("navbarController",["$scope","$state","$stateParams","localStorageService",function(a,b,c,d){function e(){a.isLoggedIn=d.get("id")}e()}]),angular.module("groot.controllers").controller("sidebarController",["$scope","$state","$stateParams","localStorageService",function(a,b,c,d){function e(){a.employee={imgUrl:d.get("image"),name:d.get("name")}}a.signOut=function(){var a=gapi.auth2.getAuthInstance();a.signOut().then(function(){console.log("User signed out.")}),localStorage.clear(),b.go("login")},e()}]),angular.module("groot.services").factory("apiResponseInterceptor",["$q","growl","serverValidator",function(a,b,c){return{responseError:function(d){if(422===d.status){var e=d.data;"fail"===e.status&&c.validator.triggerValidator(e.data)}else b.error("Failed with "+d.status+" status");return a.reject(d)}}}]),angular.module("groot.services").factory("serverValidator",["$rootScope","valdrEvents","$translate","Settings",function(a,b,c,d){var e=function(){this.violations=[],this.triggerValidator=function(c){console.log("data :: ",c);var e,f,g=[];for(var h in c){for(g=[],this.violations[h]="",f=c[h].length,e=0;f>e;e+=1)g.push(d.translate.errorPrefix+c[h][e].errorCode);this.violations[h]=g.join(" | ")}a.$broadcast(b.revalidate)},this.resetService=function(a){delete this.violations[a]},this.isServerError=function(a){return angular.isDefined(this.violations[a])?!0:!1},this.getErrorMessage=function(a){return this.violations[a]}},f=new e;return{name:"serverValidator",validate:function(a,b){var c=b.field;return f.isServerError(c)===!0?(b.message=f.getErrorMessage(c),f.resetService(c),!1):!0},validator:f}}]);var app=angular.module("DemoMock",["ngTable","ngMockE2E"]).run(["$httpBackend","$filter","$log","ngTableParams",function(a,b,c,d){a.whenGET(/users.*/).respond(function(a,e,f,g){var h=e.split("?")[1],i={};c.log("Ajax request: ",e);for(var j=h.split("&"),k=0;k<j.length;k++){var l=j[k].split("=");i[decodeURIComponent(l[0])]=decodeURIComponent(l[1])}for(var m in i)if(m.indexOf("[")>=0){var n=m.split(/\[(.*)\]/),o=i[m],p="";angular.forEach(n.reverse(),function(a){if(""!=a){var b=o;o={},o[p=a]=isNumber(b)?parseFloat(b):b}}),i[p]=angular.extend(i[p]||{},o[p])}else i[m]=isNumber(i[m])?parseFloat(i[m]):i[m];f=[{id:1,name:"Moroni",email:"moroni@gmail.com"},{id:2,name:"Tiancum",email:"Tiancum@gmail.com"},{id:3,name:"Jacob",email:"Jacob@gmail.com"},{id:4,name:"Nephi",email:"Nephi@gmail.com"},{id:5,name:"Enos",email:"Enos@gmail.com"},{id:6,name:"Tiancum",email:"Tiancum@gmail.com"},{id:7,name:"Jacob",email:"Jacob@gmail.com"},{id:8,name:"Nephi",email:"Nephi@gmail.com"},{id:9,name:"Enos",email:"Enos@gmail.com"},{id:10,name:"Tiancum",email:"Tiancum@gmail.com"},{id:11,name:"Jacob",email:"Jacob@gmail.com"},{id:12,name:"Nephi",email:"Nephi@gmail.com"},{id:13,name:"Enos",email:"Enos@gmail.com"},{id:14,name:"Tiancum",email:"Tiancum@gmail.com"},{id:15,name:"Jacob",email:"Jacob@gmail.com"},{id:16,name:"Nephi",email:"Nephi@gmail.com"},{id:17,name:"Enos",email:"Enos@gmail.com"}];var n=new d(i);f=n.filter()?b("filter")(f,n.filter()):f,f=n.sorting()?b("orderBy")(f,n.orderBy()):f;var q=f.length;return f=f.slice((n.page()-1)*n.count(),n.page()*n.count()),[200,{result:f,total:q}]}),a.whenGET(/.*/).passThrough()}]);