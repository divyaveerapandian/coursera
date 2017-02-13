(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  // CategoriesController.$inject=['MenuDataService'];
  // function CategoriesController(MenuDataService) {
  CategoriesController.$inject=['categories'];
  function CategoriesController(categories) {
    var menu = this;
    //**************************1st way
    // var promise= MenuDataService.getAllCategories();
    // promise.then(function (response) {
    //   menu.categories = response.data;
    // }).catch(function (error) {
    //   console.log("Something went terribly wrong.");
    // });
    //****************************2nd way
    // menu.$onInit = function () {
    //   MenuDataService.getAllCategories()
    //   .then(function (result) {
    //     menu.categories = result.data;
    //   })
    // }
    //****************************3rd way
    menu.categories = categories.data;

  };
})();
