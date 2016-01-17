import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';
import Level1 from 'src/d3/levels/level1';
import RubeLoader from 'src/components/rube/RubeLoader';
import DebugDraw from 'src/components/box2d/debugDraw';
import Box2D from 'src/components/box2d/box2d';
import App from 'src/components/app/app';
import Level from 'src/d3/levels/Level';

class GameScreen extends Screen {
  constructor(camera, world, options) {
    super(camera, options);

    this.world = world;

    this.debugDraw = DebugDraw.newDebugger(this.camera.canvas);
    this.world.SetDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);

    this.levelAsset = AssetManager.getAsset('level_1');
    var scene = this.levelAsset.data;
    this.backgroundAsset = AssetManager.getImage('background1');
    console.log(this.backgroundAsset);

    //this.camera.setPTM(34);
    this.camera.setViewCenterWorld(new Box2D.b2Vec2(15,0),true);

    this.level = new Level(scene, this.world);

    this.inputListener = App.input.newEventListener({
      '27':'home'
    },true);

    this.inputListener.home = (down,evt)=>{
      if(!down){
        this.finish({reset:true});
        console.log('reset');
      }
    };
  }

  draw(ctx, delta){
    if(this.world.switchLevel){
      this.finish({reset:true});
    } else {

      ctx.drawImage(this.backgroundAsset, -1200, -1000);
      ctx.save();

      this.world.step(1/60, 3, 2);
      this.camera.update(ctx,delta);
      //this.world.drawDebug();

      // draw the level
      this.level.draw(ctx, delta);

      ctx.restore();
    }
  }

  onDestroy(){
    console.log('destroy world');
    App.input.removeEventListener(this.inputListener);
    AssetManager.destroyAsset(this.levelAsset);
    this.level.destroy();
    this.world.destroy();
  }
}

export default GameScreen;
