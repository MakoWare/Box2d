import PolygonEntity from './PolygonEntity';

class StatefulPolygonEntity extends PolygonEntity {
  constructor(body, image, options) {
    super(body, image, options);
    this.stateful = true;
    this.states = [];
    this.maxStates = 6000;
  }

  pushState(){
    this.states.push({
      px: this.body.GetPosition().get_x(),
      py: this.body.GetPosition().get_y(),
      vx: this.body.GetLinearVelocity().get_x(),
      vy: this.body.GetLinearVelocity().get_y(),
      angle: this.body.GetAngle()
    });
  }

  popState(){
    this.states.pop();
  }

  shiftState(){

  }

  setState(){
    if(this.states.length > 0){
      this.body.SetTransform(new Box2D.b2Vec2(this.states[this.states.length - 1].px ,this.states[this.states.length - 1].py) , this.states[this.states.length - 1].angle);
    }
  }

  draw(){
    if(this.states.length < this.maxStates && !this.reverse){
      this.pushState();
    } else {
      this.popState();
    }
    console.log(this.states.length);
    this.setState();
  }
}

export default StatefulPolygonEntity;
