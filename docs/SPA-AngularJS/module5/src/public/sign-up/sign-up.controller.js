(function () {
  'use strict';

  angular.module('public').
  controller('SignUpController',SignUpController);

  SignUpController.$inject=['MenuService']
  function SignUpController(MenuService) {
    var signUpCtrl = this;
    var user = {};
    signUpCtrl.user = user;
    signUpCtrl.submit = function () {
      MenuService.setUserData(user);
      signUpCtrl.completed = true;
    }
  }
})();
