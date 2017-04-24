//var widget = require(__dirname + '/clientjs/widget.js');
import { Widget } from './widget.js';
//export var clock = new widget();
//var RSSFeedParser = require('feedparser');
import request from 'request';
import FeedParser from 'node-feedparser';

/*
var request = require('request')
  , FeedParser = require(__dirname+'/..')
  , Iconv = require('iconv').Iconv
  , zlib = require('zlib');*/
//var RSSreq = request('https://xkcd.com/rss.xml');
//var feedparser = new FeedParser([options]);


export class XKCD extends Widget {
  constructor() {
    super();
    this.isfull = false;
    this.name = "XKCD";
    this.location = null;
    this.myWindow = null;
    this.refresh = 86400000;
  }

  setup(location){
    //var element = document.getElementById(location);
    this.location = location;
  }

  fetch(feed) {
    savedLocation = this.location;
    // Define our streams
    var req = request(feed, {timeout: 10000, pool: false});
    req.setMaxListeners(50);
    // Some feeds do not respond without user-agent and accept headers.
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    req.setHeader('accept', 'text/html,application/xhtml+xml');

    var feedparser = new FeedParser();


    // Define our handlers
    req.on('error', done);
    req.on('response', function(res) {
      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
      var encoding = res.headers['content-encoding'] || 'identity'
        , charset = getParams(res.headers['content-type'] || '').charset;
      //res = maybeDecompress(res, encoding);
      //res = maybeTranslate(res, charset);
      res.pipe(feedparser);
    });

    feedparser.on('error', done);
    feedparser.on('end', done);
    feedparser.on('readable', function() {
      var stream = this, item;
      /*while (item = stream.read()) {
        console.log('Got article: %s', item.title || item.description);
      }*/
      item = stream.read();
      var temp = document.getElementById(savedLocation);

      //document.getElementById("text1").innerHTML = datetime;
      temp.innerHTML = item.description;
    });
    }
/*
    //If you need to decompress
    function maybeDecompress (res, encoding) {
      var decompress;
      if (encoding.match(/\bdeflate\b/)) {
        decompress = zlib.createInflate();
      } else if (encoding.match(/\bgzip\b/)) {
        decompress = zlib.createGunzip();
      }
      return decompress ? res.pipe(decompress) : res;
    }

    //If non-utf8
    function maybeTranslate (res, charset) {
      var iconv;
      // Use iconv if its not utf8 already.
      if (!iconv && charset && !/utf-*8/i.test(charset)) {
        try {
          iconv = new Iconv(charset, 'utf-8');
          console.log('Converting from charset %s to utf-8', charset);
          iconv.on('error', done);
          // If we're using iconv, stream will be the output of iconv
          // otherwise it will remain the output of request
          res = res.pipe(iconv);
        } catch(err) {
          res.emit('error', err);
        }
      }
      return res;
    }
*/
    getParams(str) {
      var params = str.split(';').reduce(function (params, param) {
        var parts = param.split('=').map(function (part) { return part.trim(); });
        if (parts.length === 2) {
          params[parts[0]] = parts[1];
        }
        return params;
      }, {});
      return params;
    }

    done(err) {
      if (err) {
        console.log(err, err.stack);
        return process.exit(1);
      }
      server.close();
      process.exit();
    }

  loop() {
    fetch('https://xkcd.com/rss.xml');
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

  open(){
    //window.location = "http://www.google.com"

    //opening a new window each time you fullscreen something. is that good? probably not in the long run
    myWindow = window.open("XKCD.html");

    //pass in location on where it should go (ex. regiontopleft)
    setup(location);

    /*var loc = document.getElementById("regiontopleft");
    loc.innerHTML = */

    //window.location is an alternative
    //window.location.assign("hello_world.html");
    isfull = true;
  }

  getRefresh() {
    return this.refresh;
  }

  setRefresh(rate) {
    this.refresh = rate;
  }
}
