var React = require('react');
var Fabric = require('fabric').fabric;

var Canvas = React.createClass({
  
  getInitialState: function() {
    return {};
  },
  
  componentDidMount: function() {
    // Generates Fabric's Canvas object
    this.fabric = new Fabric.Canvas(React.findDOMNode(this.refs.canvas));
    
    if(this.props.drawingMode) {
      this.bindDrawingEvents();
    } else {
      this.unbindDrawingEvents();
    }
  },
  
  bindDrawingEvents: function() {
    var rect;
    var origin = {};
    var isDown = false;
    
    this.fabric.selection = false;
    
    this.fabric.on('mouse:down', function(o) {
      var pointer = this.getPointer(o.e);
      isDown = true;
      origin.x = pointer.x;
      origin.y = pointer.y;
      
      rect = new Fabric.Rect({
        left: origin.x,
        top: origin.y,
        width: pointer.x - origin.x,
        height: pointer.y - origin.y,
        fill: 'rgba(255, 255, 255, 0)',
        stroke: 'red',
        strokeWidth: 3
      });
      
      this.add(rect);
    });
    
    this.fabric.on('mouse:move', function(o) {
      if(!isDown) {
        return;
      }
      
      var pointer = this.getPointer(o.e);
      
      if(origin.x > pointer.x) {
        rect.set({ left: Math.abs(pointer.x) });
      }
      
      if(origin.y > pointer.y) {
        rect.set({ top: Math.abs(pointer.y) });
      }
      
      rect.set({ width: Math.abs(origin.x - pointer.x) });
      rect.set({ height: Math.abs(origin.y - pointer.y) });
      
      this.renderAll();
    });
    
    this.fabric.on('mouse:up', function() {
      isDown = false;
    });
  },
  
  unbindDrawingEvents: function() {
    this.fabric.selection = true;
    
    this.fabric.off('mouse:down');
    this.fabric.off('mouse:move');
    this.fabric.off('mouse:up');
  },
  
  render: function() {
    return (
      <canvas ref="canvas" width="600" height="400" style={{border: '1px solid black'}}></canvas>
    );
  }
});

module.exports = Canvas;
