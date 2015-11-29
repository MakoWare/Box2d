//import Box2D from 'src/components/box2d/box2d';

// import InputController from "src/components/input/inputController";
// import testbed from 'src/libs/embox2d-html5canvas-testbed';

import CarApp from 'src/CarApp';

import DebugDraw from 'src/libs/embox2d-html5canvas-debugDraw';



// var debugDraw = new DebugDraw(canvas);
//WHERE THE FUCK IS THIS      ^^^^^^  canvas variable coming from?

// debugDraw.SetFlags(debugDraw.e_shapeBit);

var app = new CarApp();
// app.setDebugDraw(debugDraw);

app._animate();
