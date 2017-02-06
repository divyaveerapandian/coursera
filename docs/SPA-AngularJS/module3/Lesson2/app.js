(function () {
  'use strict';

  angular.module('ShoppingListApp',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .controller('ShoppingListController2',ShoppingListController2)
  .controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .directive('listItemDescription',ListItemDescription)// restrict to "E"
  .directive('listItem', ListItem) //restrict to "A"
  .directive('shoppingList',ShoppingList); //isolate scope demonstrated

  function ShoppingList() {//START ShoppingList
    var ddo = {
      restrict : "E",
      templateUrl:"shoppingList.html",
      scope : {
        list : "=myList",//2-way binding
        title : "@myTitle"//1-way bindaing
      },
      // controller:ShoppingListDirectiveController,
      // controllerAs:"directiveList",
      controller: 'ShoppingListDirectiveController as directiveList',
      bindToController:true
    };
    return ddo;
  };//END ShoppingList

  function ShoppingListDirectiveController() {// START ShoppingListDirectiveController
    var directiveList = this;

    directiveList.checkCookiesInList = function () {
      for (var i = 0; i < directiveList.list.items.length; i++) {
        var name = directiveList.list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }
      return false;
    };
  };//END ShoppingListDirectiveController

  function ListItem() {//START ListItem
    var ddo = {
      restrict : "E",
      templateUrl : "listItem.html"
    };
    return ddo;
  };//END ListItem

  function ListItemDescription() {//START ListItemDescription
    var ddo = {
      restrict : "A",//check changes in listItem.html
      template : "{{item.quantity}} boxes of {{item.name}}"
    };
    return ddo;
  };//END ListItemDescription

  // LIST #1 - controller
ShoppingListController1.$inject=['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {//START ShoppingListController1
  var list = this;
  list.itemName = "";
  list.itemQuantity = "";
  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();
  list.items = shoppingList.getItems();
  list.title = "Shopping List #1 ( " + list.items.length + " )";

  list.addItem = function () {
    shoppingList.addItem(list.itemName,list.itemQuantity);
    list.title = "Shopping List #1 ( " + list.items.length + " )";//to increase when new item is added
  }
  list.removeItem = function (index) {
    shoppingList.removeItem(index);
    list.title = "Shopping List #1 ( " + list.items.length + " )";//to decrease when an item is removed
  }

};//END ShoppingListController1


// LIST #2 - controller
ShoppingListController2.$inject=['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {//START ShoppingListController2
  var list = this;
  list.itemName = "";
  list.itemQuantity = "";

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);
  list.addItem = function () {
    try{
        shoppingList.addItem(list.itemName,list.itemQuantity);
      }
    catch(error){
          list.errorMessage = error.message;
      }
  }
  list.removeItem = function (index) {
    shoppingList.removeItem(index);
  }
  list.items = shoppingList.getItems();
};//END ShoppingListController2

function ShoppingListService(maxItems) {//START ShoppingListService
  var service = this;
  var items = [];
  service.addItem = function (itemName,itemQuantity) {
    if((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)){
      var item = {
        name : itemName,
        quantity :itemQuantity
      }
      items.push(item);
    }
    else{
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem =function (index) {
    items.splice(index,1);
  };
  service.getItems=function () {
    return items;
  };
};//END ShoppingListService

function ShoppingListFactory() {//START ShoppingListFactory
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };
  return factory;
};//END ShoppingListFactory

})();
