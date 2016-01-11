import Blaster from 'src/d3/blaster/Blaster';
import MainBlasterBullet from 'src/d3/bullet/MainBlasterBullet';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';

class MainBlaster extends Blaster {
  constructor(body, image, options, world, playerBody){
    super(body, image, options);
    this.world = world;
    this.playerBody = playerBody;
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
    bd.set_bullet(true);

    var body = this.world.CreateBody(bd);
    body.SetBullet(true);

    var fd = new Box2D.b2FixtureDef();
    var shape = new Box2D.b2CircleShape();
    var radius = .1;

    //shoot from the hip
    var playerPos = this.playerBody.GetPosition();
    var center = new Box2D.b2Vec2(playerPos.get_x() + .5 , playerPos.get_y() + .5);


    shape.set_m_radius(radius);
    shape.set_m_p(center);

    fd.set_shape(shape);

    var fixture = body.CreateFixture(fd);
    var bullet = new MainBlasterBullet(body, null, null, this.world);
  }
}

export default MainBlaster;
