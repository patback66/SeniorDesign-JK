//var widget = require(__dirname + '/clientjs/widget.js');
import { Widget } from './widget.js';
//export var clock = new widget();
import request from 'request';

export class RSS extends Widget {
  constructor() {
    super();
    this.isfull = false;
    this.name = "RSS";
    this.location = null;
    this.myWindow = null;
    this.refresh = 86400000;
  }

  setup(location){
    //var element = document.getElementById(location);
    this.location = location;
  }

  loop() {
    var temp = document.getElementById(this.location);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         //document.getElementById("demo").innerHTML = xhttp.responseText;
         //console.log(xhttp.responseText);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
                           //console.log(xmlDoc.getElementsByTagName("description")[1].childNodes[0].nodeValue);
        temp.innerHTML = "<h1>" + xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue + "</h1><br />"
          + xmlDoc.getElementsByTagName("description")[1].childNodes[0].nodeValue;
	temp.style.display="block";
	temp.style.margin="auto";
      }
   };
   xhttp.open("GET", "https://xkcd.com/rss.xml", true);
   xhttp.send();

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
    myWindow = window.open("RSS.html");

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
