import Box2D from 'src/components/box2d/box2d';

class EntityManager {
  constructor(){
    this.entities = [];
    this.entityUID = 0;
  }

  addEntity(entity){
    entity._id = this.entityUID++;
    this.entities.push(entity);
  }

  step(ctx, delta){
    this.entities.forEach((entity)=> {
      this.activateEntity(entity);
      this.drawEntity(entity, ctx, delta);
    });
  }

  activateEntity(entity){
    if(this.scene.currentDimension === entity.dimension || entity.allDim){
      if(!entity.active){
        entity.activate();
      }
    } else {
      entity.deactivate();
    }
  }

  drawEntity(entity, ctx, delta){
    entity.draw(ctx, delta);
  }

  destroy(){
    for(var i=0;i<this.entities.length;i++){
      this.entities[i].destroy();
    }
    this.entities = [];
  }

}

export default new EntityManager();
