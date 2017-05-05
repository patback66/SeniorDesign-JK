import { remote, ipcRenderer } from 'electron';
//import './clientjs/widgetLoader.js'; //get widget names
//var ipc = nodeRequire('ipc');
//var configuration = require('./clientjs/configuration.js');
//import { configuration } from './clientjs/configuration.js';

import { nconf } from 'nconf';
import os from 'os';
import file from 'file';
import fs from 'fs';

const testFolder = './src/clientjs';
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

//import 'src/clientjs/configuration.js';
//import '/src/clientjs/widgetLoader.js';
//import './src/clientjs/widgetLoader.js'; //use require when built to /app
import 'clientjs/widgetLoader.js';

var conf = require('nconf').file({file: getUserHome() + '/smartmirror-config.json'});
//var nconf = nodeRequire('nconf').file({file: getUserHome() + '/smartmirror-config.json'});

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    //return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    return os.homedir();
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};

var selectBoxes = document.querySelectorAll('.widget-placement');
var closeEl = document.querySelector('.close');

closeEl.addEventListener('click', function (e) {
    console.log("close");
    ipcRenderer.send('close-settings-window');
});

ipcRenderer.on("send-widget-list", function(event, arg) {
    console.log(arg);
    widgetNames = arg;
});

for (var i = 0; i < selectBoxes.length; i++) {
    var location = readSettings('widget-placement');
    var widgetName = selectBoxes[i].attributes['selected'].value;
    selectBoxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;

    selectBoxes[i].addEventListener('click', function (e) {
        bindSelectBoxes(e);
    });
}

function loadWidgetNames() {
    console.log("loading widget names");
    for(var i = 0; i < selectBoxes.length; i++) {
        var x = document.getElementById(selectBoxes[i].id);
        for(var j = 0; j < widgets.length; j++) {
            var option = document.createElement("option");
            option.text = widgets[j].name;
            option.value = widgets[j].name;
            x.add(option);
        }
    }
    //for each select box
        //for each widget
        /*var x = document.getElementById("mySelect");
        var option = document.createElement("option");
        option.text = "Kiwi";
        x.add(option, widgetName);
        */
}
loadWidgetNames();

function bindSelectBoxes(e) {
    debugger;
    var shortcutKeys = readSettings('widget-placement');
    var modifierKey = e.target.attributes['data-modifier-key'].value;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    }
    else {
        shortcutKeys.push(modifierKey);
    }

    saveSettings('widget', shortcutKeys);
    ipcRenderer.send('set-widget-placement');
}
