(function() {
  'use strict';

  angular.module('myFirstApp', [])
  .controller('MyFirstController', function($scope){
    $scope.name = ""
    $scope.resultValue = 0
    
    $scope.display = function()
    {
      var value = bind($scope.name);
      $scope.resultValue = value
    }

    function bind (string) {
      var result = 0;
      for (let i=0; i<string.length; i++)
      {
        result += string.charCodeAt(i)
      }
      return result
    }

  });
})();
