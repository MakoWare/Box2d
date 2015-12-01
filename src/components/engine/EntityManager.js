import Box2D from 'src/components/box2d/box2d';

class EntityManager {
  constructor(canvas){
    this.entities = [];
    this.entityUID = 0;
    this.reverse = false;

    canvas.addEventListener('keydown', function(evt) {
      console.log(this.reverse);
      evt.preventDefault();
      this.reverse = !this.reverse;
    }.bind(this), false);
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

  registerEntity(entity){
    entity.id = this.entityUID++;
    this.entities.push(entity);
  }

  saveState(){
    this.entities.forEach((entity) => {
      entity.pushState();
    });
  }

}

export default EntityManager;
