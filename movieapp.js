
var app = angular.module('movieApp', ['ui.router']);

app.factory('Movie', function factoryFunction($http) {
  var service = {};
  service.nowPlaying = function(pageNumber) {
    console.log("Page number for now playing: ");
    console.log(pageNumber);
    return $http ({
      url: 'http://api.themoviedb.org/3/movie/now_playing',
      params: {
        api_key: '6587450653d727997cbfe8c034cf9531',
        page: pageNumber
       },
    });
  };
  service.details = function(movieId) {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/' + movieId,
      params: { api_key: 'fca7302d15175b6bbe117ec2d07df7e6' }
    });
  };
  service.search = function(queryparam, pageNumber) {
    console.log("Query Param: " + queryparam)
    console.log(pageNumber)
    return $http({
      url: 'http://api.themoviedb.org/3/search/movie',
      params: {
        api_key: 'fca7302d15175b6bbe117ec2d07df7e6',
        query: queryparam,
        page: pageNumber
      }
    });
  }
  return service;
})

  app.controller('SearchController', function($scope, $stateParams, $state, Movie) {
    console.log($stateParams['pageNumber'])
    // ternary operator
    $scope.pageNumber = (($stateParams['pageNumber']) === undefined) ? 1 : Number($stateParams['pageNumber']);
    // $scope.pageNumber = Number($stateParams['pageNumber']);

    // $scope.submit = function() {
    //   $state.go('search_result', {movieName: $scope.movieName, pageNumber: 2});
    // }
    Movie.nowPlaying($scope.pageNumber).success(function(data) {
      $scope.results = data.results;
    })
    $scope.next = function() {
      // $scope.pageNumber = Number($stateParams['pageNumber']);
      $scope.pageNumber += 1;
      console.log($scope.pageNumber)

      $state.go('search', {pageNumber: $scope.pageNumber});
    };

  });

  app.controller('ResultController', function($scope, $stateParams, $state, Movie) {
    $scope.movieName = $stateParams.movieName;
    $scope.pageNumber = 1;

    // $scope.pageNumber = Number($stateParams['pageNumber']);

    $scope.submit = function() {
      console.log($scope.pageNumber)
      $state.go('search_result', {movieName: $scope.movieName, pageNumber: 1});
    }

    Movie.search($scope.movieName, $scope.pageNumber).success(function(searchData) {
      $scope.searchResults = searchData;
      // console.log(searchData);
      $scope.searchData.page = Number(scope.pageNumber);
      // console.log($scope.searchData.page)
      // console.log(typeof $scope.searchData.page)

    });
    $scope.next = function() {
      $scope.pageNumber += 1;
      // console.log($scope.pageNumber)

      $state.go('search_result', {movieName: $scope.movieName, pageNumber: $scope.pageNumber});
    };
  });

  app.controller('DetailsController', function($scope, $stateParams, $state, Movie) {
    $scope.submit = function() {
      $state.go('search_result', {movieName: $scope.movieName});
    }
    Movie.details($stateParams.movieId).success(function(detailData) {
      $scope.detailData = detailData;
      console.log(detailData);
    });
  })

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state({
      name: 'home',
      url: '/search',
      templateUrl: 'search_page.html',
      controller: 'SearchController'
    })
    .state({
      name: 'search',
      url: '/search/{pageNumber}',
      templateUrl: 'search_page.html',
      controller: 'SearchController'
    })
    .state({
      name: 'search_result',
      url: '/search_result/{movieName}/{pageNumber}',
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
