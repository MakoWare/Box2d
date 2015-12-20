import Asset from 'src/components/base/asset';
import RubeLoader from 'src/components/rube/RubeLoader';

class RubeAsset extends Asset {
  constructor(name, url, type, options) {
    super(name,url,type,options);
    this.world = this.options.world;
    if(!this.world){
      console.warn('RubeAsset has no world.', this);
    }

    this.rubeLoader = new RubeLoader();

    this._loadJSON();
  }

  _loadRube(){

  }

  _loadJSON() {
    this.promise = new Promise((resolve,reject)=>{
      this.xobj = new XMLHttpRequest();
      this.xobj.overrideMimeType("application/json");
      this.xobj.open('GET', this.url, true); // Replace 'my_data' with the path to your file
      this.xobj.onreadystatechange = this.onload(resolve,reject);
    });
  }

  load(){
    this.xobj.send(null);
  }

  onload(resolve,reject){
    return () => {
      if (this.xobj.readyState == 4 && this.xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        var scene = this.xobj.responseText;
        var success = this.rubeLoader.loadSceneIntoWorld(scene, this.world);
        if(success){
          resolve(this);
        } else {
          reject(this);
        }
      }
    };
  }
}

export default RubeAsset;