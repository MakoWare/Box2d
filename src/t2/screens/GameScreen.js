import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';

class GameScreen extends Screen {
  constructor(camera, options) {
    super(camera, options);

  }

  draw(ctx, delta){
    ctx.save();

    this.camera.update(ctx,delta);
    
  }

}

export default GameScreen;
