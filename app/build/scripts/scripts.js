"use strict";function isNumber(a){return!isNaN(parseFloat(a))&&isFinite(a)}angular.module("ngPocApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","valdr","pascalprecht.translate","ngTable","angular-growl","ngResource","ngPocApp.controllers","ngPocApp.services","ngPocApp.directives"]).config(["$routeProvider","$httpProvider","growlProvider","valdrMessageProvider","valdrProvider","$translateProvider",function(a,b,c,d,e,f){a.otherwise({redirectTo:"/user"}),c.globalTimeToLive(5e3),d.setTemplateUrl("app/shared/templates/valdr/valdrMesssageTemplate.html"),b.interceptors.push("apiResponseInterceptor"),e.addValidator("serverValidator"),f.translations("en",{"SERVER.USER_EMAIL_DUPLICATE":"Email address already exists","SERVER.SECOND_ERROR":"Second error from server (testing)","VALIDATIONS.SIZE":"{{fieldName}} must be between {{min}} and {{max}} characters.","VALIDATIONS.REQUIRED":"{{fieldName}} is required","VALIDATIONS.INVALID_EMAIL":"{{fieldName}} is not a valid email","VALIDATIONS.SERVER_MESSAGE":"Server returned an error on this field","User.name":"Name","User.email":"Email"}),f.translations("de",{"SERVER.USER_EMAIL_DUPLICATE":"Some german message","SERVER.SECOND_ERROR":"Dies ist ein Paragraph","VALIDATIONS.SIZE":"{{fieldName}} must be between {{min}} and {{max}} characters.","VALIDATIONS.REQUIRED":"{{fieldName}} is required","VALIDATIONS.INVALID_EMAIL":"{{fieldName}} is not a valid email","VALIDATIONS.SERVER_MESSAGE":"Server returned an error on this field","User.name":"Name","User.email":"Email"}),f.preferredLanguage("en")}]),angular.module("ngPocApp.controllers",[]),angular.module("ngPocApp.services",[]),angular.module("ngPocApp.directives",[]),angular.module("ngPocApp").constant("Settings",{api:{baseUrl:"/api",user:"/user/:id"},translate:{errorPrefix:"SERVER."}}),angular.module("ngPocApp.controllers").controller("UserController",["$scope","$route","$routeParams","$location","ngTableParams","growl","apiService",function(a,b,c,d,e,f,g){function h(){a.users=[],a.user=void 0,a.config={view:b.current.view||"",modal:!1,activeUser:void 0},i()}function i(){switch(a.config.view){case"list":j();break;case"new":break;case"show":k(c.id);break;case"edit":k(c.id)}}function j(){a.tableParams=new e({page:1,count:5,sorting:{name:"asc"}},{total:0,getData:function(b,c){g.User.query(function(d){c.total(d.length),a.users=d,b.resolve(d)})}})}function k(b){g.User.get({id:b},function(b){a.user=b})}function l(a){g.User.save(a,function(a){f.success("New user created successfully"),d.path("/user/"+a.id+"/show")})}function m(a){g.User.update(a,function(a){f.success("Updated user successfully"),d.path("/user/"+a.id+"/show")})}a.deleteUser=function(c){g.User.delete({id:c.id},function(c){f.success("User deleted successfully"),"list"===a.config.view?b.reload():d.path("/user")})},a.submit=function(){"new"===a.config.view?l(a.user):m(a.user)},a.showModal=function(b){a.config.modal=!0,a.config.activeUser=b},a.hideModal=function(){a.config.modal=!1,a.config.activeUser=void 0},h()}]),angular.module("ngPocApp.controllers").config(["$routeProvider",function(a){a.when("/user",{templateUrl:"app/components/user/views/list.html",controller:"UserController",view:"list"}).when("/user/new",{templateUrl:"app/components/user/views/form.html",controller:"UserController",view:"new"}).when("/user/:id/edit",{templateUrl:"app/components/user/views/form.html",controller:"UserController",view:"edit"}).when("/user/:id/show",{templateUrl:"app/components/user/views/detail.html",controller:"UserController",view:"show"})}]),angular.module("ngPocApp.controllers").config(["valdrProvider",function(a){a.addConstraints({User:{name:{size:{min:3,max:128,message:"VALIDATIONS.SIZE"},required:{message:"VALIDATIONS.REQUIRED"},serverValidator:{field:"name",message:"VALIDATIONS.SERVER_MESSAGE"}},email:{pattern:{value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"VALIDATIONS.INVALID_EMAIL"},required:{message:"VALIDATIONS.REQUIRED"},serverValidator:{field:"email",message:"VALIDATIONS.SERVER_MESSAGE"}}}})}]),angular.module("ngPocApp.services").factory("apiService",["$resource","Settings",function(a,b){var c=b.api.baseUrl+b.api.user,d=a(c,{id:"@_id"},{update:{method:"PUT"}});return{User:d}}]),angular.module("ngPocApp.services").factory("apiResponseInterceptor",["$q","growl","serverValidator",function(a,b,c){return{responseError:function(d){if(422===d.status){var e=d.data;"fail"===e.status&&c.validator.triggerValidator(e.data)}else b.error("Failed with "+d.status+" status");return a.reject(d)}}}]),angular.module("ngPocApp.services").factory("serverValidator",["$rootScope","valdrEvents","$translate","Settings",function(a,b,c,d){var e=function(){this.violations=[],this.triggerValidator=function(c){console.log("data :: ",c);var e,f,g=[];for(var h in c){for(g=[],this.violations[h]="",f=c[h].length,e=0;e<f;e+=1)g.push(d.translate.errorPrefix+c[h][e].errorCode);this.violations[h]=g.join(" | ")}a.$broadcast(b.revalidate)},this.resetService=function(a){delete this.violations[a]},this.isServerError=function(a){return!!angular.isDefined(this.violations[a])},this.getErrorMessage=function(a){return this.violations[a]}},f=new e;return{name:"serverValidator",validate:function(a,b){var c=b.field;return f.isServerError(c)!==!0||(b.message=f.getErrorMessage(c),f.resetService(c),!1)},validator:f}}]);var app=angular.module("DemoMock",["ngTable","ngMockE2E"]).run(["$httpBackend","$filter","$log","ngTableParams",function(a,b,c,d){a.whenGET(/users.*/).respond(function(a,e,f,g){var h=e.split("?")[1],i={};c.log("Ajax request: ",e);for(var j=h.split("&"),k=0;k<j.length;k++){var l=j[k].split("=");i[decodeURIComponent(l[0])]=decodeURIComponent(l[1])}for(var m in i)if(m.indexOf("[")>=0){var n=m.split(/\[(.*)\]/),o=i[m],p="";angular.forEach(n.reverse(),function(a){if(""!=a){var b=o;o={},o[p=a]=isNumber(b)?parseFloat(b):b}}),i[p]=angular.extend(i[p]||{},o[p])}else i[m]=isNumber(i[m])?parseFloat(i[m]):i[m];f=[{id:1,name:"Moroni",email:"moroni@gmail.com"},{id:2,name:"Tiancum",email:"Tiancum@gmail.com"},{id:3,name:"Jacob",email:"Jacob@gmail.com"},{id:4,name:"Nephi",email:"Nephi@gmail.com"},{id:5,name:"Enos",email:"Enos@gmail.com"},{id:6,name:"Tiancum",email:"Tiancum@gmail.com"},{id:7,name:"Jacob",email:"Jacob@gmail.com"},{id:8,name:"Nephi",email:"Nephi@gmail.com"},{id:9,name:"Enos",email:"Enos@gmail.com"},{id:10,name:"Tiancum",email:"Tiancum@gmail.com"},{id:11,name:"Jacob",email:"Jacob@gmail.com"},{id:12,name:"Nephi",email:"Nephi@gmail.com"},{id:13,name:"Enos",email:"Enos@gmail.com"},{id:14,name:"Tiancum",email:"Tiancum@gmail.com"},{id:15,name:"Jacob",email:"Jacob@gmail.com"},{id:16,name:"Nephi",email:"Nephi@gmail.com"},{id:17,name:"Enos",email:"Enos@gmail.com"}];var n=new d(i);f=n.filter()?b("filter")(f,n.filter()):f,f=n.sorting()?b("orderBy")(f,n.orderBy()):f;var q=f.length;return f=f.slice((n.page()-1)*n.count(),n.page()*n.count()),[200,{result:f,total:q}]}),a.whenGET(/.*/).passThrough()}]);