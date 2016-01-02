


class Screen {
  constructor(camera, options) {
    this.camera = camera;
    this.options = options || {};
  }

  draw(ctx, delta){
    this.camera.update(ctx,delta);
  }

  finish(data){
    this._finalData = data;
    this._isFinished = true;
  }
}

export default Screen;
