import Box2D from 'src/components/box2d/box2d';
import BaseEntity from 'src/components/engine/BaseEntity';

class Ball extends BaseEntity {

  constructor(world){
    super(world);

    this.shape = new Box2D.b2CircleShape();
    this.shape.set_m_radius(0.8);

    this.bodyDef = new Box2D.b2BodyDef();
    this.bodyDef.set_type(Module.b2_dynamicBody);
    this.bodyDef.set_position(new Box2D.b2Vec2(5, 5));

    this.body = this.world.CreateBody(this.bodyDef);
    this.body.CreateFixture(this.shape, .5);
  }

  pushState(){
    super.pushState();
    this.states.push({
      x: this.body.GetPosition().get_x(),
      y: this.body.GetPosition().get_y(),
      velocity: this.body.GetLinearVelocity(),
      angle: this.body.GetAngle()
    });
  }

  popState(){
    this.states.pop();
  }

  shiftState(){
    this.states.shift();
  }

  setState(){
    if(this.states.length > 0){
      this.body.SetTransform(new Box2D.b2Vec2(this.states[this.states.length - 1].x ,this.states[this.states.length - 1].y) , this.states[this.states.length - 1].angle);
    }
  }





}

export default Ball;
