import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';
import B2DEntity from 'src/components/box2d/B2DEntity';
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
    this.entities = [];
    this.reverse = false;

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

    var taco = new B2DEntity(this.world);

    this.entities.push(taco);

    setTimeout(function(){
      this.reverse = true;
      console.log(this.reverse); 

    }.bind(this), 2000)
  }

  draw(ctx){
    this.step();
    this.world.drawAxes(ctx);
    this.world.DrawDebugData();

    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);


  }

  step(){
    if(!this.reverse){
      this.entities.forEach((entity) => {
        entity.pushState();
      });
    } else {
      this.entities.forEach((entity) => {
        entity.setState();
        entity.popState();
      });
      //this.reverse = false;
    }
  }
}

export default CarApp;
