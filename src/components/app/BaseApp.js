import Canvas from 'src/components/canvas/canvas';
import Camera from 'src/components/base/camera';
import World from 'src/components/world/world';
import Util from 'src/components/util/util';


class BaseApp {
  constructor() {
    this.canvas = new Canvas();
    this.context = this.canvas.getContext();
    this.world = new World();
    this.camera = new Camera(this.canvas);
    this.running = false;
    this.lastTime = Date.now();
    this.config = Util.getConfig();

    window._requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
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

  _draw(ctx, timestamp) {

    //black background
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect( 0, 0, this.canvas.el.width, this.canvas.el.height );

    ctx.save();


    // console.log(ctx);

    ctx.translate(this.camera.getOffsetX(), this.camera.getOffsetY());
    ctx.scale(1,-1);
    ctx.scale(this.camera.getPTM(),this.camera.getPTM());
    ctx.lineWidth /= this.camera.getPTM();

    if(this.config.world.drawAxes){
      this.world.drawAxes(ctx);
    }

    if(this.debugDraw && this.config.world.drawDebug){
      this.world.DrawDebugData();
    }


    this.draw(ctx, timestamp);

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
    this.world.Step(timestamp, 3, 2);
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
