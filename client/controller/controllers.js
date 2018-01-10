(function() {

    "use strict";

    var App = angular.module("App.controllers", []);

    //home controller
    App.controller("home", function($scope, UtilSrvc) {
        $scope.lastLaintan = 789;
        console.log($scope.lastLaintan);

        $scope.lastMaida = 1204;
        $scope.lastEmtza = 1052;
        $scope.lastSt = 815;

    });

    // flipbook controller
    App.controller("flipbook", function($scope, UtilSrvc,  $routeParams, $location, $sce) {
        let type =  $routeParams.n;
        let num = UtilSrvc.getValuesFromServer(type, "/book", onSuccsess, onError);
  

        function onSuccsess(res) {
            console.log("sucsess: " + JSON.stringify(res.data.id));
            let sourse = 'http://localhost:8081/public/pdf-flipbook-master/?num=' + res.data.id;
            $scope.source = sourse;
            console.log("sucsess: " + JSON.stringify(res.data.id));
            console.log(sourse);


        }
        function onError(err) {
            console.log("error: "+ err);
        }

        // source = $sce.trustAsHtml(source)

    });
    



}());