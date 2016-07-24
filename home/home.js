angular.module('app')
.controller('HomeCtrl', ['$scope', 'auth', 'store', homeCtrlFunc]);

function homeCtrlFunc($scope, auth ,store){
    $scope.auth = auth;

    $scope.messages = ["John: Hi!", "Alice: Hello there!"];
    
    $scope.sendMessage = function() {
        alert($scope.nextMessage);
    }
}
