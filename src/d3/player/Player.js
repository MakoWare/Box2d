import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';
import PlayerCollisions from './PlayerCollisions';

class Player extends StatefulPolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.maxVX = 10;
    this.maxVY = 10;
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

    // this.inputListener.up = (down)=>{
    //   this.moveUp(down);
    // }
    // this.inputListener.down = (down)=>{
    //   this.moveDown(down);
    // }
    this.inputListener.cross = (down)=>{
      this.jump(down);
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
    this.contactCount = {};

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
      switch(contactObject.entityData.constructor.name) {
        case "GroundEntity":
          // console.log(contactObject);
          this.setGrounded(true,contactObject);
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
      switch(contactObject.entityData.constructor.name) {
        case "GroundEntity":
          this.setGrounded(false,contactObject);
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
      //this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
      this.body.ApplyTorque(-15);
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
      //this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
      this.body.ApplyTorque(15);
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

  jump(keyDown){
    if(keyDown && !this.jumping && this.grounded){
      this.jumping = true;
      this.grounded = false;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(0,10),this.body.GetWorldCenter());
    } else if(!keyDown) {
      this.jumping = false;
      this.body.SetGravityScale(1.7);
    }
  }

  setGrounded(set,obj){
    var b = this.contactCount[obj.e] += set?1:-1;



    if(set){
      this.grounded = true;
      this.body.SetGravityScale(1.0);
    } else if(b==0) {
      console.log('not grounded');
      this.grounded = false;
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
    var fix = this.body.fixtures[0];
    var center = fix.center;
    var radius = fix.radius;

    ctx.fillStyle = 'white';

    this.applyRotation(ctx);

    // draw main circle
    ctx.beginPath();
    ctx.arc(pos.get_x(),pos.get_y(),radius,0,2*Math.PI);
    ctx.fill();

    // draw a radius line to show rotation
    ctx.beginPath();
    ctx.moveTo(pos.get_x(),pos.get_y());
    ctx.lineTo(pos.get_x()+radius,pos.get_y());
    ctx.strokeStyle = 'red';
    ctx.stroke();



    ctx.restore();
  }

}

export default Player;
