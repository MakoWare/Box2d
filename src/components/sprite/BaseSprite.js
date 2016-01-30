import AssetManager from 'src/components/base/assetManager';

class BaseSprite {
  constructor(image, framesX, framesY) {

    if(typeof image === 'string'){
      this.image = AssetManager.getImage(image);
    } else {
      this.image = image;
    }

    if(!this.image){
      console.warn('Sprite created without an image', this);
      return;
    }

    this.$image = $(image);
    // this.$image.css({
    //   '-moz-transform': 'scale(-1, 1)',
    //   '-webkit-transform': 'scale(-1, 1)',
    //   '-o-transform': 'scale(-1, 1)',
    //   'transform': 'scale(-1, 1)',
    //   'filter': 'FlipH'
    // });

    this.width = this.image.width;
    this.height = this.image.height;

    this.frames = [];
    this.framesX = framesX;
    this.framesY = framesY;
    this.frameWidth = this.width / this.framesX;
    this.frameHeight = this.height / this.framesY;
    this.totalFrames = this.framesX * this.framesY;

    this.currentFrameIndex = 0;

    this.parseSpriteSheet();
  }

  parseSpriteSheet(){
    for(var y = 0; y < this.framesY; y++){
      for(var x = 0; x < this.framesX; x++){
        var frame = {};
        frame.sx = x * this.frameWidth;
        frame.sy = y * this.frameHeight;

        this.frames.push(frame);
      }
    }


    this.setFrame();
    console.log(this.frames);
  }

  nextFrame(){
    this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
    this.setFrame();
  }

  setFrame(frameIndex){
    frameIndex = frameIndex===undefined ? this.currentFrameIndex : frameIndex;
    this.frame = this.frames[frameIndex];
  }
}

export default BaseSprite;
