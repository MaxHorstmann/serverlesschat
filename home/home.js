angular.module('app')
.controller('HomeCtrl', ['$scope', 'auth', 'store', homeCtrlFunc]);

function homeCtrlFunc($scope, auth ,store){
    $scope.auth = auth;

    $scope.messages = ["John: Hi!", "Alice: Hello there!"]; // TODO bind to Firebase

    $scope.sendMessage = function() {
        auth.signin(); // TODO only if necessary
        //alert($scope.nextMessage);
    }
}
