import Box2D from 'src/components/box2d/box2d';
class B2DEntity {
  constructor(world) {
    console.log("B2DEntity.constructor()");
    this.world = world;
    this.states = [];

    this.circleShape = new Box2D.b2CircleShape();
    this.circleShape.set_m_radius(0.8);

    this.bodyDef = new Box2D.b2BodyDef();
    this.bodyDef.set_type(Module.b2_dynamicBody);
    this.bodyDef.set_position(new Box2D.b2Vec2(5, 5));
    this.circleBody = world.CreateBody(this.bodyDef);
    this.circleBody.CreateFixture(this.circleShape, .5);

  }

  pushState() {
    //console.log("B2DEntity.saveState()");
    //console.log(this.circleBody.GetPosition().get_y());
    this.states.push({
      x: this.circleBody.GetPosition().get_x(),
      y: this.circleBody.GetPosition().get_y(),
      velocity: this.circleBody.GetLinearVelocity(),
    });
  }

  popState(){
    this.states.pop();
  }

  setState(){
    if(this.states.length > 0){
      this.circleBody.SetTransform(new Box2D.b2Vec2(this.states[this.states.length - 1].x ,this.states[this.states.length - 1].y) , 0);
    }
  }


}

export default B2DEntity;
