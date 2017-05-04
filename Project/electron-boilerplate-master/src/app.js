// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote, ipcRenderer } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import { Widget } from './clientjs/widget.js';
//var widget = require('./clientjs/widget.js');
import { Clock } from './clientjs/clock.js';
//import { XKCD } from './clientjs/XKCD.js';
import { Weather } from './
import { Quotes } from './clientjs/quotes.js';
//var clockWidget = require(__dirname + '/clientjs/clock.js');

//var configuration = require('./clientjs/configuration.js');
import './clientjs/configuration.js';



var widgets = [];
var updater = [];
var locations = [];
var minRate = 500;
var maxRate = 500;
var curRefresh = 0;

var settingsWindow = null;
var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    ipcRenderer.send('open-settings-window');
});

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    //document.getElementById('greet').innerHTML = greet();
    //document.getElementById('platform-info').innerHTML = os.platform();
    //document.getElementById('env-name').innerHTML = env.name;
    //load widgets into config
    widgets.push(new Clock());
    //locations.push("region-top-center");
    locations["clock"]="region-top-center";
    //widgets.push(new XKCD());
    widgets.push(new Weather());
    locations["weather"]="region-top-right";
    //locations.push("region-middle-center");
    widgets.push(new Quotes());
    locations["quotes"]="region-bottom-center";
    //locations.push("region-bottom-center");

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
    console.log(updater);
});

function doRefresh(index) {
    widgets[index].loop();
}

ipcRenderer.on("receive-settings", (event, arg) => {
    //update widget locations
});
