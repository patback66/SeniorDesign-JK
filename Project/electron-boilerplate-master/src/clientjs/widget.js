//import { Widget } from './widget.js';
/**
 * Extend the widget class to create a new widget
 * @class {Widget} Widget provides functionality for an html widget.
 * @constructor builds a new widget
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
   * Setup is called once at the instantiation. Use for code that must run after
   * the constructor but before the main loop.
   * @method setup
   * @param {string} location - a string to specify the id of the div location for the widget
   */
  setup(location){
    this.location = location;

  }

  /**
   * Loop is called periodically based on this.refresh. Updates to the widget
   * should be performed here.
   * @method loop
   */
  loop() {
    var element = document.getElementById(this.location);
    var elementHTML = "";
    element.innerHTML = elementHTML;
  }

  /**
   * Returns the widget's name as a string
   * @method getname
   * @return {string} returns the widget's name, as defined by this.name
   */
  getname(){
    return this.name;
  }

  /**
   * [WIP] Closes a widget that has been fullscreened.
   * Remember to close else you have 3 million pages open
   * @method close
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
   * Set the location id for the widget.
   * @method setLocation
   * @param {string} location - the div id for the widget to be placed in.
   */
  setLocation(location){
    this.location = location;
  }

  /**
   * [WIP] Gets the widget's display status
   * @method display
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
   * Gets the widget's refresh rate in milliseconds.
   * @method getRefresh
   * @return {number} Returns the widget's refresh rate
   */
  getRefresh() {
    return this.refresh;
  }

  /**
   * Sets the refresh rate for the widget in milliseconds.
   * @method setRefresh
   * @param {number} rate - the time in milliseconds between calls to loop
   */
  setRefresh(rate) {
    this.refresh = rate;
  }

  /**
   * [WIP] Fullscreens a widget using a new window.
   * @method open
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
