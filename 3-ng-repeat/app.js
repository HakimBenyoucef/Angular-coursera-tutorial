(function() {
  'use strict';
  var shoppingList1 = ['Onion', 'Milk', 'Potatos', 'Fish', 'Donuts'];
  var shoppingList2 = [
    {
      name: 'Onino',
      quantity: '5'
    },
    {
      name: 'Milk',
      quantity: '3'
    },
    {
      name: 'Potatos',
      quantity: '10'
    },
    {
      name: 'Fish',
      quantity: '6'
    },
    {
      name: 'Donuts',
      quantity: '2'
    }
  ];
  
  angular.module('NgRepeatApp', [])
  .controller('ShoppingListController', ShoppingListController);
  
  ShoppingListController.$inject = ['$scope']
  function ShoppingListController($scope)
  {
    $scope.shoppingList1 = shoppingList1;
    $scope.shoppingList2 = shoppingList2 

    $scope.addItem = function(){
      var item = {
        name: $scope.newItemName,
        quantity: $scope.newItemQuantity
      }
      $scope.shoppingList2.push(item);
    }
  }

})();
