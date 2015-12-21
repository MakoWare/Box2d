import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';

class Player extends StatefulPolygonEntity {
  constructor(body, image, options){
    super(body, image, options);

    this.speed = 50;
    this.initMoveListeners();
  }

  initMoveListeners(){
    this.inputListener = App.input.newEventListener({
      '39':'right',
      '37':'left',
      '38':'up',
      '40':'down',
      '32':'cross'
    }, true);

    this.inputListener.left = (down)=>{
      this.moveLeft(down);
    }
    this.inputListener.right = (down)=>{
      this.moveRight(down);
    }

    this.inputListener.up = (down)=>{
      this.moveUp(down);
    }
    this.inputListener.down = (down)=>{
      this.moveDown(down);
    }
    this.inputListener.cross = (down)=>{
      this.revertState(down);
    }

  }

  moveRight(keyDown){
    if(keyDown){
      console.log("player.moveRight");
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
    }
  }

  moveLeft(keyDown){
    if(keyDown){
      console.log("player.moveLeft()");
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(-impulse, 0), this.body.GetWorldCenter());
    }
  }

  moveUp(keyDown){
    if(keyDown){
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(0, impulse), this.body.GetWorldCenter());
    }
  }

  moveDown(keyDown){
    if(keyDown){
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(0, -impulse), this.body.GetWorldCenter());
    }
  }

  revertState(keyDown){
    if(keyDown){
      this.reverse = true;
    } else {
      this.reverse = false;
    }
  }

  draw(){
    super.draw();
  }
}

export default Player;
