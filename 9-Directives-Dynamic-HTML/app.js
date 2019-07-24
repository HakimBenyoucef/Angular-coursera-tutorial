(function() {
  'use strict';
  
  angular.module('ShoppingListDirectiveApp', [])
  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .service('ShoppingListService', ShoppingListService)
  .directive('listItemDescription', ListItemDescription)
  .directive('listItem', ListItem);
  
  function ListItem(){
    let ddo = {
      templateUrl: "listItem.html"
    }
    return ddo;
  }
  
  function ListItemDescription() {
    let ddo = {
      template: "{{item.quantity}} of {{item.name}}"
    }
    return ddo;
  }

  ShoppingListController1.$inject = ['ShoppingListService']
  function ShoppingListController1(ShoppingListService)
  {
    let list = this;

    list.errorMessage = "";
    list.itemName ="";
    list.itemQuantity="";
    
    list.items = []

    list.addItem = function(){
      let item = {
        name: list.itemName,
        quantity: list.itemQuantity
      }
      ShoppingListService.addItem(list.items, item, false);
    }

    list.removeItem = function(index)
    {
      ShoppingListService.removeItem(list.items, index);
    }
  }

  ShoppingListController2.$inject = ['ShoppingListService']
  function ShoppingListController2(ShoppingListService)
  {
    let list = this;
    
    list.errorMessage = "";
    list.itemName ="";
    list.itemQuantity="";
    
    list.items = []

    list.addItem = function(){
      let item = {
        name: list.itemName,
        quantity: list.itemQuantity
      }
      list.errorMessage = ShoppingListService.addItem(list.items, item, true);
    }

    list.removeItem = function(index)
    {
      ShoppingListService.removeItem(list.items, index);
    }
  }

  function ShoppingListService()
  {
    let service = this;

    service.addItem = function(items, item, check){
      if (check === true && items.length < 3 || check === false)
      {
          items.push(item)
      }
      else 
      {
        return "Maximum 3 articles";
      }
    }

    service.removeItem = function(items, index){
      items.splice(index, 1);
    }
  }

})();
