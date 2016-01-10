import Blaster from 'src/d3/blaster/Blaster';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';

class MainBlaster extends Blaster {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
  }

  draw(ctx, delta){

  }

  fire(){
    super.fire();
    console.log("MainBlaster.fire()");
    //Create Bullet

    var bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    bd.set_gravityScale(0);
    bd.set_fixedRotation(true);
    bd.set_linearVelocity(new Box2D.b2Vec2(30, 0));

    var body = this.world.CreateBody(bd);
    console.log(body);

    var fd = new Box2D.b2FixtureDef();
    var shape = new Box2D.b2CircleShape();
    var radius = .1;
    //var center = this.parseVec(0, 0);


    shape.set_m_radius(radius);
    //shape.set_m_p(center);

    fd.set_shape(shape);

    var fixture = body.CreateFixture(fd);
    /* var data = {
       type:'circle',
       radius:radius,
       center:center,
       json:fixtureJso
       }
       body.fixtures.push(data);
     */

  }
}

export default MainBlaster;
