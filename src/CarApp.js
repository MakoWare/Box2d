import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
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



    this.camera.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);

    this.createGround();
    this.createCar();

    this.canvas.$el.on('keydown', this.onKeyDown.bind(this));
    this.canvas.$el.on('keyup', this.onKeyUp.bind(this));
  }

  draw(ctx){



    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);
  }

  moveRight(down){
    if(down){
      this.rearWheelJoint.SetMotorSpeed(-50);
      this.wheelJoint2.SetMotorSpeed(-50);
    } else {
      this.rearWheelJoint.SetMotorSpeed(0);
      this.wheelJoint2.SetMotorSpeed(0);
    }
  }

  moveLeft(down){
    if(down){
      this.rearWheelJoint.SetMotorSpeed(50);
      this.wheelJoint2.SetMotorSpeed(50);
    } else {
      this.rearWheelJoint.SetMotorSpeed(0);
      this.wheelJoint2.SetMotorSpeed(0);
    }
  }

  onKeyDown(event){
    switch (event.keyCode) {
      case 39: // right
        this.moveRight(true);
        break;
      case 37: // left
        this.moveLeft(true);
        break;
      default:
      console.log(event.keyCode);
    }
  }

  onKeyUp(event){
    switch (event.keyCode) {
      case 39: // right
        this.moveRight(false);
        break;
      case 37: // left
        this.moveLeft(false);
        break;
      default:
      console.log(event.keyCode);
    }
  }

  createGround(){
    var ground = this.world.CreateBody( new Box2D.b2BodyDef() );
    var shape = new Box2D.b2EdgeShape();
    var fd = new Box2D.b2FixtureDef();
    fd.set_shape(shape);
    fd.set_density(0.0);
    fd.set_friction(0.9);
    //
    shape.Set(new Box2D.b2Vec2(-550.0, 0.0), new Box2D.b2Vec2(550.0, 0.0));
    ground.CreateFixture(fd);
  }

  createCar(){
      var carVerts = [];
      carVerts.push( new Box2D.b2Vec2(-1.5, -0.5) );
      carVerts.push( new Box2D.b2Vec2(1.5, -0.5) );
      carVerts.push( new Box2D.b2Vec2(1.5, 0.0) );
      carVerts.push( new Box2D.b2Vec2(0.0, 0.9) );
      carVerts.push( new Box2D.b2Vec2(-1.15, 0.9) );
      carVerts.push( new Box2D.b2Vec2(-1.5, 0.2) );
      var chassisShape = new this.world.createPolygonShape(carVerts);

      var bd = new Box2D.b2BodyDef();
      // bd.set_type(b2_dynamicBody);
      bd.set_type(Module.b2_dynamicBody);
      bd.set_position( new Box2D.b2Vec2(0,1) );
      this.carBody = this.world.CreateBody(bd);
      this.carBody.CreateFixture(chassisShape, 1);


      var circleShape = new Box2D.b2CircleShape();
      circleShape.set_m_radius(0.4);

      var fd = new Box2D.b2FixtureDef();
      fd.set_shape(circleShape);
      fd.set_density(1.0);
      fd.set_friction(0.9);

      bd.set_position( new Box2D.b2Vec2(-1.0, 0.35) );
      var wheelBody1 = this.world.CreateBody(bd);
      wheelBody1.CreateFixture(fd);

      bd.set_position( new Box2D.b2Vec2(1.0, 0.4) );
      var wheelBody2 = this.world.CreateBody(bd);
      wheelBody2.CreateFixture(fd);

      var m_hz = 4.0;
      var m_zeta = 0.7;
      var m_speed = 50.0;

      var jd = new Box2D.b2WheelJointDef();
      var axis = new Box2D.b2Vec2(0.0, 1.0);

      jd.Initialize(this.carBody, wheelBody1, wheelBody1.GetPosition(), axis);
      jd.set_motorSpeed(0.0);
      jd.set_maxMotorTorque(20.0);
      jd.set_enableMotor(true);
      jd.set_frequencyHz(m_hz);
      jd.set_dampingRatio(m_zeta);
      this.rearWheelJoint = Box2D.castObject( this.world.CreateJoint(jd), Box2D.b2WheelJoint );

      jd.Initialize(this.carBody, wheelBody2, wheelBody2.GetPosition(), axis);
      jd.set_motorSpeed(0.0);
      jd.set_maxMotorTorque(20.0);
      jd.set_enableMotor(true);
      jd.set_frequencyHz(m_hz);
      jd.set_dampingRatio(m_zeta);
      this.wheelJoint2 = Box2D.castObject( this.world.CreateJoint(jd), Box2D.b2WheelJoint );
  }
}

export default CarApp;
