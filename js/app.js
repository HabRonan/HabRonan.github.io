"use strict";



angular
.module("habPortfolioApp", [
  'ui.router'
])

.config([
  "$stateProvider",
  "$locationProvider",
  "$urlRouterProvider",
  RouterFunction
])
.controller('IndexController',[
  IndexControllerFunction
])
.controller('AboutController',[
  AboutControllerFunction
])
.controller('ProjectController',[
  ProjectControllerFunction
])
.controller('ContactController',[
  ContactControllerFunction
])
.controller('SkillsController',[
  SkillsControllerFunction
])

function RouterFunction($stateProvider,$locationProvider,$urlRouterProvider){

  $stateProvider
  .state('Index',{
    url: "/",
    templateUrl: 'js/ng-views/home.html',
    controller: 'IndexController',
    controllerAs: 'vm'
  })
  .state('about',{
    url: '/about',
    templateUrl: 'js/ng-views/about.html',
    controller: 'AboutController',
    controllerAs: 'vm'
  })
  .state('project',{
    url: "/project",
    templateUrl: "js/ng-views/project.html",
    controller: "ProjectController",
    controllerAs: "vm"
  })
  .state('contact',{
    url: '/contact',
    templateUrl: 'js/ng-views/contact.html',
    controller: 'ContactController',
    controllerAs: 'vm'
  })
  .state('skills',{
    url: '/skills',
    templateUrl: 'js/ng-views/skills.html',
    controller: 'SkillsController',
    controllerAs: 'vm'
  });
   $urlRouterProvider.otherwise("/")
   $locationProvider.html5Mode(true);
}

function IndexControllerFunction(){}
function AboutControllerFunction(){}
function ProjectControllerFunction(){}
function ContactControllerFunction (){}
function SkillsControllerFunction(){}
