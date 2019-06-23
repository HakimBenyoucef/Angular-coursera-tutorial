(function() {
  "use strict";

  var toBuyMessage = "Everything is bought!";
  var boughtMessage = "Nothing bought yet.";
  var initialList = [
    {
      name: "Onion",
      quantity: "5"
    },
    {
      name: "Milk",
      quantity: "3"
    },
    {
      name: "Potatos",
      quantity: "10"
    },
    {
      name: "Fish",
      quantity: "6"
    },
    {
      name: "Donuts",
      quantity: "2"
    }
  ];
  angular
    .module("module2App", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;

    toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyCtrl.bought = function(name, quantity, index) {
      ShoppingListCheckOffService.addToBought(name, quantity);
      ShoppingListCheckOffService.removeFromToBuy(index);
      if (toBuyCtrl.items.length === 0) {
        toBuyCtrl.message = toBuyMessage;
      }
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtCtrl = this;

    boughtCtrl.items2 = ShoppingListCheckOffService.getBoughtItems();
    
    boughtCtrl.messageBought = boughtMessage;
    
    
  }
  function ShoppingListCheckOffService() {
    let service = this;
    let toBuyItems = initialList;
    let boughtItems = [];

    let message = boughtMessage;

    service.addToBought = function(name, quantity) {
      let item = {
        name: name,
        quantity: quantity
      };

      boughtItems.push(item);
    };

    service.removeFromToBuy = function(index) {
      toBuyItems.splice(index, 1);
    };

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.getMessage = function() {
      return message;
    };

    service.clearMessage = function() {
      message = "";
    };
  }
})();
