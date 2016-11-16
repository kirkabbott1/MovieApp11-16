
var app = angular.module('movieApp', ['ui.router']);

app.factory('Movie', function factoryFunction($http) {
  var service = {};
  service.nowPlaying = function() {
    return $http ({
      url: 'http://api.themoviedb.org/3/movie/now_playing',
      params: { api_key: '6587450653d727997cbfe8c034cf9531' }
    });
  };
  // service.details = function(movieId) {
  //   return $http ({
  //     url:
  //   })
  // }
  return service;
})

  app.controller('SearchController', function($scope, $stateParams, $state) {
    $scope.movieName = '';
    $scope.submit = function() {
      $state.go('search_result', {movieName: $scope.movieName});
      console.log('submitted')
    }

  });

  app.controller('ResultController', function($scope, $stateParams, Movie) {
    $scope.getNowPlaying = function() {

    }
    Movie.nowPlaying().success(function(data) {
      console.log(data);
      $scope.results = data.results;
    })
    // $scope.result = $stateParams.movieName;
    // console.log($scope.result);
  })

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state({
      name: 'search',
      url: '/',
      templateUrl: 'search_page.html',
      controller: 'SearchController'
    })
    .state({
      name: 'search_result',
      url: '/search_result/{movieName}',
      templateUrl: 'search_result.html',
      controller: 'ResultController'
    })
    $urlRouterProvider.otherwise('/');
  });
