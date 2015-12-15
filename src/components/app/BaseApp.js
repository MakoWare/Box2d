import Canvas from 'src/components/canvas/canvas';
import Camera from 'src/components/base/camera';
import World from 'src/components/world/world';
import Util from 'src/components/util/util';
import ScreenManager from 'src/components/screen/screenManager';


class BaseApp {
  constructor() {
    this.canvas = new Canvas();
    this.context = this.canvas.getContext();
    this.world = new World();
    this.camera = new Camera(this.canvas);
    this.running = false;
    this.lastTime = Date.now();
    this.config = Util.getConfig();
    this.screenManager = new ScreenManager();

    window._requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              (function(){
                console.log('falling back to basic requestAnimationFrame');
                return false;
              })()                               ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    this._animate = this._animate.bind(this);
  }

  setDebugDraw(debugDraw){
    this.debugDraw = debugDraw;
    if(this.debugDraw){
      this.world.SetDebugDraw(this.debugDraw);
    }
  }

  draw(){
    console.log('base app draw');
  }

  _draw(ctx, delta) {

    //black background
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect( 0, 0, this.canvas.el.width, this.canvas.el.height );

    ctx.save();



    this.camera.setTransform(ctx);

    this.screenManager.draw(ctx, delta);
    this.draw(ctx, delta);

    // this.drawAxes(ctx);
    // this.drawGrid(ctx);

    // if ( mouseJoint != null ) {
    //   //mouse joint is not drawn with regular joints in debug draw
    //   var p1 = mouseJoint.GetAnchorB();
    //   var p2 = mouseJoint.GetTarget();
    //   ctx.strokeStyle = 'rgb(204,204,204)';
    //   ctx.beginPath();
    //   ctx.moveTo(p1.get_x(),p1.get_y());
    //   ctx.lineTo(p2.get_x(),p2.get_y());
      // ctx.stroke();
    // }

    ctx.restore();
  }

  drawDebug(override){
    if(this.debugDraw && (this.config.world.drawDebug || override)){
      this.world.DrawDebugData();
    }
  }

  // drawAxes(ctx, override){
  //   if(ctx && (this.config.world.drawAxes || override)){
  //     this.canvas.drawAxes(ctx);
  //   }
  // }
  //
  // drawGrid(ctx, override){
  //   if(ctx && (this.config.world.drawGrid || override)){
  //     this.world.drawGrid(ctx);
  //   }
  // }

  _step(timestamp) {
    // console.log(timestamp);
    // if ( currentTest && currentTest.step )
    //   currentTest.step();
    //
    // if ( ! showStats ) {
    //   World.world.Step(1/60, 3, 2);
    //   this._draw();
    //   return;
    // }
    //
    // var current = Date.now();

    // var frametime = (Date.now() - current);
    // frameTime60 = frameTime60 * (59/60) + frametime * (1/60);
    //
    this._draw(this.context, timestamp);
    // statusUpdateCounter++;
    // if ( statusUpdateCounter > 20 ) {
    //   this.updateStats();
    //   statusUpdateCounter = 0;
    // }

  }

  _animate() {
    if ( this.running ){
      window._requestAnimFrame( this._animate );

      var dateNow = Date.now(),
          diffTime = (dateNow - this.lastTime) / 1000;

      this.lastTime = dateNow;

      this._step(diffTime);
    }
  }

  pause() {
    this.running = !this.running;
    if (this.running)
      this._animate();
    // this.updateStats();
  }

  run(){
    this.running = true;
    this._animate();
  }
}

export default BaseApp;
