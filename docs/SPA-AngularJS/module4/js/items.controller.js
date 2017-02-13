(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject=['categoryItems'];
  function ItemsController(categoryItems) {
    var items = this;
    console.log(categoryItems);
    items.categoryItems = categoryItems.data.menu_items;
  };
})();
