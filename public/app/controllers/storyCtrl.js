angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){

     var vm = this;

     Story.allStory()
          .then(function(data){
              vm.stories = data;
          });
    
    vm.createStory = function(){
        vm.processing = true;

        Story.create(vm.storyData.content)
             .then(function(data){

                 vm.processing = false;
                 // clear up the form 
                  vm.storyData = '';

                  vm.message = data.message;

                  
             });

         
    };


    socketio.on('story', function(data){
        vm.stories.data.push(data);
    }); 

})

.controller('AllStoriesController', function(stories, socketio){
    var vm = this;

    vm.stories = stories.data;

     socketio.on('story', function(data){
        vm.stories.push(data);
    });
});