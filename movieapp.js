
var app = angular.module('movieApp', ['ui.router']);

app.factory('Movie', function factoryFunction($http) {
  var service = {};
  service.nowPlaying = function() {
    return $http ({
      url: 'http://api.themoviedb.org/3/movie/now_playing',
      params: { api_key: '6587450653d727997cbfe8c034cf9531' }
    });
  };
  service.details = function(movieId) {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/' + movieId,
      params: { api_key: 'fca7302d15175b6bbe117ec2d07df7e6' }
    });
  };
  service.search = function(queryparam) {
    return $http({
      url: 'http://api.themoviedb.org/3/search/movie',
      params: {
        api_key: 'fca7302d15175b6bbe117ec2d07df7e6',
        query: queryparam
      }
    });
  }
  return service;
})

  app.controller('SearchController', function($scope, $stateParams, $state, Movie) {
    $scope.submit = function() {
      $state.go('search_result', {movieName: $scope.movieName});
    }
    Movie.nowPlaying().success(function(data) {
      $scope.results = data.results;
    })

  });

  app.controller('ResultController', function($scope, $stateParams, $state, Movie) {
    $scope.submit = function() {
      $state.go('search_result', {movieName: $scope.movieName});
    }

    // $scope.result = $stateParams.movieName;
    // console.log($scope.result);

    // console.log($stateParams);
    Movie.search($stateParams.movieName).success(function(searchData) {
      $scope.searchResults = searchData;
      // console.log(searchData);
    });
    // $scope.search = function() {
    //
    // };
  });

  app.controller('DetailsController', function($scope, $stateParams, $state, Movie) {
    $scope.submit = function() {
      $state.go('search_result', {movieName: $scope.movieName});
      console.log('submitted')
    }
    Movie.details($stateParams.movieId).success(function(detailData) {
      $scope.detailData = detailData;
      console.log(detailData);
    });
  })

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state({
      name: 'search',
      url: '/search',
      templateUrl: 'search_page.html',
      controller: 'SearchController'
    })
    .state({
      name: 'search_result',
      url: '/search_result/{movieName}',
      templateUrl: 'search_result.html',
      controller: 'ResultController'
    })
    .state({
      name: 'details',
      url: '/details/{movieId}',
      templateUrl: 'details.html',
      controller: 'DetailsController'

    })
    $urlRouterProvider.otherwise('/search');
  });
