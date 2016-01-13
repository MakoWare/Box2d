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
    this.enableStep();
  }

  drawDebug(override){
    if(this.config.drawDebug || override){
      this.world.DrawDebugData();
    }
  }

  step(delta,a,b){
    delta = (delta!==undefined && delta!==null) ? delta : 0;
    a = (a!==undefined && a!==null) ? a : 3;
    b = (b!==undefined && b!==null) ? b : 2;
    if(this.stepWorld){
      this.world.Step(delta, a, b);
    }
  }

  enableStep(){
    this.stepWorld = true;
  }

  disableStep(){
    this.stepWorld = false;
  }

  destroy(){
    Box2D.destroy(this.world);
  }

}

export default World;
