// Ionic Starter App
var FIREBASE_URL = "https://simplechatroom.firebaseio.com";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mychat', ['ionic', 'mychat.controllers', 'mychat.services', 'firebase'])

.run(function ($ionicPlatform, $rootScope) {
     $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar          above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
             if(window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
             }

    $rootScope.logout = function () {
        console.log("Logging out from the app");
    }
    });
    
 })

 .factory("Auth", ["$firebaseAuth", "$rootScope", 
    function($firebaseAuth, $rootScope) {
        var ref = new Firebase(FIREBASE_URL);
        return $firebaseAuth(ref);
 }])

    
.config(function ($stateProvider, $urlRouterProvider) {

// Ionic uses AngularUI Router which uses the concept of states
// Learn more here: https://github.com/angular-ui/ui-router
// Set up the various states which the app can be in.
// Each state's controller can be found in controllers.js
$stateProvider

// State to represent Login View
.state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
})

// setup an abstract state for the tabs directive
.state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
})

// Each tab has its own nav history stack:

.state('tab.rooms', {
    url: '/rooms',
    views: {
        'tab-rooms': {
            templateUrl: 'templates/tab-rooms.html',
            controller: 'RoomsCtrl'
        }
    }
})

.state('tab.chat', {
    url: '/chat',
    views: {
        'tab-chat': {
            templateUrl: 'templates/tab-chat.html',
            controller: 'ChatCtrl'
        }
    }
})

       // if none of the above states are matched, use this as the fallback
       $urlRouterProvider.otherwise('/login');

     });