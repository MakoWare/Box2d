import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';
import Level1 from 'src/t2/levels/level1';
import RubeLoader from 'src/components/rube/RubeLoader';
import DebugDraw from 'src/components/box2d/debugDraw';
import Box2D from 'src/components/box2d/box2d';

class GameScreen extends Screen {
  constructor(camera, world, options) {
    super(camera, options);

    this.world = world;

    this.debugDraw = DebugDraw.newDebugger(this.camera.canvas);
    this.world.SetDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);

    var level1 = new Level1();

    var scene = AssetManager.getData('level_1');
    console.log(scene);

    this.camera.setPTM(34);
    this.camera.setViewCenterWorld(new Box2D.b2Vec2(10,10),true);
  }

  draw(ctx, delta){
    ctx.save();

    this.world.Step(delta, 3, 2);
    this.camera.update(ctx,delta);
    this.world.drawDebug();

    // this.entityManager.step();
    // this.entityManager.draw(ctx, delta);

    ctx.restore();
  }
}

export default GameScreen;
