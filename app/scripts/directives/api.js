'use strict';

/**
 * @ngdoc directive
 * @name apifyApp.directive:api
 * @description
 * # api
 */
angular.module('apifyApp')
  .directive('api', function ($templateCache,$compile,$interpolate,$rootScope,apiService) {
    return {
      require: '^apiParent',
      scope: {
        name: '@',
        lang: '@',
        platform: '@'
      },
      restrict: 'E',
      transclude: false,
      link: function postLink(scope, element) {
        scope.selectedLang = 'info';
        var name  = scope.$parent.$parent.service.name;
        var api = {name:name,lang:scope.lang,platform:scope.platform};
        apiService.add(api);
        // create template
        // markdown if info
        var e;
        if( api.lang === 'info' ){
          e = angular.element([
            '<div class="code" ng-show="selectedLang == \''+api.lang+'\'">',
              '<markdown>',
                element.text(),
              '</markdown>',
            '</div>'
          ].join(''));
        } else {
          e = angular.element([
            '<div class="code" hljs hljs-interpolate="true" ng-show="selectedLang == \''+api.lang+'\'">',
              $interpolate(element.html())(scope),
            '</div>'
          ].join(''));
        }
        // replace element
        element.replaceWith($compile(e)(scope));
        //$templateCache.put(api.url, $compile(e)(scope).html());
        scope.$on('langSelected', function (e, lang) {
          console.log(lang);
          scope.selectedLang = lang;
        });
      }
    };
  });
