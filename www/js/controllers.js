var firebaseUrl = "https://simplechatroom.firebaseio.com";

angular.module('mychat.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, $rootScope, $firebaseAuth) {
  console.log('Login Controller Initialized');
  //console.log($rootScope.FIREBASE_URL);

  var ref = new Firebase(firebaseUrl);
  var auth = $firebaseAuth(ref);

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.createUser = function(user) {
    console.log("Create User Function called");
        if (user && user.email && user.password && user.displayname) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (userData) {
                alert("User created successfully!");
                ref.child("users").child(userData.uid).set({
                    email: user.email,
                    displayName: user.displayname
                });
                $ionicLoading.hide();
                $scope.modal.hide();
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Please fill all details");

  }

  $scope.signIn = function() {
    $state.go('tab.rooms');
  }
})

.controller('ChatCtrl', function($scope, Chats) {
  console.log('Chat Controller initialized');
  $scope.chats = Chats.all();
})

.controller('RoomsCtrl', function($scope, Rooms) {
  console.log('Rooms Controller initialized');
  $scope.rooms = Rooms.all();
});

