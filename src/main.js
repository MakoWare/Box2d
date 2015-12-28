import Util from 'src/components/util/util';
import D3App from 'src/d3/D3App';


var config = {
  canvas: {
    fullscreen: true
  },
  camera: {
    fps: true,
    extras: {
      axes: false,
      grid: false
    },
    ptm: 20
  },
  world: {
    gravity: {
      x: 0,
      y: 0
    },
    drawDebug: false
  },
  input: {
    logAllKeys:false,
    logUnmappedKeys:true,
  }
};

Util.setConfig(config);




var app = new D3App();
app.run();
