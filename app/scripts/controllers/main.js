'use strict';

/**
 * @ngdoc function
 * @name apifyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the apifyApp
 */
angular.module('apifyApp')
  .controller('MainCtrl', function ($scope,$route,apiService) {
    $scope.$route = $route;
    $scope.api  = undefined;
    $scope.apis = [];
    $scope.find = apiService.find;
    $scope.$on('langSelected', function (e, lang) {
      $scope.selectedLang = lang;
    });

  });
