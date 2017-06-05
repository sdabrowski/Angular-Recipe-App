// Module
var recipeApp = angular.module("recipeApp", ["ngRoute", "ngResource", "ngSanitize"]);

// Routes
recipeApp.config(function ($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: "pages/home.htm",
            controller: "homeController"
        })

        .when("/recipes", {
            templateUrl: "pages/recipes.htm",
            controller: "recipeController"
        })
});

// Services
recipeApp.service("recipeService", function () {

    this.ingredients = "";

});

// Controllers
recipeApp.controller("homeController", ["$scope", "$resource", "recipeService", function ($scope, $resource, recipeService) {

    $scope.ingredients = recipeService.ingredients;
    
    $scope.$watch("ingredients", function () {
        recipeService.ingredients = $scope.ingredients;

        // Disables the Get Recipes link as well as the button if no value is input into the text field
        if ($scope.ingredients == "") {
            $scope.enable = true;
            $scope.recipeLink = "#";
        } else {
            $scope.enable = false;
            $scope.recipeLink = "#!/recipes";
        }
    });

}]);

recipeApp.controller("recipeController", ["$scope", "$resource", "$http", "$sce", "recipeService", function ($scope, $resource, $http, $sce, recipeService) {
    
    $scope.ingredients = recipeService.ingredients;
    
    //$scope.recipeResult = $resource("http://www.recipepuppy.com/api/?i=:ingredients", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.recipeResult = $resource($sce.trustAsResourceUrl("http://www.recipepuppy.com/api/?i=:ingredients"), { jsonCallbackParam: 'callback' });
    
    $scope.recipeAPI = $scope.recipeResult.get({ingredients: $scope.ingredients});
    
    //$sce.trustAsResourceUrl("http://www.recipepuppy.com/api/");

    //$scope.recipeAPI = $http.jsonp("http://www.recipepuppy.com/api/", {jsonpCallbackParam: 'callback'}).then(function(response){$scope.recipeAPI = response.data});
    
    //$scope.recipeAPI = $http.jsonp($sce.trustAsResourceUrl("http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3")).then(function(response){$scope.recipeAPI = response.data});
    
    //$scope.recipeAPI = $http.jsonp("http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3").success(function(data));
    
    //$scope.recipeAPI = $resource("http://www.recipepuppy.com/api", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    //$scope.recipeAPI = $resource($http.jsonp($sce.trustAsResourceUrl("http://www.recipepuppy.com/api")), { get: { method: "JSONP" }});
    
    //$scope.recipeAPI = $resource("http://www.recipepuppy.com/api", { jsonpCallbackParam: "cb" }, { get: { method: "JSONP" }});
    
    //$scope.recipeAPI = $resource($sce.trustAsResourceUrl("http://www.recipepuppy.com/api") , { get: { method: "JSONP" }});
    
    //$scope.recipeResult = $scope.recipeAPI.get({ i: $scope.ingredients });
    
    //console.log($scope.recipeResult);
    console.log($scope.recipeAPI);
}]);
