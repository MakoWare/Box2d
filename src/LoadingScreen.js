import Screen from 'src/components/screen/screen';
import AssetManager from 'src/components/base/assetManager';

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
    // load some assets
    AssetManager.loadResource('wheel', 'http://pngimg.com/upload/car_wheel_PNG1074.png');
    AssetManager.loadResource('car', 'http://colorfulnewslonvig.blog.com/files/2012/07/berlinette-F12-linier.png');
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