import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import App from 'src/components/app/app';

class Player extends StatefulPolygonEntity {
  constructor(body, image, options){
    super(body, image, options);

    this.speed = 10;
    this.initMoveListeners();
  }

  initMoveListeners(){
    this.inputListener = App.input.newEventListener({
      '39':'right',
      '37':'left',
      '38':'up',
      '40':'down'
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
  }

  moveRight(keyDown){
    if(keyDown){
      console.log("player.moveRight");
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2d.b2Vec2(0, impulse), this.body.GetWorldCenter());
    }
  }

  moveLeft(keyDown){
    if(keyDown){
      console.log("player.moveLeft()");
    }
  }

  moveUp(keyDown){
    if(keyDown){
      console.log("player.moveUp()");
    }
  }

  moveDown(keyDown){
    if(keyDown){
      console.log("player.moveDown()");
    }
  }
}

export default Player;
