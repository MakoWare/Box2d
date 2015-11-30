import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';
import BaseEntity from 'src/components/engine/BaseEntity';
import DebugDraw from 'src/components/box2d/debugDraw';
import EntityManager from 'src/components/engine/EntityManager.js';
import Ball from 'src/ball.js';
import Ground from 'src/ground.js';

class CarApp extends BaseApp {

  constructor() {
    super();

    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);
    this.entities = [];
    this.reverse = false;

    this.world.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);


    //Entities
    this.manager = new EntityManager();

    var ground = new Ground(this.world);
    this.manager.registerEntity(ground);

    var ball = new Ball(this.world);
    this.manager.registerEntity(ball);

  }

  draw(ctx){
    this.manager.step();
    this.world.drawAxes(ctx);
    this.world.DrawDebugData();

    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);


  }
}

export default CarApp;
