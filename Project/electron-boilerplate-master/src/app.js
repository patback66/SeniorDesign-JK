// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import { Widget } from './clientjs/widget.js';
//var widget = require('./clientjs/widget.js');
import { Clock } from './clientjs/clock.js';
//var clockWidget = require(__dirname + '/clientjs/clock.js');

var widgets = [];
var updater = [];

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    /*document.getElementById('greet').innerHTML = greet();
    document.getElementById('platform-info').innerHTML = os.platform();
    document.getElementById('env-name').innerHTML = env.name;*/
    //load widgets into config
    widgets.push(new Clock());
    //load all widgets

    for (var i = 0; i < widgets.length; i++) {
        //widgets[i].setup("region-top-center");
        widgets[i].setup(region-top-center);
        setInterval(widgets[i].loop(),widgets[i].refresh);
        //updater.push(t) ; //should have widgets.refresh
    }
});

function doRefresh() {

}
