import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
import RubeLoader from 'src/components/rube/RubeLoader';
import DebugDraw from 'src/components/box2d/debugDraw';
import scene from 'src/rubeScenes/katana';

class RubeApp extends BaseApp {

  constructor() {
    super();

    // this.debug = new DebugDraw(this.canvas);
    // this.setDebugDraw(this.debug.getDebugDraw());
    // this.debugDraw.SetFlags(this.debug.e_shapeBit);
    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);



    this.camera.setViewCenterWorld(new Box2D.b2Vec2(0,0), true);
    this.camera.setPTM(20);

    //this.camera.setChaseEntity(car);

    console.log("scene", scene);

    this.rubeLoader = new RubeLoader();
    this.rubeLoader.loadSceneIntoWorld(scene, this.world);
  }

  draw(ctx){



    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);
  }

}

export default RubeApp;
