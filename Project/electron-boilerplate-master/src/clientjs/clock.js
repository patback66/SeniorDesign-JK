//var widget = require(__dirname + '/clientjs/widget.js');
import { Widget } from './widget.js';
//export var clock = new widget();

export class Clock extends Widget {
  constructor() {
    super();
    this.isfull = false;
    this.name = "clock";
    this.location = null;
    this.myWindow = null;
    this.refresh = 500;
  }

  setup(location){
    //var element = document.getElementById(location);
    this.location = location;
  }

  loop() {
    //var element = document.getElementById(location);
    console.log("clock loop called");
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ ";
    var h = currentdate.getHours();
    var m = currentdate.getMinutes();
    var s = currentdate.getSeconds();
    h = h%12;
    m = addzero(m);
    s = addzero(s);
    datetime = datetime + h + ":" + m + ":" + s;
    //$(text2).empty();
    //var temp = text2.insertRow(0);
    //temp.innerHTML = datetime;
    //var temp = document.getElementById("text1");
    var temp = document.getElementById(this.location);

    //document.getElementById("text1").innerHTML = datetime;
    var style ="font-size: xx-large;";
    temp.innerHTML = datetime;
    temp.style.cssText = style
    //var t = setTimeout(this.setup(location),500);
    function addzero(i){
      if (i < 10) {i="0"+i;}
      return i;
    }
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
    myWindow = window.open("clock.html");

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
