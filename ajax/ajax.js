var app = angular.module('app', []);

app.factory('Movie', function factoryFunction($http) {
  var service = {};
  service.nowPlaying = function() {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/now_playing',
      params: { api_key: 'fca7302d15175b6bbe117ec2d07df7e6' }
    });
  };
  service.details = function(movieId) {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/' + movieId,
      params: { api_key: 'fca7302d15175b6bbe117ec2d07df7e6' }
    });
  };
  service.search = function(query) {
    return $http({
      url: 'http://api.themoviedb.org/3/search/movie',
      params: {
        api_key: 'fca7302d15175b6bbe117ec2d07df7e6',
        query: query
      }
    });
  }
  return service;
});

// Example of using app.service
//
// function Calculator() {
//   this.currentValue = 0;
// }
// Calculator.prototype.add = function(x, y) {
//   return x + y;
// }
//
// app.service('Movie', SomeConstructor);
// equivalent to:
// app.factory('Movie', function() {
//   return new SomeConstructor();
// });


app.controller('MyController', function($scope, Movie) {
  $scope.getNowPlaying = function() {
    Movie.nowPlaying().success(function(results) {
      console.log(results);
    });
  };

  $scope.getDetails = function() {
    console.log('Get details for ', $scope.movieId);
    Movie.details($scope.movieId).success(function(details) {
      console.log(details);
    });
  };

  $scope.search = function() {
    Movie.search($scope.movieId).success(function(results) {
      console.log('search results', results);
    });
  };

});
