angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute'])
.config(['$routeProvider', 'authProvider', configFunction])
.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', runFunction]);

function configFunction($routeProvider, authProvider){
  // Configure routes for your application
  $routeProvider
    .when( '/', {
      controller: 'HomeCtrl',
      templateUrl: 'home/home.html',
      requiresLogin: false
    });

    //Configure Auth0
    authProvider.init({
          domain: 'maxhorstmann.auth0.com',
          clientID: 'WDEmnAHd78R0th9837oyAZgZzRmHmTn4'
        });
  }

function runFunction ($rootScope, auth, store, jwtHelper, $location){
  // Wrapper function to handle profile and toke storage
  var saveUserInfo = function(profile, token) {
    console.log(profile);
    store.set('profile', profile);
    store.set('token', token);
  };
  // Called when lock shows
  auth.lockOn('show', function () {
    //alert('shown');
  });
  // Called when lock hides
  auth.lockOn('hide', function () {
    //alert('hidden');
  });
  // Called when authentication is successful
  auth.lockOn("authenticated", function(authResult) {
    console.log(authResult);
    auth.getProfile(authResult.idToken).then(function (profile) {

      console.log(profile);
      // Save user info to local storage
      saveUserInfo(profile, authResult.idToken);
    })
  });
  // Called when authentication fails
  auth.lockOn("error", function(error) {
    console.log(error);
  });
  // Listen to a location change event
  $rootScope.$on('$locationChangeStart', function() {
    // Grab the user's token
    var token = store.get('token');
    // Check if token was actually stored
    if (token) {
      // Check if token is yet to expire
      if (!jwtHelper.isTokenExpired(token)) {
        // Check if the user is not authenticated
        if (!auth.isAuthenticated) {
          // Re-authenticate with the user's profile
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Show the login page
        $location.path('/login');
      }
    }

  });
}
