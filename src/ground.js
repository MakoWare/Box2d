import Box2D from 'src/components/box2d/box2d';
import BaseEntity from 'src/components/engine/BaseEntity';

class Ground extends BaseEntity {

  constructor(world){
    super();
    this.world = world;

    var ground,
        shape,
        fd;

    for(var i=-550.0; i<551.0; i++){
      ground = this.world.CreateBody( new Box2D.b2BodyDef() );
      shape = new Box2D.b2EdgeShape();
      fd = new Box2D.b2FixtureDef();
      fd.set_shape(shape);
      fd.set_density(0.0);
      fd.set_friction(0.9);

      shape.Set(new Box2D.b2Vec2(i, 0.0), new Box2D.b2Vec2(i+1, 0.0));
      ground.CreateFixture(fd);
    }

  }

  draw(ctx){
    ctx.save();
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(-550,0);
    ctx.lineTo(550,0);
    ctx.stroke();
    ctx.restore();
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
