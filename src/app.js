var React = require('react');
var Fabric = require('fabric').fabric;
var Canvas = require('./components/canvas');

var App = React.createClass({
  addRectangle: function(event) {
    var rect = new Fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    this.refs.canvas.fabric.add(rect);
  },
  
  activateSelectionMode: function() {
    this.refs.canvas.unbindDrawingEvents();
  },
  
  activateDrawingMode: function() {
    this.refs.canvas.bindDrawingEvents();
  },
  
  render: function() {
    return (
      <div>
        <Canvas ref="canvas" />
        <button onClick={this.addRectangle}>Add Rectangle</button>
        <button onClick={this.activateSelectionMode}>Selection Mode</button>
        <button onClick={this.activateDrawingMode}>Drawing Mode</button>
      </div>      
    );
  }
});

module.exports = App;
