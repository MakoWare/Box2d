import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import AssetManager from 'src/components/base/assetManager';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';
import MainBlaster from 'src/d3/blaster/MainBlaster';
import EntityManager from 'src/components/engine/EntityManager';

const RIGHT = 10;
const LEFT  = 11;

class Player extends StatefulPolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.maxVX = 15;
    this.maxVY = 10;
    this.gravityScale = 4;
    this.jumpGravityScale = 6;
    this.color = "#ecf0f1";
    this.looking = RIGHT;
    this.blasters = [];
    this.allDim = true;
    this.body.SetGravityScale(this.gravityScale);
    this.initContactListeners();
    this.initMoveListeners();
    this.getBlasters();
    this.spriteSheet = AssetManager.getImage('playerSpriteSheet');
    this.spriteSheetWidth = this.spriteSheet.width;
    this.spriteSheetHeight = this.spriteSheet.height;
    this.spritesPerSheetX = 6;
    this.spritesPerSheetY = 5;
  }

  destroy(){
    super.destroy();
    this.world.SetContactListener(null);
    this.world = null;
    App.input.removeEventListener(this.inputListener);
    this.contactListener = null;
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
    this.contactCount = {};

    this.contactListener = this.world.newBodyContactListener(this.body, this.onContact.bind(this));
    this.world.registerBodyContactListener(this.contactListener);
  }

  onContact(begin, contactObject){
    // console.log('on contact');
    if(contactObject && contactObject.entityData){
      // console.log("player.onBeginContact");
      switch(contactObject.entityData.constructor.name) {
        case "GroundEntity":
          this.setGrounded(begin,contactObject);
          break;
      }
    } else {
      return;
    }
  }

  // onBeginContact(contactPtr){
  //   var contactObject = this.involvedInContact(contactPtr);
  //   if(contactObject && contactObject.entityData){
  //     // console.log("player.onBeginContact");
  //     switch(contactObject.entityData.constructor.name) {
  //       case "GroundEntity":
  //         console.log('begin contact (ground)');
  //         this.setGrounded(true,contactObject);
  //         break;
  //     }
  //   } else {
  //     return;
  //   }
  // }
  //
  // onEndContact(contactPtr){
  //   var contactObject = this.involvedInContact(contactPtr);
  //   if(contactObject && contactObject.entityData){
  //     // console.log("player.onEndContact()");
  //     switch(contactObject.entityData.constructor.name) {
  //       case "GroundEntity":
  //         console.log('begin contact (UN-ground)');
  //         this.setGrounded(false,contactObject);
  //         break;
  //     }
  //   }
  // }

  moveRight(keyDown){
    var desiredVel;
    if(keyDown){
      desiredVel = this.maxVX;
    } else {
      desiredVel = 0;
    }
    if(!this.reverse){
      var vel = this.body.GetLinearVelocity();
      var velChange = desiredVel - vel.get_x();
      var impulse = this.body.GetMass() * velChange;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
      this.looking = RIGHT;
    }

    return true;
  }

  moveLeft(keyDown){
    var desiredVel;
    if(keyDown){
      desiredVel = -this.maxVX;
    } else {
      desiredVel = 0;
    }
    if(!this.reverse){
      var vel = this.body.GetLinearVelocity();
      var velChange = desiredVel - vel.get_x();
      var impulse = this.body.GetMass() * velChange;
      this.body.ApplyLinearImpulse(new Box2D.b2Vec2(impulse, 0), this.body.GetWorldCenter());
      this.looking = LEFT;
    }

    return true;
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
      if(!this.grounded){
        this.body.SetGravityScale(this.jumpGravityScale);  
      }

    }
  }

  shoot(keyDown){
    this.currentBlaster.fire();
  }

  setGrounded(set,obj){
    var c = this.contactCount[obj.e];
    if(c === undefined || c === null){
      this.contactCount[obj.e] = 0;
    }
    var b = this.contactCount[obj.e] += set?1:-1;



    if(set){
      this.grounded = true;
      // this.jumping = false;
      this.body.SetGravityScale(this.gravityScale);
    } else {
      if(b==0) {
        this.grounded = false;
      }
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
    this.animate(ctx);

    //    ctx.translate(pos.get_x(),pos.get_y());


    /* ctx.fillStyle = this.color;
       this.drawFixtures(ctx, delta,()=>{
       ctx.fill();
       ctx.strokeStyle = this.color;
       ctx.lineWidth = 0.04;
       ctx.lineJoin = 'bevel';
       ctx.lineCap = 'round';
       ctx.closePath();
       ctx.stroke();
       }); */

    ctx.restore();
  }

  animate(ctx){
    var pos = this.body.GetPosition();
    //    ctx.rotate(180*Math.PI/180);
    ctx.scale(1, -1);
    ctx.drawImage(this.spriteSheet, 0, 0, this.spriteSheetWidth / this.spritesPerSheetX, this.spriteSheetHeight / this.spritesPerSheetY, pos.get_x(),pos.get_y() -3, 15 / this.spritesPerSheetX, 15 / this.spritesPerSheetY);
  }

  getBlasters(){
    var mainBlaster = new MainBlaster(this.world, this);
    EntityManager.addEntity(mainBlaster);
    this.blasters.push(mainBlaster);
    this.currentBlaster = this.blasters[0];
  }

}

export default Player;
