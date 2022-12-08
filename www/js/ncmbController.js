var application_key = "f4908ef79d898755ca2296e141d01d11b9239ea313a74a12bca6c4a39e068351";
var client_key = "cb97cb199da7c791e87a8cae422682abdef8dae49849b919567c6c71f0f63f3f";

var ncmbController = {
    init: function() {
        var ncmb = new NCMB(application_key, client_key);
    }
};

document.addEventListener("DOMContentLoaded", function(event) { 
  ncmbController.init();
});


init: function() {
    var ncmb = new NCMB(application_key, client_key);
    var token = 'MAPBOX_TOKEN';
    navigator.geolocation.getCurrentPosition(function(location) {
        var map = L.map('map').setView([location.coords.latitude, location.coords.longitude], 15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+token, {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'pk.eyJ1Ijoicnlvb3dhIiwiYSI6ImNsYmJtdmw2NzA2OTQzb3Blc2xhemExMjAifQ.7hDyf9gwHNYhWiAakT85SA',
            accessToken: pk.eyJ1Ijoicnlvb3dhIiwiYSI6ImNsYmJtcnB2MDBrcnUzb3BpbnkzMHhlMWYifQ.sHpLxWKkExLU1le8HQzWYA
        }).addTo(map);
    });

var map = L.map('map').setView([location.coords.latitude, location.coords.longitude], 15);