



//Angular App Module and Controller
var mapApp = angular.module('mapApp', []);
mapApp.controller('MapController', function ($scope) {

  $.getJSON("people.json", function (jsonData) {

    var people = jsonData; }).fail(function (d) { alert("Failed to load JSON!"); });

    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(40.111097,-88.225137),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat+Math.random()*0.001-Math.random()*0.001, info.long+Math.random()*0.001-Math.random()*0.001),
            title: info.name,
            work: info.work,
            linkedIn: info.url,
            photoURL: info.photo,
            desc: info.level+' '+info.major+', '+info.minor+' minor, Class of '+info.grad


        });
        marker.content = '<div class="infoWindowContent"> <img src="'+ info.photo +'" class="img-circle"><br/>' + marker.desc + '<br />' + info.work +'<br /><br /><a href="'+ info.url +'"class="btn btn-info"><i class="fa fa-linkedin fa-fw"></i> <span class="network-name">LinkedIn</span></a></div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' +
              marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < people.length; i++){
        createMarker(people[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
