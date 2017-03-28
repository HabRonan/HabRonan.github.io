"use strict";



angular
.module("portfolioApp", [
  'ui.router'
])

.config([
  "$stateProvider",
  RouterFunction
])
.controller('IndexController',[
  "$state",
  "$stateParams",
  IndexControllerFunction
])
.controller('AboutController',[
  "$state",
  "$stateParams",
  AboutControllerFunction
])
.controller('WorkController',[
  "$state",
  "$stateParams",
  WorkControllerFunction
])
.controller('ContactController',[
  "$state",
  "$stateParams",
  ContactControllerFunction
])

function RouterFunction($stateProvider){
  $stateProvider
  .state('Index',{
    url: "/",
    templateUrl: '../index.html',
    controller: 'IndexController',
    controllerAs: 'vm'
  })
  .state('about',{
    url: '/about',
    templateUrl: 'js/ng-views/about.html',
    controller: 'AboutController',
    controllerAs: 'vm'
  })
  .state('work',{
    url: "/work",
    templateUrl: "js/ng-views/work.html",
    controller: "WorkController",
    controllerAs: "vm"
  })
  .state('contact',{
    url: '/contact',
    templateUrl: 'js/ng-views/contact.html',
    controller: 'ContactController',
    controllerAs: 'vm'
  });

}

function IndexControllerFunction($state){}
function AboutControllerFunction($state,$stateParams){}
function WorkControllerFunction($state,$stateParams){}
function ContactControllerFunction ($state, $stateParams){}

//
// $(document).ready(function() {
//   $(".trigger").click(function() {
//     $(".menu").toggleClass("active");
//   });
// });
