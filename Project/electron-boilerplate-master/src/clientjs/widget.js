//import { Widget } from './widget.js';
/**
 * @class {Widget} Widget provides functionality for an html widget.
 * Extend the widget class to create a new widget
 */
export class Widget {
  /**
   *
   */
  constructor() {
    //super(); //should be called in a new widget
    this.isfull = false;
    this.name = "hello_world";
    this.myWindow;
    this.location;
    this.refresh = 500; //refresh time in millis
  }

  /**
   * @param {string} location - a string to specify the id of the div location for the widget
   * Setup is called once at the instantiation. Use for code that must run after
   * the constructor but before the main loop.
   */
  setup(location){
    this.location = location;

  }

  /**
   * Loop is called periodically based on this.refresh. Updates to the widget
   * should be performed here.
   *
   */
  loop() {
    var element = document.getElementById(this.location);
    var elementHTML = "";
    element.innerHTML = elementHTML;
  }

  /**
   * @return {string} returns the widget's name, as defined by this.name
   */
  getname(){
    return this.name;
  }

  /**
   * [WIP] Closes a widget that has been fullscreened.
   * Remember to close else you have 3 million pages open
   */
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

  /**
   * @param {string} location - the div id for the widget to be placed in.
   */
  setLocation(location){
    this.location = location;
  }

  /**
   * @return {string} Gives the widget display status
   */
  display(){
    if(isfull){
      return "fullscreen";
    }
    else {
      return "minimized";
    }
  }

  /**
   * @return {number} Returns the widget's refresh rate
   */
  getRefresh() {
    return this.refresh;
  }

  /**
   * @param {number} rate - the time in milliseconds between calls to loop
   * Sets the refresh rate for the widget
   */
  setRefresh(rate) {
    this.refresh = rate;
  }

  /**
   * [WIP] Fullscreens a widget using a new window.
   */
  open(){
    //window.location = "http://www.google.com"

    //here i am opening a new window each time you fullscreen something. is that good? probably not in the long run
    myWindow = window.open("hello_world.html");

    //window.location is an alternative
    //window.location.assign("hello_world.html");
    isfull = true;
  }
}
