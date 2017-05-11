// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu, ipcMain, BrowserWindow } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';
import './clientjs/configuration.js';
import os from 'os';
var Alexa = require('alexa-sdk');

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;
var settingsWindow;
var widgetNames;

//open settings window. requires renderer call
ipcMain.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }
    setApplicationMenu();

    settingsWindow = createWindow( 'settings', {
        frame: true,
        resizable: true,
    });

    //settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'settings.html'),
        protocol: 'file:',
        slashes: true
    }));

    settingsWindow.on('close', function () {
        settingsWindow = null;
    });
    if (env.name === 'development') {
        settingsWindow.openDevTools();
    }
    /*mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'settings.html'),
        protocol: 'file:',
        slashes: true
    }));*/
    //mainWindow.
    settingsWindow.webContents.send( 'send-widget-list', widgetNames );
});

//close settings window. Requires renderer call
ipcMain.on('close-settings-window', function () {
    console.log("[DEBUG] Closing settings");
    /*if (settingsWindow != null) {
        settingsWindow.close();
    }*/
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

});


var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    setApplicationMenu();

    mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
});

app.on('window-all-closed', function () {
    app.quit();
});

ipcMain.on("widget-load", function(event, arg) {
    console.log(arg);
    widgetNames = arg;
});

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var auth = require('./authentication.js');

var avs_app = express();
avs_app.use(bodyParser.json());

/**
 * The endpoint for the device to request a registration code to then show to the user.
 */
avs_app.get('/provision/regCode', function (req, res) {
    if (!req.client.authorized) {
        console.error("User is not authorized to access this URL. Make sure the client certificate is set up properly");
        res.status(401);
        res.send({ error: "Unauthorized", message: "You are not authorized to access this URL. Make sure your client certificate is set up properly." });
        return;
    }

    auth.getRegCode(req.query.productId, req.query.dsn, function (err, reply) {
        if (err) {
            console.error("Error retrieving registration code: " + err.name + ", " + err.message);
            res.status(err.status);
            res.send({ error: err.name, message: err.message });
        } else {
            console.log("Successfully retrieved registration code for " + req.query.productId + " / " + req.query.dsn);
            res.send(reply);
        }
    });
});

/**
 * The endpoint for the device to request a new accessToken when the previous one expires.
 */
avs_app.get('/provision/accessToken', function (req, res) {
    if (!req.client.authorized) {
        console.error("User is not authorized to access this URL. Make sure the client certificate is set up properly");
        res.status(401);
        res.send({ error: "Unauthorized", message: "You are not authorized to access this URL. Make sure your client certificate is set up properly." });
        return;
    }

    auth.getAccessToken(req.query.sessionId, function (err, reply) {
        if (err) {
            console.error("Error retrieving access token: " + err.name + ", " + err.message);
            res.status(err.status);
            res.send({ error: err.name, message: err.message });
        } else {
            console.log("Successfully retrieved access token for session id: " + req.query.sessionId);
            res.send(reply);
        }
    });
});

/**
 * The endpoint for the customer to visit and get redirected to LWA to login.
 */
avs_app.get('/provision/:regCode', function (req, res, next) {
    auth.register(req.params.regCode, res, function (err) {
        // on success gets redirect so wont return to a callback.
        res.status(err.status);
        res.send({ error: err.name, message: err.message });
        next(err);
    });
});

/**
 * The endpoint that LWA will redirect to to include the authorization code and state code.
 */
avs_app.get('/authresponse', function (req, res) {
    auth.authresponse(req.query.code, req.query.state, function (err, reply) {
        if (err) {
            res.status(err.status);
            res.send({ error: err.name, message: err.message });
        } else {
            res.send(reply);
        }
    });
});

// standard error handling functions.
avs_app.use(function (req, res, next) {
    // Suppress /favicon.ico errors
    var favicon = "favicon.ico";
    if (req.url.slice(-favicon.length) != favicon) {
        var err = new Error('Not Found: ' + req.url);
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

avs_app.use(function (err, req, res, next) {
    console.log("error: ", err);
    res.status(err.status || 500);
    res.send('error: ' + err.message);
});
