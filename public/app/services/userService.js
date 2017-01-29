            angular.module('userService', [])

.factory('User', function($http){
    var userFactory = {};

    userFactory.create = function(name, username, password){
         return $http({
            method: 'POST',
            url: '/api/signup',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {name:name,username: username, password:password}
        });      
    }

    userFactory.all = function(){
        return $http({
            method: 'GET',
            url: '/api/users',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
       }); 
        //return $http.get('/api/users');
    }

    return userFactory;
});