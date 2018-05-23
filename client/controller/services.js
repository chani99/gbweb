(function () {

    "use strict";

    var App = angular.module("App.services", []);

    App.value('version', '0.1');

    // here is a declaration of simple utility function to know if an given param is a String.
    App.service('UtilSrvc', function ($http) {

        this.getValuesFromServer = function (params, path, onSuccess, onError) {
            $http({
                url: 'http://localhost:8081' + path,
                method: 'GET',
                params: {
                    params: params
                }
            }).then(onSuccess, onError);
        }


        this.setNorthwind = function (data, onSuccess, onError) {
            $http({
                url: 'http://localhost:8081',
                method: 'POST',
                params: {
                    tableName: data.tableName,
                    data: data
                }
            }).then(onSuccess, onError);
        }
    });

    App.service("validate", function () {

        this.validateForm = function (data) {
            switch (data.type) {
                case "textarea":
                    if (data.content) {
                        if (/[^a-zA-Z0-9 א-ת$&*"'-_]/.test($(data.content).val())) {
                            return (true);
                        } else {
                            return (false);
                        }
                    } else {
                        return (true);
                    }

                    break;
                case "shows":
                    {
                        if (data.content.length >0) {
                            for (var i = 0; i < data.content.length; i++) {
                                let show = data.content[i];
                                if (show.shows < 1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        } else {
                            return true;

                        }

                    }
                    break;
                    case "shows":
                    {
                        if (data.content.length >0) {
                            for (var i = 0; i < data.content.length; i++) {
                                let show = data.content[i];
                                if (show.shows < 1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        } else {
                            return true;

                        }

                    }
                    break;

                case "free":
                    let searchWords = ["למכירה", "להשכרה", "מחיר", "במחיר סמלי", "בתשלום סמלי","sale","מכירה"];
                    let test = false;
                    for (i = 0; i < searchWords.length; i++) {
                        let word = searchWords[i];
                        var n = data.content.search(word);
                        if (n > -1) {
                            test = true;
                            break;
                        }
                    }
                    if (test) {
                        return false;
                    } else {
                        return true;
                    }
                    break;
            }

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