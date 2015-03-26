var React = require('react');
var Fabric = require('fabric').fabric;

var canvas = new Fabric.Canvas('canvas');



// create a rectangle object
var rect = new Fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

// "add" rectangle onto canvas
canvas.add(rect);
