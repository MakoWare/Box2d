
import BaseSprite from 'src/components/sprite/BaseSprite';

class MultiSprite extends BaseSprite {
  constructor(image, framesX, framesY, offsetX, offsetY) {
    super(image, framesX, framesY, offsetX, offsetY);

  }

  createSlice(name, start, count, scale){
    var slice = {};

    slice.ix = 0;
    slice._ix = 0;
    slice.start = start;
    slice.end = start+count;
    slice.scale = scale || 1;

    slice.name = name;
    slice.frames = this.frames.slice(start, slice.end);

    console.log(slice);

    this.slices[name] = slice;
  }

  parseSpriteSheet(){
    this.slices = this.slices || {};
    super.parseSpriteSheet.apply(this,arguments);
    var slice = {
      ix: 0,
      start: 0,
      end: this.frames.length-1,
      name: 'default',
      frames: this.frames
    };

    this.slices[slice.name] = slice;
    this.setSlice(slice.name);
  }

  setSlice(name){
    this.slice = this.slices[name];
  }

  nextFrame(sliceName){
    if(sliceName){
      this.setSlice(sliceName);
    }

    var scale = this.slice.scale,
        fl = this.slice.frames.length,
        df = fl * scale,
        _ix = this.slice._ix++;

    this.slice.ix = Math.floor( ((_ix) % (df)) / this.slice.scale);
    if(_ix >= df){
      this.slice._ix = 1;
    }
    
    this.setFrame();
  }

  setFrame(frameIndex, sliceName){
    frameIndex = frameIndex===undefined ? this.slice.ix : frameIndex;
    if(sliceName){
      this.frame = this.slices[sliceName].frames[frameIndex];
    } else {
      this.frame = this.slice.frames[frameIndex];
    }

  }
}

export default MultiSprite;
