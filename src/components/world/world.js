import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
// var world = new Box2D.b2World( new Box2D.b2Vec2(0.0, -10.0) );

var PTM = 32;

var viewCenterPixel = {
  x:320,
  y:240
};
var singleWorldPoint = {
  x:0,
  y:0
}

class World {
  constructor(b2Vec2) {
    b2Vec2 = b2Vec2 || new Box2D.b2Vec2(0.0,0.0);
    this.world = new Box2D.b2World(b2Vec2);
    _using(this,this.world);
  }

  getWorldPointFromPixelPoint(pixelPoint) {
    singleWorldPoint.x = (pixelPoint.x - canvasOffset.x)/PTM;
    singleWorldPoint.y = (pixelPoint.y - (canvas.height - canvasOffset.y))/PTM;
    return singleWorldPoint;
  }

  setViewCenterWorld(b2vecpos, instantaneous) {
    var currentViewCenterWorld = this.getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    canvasOffset.x -= Util.myRound(fraction * toMoveX * PTM, 0);
    canvasOffset.y += Util.myRound(fraction * toMoveY * PTM, 0);
  }
}

export default World;
