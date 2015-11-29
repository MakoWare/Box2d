import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
import Canvas from 'src/components/canvas/canvas';

var PTM = 32;
var viewCenterPixel = {
  x: canvas.width/2,
  y: canvas.height/2
};
var singleWorldPoint = {
  x:0,
  y:0
};

// var canvasOffset = {
//   x: 0,
//   y: 0
// };

class World {
  constructor(b2Vec2, canvas) {
    b2Vec2 = b2Vec2 || new Box2D.b2Vec2(0.0,0.0);
    this.canvas = canvas;
    this.world = new Box2D.b2World(b2Vec2);
    Util.using(this,this.world);

    this.updateEnvironmentVariables();
    window.addEventListener('resize', this.updateEnvironmentVariables.bind(this), false);
  }

  getWorldPointFromPixelPoint(pixelPoint) {
    singleWorldPoint.x = (pixelPoint.x - this.canvas.offset.x) / PTM;
    singleWorldPoint.y = (pixelPoint.y - (this.canvas.height() - this.canvas.offset.y)) / PTM;
    return singleWorldPoint;
  }

  setViewCenterWorld(b2vecpos, instantaneous) {
    var currentViewCenterWorld = this.getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    this.canvas.offset.x -= Util.myRound(fraction * toMoveX * PTM, 0);
    this.canvas.offset.y += Util.myRound(fraction * toMoveY * PTM, 0);
  }

  updateEnvironmentVariables(){
    viewCenterPixel = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
  }

  getPTM(){
    return PTM;
  }

  setPTM(ptm){
    PTM = ptm;
  }

  drawAxes(ctx) {
    ctx.strokeStyle = 'rgb(192,0,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1, 0);
    ctx.stroke();
    ctx.strokeStyle = 'rgb(0,192,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 1);
    ctx.stroke();
  }
}

export default World;
