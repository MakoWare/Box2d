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
    if(keyDown && !this.reverse){
      console.log("player.moveRight");
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
    }
  }

  moveLeft(keyDown){
    if(keyDown && !this.reverse){
      console.log("player.moveLeft()");
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(-impulse, 0), this.body.GetWorldCenter());
    }
  }

  moveUp(keyDown){
    if(keyDown && !this.reverse){
      var impulse = this.body.GetMass() * this.speed;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(0, impulse), this.body.GetWorldCenter());
    }
  }

  moveDown(keyDown){
    if(keyDown && !this.reverse){
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

  draw(ctx, delta){
    super.draw();

    ctx.save();

    var pos = this.body.GetPosition();
    ctx.fillStyle = 'red';
    ctx.translate(-0.5,-0.5); // x-w/2, y-h/2
    ctx.fillRect(pos.get_x(),pos.get_y(),1,1);

    ctx.restore();
  }
}

export default Player;
