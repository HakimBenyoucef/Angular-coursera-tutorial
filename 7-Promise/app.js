(function() {
  "use strict";

  angular
    .module("ShoppingListPromiseApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .service("ShoppingListService", ShoppingListService)
    .service("WeightLossFilterService", WeightLossFilterService);

  ShoppingListController.$inject = ["ShoppingListService"];
  function ShoppingListController(ShoppingListService) {
    var listCtrl = this;

    listCtrl.items = ShoppingListService.getItems();

    listCtrl.itemName = "";
    listCtrl.itemQuantity = "";

    listCtrl.addItem = function() {
      ShoppingListService.addItem(listCtrl.itemName, listCtrl.itemQuantity);
    };

    listCtrl.removeItem = function(index) {
      ShoppingListService.removeItem(index);
    };
  }

  ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
  function ShoppingListService($q, WeightLossFilterService) {
    let service = this;

    let items = [];

    service.addItem = function(name, quantity) {
      let namePromise = WeightLossFilterService.checkName(name);
      let quantityPromise = WeightLossFilterService.checkQuantity(quantity);

      $q.all([namePromise, quantityPromise]).
      then(function(response) {
        let item = {
          name: name,
          quantity: quantity
        };
        items.push(item);
      })
      .catch(function (errorResponse){
        console.log(errorResponse.message);
      })
    };

    service.getItems = function(){
      return items;
    } ;

    service.removeItem = function(index){
      items.splice(index, 1);
    };
  }

  WeightLossFilterService.$inject = ['$q', '$timeout']
  function WeightLossFilterService($q, $timeout)
  {
    let service = this;

    service.checkName = function(name)
    {
      let deferred = $q.defer();

      let result = {
        message: ""
      };

      $timeout(function () {
        if (name.toLowerCase().indexOf('cookie') === -1){
          deferred.resolve(result);
        }
        else {
          result.message = "Stay away from cookies, Hakim!"
          deferred.reject(result);
        }
      }, 3000);

      return deferred.promise;
    };

    service.checkQuantity = function(quantity)
    {
        let deferred = $q.defer();

        let result = {
          message: ""
        };

        $timeout(function () {
          if (quantity < 6){
            deferred.resolve(result);
          }
          else {
            result.message = "That's to much, Hakim!";
            deferred.reject(result);
          }
        }, 1000);

        return deferred.promise;

    };

  }
})();
