//import Box2D from 'src/components/box2d/box2d';

// import InputController from "src/components/input/inputController";
// import testbed from 'src/libs/embox2d-html5canvas-testbed';

import Util from 'src/components/util/util';
import CarApp from 'src/CarApp';
import RubeApp from 'src/RubeApp';



var config = {
  canvas: {
    fullscreen: true,
    fps: true
  },
  world: {
    gravity: {
      x: 0,
      y: -19.8,
    },
    drawDebug: true,
    drawAxes: true,
  }
};

Util.setConfig(config);




var app = new RubeApp();

app.run();
