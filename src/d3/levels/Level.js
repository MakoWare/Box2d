import BaseLevel from 'src/d3/levels/BaseLevel';
import Player from 'src/d3/player/Player';
import Wall from 'src/d3/wall/Wall';
import EntityManager from 'src/components/engine/EntityManager';

class Level extends BaseLevel {
  constructor(scene, world) {
    super();

    this.world = world;
    this.scene = scene;
    this.entityManager = new EntityManager();

    this.scene.objects = this.scene.objects || {};
    this.scene.bodies.forEach( (body)=>{

      switch (body.props.Class.value) {
        case 'Player':
          var obj = new Player(body, null, null, this.world);
          this.scene.objects[body.name] = obj;
          this.entityManager.registerEntity(obj);
          break;
        case 'Wall':
          var obj = new Wall(body);
          this.scene.objects[body.name] = obj;
          this.entityManager.registerEntity(obj);
          break;
        default:

      }
    }.bind(this));


  }

  draw(ctx, delta){
    ctx.save();

    this.entityManager.draw(ctx,delta);

    ctx.restore();
  }
}

export default Level;
