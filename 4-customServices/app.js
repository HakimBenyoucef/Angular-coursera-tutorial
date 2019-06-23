(function() {
  'use strict';

  angular.module('customServiceApp', [])
  .controller('ShoppingListAddController', ShoppingListAddController)
  .controller('ShoppingListShowController', ShoppingListShowController)
  .service('ShoppingListService', ShoppingListService);
  
  ShoppingListAddController.$inject = ['ShoppingListService'];
  function ShoppingListAddController(ShoppingListService)
  { 
    let addItemCtlr = this;

    addItemCtlr.name = "";
    addItemCtlr.quantity = ""

    addItemCtlr.addItem = function(){
      ShoppingListService.addItem(addItemCtlr.name, addItemCtlr.quantity);
    }
    
  }


  ShoppingListShowController.$inject = ['ShoppingListService'];
  function ShoppingListShowController(ShoppingListService)
  {
    let showItemsCtrl = this;
    showItemsCtrl.items = ShoppingListService.getItems();

    showItemsCtrl.removeItem = function(index){
      ShoppingListService.removeItem(index); 
    }
  }

  function ShoppingListService()
  {
    let service = this;
    let items = [];

    service.addItem = function(name, quantity){
      let item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    }

    service.getItems = function(){
      return items;
    }

    service.removeItem = function(index){
      items.splice(index, 1);
    }
  }
})();
