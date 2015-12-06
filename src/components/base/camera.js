import Util from 'src/components/util/util';
import Box2D from 'src/components/box2d/box2d';

var PTM = 32;

var PTM = 32;
var viewCenterPixel = {
  x: 0,
  y: 0
};
var singleWorldPoint = {
  x:0,
  y:0
};
var offset = {
  x:0,
  y:0
};

var futurePos = new Box2D.b2Vec2(0,0);

var average;
var averageArray = [];
var timeTotal = 0;
var averageCount = 60;

var _frames = 0;

class Camera {

  constructor(canvas) {
    this.canvas = canvas;
    this.config = Util.readConfig('canvas');

    // this.fpsWorker = new Worker('src/components/base/fps.js');
    // this.fpsWorker.onmessage = this.onFPS.bind(this);

    this.updateEnvironmentVariables();
    window.addEventListener('resize', this.updateEnvironmentVariables.bind(this), false);
  }

  update(timestamp){
    if(this.chaseEntity){
      futurePos = this.chaseEntity.GetPosition();
      // var vel = this.chaseEntity.GetLinearVelocity();
      // futurePos.set_x( pos.get_x() + 0.15 * vel.get_x() );
      // futurePos.set_y( pos.get_y() + 0.15 * vel.get_y() );
      this.setViewCenterWorld( futurePos );
    }

    if(this.config.fps){
      // this.fpsWorker.postMessage(timestamp);
      this.calculateFPS(timestamp);
      this.canvas.$fps.html(this.fps);
    }
  }

  onFPS(event){
    this.canvas.$fps.html(Math.ceil(event.data));
  }

  setChaseEntity(ent){
    this.chaseEntity = ent;
  }

  getWorldPointFromPixelPoint(pixelPoint) {
    singleWorldPoint.x = (pixelPoint.x - offset.x) / PTM;
    singleWorldPoint.y = (pixelPoint.y - (this.canvas.height() - offset.y)) / PTM;
    return singleWorldPoint;
  }

  setViewCenterWorld(b2vecpos, instantaneous) {
    var currentViewCenterWorld = this.getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    offset.x -= Util.myRound(fraction * toMoveX * PTM, 0);
    offset.y += Util.myRound(fraction * toMoveY * PTM, 0);
  }

  updateEnvironmentVariables(){
    viewCenterPixel = {
      x: this.canvas.width() / 2,
      y: this.canvas.height() / 2
    };
  }

  getPTM(){
    return PTM;
  }

  setPTM(ptm){
    PTM = ptm;
  }

  getOffset(){
    return offset;
  }

  getOffsetX(){
    return offset.x;
  }

  getOffsetY(){
    return offset.y;
  }

  setOffset(obj, y){
    if(typeof obj === 'object' && !y){
      offset.x = obj['x'] || 0;
      offset.y = obj['y'] || 0;
    } else if(typeof obj === 'number' && typeof y === 'number'){
      offset.x = obj;
      offset.y = y;
    }
  }

  calculateFPS(timestamp){
    timeTotal += timestamp;
    // averageArray.push(timestamp);
    //
    // if(averageArray.length>averageCount){
    //   timeTotal -= averageArray.shift();
    //   average = timeTotal / averageCount;
    //   return 1 / average;
    // }
    // return 0;

    if(timeTotal >= 1.0){
      this.fps = _frames;
      timeTotal = 0;
      _frames = 0;
    }
    _frames++;
  }

  setTransform(ctx){
    ctx.translate(this.getOffsetX(), this.getOffsetY());
    ctx.scale(1,-1);
    ctx.scale(this.getPTM(),this.getPTM());
    ctx.lineWidth /= this.getPTM();
  }
}


export default Camera;
