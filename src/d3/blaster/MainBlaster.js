import Blaster from 'src/d3/blaster/Blaster';
import MainBlasterBullet from 'src/d3/bullet/MainBlasterBullet';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';
import EntityManager from 'src/components/engine/EntityManager';

class MainBlaster extends Blaster {
  constructor(world, playerBody){
    super();
    this.world = world;
    this.playerBody = playerBody;
    this.allDim = true;
    console.log(EntityManager);
  }

  draw(ctx, delta){

  }

  fire(){
    super.fire();

    //Create Bullet
    var bd = new Box2D.b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    bd.set_gravityScale(0);
    bd.set_fixedRotation(true);
    bd.set_linearVelocity(new Box2D.b2Vec2(30, 0));
    bd.set_bullet(true);

    //shoot from the hip
    var playerPos = this.playerBody.GetPosition();
    var center = new Box2D.b2Vec2(playerPos.get_x() + .5 , playerPos.get_y() + .5);

    bd.set_position(center);

    var body = this.world.CreateBody(bd);
    body.SetBullet(true);

    var fd = new Box2D.b2FixtureDef();
    var shape = new Box2D.b2CircleShape();
    var radius = .1;

    shape.set_m_radius(radius);
    fd.set_shape(shape);

    var fixture = body.CreateFixture(fd);
    var bullet = new MainBlasterBullet(body, null, null, this.world);
    bullet.fixture = fixture;
    EntityManager.addEntity(bullet);
  }
}

export default MainBlaster;
