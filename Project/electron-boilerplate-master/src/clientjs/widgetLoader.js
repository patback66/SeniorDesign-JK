'use strict'
//WIP THIS DOESN'T ACTUALLY WORK BECAUSE IMPORT BS
//Import your widget here
import { Widget } from 'clientjs/widget.js';
import { Quotes } from 'clientjs/quotes.js';
import { Clock } from 'clientjs/clock.js';

var widgets = [];
var locations = [];

function loadWidgets() {
  //Load Widgets here
  widgets.push(new Clock());
  widgets.push(new Quotes());

  //default locations until configuration is working
  locations["clock"]="region-top-center";
  locations["quotes"]="region-bottom-center";
}

module.exports = {
  loadWidgets: loadWidgets
}
