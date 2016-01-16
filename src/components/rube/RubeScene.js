class RubeScene {
  constructor(sceneJson, world) {
    this._json = sceneJson;
    this.world = world;
  }

  destroy(){
    // this.world = null;
    // this.bodies = null;
    // this.joints = null;
    // this.objects = null;
    for(key in this){
      this[key] = null;
    }
  }
}

export default RubeScene;
