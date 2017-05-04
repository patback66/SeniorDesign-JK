//var widget = require(__dirname + '/clientjs/widget.js');
import { Widget } from './widget.js';
//export var clock = new widget();
import request from 'request';

export class Weather extends Widget {
  constructor() {
    super();
    this.isfull = false;
    this.name = "weather";
    this.location = null;
    this.myWindow = null;
    this.refresh = 60000;
  }

  setup(location){
    //var element = document.getElementById(location);
    this.location = location;
  }

  loop() {
    var temp = document.getElementById(this.location);
    var req = request({url: 'http://api.openweathermap.org/data/2.5/weather?zip=95053,us&APPID=a83e777454d90a1719bc071659fdd7ef', json: true}, function(err, res, json) {
    if (err) {
      throw err;
    }else{
      //var obj = JSON.parse(json);
      var cel = json.main.temp - 273;
      cel = cel.toFixed(2);
      var fore = json.weather[0].main;
      temp.innerHTML = "<h2>&#9728</h2><br />" + "<h4>" + "Forecast: " + json.weather[0].main + "</h4>"
                        + "<h4>Temperature: " + cel + "&#8451</h4><br />";
                  //console.log(json);
      }
    });
  }

  getname(){
    return this.name;
  }

  //remember to close else you have 3 million pages open
  close(){
    isfull = false;
    myWindow.close();
    return "bye";
  }

  getdata(){

  }

  getLocation(){
    return this.location;
  }

  setLocation(location){
    this.location = location;
  }

  display(){
    if(isfull){
      return "fullscreen";
    }
    else {
      return "minimized";
    }
  }

  open(){
    //window.location = "http://www.google.com"

    //opening a new window each time you fullscreen something. is that good? probably not in the long run
    myWindow = window.open("weather.html");

    //pass in location on where it should go (ex. regiontopleft)
    setup(location);

    /*var loc = document.getElementById("regiontopleft");
    loc.innerHTML = */

    //window.location is an alternative
    //window.location.assign("hello_world.html");
    isfull = true;
  }

  getRefresh() {
    return this.refresh;
  }

  setRefresh(rate) {
    this.refresh = rate;
  }
}
