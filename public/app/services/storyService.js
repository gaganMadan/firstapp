angular.module('storyService', [])

.factory('Story', function($http){

    var storyFactory = {};

     storyFactory.allStories = function(content){
          return $http({
            method: 'GET',
            url: '/api/all_stories',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        })
     }

    storyFactory.create = function(content){
         return $http({
            method: 'POST',
            url: '/api',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {content}
        })
    }

    storyFactory.allStory = function(){
         return $http({
            method: 'GET',
            url: '/api',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        })
    }

    return storyFactory;
})

.factory('socketio', function($rootScope){

    var socket = io.connect();
    return {
        on : function(eventName, callback){
            socket.on(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                })
            })
        },
        emit : function(eventName, data, callback){
            socket.emit(eventName, data, function(){
                var args = arguments;
                $rootscope.apply(function(){
                    if(callback){
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };

});