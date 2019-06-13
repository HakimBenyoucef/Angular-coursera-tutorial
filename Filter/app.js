(function() {
  'use strict';

  angular.module('myFirstApp', [])
  .controller('MyFilterController', MyFilterController)
  .filter("myFilterName", changeNameFilter)
  .filter("truth", truthFilter);
  
  MyFilterController.$inject = ['$scope', 'myFilterNameFilter']
  function MyFilterController($scope, myFilterNameFilter)
  {
    $scope.phrase = "Hakim learns Angular"
    $scope.original = "Hakim learn Angular"
    
    $scope.sayBen = function()
    {
      $scope.phrase = myFilterNameFilter($scope.phrase)
    } 

  }

    function changeNameFilter()
    {
      return function(input)
      {
        input = input || "";
        input = input.replace("Hakim", "Benyoucef")
        return input;
      }
    } 

    function truthFilter()
    {
      return function(input, target, replace)
      {
        input = input || "";
        input = input.replace(target, replace)
        return input;
      }
    }
})();
