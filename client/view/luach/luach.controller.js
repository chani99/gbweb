 App.controller("luachCtrl", function($scope) {

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

     $scope.type = [
        " רגיל (ללא תוספת תשלום)",
        "מודגש",
        "נגטיב"
    ];
    
    $scope.section = [
        "דירות למכירה",
        "דירות להשכרה",
        "דירות קייט",
        "מסחר",
        "דרושים",
        "מכירות",
        "הסעות",
        "שירותים וביקוש עבודה"
    ];
    

     $scope.order = {
        addContent: "",
        remarks: "",
        type: [],
        shows: [],
        size:"",
        location: "",
        files: [],
        fname: "",
        lname: "",
        email: "",
        phone: ""
    };


    $scope.orderSummary = function(chek) {
        for (var i=0; i<$scope.chek.length; i++) {
            if (!!chek[i].selected) $scope.order.type.push(chek[i].name);
            if (chek[i].shows !==null & chek[i].shows > 0) $scope.order.shows.push({type: chek[i].name, shows: chek[i].shows});
        }
        let order = new Order($scope.order);  
        console.log(order);
        console.log(order.files.length+" files selected ... Write your Upload Code"); 
    }





 });