import Util from 'src/components/util/util';

let listeners = [];
let defaultKeyConfig = {
  keys: {

  },
  preventDefault: true
}

class InputController {
  constructor(canvas) {
    this.canvas = canvas;

    this.initKeys();
    // this.initMouse();
  }

  // input methods

  addEventListener(listener){
    listeners.push(listener);
  }

  newEventListener(keyConfig, alsoAdd){
    var l = new InputEventListener(keyConfig);
    if(alsoAdd){
      this.addEventListener(l);
    }
    return l;
  }

  //  -- keyboard
  initKeys() {
    console.log(this.canvas);
    canvas.addEventListener('keydown', function(evt) {
      // evt.preventDefault();
      this.onKeyDown(canvas,evt);
    }.bind(this), false);

    canvas.addEventListener('keyup', function(evt) {
      // evt.preventDefault();
      this.onKeyUp(canvas,evt);
    }.bind(this), false);
  }

  onKeyDown(canvas, evt) {
    // console.log(evt.keyCode);
    var l;
    try {
      l = listeners[listeners.length-1];
      if(l){
        var cfg = l.keyConfig;
        l[cfg[evt.keyCode]].call(l,true,evt);
      }
    } catch (e) {
    }

  }

  onKeyUp(canvas, evt) {
    // console.log(evt.keyCode);
    var l;
    try {
      l = listeners[listeners.length-1];
      if(l){
        var cfg = l.keyConfig;
        l[cfg[evt.keyCode]].call(l,false,evt);
      }
    } catch (e) {
    }
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

class InputEventListener {
  constructor(keyConfig) {
    this.keyConfig = Util.extend(keyConfig, defaultKeyConfig);
  }

  start(){
  }

  select(){
  }

  home(){  // ps/xb button
  }

  left(){
  }

  right(){
  }

  up(){
  }

  down(){
  }

  l1(){
  }

  l2(){
  }

  l3(){
  }

  r1(){
  }

  r2(){
  }

  r3(){
  }

  triangle(){
  }

  square(){
  }

  circle(){
  }

  cross(){
  }
}

export default InputController;
