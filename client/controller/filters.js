(function () {

  "use strict";

  var App = angular.module("App.filters",[]);

  App.filter('interpolate', function (version) {
    return function(text) {
       return String(text).replace(/\%VERSION\%/mg, version);
     }
  });

  //filter for credit card validation
App.filter("yesNo", function() {
  return function(boolean) {
      return boolean ? "Yes" : "No";
  }
})
  // just copy paste the example above to add more filters

}());