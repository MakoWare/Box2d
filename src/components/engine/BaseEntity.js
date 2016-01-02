import Box2D from 'src/components/box2d/box2d';
import AssetManager from 'src/components/base/assetManager';

var imageTypes = ['HTMLImageElement', 'HTMLVideoElement', 'HTMLCanvasElement', 'ImageBitmap'];

class BaseEntity {
  constructor(body, image, options){
    this.body = body;
    this.setImage(image);
    this.options = options;


    this.entities = [];
    if(this.body){
      this.body.entityData = this;
    }

  }

  setImage(image){
    var img = false;
    if(image){
      if(typeof image === 'string'){
        // use asset manager to get image
        img = AssetManager.getImage(image);
      } else if(imageTypes.indexOf(image.constructor.name) >= 0){
        // we have image set it
        img = image;
      }
    }
    this.image = img;
  }

  getPosition(){
    return this.pos = this.body.GetPosition();
  }

  getAngle(){
    return this.angle = this.body.GetAngle();
  }

  involvedInContact(contactPtr){
    var contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
    var bodyA = contact.GetFixtureA().GetBody();
    var bodyB = contact.GetFixtureB().GetBody();
    if(bodyA == this.body){
      return bodyB;
    } else if(bodyB == this.body){
      return bodyA;
    } else {
      return false;
    }
  }

  draw(ctx, delta){
    ctx.save();
    this.drawEntites(ctx,delta);
    ctx.restore();
  }

  applyRotation(ctx,delta,pos){
    if(this.body){
      pos = pos || this.body.GetPosition();
      ctx.translate(pos.get_x(),pos.get_y()); // center
      ctx.rotate(this.body.GetAngle()); // rotate about center
      ctx.translate(-pos.get_x(),-pos.get_y()); // translate back, keeping rotation
    }
  }

  drawEntites(ctx, delta){
    this.entities.forEach((ent)=>{
      ent.draw(ctx, delta);
    });
  }

  addEntity(ent){
    this.entities.push(ent);
  }

  removeEntity(ent){
    var ix = this.entities.indexOf(ent);
    if(ix > 0){
      this.entities.splice(ix,1);
    }
  }
}

export default BaseEntity;
