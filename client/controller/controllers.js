(function () {

    "use strict";

    var App = angular.module("App.controllers", [
        'ui.bootstrap'
    ]);

    //home controller
    App.controller("home", function ($scope, $modal, UtilSrvc) {

        let num = UtilSrvc.getValuesFromServer('getlastpapers', "/book", onSuccsess, onError);

        function onSuccsess(res) {
            console.log('this is me ' + JSON.stringify(res));
            $scope.lastLaintan = res.data[0]['id'];
            $scope.lastMaida = res.data[1]['id'];
            $scope.lastSt = res.data[2]['id'];
            $scope.lastEmtza = res.data[3]['id'];

        }

        function onError(res) {
            console.log(res);

        }
        //modal product popup function
        $scope.choosePaper = function (paper) {
            var dialogInst = $modal.open({
                templateUrl: "./public/view/popups/popup" + paper + ".html",
                controller: "DialogInstCtrl",
                size: "lg",
                resolve: {
                    selectedUsr: function () {
                        return paper;
                    }
                }
            });
        };



    });


    //dialog popup controller
    App.controller("DialogInstCtrl", function ($scope, $modalInstance, $log) {
        $scope.submitUser = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    });


    // flipbook controller
    App.controller("flipbook", function ($scope, UtilSrvc, $routeParams, $location, $sce) {
        let type = $routeParams.k;
        let num = $routeParams.n;
        
        // $scope.source = 'http://localhost:8081/public/pdf-flipbook-master/?num=' + num + "&folder=" + type;
        $scope.source = 'http://localhost:8081/public/turnjs4/samples/magazine/?num=' + num + "&folder=" + type;


    });


    // papers controller
    App.controller("papers", function ($scope, $window, $timeout, UtilSrvc, $routeParams, $location, $sce) {
        $scope.getSelectedPaper = function (folderName, selectedPaper) {
            console.log(selectedPaper);
            if (selectedPaper) {
                $window.location.href = `#/book?k=${folderName}&n=${selectedPaper}`;

            }

        }

        let num = UtilSrvc.getValuesFromServer('getlastpapers', "/book", onSuccsess, onError);

        function onSuccsess(res) {
            // console.log(res);
            $scope.data = [{
                    lastpaper: res.data[0]['id'],
                    date: res.data[0]['date'],
                    hewd: res.data[0]['hebrew_date'],
                    name: "lainyan",
                    nameHe: "לעניין",
                    lastpapers: [
                        res.data[0]['id'] - 1,
                        res.data[0]['id'] - 2,
                        res.data[0]['id'] - 3
                    ]
                },
                {
                    lastpaper: res.data[1]['id'],
                    date: res.data[1]['date'],
                    hewd: res.data[1]['hebrew_date'],
                    name: "meida",
                    nameHe: "מידע לכל",
                    lastpapers: [
                        res.data[1]['id'] - 1,
                        res.data[1]['id'] - 2,
                        res.data[1]['id'] - 3
                    ]
                },
                {
                    lastpaper: res.data[2]['id'],
                    date: res.data[2]['date'],
                    hewd: res.data[2]['hebrew_date'],
                    name: "shavua",
                    nameHe: "שבוע טוב",
                    lastpapers: [
                        res.data[2]['id'] - 1,
                        res.data[2]['id'] - 2,
                        res.data[2]['id'] - 3
                    ]
                },
                {
                    lastpaper: res.data[3]['id'],
                    date: res.data[3]['date'],
                    hewd: res.data[3]['hebrew_date'],
                    name: "emtza",
                    nameHe: "אמצע השבוע",
                    lastpapers: [
                        res.data[3]['id'] - 1,
                        res.data[3]['id'] - 2,
                        res.data[3]['id'] - 3
                    ]
                },
            ];


        }




        function onError(res) {
            console.log(res);

        }


    });




    App.controller("contactform", function ($scope, UtilSrvc, modelService) {


        $scope.contact = {
            fname: "",
            lname: "",
            phone: "",
            email: "",
            content: ""
        }


        $scope.contactSubmit = function () {
            let content = new modelService.ContactModel($scope.contact);
            console.log(content);
            UtilSrvc.sendData(content, "contact", sucsses, error);

        }
        function sucsses(res){
            alert("ההודעה נקלטה במערכת בהצלחה, ותטופל בהקדם");
        }

        function error(res){
            alert(res);
        }



    });







}());