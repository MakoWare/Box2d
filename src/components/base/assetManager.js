import Asset from 'src/components/base/asset';
import RubeAsset from 'src/components/base/rubeAsset';

class AssetManager {
  constructor() {
    this.assets = {};

    this.loadQueue = [];
    this.promiseQueue = [];
  }

  loadResource(name, url, type, options){
    var asset = this.NewAsset(name, url, type, options);
    if(asset){
      this.loadQueue.push(asset);

      this.loading = true;

      asset.promise.then(this.onAssetResolve.bind(this), this.onAssetReject.bind(this));
    }
  }

  getAsset(name){
    return this.assets[name];
  }

  getImage(name){
    var asset = this.getAsset(name);
    if(asset.type==='image'){
      return asset.data;
    } else {
      return null;
    }
  }

  getData(name){
    return this.getAsset(name).data;
  }

  onAssetResolve(asset){
    this.assets[asset.name] = asset;
  }

  onAssetReject(){
    console.log('rejected: ',arguments);
  }

  isLoading(){
    return this.loading;
  }

  step(){

    if(this.loadQueue.length==0){
      if(!this.finalPromise){
        this.finalPromise = Promise.all(this.promiseQueue).then(()=>{
          this.assetsLoaded.apply(this, arguments);
          this.promiseQueue = []; // reset promise queue to free objects;
        });
      }
    } else {
      this.finalPromise = null;
      var asset = this.loadQueue.shift();
      this.promiseQueue.push(asset.promise);
      asset.load();
    }

  }

  assetsLoaded(){
    // console.log('all assets loaded: ',arguments);
    if(this.onAssetsLoadedCallback){
      this.onAssetsLoadedCallback(this);
    }
    this.loading = false;
  }

  setOnAssetsLoadedCallback(callback){
    this.onAssetsLoadedCallback = callback;
  }

  NewAsset(name, url, type, options){
    type = type || 'image';
    switch (type) {
      case 'image':
        return new Asset(name, url, type, options);
        break;
      case 'rube':
        return new RubeAsset(name, url, type, options);
        break;
      default:
        return null;
    }
  }

  destroyAsset(asset){
    delete this.assets[asset.name];
    asset.destroy();
  }
}

export default new AssetManager();
