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
    		var msg = {
    			name: $scope.name,
    			message: $scope.nextMessage
    		};
    		$scope.messages.$add(msg);
    		$scope.nextMessage = '';
    	}        
    };

  var ref = firebase.database().ref().child("messages");
  $scope.messages = $firebaseArray(ref);

}
