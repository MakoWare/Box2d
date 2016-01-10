import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';
import PlayerCollisions from './PlayerCollisions';
import MainBlaster from 'src/d3/blaster/MainBlaster';

class Player extends StatefulPolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.maxVX = 20;
    this.maxVY = 10;
    this.gravityScale = 3;
    this.jumpGravityScale = 4;
    this.color = "#ecf0f1";

    this.blasters = [];
    this.blasters.push(new MainBlaster(null, null, null, world));
    this.currentBlaster = this.blasters[0];

    console.log(this.currentBlaster);
    this.body.SetGravityScale(this.gravityScale);
    this.initContactListeners();
    this.initMoveListeners();
  }

  initMoveListeners(){
    this.inputListener = App.input.newEventListener({
      '39':'right',
      '37':'left',
      '38':'up',
      '40':'down',
      '32':'cross',
      '69': 'square'
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

    this.inputListener.square = (down)=>{
      this.shoot(down);
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
      if(contactObject.entityData){
        switch(contactObject.entityData.constructor.name) {
          case "GroundEntity":
            // console.log(contactObject);
            this.setGrounded(true,contactObject);
            break;
        }
      }
    } else {
      return;
    }
  }

  onEndContact(contactPtr){
    console.log("player.onEndContact()");
    var contactObject = this.involvedInContact(contactPtr);
    if(contactObject){
      if(contactObject.entityData){
        switch(contactObject.entityData.constructor.name) {
          case "GroundEntity":
            this.setGrounded(false,contactObject);
            break;
        }
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

  jump(keyDown){
    if(keyDown && !this.jumping && this.grounded){
      this.jumping = true;
      this.grounded = false;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(0,30),this.body.GetWorldCenter());
    } else if(!keyDown) {
      this.jumping = false;
      this.body.SetGravityScale(this.jumpGravityScale);
    }
  }

  shoot(keyDown){
    this.currentBlaster.fire();
  }

  setGrounded(set,obj){
    var b = this.contactCount[obj.e] += set?1:-1;



    if(set){
      this.grounded = true;
      this.body.SetGravityScale(this.gravityScale);
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
    var pos = this.body.GetPosition();

    ctx.save();

    this.applyRotation(ctx);

    ctx.translate(pos.get_x(),pos.get_y());
    ctx.fillStyle = this.color;
    this.drawFixtures(ctx, delta,()=>{
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 0.04;
      ctx.lineJoin = 'bevel';
      ctx.lineCap = 'round';
      ctx.closePath();
      ctx.stroke();
    });
    ctx.restore();
  }

}

export default Player;
