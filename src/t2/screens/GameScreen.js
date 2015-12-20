import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';
import Level1 from 'src/t2/levels/level1';

class GameScreen extends Screen {
  constructor(camera, options) {
    super(camera, options);



    var level1 = new Level1();
  }

  draw(ctx, delta){
    ctx.save();

    this.camera.update(ctx,delta);

  }

}

export default GameScreen;
