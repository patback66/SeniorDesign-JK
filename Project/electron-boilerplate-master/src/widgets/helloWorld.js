Widget.install("helloworld", {

  contents: {
    text: "Hello World"
  },

  buildHTML: function() {
    var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
  }
});
