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

var canvasOffset = {
  x: 0,
  y: 0
};

class World {
  constructor(b2Vec2) {
    b2Vec2 = b2Vec2 || new Box2D.b2Vec2(0.0,0.0);
    this.world = new Box2D.b2World(b2Vec2);
    _using(this,this.world);

    this.updateEnvironmentVariables();
    window.addEventListener('resize', this.updateEnvironmentVariables.bind(this), false);
  }

  getWorldPointFromPixelPoint(pixelPoint) {
    singleWorldPoint.x = (pixelPoint.x - canvasOffset.x)/PTM;
    singleWorldPoint.y = (pixelPoint.y - (canvas.height - canvasOffset.y))/PTM;
    return singleWorldPoint;
  }

  setViewCenterWorld(b2vecpos, instantaneous) {
    console.log("Set View");
    var currentViewCenterWorld = this.getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    canvasOffset.x -= Util.myRound(fraction * toMoveX * PTM, 0);
    canvasOffset.y += Util.myRound(fraction * toMoveY * PTM, 0);
  }

  updateEnvironmentVariables(){
    var viewCenterPixel = {
      x: canvas.width/2,
      y: canvas.height/2
    };
  }
}

export default World;
