import PolygonEntity from 'src/components/engine/PolygonEntity';
import CircleEntity from 'src/components/engine/CircleEntity';

class CarEntity extends PolygonEntity {
  constructor(world, options) {
    super()
    this.world = world;

    this.createCar(options.pos, options.size);
    this.addEntity(new CircleEntity(this.wheelBody2, 'wheel'));
    this.addEntity(new CircleEntity(this.wheelBody1, 'wheel'));
  }

  createCar(carPos, carLength){
      carPos = carPos || {x:0,y:0};
      carLength = carLength || 0;
      var carVerts = [];
      carVerts.push( new Box2D.b2Vec2(-1.5, -0.5) );
      carVerts.push( new Box2D.b2Vec2(carLength+1.5, -0.5) );
      carVerts.push( new Box2D.b2Vec2(carLength+1.5, 0.0) );
      carVerts.push( new Box2D.b2Vec2(carLength+0.0, 0.9) );
      carVerts.push( new Box2D.b2Vec2(-1.15, 0.9) );
      carVerts.push( new Box2D.b2Vec2(-1.5, 0.2) );
      var chassisShape = new this.world.createPolygonShape(carVerts);

      var bd = new Box2D.b2BodyDef();
      // bd.set_type(b2_dynamicBody);
      bd.set_type(Box2D.b2_dynamicBody);
      bd.set_position( new Box2D.b2Vec2(carPos.x,carPos.y+1) );
      this.body = this.world.CreateBody(bd);
      this.body.CreateFixture(chassisShape, 1);


      var circleShape = new Box2D.b2CircleShape();
      circleShape.set_m_radius(0.5);

      var fd = new Box2D.b2FixtureDef();
      fd.set_shape(circleShape);
      fd.set_density(1.0);
      fd.set_friction(0.8);

      bd.set_position( new Box2D.b2Vec2(carPos.x-1.0, carPos.y+0.35) );
      var wheelBody1 = this.wheelBody1 = this.world.CreateBody(bd);
      wheelBody1.CreateFixture(fd);

      bd.set_position( new Box2D.b2Vec2(carPos.x+carLength+1.0, carPos.y+0.4) );
      var wheelBody2 = this.wheelBody2 = this.world.CreateBody(bd);
      wheelBody2.CreateFixture(fd);

      var m_hz = 4.0;
      var m_zeta = 0.7;
      var m_speed = 50.0;

      var jd = new Box2D.b2WheelJointDef();
      var axis = new Box2D.b2Vec2(0.0, 1.0);

      jd.Initialize(this.body, wheelBody1, wheelBody1.GetPosition(), axis);
      jd.set_motorSpeed(0.0);
      jd.set_maxMotorTorque(20.0);
      jd.set_enableMotor(true);
      jd.set_frequencyHz(m_hz);
      jd.set_dampingRatio(m_zeta);
      this.rearWheelJoint = Box2D.castObject( this.world.CreateJoint(jd), Box2D.b2WheelJoint );

      jd.Initialize(this.body, wheelBody2, wheelBody2.GetPosition(), axis);
      jd.set_motorSpeed(0.0);
      jd.set_maxMotorTorque(20.0);
      jd.set_enableMotor(true);
      jd.set_frequencyHz(m_hz);
      jd.set_dampingRatio(m_zeta);
      this.wheelJoint2 = Box2D.castObject( this.world.CreateJoint(jd), Box2D.b2WheelJoint );

      return this.body;
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
}

export default CarEntity;
