 App.controller("luachCtrl", function ($scope, validate, UtilSrvc) {

//luach model
     var Luach = function (luach) {
         if (luach.content) this.content = luach.content;
         if (luach.remarks) this.remarks = luach.remarks;
         if (luach.type) this.type = luach.type;
         if (luach.shows) this.shows = luach.shows;
         if (luach.section) this.section = luach.section;
         if (luach.fname) this.fname = luach.fname;
         if (luach.lname) this.lname = luach.lname;
         if (luach.email) this.email = luach.email;
         if (luach.phone) this.phone = luach.phone;
     };

     $scope.price = {};

     $scope.luach = {
         content: "",
         remarks: "",
         type: [],
         shows: [],
         section: "",
         fname: "",
         lname: "",
         email: "",
         phone: ""
     };


     $scope.validate = {
         content: false,
         remarks: false,
         type: false,
         shows: false,
         section: false,
         fname: false,
         lname: false,
         email: false,
         phone: false
     };




     $scope.section = [];
     let madorim = [
         "דירות למכירה",
         "דירות להשכרה",
         "דירות קייט ותקופה קצרה",
         "חנויות ומחסנים",
         "משרדים",
         "דרושים",
         "מכירות",
         "הסעות",
         "הובלות ושליחויות",
         "תיקונים ושיפוצים",
         "ביגוד לאירועים",
         "חשמלאי מוסמך",
         "הגברות ואביזרים",
         "מתנפחים",
         "קורסים ושיעורים",
         "תפירה",
         "מחשבים",
         "שונות",
         "רכבים השכרה/מכירה",
         "איפור ותסרוקות",
         "שירותים וביקוש עבודה",
         "אבידות",
         "מציאות",
         "למסירה"
     ];
     let chinam = [
         "אבידות",
         "מציאות",
         "למסירה"
     ];

//if selected free kind of advert - so shows only free sections
     $scope.selectedType = function () {
         if ($scope.luach.type !== false) {
             if ($scope.luach.type === "מדור חינמי (אבידות/מציאות/למסירה-חינם)") {
                 $scope.section = chinam;

             } else {
                 $scope.section = madorim;
             }

         }
     }
     
     //when a papar is checked it ands a value of 1 show and when uncheked - clears shows
     $scope.addNum = function(num,index) {  
         if(num){
            $scope.chek[index].shows = "" ;
         } else {
            $scope.chek[index].shows = 1 ;

         }
      }


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


     $scope.type = [
         " רגיל (ללא תוספת תשלום)",
         "מודגש",
         "נגטיב",
         "מדור פרטי (פתיחת מדור אישי שלא קיים)",
         "מדור חינמי (אבידות/מציאות/למסירה-חינם)"

     ];



     $scope.orderSummary = function (chek) {
         for (var i = 0; i < $scope.chek.length; i++) {
             if (!!chek[i].selected) $scope.luach.shows.push(chek[i].name);
             if (chek[i].shows !== null & chek[i].shows > 0) $scope.luach.shows.push({
                 type: chek[i].name,
                 shows: chek[i].shows
             });
         }
         let validate = orderValidate($scope.luach); //check validation of all fields
         if (validate === false) {
             let luachOrder = new Luach($scope.luach);
             if ($scope.luach.type === "מדור חינמי (אבידות/מציאות/למסירה-חינם)") {
                 UtilSrvc.sendLuach(luachOrder, freesuccess, freeerror);
                 console.log(luachOrder);
             } else {
                 //payment screen
                 $scope.payment = true;
             }
         } else {
             alert("error"); //todo
         }

     }

     function freesuccess(res) {
         alert('המודעה התקבלה במערכת ותפוסם בעז"ה בעיתון הקרוב')
     }

     function freeerror(res) {
         alert("ישנה בעיה במודעה ששלחתם:" + res);
     }

     function orderValidate(luach) {
         $scope.validate.content = validate.validateForm({
             type: "textarea",
             content: luach.content
         });

         if (luach.remarks) {
             $scope.validate.remarks = validate.validateForm({
                 type: "textarea",
                 content: luach.remarks
             });

         }
         $scope.validate.shows = validate.validateForm({
             type: "shows",
             content: luach.shows
         });

         if (!luach.type) {
             $scope.validate.type = true;
         } else {
             $scope.validate.type = false;
         }
         
         if (!luach.section) {
            $scope.validate.section = true;
        } else {
            $scope.validate.section = false;
        }

         if (!luach.fname) {
             $scope.validate.fname = true
         } else {
             $scope.validate.fname = false;
         }
         if (!luach.lname) {
             $scope.validate.lname = true
         } else {
             $scope.validate.lname = false;
         }
         if (!luach.phone) {
             $scope.validate.phone = true
         } else {
             $scope.validate.phone = false;
         }
         if (!luach.email) {
             $scope.validate.email = true
         } else {
             $scope.validate.email = false;
         }


         let test = false;

         for (var key in $scope.validate) {
             if ($scope.validate.hasOwnProperty(key)) {
                 if ($scope.validate[key] === true) {
                     test = true;
                     break;
                 };
             }
         }

         //check for not free adverts
         if (test !== true && luach.type === "מדור חינמי (אבידות/מציאות/למסירה-חינם)") {
             let freeLuach = validate.validateForm({
                 type: "free",
                 content: luach.content
             });
             if (freeLuach === false) {
                 alert("התוכן של המודעה אינו מתאים למדור חינמי");
                 test = true;
             }
         }
         return test;

     }


     $scope.backToLuach = function () {
         $scope.payment = false;
     }

 });