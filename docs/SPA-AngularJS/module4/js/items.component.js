(function () {
  'use strict';
  angular.module('MenuApp')
  .component('menuCategoryItems',{
      templateUrl :'js/templates/item.template.html',
      bindings : {
        items : "<"
      }
  });
})();
