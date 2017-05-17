const app = angular.module('ChatApp', []);

// CONTROLLER 1  |  Messages Controller 
app.controller('MessagesController', function($scope, ChatService){

    $scope.conversation = ChatService.getChats();

});

// CONTROLLER 2  |  Input Controller 
app.controller('InputController', function($scope, ChatService){

    $scope.send = function (msg){
        ChatService.postChat();
        $scope.conversation = ChatService.getChats();

    };
});

// CHAT SERVICE FACTORY
app.factory('ChatService', function($http){

    let chats = [];

    $http.get('https://tiy-28202.herokuapp.com/chats').then(function (response) {

        let messages = response.data.chats;

        for(let i = 0; i < messages.length; i++){
            chats.push({
                from: messages[i].from,
                content: messages[i].message,
                id: messages[i].id,
                time: moment(messages[i].added).format('LLL'),
            });
        };

    });

    return {
        getChats(){
            return chats;
        },

        postChat(){

            let data = {
                from: document.getElementById("name").value,
                message: document.getElementById("msg").value,
            }

            $http.post('https://tiy-28202.herokuapp.com/chats', JSON.stringify(data)).then(function (response) {

                    chats.push({
                        from: data.from,
                        content: data.message,
                    });

                    console.log('hello');

            });
        },
    };
});

