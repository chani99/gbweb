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

        function onError(res) {
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
    App.controller("papers", function($scope, $window, $timeout, UtilSrvc, $routeParams, $location, $sce) {
        $scope.getSelectedPaper = function(folderName) {
            if ($scope.selectedPaper) {
                console.log($scope.selectedPaper);
                $window.location.href = `#/book?k=${folderName}&n=${$scope.selectedPaper}`;

            }

        }

        let num = UtilSrvc.getValuesFromServer('getlastpapers', "/book", onSuccsess, onError);

        function onSuccsess(res) {
            console.log(res);
            $scope.lastLaintan = res.data[0]['MAX(Id)'];
            $scope.lastMaida = res.data[1]['MAX(Id)'];
            $scope.lastSt = res.data[2]['MAX(Id)'];
            $scope.lastEmtza = res.data[3]['MAX(Id)'];


            $scope.lastLa = [
                res.data[0]['MAX(Id)'] - 1,
                res.data[0]['MAX(Id)'] - 2,
                res.data[0]['MAX(Id)'] - 3
            ];

            $scope.lastMe = [
                res.data[1]['MAX(Id)'] - 1,
                res.data[1]['MAX(Id)'] - 2,
                res.data[1]['MAX(Id)'] - 3
            ];
            $scope.lastSt2 = [
                res.data[2]['MAX(Id)'] - 1,
                res.data[2]['MAX(Id)'] - 2,
                res.data[2]['MAX(Id)'] - 3
            ];
            $scope.lastEm = [
                res.data[3]['MAX(Id)'] - 1,
                res.data[3]['MAX(Id)'] - 2,
                res.data[3]['MAX(Id)'] - 3
            ];

            ///timeout for select
            // $timeout(function() {
            //     $('#singleSelect').selectpicker({
            //         style: 'btn-default btn-md',
            //         size: 10

            //     });
            // });

        }

        function onError(res) {
            console.log(res);

        }


    });






}());