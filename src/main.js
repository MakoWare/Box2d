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




var app = new TimeSquaredApp();
app.run();
