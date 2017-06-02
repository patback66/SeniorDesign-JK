import { Widget } from './widget.js';
/*
 * @class Widget
 * Widget provides functionality for an html widget.
 *
 *
 */
export class Hello extends Widget {
  constructor() {
    super(); //should be called in a new widget
    this.isfull = false;
    this.name = "hello";
    this.myWindow;
    this.location;
    this.refresh = 500; //refresh time in millis
  }

  /*
   * Setup is called once at the instantiation. Use for code that must run after
   * the constructor but before the main loop.
   */
  setup(location){
    this.location = location;

  }

  /*
   * Loop is called periodically based on the refresh. Updates to the widget
   * should be performed here.
   *
   */
  loop() {
    var element = document.getElementById(this.location);
    var elementHTML = "<h1> Hello Senior Design 2017</h1>";
    element.innerHTML = elementHTML;
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
