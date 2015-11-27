import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';

class CarApp extends BaseApp {

  constructor() {
    super();

    var ground = this.world.CreateBody( new Box2D.b2BodyDef() );
    var shape = new Box2D.b2EdgeShape();
    var fd = new Box2D.b2FixtureDef();
    fd.set_shape(shape);
    fd.set_density(0.0);
    fd.set_friction(0.6);

    shape.Set(new Box2D.b2Vec2(-20.0, 0.0), new Box2D.b2Vec2(20.0, 0.0));
    ground.CreateFixture(fd);

    this.setDebugDraw(true);
    this.world.setViewCenterWorld(new Box2D.b2Vec2(0,1), true);
  }

  draw(context){
    
  }
}

export default CarApp;
