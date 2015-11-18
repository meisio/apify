'use strict';

/**
 * @ngdoc directive
 * @name apifyApp.directive:markdown
 * @description
 * # markdown
 */
angular.module('apifyApp')
  .directive('markdown', function ($compile) {
    return {
      scope: {},
      restrict: 'E',
      transclude: false,
      link: function postLink(scope, element) {
        // create template
        var e = angular.element([
          '<div class="code markdown">',
            '<pre>',
              '<code marked>',
                element.html(),
              '</code>',
              '</pre>',
          '</div>'
        ].join(''));
        element.replaceWith($compile(e)(scope));
      }
    };
  });
