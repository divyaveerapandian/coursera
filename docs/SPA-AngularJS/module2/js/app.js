(function() {
  'use strict';

  angular.module("ShoppingListCheckOff",[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  /* To Buy Controller*/
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var ToBuy = this;
    ToBuy.itemsToBuyList = ShoppingListCheckOffService.getItems();

    ToBuy.addToBought =function (itemIndex) {
      ShoppingListCheckOffService.addToBought(itemIndex);
    };
  }

  /* Already Bought Controller*/
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var AlreadyBought =this;
    AlreadyBought.itemsBoughtList= ShoppingListCheckOffService.displayItems();
  }

  /* Shopping List Check Off Service */
  function ShoppingListCheckOffService() {
    var service = this;
    var itemsToBuyList =[{name: "pizza",quantity: "1"},
                         {name: "chocolates",quantity: "30"},
                         {name: "Orange",quantity: "5"},
                         {name: "rusk",quantity: "10"},
                         {name: "cookies",quantity: "10"}
                       ];
    var itemsBoughtList=[];

    // service.addItems=function () {
    //   var item = {
    //     name: "cookies",
    //     quantity: "10 packets"
    //   };
    //   itemsToBuyList.push(item);
    // }
    service.getItems = function () {
      // service.addItems();
      return itemsToBuyList;
    };


    service.addToBought = function (index) {
      itemsBoughtList.push(itemsToBuyList[index]);
      itemsToBuyList.splice(index,1);
      service.displayItems();
    };


    service.displayItems = function () {``
      return itemsBoughtList;
    };
  };



  })();
