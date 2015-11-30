import Util from 'src/components/util/util';

var PTM = 32;

var PTM = 32;
var viewCenterPixel = {
  x: 0,
  y: 0
};
var singleWorldPoint = {
  x:0,
  y:0
};
var offset = {
  x:0,
  y:0
};

class Camera {

  constructor(canvas) {
    this.canvas = canvas;

    this.updateEnvironmentVariables();
    window.addEventListener('resize', this.updateEnvironmentVariables.bind(this), false);
  }

  getWorldPointFromPixelPoint(pixelPoint) {
    singleWorldPoint.x = (pixelPoint.x - offset.x) / PTM;
    singleWorldPoint.y = (pixelPoint.y - (this.canvas.height() - offset.y)) / PTM;
    return singleWorldPoint;
  }

  setViewCenterWorld(b2vecpos, instantaneous) {
    var currentViewCenterWorld = this.getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    offset.x -= Util.myRound(fraction * toMoveX * PTM, 0);
    offset.y += Util.myRound(fraction * toMoveY * PTM, 0);
  }

  updateEnvironmentVariables(){
    viewCenterPixel = {
      x: this.canvas.width() / 2,
      y: this.canvas.height() / 2
    };
  }

  getPTM(){
    return PTM;
  }

  setPTM(ptm){
    PTM = ptm;
  }

  getOffset(){
    return offset;
  }

  getOffsetX(){
    return offset.x;
  }

  getOffsetY(){
    return offset.y;
  }

  setOffset(obj, y){
    if(typeof obj === 'object' && !y){
      offset.x = obj['x'] || 0;
      offset.y = obj['y'] || 0;
    } else if(typeof obj === 'number' && typeof y === 'number'){
      offset.x = obj;
      offset.y = y;
    }
  }
}


export default Camera;
