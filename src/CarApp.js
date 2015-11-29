import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';

import DebugDraw from 'src/components/box2d/debugDraw';

class CarApp extends BaseApp {

  constructor() {
    super();

    // this.debug = new DebugDraw(this.canvas);
    // this.setDebugDraw(this.debug.getDebugDraw());
    // this.debugDraw.SetFlags(this.debug.e_shapeBit);
    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);

    var ground = this.world.CreateBody( new Box2D.b2BodyDef() );
    var shape = new Box2D.b2EdgeShape();
    var fd = new Box2D.b2FixtureDef();
    fd.set_shape(shape);
    fd.set_density(0.0);
    fd.set_friction(0.6);
    //
    shape.Set(new Box2D.b2Vec2(-550.0, 0.0), new Box2D.b2Vec2(550.0, 0.0));
    ground.CreateFixture(fd);

    this.world.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);

    // this.world.setPTM()
  }

  draw(ctx){
    this.world.drawAxes(ctx);
    this.world.DrawDebugData();

    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);
  }
}

export default CarApp;
