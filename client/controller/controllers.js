(function() {

    "use strict";

    var App = angular.module("App.controllers", []);

    //home controller
    App.controller("home", function($scope, UtilSrvc) {

        let num = UtilSrvc.getValuesFromServer('getlastpapers', "/book", onSuccsess, onError);

        function onSuccsess(res) {
            console.log(res);
        $scope.lastLaintan = res.data[0]['MAX(Id)'];
        $scope.lastMaida = res.data[1]['MAX(Id)'];
        $scope.lastSt = res.data[2]['MAX(Id)'];
        $scope.lastEmtza = res.data[3]['MAX(Id)'];
        }

        function onError(res){
            console.log(res);

        }

    });



    // flipbook controller
    App.controller("flipbook", function($scope, UtilSrvc, $routeParams, $location, $sce) {
        let type = $routeParams.k;
        let num = $routeParams.n;
        $scope.source = 'http://localhost:8081/public/pdf-flipbook-master/?num=' + num + "&folder=" + type;

    });

    
    // papers controller
    App.controller("papers", function($scope,  $timeout, UtilSrvc, $routeParams, $location, $sce) {

        $timeout(function() {
            document.getElementsByClassName('selectpicker').selectpicker('refresh');
        });

        let num = UtilSrvc.getValuesFromServer('getlastpapers', "/book", onSuccsess, onError);
        function onSuccsess(res) {
        console.log(res);
        $scope.lastLaintan = res.data[0]['MAX(Id)'];
        $scope.lastMaida = res.data[1]['MAX(Id)'];
        $scope.lastSt = res.data[2]['MAX(Id)'];
        $scope.lastEmtza = res.data[3]['MAX(Id)'];

        $scope.last1 = res.data[0]['MAX(Id)'] -1;
        $scope.last2 = res.data[0]['MAX(Id)'] -2;
        $scope.last3 = res.data[0]['MAX(Id)'] -3;


        }


        function onError(res){
            console.log(res);

        }


    });

    




}());