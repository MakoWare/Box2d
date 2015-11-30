import Box2D from 'src/components/box2d/box2d';

class EntityManager {
  constructor(){
    this.entities = [];
    this.entityUID = 0;
    this.reverse = false;

    setTimeout(function(){
      console.log("reverse");
      this.reverse = true;
    }.bind(this), 10000)

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
      //this.reverse = false;
    }
  }

  registerEntity(entity){
    entity.id = this.entityUID++;
    this.entities.push(entity);
    console.log(this.entities);
  }

  saveState(){
    this.entities.forEach((entity) => {
      entity.pushState();
    });
  }

}

export default EntityManager;
