 App.controller("OrderCtrl", function ($scope, UtilSrvc, modelService) {
     $scope.chek = [{
             name: "lainyan",
             nameH: "לעניין",
             selected: "",
             shows: ""
         },
         {
             name: "meida",
             nameH: "מידע-לכל",
             selected: "",
             shows: ""
         },
         {
             name: "emtza",
             nameH: "אמצע השבוע",
             selected: "",
             shows: ""
         },
         {
             name: "shavua",
             nameH: "שבוע טוב",
             selected: "",
             shows: ""
         },

     ];

     $scope.size = [
         "עמוד שלם",
         "דבל",
         "חצי עמוד רוחב",
         "חצי עמוד גובה",
         "רבע עמוד גובה",
         "רבע עמוד רוחב",
         "שמינית עמוד",
         "1/16 (בלוח)",
         "1/32 (בלוח)",
         "קוביה בעמוד ראשון",
     ];


     $scope.place = [
         "מיקום רגיל (ללא תוספת תשלום)",
         "עמוד שער",
         "עמוד גב",
         "עמוד עדיף (חצי ראשון)",
         "שמאל לפני אמצע",
         "דבל אמצע",
     ];


     $scope.order = {
         addContent: "",
         remarks: "",
         type: [],
         shows: [],
         size: "",
         location: "",
         files: [],
         fname: "",
         lname: "",
         email: "",
         phone: ""
     };

     //when a papar is checked it ands a value of 1 show and when uncheked - clears shows
     $scope.addNum = function (num, index) {
         if (num) {
             $scope.chek[index].shows = "";
         } else {
             $scope.chek[index].shows = 1;

         }
     }


     $scope.orderSummary = function (chek) {

         for (var i = 0; i < $scope.chek.length; i++) {
             if (!!chek[i].selected) $scope.order.shows.push(chek[i].name);
             if (chek[i].shows !== null & chek[i].shows > 0) $scope.order.shows.push({
                 type: chek[i].name,
                 shows: chek[i].shows
             });
         }


         let order = new modelService.OrderModel($scope.order);
         console.log(order.files.length + " files selected ... Write your Upload Code");
         console.log(order.fiels);
         UtilSrvc.uploadOrder(order, order.files, "order", sucsses, error);

     }


     function sucsses(res) {
         alert("ההודעה נקלטה במערכת בהצלחה, ותטופל בהקדם");
     }

     function error(res) {
         alert(res);
     }


     $scope.getSize = function (size) {
         $scope.order.size = size;
     };

     $scope.getLocation = function (size) {
         $scope.order.location = location;
     };



 });