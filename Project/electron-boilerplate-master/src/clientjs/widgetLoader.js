//Import your widget here
import { Widget } from './clientjs/widget.js';
import { Quotes } from './clientjs/quotes.js';
import { Clock } from './clientjs/clock.js';

//Load Widgets here
var widgets = [];
var locations = [];

widgets.push(new Clock());
widgets.push(new Quotes());

//default locations until configuration is working
locations["clock"]="region-top-center";
locations["quotes"]="region-bottom-center";
