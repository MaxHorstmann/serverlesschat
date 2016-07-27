angular.module('app')
.controller('HomeCtrl', ['$scope', 'auth', 'store', '$firebaseObject', '$firebaseArray', homeCtrlFunc]);

function homeCtrlFunc($scope, auth ,store, $firebaseObject, $firebaseArray){
    $scope.auth = auth;

    $scope.logout = function() {
    	$scope.name='';
    	auth.signout(); // TODO doesn't work
    	
    };

    $scope.sendMessage = function() {
    	if (!auth.isAuthenticated) {
	        auth.signin(); 
    	} else {

            var newUser = {
                userId : $scope.userId,
                name : $scope.name
            };

            $scope.users.$add(newUser); // TODO only if doesn't exist yet

    		var msg = {
                userId : $scope.userId,
                name: $scope.name,
    			message: $scope.nextMessage
    		};
    		$scope.messages.$add(msg);
    		$scope.nextMessage = '';
    	}        
    };

  $scope.messages = $firebaseArray(firebase.database().ref().child("messages"));
  $scope.users = $firebaseArray(firebase.database().ref().child("users"));

}
