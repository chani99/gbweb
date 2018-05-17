    var App = angular.module("App", [
        "App.controllers",
        "App.services",
        "App.directives",
        "App.filters",
        "ngRoute",
        "ngResource"
    ]);

(function() {

    "use strict";


    App.config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'view/home/home.html'
            })
            .when('/contact', {
                templateUrl: 'view/contact/contact.html'
            })
            .when('/about', {
                templateUrl: 'view/about/about.html'
            })
            .when('/order', {
                templateUrl : 'view/order/order.html',
                controller: 'OrderCtrl'
            })
            .when('/book', {
                templateUrl: 'view/flipbook/flipbook.html'
            })
            .when('/magazines', {
                templateUrl: 'view/papers/papers.html'
            })
            .when('/luach', {
                templateUrl: 'view/luach/luach.html',
                controller: 'luachCtrl'
            })



        .otherwise({ redirectTo: 'home' });
    });


    var selector = '.nav li';

}());