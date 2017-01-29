var myApp = angular.module('myApp', []);

myApp.controller('productController', productController);

function productController($scope, $http){
    $http.get('/api/products').success(function( response ){
            console.log(response);
           //$scope.product = Json.parse(response.name);
    });
};