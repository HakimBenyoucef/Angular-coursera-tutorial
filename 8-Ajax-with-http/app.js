(function() {
  "use strict";

  angular
    .module("MenuCategoriesApp", [])
    .controller("MenuCategoriesController", MenuCategoriesController)
    .service("MenuCategoriesService", MenuCategoriesService)
    .constant("ApiPath", "http://davids-restaurant.herokuapp.com");
  
  MenuCategoriesController.$inject = ['MenuCategoriesService']
  function MenuCategoriesController(MenuCategoriesService)
  {
    let menu = this;

    let promise = MenuCategoriesService.getMenuCategories();

    promise.then(function(response){
      menu.categories = response.data;
    })
    .catch(function(error){
      console.log("something went wrong");
    });

    menu.logMenuItems = function(shortName){
      let promise = MenuCategoriesService.getMenuForCategory(shortName);

      promise.then(function(response){
        console.log(response.data);
      })
      .catch(function (error){
        console.log(error);
      })
    };
  }

  MenuCategoriesService.$inject = ['$http', 'ApiPath']
  function MenuCategoriesService($http, ApiPath)
  {
    let service = this;

    service.getMenuCategories = function (){
      let response = $http({
        method: "GET",
        url: (ApiPath +"/categories.json" )
      });

      return response;
    };

    service.getMenuForCategory = function(shortName)
    {
      let response = $http({
        method: "GET",
        url: (ApiPath +"/menu_items.json"),
        params: {
          category: shortName
        }
      });

      return response;
    }
  }



})();
