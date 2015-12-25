import Util from 'src/components/util/util';

let listeners = [];
let defaultKeyConfig = {
  options: {
    preventDefault: true
  }
}
let ps4Mapping = ['cross','circle','square','triangle','l1','r1','l2','r2','extra','start','l3','r3','up','down','left','right','home','select'];

let gamepadMaps = {
  'Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)':ps4Mapping // ps4 controller
};

let gamepadsAxisDeadZone = 0.01;
let gamepadsConfig = {};
// let gamepadTypeMaps = [{id:'054c',type:'ps4'}];

class InputController {
  constructor(canvas) {
    this.canvas = canvas;
    this.config = Util.readConfig('input');

    this.initKeys();
    // this.initMouse();
    this.initGamepads();
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
    this.canvas.addEventListener('keydown', function(evt) {
      // evt.preventDefault();
      this.onKeyDown(this.canvas,evt);
    }.bind(this), false);

    this.canvas.addEventListener('keyup', function(evt) {
      // evt.preventDefault();
      this.onKeyUp(this.canvas,evt);
    }.bind(this), false);
  }

  onKeyDown(canvas, evt) {
    // console.log(evt);
    var l;

    for(var i=listeners.length-1; i>=0; i--){
      l = listeners[i];
      if(!l){ continue;}

      var cfg = l.keyConfig;
      var key = cfg[evt.keyCode];
      if(key){
        if(l[key].call(l,true,evt) === false){
          continue;
        }
        return;
      }
    }
    if(this.config.logUnmappedKeys){
      console.log(evt.keyCode);
    }
    if(this.config.logAllKeys){
      console.log(evt.keyCode);
    }
  }

  onKeyUp(canvas, evt) {
    // console.log(evt.keyCode);
    var l;
    for(var i=listeners.length-1; i>=0; i--){
      l = listeners[i];
      if(l){
        var cfg = l.keyConfig;
        var key = cfg[evt.keyCode];
        if(key){
          if(l[key].call(l,false,evt) === false){
            continue;
          }
          break;
        }
      }
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

  //  -- gamepad
  initGamepads(){
    this.gamepads = {};
    this.lastButtonStates = [
      [], // gamepad index 0
      [], // gamepad index 1
      [], // gamepad index 2
      []  // gamepad index 3
    ];
    window.addEventListener("gamepadconnected", (e)=>{
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
      console.log(e.gamepad);
      this.getGamepads();
    });
    window.addEventListener("gamepaddisconnected", (e)=>{
      console.log('Gamepad disconnected: ',e);
      this.getGamepads();
    });
    // console.log(navigator.getGamepads());
  }

  getGamepads(){
    var gps = navigator.getGamepads() || [];
    for(var i=0;i<gps.length;i++){
      gp = this.gamepads[i];
      if(gp){
        this.gamepads[i] = gp;
      }
    }
    return gps;
  }

  step(){
    var gps = this.getGamepads();
    var gp;
    for(var i=0;i<gps.length;i++){
      gp = gps[i];
      if(gp){
        gp.buttons.forEach( (b,ix)=>{
          // console.log(b.pressed, b.value);
          var lastState = this.getLastState(i,ix);

          if(b.pressed){
            b.index = ix;
            this.gamepadButtonEvent(gp,b,true);
          } else if(lastState && lastState.pressed){
            this.gamepadButtonEvent(gp,b,false);
          }

          this.setLastState(i,ix,b.pressed);
        });

        // gp.axes.forEach( (value,ix)=>{
        //   var dz = this.getDeadZone(i);
        //
        //   if( ix==0){
        //     console.log('axis %d event: %d',ix,value);
        //   }
        //
        //
        // });
      }
    }
  }

  getDeadZone(gamepadIndex){
    if(gamepadsConfig.hasOwnProperty(gamepadIndex) && gamepadsConfig[gamepadIndex].hasOwnProperty(deadZone)){
      return gamepadsConfig[gamepadIndex].deadZone;
    }
    return gamepadsAxisDeadZone;
  }

  setDeadZone(deadZone,gamepadIndex){
    if(gamepadIndex !== null && gamepadIndex !== undefined){
      if(gamepadsConfig.hasOwnProperty(gamepadIndex)){
        gamepadsConfig[gamepadIndex].deadZone = deadZone;
      } else {
        gamepadsConfig[gamepadIndex] = {deadZone: deadZone};
      }
    } else {
      gamepadsAxisDeadZone = deadZone;
    }
  }

  getLastState(i,ix){
    var b = this.lastButtonStates[i][ix];
    return b;
  }

  setLastState(i,ix,state){
    this.lastButtonStates[i][ix] = {pressed:state};
  }

  gamepadButtonEvent(gamepad,button,down) {
    button.id = gamepadMaps[gamepad.id][button.index];
    if(button.id){
      if(down){
        this.onGamepadDown(new GamepadButtonEvent(gamepad,button,down));
      } else {
        this.onGamepadUp(new GamepadButtonEvent(gamepad,button,down));
      }
    }
  }

  onGamepadDown(evt){
    var l;

    if(this.config.logAllKeys){
      console.log(evt.keyCode,evt.keyIdentifier);
    }
    for(var i=listeners.length-1; i>=0; i--){
      l = listeners[i];
      if(!l){ continue;}
      var func = l[evt.keyIdentifier];
      if(!func){ continue;}
      if(func.call(l,true,evt) === false){
        continue;
      }
      return;
    }
    if(this.config.logUnmappedKeys){
      console.log(evt.keyCode,evt.keyIdentifier,evt.button.value);
    }
  }

  onGamepadUp(evt){
    var l;
    for(var i=listeners.length-1; i>=0; i--){
      l = listeners[i];
      if(!l){ continue;}
      var func = l[evt.keyIdentifier];
      if(!func){ continue;}
      if(func.call(l,false,evt) === false){
        continue;
      }
      return;
    }
  }

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

  extra(){

  }
}

class GamepadButtonEvent {
  constructor(gamepad,button,down) {
    this.gamepad = gamepad;
    this.button = button;
    this.down = down;
    this.type = 'gamepadButtonDown';
    this.keyCode = button.index;
    this.keyIdentifier = button.id;
  }
}

export default InputController;
