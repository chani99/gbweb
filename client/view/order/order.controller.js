 App.controller("OrderCtrl", function($scope) {
     $scope.chek = [{
             name: "lainyan",
             nameH: "לעניין"
         },
         {
             name: "meida",
             nameH: "מידע-לכל"
         },
         {
             name: "emtza",
             nameH: "אמצע השבוע"
         },
         {
             name: "shavua",
             nameH: "שבוע טוב"
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

     $scope.files = []; 
     $scope.upload=function(){
       alert($scope.files.length+" files selected ... Write your Upload Code"); 
     }
   









 });