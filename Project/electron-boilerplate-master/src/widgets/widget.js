var Widget = Class.extend(
  contents = {},
  //call on instantiation
  init: function () {

  },
  //for startup tasks
  start: function () {

  },
  //load the widget into the dom
  buildHTML: function () {
    var wrapper = document.createElement("div");
    var me = document.createTextNode(this.name);
    wrapper.appendChild(me);
    return wrapper;
  },

);

Widget.scripts = {};

Widget.construct = function (name) {
  if(!Widget.scripts[name]) {
    return; //already installed, don't add duplicates
  }

  var definedScripts = Widget.scripts[name];
  var clone = cloneObject(definedScripts);

  var WidgetClass = Widget.extend(clone);
  return new WidgetClass();
};

Widget.install = function(name, widgetDefinition) {
  Log.log("Widget installed: " + name);
  Widget.scripts[name] = WidgetDefinition;
};
