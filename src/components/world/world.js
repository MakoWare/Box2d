import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';

// var canvasOffset = {
//   x: 0,
//   y: 0
// };

class World {
  constructor(b2Vec2) {
    var x = Util.readConfig('world','gravity.x',0),
        y = Util.readConfig('world','gravity.y',0);

    b2Vec2 = b2Vec2 || new Box2D.b2Vec2(x,y);
    this.world = new Box2D.b2World(b2Vec2);
    Util.using(this,this.world);
    this.config = Util.readConfig('world');
  }

  drawDebug(override){
    if(this.config.drawDebug || override){
      this.world.DrawDebugData();
    }
  }

}

export default World;
