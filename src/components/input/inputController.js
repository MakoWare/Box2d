import worldConfig from 'src/components/world/worldConfig';
import canvas from 'src/components/canvas/canvas';
import Orientation from 'src/components/input/orientation';

class InputController {
  constructor(config) {

    this.config = config;
    // this.worldConfig = config.world;
    // this.worldConfig = WorldConfig;
    // this.canvas = config.world.canvas;

    this.initKeys();
  }

  // input methods

  //  -- keyboard
  initKeys() {
    canvas.addEventListener('keydown', function(evt) {
      evt.preventDefault();
      this.onKeyDown(canvas,evt);
    }.bind(this), false);

    canvas.addEventListener('keyup', function(evt) {
      evt.preventDefault();
      this.onKeyUp(canvas,evt);
    }.bind(this), false);
  }

  onKeyDown(canvas, evt) {
    console.log(evt.keyCode);

    // draw();
    console.log('do draw()');
  }

  onKeyUp(canvas, evt) {
    console.log(evt.keyCode);
  }



  //  -- mouse
  initMouse(){
    canvas.addEventListener('mousemove', function(evt) {
      this.onMouseMove(canvas,evt);
    }, false);

    canvas.addEventListener('mousedown', function(evt) {
      this.onMouseDown(canvas,evt);
    }, false);

    canvas.addEventListener('mouseup', function(evt) {
      this.onMouseUp(canvas,evt);
    }, false);

    canvas.addEventListener('mouseout', function(evt) {
      this.onMouseOut(canvas,evt);
    }, false);
  }

  onMouseMove(canvas, evt) {
    prevMousePosPixel = mousePosPixel;
    updateMousePos(canvas, evt);
    updateStats();
    if ( shiftDown ) {
      canvasOffset.x += (mousePosPixel.x - prevMousePosPixel.x);
      canvasOffset.y -= (mousePosPixel.y - prevMousePosPixel.y);
      draw();
    }
    else if ( mouseDown && mouseJoint != null ) {
      mouseJoint.SetTarget( new Box2D.b2Vec2(mousePosWorld.x, mousePosWorld.y) );
    }
  }

  onMouseDown(canvas, evt) {
    updateMousePos(canvas, evt);
    if ( !mouseDown )
      startMouseJoint();
    mouseDown = true;
    updateStats();
  }

  onMouseUp(canvas, evt) {
    mouseDown = false;
    updateMousePos(canvas, evt);
    updateStats();
    if ( mouseJoint != null ) {
      world.DestroyJoint(mouseJoint);
      mouseJoint = null;
    }
  }

  onMouseOut(canvas, evt) {
    onMouseUp(canvas,evt);
  }

  //    -- mouse helper function



}

export default new InputController();
