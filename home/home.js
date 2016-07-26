angular.module('app')
.controller('HomeCtrl', ['$scope', 'auth', 'store', homeCtrlFunc]);

function homeCtrlFunc($scope, auth ,store){
    $scope.auth = auth;

    $scope.messages = ["John: Hi!", "Alice: Hello there!"]; // TODO bind to Firebase

    $scope.logout = function() {
    	$scope.name='';
    	auth.signout();
    	
    };

    $scope.sendMessage = function() {
    	if (!auth.isAuthenticated) {
	        auth.signin(); // TODO doesn't work
    	} else {
    		alert($scope.nextMessage);
    		$scope.nextMessage='';
    	}        
    };
}
