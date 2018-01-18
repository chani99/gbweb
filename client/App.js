(function() {

    "use strict";

    var App = angular.module("App", [
        "App.controllers",
        "App.services",
        "App.directives",
        "App.filters",
        "ngRoute",
        "ngResource"
    ]);

    App.config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'view/home/home.html'
            })
            .when('/contact', {
                templateUrl: 'view/contact/contact.html'
            })
            .when('/user', {
                templateUrl: 'view/costumer/costumer.html'
            })
            .when('/order', {
                templateUrl : 'view/order/order.html',
                css : 'view/order/order.css'
            })
            .when('/book', {
                templateUrl: 'view/flipbook/flipbook.html'
            })
            .when('/magazines', {
                templateUrl: 'view/papers/papers.html'
            })

        .otherwise({ redirectTo: 'home' });
    });


    var selector = '.nav li';

}());