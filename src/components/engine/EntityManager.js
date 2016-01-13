import Box2D from 'src/components/box2d/box2d';

class EntityManager {
  constructor(canvas){
    this.entities = [];
    this.entityUID = 0;
    this.reverse = false;

    // canvas.addEventListener('keydown', function(evt) {
    //   if(evt.keyCode === 32){
    //     evt.preventDefault();
    //     this.reverse = !this.reverse;
    //     console.log(this.reverse);
    //   }
    // }.bind(this), false);
  }

  step(){
    if(!this.reverse){
      this.entities.forEach((entity) => {
        entity.pushState();
      });
    } else {
      this.entities.forEach((entity) => {
        entity.setState();
        entity.popState();
      });
    }
  }

  draw(ctx,delta){
    this.entities.forEach((entity)=> {
      entity.draw(ctx, delta);
    });
  }

  registerEntity(entity){
    entity._id = this.entityUID++;
    this.entities.push(entity);
  }

  saveState(){
    this.entities.forEach((entity) => {
      entity.pushState();
    });
  }

  destroy(){
    for(var i=0;i<this.entities.length;i++){
      this.entities[i].destroy();
    }
  }

}

export default EntityManager;
