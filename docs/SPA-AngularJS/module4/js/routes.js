(function () {
'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // // *** Set up UI states ***
    $stateProvider
    // Home page
    .state('home',{
      url: '/',
      templateUrl:'js/templates/home.html'
    })
    //Category page
    .state('categories',{
      url:'/categories',
      templateUrl: 'js/templates/categoryRouter.template.html',
      controller : 'CategoriesController as menu',
      resolve : {
        categories : ['MenuDataService',function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    //items page
    .state('categories.items',{
      url:'/items/{itemShortName}',
      templateUrl : 'js/templates/itemsRouter.template.html',
      controller : 'ItemsController as items',
      resolve : {
        categoryItems : ['$stateParams', 'MenuDataService',
        function ($stateParams , MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.itemShortName);
          }]
        }
    });
    };

})();
