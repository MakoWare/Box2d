import Util from 'src/components/util/util';
//import YourApp from here;


var config = {
  canvas: {
    fullscreen: true
  },
  camera: {
    fps: true,
    extras: {
      axes: true,
      grid: true
    }
  },
  world: {
    gravity: {
      x: 0,
      y: -9.8,
    },
    drawDebug: true
  }
};

Util.setConfig(config);




//var app = new YourApp();
//app.run();
