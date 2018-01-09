(function() {

    "use strict";

    var App = angular.module("App.controllers", []);

    //home controller
    App.controller("home", function($scope, UtilSrvc) {
        $scope.lastLaintan = 789;
        $scope.lastMaida = 1204;
        $scope.lastEmtza = 1052;
        $scope.lastSt = 815;

    });




}());