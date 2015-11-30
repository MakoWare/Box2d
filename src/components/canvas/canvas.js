import Util from 'src/components/util/util';

class Canvas {
  constructor(config) {
    this.setupFullscreen();

    this.focus();
  }

  setupFullscreen(){
    var id = Util.readConfig('canvas','id', 'canvas');
    var fullscreen = Util.readConfig('canvas', 'fullscreen', false);

    var container = $('#container');

    if(fullscreen){
      // add correct divs
      var canvas = $('<canvas id="'+id+'" tabindex="1"></canvas>').appendTo(container);

      this.set$Element(canvas);

      window.addEventListener('resize', this.resize.bind(this), false);
      this.resize();
    } else {
      var wrapper = $('<div style="text-align:center"></div>').appendTo(container);
      var canvasWrapper = $('<div style="margin:auto;width:640px;padding:2px;border:1px solid #888;text-align:left"></div>').appendTo(wrapper);
      var canvas = $('<canvas id="'+id+'" width="640" height="480" tabindex="1"></canvas>').appendTo(canvasWrapper);

      this.set$Element(canvas);
    }
  }

  resize(){
    this.el.width = window.innerWidth;
    this.el.height = window.innerHeight;
  }

  focus(){
    this.el.focus();
  }

  getElement() {
    return this.el;
  }

  set$Element(canvas){
    this.$el = canvas;
    this.el = this.$el[0];
  }

  getContext(dimension){
    dimension = dimension || '2d';
    return this.el.getContext(dimension);
  }

  height(){
    return this.el.height;
  }

  width(){
    return this.el.width;
  }
}

export default Canvas;
