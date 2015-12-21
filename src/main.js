import Util from 'src/components/util/util';
import TimeSquaredApp from 'src/t2/TimeSquaredApp';


var config = {
  canvas: {
    fullscreen: true
  },
  camera: {
    fps: true,
    extras: {
      axes: true,
      grid: true
    },
    ptm: 20
  },
  world: {
    gravity: {
      x: 0,
      y: 0
    },
    drawDebug: true
  },
  input: {
    logAllKeys:false,
    logUnmappedKeys:true,
  }
};

Util.setConfig(config);




var app = new TimeSquaredApp();
app.run();
