 App.controller("OrderCtrl", function($scope) {

    var Order = function(order){
        if(order.addContent) this.addContent = order.addContent;
        if(order.remarks) this.remarks = order.remarks;
        if(order.type) this.type = order.type;
        if(order.shows) this.shows = order.shows;
        if(order.size) this.size = order.size;
        if(order.location) this.location = order.location;
        if(order.files) this.files = order.files;
        if(order.fname) this.fname = order.fname;
        if(order.lname) this.lname = order.lname;
        if(order.email) this.email = order.email;
        if(order.phone) this.phone = order.phone;
     };
     
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
        addContent:"",
        remarks:"",
        type:[],
        shows:[],
        size:"",
        location:"",
        files: [],
        fname: "",
        lname: "",
        email: "",
        phone: ""
    };



    $scope.orderSummary = function(chek) {
        
        for (var i=0; i<$scope.chek.length; i++) {
            if (!!chek[i].selected) $scope.order.shows.push(chek[i].name);
            if (chek[i].shows !==null & chek[i].shows > 0) $scope.order.shows.push({type: chek[i].name, shows: chek[i].shows});
        }

        let order = new Order($scope.order);  
        console.log(order);
        console.log(order.files.length+" files selected ... Write your Upload Code"); 
    }




      $scope.getSize = function(size) {
          $scope.order.size = size;
      };

      $scope.getLocation = function(size) {
        $scope.order.location = location;
    };



 });