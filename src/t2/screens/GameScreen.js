import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';
import Level1 from 'src/t2/levels/level1';
import RubeLoader from 'src/components/rube/RubeLoader';

class GameScreen extends Screen {
  constructor(camera, options) {
    super(camera, options);



    var level1 = new Level1();
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
