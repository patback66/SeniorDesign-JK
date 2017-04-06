'use strict';

var ipc = require('ipc');
//var ipc = nodeRequire('ipc');
var configuration = require('../configuration');

var selectBoxes = document.querySelectorAll('.widget-placement');
var closeEl = document.querySelector('.close');

closeEl.addEventListener('click', function (e) {
    ipc.send('close-settings-window');
});

for (var i = 0; i < selectBoxes.length; i++) {
    var location = configuration.readSettings('widget-placement');
    var widgetName = modifierCheckboxes[i].attributes['selected'].value;
    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;

    modifierCheckboxes[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
}

function bindSelectBoxes(e) {
    var shortcutKeys = configuration.readSettings('widget-placement');
    var modifierKey = e.target.attributes['data-modifier-key'].value;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    }
    else {
        shortcutKeys.push(modifierKey);
    }

    configuration.saveSettings('shortcutKeys', shortcutKeys);
    ipc.send('set-widget-placement');
}
