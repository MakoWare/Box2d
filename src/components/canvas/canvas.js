class Canvas {
  constructor(id) {
    id = id || 'canvas';
    this.el = document.getElementById(id);

    this.offset = {
      x:0,
      y:0
    };

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    this.focus();
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

  getContext(dimension){
    dimension = dimension || '2d';
    return this.el.getContext(dimension);
  }
}

export default Canvas;
