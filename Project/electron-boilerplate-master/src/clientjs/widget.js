/*module.exports = function widget(){

  var isfull;
  var name = "hello_world";
  var myWindow;

  this.setup = function(){
    return "hi";
  }

  this.getname = function(){
    return name;
  }

  //remember to close else you have 3 million pages open
  this.close = function(){
    isfull = false;
    myWindow.close();
    return "bye";
  }

  this.getdata = function(){

  }

  this.location = function(){
    var location = document.getElementById(name);
    return location;
  }

  this.display = function(){
    if(isfull){
      return "fullscreen";
    }
    else {
      return "minimized";
    }
  }

  this.open = function(){
    //window.location = "http://www.google.com"

    //here i am opening a new window each time you fullscreen something. is that good? probably not in the long run
    myWindow = window.open("hello_world.html");

    //window.location is an alternative
    //window.location.assign("hello_world.html");
    isfull = true;
  }
};*/

export class Widget {
  constructor() {
    this.isfull = false;
    this.name = "hello_world";
    this.myWindow;
    this.location;
    this.refresh = 500;
  }

  setup(location){
    return "hi";
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

  getRefresh() {
    return this.refresh;
  }

  setRefresh(rate) {
    this.refresh = rate;
  }

  open(){
    //window.location = "http://www.google.com"

    //here i am opening a new window each time you fullscreen something. is that good? probably not in the long run
    myWindow = window.open("hello_world.html");

    //window.location is an alternative
    //window.location.assign("hello_world.html");
    isfull = true;
  }
}
