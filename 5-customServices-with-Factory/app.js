(function() {
  "use strict";

  angular
    .module("customServiceFactoryApp", [])
    .controller("ShoppingList1Controller", ShoppingList1Controller)
    .controller("ShoppingList2Controller", ShoppingList2Controller)
    .factory("ShoppingListFactory", ShoppingListFactory);

  ShoppingList1Controller.$inject = ["ShoppingListFactory"];
  function ShoppingList1Controller(ShoppingListFactory) {
    let list1 = this;

    let shoppingListService = ShoppingListFactory();
    list1.name = "";
    list1.quantity = "";

    list1.items = shoppingListService.getItems();

    list1.addItem = function() {
      shoppingListService.addItem(list1.name, list1.quantity);
    };

    list1.removeItem = function(index) {
      shoppingListService.removeItem(index);
    };
  }

  ShoppingList2Controller.$inject = ["ShoppingListFactory"];
  function ShoppingList2Controller(ShoppingListFactory) {
    let list2 = this;

    let shoppingListService = ShoppingListFactory(3);
    list2.name = "";
    list2.quantity = "";

    list2.error = "";

    list2.items = shoppingListService.getItems();

    list2.addItem = function() {
      try {
        shoppingListService.addItem(list2.name, list2.quantity);
      } catch (error) {
        list2.error = error.message;
      }
    };

    list2.removeItem = function(index) {
      shoppingListService.removeItem(index);
    };
  }

  function ShoppingListService(maxItems) {
    let service = this;
    let items = [];

    service.addItem = function(name, quantity) {
      if (
        maxItems === undefined ||
        (maxItems !== undefined && items.length < maxItems)
      ) {
        let item = {
          name: name,
          quantity: quantity
        };
        items.push(item);
      }else{
        throw new error("Max items ("+maxItems+") reached");
      }
    };

    service.getItems = function() {
      return items;
    };

    service.removeItem = function(index) {
      items.splice(index, 1);
    };
  }

  function ShoppingListFactory() {
    let factory = function(maxItems) {
      return new ShoppingListService(maxItems);
    };
    return factory;
  }
})();
