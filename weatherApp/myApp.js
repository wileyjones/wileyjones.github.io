angular.module('myApp', [

])
.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  var zipCode = null;
  var myObject = {};
  var searchCode = null;
  var weatherSearched = false;
  var weatherObj = {};
  var lonlatData = {
    "lon": 0,
    "lat": 0,
  };

var weatherList = [];
var state = "";

  // Functions

  function searchParam(code) {
    zipCode = code;
    weatherSearched = true;
    $scope.weatherSearched = weatherSearched;

    $http.get('http://api.openweathermap.org/data/2.5/weather?zip=' +zipCode+ ',us&appid=b6eae801934c597218f19c68600fe6ef')
      .then(function(response) {

          $scope.myObject = response.data;

          $scope.weatherObj = {
            "temp":response.data.main.temp,
            "humidity":response.data.main.humidity,
            "wind":response.data.wind.speed
          };

          lonlatData.lon = response.data.coord.lon;
          lonlatData.lat = response.data.coord.lat;

          $scope.lonlatData = lonlatData;

          cityDetails(response.data.coord.lon, response.data.coord.lat);

      });
   };

  function cityDetails(lon,lat) {
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyA0dX3h8y6vkX68MD3LHnOgp1uQyQe8gm0')
    .then(function(response) {

      console.log(response.data);

      for (var i = 0; i < response.data.results[0].address_components.length; i++) {
        if ( response.data.results[0].address_components[i].types.indexOf("administrative_area_level_1") > -1) {
          $scope.myObject.state = response.data.results[0].address_components[i].short_name;
          console.log(i.short_name);
        }
      }


    });

  };

  function writeToList(myObject) {
    weatherList.push(myObject);
    weatherSearched = false;
    $scope.weatherSearched = weatherSearched;
  };

  function deleteCity(i) {
    $scope.weatherList.splice(i, 1);
  };

  // States
  $scope.zipCode = zipCode;
  $scope.myObject = myObject;
  $scope.weatherSearched = weatherSearched;
  $scope.searchParam = searchParam;
  $scope.searchCode = searchCode;
  $scope.weatherObj = weatherObj;
  $scope.lonlatData = lonlatData;
  $scope.writeToList = writeToList;
  $scope.weatherList = weatherList;
  $scope.deleteCity = deleteCity;
  $scope.state = state;
  $scope.cityDetails = cityDetails;

  }]);
