import Box2D from 'src/components/box2d/box2d';
import AssetManager from 'src/components/base/assetManager';

var imageTypes = ['HTMLImageElement', 'HTMLVideoElement', 'HTMLCanvasElement', 'ImageBitmap'];

class BaseEntity {
  constructor(body, image, options){
    this.body = body;
    this.setImage(image);
    this.options = options;


    this.states = [];
    this.entities = [];
    this.maxStates = 600;
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

  pushState(){
    if(this.states.length == this.maxStates){
      this.shiftState();
    }
  }

  popState(){

  }

  setState(){}


  getPosition(){
    return this.pos = this.body.GetPosition();
  }

  getAngle(){
    return this.angle = this.body.GetAngle();
  }

  draw(ctx, delta){
    ctx.save();
    this.drawEntites(ctx,delta);
    ctx.restore();
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
