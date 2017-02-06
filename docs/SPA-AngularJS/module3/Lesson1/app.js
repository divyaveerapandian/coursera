(function () {
'use strict';

    var app =angular.module('shoppingAndMenuApp',[]);
    app.controller('ShoppingListController',ShoppingListController)
    .service('ShoppingListService',ShoppingListService)
    .service('ValidationService',ValidationService);

/***Regular way w/o Promises***/
    // ShoppingListController.$inject=['ShoppingListService'];
    // function ShoppingListController(ShoppingListService) {
    //   var list =this;
    //   list.itemName="";
    //   list.itemQuantity="";
    //   list.items = ShoppingListService.getItems();
    //   list.addItem=function () {
    //     list.items = ShoppingListService.addItem(list.itemName,list.itemQuantity);
    //   };
    //   list.removeItem =function (index) {
    //     ShoppingListService.removeItem(index);
    //   }
    // };
    //
    // function ShoppingListService() {
    //   var service = this;
    //   var items = [];
    //
    //   service.addItem = function(itemName,itemQuantity) {
    //     var item = {
    //       name : itemName,
    //       quantity : itemQuantity
    //     }
    //     items.push(item);
    //     return items;
    //   };
    // };

/*** With Promises ***/

    ShoppingListController.$inject=['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
      var list =this;
      list.itemName="";
      list.itemQuantity="";

      list.items = ShoppingListService.getItems();
      list.addItem=function () {
        ShoppingListService.addItem(list.itemName,list.itemQuantity);
      };
      list.removeItem =function (index) {
        ShoppingListService.removeItem(index);
      }
    };
    // ShoppingListService.$inject = ['$q','ValidationService']
    // function ShoppingListService($q,ValidationService) {
    //   var service = this;
    //   var items = [];
    //
    //   service.addItem = function(itemName,itemQuantity) {
    //     var promise = ValidationService.checkName(itemName);
    //
    //     promise.then(function(response) {
    //       var nextPromise = ValidationService.checkQuantity(itemQuantity);
    //       nextPromise.then(function (response) {
    //           var item = {
    //             name : itemName,
    //             quantity : itemQuantity
    //           };
    //           items.push(item);
    //           service.items = items;
    //
    //       },function (errorResponse) {
    //         console.log(errorResponse.message);
    //       })
    //     },function (errorResponse) {
    //       console.log(errorResponse.message);
    //     })
    //   };
    //
    //   service.getItems = function () {
    //     return items;
    //   };
    //
    //   service.removeItem = function (index) {
    //     items.splice(index,1);
    //   };
    // };

    ValidationService.$inject=['$q','$timeout'];
    function ValidationService($q,$timeout) {
        var validation = this;
        validation.checkName = function (itemName){
          var deferred = $q.defer();
          var result = {
            message : ""
          }
          $timeout(function () {
            if(itemName.toLowerCase().indexOf("cookie")===-1){
               deferred.resolve(result);
            }
            else {
               result.message = "Name of item is cookies - that is not allowed in list";
               deferred.reject(result);
            }
          },3000);
          return deferred.promise;
        }

        validation.checkQuantity= function(itemQuantity){
            var deferred = $q.defer();
            var result = {
              message : ""
            }
            $timeout(function () {
               if(itemQuantity < 6){
                 deferred.resolve(result);
               }
               else {
                 result.message = "Number of cookies is greater than 5 - above max limit";
                 deferred.reject(result);
               }
            }, 1000);
            return deferred.promise;
        };
    };

    /*** With Promises  in better way===> using catch***/

    // ShoppingListService.$inject = ['$q','ValidationService']
    // function ShoppingListService($q,ValidationService) {
    //   var service = this;
    //   var items = [];
    //
    //   service.addItem = function(itemName,itemQuantity) {
    //     var promise = ValidationService.checkName(itemName);
    //
    //     promise
    //     .then(function(response) {
    //       return ValidationService.checkQuantity(itemQuantity);
    //     })
    //     .then(function (response) {
    //           var item = {
    //             name : itemName,
    //             quantity : itemQuantity
    //           };
    //           items.push(item);
    //           service.items = items;
    //       })
    //       .catch(function (errorResponse) {
    //       console.log(errorResponse.message);
    //     }) ;
    //   };
    //
    //   service.getItems = function () {
    //     return items;
    //   };
    //
    //   service.removeItem = function (index) {
    //     items.splice(index,1);
    //   };
    // };

      /*** With Promises running both validations parallely===> using catch and $q.all***/


      ShoppingListService.$inject = ['$q','ValidationService']
      function ShoppingListService($q,ValidationService) {
        var service = this;
        var items = [];

        service.addItem = function(itemName,itemQuantity) {
          var namePromise = ValidationService.checkName(itemName);
          var quantityPromise =ValidationService.checkQuantity(itemQuantity);
          $q.all([namePromise,quantityPromise])
          .then(function (response) {
                var item = {
                  name : itemName,
                  quantity : itemQuantity
                };
                items.push(item);
                service.items = items;
            })
            .catch(function (errorResponse) {
            console.log(errorResponse.message);
          }) ;
        };

        service.getItems = function () {
          return items;
        };

        service.removeItem = function (index) {
          items.splice(index,1);
        };
      };


/***********Menu Category Task***************/
    app.controller('MenuCategoriesController',MenuCategoriesController)
    .service('MenuCategoriesService',MenuCategoriesService);

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;
        var promise = MenuCategoriesService.getMenuCategory();
        promise.then(function (result) {
          menu.categories = result.data;
        }).
        catch(function(error) {
          console.log("Something went terribly wrong.");
        })

        menu.logMenuItems =function (shortName) {
          var promise = MenuCategoriesService.logMenuItems(shortName);
          promise
          .then(function (result) {
            menu.singleCategory = result.data;
          })
          .catch(function () {
            console.log("Some problem");
          });
        };//END logMenuItems
    };//END MenuCategoriesController

    MenuCategoriesService.$inject=['$http'];
    function MenuCategoriesService($http) {
        var service =this;

        service.getMenuCategory = function () {
         var result =  $http({
            method : "GET",
            url : "http://davids-restaurant.herokuapp.com/categories.json"
          });
          return result;
        };//END getMenuCategory

        service.logMenuItems =function (shortName) {
          var result =  $http({
             method : "GET",
             url : "http://davids-restaurant.herokuapp.com/menu_items.json",
             params : {
               category : shortName
             }
           });
           return result;
        };//END logMenuItems

    };//END MenuCategoriesService


})();
