(function() 
{
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope)
  {
    $scope.menu = ""
    $scope.message = ""
    $scope.state = ""
    
    $scope.check = function()
    {
      var foods = splitAndClean($scope.menu);
      console.log(foods)
      
      if (foods.length == 0)
      {
        $scope.message = "Please enter data first"
        $scope.state = "error"
      }
      else if (foods.length > 3)
      {
        $scope.message = "Too much!"
        $scope.state = "success"
      }
      else
      {
        $scope.message = "Enjoy!"
        $scope.state = "success"
      }
    }

    /*
     * The following function split a string separated by comma, 
     * and remove empty substrings
     */
    function splitAndClean (string) {
      return string.split(',')
      .filter(x => x.trim() !== "").map(x => x.trim());
    }
  }
})();
