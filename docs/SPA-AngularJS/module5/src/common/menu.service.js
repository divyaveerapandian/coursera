(function () {
  "use strict";

  angular.module('common')
  .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = {'category': category};
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };

    service.setUserData = function (user) {
        service.user = $http.get(ApiPath + '/menu_items/'+user.menunumber+'.json').then(function (response) {
          user.item = response.data;
          user.itemExistence = true;
          return user;
        }).catch(function(errorResponse) {
          errorResponse.message = "No such menu number exists";
          user.errorResponse = errorResponse;
          user.itemExistence = false;
          return user;
        });
    };
    service.getUserData = function () {
        return service.user;
    };

  };
})();
