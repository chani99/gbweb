(function() {

  "use strict";

  var App = angular.module("App.services",[]);

  App.value('version', '0.1');

  // here is a declaration of simple utility function to know if an given param is a String.
  App.service('UtilSrvc', function($http) {

    this.getValuesFromServer = function(params, path, onSuccess, onError) {
        $http({
            url: 'http://localhost:8081'+path,
            method: 'GET',
            params: {
              params: params
            }
        }).then(onSuccess, onError);
    }


    this.setNorthwind = function(data, onSuccess, onError) {
        $http({
            url: 'http://localhost:8081',
            method: 'POST',
            params: {
                tableName: data.tableName,
                data:data
            }
        }).then(onSuccess, onError);
    }
});

//   App.service("UtilSrvc", function () {
    
//     return {
//       isAString: function(o) {
//           return typeof o == "string" || (typeof o == "object" && o.constructor === String);
//       },
//       helloWorld : function(name) {
//       	var result = "Hum, Hello you, but your name is too weird...";
//       	if (this.isAString(name)) {
//       		result = "Hello, " + name;
//       	}
//       	return result;
//       }
//     }
//   });

}());