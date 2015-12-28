import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';
import PlayerCollisions from './PlayerCollisions';

class Player extends StatefulPolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.maxVX = 10;
    this.maxVY = 50;
    this.color = "ecf0f1";

    this.initContactListeners();
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
    this.inputListener.leftStick = (xVal,yVal,event)=>{
      if(xVal>0.3){
        this.moveRight(true);
      } else if(xVal<-0.3){
        this.moveLeft(true);
      } else {
        this.moveRight(false);
        this.moveLeft(false);
      }

      if(yVal>0.3){
        this.moveDown(true);
      } else if(yVal<-0.3){
        this.moveUp(true);
      } else {
        this.moveDown(false);
        this.moveUp(false);
      }


    }
  }

  initContactListeners(){
    this.contactListener = new Box2D.JSContactListener();

    //If the Contact involved the Player (check if entityA or entityB)
    this.contactListener.BeginContact = this.onBeginContact.bind(this);
    this.contactListener.EndContact = this.onEndContact.bind(this);
    this.contactListener.PreSolve = function() {};
    this.contactListener.PostSolve = function() {};

    this.world.SetContactListener(this.contactListener);
  }

  onBeginContact(contactPtr){
    console.log("player.onBeginContact");
    var contactObject = this.involvedInContact(contactPtr);
    if(contactObject){
      var contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
      switch(contactObject.constructor.name) {
        case "Wall":
          this.color = "E6FFFF";
          break;
      }
    } else {
      return;
    }
  }

  onEndContact(contactPtr){
    console.log("player.onEndContact()");
    var contactObject = this.involvedInContact(contactPtr);
    if(contactObject){
      var contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
      switch(contactObject.constructor.name) {
        case "Wall":
          this.color = "6FC3DF";
          break;
      }
    }
  }

  moveRight(keyDown){
    if(keyDown){
      var desiredVel = this.maxVX;
    } else {
      var desiredVel = 0;
    }
    if(!this.reverse){
      var vel = this.body.GetLinearVelocity();
      var velChange = desiredVel - vel.get_x();
      var impulse = this.body.GetMass() * velChange;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
    }
  }

  moveLeft(keyDown){
    if(keyDown){
      var desiredVel = -this.maxVX;
    } else {
      var desiredVel = 0;
    }
    if(!this.reverse){
      var vel = this.body.GetLinearVelocity();
      var velChange = desiredVel - vel.get_x();
      var impulse = this.body.GetMass() * velChange;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
    }
  }

  moveUp(keyDown){
    if(keyDown && !this.reverse){
      var impulse = this.body.GetMass() * this.maxVY;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(0, impulse), this.body.GetWorldCenter());
    }
  }

  moveDown(keyDown){
    if(keyDown && !this.reverse){
      var impulse = this.body.GetMass() * this.maxVY;
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

    /* ctx.save();

       var pos = this.body.GetPosition();
       ctx.fillStyle = "#" + this.color;
       ctx.translate(-0.5,-0.5); // x-w/2, y-h/2
       ctx.fillRect(pos.get_x(),pos.get_y(),1,1);

       ctx.restore(); */
  }
}

export default Player;
