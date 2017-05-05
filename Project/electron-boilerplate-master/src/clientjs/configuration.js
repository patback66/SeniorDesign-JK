'use strict';

import { nconf } from 'nconf';
import os from 'os';
import file from 'file';

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
