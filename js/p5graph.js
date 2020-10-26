(function(global) {

  var LiteGraph = global.LiteGraph;

  function P5CanvasNode() {
    this.addInput("clear", LiteGraph.ACTION);
    this.addOutput("", "canvas");
    this.properties = { width: 320, height: 240, autoclear: true };
    this.cxt = null
    var that = this

    // begin p5js sketch
    var skpreview = function( p ) {
        var g
        p.setup = function() {
          p.createCanvas(that.properties.width, that.properties.height);
          g = p.createGraphics(that.properties.width, that.properties.height)
        }

        p.draw = function() {
          //console.log("drawing frame")
          p.image(that.ctx, 0, 0)
        }
    }
    // end p5js sketch

    var el = document.getElementById("preview")
    // console.log( el )
    this.canvas = new p5(skpreview, el)
    // console.log( this.canvas  )
    this.ctx = this.canvas.createGraphics(this.properties.width, this.properties.height)
  }

  P5CanvasNode.title = "P5Canvas";
  P5CanvasNode.desc = "Canvas is where you draw your stuff";

  P5CanvasNode.prototype.onExecute = function() {
      if (this.properties.autoclear) {
        this.ctx.background(0);
      }
      this.setOutputData(0, this.ctx);
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
    
//       console.log("x: "+x+" y: "+y+" w: "+w+" h: "+h)

       // console.log(canvas)
    
      // canvas.stroke(0)
      // canvas.strokeWeight(4)
      // canvas.fill(255)
      canvas.rect(x, y, w, h);
  };

  LiteGraph.registerNodeType("p5js/rectangle", P5RectangleNode);

  function P5EllipseNode() {
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

  P5EllipseNode.title = "P5Ellipse";
  P5EllipseNode.desc = "Draws an ellipse in P5 canvas";

  P5EllipseNode.prototype.onExecute = function() {
      var canvas = this.getInputData(0);
      if (!canvas) {
          return;
      }

      var x = this.getInputOrProperty("x");
      var y = this.getInputOrProperty("y");
      var w = this.getInputOrProperty("w");
      var h = this.getInputOrProperty("h");
    
      canvas.ellipse(x, y, w, h);
  };

  LiteGraph.registerNodeType("p5js/ellipse", P5EllipseNode);

})(this);