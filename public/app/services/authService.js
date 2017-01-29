angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken){
    var authFactory = {};

    authFactory.login = function(username, password){
       return $http({
            method: 'POST',
            url: '/api/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: username, password:password}
        })
       .then(function(data){
            AuthToken.setToken(data.data.token);
            return data;
        })
    }

    authFactory.logout = function(){
        AuthToken.setToken();
    }

    authFactory.isLoggedIn = function(){
        if(AuthToken.getToken())
            return true;
        else 
            return false;
    }

    authFactory.getUser = function(){
        if(AuthToken.getToken())
            return $http({
                method: 'GET',
                url: '/api/me',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            })
            //return $http.get('/api/me');
        else
            return $q.reject({ message: "User has no Token"});
    }

    return authFactory; 
})

.factory('AuthToken', function($window){
    var authTokenFactory = {};

    authTokenFactory.getToken = function(){
        return $window.localStorage.getItem('token');
    };

    authTokenFactory.setToken = function(token){
        if(token)
            $window.localStorage.setItem('token', token);
        else
            $window.localStorage.removeItem('token');
    };

    return authTokenFactory;
})

.factory('AuthInterceptor', function($q, $location, AuthToken){
    var interceptorFactory = {};

    interceptorFactory.request = function(config){

        var token = AuthToken.getToken();

        if(token){
            config.headers['x-access-token'] = token;
        }

        return config;

    };

    // interceptorFactory.responseError = function(response){

    //     if(response.status == 403)
    //         $location.path('/login');

    //     return $q.reject(response);
    
    // };

    return interceptorFactory;
});



