import { Widget } from './widget.js';
/*
 * @class Compliments
 * Provides compliments to the user
 *
 *
 */
export class Quotes extends Widget {
  constructor() {
    super();
    this.isfull = false;
    this.name = "quotes";
    this.myWindow;
    this.location;
    this.refresh = 50000; //refresh time in millis
    this.quotes = ["You're the fairest of them all.",
                   "Hello world",
                   "Hi there :)",
                   "Greetings",
                   "Hello Senior Design Judges"];
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
    console.log("quotes loop called");
    var idx = Math.floor((Math.random() * this.quotes.length));
    var elt = document.getElementById(this.location);
    elt.innerHTML = "<h2>" + this.quotes[idx] + "</h2>";
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
