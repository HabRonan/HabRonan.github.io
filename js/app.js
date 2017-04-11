"use strict";



angular
.module("habPortfolioApp", [
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
.controller('ProjectController',[
  "$state",
  "$stateParams",
  ProjectControllerFunction
])
.controller('ContactController',[
  "$state",
  "$stateParams",
  ContactControllerFunction
])
.controller('SkillsController',[
  "$state",
  "$stateParams",
  SkillsControllerFunction
])

function RouterFunction($stateProvider){
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

}

function IndexControllerFunction($state){}
function AboutControllerFunction($state,$stateParams){}
function ProjectControllerFunction($state,$stateParams){}
function ContactControllerFunction ($state, $stateParams){}
function SkillsControllerFunction($state){}
