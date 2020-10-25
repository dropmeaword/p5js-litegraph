(function(global) {

  function P5CanvasNode() {
    this.addInput("clear", LiteGraph.ACTION);
    this.addOutput("", "canvas");
    this.properties = { width: 320, height: 240, autoclear: true };

    var skpreview = function( p ) {
        var x = 100; 
        var y = 100;
        p.setup = function() {
            p.createCanvas(this.properties.width, this.properties.height);
        };

        p.draw = function() {
        };
    };

    this.canvas = document.getElementById("preview")
    this.ctx = new p5(skpreview, this.canvas)
  }

  P5CanvasNode.title = "P5Canvas";
  P5CanvasNode.desc = "Canvas is where you draw your stuff";

  P5CanvasNode.prototype.onExecute = function() {
      if (this.properties.autoclear) {
        this.ctx.background(0);
      }
      this.setOutputData(0, canvas);
  };

  P5CanvasNode.prototype.onAction = function(action, param) {
      if (action == "clear") {
        this.ctx.background(0);
      }
  };

  LiteGraph.registerNodeType("p5js/canvas", P5CanvasNode);


  function P5RectangleNode() {
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

  P5RectangleNode.title = "P5Rectangle";
  P5RectangleNode.desc = "Draws rectangle in P5 canvas";

  P5RectangleNode.prototype.onExecute = function() {
      var canvas = this.getInputData(0);
      if (!canvas) {
          return;
      }

      var x = this.getInputOrProperty("x");
      var y = this.getInputOrProperty("y");
      var w = this.getInputOrProperty("w");
      var h = this.getInputOrProperty("h");

      ctx.stroke(0)
      ctx.strokeWidth(4)
      ctx.fill(255)
      ctx.rect(x, y, w, h);
  };

  P5RectangleNode.registerNodeType("p5js/rectangle", P5RectangleNode);

})(this);