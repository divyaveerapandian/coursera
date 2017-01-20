(
  function () {
    angular.module("LunchCheck",[])
    .controller("LunchCheckController",LunchCheckMessage);

    LunchCheckMessage.$inject = ['$scope'];
    function LunchCheckMessage($scope){
      $scope.ListFood ="";
      $scope.message="";
      var textboxElement = document.querySelector("#foodItem");
      var targetElement = document.querySelector("#target");

      $scope.CheckStatus=function () {
        if($scope.ListFood==""){
          $scope.message ="Please enter data first";
          targetElement.style.color="red";
          textboxElement.style.borderColor="red";
        }
        else{
          var itemCount = countFoodItems($scope.ListFood);
          if(itemCount<=3){
            $scope.message = "Enjoy!";
            targetElement.style.color="green";
            textboxElement.style.borderColor="green";
          }
          else{
            $scope.message = "Too much!";
            targetElement.style.color="green";
            textboxElement.style.borderColor="green";
          }
        }
      };

      function countFoodItems(food) {
        var arr= food.split(",");
        // console.log(arr);
        // arr = arr.filter((item) => item != ' ');
        // arr = arr.filter(Boolean);
        return food.split(",").length;
      }
    }
  })();
