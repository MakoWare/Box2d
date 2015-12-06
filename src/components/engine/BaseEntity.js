import Box2D from 'src/components/box2d/box2d';

class BaseEntity {
  constructor(world){
    this.world = world;
    this.states = [];
    this.maxStates = 600;
  }

  pushState(){
    if(this.states.length == this.maxStates){
      this.shiftState();
    }
  }

  popState(){

  }

  setState(){}


  getPosition(){
    return this.pos = this.body.GetPosition();
  }

  getAngle(){
    return this.angle = this.body.GetAngle();
  }

  draw(ctx, delta){
    ctx.save();

    ctx.restore();
  }
}

export default BaseEntity;
