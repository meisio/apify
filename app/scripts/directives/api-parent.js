'use strict';

/**
 * @ngdoc directive
 * @name apifyApp.directive:apiParent
 * @description
 * # apiParent
 */
angular.module('apifyApp')
  .directive('apiParent', function () {
    return {
      scope:{
        service: '='
      },
      template: '<div class="api"><div class="languages"><ul class="list-inline"><li ng-repeat="item in service.apis" ng-class="{\'active\':isSelectedLang(item.lang)}" ng-click="onLangClick(item)"><a href="">{{item.lang}}</a></li></ul></div><div class="row code-block"><ng-include src="service.url"></ng-include></div>',
      restrict: 'AE',
      replace: true,
      controller: function($scope){
        // scope parameters
        $scope.selectedLang = 'info';
        $scope.onLangClick = function(item){
          $scope.selectedLang = item.lang;
          $scope.$broadcast('langSelected', $scope.selectedLang);
        };
        $scope.isSelectedLang = function(lang){
          return $scope.selectedLang === lang;
        };
        // broadcast default selection
        $scope.$broadcast('langSelected', $scope.selectedLang);
      }
    };
  });
