(function () {
  'use strict';
  angular.module('MenuApp')
  .component('menuCategories',{
      templateUrl :'js/templates/category.template.html',
      bindings : {
        categories : "<"
      }
  });
})();
