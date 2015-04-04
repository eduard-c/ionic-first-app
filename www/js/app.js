var db = null;
var app = angular.module('calorific', ['ionic', 'ngCordova']);


app.run(function($ionicPlatform,$cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        console.log('device ready');
        window.plugins.sqlDB.copy("calories.db", function() {
            console.log('db copied');
            db = $cordovaSQLite.openDB("calories.db");
        }, function(error) {
            console.log("There was an error copying the database: " + error);
            db = $cordovaSQLite.openDB("calories.db");
        });
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.add-meal', {
      url: "/add-meal",
      views: {
        'add-meal-tab': {
          templateUrl: "templates/add-meal.html",
          controller: 'AddMealTabCtrl'
        }
      }
    })
    .state('tabs.view-report', {
      url: "/view-report",
      views: {
        'view-report-tab': {
          templateUrl: "templates/view-report.html",
          controller: 'ViewReportTabCtrl'
        }
      }
    })
    .state('tabs.calories', {
      url: "/calories",
      views: {
        'calories-tab': {
          templateUrl: "templates/calories.html",
          controller: 'CaloriesTabCtrl'
        }
      }
    })
    .state('tabs.help', {
      url: "/help",
      views: {
        'help-tab': {
          templateUrl: "templates/help.html",
          controller: 'HelpTabCtrl'
        }
      }
    })
    ;


   $urlRouterProvider.otherwise("/tab/home");

})
.controller('HomeTabCtrl', function($scope) {
  //console.log('HomeTabCtrl');
})
.controller('AddMealTabCtrl', function($scope) {
  //console.log('log');
})
.controller('ViewReportTabCtrl', function($scope) {
  //console.log('log');
})
.controller('CaloriesTabCtrl', function($scope, $cordovaSQLite) {
    var query = "SELECT food,calories FROM calories";
    $cordovaSQLite.execute(db, query, []).then(function(res) {
        if(res.rows.length > 0) {
            console.log('HAVE RESULTS!');
            $scope.calories = [];
            for(var i=0; i<res.rows.length; i++){
                $scope.calories.push(res.rows.item(i));
                console.log(JSON.stringify(res.rows.item(i)));
            } 
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.log('error');
    });
})
.controller('HelpTabCtrl', function($scope) {
  console.log('log');
})
;
/* delete later
app.value('food_calories',[
    {
        n:"Hamburger",
        c:500
    },
    {
        n:"Pizza",
        c:650
    },
    {
        n:"Salad",
        c:30
    }
]);
*/