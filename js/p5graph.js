(function(global) {

  function P5CanvasNode() {
      this.addInput("clear", LiteGraph.ACTION);
      this.addOutput("", "canvas");
      this.properties = { width: 320, height: 240, autoclear: true };

      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
  }

  CanvasNode.title = "P5Canvas";
  CanvasNode.desc = "Canvas is where you draw your stuff";

  CanvasNode.prototype.onExecute = function() {
      var canvas = this.canvas;
      var w = this.properties.width | 0;
      var h = this.properties.height | 0;
      if (canvas.width != w) {
          canvas.width = w;
      }
      if (canvas.height != h) {
          canvas.height = h;
      }

      if (this.properties.autoclear) {
          this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      this.setOutputData(0, canvas);
  };

  CanvasNode.prototype.onAction = function(action, param) {
      if (action == "clear") {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
  };

  LiteGraph.registerNodeType("graphics/canvas", CanvasNode);

  function DrawImageNode() {
      this.addInput("canvas", "canvas");
      this.addInput("img", "image,canvas");
      this.addInput("x", "number");
      this.addInput("y", "number");
      this.properties = { x: 0, y: 0, opacity: 1 };
  }

  DrawImageNode.title = "DrawImage";
  DrawImageNode.desc = "Draws image into a canvas";

  DrawImageNode.prototype.onExecute = function() {
      var canvas = this.getInputData(0);
      if (!canvas) {
          return;
      }

      var img = this.getInputOrProperty("img");
      if (!img) {
          return;
      }

      var x = this.getInputOrProperty("x");
      var y = this.getInputOrProperty("y");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, x, y);
  };

  LiteGraph.registerNodeType("graphics/drawImage", DrawImageNode);

  function DrawRectangleNode() {
      this.addInput("canvas", "canvas");
      this.addInput("x", "number");
      this.addInput("y", "number");
      this.addInput("w", "number");
      this.addInput("h", "number");
      this.properties = {
          x: 0,
          y: 0,
          w: 10,
          h: 10,
          color: "white",
          opacity: 1
      };
  }

  DrawRectangleNode.title = "DrawRectangle";
  DrawRectangleNode.desc = "Draws rectangle in canvas";

  DrawRectangleNode.prototype.onExecute = function() {
      var canvas = this.getInputData(0);
      if (!canvas) {
          return;
      }

      var x = this.getInputOrProperty("x");
      var y = this.getInputOrProperty("y");
      var w = this.getInputOrProperty("w");
      var h = this.getInputOrProperty("h");
      var ctx = canvas.getContext("2d");
      ctx.fillRect(x, y, w, h);
  };

  LiteGraph.registerNodeType("graphics/drawRectangle", DrawRectangleNode);

})(this);