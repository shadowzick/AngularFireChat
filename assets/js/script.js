var app = angular.module('app', ['firebase']);

app.controller('mainController', function($scope, $firebase) {
  $scope.title = 'A simple chat application.';
  $scope.disabled = true;
  $scope.isNotDisabled = false;
  $scope.date = new Date().toDateString();

  var username = '';
  var ref = new Firebase("https://chat-app1.firebaseio.com/");

  $scope.comments = $firebase(ref).$asArray();

  $scope.addUsername = function(e) {
    if (e.keyCode != 13) return;

    if ($scope.username) {
      username = $scope.username;
      $scope.disabled = false;
    }
  }

  $scope.addComment = function(e) {
    if (e.keyCode != 13) return;

    submitData();
  }

  $scope.send = function(e) {
    alert('Just press enter mate!');
    submitData();
  }

  function submitData() {
      $scope.comments.$add({
        from: username,
        body: $scope.newComment,
        date: $scope.date
      });

    $scope.newComment = '';
  }

});

app.directive('ngFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);
            
            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngFocusLost ) ) {
                    scope.$apply( attrs.ngFocusLost );
                    
                }
            });
        }
    };
});