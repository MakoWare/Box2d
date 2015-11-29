import Canvas from 'src/components/canvas/canvas';
import World from 'src/components/world/world';


class BaseApp {
  constructor() {
    this.canvas = new Canvas();
    this.context = this.canvas.getContext();
    this.world = new World(null, this.canvas);
    this.run = true;
    this.lastTime = Date.now();

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

  _draw(timestamp) {

    //black background
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect( 0, 0, this.canvas.el.width, this.canvas.el.height );

    this.context.save();




    this.context.translate(this.canvas.offset.x, this.canvas.offset.y);
    this.context.scale(1,-1);
    this.context.scale(this.world.getPTM(),this.world.getPTM());
    this.context.lineWidth /= this.world.getPTM();

    // DebugDraw.drawAxes(context);
    //
    // context.fillStyle = 'rgb(255,255,0)';
    // World.world.DrawDebugData();

    this.draw(this.context, timestamp);

    // if ( mouseJoint != null ) {
    //   //mouse joint is not drawn with regular joints in debug draw
    //   var p1 = mouseJoint.GetAnchorB();
    //   var p2 = mouseJoint.GetTarget();
    //   context.strokeStyle = 'rgb(204,204,204)';
    //   context.beginPath();
    //   context.moveTo(p1.get_x(),p1.get_y());
    //   context.lineTo(p2.get_x(),p2.get_y());
      // this.context.stroke();
    // }

    this.context.restore();
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
    // World.world.Step(1/60, 3, 2);
    // var frametime = (Date.now() - current);
    // frameTime60 = frameTime60 * (59/60) + frametime * (1/60);
    //
    this._draw(timestamp);
    // statusUpdateCounter++;
    // if ( statusUpdateCounter > 20 ) {
    //   this.updateStats();
    //   statusUpdateCounter = 0;
    // }

  }

  _animate() {
    if ( this.run ){
      window._requestAnimFrame( this._animate );
    }
    var dateNow = Date.now(),
        diffTime = (dateNow - this.lastTime) / 1000;

    this.lastTime = dateNow;

    this._step(diffTime);
  }

  pause() {
    this.run = !this.run;
    if (this.run)
      this._animate();
    // this.updateStats();
  }
}

export default BaseApp;
