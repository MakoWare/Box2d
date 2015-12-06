import Asset from 'src/components/base/asset';


class AssetManager {
  constructor() {
    this.assets = {};

    this.loadQueue = [];
    this.promiseQueue = [];
  }

  loadResource(name, url){
    var asset = new Asset(name, url);
    this.loadQueue.push(asset);

    this.loading = true;

    asset.promise.then(this.onAssetResolve.bind(this), this.onAssetReject.bind(this));
  }

  getAsset(name){
    return this.assets[name];
  }

  getImage(name){
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
}

export default new AssetManager();
