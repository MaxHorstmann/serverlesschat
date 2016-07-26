angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute', 'firebase'])
.config(['$routeProvider', 'authProvider', configFunction])
.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', runFunction]);

function configFunction($routeProvider, authProvider){
  $routeProvider
    .when( '/', {
      controller: 'HomeCtrl',
      templateUrl: 'home/home.html',
      requiresLogin: false
    });

    authProvider.init({
          domain: 'maxhorstmann.auth0.com',
          clientID: 'WDEmnAHd78R0th9837oyAZgZzRmHmTn4'
        });
  }

function runFunction ($rootScope, auth, store, jwtHelper, $location){

  var saveUserInfo = function(profile, token) {
    store.set('profile', profile);
    store.set('token', token);
    $rootScope.name = profile.name;
  };

  auth.lockOn("authenticated", function(authResult) {
    auth.getProfile(authResult.idToken).then(function (profile) {
      saveUserInfo(profile, authResult.idToken);
    })
  });

  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          var profile = store.get('profile');
          auth.authenticate(profile, token);
          $rootScope.name = profile.name;
        }
      } 
    }
  });

  // Initialize the Firebase SDK
  var config = {
    apiKey: "AIzaSyCqnZoaLPHj6tMCT4EbXKZNwSATq4QRKoU",
    authDomain: "cloud-vision-1238.firebaseapp.com",
    databaseURL: "https://cloud-vision-1238.firebaseio.com",
    storageBucket: "cloud-vision-1238.appspot.com",
  };
  firebase.initializeApp(config);

}
