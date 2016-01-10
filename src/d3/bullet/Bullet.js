import StatefulPolygonEntity from 'src/components/engine/StatefulPolygonEntity';
import App from 'src/components/app/app';
import Box2D from 'src/components/box2d/box2d';
import PlayerCollisions from './PlayerCollisions';

class Bullet extends PolygonEntity {
  constructor(body, image, options, world){
    super(body, image, options);
    this.world = world;
    this.maxVX = 50;
    this.gravityScale = 0;
    this.color = "#ecf0f1";

    this.body.SetGravityScale(this.gravityScale);
    //this.initContactListeners();
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
    console.log("bullet.onBeginContact");
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
    console.log("bullet.onEndContact()");
    var contactObject = this.involvedInContact(contactPtr);
    if(contactObject){
      switch(contactObject.entityData.constructor.name) {
        case "GroundEntity":
          this.setGrounded(false,contactObject);
          break;
      }
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
