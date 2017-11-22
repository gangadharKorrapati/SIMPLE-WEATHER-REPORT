$(document).ready(
function ran_col(){
    var color = '';
    var letters = ['#7dcc93', '#f76160', '#31355b', '#21364b', '#E29470', '#66A7D5', '#FA6D68', '#679895'];
    color += letters[Math.floor(Math.random() * letters.length)];
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type != 'button')
            elements[i].style.background = color;
    }
    check();
});
var url="https://fcc-weather-api.glitch.me/api/current?";
var lat,lon;
var temp='C';
var tempvalue;
function check(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (pos){
    var lat = "lat=" + pos.coords.latitude;
    var lon = "lon=" + pos.coords.longitude;
    getWeather(lat, lon);
    });
  }
  else{
      $("#city").text("Geolocation is not supported by this browser.");
  }
}
function toggle(){
  var temp=$("#tempunit").text();
  var newtemp="F";
  if(temp=="F"){
      newtemp="C";
  }
  $("#tempunit").text(newtemp);
  if(newtemp=="F"){
    var ftemp=Math.round(parseInt($("#temp").text())*1.8+32);
    $("#temp").text(ftemp +"°");
  }
  else{
    $("#temp").text(tempvalue+"°");
  }
}
function getWeather(lat,lon){
  var urlget=url+lat+"&"+lon;
  $.ajax({
    url: urlget,success:function(data){
      $("#city").text(data.name);
      $("#country").text(data.sys.country);
      tempvalue=data.main.temp;
      $("#temp").text(tempvalue+"°");
      $("#tempunit").text(temp);
      $("#weather").text(data.weather[0].main);
      $('<img />', {src :data.weather[0].icon }).appendTo('#report');
    }
  });
}
