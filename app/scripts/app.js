'use strict';

/**
 * @ngdoc overview
 * @name apifyApp
 * @description
 * # apifyApp
 *
 * Main module of the application.
 */
angular
  .module('apifyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hljs',
    'hc.marked',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider,hljsServiceProvider,markedProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

      markedProvider.setOptions({
        gfm: true,
        tables: true,
        highlight: function (code, lang) {
          if (lang) {
            return hljsServiceProvider.highlight(lang, code, true).value;
          } else {
            return hljsServiceProvider.highlightAuto(code).value;
          }
        }
      });

      markedProvider.setRenderer({
        link: function(href, title, text) {
          return '<a href="' + href + '"' + (title ? ' title="' + title + '"' : '') + ' target="_blank">' + text + '</a>';
        }
      });

  })
  .run(function($templateCache,apiService){
    apiService.add({'name':'semantics3','url':'https://www.semantics3.com/'});
  });
