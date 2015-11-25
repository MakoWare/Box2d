import Box2D from 'src/components/box2d/box2d';
import World from 'src/components/world/world';
import WorldConfig from 'src/components/world/worldConfig';
import testbed from 'src/libs/embox2d-html5canvas-testbed';
import Orientation from 'src/components/input/orientation';
// var world = World.world;

var DEGTORAD = 0.0174532925199432957;
var RADTODEG = 57.295779513082320876;

var MOVE_LEFT =     0x01;
var MOVE_RIGHT =    0x02;

class gravityTest {
  constructor(){
    this.rearWheelJoint = null;
    this.moveFlags = 0;
    this.carBody = null;
    this.setup();
  }

  setNiceViewCenter() {
    WorldConfig.PTM = 28;
    testbed.setViewCenterWorld( new b2Vec2(0,1), true );
  }

  step(){
    this.updateMotorSpeed();

    /*
       Reverse step - save state of B2D element every step, then set state equal to step rate 
       example
       this.carBody.x = this.state[this.state.length - 1]
       this.state.pop;
    */

    //move camera to follow car
    //var pos = this.carBody.GetPosition();
    //var vel = this.carBody.GetLinearVelocity();
    //var futurePos = new b2Vec2( pos.get_x() + 0.15 * vel.get_x(), pos.get_y() + 0.15 * vel.get_y() );
    //testbed.setViewCenterWorld( futurePos );
  }

  updateMotorSpeed(){
    this.circleBody.SetTransform(new b2Vec2(0, 0), (-Orientation.y / 90));
  }

  setup(){
    var ground = World.world.CreateBody( new b2BodyDef() );
    //ground

    var groundShape = new b2PolygonShape();
    groundShape.SetAsBox(12.0, 0.5);

    var fd = new b2FixtureDef();
    fd.set_shape(groundShape);
    fd.set_density(0.0);
    fd.set_friction(0.1);

    //groundShape.Set(new b2Vec2(-20.0, 0.0), new b2Vec2(20.0, 0.0));
    ground.CreateFixture(fd);

    //circle
    var circle = new b2CircleShape();
    circle.set_m_radius(0.8);

    var bd = new b2BodyDef();
    //bd.set_shape(circle);
    //bd.set_density(0.0);
    //bd.set_friction(0.6);

    bd.set_type(Module.b2_dynamicBody);
    bd.set_position(new b2Vec2(5, 5));
    var circleBody = World.world.CreateBody(bd);
    circleBody.CreateFixture(circle, .5);


    this.circleBody = ground;
  }

  onKeyDown(canvas, evt) {
    if ( evt.keyCode == 74 ) {//j
      this.moveFlags |= MOVE_LEFT;
      this.updateMotorSpeed();
    }
    else if ( evt.keyCode == 75 ) {//k
      this.moveFlags |= MOVE_RIGHT;
      this.updateMotorSpeed();
    }
  }

  onKeyUp(canvas, evt){
    if ( evt.keyCode == 74 ) {
      this.moveFlags &= ~MOVE_LEFT;
      this.updateMotorSpeed();
    }
    else if ( evt.keyCode == 75 ) {
      this.moveFlags &= ~MOVE_RIGHT;
      this.updateMotorSpeed();
    }
  }
}
export default gravityTest;
