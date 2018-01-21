(function() {

    "use strict";

    var App = angular.module("App.controllers", []);

    //home controller
    App.controller("home", function($scope, UtilSrvc) {

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

    });



    // flipbook controller
    App.controller("flipbook", function($scope, UtilSrvc, $routeParams, $location, $sce) {
        let type = $routeParams.k;
        let num = $routeParams.n;
        $scope.source = 'http://localhost:8081/public/pdf-flipbook-master/?num=' + num + "&folder=" + type;

    });


    // papers controller
    App.controller("papers", function($scope, $window, $timeout, UtilSrvc, $routeParams, $location, $sce) {
        $scope.getSelectedPaper = function(folderName, selectedPaper) {
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


    App.controller("orderadds", function($scope, UtilSrvc) {

        let order={
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phone: $scope.phone,
            email: $scope.email,
            size: $scope.size,
            paper: $scope.paper,
            date: $scope.date,
            content: $scope.content,
            image: $scope.image,
    
    
        };
        
    });
    
    App.controller("contactform", function($scope, UtilSrvc) {

    
        $scope.contact = {
            fname: "",
            lname: "",
            phone: "",
            email: "",
            content: ""
        }
  

        $scope.contactSubmit = function() {
            console.log($scope.contact);
            alert($scope.contact.fname + "\nההודעה נשלחה בהצלחה ותטופל בהקדם");
        }

        
    });
    
    
    




}());