import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';
import World from 'src/components/world/world';

class LoadingScreen extends Screen {
  constructor(camera, options) {
    super(camera, options);

    if(this.options.delay !== undefined && this.options.delay !== null){
      this._usesDelay = true;
    }

    this._loadingArray = ['Loading'];
    this._loadingCount = 0;
    this._loadingFreq = this.options.loadingFrequency || 10;
    this._loadingFreqMax = this._loadingFreq*4;


    this._timeout = 0;

    this.world = new World();

    camera.setViewCenterWorld(new Box2D.b2Vec2(10,10),true);

    // load some assets
    AssetManager.loadResource('level_1','src/rubeScenes/level_3.json', 'rube', this.world);
    AssetManager.setOnAssetsLoadedCallback(this.onAssetsLoaded.bind(this));
  }

  draw(ctx, delta){
    ctx.save();

    this.camera.update(ctx,delta);

    ctx.scale(1,-1);
    ctx.fillStyle = 'green';
    ctx.font = "5px serif";
    var text = ctx.measureText('Loading.');
    ctx.fillText(this._loadingArray.join(''), -(text.width/2), 0);

    AssetManager.step();

    ctx.restore();


    if(this._usesDelay){
      this._timeout += delta;
      if(this._timeout >= this.options.delay){
        this._delayDone = true;
        this._evalDone();
      }
    }

    this._loadingCount++;
    if(this._loadingCount%this._loadingFreq===0){
      this._loadingArray.push('.');
    }
    if(this._loadingCount%this._loadingFreqMax===0){
      this._loadingArray.splice(1,999);
    }


  }

  onAssetsLoaded(){
    this._assetsLoaded = true;
    this._evalDone();
  }

  _evalDone(){
    if(this._usesDelay){
      if(this._assetsLoaded && this._delayDone){
        this.finish();
      }
    } else if(this._assetsLoaded){
      this.finish();
    }
  }
}

export default LoadingScreen;
