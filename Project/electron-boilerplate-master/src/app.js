// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote, ipcRenderer } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import fs from 'fs';
import './clientjs/configuration.js';
import { Widget } from './clientjs/widget.js';
import { RSS } from './clientjs/RSS.js';
import { Weather } from './clientjs/weather.js';
import { Quotes } from './clientjs/quotes.js';
import { Clock } from './clientjs/clock.js';
var widgets = [];
var locations = [];
var widgetNames = [];

function loadWidgets() {
  //Load Widgets here
  widgets.push(new Clock());
  widgets.push(new Quotes());
  widgets.push(new RSS());
  widgets.push(new Weather());

  //default locations until configuration is working
  locations["clock"]="region-top-center";
  locations["quotes"]="region-bottom-center";
  locations["weather"]="region-top-right";
  locations["RSS"]="region-middle";

  //build widget name list for ipc passing
  for (var i = 0; i < widgets.length; i++) {
    widgetNames.push(widgets[i].name);
  }
  console.log(widgetNames);
  ipcRenderer.send('widget-load', widgetNames);
}
loadWidgets();

const testFolder = './';
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

var minRate = 500;
var maxRate = 500;
var curRefresh = 0;

var settingsWindow = null;
var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    console.log("[INFO] Openning settings");
    ipcRenderer.send('open-settings-window');
});

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < widgets.length; i++) {
        //widgets[i].setup("region-top-center");
        widgets[i].setup(locations[widgets[i].name]);
        doRefresh(i);
        setInterval(doRefresh.bind(null, i), widgets[i].refresh);
        console.log(widgets[i]);
        //updater.push(t) ; //should have widgets.refresh
    }
    //var update = setInterval(doRefresh,minRate);
    //updater.push(update);
    //console.log(updater);
});

function doRefresh(index) {
    widgets[index].loop();
}

ipcRenderer.on("receive-settings", (event, arg) => {
    //update widget locations
});
