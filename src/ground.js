import Box2D from 'src/components/box2d/box2d';
import BaseEntity from 'src/components/engine/BaseEntity';

class Ground extends BaseEntity {

  constructor(world){
    super(world);


    var ground = this.world.CreateBody( new Box2D.b2BodyDef() );
    var shape = new Box2D.b2EdgeShape();
    var fd = new Box2D.b2FixtureDef();
    fd.set_shape(shape);
    fd.set_density(0.0);
    fd.set_friction(0.6);

    shape.Set(new Box2D.b2Vec2(-550.0, -20.0), new Box2D.b2Vec2(550.0, 10.0));
    ground.CreateFixture(fd);
  }

  pushState(){

  }

  popState(){
    this.states.pop();
  }

  setState(){
    if(this.states.length > 0){
      this.body.SetTransform(new Box2D.b2Vec2(this.states[this.states.length - 1].x ,this.states[this.states.length - 1].y) , 0);
    }
  }





}

export default Ground;
